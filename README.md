# KoaUS Creator Marketplace MVP

미션 5에서 제작한 정적 랜딩 페이지를 기반으로, React와 브라우저 상태 관리 기능을 적용해 실제로 탐색하고 입력할 수 있는 프론트엔드 MVP로 확장한 프로젝트입니다.

KoaUS는 **한국 브랜드의 상품과 미국 크리에이터를 연결하는 큐레이션 기반 B2B Creator Marketplace**를 가정합니다. 크리에이터는 상품을 탐색하고 전용 조건을 확인한 뒤 협업 요청을 남길 수 있고, 한국 브랜드는 상품 입점 문의를 등록할 수 있습니다.

> 이 프로젝트는 코드잇 부트캠프 Sprint Mission 6용 프론트엔드 MVP입니다. 실제 인증, 이메일 발송, 결제, 브랜드 전송, 백엔드 API는 구현하지 않았으며, 필요한 데이터는 Mock Data와 localStorage로 시뮬레이션합니다.

## Core MVP Features

### 1. Creator Marketplace
- 실제 한국 상품을 참고한 Mock Product Catalog
- 상품명/브랜드 검색
- 카테고리 필터
- 가격 및 Creator Margin 정렬
- Featured Product Carousel
- Product Detail / Product Gallery
- 검색 결과가 없을 때 Empty State

### 2. Creator Access
- 크리에이터 프로필 입력 및 validation
- localStorage 기반 Creator Access 상태 저장
- 등록 전 Creator Price / Margin / MOQ 잠금
- 등록 후 Creator 전용 조건 공개
- Reset Creator Access 지원

### 3. Collaboration Request
- Product Detail에서 협업 요청 Modal 제공
- Group Buy / Affiliate / UGC 등 상품별 협업 유형 선택
- 예상 수량 및 메시지 입력 validation
- 요청 내역 localStorage 저장
- 동일 상품의 제출 완료 상태 표시

### 4. Brand Product Inquiry
- 한국 브랜드용 `/brands` 페이지
- 브랜드 및 상품 정보 입력
- 카테고리 / 미국 진출 현황 / 희망 협업 유형 입력
- localStorage 저장
- 성공 및 validation 상태 제공

## User Flow

### Creator Flow

```text
Home
→ Marketplace
→ Product Detail
→ Creator Access
→ Creator Profile 저장
→ 원래 Product Detail로 Redirect
→ Creator Price / Margin / MOQ 확인
→ Request Collaboration
→ Request Submitted
```

### Brand Flow

```text
Home
→ For Brands
→ List Your Product
→ Brand Inquiry Form
→ Validation
→ localStorage 저장
→ Inquiry Submitted
```

## Routes

| Route | Description |
| --- | --- |
| `/` | KoaUS Landing Page |
| `/marketplace` | Creator Marketplace |
| `/products/:productId` | Product Detail |
| `/creator-access` | Creator Access 등록 및 상태 확인 |
| `/brands` | Korean Brand 소개 및 입점 문의 |
| `*` | Not Found Page |

## State & Interaction

React의 기본 상태 관리 기능을 중심으로 구현했습니다.

- `useState`: 검색, 필터, 정렬, 폼 입력, validation, success/error 상태, Modal, Carousel, Product Gallery 등
- `useMemo`: 검색/필터/정렬 결과 및 Creator Profile 초기 조회
- `useEffect`: browser event/observer 연동, modal keyboard UX, locale 동기화 등
- React Context: KO / EN 전역 Locale 상태
- React Router: 주요 화면 및 Redirect 흐름

Mission 5의 시각적 reveal/video/scroll observer와 같이 브라우저 API가 필요한 효과는 `useEffect` 내부에서 관리하고, Mission 6에서 추가한 실제 사용자 상호작용은 React state 기반으로 구현했습니다.

## localStorage

| Key | Purpose |
| --- | --- |
| `koaus_creator` | Creator Profile 및 Access 상태 |
| `koaus_collaboration_requests` | Creator Collaboration Request 목록 |
| `koaus_brand_inquiries` | Brand Product Inquiry 목록 |
| `koaus_locale` | KO / EN 언어 설정 |

localStorage 접근은 service 계층으로 분리했으며 JSON parse/write 실패에 대한 fallback을 제공합니다. 저장 자체가 실패하는 경우 Form에서 사용자에게 에러 메시지를 표시합니다.

## Localization

- Header의 기존 `KO / EN` 토글 UI 사용
- React Context 기반 전역 locale 관리
- 선택 언어를 localStorage에 저장해 새로고침 후에도 유지
- 한국어/영어를 단순 직역하지 않고 각 사용자에게 자연스러운 UX copy로 작성
- 상품 검색 시 영문 상품명과 한국어 상품명을 모두 검색 대상에 포함

## UX States

- Form validation error
- localStorage save failure error
- Empty search result
- Product not found
- 404 Not Found
- Creator Access Active / Reset
- Collaboration Request Submitted
- Brand Inquiry Submitted
- Image loading skeleton
- Image loading failure fallback
- Disabled submitting state

## Component Design / State / Loading UX / API

### Component Design
Reusable Header, ProductCard, ProductImage, ProductGallery, Button, FormField 등을 사용했다.

### State
useState + localStorage로 페이지 이동 및 새로고침 이후에도 Creator Access / collaboration / brand inquiry / locale 상태를 유지한다.

### Loading UX
ProductImage에서 실제 image loading lifecycle 기반 skeleton을 제공한다.

### API
Mission 6 범위에서는 Mock Data + localStorage를 사용하며 실제 API 연동은 Mission 7에서 진행한다.

## Design System

Mission 5의 비주얼 아이덴티티를 유지하면서 전 페이지에 공통 패턴을 적용했습니다.

- Warm neutral canvas
- Strong black typography
- Red/orange accent
- Rounded cards
- Thin gray borders
- Shared CTA/button styles
- Shared global GNB
- Responsive product cards and forms

## Tech Stack

- React 19
- React Router
- Vite
- JavaScript / JSX
- CSS
- Mock Data
- localStorage
- React Context API

## Project Structure

```text
src/
├── components/
│   ├── collaboration/
│   ├── landing/
│   ├── layout/
│   ├── marketplace/
│   └── ui/
├── contexts/
├── data/
├── i18n/
├── pages/
├── services/
├── styles/
└── utils/
```

## Run Locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## Repository

GitHub: https://github.com/Jubileekim/koaus-validation-mvp

## Deployment

Vercel 배포 URL은 미션 제출 페이지에 GitHub 저장소 URL과 함께 제출합니다.
