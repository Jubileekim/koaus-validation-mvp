import bcrypt from 'bcryptjs'
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
      bio: 'Culture, objects and ideas — observed from Seoul.',
    },
  })

  const passwordHash = await bcrypt.hash(
    'koaus123',
    10,
  )

  const posts = [
    {
      id: 'editorial-seongsu',
      type: 'ARTICLE',

      title:
        'Seongsu Is Becoming a Retail Media Lab',

      titleKo:
        '성수는 왜 리테일 미디어 실험실이 되었을까',

      imageUrl:
        'https://images.unsplash.com/photo-1538485399081-7c897899d6f5?auto=format&fit=crop&w=1800&q=85',

      content: `Seongsu is usually described as Seoul's creative district. That description is no longer enough.

What makes the neighborhood interesting now is not simply that there are good cafés, old factories and fashionable stores in the same place. It is that Seongsu has become a place where brands test how physical space can behave like media.

## The store is no longer just a store

Walk a few blocks and retail starts to look suspiciously like an exhibition.

A cosmetics brand builds a temporary installation. A fashion label turns an empty warehouse into a concept space. A food brand creates something that looks more like a gallery than a shop.

The immediate goal is not always conversion.

The space itself needs to travel — through photographs, Reels, TikTok clips and group chats.

> The interesting part is not the pop-up. It is that retail space has become content infrastructure.

## Why this works especially well in Seongsu

Seongsu has something that a newly built shopping complex cannot easily manufacture: contrast.

Industrial buildings, narrow streets and unfinished surfaces sit next to highly designed retail environments.

That visual friction makes even a small store feel like a discovery.

It also changes how people consume brands. Visitors do not simply ask, "What can I buy here?" They ask, "Is this worth going to?" and "Is this worth sharing?"

### Retail now competes for attention before it competes for money

This changes the economics of a physical store.

A space that generates thousands of social posts can create value far beyond the customers who make a purchase that day.

The store becomes a studio.
The customer becomes distribution.
The visit becomes content.

## What travels beyond Seongsu

The lesson is not that every brand needs an expensive pop-up.

The more useful lesson is that products increasingly need a visual and cultural context.

A basic object can feel very different when it belongs to a clear world.

That is one reason Korean fashion basics travel well online: the object is simple, but the context around it is highly legible.

### From the story to the object

If you want to see the quieter side of contemporary Korean street style, this is one object currently on our radar.

[[PRODUCT:musinsa-bold-beanie]]

Seongsu matters because it shows where retail may be going next.

Not toward bigger stores.

Toward spaces that are simultaneously shop, set, story and distribution channel.`,

      contentKo: `성수는 흔히 '서울의 크리에이티브 지역'이라고 설명된다. 하지만 지금의 성수를 설명하기에는 그것만으로 부족하다.

지금 성수가 흥미로운 이유는 좋은 카페와 오래된 공장, 세련된 매장이 한 동네에 모여 있기 때문만은 아니다. 브랜드들이 오프라인 공간을 하나의 미디어처럼 사용하는 방법을 실험하는 장소가 되었기 때문이다.

## 매장은 더 이상 매장만이 아니다

몇 블록만 걸어도 리테일 공간이 전시처럼 보이기 시작한다.

화장품 브랜드는 일시적인 설치 공간을 만들고, 패션 브랜드는 오래된 창고를 콘셉트 스토어로 바꾸며, 식품 브랜드조차 일반적인 판매점보다 갤러리에 가까운 공간을 만든다.

이때 목표가 항상 당장의 구매 전환인 것은 아니다.

공간 자체가 사진과 릴스, 틱톡, 단체 채팅방을 통해 다시 퍼져야 한다.

> 흥미로운 것은 팝업스토어 자체가 아니다. 리테일 공간이 콘텐츠 인프라가 되고 있다는 점이다.

## 왜 특히 성수에서 잘 작동할까

성수에는 새로 만든 쇼핑몰이 쉽게 복제할 수 없는 것이 있다. 바로 대비다.

공업 건물, 좁은 골목, 거친 표면과 정교하게 설계된 브랜드 공간이 한 장면 안에 함께 존재한다.

이 시각적인 마찰 때문에 작은 가게조차 '발견한 장소'처럼 느껴진다.

사람들의 브랜드 소비 방식도 바뀐다. 이제 방문자는 단순히 '여기서 무엇을 살 수 있지?'만 묻지 않는다.

'여기까지 갈 만한가?', '누군가에게 보여줄 만한가?'를 함께 묻는다.

### 리테일은 돈보다 먼저 관심을 두고 경쟁한다

이 변화는 오프라인 매장의 경제성도 바꾼다.

하루 동안 매장에서 발생한 구매보다 그 공간을 통해 만들어진 수천 개의 콘텐츠가 더 큰 효과를 만들 수도 있다.

매장은 스튜디오가 되고,
고객은 유통 채널이 되고,
방문은 콘텐츠가 된다.

## 성수 밖으로 가져갈 수 있는 것

모든 브랜드가 거대한 팝업스토어를 만들어야 한다는 뜻은 아니다.

더 중요한 것은 제품이 어떤 시각적·문화적 맥락 안에서 보이느냐는 것이다.

평범한 물건도 분명한 세계관 안에 들어가면 전혀 다르게 보인다.

한국의 베이직 패션이 온라인에서 잘 전달되는 것도 이런 이유 중 하나다. 제품은 단순하지만, 그 제품이 놓이는 스타일과 장면은 매우 명확하다.

### 이야기에서 오브제로

요즘의 한국 스트리트 무드를 가장 단순한 형태로 보고 싶다면 이런 물건부터 볼 수 있다.

[[PRODUCT:musinsa-bold-beanie]]

성수가 중요한 이유는 리테일의 다음 모습을 미리 보여주기 때문이다.

더 큰 매장이 아니라,

매장과 촬영장, 이야기와 유통 채널이 동시에 되는 공간이다.`,
    },

    {
      id: 'editorial-convenience-store',
      type: 'ARTICLE',

      title:
        'Korean Convenience Stores Are Tiny Trend Engines',

      titleKo:
        '한국 편의점은 왜 작은 트렌드 엔진처럼 움직일까',

      imageUrl:
        'https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?auto=format&fit=crop&w=1800&q=85',

      content: `A Korean convenience store looks ordinary until you start paying attention to how quickly it changes.

New drinks appear and disappear. Snacks become collaborations. A combination invented by customers turns into a viral recipe. Products move from shelf to short-form video and back to the shelf again.

## Convenience is only half the story

Of course, convenience stores solve practical problems.

They provide food late at night, coffee in the morning, parcel services and the forgotten item you suddenly need.

But the interesting part is what happens on top of that utility.

The stores have become low-risk testing grounds for new flavors, packages, collaborations and formats.

## Small products move faster

A large purchase requires consideration.

A 2,000-won drink does not.

That makes the convenience store unusually sensitive to curiosity.

People can try something because the packaging is strange, the flavor sounds unlikely or they saw it in a twenty-second video.

### The product is designed for the routine

Many successful Korean consumer products share one characteristic: they fit into a very specific moment.

The commute.
The five-minute breakfast.
The study break.
The late-night snack.
The desk drawer.

The product does not ask the customer to create a new lifestyle around it. It slips into an existing one.

> Good convenience products do not create more work. They make an existing ritual slightly easier or more interesting.

## The format matters as much as the category

This logic extends beyond actual convenience stores.

Compact packaging, individual portions and simple preparation make products naturally compatible with short-form content and daily routines.

That is why something as traditional as matcha can become a modern consumer format when it is redesigned around speed.

### A five-minute Korean ritual

One example is OSULLOC's individually packed matcha sticks.

They turn a product associated with ceremony into something that fits between email, breakfast and a morning commute.

[[PRODUCT:osulloc-matcha-stick]]

The useful signal here is not that convenience stores are becoming fashionable.

It is that consumers increasingly reward products that understand exactly where they fit in a day.`,

      contentKo: `한국 편의점은 평범해 보인다. 하지만 얼마나 빠르게 변하는지 보기 시작하면 전혀 다르게 보인다.

새로운 음료가 등장했다가 사라지고, 과자가 콜라보 상품이 되며, 소비자가 만든 조합이 바이럴 레시피가 된다. 제품은 진열대에서 숏폼 영상으로 이동하고 다시 진열대로 돌아온다.

## 편리함은 이야기의 절반일 뿐이다

물론 편의점의 기본 기능은 편리함이다.

늦은 밤에도 음식을 살 수 있고, 아침 커피를 해결하고, 택배를 보내고, 갑자기 필요한 생활용품을 구한다.

하지만 더 흥미로운 것은 그 실용성 위에서 일어나는 일이다.

편의점은 새로운 맛과 패키지, 콜라보, 제품 포맷을 낮은 위험으로 시험하는 작은 실험장이 되었다.

## 작은 제품은 더 빠르게 움직인다

큰 구매에는 고민이 필요하다.

2천 원짜리 음료에는 그렇지 않다.

그래서 편의점은 사람들의 호기심에 유난히 민감하다.

포장이 낯설어서, 맛 조합이 이상해서, 혹은 20초짜리 영상에서 봤다는 이유만으로 제품을 시험해 볼 수 있다.

### 제품은 '하루의 한 장면'을 위해 만들어진다

잘 팔리는 한국 소비재를 보면 공통점이 있다.

출근길,
5분 아침 식사,
공부 중간의 휴식,
늦은 밤 야식,
책상 서랍.

제품이 들어갈 정확한 순간이 있다.

새로운 라이프스타일을 요구하는 대신 이미 존재하는 루틴 안으로 들어간다.

> 좋은 편의 제품은 일을 하나 더 만들지 않는다. 이미 있는 루틴을 조금 더 쉽거나 재미있게 만든다.

## 카테고리보다 포맷이 중요할 때

이 논리는 실제 편의점 상품을 넘어간다.

작은 포장, 개별 구성, 간단한 준비 방식은 제품을 자연스럽게 일상 루틴과 숏폼 콘텐츠에 연결한다.

전통적인 말차조차 '빠른 포맷'으로 다시 디자인되면 완전히 다른 소비 경험이 된다.

### 5분짜리 한국의 홈카페 루틴

오설록 말차 스틱이 좋은 예다.

조금 의식적인 음료였던 말차를 이메일과 아침 식사, 출근 준비 사이에 들어갈 수 있는 형태로 바꾼다.

[[PRODUCT:osulloc-matcha-stick]]

여기서 중요한 신호는 편의점 자체가 유행한다는 것이 아니다.

사람들이 자신의 하루 속 위치를 정확히 이해하는 제품을 점점 더 선택하고 있다는 점이다.`,
    },

    {
      id: 'editorial-stationery',
      type: 'ARTICLE',

      title:
        'The Quiet Export Power of Korean Stationery',

      titleKo:
        '조용히 세계로 퍼지는 한국 문구의 힘',

      imageUrl:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=85',

      content: `Korean stationery rarely arrives overseas with the scale or spectacle of K-pop or beauty.

It arrives quietly.

A pen in a desk-tour video.
A planner in a study vlog.
A sticker sheet saved to Pinterest.
A notebook someone asks about in the comments.

That quietness is exactly why the category is interesting.

## Stationery became more than a tool

A pen still needs to write.

A notebook still needs paper.

But functionality alone no longer explains why people care about these objects.

Stationery now sits somewhere between tool, decoration and identity object.

The choice of paper, color, typography and even clip shape can become part of how someone wants their working life to feel.

### Analog objects gained value because life became more digital

The return of stationery is often described as nostalgia.

That explanation is too simple.

People are not abandoning digital tools.

They are adding physical rituals around them.

Writing a list by hand.
Marking a page.
Changing pens.
Opening a planner before starting work.

> The value of analog objects is not that they replace screens. It is that they create boundaries around them.

## Why Korean stationery travels well

Korean stationery has three advantages online.

It is visually legible.
It is usually small enough to try.
And it naturally appears inside existing content formats such as study routines, desk setups and journaling videos.

You rarely need to explain what a pen is.

The editorial work is explaining why this particular pen feels worth noticing.

## An ordinary object with cultural memory

MONAMI's 153 is one of the clearest examples.

The silhouette is deeply ordinary in Korea, which is what makes premium reinterpretations of it interesting.

It turns something familiar into an object people can look at again.

[[PRODUCT:monami-153-geometric]]

### The desk is becoming a small personal environment

Stationery also rarely exists alone.

Headphones, trays, lighting, notebooks and screens form one visual system.

The desk became part workspace, part self-portrait.

A simple object can therefore travel internationally not just as a product, but as a piece of a larger aesthetic.

[[PRODUCT:acacia-oval-tray]]

## The bigger signal

The opportunity for Korean stationery overseas is not simply that Korean products are cute.

It is that very small objects can now carry a surprising amount of cultural meaning.

A $10 or $20 object can become a routine, a prop, a gift, a collectible and a piece of content at the same time.

That makes stationery unusually compatible with the way products are discovered now: slowly, visually, and one desk at a time.`,

      contentKo: `한국 문구는 K-pop이나 K-뷰티처럼 거대한 규모와 화제성으로 해외에 도착하는 경우가 드물다.

훨씬 조용하게 들어간다.

데스크 투어 영상 속 볼펜 하나,
스터디 브이로그 속 플래너,
핀터레스트에 저장된 스티커,
댓글에서 누군가 제품명을 묻는 노트 한 권.

바로 이 조용한 방식 때문에 문구라는 카테고리가 흥미롭다.

## 문구는 도구 이상이 되었다

볼펜은 여전히 잘 써져야 한다.

노트에는 여전히 좋은 종이가 필요하다.

하지만 기능만으로 사람들이 왜 이런 물건에 애착을 갖는지는 설명되지 않는다.

지금의 문구는 도구와 장식, 그리고 정체성을 표현하는 물건 사이에 있다.

종이의 질감, 색상, 타이포그래피, 심지어 클립의 모양까지 '내가 일하고 공부하는 시간이 어떤 느낌이었으면 하는지'와 연결된다.

### 삶이 더 디지털해졌기 때문에 아날로그 물건의 가치가 커졌다

문구의 귀환은 흔히 향수로 설명된다.

하지만 그것만으로는 부족하다.

사람들은 디지털 도구를 버리고 있지 않다.

대신 디지털 생활 주변에 물리적인 의식을 추가하고 있다.

손으로 할 일을 쓰고,
페이지에 표시하고,
펜을 바꾸고,
일을 시작하기 전에 플래너를 연다.

> 아날로그 물건의 가치는 화면을 대체하는 데 있지 않다. 화면과 나 사이에 작은 경계를 만드는 데 있다.

## 한국 문구가 해외에서 발견되기 좋은 이유

한국 문구에는 온라인 환경에 잘 맞는 몇 가지 특성이 있다.

시각적으로 이해하기 쉽고,
한번 시험해 보기 부담 없는 크기와 가격이며,
스터디 루틴이나 데스크 셋업, 다이어리 꾸미기 같은 기존 콘텐츠 안에 자연스럽게 들어간다.

볼펜이 무엇인지 설명할 필요는 없다.

에디토리얼이 해야 할 일은 '왜 이 볼펜을 다시 볼 가치가 있는지' 설명하는 것이다.

## 너무 평범해서 오히려 문화적인 물건

모나미 153은 좋은 사례다.

한국에서는 너무 익숙한 실루엣이기 때문에, 그 형태를 프리미엄 오브제로 다시 해석한 제품이 더 흥미롭다.

늘 보던 물건을 다시 보게 만든다.

[[PRODUCT:monami-153-geometric]]

### 책상은 작은 개인 환경이 되고 있다

문구는 혼자 존재하지 않는다.

헤드폰, 트레이, 조명, 노트, 화면이 하나의 시각적 환경을 만든다.

책상은 작업 공간이면서 동시에 작은 자화상이 되었다.

그래서 작은 제품도 단독 상품이 아니라 더 큰 취향의 한 조각으로 해외에 전달될 수 있다.

[[PRODUCT:acacia-oval-tray]]

## 더 큰 신호

한국 문구의 해외 가능성은 단순히 '한국 제품이 귀엽다'는 데 있지 않다.

아주 작은 물건도 놀랄 만큼 많은 문화적 의미를 가질 수 있게 되었다는 데 있다.

10달러나 20달러짜리 물건이 루틴이 되고, 촬영 소품이 되고, 선물이 되고, 수집품이 되고, 콘텐츠가 될 수 있다.

그래서 문구는 지금의 상품 발견 방식과 매우 잘 맞는다.

천천히,
시각적으로,
한 사람의 책상에서 다음 사람의 책상으로.`,
    },

    {
      id: 'editorial-reel-desk',
      type: 'REEL',

      title:
        'A Small Desk Reset, Seoul Edition',

      titleKo:
        '서울식 작은 데스크 리셋',

      imageUrl:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85',

      videoUrl:
        '/assets/videos/hero/ugc-01.mp4',

      content: `Ten seconds can be enough to understand why desk content keeps working.

The appeal is not really productivity.

It is the promise that changing a few small objects might change the feeling of the next hour.

## The object on our radar

[[PRODUCT:monami-153-geometric]]

A good desk object does not need to transform your life.

Sometimes it only needs to make you want to sit down again.`,

      contentKo: `10초만으로도 데스크 콘텐츠가 계속 사랑받는 이유를 어느 정도 이해할 수 있다.

진짜 매력은 생산성 자체가 아니다.

작은 물건 몇 개를 바꾸면 다음 한 시간이 조금 달라질 것 같은 느낌이다.

## 지금 눈여겨보는 오브제

[[PRODUCT:monami-153-geometric]]

좋은 데스크 아이템이 삶 전체를 바꿀 필요는 없다.

다시 한번 책상 앞에 앉고 싶게 만드는 것만으로도 충분할 때가 있다.`,
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: {
        id: post.id,
      },

      update: {
        ...post,
        editorId: editor.id,
        passwordHash,
      },

      create: {
        ...post,
        editorId: editor.id,
        passwordHash,
      },
    })
  }

  console.log(
    `${posts.length} editorial samples refreshed`,
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