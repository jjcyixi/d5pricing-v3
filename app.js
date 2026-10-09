// D5 pricing page — kinkihi layout + latest 六档口径 + independent basic/pro tier sliders.

const tiers = [
  { credits: 2000, basic: 99, basicFirst: 79, pro: 249, proFirst: 219, basicAnnual: 799, proAnnual: 2199 },
  { credits: 6000, basic: 269, basicFirst: 199, pro: 419, proFirst: 349, basicAnnual: 1999, proAnnual: 3499 },
  { credits: 13000, basic: 569, basicFirst: 449, pro: 719, proFirst: 599, basicAnnual: 3999, proAnnual: 5499 },
];
const tierProgress = ['33.333%', '66.666%', '100%'];
const TIER_MAX = 2;

const state = {
  lang: 'zh',
  basicTier: 1,
  proTier: 1,
  billing: 'monthly',
  audience: 'personal',
};

const copy = {
  zh: {
    'hero.title': '按创作用量，选择适合你的方案',
    'hero.subtitle': '从第一次灵感探索，到专业交付；小 / 中 / 大按用量选档',
    'audience.personal': '个人创作', 'audience.team': '团队协作',
    'billing.monthly': '按月', 'billing.annual': '按年', 'billing.discount': '享x折',
    'billing.toAnnual': '切换按年购买', 'billing.toMonthly': '切换按月购买',
    'education.title': 'D5 for Education', 'education.subtitle': 'Best for students, educators, and academic institutions', 'education.button': 'Apply',
    'workflow.title': '方案推荐', 'workflow.subtitle': '让创作走的更远',
    'comparison.title': '完整功能对比', 'comparison.subtitle': '详细对比套餐及功能权益',
    'faq.q1': '各档方案只差积分吗？',
    'faq.a1': '不只积分。小 / 中 / 大还会影响并发、输出分辨率、充值赠送与积分有效期等；基础版与专业版同档积分一致，但在产品工作流与计量上不同——D5 Arco 的 AI 增强 / 放大消耗积分；专业版下 D5 渲染器的 AI 增强 / 放大不消耗积分，基础版不支持渲染器侧增强。具体以当前方案与功能入口说明为准。',
    'faq.q2': '年购积分如何发放？会自动续费吗？',
    'faq.a2': '年购一次支付，积分仍按月发放，未用完不累计到下一积分月。当前为到期不自动续费；是否自动续费以购买确认页为准。',
    'faq.q3': '充值规则是什么？团队 / 企业怎么买？',
    'faq.a3': '充值可补充 D5 AI 积分，不改变版本功能。社区版不可充值；基础版按档位为标准价或额外赠送，充值积分有效期 90 天；专业版额外赠送更高，有效期 180 天，均以充值确认页为准。团队版与企业版按基础席位 / 专业席位分开配置，不展示公开自助价，请联系销售获取报价。',
    'footer.product': '产品', 'footer.whyD5': '为什么选择 D5', 'footer.whatsNew': '最新动态', 'footer.pricing': '价格', 'footer.download': '下载', 'footer.teams': 'D5 团队版', 'footer.education': 'D5 教育版', 'footer.roadmap': '开发路线图', 'footer.assets': '素材库',
    'footer.support': '支持', 'footer.help': '帮助中心', 'footer.requirements': '系统要求', 'footer.space': '我的空间',
    'footer.learn': '学习', 'footer.tutorial': '教程', 'footer.sample': '示例场景', 'footer.gallery': '作品展示', 'footer.blog': '博客', 'footer.webinars': '线上研讨会', 'footer.certification': '认证', 'footer.instructor': 'D5 讲师',
    'footer.community': '社区', 'footer.forum': '论坛', 'footer.awards': 'D5 大奖', 'footer.creator': '创作者计划', 'footer.campus': '校园大使', 'footer.userGroup': '用户社群', 'footer.winPro': '赢取 D5 Pro',
    'footer.business': '商务合作', 'footer.reseller': '成为经销商', 'footer.findReseller': '寻找经销商', 'footer.affiliate': '推广合作', 'footer.technology': '技术合作伙伴', 'footer.brandKit': '品牌资源',
    'footer.company': '公司', 'footer.about': '关于我们', 'footer.careers': '加入我们',
    'footer.subscribe': '订阅动态', 'footer.newsletter': '获取最新消息、文章、资源和设计灵感。', 'footer.emailLabel': '邮箱地址', 'footer.emailPlaceholder': '输入邮箱', 'footer.next': '下一步', 'footer.followTitle': '关注我们',
    'footer.copyright': 'Dimension 5 Techs. © 2026 Dimension 5. 保留所有权利。', 'footer.privacy': '隐私政策', 'footer.service': '服务协议', 'footer.join': '加入我们',
  },
  en: {
    'hero.title': 'Choose a plan by your creative usage',
    'hero.subtitle': 'From first exploration to professional delivery — Small / Medium / Large by usage',
    'audience.personal': 'For creators', 'audience.team': 'For teams',
    'billing.monthly': 'Monthly', 'billing.annual': 'Yearly', 'billing.discount': 'Save x%',
    'billing.toAnnual': 'Switch to yearly billing', 'billing.toMonthly': 'Switch to monthly billing',
    'education.title': 'D5 for Education', 'education.subtitle': 'Best for students, educators, and academic institutions', 'education.button': 'Apply',
    'workflow.title': 'Plan finder', 'workflow.subtitle': 'Take your creativity further',
    'comparison.title': 'Compare all features', 'comparison.subtitle': 'Detailed comparison of plans and features',
    'faq.q1': 'Do tiers only differ in credits?',
    'faq.a1': 'No. Small / Medium / Large also affect concurrency, output resolution, top-up bonuses and credit validity. Basic and Pro share the same credit tiers, but workflows and metering differ: D5 Arco enhance/upscale consumes credits; on Pro, D5 Render enhance/upscale does not consume credits, while Basic does not support Render-side enhance. Always follow the plan and feature entry copy.',
    'faq.q2': 'How are yearly credits issued? Auto-renew?',
    'faq.a2': 'Yearly plans are paid once; credits are still issued monthly and unused credits do not roll over. Current purchases do not auto-renew at expiry; the confirmation page is authoritative.',
    'faq.q3': 'Top-up rules? How do Teams / Enterprise work?',
    'faq.a3': 'Top-ups add D5 AI credits without changing plan features. Community cannot top up; Basic uses list price or a bonus by tier with 90-day validity; Pro has a higher bonus with 180-day validity — see the top-up confirmation page. Teams and Enterprise use separate Basic / Pro seats with no public self-serve price; contact sales for a quote.',
    'footer.product': 'Product', 'footer.whyD5': 'Why D5', 'footer.whatsNew': 'What’s New', 'footer.pricing': 'Pricing', 'footer.download': 'Download', 'footer.teams': 'D5 for Teams', 'footer.education': 'D5 for Education', 'footer.roadmap': 'Roadmap', 'footer.assets': 'Asset Library',
    'footer.support': 'Support', 'footer.help': 'Help Center', 'footer.requirements': 'System Requirements', 'footer.space': 'My Space',
    'footer.learn': 'Learn', 'footer.tutorial': 'Tutorials', 'footer.sample': 'Sample Scene', 'footer.gallery': 'Gallery', 'footer.blog': 'Blog', 'footer.webinars': 'Webinars', 'footer.certification': 'Certification', 'footer.instructor': 'D5 Instructor',
    'footer.community': 'Community', 'footer.forum': 'Forum', 'footer.awards': 'D5 Awards', 'footer.creator': 'Champion Program', 'footer.campus': 'Campus Ambassador', 'footer.userGroup': 'User Group', 'footer.winPro': 'Win D5 Pro',
    'footer.business': 'For Business', 'footer.reseller': 'Become a Reseller', 'footer.findReseller': 'Find a Reseller', 'footer.affiliate': 'Affiliate Program', 'footer.technology': 'Technology Partners', 'footer.brandKit': 'Brand Kit',
    'footer.company': 'Company', 'footer.about': 'About Us', 'footer.careers': 'Career',
    'footer.subscribe': 'Hear from us', 'footer.newsletter': 'Subscribe to get the latest news, articles, resources and inspiration.', 'footer.emailLabel': 'Email address', 'footer.emailPlaceholder': 'Enter your email', 'footer.next': 'Next', 'footer.followTitle': 'Follow us',
    'footer.copyright': 'Dimension 5 Techs. © 2026 Dimension 5. All rights reserved.', 'footer.privacy': 'Privacy Policy', 'footer.service': 'Service Agreement', 'footer.join': 'Join Us',
  },
};

/** C端权益 by tier — Arco vs Render metering stated explicitly. */
function personalLists(lang, plan, tierIndex) {
  const credits = tiers[tierIndex].credits.toLocaleString('en-US');
  if (lang === 'zh') {
    const commonBasic = [
      `每月 ${credits} 积分`,
      'D5 Arco AI 创作 + Lite / 渲染器免费与社区能力',
      '全部模型 · AI 生成可商用',
      'D5 Arco AI 增强 / 放大：消耗积分',
      'D5 渲染器 AI 增强 / 放大：不支持',
    ];
    const commonPro = [
      `每月 ${credits} 积分`,
      'D5 Arco / Lite / 渲染器 / Works 专业工作流',
      '在线串流 · 云素材 · 城市生成器等已开放能力',
      '全部模型 · AI 生成可商用',
      'D5 Arco AI 增强 / 放大：消耗积分',
      'D5 渲染器 AI 增强 / 放大：不消耗积分',
    ];
    if (plan === 'basic') {
      const byTier = [
        [...commonBasic, '并发 4 · 图片 2K / 视频 720P', '充值：标准价（无额外赠送），积分有效期 90 天'],
        [...commonBasic, '并发 10 · 图片 4K / 视频 4K', '充值：额外赠送 10%，积分有效期 90 天'],
        [...commonBasic, '并发不限 · 图片 4K / 视频 4K', '充值：额外赠送 10%，积分有效期 90 天'],
      ];
      return byTier[tierIndex];
    }
    const byTier = [
      [...commonPro, '并发 4 · 图片 4K / 视频 4K', '充值：额外赠送 10%，积分有效期 180 天'],
      [...commonPro, '并发 10 · 图片 4K / 视频 4K', '充值：额外赠送 20%，积分有效期 180 天'],
      [...commonPro, '并发不限 · 图片 4K / 视频 4K', '充值：额外赠送 20%，积分有效期 180 天'],
    ];
    return byTier[tierIndex];
  }
  const commonBasic = [
    `${credits} credits / month`,
    'D5 Arco AI + free Lite / Render community capabilities',
    'All models · AI output may be used commercially',
    'D5 Arco enhance / upscale: consumes credits',
    'D5 Render enhance / upscale: not supported',
  ];
  const commonPro = [
    `${credits} credits / month`,
    'D5 Arco / Lite / Render / Works professional workflow',
    'Live streaming · cloud assets · city generator (where enabled)',
    'All models · AI output may be used commercially',
    'D5 Arco enhance / upscale: consumes credits',
    'D5 Render enhance / upscale: does not consume credits',
  ];
  if (plan === 'basic') {
    const byTier = [
      [...commonBasic, 'Concurrency 4 · image 2K / video 720P', 'Top-up: list price (no bonus), credits valid 90 days'],
      [...commonBasic, 'Concurrency 10 · image 4K / video 4K', 'Top-up: +10% bonus, credits valid 90 days'],
      [...commonBasic, 'Unlimited concurrency · image 4K / video 4K', 'Top-up: +10% bonus, credits valid 90 days'],
    ];
    return byTier[tierIndex];
  }
  const byTier = [
    [...commonPro, 'Concurrency 4 · image 4K / video 4K', 'Top-up: +10% bonus, credits valid 180 days'],
    [...commonPro, 'Concurrency 10 · image 4K / video 4K', 'Top-up: +20% bonus, credits valid 180 days'],
    [...commonPro, 'Unlimited concurrency · image 4K / video 4K', 'Top-up: +20% bonus, credits valid 180 days'],
  ];
  return byTier[tierIndex];
}

const plans = {
  zh: {
    tierNames: ['小', '中', '大'],
    credits: '积分', perMonth: '/月', monthly: '/月订阅', annual: '/年订阅', free: '/免费体验',
    upgrade: '立即购买', download: '免费下载',
    community: {
      desc: '免费探索 D5 创作',
      name: '社区版',
      info: '下载并登录，一次性获得 300 积分，有效期 365 天',
      list: [
        '一次性领取 300 积分（365 天）',
        '并发 2 · 图片 1K / 视频 480P',
        '部分模型 · 生成内容不可商用',
        'D5 Arco AI 增强 / 放大：消耗积分',
        'D5 渲染器 AI 增强 / 放大：不支持',
        '不可充值',
      ],
    },
    basic: { desc: '适合日常 AI 创作，按用量选档', name: '基础版' },
    pro: { desc: '解锁专业工作流，连接设计与可视化', name: '专业版' },
    compare: {
      lead: 'D5 渲染功能',
      cols: ['社区版', '基础版', '专业版', '团队 / 企业'],
      pending: '按席位配置',
      group: '场景编辑',
      rows: ['无限场景数量', '主流文件格式导入'],
    },
    sliderLabel: '每月 AI 积分档位',
    seatYear: '积分 / 席 / 年',
  },
  en: {
    tierNames: ['Small', 'Medium', 'Large'],
    credits: 'credits', perMonth: '/mo', monthly: '/month', annual: '/year', free: '/free',
    upgrade: 'Buy now', download: 'Free Download',
    community: {
      desc: 'Explore D5 creation for free',
      name: 'Community',
      info: 'Download and sign in for a one-time 300 credits, valid for 365 days',
      list: [
        'One-time 300 credits (365 days)',
        'Concurrency 2 · image 1K / video 480P',
        'Partial models · not for commercial use',
        'D5 Arco enhance / upscale: consumes credits',
        'D5 Render enhance / upscale: not supported',
        'Top-up not available',
      ],
    },
    basic: { desc: 'Everyday AI creation — pick by usage', name: 'Basic' },
    pro: { desc: 'Unlock the professional workflow', name: 'Pro' },
    compare: {
      lead: 'D5 Render Features',
      cols: ['Community', 'Basic', 'Pro', 'Teams / Enterprise'],
      pending: 'By seat type',
      group: 'Scene Editing',
      rows: ['Unlimited number of scenes', 'Major file format imports'],
    },
    sliderLabel: 'Monthly AI credit tier',
    seatYear: 'credits / seat / year',
  },
};

const businessSeats = {
  zh: [
    {
      id: 'team-basic',
      style: 'basic',
      desc: '面向中小型团队 · 基础席位',
      name: '团队版 · 基础席位',
      credits: 20000,
      cta: '获取团队方案',
      list: [
        '每席位每年 20,000 积分',
        '并发 10',
        'D5 Arco 基础功能 · Lite / 渲染器免费能力',
        'D5 Arco AI 增强 / 放大：消耗积分',
        'D5 渲染器 AI 增强 / 放大：消耗积分',
        '单团队协作即将推出',
      ],
    },
    {
      id: 'team-pro',
      style: 'pro',
      desc: '面向中小型团队 · 专业席位',
      name: '团队版 · 专业席位',
      credits: 25000,
      cta: '获取团队方案',
      list: [
        '每席位每年 25,000 积分',
        '并发 10',
        '全产品专业能力 · 在线串流 · 团队积分池',
        'D5 Arco AI 增强 / 放大：消耗积分',
        'D5 渲染器 AI 增强 / 放大：不消耗积分',
        '单团队协作即将推出',
      ],
    },
    {
      id: 'enterprise-basic',
      style: 'basic',
      desc: '面向大型客户 · 基础席位',
      name: '企业版 · 基础席位',
      credits: 22000,
      cta: '获取企业方案',
      list: [
        '每席位每年 22,000 积分',
        '并发不限',
        'D5 Arco 基础功能 · Lite / 渲染器免费能力',
        'D5 Arco AI 增强 / 放大：消耗积分',
        'D5 渲染器 AI 增强 / 放大：消耗积分',
        '多团队管理即将推出',
      ],
    },
    {
      id: 'enterprise-pro',
      style: 'pro',
      desc: '面向大型客户 · 专业席位',
      name: '企业版 · 专业席位',
      credits: 40000,
      cta: '联系企业顾问',
      list: [
        '每席位每年 40,000 积分',
        '并发不限',
        '专业产品组合 · 在线串流 · 组织积分池',
        'D5 Arco AI 增强 / 放大：消耗积分',
        'D5 渲染器 AI 增强 / 放大：不消耗积分',
        '多团队管理、SSO、组织权限和 API 即将推出',
      ],
    },
  ],
  en: [
    {
      id: 'team-basic',
      style: 'basic',
      desc: 'Teams · Basic seat',
      name: 'Teams · Basic seat',
      credits: 20000,
      cta: 'Get a Teams plan',
      list: [
        '20,000 credits per seat / year',
        'Concurrency 10',
        'D5 Arco basic · free Lite / Render',
        'D5 Arco enhance / upscale: consumes credits',
        'D5 Render enhance / upscale: consumes credits',
        'Single-team collaboration coming soon',
      ],
    },
    {
      id: 'team-pro',
      style: 'pro',
      desc: 'Teams · Pro seat',
      name: 'Teams · Pro seat',
      credits: 25000,
      cta: 'Get a Teams plan',
      list: [
        '25,000 credits per seat / year',
        'Concurrency 10',
        'Full product suite · live streaming · team credit pool',
        'D5 Arco enhance / upscale: consumes credits',
        'D5 Render enhance / upscale: does not consume credits',
        'Single-team collaboration coming soon',
      ],
    },
    {
      id: 'enterprise-basic',
      style: 'basic',
      desc: 'Enterprise · Basic seat',
      name: 'Enterprise · Basic seat',
      credits: 22000,
      cta: 'Get an Enterprise plan',
      list: [
        '22,000 credits per seat / year',
        'Unlimited concurrency',
        'D5 Arco basic · free Lite / Render',
        'D5 Arco enhance / upscale: consumes credits',
        'D5 Render enhance / upscale: consumes credits',
        'Multi-team management coming soon',
      ],
    },
    {
      id: 'enterprise-pro',
      style: 'pro',
      desc: 'Enterprise · Pro seat',
      name: 'Enterprise · Pro seat',
      credits: 40000,
      cta: 'Talk to an advisor',
      list: [
        '40,000 credits per seat / year',
        'Unlimited concurrency',
        'Pro suite · live streaming · org credit pool',
        'D5 Arco enhance / upscale: consumes credits',
        'D5 Render enhance / upscale: does not consume credits',
        'Multi-team, SSO, org permissions and API coming soon',
      ],
    },
  ],
};

const businessMeta = {
  zh: {
    preview: '当前为设计预览，尚未接入销售咨询，不会提交联系请求。',
    note: 'B 端按席位年度报价，不展示公开自助价；具体合同价由销售确认。',
  },
  en: {
    preview: 'This is a design preview. Sales contact is not connected and no request will be submitted.',
    note: 'Business plans are annual per-seat quotes with no public self-serve price; contract pricing is confirmed by sales.',
  },
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const t = key => copy[state.lang][key] ?? key;
const P = () => plans[state.lang];
const tierIndexFor = plan => (plan === 'basic' ? state.basicTier : state.proTier);
const price = (plan, i) => state.billing === 'annual' ? tiers[i][`${plan}Annual`] : tiers[i][plan];
const firstPrice = (plan, i) => tiers[i][`${plan}First`];
const firstMonthLabel = (plan, i) => state.lang === 'zh'
  ? `首月￥${firstPrice(plan, i)}`
  : `First month ￥${firstPrice(plan, i)}`;

function billingDiscountText() {
  // Global badge: use medium tier so independent card sliders do not flicker the label.
  const tier = tiers[1];
  const ratio = Math.min(tier.basicAnnual / (tier.basic * 12), tier.proAnnual / (tier.pro * 12));
  if (state.lang === 'zh') {
    const zhe = Math.round(ratio * 100) / 10;
    return `享${zhe}折`;
  }
  return `Save ${Math.round((1 - ratio) * 100)}%`;
}

const rollingNumbers = new WeakMap();
const activeNumbers = new Set();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const digitAt = (value, place) => Math.floor(value / (10 ** place)) % 10;
const wrapDigit = value => ((value % 10) + 10) % 10;

function paintLane(lane) {
  const whole = Math.floor(lane.position);
  lane.track.children[0].textContent = wrapDigit(whole);
  lane.track.children[1].textContent = wrapDigit(whole + 1);
  lane.track.style.transform = `translateY(-${(lane.position - whole) * 50}%)`;
}

function addLane(el, number, position) {
  const wheel = document.createElement('span');
  wheel.className = 'number-wheel';
  wheel.setAttribute('aria-hidden', 'true');
  const track = document.createElement('span');
  track.className = 'number-wheel-track';
  track.append(document.createElement('span'), document.createElement('span'));
  wheel.append(track);
  el.prepend(wheel);
  const lane = { wheel, track, position };
  number.lanes.push(lane);
  paintLane(lane);
}

function finishNumber(el, number) {
  cancelAnimationFrame(number.raf);
  number.raf = 0;
  activeNumbers.delete(el);
  if (reducedMotion.matches) {
    el.textContent = String(number.target);
    number.lanes = [];
    return;
  }
  const length = String(number.target).length;
  while (number.lanes.length > length) number.lanes.pop().wheel.remove();
  number.lanes.forEach((lane, place) => {
    lane.position = digitAt(number.target, place);
    paintLane(lane);
  });
}

function animateNumber(el, target) {
  let number = rollingNumbers.get(el);
  if (!number) {
    number = { target: Number(el.textContent) || 0, lanes: [], raf: 0 };
    rollingNumbers.set(el, number);
  }
  el.classList.add('rolling-number');
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', String(target));
  if (reducedMotion.matches) {
    number.target = target;
    finishNumber(el, number);
    return;
  }
  if (number.target === target) return;
  cancelAnimationFrame(number.raf);
  const previous = number.target;
  const direction = target > previous ? 1 : -1;
  if (!number.lanes.length) {
    el.textContent = '';
    for (let place = 0; place < String(previous).length; place++) {
      addLane(el, number, digitAt(previous, place));
    }
  }
  const length = Math.max(String(target).length, number.lanes.length);
  while (number.lanes.length < length) addLane(el, number, 0);
  number.target = target;
  number.lanes.forEach((lane, place) => {
    lane.start = lane.position;
    const digit = digitAt(target, place);
    lane.end = direction > 0
      ? digit + 10 * Math.ceil((lane.start - digit) / 10)
      : digit + 10 * Math.floor((lane.start - digit) / 10);
  });
  const started = performance.now();
  activeNumbers.add(el);
  const frame = now => {
    if (!el.isConnected) {
      number.raf = 0;
      activeNumbers.delete(el);
      return;
    }
    if (reducedMotion.matches) {
      finishNumber(el, number);
      return;
    }
    const progress = Math.min(1, Math.max(0, (now - started) / 500));
    const eased = 1 - (1 - progress) ** 4;
    number.lanes.forEach(lane => {
      lane.position = lane.start + (lane.end - lane.start) * eased;
      paintLane(lane);
    });
    if (progress === 1) finishNumber(el, number);
    else number.raf = requestAnimationFrame(frame);
  };
  number.raf = requestAnimationFrame(frame);
}

reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    activeNumbers.forEach(el => finishNumber(el, rollingNumbers.get(el)));
  }
});

function applyLanguage() {
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
  document.title = state.lang === 'zh' ? 'D5 · 选择你的创作方案' : 'D5 · Choose your D5 plan';
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));
  syncBillingToggle();
}

function syncBillingToggle() {
  const annual = state.billing === 'annual';
  const toggle = $('[data-billing-toggle]');
  toggle.setAttribute('aria-pressed', String(annual));
  toggle.setAttribute('aria-label', t(annual ? 'billing.toMonthly' : 'billing.toAnnual'));
  const discount = $('[data-i18n="billing.discount"]');
  if (discount) {
    discount.hidden = state.audience === 'team';
    discount.textContent = billingDiscountText();
  }
}

function listItems(list) {
  return list.map(item => Array.isArray(item)
    ? `<li>${item[0]}<em>${item[1]}</em></li>`
    : `<li>${item}</li>`).join('');
}

function stopRolling() {
  activeNumbers.forEach(el => {
    const number = rollingNumbers.get(el);
    cancelAnimationFrame(number.raf);
    number.raf = 0;
    activeNumbers.delete(el);
  });
}

function renderPlans() {
  stopRolling();
  const grid = $('#plan-grid');
  grid.classList.toggle('is-team', state.audience === 'team');
  if (state.audience === 'team') {
    const seats = businessSeats[state.lang];
    const meta = businessMeta[state.lang];
    const p = P();
    grid.innerHTML = seats.map(seat => `
      <article class="plan-card ${seat.style} seat-card" data-seat="${seat.id}">
        <div class="plan-top">
          <div class="plan-title">
            <p class="plan-desc">${seat.desc}</p>
            <div class="plan-name"><h2>${seat.name}</h2></div>
          </div>
          <div class="plan-info"><p>${seat.credits.toLocaleString('en-US')} ${p.seatYear}</p></div>
          <p class="seat-note">${meta.note}</p>
        </div>
        <button type="button" class="plan-button" data-contact-sales="${seat.id}">${seat.cta}</button>
        <ul class="plan-list">${listItems(seat.list)}</ul>
      </article>`).join('');
    return;
  }
  const p = P();
  const period = state.billing === 'annual' ? p.annual : p.monthly;
  const firstTag = id => {
    const i = tierIndexFor(id);
    return `<span class="tag" data-first-month data-plan="${id}"${state.billing === 'monthly' ? '' : ' hidden'}>${firstMonthLabel(id, i)}</span>`;
  };

  const paidCard = id => {
    const i = tierIndexFor(id);
    const tier = tiers[i];
    return `
    <article class="plan-card ${id}" data-plan-card="${id}">
      <div class="plan-top">
        <div class="plan-title">
          <p class="plan-desc">${p[id].desc}</p>
          <div class="plan-name"><h2>${p[id].name}</h2>${firstTag(id)}</div>
        </div>
        <div class="plan-price"><span class="price-value">￥<span data-price="${id}">${price(id, i)}</span></span><span class="price-period" data-period>${period}</span></div>
        <div class="credit-block">
          <div class="credit-wrap"><div class="credit-info"><img src="assets/figma/star-four.svg" alt=""><strong><span data-credits="${id}">${tier.credits}</span> ${p.credits}</strong><span>${p.perMonth}</span></div></div>
          <div class="plan-slider" data-plan-slider data-plan="${id}" style="--progress:${tierProgress[i]}">
            <span class="slider-fill" aria-hidden="true"></span>
            <span class="slider-ticks" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="slider-handle" aria-hidden="true"></span>
            <span class="slider-label" data-tier-label="${id}" aria-hidden="true">${p.tierNames[i]}</span>
            <input type="range" min="0" max="2" step="1" value="${i}" aria-label="${p[id].name} · ${p.sliderLabel}" aria-valuetext="${p.tierNames[i]}, ${tier.credits} ${p.credits}">
          </div>
        </div>
      </div>
      <button type="button" class="plan-button">${p.upgrade}</button>
      <ul class="plan-list" data-plan-list="${id}">${listItems(personalLists(state.lang, id, i))}</ul>
    </article>`;
  };

  grid.innerHTML = `
    <article class="plan-card community">
      <div class="plan-title">
        <p class="plan-desc">${p.community.desc}</p>
        <div class="plan-name"><h2>${p.community.name}</h2></div>
      </div>
      <div class="plan-price"><span class="price-value">￥0</span><span class="price-period">${p.free}</span></div>
      <div class="plan-info"><p>${p.community.info}</p></div>
      <a class="plan-button" href="#pricing">${p.download}</a>
      <ul class="plan-list">${listItems(p.community.list)}</ul>
    </article>
    ${paidCard('basic')}
    ${paidCard('pro')}`;
}

function syncPaidCard(plan) {
  if (state.audience === 'team') return;
  const p = P();
  const i = tierIndexFor(plan);
  const tier = tiers[i];
  const card = $(`[data-plan-card="${plan}"]`);
  if (!card) return;

  const priceEl = card.querySelector(`[data-price="${plan}"]`);
  if (priceEl) animateNumber(priceEl, price(plan, i));

  const creditsEl = card.querySelector(`[data-credits="${plan}"]`);
  if (creditsEl) animateNumber(creditsEl, tier.credits);

  card.querySelectorAll('[data-period]').forEach(el => {
    el.textContent = state.billing === 'annual' ? p.annual : p.monthly;
  });

  const label = card.querySelector(`[data-tier-label="${plan}"]`);
  if (label) label.textContent = p.tierNames[i];

  const slider = card.querySelector('[data-plan-slider]');
  if (slider) {
    slider.style.setProperty('--progress', tierProgress[i]);
    const input = slider.querySelector('input');
    input.value = String(i);
    input.setAttribute('aria-valuetext', `${p.tierNames[i]}, ${tier.credits} ${p.credits}`);
  }

  const tag = card.querySelector('[data-first-month]');
  if (tag) {
    tag.textContent = firstMonthLabel(plan, i);
    tag.hidden = state.billing !== 'monthly';
  }

  const list = card.querySelector(`[data-plan-list="${plan}"]`);
  if (list) list.innerHTML = listItems(personalLists(state.lang, plan, i));
}

function syncTier(scope) {
  if (state.audience === 'team') return;
  if (scope === 'basic' || scope === 'pro') {
    syncPaidCard(scope);
  } else {
    syncPaidCard('basic');
    syncPaidCard('pro');
  }
  const discount = $('[data-i18n="billing.discount"]');
  if (discount && state.audience !== 'team') discount.textContent = billingDiscountText();
}

function renderCompare() {
  const c = P().compare;
  const check = '<img src="assets/figma/check-circle.svg" alt="">';
  $('#compare').innerHTML = `
    <table class="compare-table">
      <thead class="compare-head"><tr>
        <th scope="col" class="lead"><span>${c.lead}<img src="assets/figma/chevron-down-12.svg" alt=""></span></th>
        ${c.cols.map(name => `<th scope="col" class="col">${name}</th>`).join('')}
      </tr></thead>
      <tbody class="compare-body">
        <tr><th colspan="5" class="compare-group"><img src="assets/figma/caret-down.svg" alt="">${c.group}</th></tr>
        ${c.rows.map(label => `<tr class="compare-row"><th scope="row" class="lead">${label}</th><td class="col">${check}</td><td class="col">${check}</td><td class="col">${check}</td><td class="col" title="${c.pending}">—</td></tr>`).join('')}
      </tbody>
    </table>`;
}

function renderAll() {
  renderPlans();
  renderCompare();
  applyLanguage();
}

function selectTier(plan, next) {
  if (plan !== 'basic' && plan !== 'pro') return;
  next = Math.max(0, Math.min(TIER_MAX, Math.round(next)));
  const key = plan === 'basic' ? 'basicTier' : 'proTier';
  if (next === state[key]) return;
  state[key] = next;
  syncTier(plan);
  $('#announcer').textContent = `${P()[plan].name} · ${P().tierNames[next]} · ${tiers[next].credits} ${P().credits}`;
}

function tierFromPointer(slider, clientX) {
  const rect = slider.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width;
  return (x - 1 / 3) / (1 / 3);
}

let drag = null;
document.addEventListener('pointerdown', e => {
  const slider = e.target.closest('[data-plan-slider]');
  if (!slider || drag || e.button !== 0 || e.isPrimary === false) return;
  const plan = slider.dataset.plan;
  if (plan !== 'basic' && plan !== 'pro') return;
  e.preventDefault();
  slider.setPointerCapture(e.pointerId);
  drag = { slider, id: e.pointerId, plan };
  slider.querySelector('input').focus({ preventScroll: true });
  selectTier(plan, tierFromPointer(slider, e.clientX));
});
document.addEventListener('pointermove', e => {
  if (drag && drag.id === e.pointerId) selectTier(drag.plan, tierFromPointer(drag.slider, e.clientX));
});
function finishDrag(e) {
  if (!drag || (e && drag.id !== e.pointerId)) return;
  const { slider, id } = drag;
  drag = null;
  if (slider.hasPointerCapture(id)) slider.releasePointerCapture(id);
}
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => document.addEventListener(type, finishDrag));
document.addEventListener('input', e => {
  if (!e.target.matches('[data-plan-slider] input')) return;
  const slider = e.target.closest('[data-plan-slider]');
  selectTier(slider.dataset.plan, Number(e.target.value));
});

document.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  if (btn.dataset.lang) { finishDrag(); state.lang = btn.dataset.lang; renderAll(); return; }
  if (btn.hasAttribute('data-billing-toggle')) {
    state.billing = state.billing === 'annual' ? 'monthly' : 'annual';
    syncTier();
    syncBillingToggle();
    return;
  }
  if (btn.hasAttribute('data-contact-sales')) {
    const seat = businessSeats[state.lang].find(s => s.id === btn.dataset.contactSales);
    const meta = businessMeta[state.lang];
    $('#announcer').textContent = `${seat ? seat.name : ''} · ${meta.preview}`;
    return;
  }
  if (btn.dataset.audience) {
    finishDrag();
    state.audience = btn.dataset.audience;
    $$('[data-audience]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.audience === state.audience)));
    renderPlans();
    syncBillingToggle();
    $('#announcer').textContent = t(`audience.${state.audience}`);
  }
});
$('#newsletter-form').addEventListener('submit', e => e.preventDefault());

// Back-compat for recommender.js which still reads state.tier in older snippets.
Object.defineProperty(state, 'tier', {
  get() { return state.basicTier; },
  set(v) { state.basicTier = v; },
});

renderAll();
