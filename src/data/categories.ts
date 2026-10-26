// 官網內容分類表（唯一真相來源，2026-10-17 建立）
// 結構：大分類 → 小分類 → 文章（blog slug）＋所屬指南（guide 路徑）
// 大分類頁、/blog 分類篩選、文章麵包屑、「本文屬於《指南》」回連，全部讀這份表。
// 新文章上線：在對應小分類的 posts 陣列加 slug 即可；尚未上線的文章不要先寫進來。

export interface SubCategory {
  slug: string;              // 小分類代號，當大分類頁內的錨點 id
  name: string;              // 小分類名稱（大分類頁 H2、麵包屑第三層）
  guide?: string;            // 這個小分類的支柱指南路徑（選填）
  posts: string[];           // 文章 slug，順序＝大分類頁的閱讀順序
}

export interface Category {
  slug: string;              // 大分類代號，之後當大分類頁網址
  name: string;              // 大分類名稱
  keyword: string;           // 主關鍵字
  guide?: string;            // 大分類的主要指南；小分類沒有指南時，文章回連這一篇
  subs: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'presbyopia', name: '老花眼鏡', keyword: '老花眼鏡', guide: '/guide/progressive-lens/',
    subs: [
      { slug: 'basics', name: '認識老花', posts: ['presbyopia-signs-40', 'hyperopia-vs-presbyopia', 'lens-addition-add', 'presbyopia-progression'] },
      { slug: 'lens-types', name: '老花鏡片種類', posts: ['presbyopia-vs-progressive', 'progressive-corridor', 'progressive-corridor-brands', 'zeiss-individual-worth-it'] },
      { slug: 'fitting', name: '老花眼鏡怎麼配', guide: '/guide/progressive-lens/', posts: ['presbyopia-lens-guide', 'banqiao-progressive-lens-guide'] },
      { slug: 'adaptation', name: '適應與常見問題', posts: ['progressive-lens-dizzy', 'progressive-lens-adaptation'] },
      { slug: 'buying', name: '選購與價格', posts: ['presbyopia-glasses-recommend', 'presbyopia-glasses-cost'] },
    ],
  },
  {
    slug: 'kids-vision', name: '兒童視力', keyword: '兒童近視', guide: '/guide/children-myopia/',
    subs: [
      { slug: 'by-age', name: '各年齡怎麼顧', posts: ['infant-vision-development', 'preschool-vision-reserve', 'elementary-school-first-glasses', 'junior-high-myopia-peak', 'high-school-vision-stability'] },
      { slug: 'causes', name: '近視成因與迷思', posts: ['myopia-real-culprit', 'myopia-getting-worse-truth', 'kids-glasses-wear-all-day'] },
      { slug: 'exams', name: '檢查與法規', posts: ['vision-test-vs-refraction', 'child-vision-check-where', 'kids-vision-check-frequency'] },
      { slug: 'tracking', name: '追蹤與配鏡', guide: '/guide/children-myopia/', posts: ['kids-glasses-recommend', 'kids-glasses-process', 'kids-glasses-cost', 'children-myopia-tracking-xinzhuang', 'children-frames-guide'] },
    ],
  },
  {
    slug: 'eye-exam', name: '驗光', keyword: '新莊驗光', guide: '/guide/why-optometrist-matters/',
    subs: [
      { slug: 'what', name: '驗光在做什麼', posts: ['optometry-vs-dispensing', 'diopter-explained', 'binocular-vision', 'pupillary-distance-pd', 'vertex-distance'] },
      { slug: 'quality', name: '好的驗光長怎樣', guide: '/guide/why-optometrist-matters/', posts: ['eye-exam-duration-difference', 'same-prescription-different-feel', 'common-optometry-mistakes', 'eye-exam-preparation-tips'] },
      { slug: 'triage', name: '眼科還是驗光所', guide: '/guide/eye-doctor-or-optometrist/', posts: ['optometry-vs-ophthalmology', 'blurry-vision-see-doctor', 'eye-exam-before-glasses', 'eye-strain-see-doctor'] },
      { slug: 'choosing', name: '選擇驗光所', posts: ['eye-exam-cost', 'xinzhuang-eye-exam', 'eye-exam-first-visit', 'eye-exam-how-often', 'optometrist-license-check'] },
    ],
  },
  {
    slug: 'glasses', name: '配眼鏡', keyword: '新莊配眼鏡', guide: '/guide/choose-optician/',
    subs: [
      { slug: 'local', name: '新莊・板橋在地', guide: '/guide/choose-optician/', posts: ['xinzhuang-glasses-guide', 'banqiao-glasses-guide'] },
      { slug: 'byo-frame', name: '自帶鏡框配鏡片', guide: '/guide/byo-frame-lenses/', posts: ['online-frame-lens-fitting', 'old-frame-relens', 'lens-only-service', 'vintage-frame-lens'] },
      { slug: 'discomfort', name: '戴了不舒服', posts: ['glasses-dizzy', 'glasses-uncomfortable-3-reasons', 'new-glasses-follow-up', 'glasses-prescription-full-or-less'] },
      { slug: 'buying', name: '選購、價格與流程', posts: ['glasses-cost', 'glasses-ready-time', 'glasses-fitting-process', 'online-glasses-vs-store'] },
    ],
  },
  {
    slug: 'lenses', name: '鏡片', keyword: '蔡司鏡片', guide: '/guide/lens-brands/',
    subs: [
      { slug: 'brands', name: '鏡片品牌', guide: '/guide/lens-brands/', posts: ['zeiss-lens-series-guide', 'zeiss-vs-essilor', 'zeiss-hoya-nikon-lens-guide', 'hoya-lens-guide', 'essilor-lens-guide', 'banqiao-zeiss-lens-guide'] },
      { slug: 'index', name: '折射率與厚薄', posts: ['lens-refractive-index', 'lens-index-160-vs-167-vs-174', 'same-index-different-feel', 'glass-vs-resin-lens'] },
      { slug: 'coating', name: '設計與鍍膜', posts: ['aspheric-vs-spherical-lens', 'lens-coating-guide', 'anti-reflective-coating-principle', 'blue-light-filter-what'] },
      { slug: 'buying', name: '選購與價格', posts: ['lens-name-decode', 'lens-replace-when', 'lens-warranty-genuine'] },
    ],
  },
  {
    slug: 'frames', name: '鏡框', keyword: '鏡框推薦', guide: '/guide/frames/',
    subs: [
      { slug: 'choosing', name: '鏡框怎麼挑', guide: '/guide/frames/', posts: ['frame-face-shape', 'frame-fit-size', 'frame-material-guide'] },
      { slug: 'styles', name: '框型專題', posts: ['rimless-glasses-guide', 'rimless-lens-drilling-fitting', 'luxury-frame-lens-guide', 'sports-glasses'] },
      { slug: 'craft', name: '品牌、調整與維修', posts: ['sabae-eyewear', 'minamoto-eyewear-brand', 'frame-adjustment-handcraft', 'glasses-repair'] },
    ],
  },
  {
    slug: 'high-myopia', name: '高度近視', keyword: '高度近視眼鏡', guide: '/guide/high-myopia/',
    subs: [
      { slug: 'fitting', name: '高度近視配鏡', guide: '/guide/high-myopia/', posts: ['high-myopia-glasses-guide', 'high-myopia-lens-brand-choice', 'high-myopia-eye-check'] },
      { slug: 'astigmatism', name: '散光與變形', posts: ['astigmatism-glasses-distortion', 'myopia-vs-astigmatism'] },
      { slug: 'anisometropia', name: '兩眼度數差很多', guide: '/guide/aniseikonia/', posts: ['anisometropia-glasses', 'cataract-one-eye-glasses'] },
    ],
  },
  {
    slug: 'contact-lenses', name: '隱形眼鏡', keyword: '硬式隱形眼鏡', guide: '/guide/rgp-contact-lens/',
    subs: [
      { slug: 'choosing', name: '怎麼選', guide: '/guide/rgp-contact-lens/', posts: ['rgp-vs-soft-contacts', 'daily-vs-monthly-contacts', 'contact-lens-vs-glasses', 'first-contact-lens-fitting'] },
      // 2026-10-26：新增「散光與老花」（規劃書 7-2、7-3；老闆 Q3：散光軟式、多焦點兩店都有，但沒有試戴片）
      { slug: 'special', name: '散光與老花', posts: ['contact-lens-presbyopia', 'toric-soft-contact-lens'] },
      // 2026-10-26：原「配戴與照護」「戴了不舒服」各只有 1 篇，合併成「戴上之後」（照護＋不舒服，對象是已經在戴的人）
      { slug: 'care', name: '戴上之後', posts: ['rgp-daily-wear-care', 'contact-lens-fatigue'] },
    ],
  },
  {
    slug: 'sunglasses', name: '太陽眼鏡', keyword: '偏光太陽眼鏡',
    subs: [
      { slug: 'principles', name: '鏡片原理', posts: ['polarized-lens-principle', 'photochromic-lens-principle'] },
      { slug: 'choosing', name: '怎麼選', posts: ['polarized-vs-photochromic-vs-sunglasses', 'photochromic-sunglasses-guide'] },
      { slug: 'driving', name: '開車用', posts: ['driving-lens-night-glare'] },
    ],
  },
  {
    slug: 'daily-vision', name: '用眼情境', keyword: '電腦眼鏡', guide: '/guide/digital-eye-strain/',
    subs: [
      { slug: 'screen', name: '螢幕族', guide: '/guide/digital-eye-strain/', posts: ['digital-eye-strain-solution'] },
      { slug: 'work', name: '職業用眼', posts: ['professional-driver-vision-standard', 'delivery-rider-vision', 'night-shift-commuter-vision'] },
    ],
  },
];

// 指南頁名稱（文章頂端「本文屬於《指南》」與大分類頁的指南卡片用）
export const GUIDE_TITLES: Record<string, string> = {
  '/guide/progressive-lens/': '老花眼鏡完整指南',
  '/guide/children-myopia/': '兒童近視追蹤完整指南',
  '/guide/why-optometrist-matters/': '好的驗光長怎樣：完整驗光指南',
  '/guide/eye-doctor-or-optometrist/': '掛眼科還是找驗光所？症狀分流指南',
  '/guide/choose-optician/': '新北配眼鏡完整指南',
  '/guide/byo-frame-lenses/': '自帶鏡框配鏡片完整指南',
  '/guide/lens-brands/': '鏡片選購完整指南',
  '/guide/frames/': '鏡框選購完整指南',
  '/guide/high-myopia/': '高度近視配鏡完整指南',
  '/guide/aniseikonia/': '兩眼度數差很多：不等像完整指南',
  '/guide/rgp-contact-lens/': 'RGP 硬式隱形眼鏡完整指南',
  '/guide/digital-eye-strain/': '螢幕族視覺疲勞完整指南',
  '/guide/optical-basics/': '視光小百科',
};

// 由指南路徑反查所屬大分類（指南頁麵包屑用）；視光小百科不屬於任何大分類，回傳 null
export function findGuideCategory(guidePath: string) {
  return CATEGORIES.find(c => c.guide === guidePath || c.subs.some(s => s.guide === guidePath)) ?? null;
}

// 由文章 slug 反查所屬大分類與小分類（麵包屑、指南回連用）
export function findCategory(postSlug: string) {
  for (const cat of CATEGORIES) {
    for (const sub of cat.subs) {
      if (sub.posts.includes(postSlug)) return { cat, sub };
    }
  }
  return null;
}
