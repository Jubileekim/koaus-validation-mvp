# Sprint Mission 8 — User Authentication & Comments

> 상태 표기 규칙
> - **구현 예정**: 아직 코드 없음
> - **초기 구현**: 코드는 있으나 실행·배포 검증 전
> - **검증 필요**: 동작 확인이 남아 있음
> - **구현 중**: 일부만 반영됨
>  
> 코드가 있다고 해서 `구현 완료` / `검증 완료`로 표시하지 않습니다.

---

## 0. 현재 구현 상태 (코드 기준 · 2026-09-17 점검)

이 브랜치(`mission8-session-comments`)에는 Mission 8 관련 **백엔드 초기 구현**이 이미 들어가 있습니다.
프론트엔드 인증·댓글 UI는 아직 없습니다.

### Backend — 초기 구현 / 검증 필요

| 항목 | 위치 | 상태 |
| --- | --- | --- |
| `User` / `Comment` / `UserRole` Prisma 모델 | `backend/prisma/schema.prisma` | 초기 구현 |
| users/comments migration 파일 | `backend/prisma/migrations/20260916130000_add_users_comments/` | 파일 존재 · **DB 적용 검증 필요** |
| Session 의존성 선언 | `backend/package.json` (`express-session`, `connect-pg-simple`) | 선언됨 · **npm install / lockfile 동기화 검증 필요** |
| Session middleware + PgSession + CORS credentials | `backend/app.js` | 초기 구현 · 검증 필요 |
| Auth routes | `backend/routes/auth.route.js` | 초기 구현 · 검증 필요 |
| Comment routes | `backend/routes/comment.route.js` | 초기 구현 · 검증 필요 |
| `requireAuth` middleware | `backend/middleware/requireAuth.js` | 초기 구현 · 검증 필요 |
| 환경변수 예시 | `backend/.env.example` (`SESSION_SECRET`, `CORS_ORIGIN`, `NODE_ENV`) | 초기 추가 |

### Frontend — 미구현 / 초기 진행

| 항목 | 상태 |
| --- | --- |
| AuthProvider / auth API client (`credentials: 'include'`) | **미구현** |
| Login / Signup 페이지 및 `/login`, `/signup` 라우트 | **미구현** |
| Header 로그인·로그아웃 UI | **미구현** |
| Editorial 상세 CommentSection / CommentForm / CommentList | **미구현** |
| comment API client | **미구현** |
| English-first: Header KO/EN 토글 제거 | **초기 적용** (`Header.jsx`에서 제거) |
| English-first: `LocaleContext` `en` 고정 | **초기 적용** (`setLocale` no-op) |
| `LanguageToggle.jsx` 파일 | **잔존** (미사용) |
| `src/i18n/translations.js`의 `ko` 메시지 | **잔존** (추후 정리 대상) |

### 아직 하지 않은 것

- Prisma migration 실제 적용·확인
- Session 패키지 `npm install` 및 package-lock 동기화
- Auth / Comment API 실행 검증
- Frontend 연동
- Loading / Error / Empty UX 구현
- 배포 환경 cookie / CORS 검증

---

## 1. 문제 정의

Sprint Mission 7에서 KOAUS는 React 프론트엔드와 Express + Prisma + PostgreSQL 백엔드를 연결하여 Editorial 게시물과 Product 데이터를 실제 API와 데이터베이스에서 처리하는 풀스택 MVP로 확장했다.

그러나 Mission 7 MVP에는 다음 한계가 있다.

- 실제 사용자를 식별할 수 없다.
- 로그인 상태를 유지할 수 없다.
- 사용자별 권한 제어가 어렵다.
- Editorial 콘텐츠를 읽은 사용자가 직접 참여할 기능이 없다.
- 게시물 수정/삭제는 게시물별 비밀번호로만 보호된다.

Mission 8에서는 이 한계를 **Session 기반 회원 인증 + Editorial 댓글**로 해결한다.

---

## 2. 기능 요구사항

### 인증

- 회원가입 (email / password / displayName)
- 로그인
- 로그아웃
- 로그인 상태 유지 (HttpOnly session cookie)
- 현재 사용자 조회 (`GET /api/auth/me`)

### 댓글

- Editorial 게시물 댓글 목록 조회 (비로그인 가능)
- 로그인한 회원만 댓글 작성
- 본인 댓글 삭제
- ADMIN은 모든 댓글 삭제 가능

### UX

- Loading / Error / Empty 상태 처리
- 비로그인 상태에서 댓글 작성 시 로그인 유도
- 로그인 성공 후 원래 Editorial 상세로 복귀

### English-first

- 기본 UI 언어 English
- KO / EN 언어 전환 버튼 제거
- DB `titleKo` / `contentKo` 등은 Mission 8에서 삭제하지 않음

---

## 3. 사용자 흐름

```text
Visitor
  ↓
Editorial 목록/상세 조회 (로그인 불필요)
  ↓
댓글 읽기 (로그인 불필요)
  ↓
댓글 작성 시도
  ├─ 비로그인 → Login/Signup → 성공 → 원래 상세로 복귀 → 작성
  └─ 로그인 → 댓글 입력 → POST → 목록 반영
                  ↓
        본인 댓글이면 삭제 가능 (ADMIN은 전체 삭제 가능)
```

콘텐츠 열람 자체에는 로그인을 요구하지 않는다.
로그인은 **참여 행동(댓글 작성)** 시점에 요구한다.

---

## 4. Authentication / Authorization 흐름

### 인증 기술: Session (JWT 아님)

선택 이유:

- React + Express 단일 웹 서비스 구조
- 서버에서 로그인 상태 관리·즉시 종료가 쉬움
- 권한 변경을 서버에서 바로 반영 가능
- 현재 규모에서 JWT가 필수는 아님
- Authentication / Authorization 학습에 적합

### Session 저장 구조

```text
Browser
  ↓ HttpOnly cookie (name: koaus.sid)
Express (express-session)
  ↓ sessionId
PostgreSQL Session Store (connect-pg-simple)
  ↓ session.userId
User
```

현재 `backend/app.js` 초기 구현 요약:

- cookie name: `koaus.sid`
- store: `connect-pg-simple` + `DATABASE_URL`
- `createTableIfMissing: true` (session 테이블은 Prisma migration이 아님)
- `httpOnly: true`
- production: `secure: true`, `sameSite: 'none'`
- development: `secure: false`, `sameSite: 'lax'`
- `maxAge`: 7일
- production에서 `SESSION_SECRET` 없으면 서버 기동 실패

### 회원가입

```text
POST /api/auth/signup
  → email / password / displayName 검증
  → email 중복 확인 (409)
  → bcrypt.hash (cost 12)
  → User 생성
  → req.session.userId = user.id
  → 201 { user }
```

입력 규칙 (현재 코드 기준):

- email: trim + lowerCase, `@` 포함
- password: 최소 8자
- displayName: 필수, 최대 50자

### 로그인

```text
POST /api/auth/login
  → User 조회
  → bcrypt.compare
  → req.session.userId 저장
  → 200 { user }
```

실패 시 이메일/비밀번호를 구분하지 않고 `401 Invalid email or password`.

### 로그아웃

```text
POST /api/auth/logout
  → session.destroy
  → clearCookie('koaus.sid')
  → 204
```

### 로그인 상태 확인

```text
GET /api/auth/me
  → session.userId 없으면 { user: null } (200)
  → 있으면 User 조회 후 { user }
  → User가 없으면 세션 정리 후 { user: null }
```

비로그인에도 401을 내지 않고 `user: null`을 반환한다.
프론트는 이 응답으로 전역 인증 상태를 초기한다. (**프론트 연동은 미구현**)

### 인가 (댓글)

| 동작 | 조건 | 실패 코드 |
| --- | --- | --- |
| 댓글 조회 | 인증 불필요 | — |
| 댓글 작성 | `requireAuth` + `session.userId` | 401 |
| 댓글 삭제 | 본인 (`comment.userId === session.userId`) 또는 `role === ADMIN` | 401 / 403 |

작성자 ID는 클라이언트가 보내지 않는다. 서버가 `session.userId`만 사용한다.

---

## 5. API 설계

### Auth

| Method | Endpoint | 인증 | 성공 | 주요 실패 | 상태 |
| --- | --- | --- | --- | --- | --- |
| POST | `/api/auth/signup` | 불필요 | 201 `{ user }` | 400 / 409 / 500 | 초기 구현 · 검증 필요 |
| POST | `/api/auth/login` | 불필요 | 200 `{ user }` | 400 / 401 / 500 | 초기 구현 · 검증 필요 |
| POST | `/api/auth/logout` | 세션 | 204 | 500 | 초기 구현 · 검증 필요 |
| GET | `/api/auth/me` | 세션 확인 | 200 `{ user \| null }` | 500 | 초기 구현 · 검증 필요 |

`user` 응답 필드 (passwordHash 제외):

```json
{
  "id": "...",
  "email": "user@example.com",
  "displayName": "Jubilee",
  "role": "USER",
  "createdAt": "..."
}
```

### Comments

| Method | Endpoint | 인증 | 성공 | 주요 실패 | 상태 |
| --- | --- | --- | --- | --- | --- |
| GET | `/api/posts/:postId/comments` | 불필요 | 200 `Comment[]` | 500 | 초기 구현 · 검증 필요 |
| POST | `/api/posts/:postId/comments` | 필요 | 201 `Comment` | 400 / 401 / 404 / 500 | 초기 구현 · 검증 필요 |
| DELETE | `/api/comments/:commentId` | 본인 또는 ADMIN | 204 | 401 / 403 / 404 / 500 | 초기 구현 · 검증 필요 |

댓글 작성 규칙 (현재 코드 기준):

- `content` trim 후 비어 있으면 400
- 최대 1000자
- 게시물 없으면 404
- 응답에 `user: { id, displayName, role }` include

댓글 목록은 `createdAt` 오름차순.

---

## 6. 상태 코드 정책

| Status | 의미 | 예시 |
| --- | --- | --- |
| 200 | 조회/로그인/me 성공 | login, me, comments list |
| 201 | 생성 성공 | signup, create comment |
| 204 | 본문 없는 성공 | logout, delete comment |
| 400 | 입력값 오류 | 빈 댓글, 짧은 비밀번호 |
| 401 | 미인증 또는 로그인 실패 | requireAuth 실패, 잘못된 비밀번호 |
| 403 | 인증됐지만 권한 없음 | 타인 댓글 삭제 |
| 404 | 대상 없음 | post/comment not found |
| 409 | 충돌 | 이미 존재하는 email |
| 500 | 서버 오류 | DB/세션 예외 |

> Mission 7 게시물 비밀번호 실패는 코드상 `401 Incorrect password`를 반환하는 경우가 있다.
> Mission 8 댓글 권한 실패는 `403`을 사용한다. 두 정책을 혼동하지 않는다.

---

## 7. User / Comment 모델

### User

```text
User
- id            String  @id @default(cuid())
- email         String  @unique
- passwordHash  String
- displayName   String
- role          UserRole @default(USER)   // USER | ADMIN
- comments      Comment[]
- createdAt     DateTime
- updatedAt     DateTime
```

### Comment

```text
Comment
- id        String @id @default(cuid())
- content   String
- userId    String → User
- postId    String → Post
- createdAt DateTime
- updatedAt DateTime

@@index([postId, createdAt])
@@index([userId])
```

### 관계

```text
User 1 ─── N Comment N ─── 1 Post
```

Mission 7의 `Editor` / `Post.editorId` / 게시물별 `passwordHash`는 유지한다.
Mission 8에서 Post 작성자를 User로 통합하지 않는다.

---

## 8. Session 저장 구조

- 라이브러리: `express-session` + `connect-pg-simple`
- 세션 페이로드 핵심: `session.userId`
- Session store 테이블: connect-pg-simple이 필요 시 생성 (`createTableIfMissing: true`)
- Prisma schema에는 Session 모델이 없다 (의도적)

의존성 주의:

- `backend/package.json`에는 패키지가 선언되어 있다.
- 점검 시점 기준 `backend/package-lock.json` / `node_modules`에 해당 패키지가 확인되지 않았다.
- 로컬에서 백엔드를 띄우기 전에 `npm install` 및 lockfile 동기화가 **검증 필요**하다.

---

## 9. Loading / Error / Empty UX

### 설계 (문서화됨 · 프론트 구현은 미구현)

#### Authentication

- 앱 시작 시 `/api/auth/me` 확인 중: Loading
- 잘못된 email/password: 로그인 실패 메시지
- 회원가입 입력 오류: 필드/공통 안내
- 서버 오류: 재시도 가능한 일반 오류

#### Comments

- 조회 중: Loading
- 댓글 없음: `No comments yet. Be the first to join the conversation.`
- 비로그인: 로그인 CTA
- 제출 중: 버튼 비활성화
- 빈 댓글: 전송 차단
- 조회 실패: Error + Retry
- 삭제 중: 중복 삭제 방지
- 권한 없음: 권한 오류 안내

예상 프론트 구성 (**구현 예정**):

```text
AuthProvider
├─ user / loading
├─ signup() / login() / logout()

LoginPage / SignupPage

EditorialDetailPage
└─ CommentSection
   ├─ CommentForm
   ├─ Empty / Error / Loading
   └─ CommentList → CommentItem
```

API 호출은 `credentials: 'include'`를 일관 적용한다. (**미구현**)

---

## 10. 보안 고려사항

- 비밀번호 원문 저장 금지 → bcrypt hash만 저장
- Session cookie `HttpOnly`
- production `Secure` + `SameSite=none` (cross-site frontend/backend 대비)
- `SESSION_SECRET` 환경변수 관리 (production 필수)
- CORS Origin 화이트리스트 + `credentials: true`
- 댓글 작성자/role은 클라이언트 입력을 신뢰하지 않음
- 내부 에러 메시지를 그대로 클라이언트에 노출하지 않음
- 최소 입력값 검증 (email, password 길이, comment 길이)

---

## 11. 환경변수

`backend/.env.example` 기준:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:6543/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
PORT=3000
CORS_ORIGIN="http://localhost:5173,https://koaus-validation-mvp.vercel.app"
SESSION_SECRET="replace-with-a-long-random-secret"
NODE_ENV="development"
```

| 변수 | 용도 |
| --- | --- |
| `DATABASE_URL` | Prisma + Session Store connection |
| `DIRECT_URL` | Prisma migrate 등 CLI |
| `CORS_ORIGIN` | credential 허용 Origin (쉼표 구분) |
| `SESSION_SECRET` | session 서명 비밀키 |
| `NODE_ENV` | cookie Secure / SameSite 분기 |

Frontend는 기존처럼 `VITE_API_URL`을 사용한다.
세션 쿠키를 쓰려면 프론트 fetch에 `credentials: 'include'`가 필요하다. (**미구현**)

---

## 12. 기존 MVP와의 통합

유지:

- Editorial 목록/상세/작성/수정/삭제
- Product / Marketplace API
- 게시물별 password edit/delete
- 공개 콘텐츠 비로그인 접근

추가:

- Auth API + Session
- Editorial 상세 하단 댓글 UI (**구현 예정**)
- English-first UI 방향 (**초기 적용**)

이번 미션은 기존 MVP를 대체하지 않고 **사용자 식별 + 참여 레이어**를 추가한다.

---

## 13. Out of Scope

- 댓글 수정 / 대댓글 / 좋아요 / 알림
- 소셜 로그인 / 비밀번호 찾기
- 사용자 프로필 / 팔로우
- 결제 / 자체 쇼핑몰
- 전체 CMS 재설계
- Product DB 전체 재설계
- 기존 다국어 DB 필드 전체 삭제
- OpenAI API
- 실시간 채팅
- 게시물별 비밀번호 방식의 완전 제거

---

## 14. 향후 확장 방향

- 사용자 프로필 / Saved Articles · Products
- 댓글 수정 · 대댓글 · moderation
- Editorial 작성자를 User와 통합
- 관리자 CMS
- 게시물별 비밀번호 → 사용자 권한 기반 전환
- KOAUS Commerce 계정 연동
- 개인화 추천

---

## 15. 구현 체크리스트

### 설계 / 문서

- [x] 고도화 기능 선택 (유저 기능)
- [x] 기존 MVP 한계 정의
- [x] 사용자 흐름 설계
- [x] Session 선택 이유 문서화
- [x] API / 모델 / UX / 보안 설계
- [x] README Mission 8 섹션 정리 (현재 코드 상태 반영)

### Backend

- [x] User / Comment Prisma 모델 추가 *(초기 구현)*
- [x] migration 파일 추가 *(DB 적용은 검증 필요)*
- [x] Session middleware 구성 *(초기 구현 · 검증 필요)*
- [x] Auth API *(초기 구현 · 검증 필요)*
- [x] Comment API *(초기 구현 · 검증 필요)*
- [x] `requireAuth` *(초기 구현 · 검증 필요)*
- [ ] Session 패키지 설치 및 lockfile 동기화 *(검증 필요)*
- [ ] migration 실제 적용 확인 *(검증 필요)*
- [ ] Auth / Comment API 수동·시나리오 검증 *(검증 필요)*

### Frontend

- [ ] AuthProvider + `/api/auth/me` 부트스트랩 *(구현 예정)*
- [ ] Login / Signup 페이지 *(구현 예정)*
- [ ] Header 인증 UI *(구현 예정)*
- [ ] credentials 포함 API client *(구현 예정)*
- [ ] Editorial 상세 댓글 UI *(구현 예정)*
- [ ] Loading / Error / Empty UX *(구현 예정)*
- [x] Header KO/EN 토글 제거 *(초기 적용)*
- [x] Locale `en` 고정 *(초기 적용)*
- [ ] 미사용 `LanguageToggle.jsx` / 잔여 ko i18n 정리 *(선택 · 추후)*

### 검증 / 제출

- [ ] 성공/실패 시나리오 검증
- [ ] local / production cookie·CORS 검증
- [ ] README 데모 시나리오·사용 방법 최종 업데이트
- [ ] 배포 반영

---

## 16. 테스트 / 검증 시나리오

아직 실행 검증은 완료되지 않았다. 구현 후 확인할 항목:

### 성공

1. 회원가입 → session cookie 발급 → `/api/auth/me`에 user 반환
2. 로그인 상태 유지 (새로고침)
3. Editorial 상세에서 댓글 목록 조회
4. 로그인 후 댓글 작성 → DB 저장 → 목록 반영
5. 본인 댓글 삭제 버튼 노출 및 삭제
6. ADMIN이 타인 댓글 삭제
7. 로그아웃 후 `/api/auth/me`가 `user: null`

### 실패 / 권한

1. 비로그인 댓글 작성 → 401
2. 잘못된 비밀번호 로그인 → 401
3. 빈 댓글 → 400
4. 없는 게시물에 댓글 → 404
5. 타인 댓글 삭제 → 403
6. 없는 댓글 삭제 → 404
7. 중복 email 회원가입 → 409
8. API 오류 시 프론트 Error 상태 표시

---

## 17. 권장 다음 구현 순서

현재 백엔드 초기 코드가 있으므로, 가장 자연스러운 다음 단계는 다음과 같다.

```text
1. backend 의존성 설치 (express-session, connect-pg-simple) + lockfile 동기화
   ↓
2. Prisma migrate deploy로 User/Comment 테이블 적용 확인
   ↓
3. Auth / Comment API 수동 검증 (curl / HTTP client + cookie)
   ↓
4. Frontend AuthProvider + auth API client (credentials: 'include')
   ↓
5. Login / Signup 페이지 + Header 인증 UI
   ↓
6. EditorialDetailPage 댓글 UI 통합
   ↓
7. Loading / Error / Empty + 권한 UX
   ↓
8. 시나리오 검증 및 README/데모 업데이트
```

새로운 Auth/Comment API를 처음부터 다시 만들지 않는다.
기존 `backend/routes/auth.route.js`, `comment.route.js`, `middleware/requireAuth.js`를 기준으로 연동·검증한다.

---

## 18. Mission 8 제출 기준 대응

### 기본 요구사항

- [x] 고도화 기능 선택 및 범위 정의
- [x] 기존 MVP 한계 정의
- [x] 사용자 흐름 설계
- [~] 세션 기반 인증 실제 구현 — **백엔드 초기 구현 / 프론트 미구현 / 검증 필요**
- [~] 댓글 기능 실제 구현 — **백엔드 초기 구현 / 프론트 미구현 / 검증 필요**
- [ ] 기존 MVP와 프론트 통합
- [ ] 성공/실패 시나리오 검증

### 심화 요구사항

- [x] UX 상태 설계
- [x] 세션 인증 선택 이유 문서화
- [x] 확장 가능성 고려
- [x] 환경/보안 설계
- [ ] 실제 코드의 환경 변수/보안 설정 검증
- [ ] 구현 완료 후 사용 방법 및 데모 시나리오 업데이트

---

## 19. 최종 제출물 (목표)

- GitHub Public Repository
- Vercel Deployment URL
- README에 선택 기능, 선택 이유, 주요 기능, 사용 방법, 데모 시나리오 문서화

현재 단계에서는 설계 문서와 코드 상태를 맞추는 작업까지 반영했다.
실제 동작 검증·프론트 연동·배포는 이후 단계에서 진행한다.
