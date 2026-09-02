import prisma from '../db/prisma.js'
import { PRODUCTS } from '../../src/data/products.js'

async function main() {
  const editor = await prisma.editor.upsert({
    where: {
      id: 'editor-koaus-01',
    },
    update: {},
    create: {
      id: 'editor-koaus-01',
      name: 'KOAUS Editorial',
      bio: 'Stories and trends from Korea for a global audience.',
    },
  })

  await prisma.post.upsert({
    where: {
      id: 'post-article-01',
    },
    update: {},
    create: {
      id: 'post-article-01',
      title: 'Inside Seoul: Everyday Trends Worth Watching',
      content:
        'A first KOAUS editorial story exploring everyday culture, lifestyle, and emerging trends from Korea.',
      type: 'ARTICLE',
      editorId: editor.id,
    },
  })

  await prisma.post.upsert({
    where: {
      id: 'post-reel-01',
    },
    update: {},
    create: {
      id: 'post-reel-01',
      title: 'A Quick Look at Seoul Lifestyle',
      content:
        'A short-form KOAUS story designed for visual trend discovery.',
      type: 'REEL',
      editorId: editor.id,
    },
  })

  // 전에 테스트용으로 넣었던 임시 상품 제거
  await prisma.product.deleteMany({
    where: {
      id: {
        in: [
          'product-stationery-01',
          'product-lifestyle-01',
          'product-stationery-02',
        ],
      },
    },
  })

  // Mission 6의 PRODUCTS 데이터를 실제 DB로 이동
  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: {
        name: product.name,
        nameKo: product.nameKo || null,
        brand: product.brand || null,
        category: product.category || null,
        description:
          product.description?.en ||
          product.description?.ko ||
          null,
        tagline: product.tagline || undefined,
        retailPrice: product.retailPrice ?? null,
        price: product.retailPrice ?? null,
        creatorMargin: product.creatorMargin ?? null,
        sampleAvailable: product.sampleAvailable ?? false,
        isNew: product.isNew ?? false,
        images: product.images || undefined,
      },
      create: {
        id: product.id,
        name: product.name,
        nameKo: product.nameKo || null,
        brand: product.brand || null,
        category: product.category || null,
        description:
          product.description?.en ||
          product.description?.ko ||
          null,
        tagline: product.tagline || undefined,
        retailPrice: product.retailPrice ?? null,
        price: product.retailPrice ?? null,
        creatorMargin: product.creatorMargin ?? null,
        sampleAvailable: product.sampleAvailable ?? false,
        isNew: product.isNew ?? false,
        images: product.images || undefined,
      },
    })
  }

  console.log(`Seed completed: ${PRODUCTS.length} products added`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })