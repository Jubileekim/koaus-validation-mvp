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

  for (const product of PRODUCTS) {
    const productData = {
      name: product.name,
      nameKo: product.nameKo || null,
      brand: product.brand || null,
      category: product.category || null,

      country: product.country || null,
      brandOrigin: product.brandOrigin || null,
      sourceUrl: product.sourceUrl || null,

      description:
        product.description?.en ||
        product.description?.ko ||
        null,

      descriptionI18n:
        product.description || undefined,

      tagline:
        product.tagline || undefined,

      retailPrice:
        product.retailPrice ?? null,

      price:
        product.retailPrice ?? null,

      creatorPrice:
        product.creatorPrice ?? null,

      creatorMargin:
        product.creatorMargin ?? null,

      moq:
        product.moq ?? null,

      shipsTo:
        product.shipsTo || null,

      sampleAvailable:
        product.sampleAvailable ?? false,

      isNew:
        product.isNew ?? false,

      images:
        product.images || undefined,

      imageUrl:
        product.images?.main || null,

      externalUrl:
        product.sourceUrl || null,

      collaborationTypes:
        product.collaborationTypes || undefined,

      highlights:
        product.highlights || undefined,

      creatorFit:
        product.creatorFit || undefined,

      contentIdeas:
        product.contentIdeas || undefined,
    }

    await prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: productData,
      create: {
        id: product.id,
        ...productData,
      },
    })
  }

  console.log(
    `Seed completed: ${PRODUCTS.length} products with detail data added`,
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })