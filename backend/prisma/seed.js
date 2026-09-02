import bcrypt from 'bcryptjs'
import prisma from '../db/prisma.js'
import { PRODUCTS } from '../../src/data/products.js'

async function main() {
  const editor = await prisma.editor.upsert({
    where: {
      id: 'editor-koaus-01',
    },

    update: {
      name: 'KOAUS Editorial',
      bio: 'Stories, places, products and cultural shifts from Korea.',
    },

    create: {
      id: 'editor-koaus-01',
      name: 'KOAUS Editorial',
      bio: 'Stories, places, products and cultural shifts from Korea.',
    },
  })

  const samplePasswordHash = await bcrypt.hash(
    'koaus123',
    10,
  )

  // 지금까지 만든 테스트 글 정리
  await prisma.post.deleteMany()

  const samplePosts = [
    {
      id: 'editorial-seongsu',
      title:
        'Seongsu Is Not Just a Café District Anymore',
      titleKo:
        '성수는 더 이상 카페 거리만이 아니다',

      content: `Walk through Seongsu today and the neighborhood feels like a live experiment in how Seoul reinvents itself.

Old factories, printing shops and shoe workshops still sit between cafés, fashion flagships and temporary brand spaces. That contrast is exactly what gives Seongsu its character. The neighborhood did not become interesting because its industrial past disappeared. It became interesting because a new creative economy learned how to work around it.

For global brands, Seongsu has become a place to test ideas in public. Pop-up stores are designed less like ordinary shops and more like exhibitions, installations or pieces of content waiting to be photographed. A product launch can become a café, a gallery or an entire building experience for a few weeks.

But the most useful way to understand Seongsu is not as Seoul's answer to another famous creative district. It is a uniquely Korean mix of manufacturing history, dense city streets, independent businesses and highly visual retail culture.

That makes Seongsu worth watching. Trends that appear here often reveal how young Korean consumers want to discover brands: not only by buying something, but by entering a world built around it.`,

      contentKo: `지금 성수를 걷다 보면 이 동네 전체가 서울이 스스로를 어떻게 새롭게 만드는지 보여주는 하나의 거대한 실험실처럼 느껴진다.

오래된 공장과 인쇄소, 수제화 작업장 사이로 카페와 패션 플래그십 스토어, 짧은 기간 운영되는 브랜드 팝업이 들어서 있다. 성수의 매력은 바로 이 대비에서 나온다. 산업의 흔적이 사라졌기 때문에 흥미로운 동네가 된 것이 아니라, 그 위에 새로운 창작 산업과 소비 문화가 겹쳐졌기 때문이다.

글로벌 브랜드에게 성수는 아이디어를 실제 사람들 앞에서 시험해 보는 공간이 되고 있다. 팝업스토어는 단순한 판매 매장보다 전시, 설치미술, 혹은 사람들이 직접 들어가 경험하고 촬영할 수 있는 콘텐츠에 가깝게 설계된다.

하지만 성수를 단순히 해외의 유명한 크리에이티브 지역과 비교해서 볼 필요는 없다. 제조업의 역사, 촘촘한 골목, 독립 상점, 그리고 시각적인 경험을 중시하는 한국의 리테일 문화가 동시에 존재하는 아주 서울다운 공간이기 때문이다.

그래서 성수는 계속 지켜볼 가치가 있다. 이곳에서 나타나는 변화는 한국의 젊은 소비자들이 브랜드를 어떻게 발견하고 싶은지 보여준다. 이제 사람들은 물건 하나를 사는 것뿐 아니라, 그 브랜드가 만든 세계 안으로 들어가고 싶어 한다.`,

      imageUrl:
        'https://images.unsplash.com/photo-1620817777108-1c8fa22ed67f?auto=format&fit=crop&w=1800&q=85',
    },

    {
      id: 'editorial-convenience-store',
      title:
        'Why Korean Convenience Stores Feel Like Lifestyle Platforms',
      titleKo:
        '한국 편의점이 작은 라이프스타일 플랫폼처럼 느껴지는 이유',

      content: `In Korea, a convenience store is rarely just a place to buy a bottle of water.

A late-night visit might involve a quick meal, a limited-edition snack, parcel pickup, coffee, an umbrella, beauty products or the newest collaboration that suddenly appears across social media.

The most interesting part is the speed. Korean convenience stores constantly rotate products and formats, which makes an ordinary neighborhood shop feel surprisingly close to a trend laboratory.

Food is central to that experience. Convenience-store meals are designed around specific routines: breakfast before work, lunch between classes, a late-night snack or a quick meal eaten alone. New combinations spread through short-form videos, and customers often become the ones inventing the next popular way to eat them.

Convenience stores also show how Korean retail often collapses the boundary between necessity and entertainment. Something people visit because they need toothpaste can also become a place where they discover a character collaboration, seasonal dessert or viral drink.

For anyone trying to understand everyday consumer culture in Korea, the convenience store is one of the most useful places to start. It is small, ordinary and everywhere — which is exactly why it captures change so quickly.`,

      contentKo: `한국에서 편의점은 단순히 생수 한 병을 사러 들어가는 장소에 그치지 않는다.

늦은 밤 편의점에 들어가면 간단한 한 끼부터 기간 한정 과자, 택배, 커피, 우산, 뷰티 제품, 그리고 어느 날 갑자기 SNS를 채우기 시작한 새로운 콜라보 상품까지 한 공간에서 만나게 된다.

특히 흥미로운 것은 변화의 속도다. 한국 편의점은 제품과 포맷을 끊임없이 바꾸기 때문에 평범한 동네 매장이 작은 트렌드 실험실처럼 느껴질 때가 많다.

그 중심에는 음식이 있다. 출근 전 아침, 수업 사이의 점심, 늦은 밤 야식처럼 아주 구체적인 생활 장면을 겨냥한 상품이 등장한다. 사람들은 서로 다른 제품을 조합해 새로운 레시피를 만들고, 그 방식이 숏폼 콘텐츠를 통해 퍼지면서 또 하나의 유행이 된다.

편의점은 한국의 리테일이 ‘필요한 것’과 ‘재미있는 것’의 경계를 얼마나 빠르게 허무는지도 보여준다. 치약이 필요해서 들어간 사람이 캐릭터 협업 상품이나 계절 한정 디저트, 바이럴 음료를 발견할 수 있는 곳이다.

한국의 일상적인 소비 문화를 이해하고 싶다면 편의점은 꽤 좋은 출발점이다. 작고 평범하고 어디에나 있기 때문에 오히려 변화가 가장 빠르게 드러나는 공간이기도 하다.`,

      imageUrl:
        'https://images.unsplash.com/photo-1726859139824-ef2dcef34b1f?auto=format&fit=crop&w=1800&q=85',
    },

    {
      id: 'editorial-stationery',
      title:
        'The Quiet Export Power of Korean Stationery',
      titleKo:
        '조용히 세계로 퍼지는 한국 문구의 힘',

      content: `Korean stationery rarely announces itself as a major cultural export. It usually arrives quietly: a tiny memo pad, a planner, a sticker sheet or a notebook discovered through a creator's desk tour.

That small scale is part of its strength.

Many Korean stationery products are inexpensive enough to try without much hesitation, but designed carefully enough to feel personal. Color, typography, paper texture and packaging turn ordinary tools into objects people want to keep on their desks.

The global return of journaling and analog routines has made that combination increasingly relevant. A notebook is no longer competing only with another notebook. It can become part of a study routine, a desk aesthetic, a travel journal or a piece of short-form content.

Independent stationery shops in Seoul make this especially visible. Their shelves often mix practical tools with illustration, small publishing, stickers and objects from emerging designers. Shopping becomes a form of browsing culture rather than simply replacing supplies.

Korean stationery may never travel internationally in exactly the same way as K-pop or beauty. Its strength is quieter. One desk, one journal and one creator video at a time, small objects can build surprisingly durable interest in Korean design.`,

      contentKo: `한국 문구는 스스로를 거대한 문화 수출품이라고 크게 주장하지 않는다. 대신 작은 메모지, 플래너, 스티커 한 장, 혹은 크리에이터의 데스크 투어 영상 속 노트 한 권처럼 조용히 사람들의 일상으로 들어간다.

그리고 바로 그 작은 규모가 강점이 된다.

많은 한국 문구 제품은 큰 고민 없이 한 번 써볼 수 있을 만큼 접근하기 쉬우면서도, 색상과 타이포그래피, 종이의 질감, 패키지까지 세심하게 디자인되어 있다. 평범한 도구가 책상 위에 계속 두고 싶은 물건으로 바뀌는 것이다.

최근 저널링과 아날로그 루틴에 대한 관심이 다시 커지면서 이런 특징은 더 중요해지고 있다. 이제 노트는 단순히 다른 노트와 경쟁하는 제품이 아니다. 공부 루틴, 데스크테리어, 여행 기록, 혹은 숏폼 콘텐츠의 일부가 될 수 있다.

서울의 독립 문구점에 가면 이런 흐름을 특히 쉽게 볼 수 있다. 실용적인 필기구 옆에 일러스트, 스티커, 소규모 출판물, 신진 디자이너의 작은 오브제가 함께 놓여 있다. 문구를 사는 행위 자체가 필요한 물건을 보충하는 일을 넘어 하나의 취향 탐색이 된다.

한국 문구가 K-pop이나 K-뷰티와 똑같은 방식으로 해외에 퍼지지는 않을 것이다. 오히려 그 힘은 훨씬 조용하다. 한 사람의 책상, 한 권의 다이어리, 한 편의 크리에이터 영상에서 시작된 작은 물건이 한국 디자인에 대한 오래가는 관심을 만들어낼 수 있다.`,

      imageUrl:
        'https://images.unsplash.com/photo-1758644713545-2d37d5f30308?auto=format&fit=crop&w=1800&q=85',
    },
  ]

  for (const post of samplePosts) {
    await prisma.post.create({
      data: {
        ...post,
        type: 'ARTICLE',
        editorId: editor.id,
        passwordHash: samplePasswordHash,
      },
    })
  }

  // 기존 상품 12개 유지
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
    `Seed completed: ${samplePosts.length} editorial stories and ${PRODUCTS.length} products`,
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