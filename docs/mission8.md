# Sprint Mission 8 — User Authentication & Comments

## 1. 미션 목표

Sprint Mission 7에서 KOAUS는 React 프론트엔드와 Express + Prisma + PostgreSQL 백엔드를 연결하여 Editorial 게시물과 Product 데이터를 실제 API와 데이터베이스에서 처리하는 풀스택 MVP로 확장했다.

Sprint Mission 8에서는 **유저 기능**을 고도화 기능으로 선택한다.

기존 MVP는 콘텐츠를 읽고 게시물을 작성·수정·삭제할 수 있지만, 게시물별 비밀번호로만 수정·삭제 권한을 확인하기 때문에 실제 사용자를 식별할 수 없다. 또한 독자가 콘텐츠를 읽은 뒤 의견을 남기거나 자신의 댓글을 관리할 수 있는 참여 기능이 없다.

이번 미션의 목표는 다음과 같다.

- 세션 기반 회원 인증 구현
- 로그인 / 로그아웃 / 로그인 상태 확인
- 로그인 사용자의 댓글 작성
- 본인 댓글 삭제
- 관리자 권한에 의한 댓글 관리
- 기존 Editorial 상세 흐름과 댓글 기능 통합
- 기존 게시물별 비밀번호 방식에서 사용자 기반 권한 구조로 확장할 수 있는 기반 마련

---

## 2. 고도화 기능 선택 및 선택 이유

### 선택 기능

**유저 기능**

### 기존 MVP의 한계

Mission 7에서는 게시물마다 별도의 비밀번호를 설정하고 `bcrypt`로 해시하여 수정·삭제 권한을 확인한다.

이 방식은 간단한 MVP 보호 장치로는 동작하지만 다음 한계가 있다.

- 실제 작성자를 식별할 수 없다.
- 로그인 상태를 유지할 수 없다.
- 사용자별 권한을 관리할 수 없다.
- "내가 작성한 콘텐츠" 또는 "내 댓글"과 같은 기능으로 확장하기 어렵다.
- 콘텐츠를 읽는 사용자와 서비스 사이의 상호작용이 없다.

따라서 Mission 8에서는 **사용자 계정과 로그인 상태를 중심으로 인증·인가 구조를 추가하고, 이를 실제 Editorial 댓글 기능과 연결한다.**

---

## 3. MVP 최소 구현 범위

이번 미션에서는 "있으면 좋은 기능"보다 현재 서비스 흐름에 반드시 필요한 기능만 구현한다.

### 구현 범위

#### 인증

- 회원가입
- 로그인
- 로그아웃
- 현재 로그인 사용자 조회
- 로그인 상태 유지

#### 댓글

- Editorial 게시물의 댓글 목록 조회
- 로그인 사용자의 댓글 작성
- 본인이 작성한 댓글 삭제
- 관리자의 댓글 삭제

#### 권한

- 콘텐츠와 댓글 조회는 비로그인 사용자도 가능
- 댓글 작성은 로그인 사용자만 가능
- 댓글 삭제는 작성자 본인 또는 관리자만 가능

#### UX

- 로그인 중 / 요청 처리 중 로딩 상태
- 인증 실패 및 입력 오류 안내
- 댓글이 없을 때 빈 상태 표시
- 댓글 작성 중 오류 발생 시 사용자 안내
- 비로그인 상태에서 댓글 작성 시 로그인 필요 안내

### 이번 미션에서 제외

- 소셜 로그인
- 비밀번호 재설정 이메일
- 프로필 편집
- 댓글 수정
- 대댓글
- 댓글 좋아요
- 신고 / 차단
- 알림
- 팔로우
- 실시간 채팅
- 결제 기능
- OpenAI API 기능

기능 범위를 제한하여 **인증 → 권한 확인 → 댓글 작성/삭제**의 핵심 사용자 흐름을 완성하는 데 집중한다.

---

## 4. 고도화 기능 설계 및 흐름 정의

## 4.1 전체 사용자 흐름

```text
Visitor
  ↓
Editorial 목록/상세 조회
  ↓
댓글 읽기
  ↓
댓글을 작성하려고 함
  ↓
로그인 여부 확인
  ├─ 비로그인 → 로그인 화면 → 로그인 성공 → 원래 콘텐츠로 복귀
  └─ 로그인 → 댓글 작성
                  ↓
              DB 저장
                  ↓
            댓글 목록 갱신
                  ↓
        본인 댓글이면 삭제 가능
```

콘텐츠 열람 자체에는 로그인을 요구하지 않는다. KOAUS는 외국인을 대상으로 한국의 제품·장소·문화를 소개하는 콘텐츠 서비스이므로 공개 콘텐츠 접근성을 유지한다.

로그인은 **사용자가 실제 참여 행동을 하는 시점**에 요구한다.

---

## 4.2 회원가입 흐름

### 언제 사용하는가

처음으로 댓글을 작성하려는 사용자가 계정이 없을 때 사용한다.

### 입력

- email
- password
- display name

### 처리

```text
회원가입 폼 제출
  ↓
입력값 검증
  ↓
email 중복 확인
  ↓
password bcrypt hash
  ↓
User 저장
  ↓
세션 생성
  ↓
로그인 상태로 전환
```

### 결과

- 성공: 로그인된 사용자 상태로 서비스 이용
- 실패: 필드별 또는 공통 오류 메시지 표시

---

## 4.3 로그인 흐름

### 언제 사용하는가

- 댓글을 작성하려 할 때
- 로그인 페이지에 직접 접근했을 때

### 입력

- email
- password

### 처리

```text
POST /api/auth/login
  ↓
User 조회
  ↓
bcrypt.compare()
  ↓
인증 성공
  ↓
서버 세션에 userId 저장
  ↓
HttpOnly 세션 쿠키 전달
```

### 결과

- 성공: 로그인 사용자 정보 반환
- 실패: `401 Unauthorized`와 로그인 실패 메시지 반환

---

## 4.4 로그인 상태 확인 흐름

페이지 새로고침 후에도 프론트엔드가 로그인 여부를 판단할 수 있어야 한다.

```text
앱 시작
  ↓
GET /api/auth/me
  ↓
세션 확인
  ├─ 유효 → 사용자 정보 반환
  └─ 없음 → 비로그인 상태 반환
```

프론트엔드는 이 결과를 전역 인증 상태로 사용한다.

---

## 4.5 로그아웃 흐름

```text
POST /api/auth/logout
  ↓
서버 세션 삭제
  ↓
세션 쿠키 제거
  ↓
프론트 인증 상태 초기화
```

세션 방식에서는 서버가 인증 상태를 직접 제거할 수 있으므로 로그아웃 결과가 즉시 반영된다.

---

## 4.6 댓글 조회 흐름

### 언제 사용하는가

Editorial 상세 페이지에 진입했을 때 사용한다.

### 입력

- postId

### 처리

```text
GET /api/posts/:postId/comments
  ↓
Comment 조회
  ↓
작성자 정보 포함
  ↓
createdAt 기준 정렬
```

### 결과

- 댓글이 있으면 목록 표시
- 댓글이 없으면 Empty State 표시
- 요청 실패 시 에러 안내 및 재시도 제공

댓글 조회에는 로그인이 필요하지 않다.

---

## 4.7 댓글 작성 흐름

### 언제 사용하는가

로그인한 사용자가 Editorial 상세 페이지에서 의견을 남길 때 사용한다.

### 입력

- postId
- content

사용자 ID는 클라이언트가 직접 보내 신뢰하지 않고 **서버 세션의 `userId`를 기준으로 결정한다.**

### 처리

```text
POST /api/posts/:postId/comments
  ↓
세션 확인
  ↓
입력값 검증
  ↓
Post 존재 확인
  ↓
Comment 생성
  ↓
작성자 정보와 함께 응답
```

### 결과

- 성공: 새 댓글이 목록에 표시
- 비로그인: `401 Unauthorized`
- 빈 댓글 또는 잘못된 입력: `400 Bad Request`
- 존재하지 않는 게시물: `404 Not Found`

---

## 4.8 댓글 삭제 흐름

### 언제 사용하는가

사용자가 자신이 작성한 댓글을 삭제하거나 관리자가 댓글을 관리할 때 사용한다.

### 처리

```text
DELETE /api/comments/:commentId
  ↓
세션 확인
  ↓
Comment 조회
  ↓
권한 확인
  ├─ comment.userId === session.userId
  ├─ 또는 user.role === ADMIN
  └─ 그 외 → 403 Forbidden
  ↓
삭제
```

### 결과

- 성공: 댓글 목록에서 제거
- 비로그인: `401 Unauthorized`
- 권한 없음: `403 Forbidden`
- 댓글 없음: `404 Not Found`

---

## 5. 인증 방식 — Session 선택

Mission 8에서는 JWT 대신 **세션 기반 인증**을 사용한다.

### 선택 이유

현재 KOAUS는 하나의 웹 프론트엔드와 하나의 Express API 서버를 사용하는 서비스다. 현재 단계에서는 여러 독립 서비스 간 토큰 공유보다 다음 요구사항이 더 중요하다.

- 로그인 상태를 서버에서 명확하게 관리
- 로그아웃 시 인증 상태를 즉시 종료
- 사용자 권한 변경을 서버 상태에 즉시 반영
- 브라우저에 인증 정보를 직접 노출하지 않음
- 인증과 인가의 흐름을 단순하게 유지

따라서 MVP 단계에서는 세션 방식이 현재 서비스 구조와 관리 요구에 더 적합하다고 판단한다.

### 세션 저장

개발/배포 환경에서 기본 MemoryStore에 의존하지 않고 외부 세션 저장소를 사용한다.

현재 프로젝트가 Supabase PostgreSQL을 사용하고 있으므로 **PostgreSQL 기반 Session Store**를 사용한다.

```text
Browser
  ↓ HttpOnly Session Cookie
Express API
  ↓ sessionId
PostgreSQL Session Store
  ↓ userId
User
```

### 쿠키 보안

- `HttpOnly`: JavaScript에서 세션 쿠키 접근 차단
- `Secure`: production에서는 HTTPS에서만 전송
- `SameSite`: 배포 환경에 맞게 설정
- 세션 비밀키는 환경 변수로 관리

---

## 6. 예상 데이터 모델

### User

```text
User
- id
- email (unique)
- passwordHash
- displayName
- role (USER / ADMIN)
- createdAt
- updatedAt
```

### Comment

```text
Comment
- id
- content
- userId
- postId
- createdAt
- updatedAt
```

### 관계

```text
User 1 ─── N Comment N ─── 1 Post
```

향후 게시물 작성 권한까지 사용자 인증으로 통합하면 다음과 같이 확장할 수 있다.

```text
User
 ├─ Posts
 └─ Comments
```

Mission 7의 `Editor` / `Post.editorId` 구조는 Mission 8 구현 과정에서 기존 데이터 호환성을 고려하여 단계적으로 정리한다.

---

## 7. 예상 API

### Auth

| Method | Endpoint | 설명 | 인증 |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | 회원가입 | 불필요 |
| POST | `/api/auth/login` | 로그인 | 불필요 |
| POST | `/api/auth/logout` | 로그아웃 | 필요 |
| GET | `/api/auth/me` | 현재 사용자 조회 | 세션 확인 |

### Comments

| Method | Endpoint | 설명 | 인증 |
| --- | --- | --- | --- |
| GET | `/api/posts/:postId/comments` | 게시물 댓글 조회 | 불필요 |
| POST | `/api/posts/:postId/comments` | 댓글 작성 | 필요 |
| DELETE | `/api/comments/:commentId` | 댓글 삭제 | 본인 또는 ADMIN |

---

## 8. 프론트엔드 흐름

예상 구성:

```text
AuthProvider
├─ user
├─ loading
├─ signup()
├─ login()
└─ logout()

LoginPage
SignupPage

EditorialDetailPage
└─ CommentSection
   ├─ CommentForm
   ├─ Empty State
   ├─ Error State
   └─ CommentList
      └─ CommentItem
```

API 요청은 공통 HTTP Client를 통해 처리하고 세션 쿠키가 전달되도록 `credentials: 'include'`를 일관되게 적용한다.

---

## 9. English-only 서비스 방향

KOAUS의 서비스 타깃을 **한국 콘텐츠에 관심 있는 해외 사용자**로 명확히 한다.

따라서 Mission 8부터 사용자-facing UI의 기본 언어를 영어로 통일한다.

### 이번 미션에서 적용

- 기존 KO / EN 언어 전환 버튼 제거
- 기본 UI를 English-only로 변경
- 신규 인증 / 댓글 UI는 영어로 작성

### 이번 미션에서 바로 제거하지 않는 것

기존 데이터베이스의 `titleKo`, `contentKo`, `nameKo` 등 한국어 필드는 Mission 8 핵심 기능과 직접 관련이 없으므로 즉시 삭제하지 않는다.

English-only 전환이 안정된 뒤 별도 리팩터링에서 i18n 코드와 다국어 DB 필드 정리를 검토한다.

---

## 10. 기존 MVP와의 통합

Mission 8 기능은 기존 Editorial / Marketplace 기능을 깨지 않고 추가한다.

- 기존 Editorial 목록/상세 조회 유지
- Product API 및 Marketplace 유지
- 공개 콘텐츠는 로그인 없이 접근 가능
- Editorial 상세 하단에 댓글 기능 추가
- 기존 Post 데이터 유지
- 인증 기능 도입 이후 게시물별 비밀번호 방식은 별도 전환 단계에서 제거

즉 이번 미션은 기존 MVP를 대체하는 것이 아니라 **사용자 식별과 참여 레이어를 추가하는 고도화**다.

---

## 11. UX 상태 정의

### Authentication

- 인증 상태 확인 중: Loading
- 잘못된 이메일/비밀번호: 명확한 로그인 실패 메시지
- 회원가입 입력 오류: 필드별 안내
- 서버 오류: 재시도 가능한 일반 오류 안내

### Comments

- 댓글 조회 중: Loading
- 댓글 없음: `No comments yet. Be the first to join the conversation.`
- 비로그인: 로그인 CTA 표시
- 댓글 제출 중: 버튼 비활성화
- 빈 댓글: 전송 차단
- 댓글 조회 실패: Error + Retry
- 삭제 중: 중복 삭제 방지
- 삭제 권한 없음: 사용자에게 권한 오류 안내

사용자가 "왜 동작하지 않는지"와 "현재 무엇이 처리 중인지"를 알 수 있도록 상태를 구분한다.

---

## 12. 환경 및 보안

- DB 접속 정보는 `.env`에서 관리
- `SESSION_SECRET`은 환경 변수로 관리
- 실제 비밀번호는 저장하지 않고 `bcrypt` hash만 저장
- 세션 쿠키는 `HttpOnly` 사용
- production에서 `Secure` 사용
- CORS 허용 Origin을 환경 변수로 제한
- credential 요청을 허용할 Origin만 명시
- 사용자 ID / role을 클라이언트 입력값만으로 신뢰하지 않음
- 댓글 작성/삭제 권한은 서버에서 검증
- 서버 내부 오류 메시지를 그대로 클라이언트에 노출하지 않음
- 최소 입력값 검증 적용

예상 환경 변수:

```env
DATABASE_URL="..."
DIRECT_URL="..."
SESSION_SECRET="..."
CORS_ORIGIN="http://localhost:5173,https://koaus-validation-mvp.vercel.app"
```

---

## 13. 기능 동작 검증 시나리오

### 성공 케이스

1. 새 사용자가 회원가입한다.
2. 로그인 상태가 유지된다.
3. Editorial 글을 읽는다.
4. 댓글을 작성한다.
5. 새로고침 후에도 댓글이 남아 있다.
6. 본인의 댓글에 삭제 버튼이 보인다.
7. 본인 댓글을 삭제할 수 있다.
8. 로그아웃하면 로그인 상태가 해제된다.

### 실패 / 권한 케이스

1. 비로그인 사용자가 댓글 작성 API를 호출하면 `401`을 받는다.
2. 잘못된 비밀번호로 로그인하면 `401`을 받는다.
3. 빈 댓글은 `400`으로 거절된다.
4. 존재하지 않는 게시물에 댓글을 작성하면 `404`를 받는다.
5. 다른 사용자의 댓글을 삭제하면 `403`을 받는다.
6. 존재하지 않는 댓글 삭제는 `404`를 받는다.
7. 서버/API 오류 발생 시 화면에 에러 상태가 표시된다.

---

## 14. 확장 가능성

Mission 8에서는 구현하지 않지만 현재 구조가 다음 기능을 막지 않도록 설계한다.

- 사용자 프로필
- 댓글 수정 / 대댓글
- Saved Articles / Saved Products
- 콘텐츠 작성자를 User와 통합
- 관리자 CMS
- 신고 / moderation
- 개인화 콘텐츠 추천
- 향후 KOAUS Commerce 사용자 계정 연동

---

## 15. 구현 순서

```text
1. Mission 7 코드리뷰 잔여사항 정리
   ↓
2. 백엔드 구조 분리 및 공통 에러 처리
   ↓
3. Session / User 데이터 모델 설계
   ↓
4. 회원가입 / 로그인 / 로그아웃 / me API
   ↓
5. 프론트 AuthProvider 및 로그인 UI
   ↓
6. Comment 데이터 모델 및 API
   ↓
7. Editorial 상세 페이지 댓글 UI 통합
   ↓
8. 권한 / 실패 시나리오 검증
   ↓
9. KO/EN 토글 제거 및 English-only UI 정리
   ↓
10. README 최종 문서화 및 배포 검증
```

---

## 16. Mission 8 제출 기준 대응

### 기본 요구사항

- [x] 고도화 기능 선택 및 범위 정의
- [x] 기존 MVP 한계 정의
- [x] 사용자 흐름 설계
- [ ] 세션 기반 인증 실제 구현
- [ ] 댓글 기능 실제 구현
- [ ] 기존 MVP와 통합
- [ ] 성공/실패 시나리오 검증

### 심화 요구사항

- [x] UX 상태 설계
- [x] 세션 인증 선택 이유 문서화
- [x] 확장 가능성 고려
- [x] 환경/보안 설계
- [ ] 실제 코드의 환경 변수/보안 설정 검증
- [ ] 구현 완료 후 사용 방법 및 데모 시나리오 업데이트

---

## 17. 최종 제출물

- GitHub Public Repository
- Vercel Deployment URL
- README에 선택 기능, 선택 이유, 주요 기능, 사용 방법, 데모 시나리오 문서화

구현 완료 후 본 문서의 설계 내용을 실제 구현 결과에 맞춰 README에 통합한다.
