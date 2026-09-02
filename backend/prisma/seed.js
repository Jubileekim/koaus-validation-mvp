import prisma from '../db/prisma.js'

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

  await prisma.product.upsert({
    where: {
      id: 'product-stationery-01',
    },
    update: {},
    create: {
      id: 'product-stationery-01',
      name: 'Korean Study Planner',
      description:
        'A simple Korean study planner curated by KOAUS.',
      category: 'Stationery',
      price: 12.99,
    },
  })

  await prisma.product.upsert({
    where: {
      id: 'product-lifestyle-01',
    },
    update: {},
    create: {
      id: 'product-lifestyle-01',
      name: 'Seoul Daily Pouch',
      description:
        'A compact lifestyle pouch inspired by everyday Seoul.',
      category: 'Lifestyle',
      price: 18.99,
    },
  })

  await prisma.product.upsert({
    where: {
      id: 'product-stationery-02',
    },
    update: {},
    create: {
      id: 'product-stationery-02',
      name: 'Korean Highlight Marker Set',
      description:
        'A curated marker set for journaling and study.',
      category: 'Stationery',
      price: 9.99,
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })