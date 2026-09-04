## Project History

이 프로젝트는 코드잇 부트캠프 Sprint Mission을 통해
단계적으로 확장했습니다.

- **Sprint Mission 6** — React 기반 Frontend MVP
- **Sprint Mission 7** — Express + Prisma + PostgreSQL 기반 Full-stack MVP

Mission 6의 기존 프로젝트 문서는 아래에서 확인할 수 있습니다.

→ [Mission 6 README](./docs/mission6.md)

# KOAUS — Editorial Commerce MVP

KOAUS는 한국의 제품, 공간, 라이프스타일과 소비 트렌드를
Editorial 콘텐츠를 통해 소개하고,
관련 상품을 자연스럽게 Marketplace로 연결하는
Editorial Commerce MVP입니다.

코드잇 부트캠프 Sprint Mission 6에서 제작한
React 프론트엔드 MVP를 기반으로,
Sprint Mission 7에서 Express API, PostgreSQL 데이터베이스,
Prisma ORM을 추가하여 실제 클라이언트-서버 구조로 확장했습니다.

---

## Sprint Mission 7

이번 미션에서는 기존 Mock Data 기반 프론트엔드를
실제 백엔드 API 및 데이터베이스와 연결했습니다.

주요 구현 범위는 다음과 같습니다.

- Express 기반 REST API
- PostgreSQL 데이터베이스
- Prisma ORM
- Editorial 게시물 CRUD
- Product 목록 및 상세 API
- React ↔ Express API 연동
- 입력값 검증 및 에러 처리
- 게시물 수정/삭제 비밀번호 검증
- bcrypt 기반 비밀번호 해시 저장
- 환경변수 분리
- KO / EN Editorial 콘텐츠
- Article / Reel 콘텐츠 타입
- Editorial 콘텐츠 내 Marketplace 상품 연결

---

# Core Features

## 1. Editorial

한국의 제품, 공간, 라이프스타일과 트렌드를
매거진 형태의 콘텐츠로 제공합니다.

지원 기능:

- Editorial 목록 조회
- Editorial 상세 조회
- Article / Reel 콘텐츠
- 한국어 / 영어 콘텐츠
- 글 작성
- 글 수정
- 글 삭제
- 대표 이미지
- 영상 콘텐츠
- 본문 중간 상품 카드 삽입
- Marketplace 상품 상세 페이지 연결

Editorial 내부에서는 다음 형식으로
관련 상품을 본문에 삽입할 수 있습니다.

```text
[[PRODUCT:product-id]]
```

프론트엔드는 이 값을 감지하여
실제 Product API에서 상품 정보를 가져온 뒤
"Shop the Story" 상품 카드로 렌더링합니다.

---

## 2. Marketplace

실제 API로부터 상품 목록을 조회합니다.

지원 기능:

- 전체 상품 조회
- 상품명 검색
- 카테고리 필터
- 가격 및 조건 기반 정렬
- 상품 상세 조회
- Product Gallery
- Product Not Found 처리
- Loading / Error 상태 처리

---

## 3. Editorial Commerce

KOAUS는 콘텐츠와 커머스를 별도의 기능으로 분리하지 않고
Editorial 콘텐츠 안에서 자연스럽게 연결합니다.

```text
Editorial Story
       ↓
Trend / Culture Context
       ↓
Related Korean Product
       ↓
Shop the Story
       ↓
Marketplace
       ↓
Product Detail
```

독자는 먼저 이야기와 맥락을 접하고,
관심이 생긴 상품을 Marketplace에서 확인할 수 있습니다.

---

# Tech Stack

## Frontend

- React 19
- React Router
- Vite
- JavaScript / JSX
- CSS
- React Context API
- Fetch API

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- bcryptjs
- dotenv
- cors

## Infrastructure

- Vercel — Frontend / Backend deployment
- Supabase — Managed PostgreSQL

---

# Architecture

```text
Browser
  │
  │ HTTP Request
  ▼
React / Vite Frontend (Vercel)
  │
  │ fetch()
  ▼
Express REST API (Vercel)
  │
  │ Prisma
  ▼
Supabase PostgreSQL
```

예를 들어 Editorial 목록을 불러올 때의 흐름은 다음과 같습니다.

```text
EditorialPage
   ↓
getPosts()
   ↓
GET /api/posts
   ↓
Express Router
   ↓
Prisma
   ↓
PostgreSQL
   ↓
JSON Response
   ↓
React UI Rendering
```

---

# Data Models

## Editor

Editorial 글 작성자 정보를 저장합니다.

주요 필드:

| Field       | Description |
| ----------- | ----------- |
| `id`        | Editor ID   |
| `name`      | 이름          |
| `bio`       | 소개          |
| `avatarUrl` | 프로필 이미지     |
| `createdAt` | 생성일         |

---

## Post

Editorial 게시물을 저장합니다.

주요 필드:

| Field          | Description      |
| -------------- | ---------------- |
| `id`           | 게시물 ID           |
| `title`        | 영어 제목            |
| `titleKo`      | 한국어 제목           |
| `content`      | 영어 본문            |
| `contentKo`    | 한국어 본문           |
| `type`         | ARTICLE / REEL   |
| `imageUrl`     | 대표 이미지           |
| `videoUrl`     | 영상 URL           |
| `editorId`     | 작성자 ID           |
| `passwordHash` | 수정/삭제용 비밀번호 Hash |
| `createdAt`    | 생성일              |
| `updatedAt`    | 수정일              |

---

## Product

Marketplace 상품 데이터를 저장합니다.

주요 데이터:

- 상품명
- 한국어 상품명
- 브랜드
- 카테고리
- 가격
- Creator Price
- MOQ
- 이미지
- 상품 설명
- Collaboration Type
- Product Highlights
- Creator Fit
- Content Ideas

---

# REST API

Production Base URL:

```text
https://koaus-mission7-backend.vercel.app
```

Local Base URL:

```text
http://localhost:3000
```

---

## Editorial API

### GET /api/posts

전체 Editorial 게시물을 조회합니다.

### Request

```http
GET /api/posts
```

### Response

```json
[
  {
    "id": "editorial-seoul-stationery-shop",
    "title": "Why Seoul Stationery Shops Feel Like Tiny Galleries",
    "titleKo": "서울의 문구점은 왜 작은 갤러리처럼 보일까",
    "type": "ARTICLE",
    "imageUrl": "/assets/editorial/editorial-stationery.jpg",
    "createdAt": "2026-09-02T00:00:00.000Z"
  }
]
```

---

### GET /api/posts/:id

게시물 하나를 조회합니다.

### Request

```http
GET /api/posts/editorial-seoul-stationery-shop
```

### Success

```text
200 OK
```

게시물이 존재하지 않는 경우:

```text
404 Not Found
```

---

### POST /api/posts

새 Editorial 게시물을 생성합니다.

### Request

```http
POST /api/posts
Content-Type: application/json
```

```json
{
  "title": "A New Story",
  "titleKo": "새로운 이야기",
  "content": "Story content",
  "contentKo": "이야기 본문",
  "type": "ARTICLE",
  "imageUrl": "/assets/editorial/example.jpg",
  "editorId": "editor-koaus-01",
  "password": "sample123"
}
```

### Validation

- `title` 필수
- `content` 필수
- `editorId` 필수
- `type`은 `ARTICLE` 또는 `REEL`
- 비밀번호는 최소 6자

정상 생성:

```text
201 Created
```

잘못된 요청:

```text
400 Bad Request
```

---

### PATCH /api/posts/:id

기존 게시물을 수정합니다.

수정 시 해당 게시물의 비밀번호가 필요합니다.

### Request

```http
PATCH /api/posts/:id
Content-Type: application/json
```

```json
{
  "title": "Updated Story",
  "content": "Updated content",
  "password": "sample123"
}
```

비밀번호가 잘못된 경우:

```text
403 Forbidden
```

게시물이 없는 경우:

```text
404 Not Found
```

---

### DELETE /api/posts/:id

게시물을 삭제합니다.

비밀번호는 요청 Header를 통해 전달합니다.

### Request

```http
DELETE /api/posts/:id
x-post-password: sample123
```

비밀번호가 잘못된 경우:

```text
403 Forbidden
```

게시물이 없는 경우:

```text
404 Not Found
```

---

# Product API

## GET /api/products

전체 상품 목록을 조회합니다.

```http
GET /api/products
```

정상 응답:

```text
200 OK
```

---

## GET /api/products/:id

상품 하나의 상세 데이터를 조회합니다.

예:

```http
GET /api/products/monami-153-geometric
```

정상 응답:

```text
200 OK
```

상품이 없는 경우:

```text
404 Not Found
```

---

# Validation & Error Handling

API는 잘못된 요청에 대해
HTTP Status Code와 JSON 메시지를 함께 반환합니다.

예:

```json
{
  "message": "Title and content are required"
}
```

주요 상태 코드:

| Status | Meaning    |
| ------ | ---------- |
| `200`  | 요청 성공      |
| `201`  | 데이터 생성 성공  |
| `400`  | 입력값 오류     |
| `403`  | 비밀번호 검증 실패 |
| `404`  | 데이터 없음     |
| `500`  | 서버 오류      |

프론트엔드에서도 API 실패 시
Loading / Error / Empty State를 구분하여 표시합니다.

---

# Post Edit / Delete Protection

Editorial 게시물 작성 시 사용자가 비밀번호를 입력합니다.

비밀번호 원문은 데이터베이스에 저장하지 않고
`bcryptjs`를 사용하여 Hash 값만 저장합니다.

```text
User Password
      ↓
bcrypt.hash()
      ↓
passwordHash
      ↓
PostgreSQL
```

수정 또는 삭제 요청 시에는
입력된 비밀번호와 저장된 Hash를 비교합니다.

```text
password
   ↓
bcrypt.compare()
   ↓
true / false
```

> 이 기능은 게시물 수정/삭제 보호를 위한 간단한 구현입니다.
> JWT 기반 사용자 인증 시스템은 현재 구현 범위에 포함하지 않았습니다.

---

# Environment Variables

환경별 API 및 데이터베이스 설정은 `.env`로 분리합니다.

## Frontend

로컬 개발:

```env
VITE_API_URL=http://localhost:3000
```

Production(Vercel):

```env
VITE_API_URL=https://koaus-mission7-backend.vercel.app
```

프론트엔드에서는 다음 환경변수를 사용합니다.

```js
import.meta.env.VITE_API_URL
```

---

## Backend

`backend/.env`

```env
DATABASE_URL="YOUR_POOLED_DATABASE_URL"
DIRECT_URL="YOUR_DIRECT_DATABASE_URL"
```

- `DATABASE_URL` — 애플리케이션 런타임에서 사용하는 Supabase pooled connection
- `DIRECT_URL` — Prisma migration 등 CLI 작업에 사용하는 direct/session connection

실제 `.env` 파일은 Git에 Commit하지 않습니다.

Repository에는 필요한 변수 이름을 확인할 수 있도록
`.env.example`만 포함합니다.

---

# Project Structure

```text
koaus-validation-mvp/
├── public/
│   └── assets/
│       ├── editorial/
│       ├── images/
│       └── videos/
│
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── i18n/
│   ├── pages/
│   ├── services/
│   │   ├── postApi.js
│   │   └── productApi.js
│   ├── styles/
│   └── utils/
│
├── backend/
│   ├── db/
│   │   └── prisma.js
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed scripts
│   ├── app.js
│   ├── package.json
│   └── .env.example
│
├── .env.example
├── package.json
└── README.md
```

---

# Routes

| Route                     | Description    |
| ------------------------- | -------------- |
| `/`                       | Landing Page   |
| `/editorial`              | Editorial 목록   |
| `/editorial/write`        | Editorial 작성   |
| `/editorial/:postId`      | Editorial 상세   |
| `/editorial/:postId/edit` | Editorial 수정   |
| `/marketplace`            | Marketplace    |
| `/products/:productId`    | Product Detail |
| `/creator-access`         | Creator Access |
| `/brands`                 | Brand Page     |
| `*`                       | Not Found      |

---

# Run Locally

## 1. Frontend

프로젝트 루트에서:

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 2. Database

Supabase PostgreSQL을 사용합니다.

`backend/.env`에 아래 환경변수를 설정합니다.

```env
DATABASE_URL="YOUR_POOLED_DATABASE_URL"
DIRECT_URL="YOUR_DIRECT_DATABASE_URL"
```

이미 생성된 migration을 새 데이터베이스에 적용해야 하는 경우:

```bash
cd backend
npx prisma migrate deploy
```

---

## 3. Backend

다른 터미널에서:

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:3000
```

---

# Development Environment

Supabase를 데이터베이스로 사용하므로 별도의 로컬 Prisma DB 프로세스를 실행할 필요가 없습니다.

```text
Terminal 1
backend → npm run dev

Terminal 2
project root → npm run dev
```

---

# Mission 7 Requirement Coverage

## 기본 요구사항

### 1. 서버 및 API 구현

✅ Express 기반 REST API 구현

✅ Request → Express → Prisma → Database → Response 구조

---

### 2. 데이터 저장 구조

✅ Supabase PostgreSQL 사용

✅ Prisma Schema 기반 데이터 모델 정의

✅ Editor / Post / Product 모델 사용

---

### 3. Frontend - Backend 연동

✅ React에서 실제 REST API 호출

✅ Editorial Mock Data 제거

✅ Marketplace Product API 연동

✅ Loading / Error / Not Found UI 처리

---

### 4. 배포

✅ Frontend Vercel 배포 완료

✅ Backend Vercel 배포 완료

✅ Supabase PostgreSQL 연결 완료

✅ 배포 API URL을 Vercel Frontend에 연결 완료

---

## 심화 요구사항

### 1. JWT 인증

❌ 미구현

게시물 수정/삭제는 게시물별 비밀번호와
bcrypt Hash 검증 방식으로 보호합니다.

### 2. 입력값 검증 및 에러 처리

✅ 구현

### 3. 환경 분리

✅ `.env` / `.env.example` 사용

### 4. API 문서화

✅ README에 REST API 요청/응답 및 상태 코드 문서화

---

# Repository

GitHub:

[https://github.com/Jubileekim/koaus-validation-mvp](https://github.com/Jubileekim/koaus-validation-mvp)

Pull Request:

[Mission 7 PR #2](https://github.com/Jubileekim/koaus-validation-mvp/pull/2)

> PR은 코드 리뷰 후 최종 merge 예정입니다.

---

# Deployment

Frontend:

https://koaus-validation-mvp.vercel.app

Backend:

https://koaus-mission7-backend.vercel.app

Backend Health Check:

https://koaus-mission7-backend.vercel.app/api/health

Database:

Supabase PostgreSQL

---

## Sprint Mission 7

Codeit Bootcamp  
Frontend MVP → Full-stack Client / Server MVP

### 제출용 정리 상태

```text
.env.example                  ✅
backend/.env.example          ✅
README API 문서화             ✅
입력값/에러 처리 설명          ✅
DB 모델 설명                  ✅
환경 분리 설명                ✅
Mission 7 요구사항 체크        ✅
Frontend 배포 URL             ✅
Backend 배포 URL              ✅
Supabase PostgreSQL           ✅
PR #2 Open                    ✅
```
