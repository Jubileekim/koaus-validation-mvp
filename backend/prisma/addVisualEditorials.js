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
    // =====================================================
    // 1. 서울 문구점
    // =====================================================
    {
      id: 'editorial-seoul-stationery-shop',

      type: 'ARTICLE',

      title:
        'Why Seoul Stationery Shops Feel Like Tiny Galleries',

      titleKo:
        '서울의 문구점은 왜 작은 갤러리처럼 보일까',

      imageUrl:
        '/assets/editorial/editorial-stationery.jpg',

      videoUrl: null,

      content: `A stationery shop in Seoul is rarely just a place to replace a pen.

The best ones feel closer to tiny galleries: quiet spaces where paper, objects, typography and packaging have been arranged to make ordinary tools feel newly desirable.

That shift says something larger about how small products are being discovered in Korea.

## From supplies to objects of taste

Stationery used to be organised primarily by function.

Pens in one section.
Notebooks in another.
Folders somewhere near the back.

But many independent stationery shops in Seoul now organise products more like a concept store.

The question is no longer only, "What do you need?"

It is also, "What kind of desk do you want to live with?"

A notebook might be placed beside a ceramic cup, a small tray and a postcard. A pen can be displayed like jewellery rather than an office supply.

The category becomes part utility, part visual culture.

> The most interesting stationery shops do not simply sell tools. They edit a small world around them.

## Why the physical shop still matters

Online shopping is efficient.

But stationery depends heavily on details that are difficult to understand through a product thumbnail.

Paper weight.
Texture.
Scale.
The click of a pen.
The exact tone of beige.
How a notebook looks beside something else.

A physical shop turns those details into an experience.

That experience also happens to photograph extremely well.

### Discovery now continues outside the store

Someone visits a shop in Seoul.

They photograph a shelf.
Another person saves the image.
A creator includes the product in a desk tour.
Someone overseas asks for the product name.

The original shop visit becomes distribution.

The interesting part is that none of this necessarily looks like advertising.

It looks like taste.

## Ordinary Korean objects can carry memory

MONAMI's 153 is a good example.

For many Koreans, the 153 is almost too familiar to notice.

It has been part of schools, offices and pencil cases for decades.

That familiarity makes its more designed reinterpretations interesting.

The product carries two meanings at once: an ordinary writing tool and a piece of Korean visual memory.

### Shop the story

If you want to see how a familiar Korean object can become a more deliberate desk piece:

[[PRODUCT:monami-153-geometric]]

## The desk has become a small interior

Another reason stationery shops feel more curated now is that stationery rarely lives alone.

A notebook sits beside a cup.
A pen beside a tray.
A laptop beside paper.
Headphones beside books.

The desk increasingly behaves like a miniature interior.

That is why objects from different categories can belong to the same story.

[[PRODUCT:acacia-oval-tray]]

The opportunity here is larger than selling cute stationery.

Small Korean objects can travel because they are inexpensive enough to try, visual enough to share and personal enough to become part of someone's routine.

A good stationery shop simply makes that possibility visible before anyone takes the object home.`,

      contentKo: `서울의 문구점은 더 이상 볼펜 하나가 떨어졌을 때 들르는 장소만은 아니다.

잘 만든 문구점에 들어가면 오히려 작은 갤러리에 가까운 느낌이 든다. 종이, 타이포그래피, 패키지, 작은 오브제들이 하나의 장면처럼 편집되어 있고 평범한 도구가 다시 갖고 싶은 물건으로 보이기 시작한다.

이 변화는 한국에서 작은 제품이 발견되는 방식 자체가 달라지고 있다는 것을 보여준다.

## 필요한 물건에서 취향을 보여주는 물건으로

과거 문구점은 기능을 중심으로 구성됐다.

볼펜 코너,
노트 코너,
파일과 사무용품 코너.

하지만 서울의 많은 독립 문구점은 이제 콘셉트 스토어에 가깝게 제품을 보여준다.

질문도 달라진다.

'무엇이 필요한가?'뿐 아니라,

'나는 어떤 책상에서 시간을 보내고 싶은가?'를 묻게 된다.

노트 옆에 작은 트레이와 컵, 엽서가 함께 놓이고 볼펜도 단순한 사무용품이 아니라 하나의 오브제처럼 진열된다.

문구가 기능과 시각문화 사이로 이동하는 것이다.

> 좋은 문구점은 단순히 도구를 판매하지 않는다. 작은 세계 하나를 편집해 보여준다.

## 그래서 오프라인 공간이 여전히 중요하다

온라인 쇼핑은 빠르고 편리하다.

하지만 문구에는 작은 상품 사진만으로 이해하기 어려운 요소가 많다.

종이의 두께,
표면의 질감,
실제 크기,
펜을 눌렀을 때의 느낌,
미묘한 색상,
다른 물건 옆에 놓였을 때의 분위기.

오프라인 매장은 이런 디테일을 경험으로 바꾼다.

그리고 그 경험은 사진과 영상에도 아주 잘 담긴다.

### 발견은 매장을 나온 뒤에도 계속된다

누군가 서울의 문구점을 방문한다.

선반을 찍는다.
다른 사람은 그 이미지를 저장한다.
크리에이터가 데스크 투어 영상에 제품을 등장시킨다.
해외의 누군가는 댓글로 제품 이름을 묻는다.

한 번의 방문이 새로운 유통이 된다.

흥미로운 점은 이 과정이 광고처럼 보이지 않는다는 것이다.

취향처럼 보인다.

## 너무 익숙해서 오히려 문화적인 물건

모나미 153은 좋은 예다.

한국에서는 너무 익숙해 거의 눈에 들어오지 않는 물건이다.

학교와 사무실, 필통 속에 오랫동안 존재해 왔다.

그래서 이 익숙한 형태를 다시 디자인한 제품이 오히려 재미있다.

평범한 필기구인 동시에 한국인의 시각적 기억을 가진 물건이 된다.

### 이야기 속 제품

익숙한 한국 문구가 어떻게 하나의 데스크 오브제로 다시 보일 수 있는지 보고 싶다면:

[[PRODUCT:monami-153-geometric]]

## 책상은 작은 인테리어가 되었다

문구가 더 큐레이션되어 보이는 또 다른 이유는 문구가 혼자 존재하지 않기 때문이다.

노트 옆에는 컵이 있고,
펜 옆에는 트레이가 있으며,
노트북 옆에는 종이가 놓인다.

책상은 점점 작은 개인 공간이 되고 있다.

그래서 서로 다른 카테고리의 물건도 하나의 이야기 안에서 자연스럽게 연결될 수 있다.

[[PRODUCT:acacia-oval-tray]]

여기서 가능성은 단순히 '귀여운 한국 문구를 판매한다'는 데 있지 않다.

작은 한국의 오브제는 시험해 보기 쉬울 만큼 작고, 공유하기 좋을 만큼 시각적이며, 개인의 일상 안에 들어갈 만큼 친밀하기 때문에 해외로 이동할 수 있다.

좋은 문구점은 사람들이 물건을 집으로 가져가기 전부터 그 가능성을 보여주는 공간이다.`,
    },

    // =====================================================
    // 2. 서울 일상 + 크리에이터
    // =====================================================
    {
      id: 'editorial-seoul-everyday-content',

      type: 'ARTICLE',

      title:
        'Why Everyday Life in Seoul Keeps Becoming Content',

      titleKo:
        '서울에서는 왜 일상이 곧 콘텐츠가 될까',

      imageUrl:
        '/assets/editorial/editorial-creator-desk.jpg',

      videoUrl: null,

      content: `A laptop, a notebook, an iced coffee and a phone on a small tripod.

Nothing about the scene is extraordinary.

That is exactly why it works.

One of the most recognisable formats in Korean lifestyle content is the transformation of an ordinary routine into something worth watching.

## The subject is often not the subject

A study vlog may technically be about studying.

A café Reel may technically be about coffee.

A desk video may technically be about productivity.

But viewers are often watching for something else.

The light.
The objects.
The clothes.
The neighbourhood.
The small details of how another person has arranged their day.

The content works because the routine becomes a container for discovery.

> When daily life becomes media, ordinary products gain a new way to be discovered.

## Products appear without stopping the story

Traditional advertising pauses the experience.

Lifestyle content does the opposite.

A headset can appear while someone edits a video.
A pen appears while they take notes.
A tray appears under a coffee cup.

The object belongs to the scene before it becomes a product recommendation.

That distinction matters.

The audience encounters the product in context first.

Commerce can come later.

## Why Seoul provides so many backgrounds

Seoul offers an unusually dense mix of environments.

A quiet residential street can sit minutes from a polished café.

An old building can contain a new design store.

A creator can move between home, subway, workspace and retail district in a single short video.

That density produces constant visual variation without requiring extraordinary events.

### The creator becomes a filter

The value of the creator is therefore not just reach.

It is selection.

Which café?

Which neighbourhood?

Which object?

Which routine?

The creator edits daily life in the same way a magazine editor once edited a page.

## From desk scene to product

Consider something as ordinary as headphones.

Inside a product listing, headphones are specifications.

Inside a creator's desk or study routine, they become part of a feeling: focus, commute, late-night work, quiet time.

[[PRODUCT:sky-im-h27]]

And a simple wooden tray works in the same way.

It is not inherently exciting.

But place it under a drink, notebook and phone and it becomes part of the visual language of the scene.

[[PRODUCT:acacia-oval-tray]]

## Commerce works best after curiosity

This is the principle KOAUS can use.

The editorial does not need to begin with "buy this."

Start with something worth noticing.

Explain why the scene matters.

Then, when the reader naturally wonders where the objects came from, make the path to the product easy.

The article is not decoration around commerce.

The story creates the context that makes commerce feel relevant.`,

      contentKo: `노트북 하나, 노트 한 권, 아이스커피와 작은 삼각대 위의 스마트폰.

특별할 것은 없다.

바로 그래서 콘텐츠가 된다.

한국 라이프스타일 콘텐츠에서 반복적으로 보이는 형식 중 하나는 평범한 루틴을 '보고 싶은 장면'으로 바꾸는 것이다.

## 콘텐츠의 진짜 주제는 다른 곳에 있을 때가 많다

스터디 브이로그는 표면적으로 공부에 대한 영상이다.

카페 릴스는 커피에 대한 영상이고,
데스크 영상은 생산성에 대한 영상처럼 보인다.

하지만 사람들이 실제로 보고 있는 것은 다른 것일 수 있다.

빛,
물건,
옷,
동네,
누군가가 하루를 구성하는 작은 방식.

루틴이 다른 취향을 발견하는 그릇이 되는 것이다.

> 일상이 미디어가 되면 평범한 제품도 완전히 새로운 방식으로 발견될 수 있다.

## 제품은 이야기를 멈추지 않고 등장한다

전통적인 광고는 콘텐츠를 멈춘다.

라이프스타일 콘텐츠는 반대로 작동한다.

영상 편집 중 헤드셋이 등장하고,
메모를 하면서 펜이 보이며,
커피 아래 작은 트레이가 놓인다.

제품 추천이 되기 전에 이미 그 장면의 일부다.

이 차이가 중요하다.

사람들은 제품보다 맥락을 먼저 만난다.

구매는 그 다음에 와도 된다.

## 서울은 왜 이런 콘텐츠의 배경이 되기 쉬울까

서울은 서로 다른 환경이 굉장히 촘촘하게 붙어 있다.

조용한 주택가에서 몇 분만 걸으면 세련된 카페가 나오고,
오래된 건물 안에 새로운 디자인 숍이 들어서며,
한 사람의 짧은 영상 안에서도 집, 지하철, 작업 공간, 리테일 지역이 빠르게 바뀐다.

특별한 이벤트가 없어도 장면이 계속 달라진다.

### 크리에이터는 하나의 필터가 된다

그래서 크리에이터의 가치는 팔로워 수만이 아니다.

선택하는 능력이다.

어떤 카페인가?

어떤 동네인가?

어떤 물건인가?

어떤 루틴인가?

크리에이터는 예전의 잡지 에디터가 지면을 편집했던 것처럼 일상을 편집한다.

## 장면에서 상품으로

아주 평범한 헤드셋을 생각해 보자.

상품 페이지에서는 스펙이다.

하지만 누군가의 공부 루틴이나 작업 영상 안에서는 집중, 출퇴근, 늦은 밤 작업 같은 감정과 연결된다.

[[PRODUCT:sky-im-h27]]

작은 우드 트레이도 마찬가지다.

그 자체만으로는 특별하지 않을 수 있다.

하지만 커피와 노트, 스마트폰이 함께 놓이는 순간 하나의 장면을 구성한다.

[[PRODUCT:acacia-oval-tray]]

## 커머스는 호기심 뒤에 오는 것이 자연스럽다

KOAUS가 활용할 수 있는 원칙도 여기에 있다.

글의 첫 문장이 '이 제품을 사세요'일 필요가 없다.

먼저 볼 만한 장면을 보여준다.

왜 흥미로운지 해석한다.

그리고 독자가 자연스럽게 '저 물건은 어디 제품이지?'라고 궁금해지는 순간 상품으로 가는 길을 열어준다.

에디토리얼이 커머스를 꾸미기 위한 장식이 되는 것이 아니다.

좋은 이야기가 상품이 의미 있어지는 맥락을 만든다.`,
    },

    // =====================================================
    // 3. 패키징 / 언박싱
    // =====================================================
    {
      id: 'editorial-packaging-experience',

      type: 'ARTICLE',

      title:
        'The Product Experience Starts Before You Open the Box',

      titleKo:
        '사고 싶은 물건은 포장을 뜯기 전부터 시작된다',

      imageUrl:
        '/assets/editorial/editorial-packing.jpg',

      videoUrl: null,

      content: `Some products begin working before they are ever used.

The box arrives.

The paper is folded.

A label sits in exactly the right place.

Someone pauses before opening it and takes a photo.

The product experience has already started.

## Packaging became part of the product

Packaging was once treated mainly as protection and information.

Keep the item safe.

Explain what it is.

Get it from one place to another.

Those functions still matter.

But in an image-first consumer culture, packaging also has to survive another journey: the camera.

The first impression of a product may happen on someone else's screen before the buyer ever touches it.

### Unboxing is distribution

Unboxing content is sometimes dismissed as superficial.

But commercially, it reveals something important.

Packaging creates an additional media moment.

A well-designed package gives customers something to photograph, film and share without the brand producing the content itself.

> A package is no longer only what surrounds the object. It is the first frame of the story.

## Small products have an advantage

Not every product needs extravagant packaging.

In fact, smaller objects often benefit from restraint.

Good paper.

A compact box.

A thoughtful arrangement.

One memorable detail.

This creates the feeling of receiving something considered rather than simply expensive.

That is especially powerful for products travelling internationally.

The customer may have no previous relationship with the brand.

The package becomes the first physical proof of what the brand believes good design feels like.

## Korean products often understand the gift moment

Many Korean consumer categories already have strong gifting behaviour built into them.

Tea.

Beauty.

Stationery.

Small home objects.

These are products people buy for themselves, but they can also easily become gifts.

That dual role influences design.

Packaging often needs to work both on a shelf and in someone's hands.

### A familiar product, presented differently

MONAMI's premium reinterpretation of its familiar 153 pen is a good example of how packaging and presentation can change the perceived role of an object.

[[PRODUCT:monami-153-geometric]]

A pen can move from everyday supply to small design gift without changing the fundamental function of the object.

## Ritual can also be packaged

The same principle appears in food.

Matcha carries an association with preparation and ritual.

But individual sticks translate that ritual into a format compatible with a faster day.

[[PRODUCT:osulloc-matcha-stick]]

The package does more than contain powder.

It explains how the product wants to exist in someone's life.

## The real opportunity is not prettier boxes

Packaging should not be decoration added at the end.

The opportunity is to design the entire sequence.

Discovery.

Arrival.

Opening.

Use.

Sharing.

When each step makes sense, even a modest product can feel intentional.

And intentional products are easier to remember, easier to gift and much easier to talk about.`,

      contentKo: `어떤 제품은 실제로 사용하기도 전에 이미 경험이 시작된다.

택배 상자가 도착한다.

종이가 접혀 있다.

라벨이 정확한 위치에 붙어 있다.

사람은 포장을 뜯기 전에 잠시 멈춰 사진을 찍는다.

제품은 아직 사용되지 않았다.

하지만 제품 경험은 이미 시작되었다.

## 패키지는 제품의 일부가 되었다

과거 패키지의 중요한 역할은 보호와 정보 전달이었다.

제품을 안전하게 보관하고,

무엇인지 설명하고,

한 장소에서 다른 장소로 운반한다.

이 기능은 지금도 중요하다.

하지만 이미지 중심의 소비 환경에서 패키지는 또 하나의 이동을 견뎌야 한다.

카메라다.

어떤 제품의 첫인상은 구매자가 직접 만져보기 전에 다른 사람의 화면에서 만들어질 수도 있다.

### 언박싱은 또 하나의 유통이다

언박싱 콘텐츠를 가볍게 볼 수도 있다.

하지만 커머스 관점에서는 중요한 신호가 있다.

패키지가 새로운 미디어 순간을 만든다는 것이다.

잘 디자인된 포장은 브랜드가 직접 콘텐츠를 만들지 않아도 고객에게 촬영하고 공유할 이유를 준다.

> 포장은 더 이상 제품을 둘러싸는 것만이 아니다. 제품 이야기의 첫 장면이다.

## 작은 제품에는 오히려 장점이 있다

모든 제품에 거대한 패키지가 필요한 것은 아니다.

오히려 작은 오브제는 절제된 포장에서 더 매력적일 수 있다.

좋은 종이,

작은 상자,

깔끔한 배열,

기억에 남는 디테일 하나.

이런 요소는 '비싼 것을 받았다'기보다 '신경 써서 준비한 것을 받았다'는 느낌을 만든다.

특히 해외로 이동하는 제품에게 중요하다.

고객은 그 브랜드를 처음 경험할 수도 있다.

포장은 브랜드가 생각하는 좋은 디자인을 직접 만나는 첫 번째 물리적 증거가 된다.

## 한국의 제품에는 선물의 순간이 자주 들어 있다

한국의 여러 소비재 카테고리에는 이미 강한 선물 문화가 존재한다.

차,

뷰티,

문구,

작은 생활 오브제.

사람들은 자신을 위해 사지만 다른 사람에게 주기도 쉽다.

그래서 패키지는 진열대 위에서도, 누군가의 손에 들렸을 때도 자연스러워야 한다.

### 익숙한 제품도 보여주는 방식이 달라지면 달라진다

모나미의 익숙한 153을 프리미엄 제품으로 다시 해석한 사례를 보면 패키지와 프레젠테이션이 물건의 역할을 어떻게 바꿀 수 있는지 알 수 있다.

[[PRODUCT:monami-153-geometric]]

기능은 여전히 펜이다.

하지만 평범한 사무용품에서 작은 디자인 선물로 이동할 수 있다.

## 루틴도 패키징할 수 있다

비슷한 원리는 식품에서도 보인다.

말차에는 준비 과정과 의식이라는 이미지가 있다.

하지만 개별 스틱은 그 루틴을 더 빠른 일상 안에 들어갈 수 있도록 번역한다.

[[PRODUCT:osulloc-matcha-stick]]

패키지는 단순히 가루를 담는 것이 아니다.

이 제품이 사람의 하루 속에서 어떤 방식으로 존재하고 싶은지 설명한다.

## 중요한 것은 더 예쁜 상자가 아니다

패키징을 마지막 단계의 장식으로 생각할 필요는 없다.

더 큰 기회는 전체 순서를 설계하는 데 있다.

발견하고,

도착하고,

열고,

사용하고,

공유한다.

이 모든 과정이 자연스럽게 이어질 때 작은 제품도 의도적으로 만들어진 물건처럼 느껴진다.

그리고 그런 제품은 기억하기 쉽고,

선물하기 쉽고,

무엇보다 다른 사람에게 이야기하기 쉬워진다.`,
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: {
        id: post.id,
      },

      update: {
        title: post.title,
        titleKo: post.titleKo,

        content: post.content,
        contentKo: post.contentKo,

        type: post.type,

        imageUrl: post.imageUrl,
        videoUrl: post.videoUrl,

        editorId: editor.id,

        passwordHash,
      },

      create: {
        id: post.id,

        title: post.title,
        titleKo: post.titleKo,

        content: post.content,
        contentKo: post.contentKo,

        type: post.type,

        imageUrl: post.imageUrl,
        videoUrl: post.videoUrl,

        editorId: editor.id,

        passwordHash,
      },
    })
  }

  console.log(
    `${posts.length} visual editorial stories added`,
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