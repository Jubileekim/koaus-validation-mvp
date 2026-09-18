# Sprint Mission 8 — User Authentication & Comments

> **최종 상태 (2026-09-18): 구현 · 로컬 검증 완료**  
> Production Vercel cookie/CORS 배포 검증은 별도 항목으로 남깁니다.

---

## 0. 최종 구현 상태 요약

Mission 8 핵심 기능은 Backend API, Frontend UI, 로컬 브라우저 통합 테스트까지 완료되었습니다.

| 영역 | 상태 |
| --- | --- |
| Session Auth (signup / login / logout / me) | 구현 · 검증 완료 |
| PostgreSQL Session Store (`private.session`) | 구현 · 검증 완료 |
| Comment GET / POST / DELETE | 구현 · 검증 완료 |
| Owner / ADMIN 삭제 권한 (Backend API) | 구현 · 검증 완료 |
| AuthContext / Login / Signup / returnTo | 구현 · 검증 완료 |
| Header auth UI / logout | 구현 · 검증 완료 |
| Editorial CommentSection | 구현 · 검증 완료 |
| English-first UI | 적용 · 검증 완료 |
| Production 배포 환경 cookie 검증 | 미실시 |

### ADMIN UI 검증 범위

- Backend ADMIN 댓글 삭제: API 단계에서 실제 검증 완료
- Frontend ADMIN Delete 버튼 표시: 최종 브라우저 통합에서는 role 변경을 다시 수행하지 않음  
  → UI 조건(`user.role === 'ADMIN'`)은 구현되어 있으며, 최종 브라우저 E2E에서는 타 USER에게 Delete가 숨겨지는지만 확인

---

## 1. 문제 정의

Sprint Mission 7에서 KOAUS는 React + Express + Prisma + PostgreSQL 풀스택 MVP가 되었다.

그러나 Mission 7에는 다음 한계가 있었다.

- 실제 사용자를 식별할 수 없다.
- 로그인 상태를 유지할 수 없다.
- 사용자별 권한 제어가 어렵다.
- Editorial을 읽은 사용자가 직접 참여할 기능이 없다.
- 게시물 수정/삭제는 게시물별 비밀번호로만 보호된다. (사용자 인증이 아님)

Mission 8은 이 한계를 **Session 기반 회원 인증 + Editorial 댓글**로 해결한다.

Mission 7의 게시물별 password edit/delete는 Mission 8에서도 **유지**한다.

---

## 2. 선택 기능

**User Feature: Session Authentication + Editorial Comments**

핵심:

1. 회원가입 / 로그인 / 로그아웃
2. 로그인 상태 유지 (`GET /api/auth/me`)
3. Session-based Authentication
4. Editorial 댓글 조회 / 작성 / 삭제
5. 본인 삭제 + ADMIN 전체 삭제
6. Loading / Error / Empty UX

---

## 3. 인증 기술 선택 — Session

JWT가 아니라 Session을 사용한다.

이유:

- React frontend + Express backend 단일 웹 서비스
- 서버에서 로그인 상태 즉시 관리·종료에 유리
- 권한 변경을 서버에서 바로 반영하기 쉬움
- 현재 규모에서 JWT가 필수는 아님
- Authentication / Authorization 학습에 적합

구조:

```text
Browser
→ HttpOnly Session Cookie (`koaus.sid`)
→ Express (`express-session`)
→ PostgreSQL Session Store (`connect-pg-simple` → `private.session`)
→ session.userId
→ User
```

MemoryStore는 사용하지 않는다.

---

## 4. Authorization

| 동작 | Public | Logged-in USER | ADMIN |
| --- | --- | --- | --- |
| Editorial / Product / Comment GET | ✅ | ✅ | ✅ |
| Comment POST | ❌ 401 | ✅ | ✅ |
| Own Comment DELETE | ❌ 401 | ✅ | ✅ |
| Other Comment DELETE | ❌ | ❌ 403 | ✅ |

권한의 최종 판단은 Backend이다. Frontend Delete 버튼 표시는 UX 편의일 뿐이다.

---

## 5. Frontend flow

```text
Editorial detail
→ comments (public GET)
→ logged out
→ Log in
→ session cookie
→ returnTo (safe internal path)
→ comment POST
→ own DELETE (or ADMIN)
```

안전한 returnTo:

- `location.state.from` 우선
- fallback `?returnTo=`
- 외부 URL / `//` / `/login`·`/signup` 차단

---

## 6. API

Base (local): `http://localhost:3000`

### Auth

| Method | Endpoint | Auth | Success | Errors |
| --- | --- | --- | --- | --- |
| POST | `/api/auth/signup` | 불필요 | 201 `{ user }` | 400 / 409 / 500 |
| POST | `/api/auth/login` | 불필요 | 200 `{ user }` | 400 / 401 / 500 |
| POST | `/api/auth/logout` | 세션 | 204 | 500 |
| GET | `/api/auth/me` | 세션 확인 | 200 `{ user \| null }` | 500 |

Signup body: `email`, `password` (≥8), `displayName` (≤50)  
Sanitize user: `id`, `email`, `displayName`, `role`, `createdAt`  
`passwordHash`는 응답에 포함하지 않는다.

### Comments

| Method | Endpoint | Auth | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/posts/:postId/comments` | 불필요 | 200 `Comment[]` | 500 |
| POST | `/api/posts/:postId/comments` | 필요 | 201 `Comment` | 400 / 401 / 404 / 500 |
| DELETE | `/api/comments/:commentId` | 본인 또는 ADMIN | 204 | 401 / 403 / 404 / 500 |

Comment validation:

- content trim 후 비어 있으면 400
- 최대 1000자
- 없는 Post → 404

Comment include user: `id`, `displayName`, `role`

---

## 7. DB 모델

### User

```text
id, email (unique), passwordHash, displayName,
role (USER | ADMIN), createdAt, updatedAt
```

### Comment

```text
id, content, userId → User, postId → Post,
createdAt, updatedAt
```

관계:

```text
User 1 ─── N Comment N ─── 1 Post
```

### Session store (Prisma 모델 아님)

```text
private.session   ← connect-pg-simple
```

Prisma migration으로 적용된 것:

- `UserRole` enum
- `User` / `Comment` 테이블
- FK / index
- `private` schema
- `User` / `Comment` RLS ENABLE (policy 없음)

Session 테이블은 Prisma User/Comment migration과 **별개**이며, Backend 기동 후 첫 session 저장 시 lazy 생성된다.

---

## 8. Frontend 구성

```text
src/services/api.js          → apiRequest + ApiError + credentials: 'include'
src/services/authApi.js      → signup / login / logout / getMe
src/services/commentApi.js   → getComments / createComment / deleteComment
src/contexts/AuthContext.jsx → user / isAuthenticated / isLoading / login / signup / logout / refreshUser
src/pages/LoginPage.jsx
src/pages/SignupPage.jsx
src/utils/authRedirect.js
src/components/layout/Header.jsx
src/components/editorial/CommentSection.jsx
```

앱 시작:

```text
AuthProvider → GET /api/auth/me → user 또는 null → isLoading false
```

---

## 9. English-first

- KOAUS target audience = overseas / international users
- default UI = English
- KO/EN toggle 제거
- Mission 8 신규 UI 문자열은 English
- 기존 DB `titleKo`, `contentKo` 등은 Mission 8에서 삭제하지 않음
- 전체 다국어 구조 정리는 향후 리팩터링
- `LanguageToggle.jsx` / `ko` translation 잔존은 Out of Scope 정리 대상

---

## 10. 보안

실제 적용:

- password bcrypt hashing
- `passwordHash` API 미노출
- HttpOnly session cookie (`koaus.sid`)
- `SESSION_SECRET` 환경변수 (하드코딩 fallback 없음)
- PostgreSQL external session store (`private.session`)
- production: `secure: true`, `sameSite: 'none'`, `trust proxy`
- credentialed CORS + explicit allowed origins
- Frontend에 DATABASE_URL / SESSION_SECRET 미노출
- auth token을 localStorage / sessionStorage에 저장하지 않음
- Authorization은 `session.userId` + DB role 기준

---

## 11. Development Note

Local frontend:

```text
http://localhost:5173
```

은 정상이다.

```text
http://127.0.0.1:5173
```

은 현재 `CORS_ORIGIN`에 포함되지 않으면 API가 차단된다.
제품 버그가 아니라 origin 설정 차이이다.

Local frontend should be opened through `http://localhost:5173`
unless `127.0.0.1` is explicitly added to `CORS_ORIGIN`.

---

## 12. UX 상태

### Auth

- Auth bootstrap loading: Header auth controls 숨김
- Login/Signup submit loading + disabled
- field validation + backend error message

### Comments

- Loading: `Loading comments...`
- Empty: `No comments yet. Be the first to join the conversation.`
- Error + Retry
- Guest: `Log in to join the conversation.`
- Logged-in: textarea `maxLength=1000` + Post comment
- Delete confirm: `Delete this comment?`

---

## 13. 최종 검증 체크리스트

### Authentication

- ✅ signup
- ✅ login
- ✅ logout
- ✅ session recovery (`/me` + browser refresh)
- ✅ invalid credential 401
- ✅ duplicate email 409 (API)
- ✅ session cookie 발급 / destroy
- ✅ `private.session` row 생성·삭제

### Comments (Backend API)

- ✅ public GET
- ✅ authenticated POST
- ✅ empty / whitespace / >1000 validation
- ✅ missing Post 404
- ✅ owner DELETE
- ✅ other user 403
- ✅ ADMIN DELETE
- ✅ missing Comment 404
- ✅ unauthenticated POST/DELETE 401

### Frontend

- ✅ Login / Signup pages
- ✅ Header auth state / logout
- ✅ returnTo (Editorial → Login → Editorial)
- ✅ Comment UI (GET / POST / DELETE)
- ✅ loading / error / empty
- ✅ guest login prompt
- ✅ other user Delete button hidden
- ✅ desktop / mobile
- ✅ production build
- ✅ Mission 7 Editorial / Marketplace regression

### Not re-run in final browser E2E

- ⚪ Frontend ADMIN Delete 버튼 표시 (Backend ADMIN DELETE는 API에서 검증 완료)

### Remaining outside local verification

- ⬜ Production Vercel cross-origin cookie / CORS

---

## 14. Out of Scope

Mission 8에서 하지 않은 기능:

- Like / Reply / Notifications
- Comment editing
- Profile / Follow
- Social Login / Password reset
- Payment / 자체 쇼핑몰
- Full CMS / Admin dashboard
- 기존 다국어 DB 필드 전체 삭제
- Mission 7 Post password 보호 제거

---

## 15. 향후 확장

Mission 8 이후 검토 가능:

- Post ownership을 Session User와 연결
- 기존 Post password 보호 제거 가능성
- profile
- replies / reactions
- production monitoring
- English-first content management 개선

제출 기능과 섞지 않는다.

---

## 16. Mission 8 제출 기준 대응

### 기본 요구사항

- [x] 고도화 기능 선택 및 범위 정의
- [x] 기존 MVP 한계 정의
- [x] 사용자 흐름 설계
- [x] 세션 기반 인증 구현 · 검증
- [x] 댓글 기능 구현 · 검증
- [x] 기존 MVP와 Frontend 통합
- [x] 성공/실패 시나리오 검증 (로컬)

### 심화 요구사항

- [x] UX 상태 설계 및 구현
- [x] 세션 인증 선택 이유 문서화
- [x] 확장 가능성 고려
- [x] 환경/보안 설계 및 로컬 검증
- [x] 사용 방법 · 검증 결과 문서화
- [ ] Production 배포 환경 최종 cookie 검증

---

## 17. 최종 제출물

- GitHub Public Repository
- Vercel Deployment URL (Mission 7부터 유지 · Mission 8 Production cookie는 별도 확인)
- README: 선택 기능, 선택 이유, 주요 결과 요약
- `docs/mission8.md`: 상세 설계, API, DB, 보안, 검증 체크리스트

Mission 8 핵심 기능은 **로컬에서 구현 및 검증 완료** 상태이다.
