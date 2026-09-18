# Sprint Mission 8 — Session Auth, Comments & Editorial Authorization

> **최종 상태 (2026-09-18): 구현 · 로컬 검증 완료**  
> Production Vercel cross-origin cookie/CORS는 아직 별도 운영 환경 검증 전입니다.

---

## 0. 최종 구현 상태 요약

고도화 기능:

**Session-based Authentication + Editorial Comments + Editorial Authorization**

최종 권한 정책:

```text
READ   = PUBLIC
WRITE  = AUTHENTICATED USER
EDIT   = OWNER OR ADMIN
DELETE = ADMIN ONLY
```

| 영역 | 상태 |
| --- | --- |
| Session Auth (signup / login / logout / me) | 구현 · 검증 완료 |
| PostgreSQL Session Store (`private.session`) | 구현 · 검증 완료 |
| Comments GET / POST / DELETE | 구현 · 검증 완료 |
| Post ownership (`authorUserId`) | 구현 · 검증 완료 |
| Post WRITE / EDIT / DELETE authorization | 구현 · 검증 완료 |
| Header / Login / Signup / Write returnTo | 구현 · 검증 완료 |
| KOAUS warm Auth UI (red→orange) | 적용 · 검증 완료 |
| English-first UI | 적용 · 검증 완료 |
| Production Vercel cookie 검증 | 미실시 |

---

## 1. 문제 정의

Mission 7 KOAUS는 React + Express + Prisma + PostgreSQL 풀스택 MVP였다.

한계:

- 사용자를 식별할 수 없음
- 로그인 상태를 유지할 수 없음
- 사용자별 권한 제어가 어려움
- Editorial 참여(댓글)가 없음
- 게시물 수정/삭제가 **게시물별 password**에만 의존 (사용자 인증이 아님)

Mission 8은 이 한계를 다음으로 해결한다.

1. Session 기반 회원 인증
2. Editorial Comments
3. `Post.authorUserId` ownership + role 기반 Editorial Authorization

Mission 7의 Post password Write/Edit/Delete는 **더 이상 사용하지 않는다.**  
DB `passwordHash` 컬럼만 legacy 호환을 위해 남겨 둔다.

---

## 2. Session을 선택한 이유

JWT가 아니라 Session을 사용한다.

- React frontend + Express backend 단일 웹 서비스
- 서버에서 로그인 상태 즉시 관리·종료
- 권한 변경을 서버에서 바로 반영
- 현재 규모에서 JWT 필수는 아님
- Authentication / Authorization 학습에 적합

---

## 3. Authentication flow

```text
Browser
→ HttpOnly Session Cookie (`koaus.sid`)
→ Express (`express-session`)
→ PostgreSQL Session Store (`connect-pg-simple` → `private.session`)
→ session.userId
→ User
```

MemoryStore는 사용하지 않는다.

Frontend:

```text
AuthProvider
→ GET /api/auth/me (credentials: include)
→ user | null
→ Login / Signup / Logout
→ safe returnTo
```

---

## 4. Authorization policy

| 동작 | Public | USER | ADMIN |
| --- | --- | --- | --- |
| Editorial / Product / Comment GET | ✅ | ✅ | ✅ |
| Post WRITE | ❌ 401 | ✅ | ✅ |
| Post EDIT (own) | ❌ | ✅ | ✅ |
| Post EDIT (other / legacy null owner) | ❌ | ❌ 403 | ✅ |
| Post DELETE | ❌ 401 | ❌ 403 | ✅ |
| Comment POST | ❌ 401 | ✅ | ✅ |
| Comment DELETE (own) | ❌ | ✅ | ✅ |
| Comment DELETE (other) | ❌ | ❌ 403 | ✅ |

권한의 최종 판단은 Backend이다. Frontend UI 숨김만으로 보안을 처리하지 않는다.

일반 USER는 **자신의 Post도 DELETE할 수 없다.**

---

## 5. Post ownership

### Schema

```text
Post.authorUserId String?  → User?
User.posts Post[]
```

- nullable: 기존 Mission 7 데이터가 깨지지 않음
- 신규 Mission 8 글: `authorUserId = req.session.userId`
- legacy 글: `authorUserId = null`
- request body의 `authorUserId`는 **신뢰하지 않음**

Migration:

```text
20260918120000_add_post_author_user
```

적용 완료.

### API 규칙

**POST `/api/posts`**

- session 없으면 `401`
- session user 존재 확인
- `authorUserId`는 서버가 설정
- password 필드 불필요

**PATCH `/api/posts/:id`**

- 비로그인 → `401`
- owner → 허용
- ADMIN → 허용
- 타인 USER → `403`
- legacy (`authorUserId === null`) → ADMIN만
- password comparison 제거

**DELETE `/api/posts/:id`**

- ADMIN only
- password / `x-post-password` 제거

`editorId` → `Editor` 관계는 Mission 8에서 제거하지 않았다.

---

## 6. Comments

| Method | Endpoint | Auth |
| --- | --- | --- |
| GET | `/api/posts/:postId/comments` | Public |
| POST | `/api/posts/:postId/comments` | Logged-in |
| DELETE | `/api/comments/:commentId` | Owner or ADMIN |

- content trim 필수 · 최대 1000자
- Loading / Error / Empty
- 비로그인 작성 시 Login 유도 + returnTo

---

## 7. Security

- User password bcrypt hashing
- User / Post `passwordHash` API 미노출
- HttpOnly `koaus.sid`
- `SESSION_SECRET` 환경변수 필수
- PostgreSQL external session store
- production: `secure` + `sameSite: 'none'` + `trust proxy`
- credentialed CORS + explicit allowed origins
- Frontend에 DB/session secret 미노출
- auth token을 localStorage/sessionStorage에 저장하지 않음
- Authorization: `session.userId` + DB `role` + `authorUserId`

---

## 8. Frontend UX

### Header

- 비로그인: red→orange gradient `Log in →`
- 로그인: `Write · displayName · Log out`

### Write

```text
/editorial/write
→ 비로그인
→ /login
→ returnTo /editorial/write
→ publish
```

Editorial hero Write CTA도 동일 흐름.

### Edit / Delete UI

- Edit: owner 또는 ADMIN (legacy는 ADMIN만)
- Delete: ADMIN만

### Auth pages

- warm cream/peach background
- cream card
- primary CTA: red→orange gradient
- English-first

---

## 9. API

Base (local): `http://localhost:3000`

### Auth

| Method | Endpoint | Success | Errors |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | 201 `{ user }` | 400 / 409 / 500 |
| POST | `/api/auth/login` | 200 `{ user }` | 400 / 401 / 500 |
| POST | `/api/auth/logout` | 204 | 500 |
| GET | `/api/auth/me` | 200 `{ user \| null }` | 500 |

### Posts

| Method | Endpoint | Auth | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/posts` | Public | 200 | 500 |
| GET | `/api/posts/:id` | Public | 200 | 404 / 500 |
| POST | `/api/posts` | Logged-in | 201 | 400 / 401 / 404 / 500 |
| PATCH | `/api/posts/:id` | Owner or ADMIN | 200 | 400 / 401 / 403 / 404 / 500 |
| DELETE | `/api/posts/:id` | ADMIN | 200 | 401 / 403 / 404 / 500 |

응답에 `authorUserId`를 포함해 Frontend ownership 판단에 사용한다.  
`passwordHash`는 절대 응답하지 않는다.

### Comments

| Method | Endpoint | Auth | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/posts/:postId/comments` | Public | 200 | 500 |
| POST | `/api/posts/:postId/comments` | Logged-in | 201 | 400 / 401 / 404 / 500 |
| DELETE | `/api/comments/:commentId` | Owner or ADMIN | 204 | 401 / 403 / 404 / 500 |

---

## 10. DB / migration / session store

### User

```text
id, email, passwordHash, displayName, role(USER|ADMIN),
comments, posts, createdAt, updatedAt
```

### Comment

```text
id, content, userId → User, postId → Post, createdAt, updatedAt
```

### Post (Mission 8 추가)

```text
authorUserId? → User?
passwordHash?   # legacy column retained, unused in new flows
editorId → Editor
```

### Migrations

- `20260916130000_add_users_comments` — User / Comment / `private` schema / RLS
- `20260918120000_add_post_author_user` — `Post.authorUserId`

### Session store

```text
private.session  ← connect-pg-simple (Prisma 모델 아님, lazy create)
```

---

## 11. 검증 결과

### Authentication

- ✅ signup / login / logout / me
- ✅ session 생성·삭제·refresh persistence
- ✅ invalid login 401

### Comments

- ✅ public GET
- ✅ authenticated POST
- ✅ own DELETE
- ✅ other user DELETE 403
- ✅ ADMIN DELETE
- ✅ unauthenticated POST/DELETE 401

### Editorial Authorization

- ✅ unauthenticated POST/PATCH/DELETE → 401
- ✅ USER A Post 생성 + `authorUserId` 일치
- ✅ USER A own Post PATCH
- ✅ USER B other Post PATCH 403
- ✅ USER B Post DELETE 403
- ✅ ADMIN other Post PATCH
- ✅ ADMIN legacy Post PATCH
- ✅ ADMIN Post DELETE
- ✅ legacy Post USER PATCH 403

### Frontend / tooling

- ✅ Write login returnTo
- ✅ build success
- ✅ lint 0 errors (existing warnings only)
- ✅ prisma validate
- ✅ migrate deploy
- ✅ `node --check`

---

## 12. Legacy Post 정책

```text
authorUserId === null
```

- READ: public
- EDIT: ADMIN only
- DELETE: ADMIN only
- 일반 USER는 Edit UI/API 모두 불가

기존 Editorial 콘텐츠를 삭제하지 않고 ownership을 nullable로 추가했다.

---

## 13. Out of Scope

- Like / Reply / Notifications / Comment editing
- Profile / Follow / Social Login / Password reset
- Payment / Full CMS / Admin dashboard
- Editor 모델 전체 재설계
- `passwordHash` 컬럼 drop
- 기존 Post 데이터 삭제

---

## 14. Production에서 아직 확인할 항목

- ⬜ Vercel Frontend ↔ Backend cross-origin session cookie
- ⬜ Production CORS origin / `Secure` + `SameSite=None` cookie 동작
- ⬜ Production 환경에서의 Auth / Comment / Write 통합 smoke test

로컬(`localhost:5173` ↔ `localhost:3000`)에서는 검증 완료.

### Development Note

Local frontend는 `http://localhost:5173`으로 열어야 한다.  
`http://127.0.0.1:5173`은 `CORS_ORIGIN`에 없으면 API가 차단된다 (제품 버그 아님).

---

## 15. 제출 기준 대응

### 기본

- [x] 고도화 기능 선택 및 범위 정의
- [x] 기존 MVP 한계 정의
- [x] 사용자 흐름 설계
- [x] Session 인증 구현 · 검증
- [x] 댓글 기능 구현 · 검증
- [x] Editorial Authorization 구현 · 검증
- [x] Frontend 통합
- [x] 로컬 성공/실패 시나리오 검증

### 심화

- [x] UX 상태 설계
- [x] Session 선택 이유 문서화
- [x] 확장 가능성 고려
- [x] 환경/보안 설계 및 로컬 검증
- [x] 사용 방법 · 검증 결과 문서화
- [ ] Production cookie 최종 검증
