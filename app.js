// D5 pricing page — kinkihi layout + AI/workflow split + team/enterprise modules + live pricing supplements.

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
    'education.title': 'D5学生版', 'education.subtitle': '专为高校在校生推出的特别权益方案，助力教与学', 'education.button': '立即申请',
    'workflow.title': '方案推荐', 'workflow.subtitle': '让创作走的更远',
    'comparison.title': '完整功能对比', 'comparison.subtitle': '详细对比套餐及功能权益',
    'faq.title': 'FAQ',
    'faq.q1': '各档方案只差积分吗？',
    'faq.a1': '不只积分。小 / 中 / 大还会影响并发任务、图片/视频规格、充值赠送与积分有效期。基础与专业同档积分一致，核心差异是：①商用——基础为生成内容可商用，专业为全部成果可商用；②增强、放大——Arco 两端都消耗积分；专业版渲染器侧不消耗积分，基础版不支持渲染器侧增强。具体以功能入口说明为准。',
    'faq.q2': '年购积分如何发放？会自动续费吗？',
    'faq.a2': '年购一次支付，积分仍按月发放，未用完不累计到下一积分月。当前为到期不自动续费；是否自动续费以购买确认页为准。',
    'faq.q3': '充值规则是什么？团队 / 企业怎么买？',
    'faq.a3': '充值可补充 D5 AI 积分，不改变版本功能。社区版不可充值；基础版按档位为标准价或额外赠送，充值积分有效期 90 天；专业版额外赠送更高，有效期 180 天，均以充值确认页为准。团队版与企业版为两个独立版本模块，各自提供基础席位与专业席位，不展示公开自助价，请联系销售获取报价。',
    'faq.q4': '如何获得发票凭证？',
    'faq.a4': '成功订购后，可前往 D5 用户中心 · 发票服务 申请开票。',
    'faq.q5': '专业版用户能否升级或加入团队版？',
    'faq.a5': '专业版用户如需升级为团队版，可联系我们了解详情。若团队已开通团队版，可联系团队管理员邀请你加入。',
    'faq.q6': '购买及订阅的详细规则？',
    'faq.a6': '查看 D5 订阅规则（d5render.cn/subscription-rules）。其他购买问题可进入帮助中心向我们提问。',
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
    'education.title': 'D5 for Education', 'education.subtitle': 'A special plan for enrolled university students — teaching and learning', 'education.button': 'Apply',
    'workflow.title': 'Plan finder', 'workflow.subtitle': 'Take your creativity further',
    'comparison.title': 'Compare all features', 'comparison.subtitle': 'Detailed comparison of plans and features',
    'faq.title': 'FAQ',
    'faq.q1': 'Do tiers only differ in credits?',
    'faq.a1': 'No. Small / Medium / Large also change concurrency, image/video caps, top-up bonuses and credit validity. Basic and Pro share the same credit tiers. Core differences: (1) commercial — Basic covers AI output; Pro covers all deliverables; (2) enhance/upscale — Arco always consumes credits; Render enhance is free of credits on Pro only (unsupported on Basic). Follow the feature entry copy.',
    'faq.q2': 'How are yearly credits issued? Auto-renew?',
    'faq.a2': 'Yearly plans are paid once; credits are still issued monthly and unused credits do not roll over. Current purchases do not auto-renew at expiry; the confirmation page is authoritative.',
    'faq.q3': 'Top-up rules? How do Teams / Enterprise work?',
    'faq.a3': 'Top-ups add D5 AI credits without changing plan features. Community cannot top up; Basic uses list price or a bonus by tier with 90-day validity; Pro has a higher bonus with 180-day validity — see the top-up confirmation page. Teams and Enterprise are separate modules, each with Basic / Pro seats and no public self-serve price; contact sales for a quote.',
    'faq.q4': 'How do I get an invoice?',
    'faq.a4': 'After a successful purchase, apply for an invoice in D5 User Center · Invoice Service.',
    'faq.q5': 'Can Pro users upgrade or join Teams?',
    'faq.a5': 'Contact us to upgrade from Pro to Teams. If your organization already has Teams, ask your admin to invite you.',
    'faq.q6': 'Where are the full subscription rules?',
    'faq.a6': 'See D5 Subscription Rules (d5render.cn/subscription-rules). For other purchase questions, visit Help Center.',
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

/** C-end AI lines: short scan lines + bold values (ref 20260918 clarity; no ✦ header required). */
function personalAi(lang, plan, tierIndex) {
  if (lang === 'zh') {
    if (plan === 'community') {
      return [
        '并发任务 <b>2</b>',
        '图片 <b>1K</b> · 视频 <b>480P</b>',
        '模型 <b>部分开放</b>',
        '生成内容不可商用',
        '增强、放大功能消耗积分',
      ];
    }
    const byTier = {
      basic: [
        [
          '并发任务 <b>4</b>',
          '图片 <b>2K</b> · 视频 <b>720P</b>',
          '模型 <b>全部开放</b>',
          '生成内容 <b>可商用</b>',
          '增强、放大功能消耗积分',
        ],
        [
          '并发任务 <b>10</b>',
          '图片 <b>4K</b> · 视频 <b>4K</b>',
          '模型 <b>全部开放</b>',
          '生成内容 <b>可商用</b>',
          '增强、放大功能消耗积分',
        ],
        [
          '并发任务 <b>不限</b>',
          '图片 <b>4K</b> · 视频 <b>4K</b>',
          '模型 <b>全部开放</b>',
          '生成内容 <b>可商用</b>',
          '增强、放大功能消耗积分',
        ],
      ],
      pro: [
        [
          '并发任务 <b>4</b>',
          '图片 <b>4K</b> · 视频 <b>4K</b>（全档）',
          '模型 <b>全部开放</b>',
          '全部成果 <b>可商用</b>',
          '增强、放大：渲染器不消耗积分 · Arco 消耗积分',
        ],
        [
          '并发任务 <b>10</b>',
          '图片 <b>4K</b> · 视频 <b>4K</b>（全档）',
          '模型 <b>全部开放</b>',
          '全部成果 <b>可商用</b>',
          '增强、放大：渲染器不消耗积分 · Arco 消耗积分',
        ],
        [
          '并发任务 <b>不限</b>',
          '图片 <b>4K</b> · 视频 <b>4K</b>（全档）',
          '模型 <b>全部开放</b>',
          '全部成果 <b>可商用</b>',
          '增强、放大：渲染器不消耗积分 · Arco 消耗积分',
        ],
      ],
    };
    return byTier[plan][tierIndex];
  }
  if (plan === 'community') {
    return [
      'Concurrency <b>2</b>',
      'Image <b>1K</b> · video <b>480P</b>',
      'Models <b>partial</b>',
      'AI output not commercial',
      'Enhance / upscale consumes credits',
    ];
  }
  const byTier = {
    basic: [
      [
        'Concurrency <b>4</b>',
        'Image <b>2K</b> · video <b>720P</b>',
        'Models <b>all open</b>',
        'AI output <b>commercial</b>',
        'Enhance / upscale consumes credits',
      ],
      [
        'Concurrency <b>10</b>',
        'Image <b>4K</b> · video <b>4K</b>',
        'Models <b>all open</b>',
        'AI output <b>commercial</b>',
        'Enhance / upscale consumes credits',
      ],
      [
        'Concurrency <b>unlimited</b>',
        'Image <b>4K</b> · video <b>4K</b>',
        'Models <b>all open</b>',
        'AI output <b>commercial</b>',
        'Enhance / upscale consumes credits',
      ],
    ],
    pro: [
      [
        'Concurrency <b>4</b>',
        'Image <b>4K</b> · video <b>4K</b> (all tiers)',
        'Models <b>all open</b>',
        'All deliverables <b>commercial</b>',
        'Enhance / upscale: Render free of credits · Arco metered',
      ],
      [
        'Concurrency <b>10</b>',
        'Image <b>4K</b> · video <b>4K</b> (all tiers)',
        'Models <b>all open</b>',
        'All deliverables <b>commercial</b>',
        'Enhance / upscale: Render free of credits · Arco metered',
      ],
      [
        'Concurrency <b>unlimited</b>',
        'Image <b>4K</b> · video <b>4K</b> (all tiers)',
        'Models <b>all open</b>',
        'All deliverables <b>commercial</b>',
        'Enhance / upscale: Render free of credits · Arco metered',
      ],
    ],
  };
  return byTier[plan][tierIndex];
}

/** Software / workflow features — short scannable lines. */
function personalWorkflow(lang, plan) {
  if (lang === 'zh') {
    if (plan === 'community') {
      return [
        '无限项目数量',
        '工作流同步插件',
        '环境光照与天气编辑',
        '植物笔刷 / 路径 / 散布',
        '图片 / 全景 / 视频渲染',
        'D5 Lite 免费功能 · 官方素材 2,100+',
      ];
    }
    if (plan === 'basic') {
      return [
        '包含社区版场景编辑与基础渲染',
        'D5 Arco AI 创作衔接',
        'D5 Lite 免费功能 · 渲染器社区版能力',
        '文件导入 / 导出衔接各产品',
      ];
    }
    return [
      'D5 Arco / Lite / 渲染器 / Works 专业功能',
      '在线串流 · 16,000+ 云素材',
      '城市生成器 · 舞台灯 / 投影灯',
      'VR / XR · 交互与全景展示不限',
      '10 GB 云存储 · 专业输出通道',
    ];
  }
  if (plan === 'community') {
    return [
      'Unlimited projects',
      'Workflow sync plugins',
      'Environment lighting & weather',
      'Plant brush / path / scatter',
      'Image / panorama / video render',
      'D5 Lite free features · 2,100+ assets',
    ];
  }
  if (plan === 'basic') {
    return [
      'Community scene editing & base render',
      'D5 Arco AI creation workflow',
      'D5 Lite free · Render Community',
      'Connect products via import / export',
    ];
  }
  return [
    'Arco / Lite / Render / Works Pro features',
    'Live streaming · 16,000+ cloud assets',
    'City generator · stage / projection lights',
    'VR / XR · unlimited interactive & panorama',
    '10 GB cloud · pro output channels',
  ];
}

function capacityCopy(lang, plan, tierIndex) {
  const n = tiers[tierIndex].credits.toLocaleString('en-US');
  if (lang === 'zh') {
    if (plan === 'community') return { title: '300 积分', sub: '登录一次性领取 · 有效期 365 天' };
    return { title: `每月 ${n} 积分`, sub: '用于 AI 图像 / 视频 / 3D 创作 · 按月发放' };
  }
  if (plan === 'community') return { title: '300 credits', sub: 'One-time on sign-in · valid 365 days' };
  return { title: `${n} credits / month`, sub: 'For AI image / video / 3D · issued monthly' };
}

const plans = {
  zh: {
    tierNames: ['小', '中', '大'],
    credits: '积分', perMonth: '/月', monthly: '/月订阅', annual: '/年订阅', free: '/免费体验',
    upgrade: '立即购买', download: '免费下载',
    aiLabel: '创作额度与规格', workflowLabel: '软件与工作流',
    community: {
      desc: '免费探索 D5 创作',
      name: '社区版',
      info: '下载并登录，一次性获得 300 积分，有效期 365 天',
    },
    basic: { desc: '适合日常 AI 创作，按用量选档', name: '基础版' },
    pro: { desc: '在社区版权益之上，解锁专业工作流', name: '专业版' },
    sliderLabel: '每月 AI 积分档位',
    seatYear: '积分 / 席 / 年',
  },
  en: {
    tierNames: ['Small', 'Medium', 'Large'],
    credits: 'credits', perMonth: '/mo', monthly: '/month', annual: '/year', free: '/free',
    upgrade: 'Buy now', download: 'Free Download',
    aiLabel: 'Credits & output', workflowLabel: 'Software & workflow',
    community: {
      desc: 'Explore D5 creation for free',
      name: 'Community',
      info: 'Download and sign in for a one-time 300 credits, valid for 365 days',
    },
    basic: { desc: 'Everyday AI creation — pick by usage', name: 'Basic' },
    pro: { desc: 'Everything in Community, plus the professional workflow', name: 'Pro' },
    sliderLabel: 'Monthly AI credit tier',
    seatYear: 'credits / seat / year',
  },
};

const businessModules = {
  zh: [
    {
      id: 'team',
      title: '团队版',
      subtitle: '中小型团队 · 按席配置 · 联系销售报价',
      seats: [
        {
          id: 'team-basic',
          style: 'basic',
          name: '基础席位',
          desc: '按量创作 · 增强耗积分',
          credits: 20000,
          cta: '获取团队方案',
          bullets: [
            '并发任务 <b>10</b> · 图片/视频 <b>4K</b>',
            '模型全部 · 生成内容可商用',
            '增强、放大功能消耗积分',
          ],
        },
        {
          id: 'team-pro',
          style: 'pro',
          name: '专业席位',
          desc: '专业交付 · 渲染器增强不耗积分',
          credits: 25000,
          cta: '获取团队方案',
          bullets: [
            '并发任务 <b>10</b> · 图片/视频 <b>4K</b>',
            '模型全部 · 全部成果可商用',
            '增强、放大：渲染器不消耗积分 · Arco 消耗积分',
          ],
        },
      ],
    },
    {
      id: 'enterprise',
      title: '企业版',
      subtitle: '大型组织 · 按席配置 · 联系销售报价',
      seats: [
        {
          id: 'enterprise-basic',
          style: 'basic',
          name: '基础席位',
          desc: '组织按量创作 · 增强耗积分',
          credits: 22000,
          cta: '获取企业方案',
          bullets: [
            '并发任务 <b>不限</b> · 图片/视频 <b>4K</b>',
            '模型全部 · 生成内容可商用',
            '增强、放大功能消耗积分',
          ],
        },
        {
          id: 'enterprise-pro',
          style: 'pro',
          name: '专业席位',
          desc: '组织专业交付 · 渲染器增强不耗积分',
          credits: 40000,
          cta: '联系企业顾问',
          bullets: [
            '并发任务 <b>不限</b> · 图片/视频 <b>4K</b>',
            '模型全部 · 全部成果可商用',
            '增强、放大：渲染器不消耗积分 · Arco 消耗积分',
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: 'team',
      title: 'Teams',
      subtitle: 'SMB teams · per-seat · sales quote',
      seats: [
        {
          id: 'team-basic',
          style: 'basic',
          name: 'Basic seat',
          desc: 'Metered creation · enhance uses credits',
          credits: 20000,
          cta: 'Get a Teams plan',
          bullets: [
            'Concurrency <b>10</b> · image/video <b>4K</b>',
            'All models · commercial AI output',
            'Enhance / upscale consumes credits',
          ],
        },
        {
          id: 'team-pro',
          style: 'pro',
          name: 'Pro seat',
          desc: 'Pro delivery · Render enhance free of credits',
          credits: 25000,
          cta: 'Get a Teams plan',
          bullets: [
            'Concurrency <b>10</b> · image/video <b>4K</b>',
            'All models · all deliverables commercial',
            'Enhance / upscale: Render free · Arco metered',
          ],
        },
      ],
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      subtitle: 'Large orgs · per-seat · sales quote',
      seats: [
        {
          id: 'enterprise-basic',
          style: 'basic',
          name: 'Basic seat',
          desc: 'Org metered creation · enhance uses credits',
          credits: 22000,
          cta: 'Get an Enterprise plan',
          bullets: [
            'Concurrency <b>unlimited</b> · image/video <b>4K</b>',
            'All models · commercial AI output',
            'Enhance / upscale consumes credits',
          ],
        },
        {
          id: 'enterprise-pro',
          style: 'pro',
          name: 'Pro seat',
          desc: 'Org pro delivery · Render enhance free of credits',
          credits: 40000,
          cta: 'Talk to an advisor',
          bullets: [
            'Concurrency <b>unlimited</b> · image/video <b>4K</b>',
            'All models · all deliverables commercial',
            'Enhance / upscale: Render free · Arco metered',
          ],
        },
      ],
    },
  ],
};

const businessMeta = {
  zh: {
    preview: '当前为设计预览，尚未接入销售咨询，不会提交联系请求。',
    note: '按席位年度报价，具体合同价由销售确认。',
  },
  en: {
    preview: 'This is a design preview. Sales contact is not connected and no request will be submitted.',
    note: 'Annual per-seat quotes; contract pricing is confirmed by sales.',
  },
};

const compareData = {
  zh: {
    lead: '功能与权益',
    cols: ['社区版', '基础版', '专业版'],
    groups: [
      {
        title: 'AI 权益',
        rows: [
          ['月度积分', '登录 300（365 天）', '小/中/大 2k/6k/13k', '同档积分齐平'],
          ['并发任务', '2', '4 / 10 / 不限', '4 / 10 / 不限'],
          ['图片 · 视频', '1K · 480P', '小档 2K·720P 起', '全档 4K · 4K'],
          ['模型', '部分开放', '全部开放', '全部开放'],
          ['商用', '生成内容不可商用', '生成内容可商用', '全部成果可商用'],
          ['增强、放大（Arco）', '消耗积分', '消耗积分', '消耗积分'],
          ['增强、放大（渲染器）', '不支持', '不支持', '不消耗积分'],
          ['充值', '不可充值', '标准价或 +10% · 90 天', '+10% / +20% · 180 天'],
        ],
      },
      {
        title: '场景编辑',
        rows: [
          ['无限场景 / 项目数量', true, true, true],
          ['地理天空和天气系统', true, true, true],
          ['植物笔刷、路径、散布', true, true, true],
          ['视频运镜和生长动画模板', true, true, true],
          ['舞台灯和投影灯', false, false, true],
          ['城市生成', false, false, true],
          ['项目合并', false, false, true],
        ],
      },
      {
        title: '渲染输出',
        rows: [
          ['图片和全景图渲染', '最高 16K', '最高 16K', '最高 16K'],
          ['基础视频输出', '最高 4K', '最高 4K', '最高 4K'],
          ['通道图 / 品牌水印 / 序列帧', false, false, true],
          ['VR / 双目立体 / XR', false, false, true],
          ['交互演示', '创建 1 个', '创建 1 个', '不限'],
          ['空间漫游和全景漫游', '创建 1 个', '创建 1 个', '不限'],
        ],
      },
      {
        title: '素材库与云存储',
        rows: [
          ['官方素材', '2,100+', '2,100+', '16,000+'],
          ['自定义素材库', true, true, true],
          ['D5 Works', false, false, true],
          ['云存储空间', '限量', '限量', '10 GB'],
        ],
      },
    ],
  },
  en: {
    lead: 'Features & benefits',
    cols: ['Community', 'Basic', 'Pro'],
    groups: [
      {
        title: 'AI benefits',
        rows: [
          ['Monthly credits', 'Sign-in 300 (365d)', 'S/M/L 2k/6k/13k', 'Same tier credits'],
          ['Concurrency', '2', '4 / 10 / unlimited', '4 / 10 / unlimited'],
          ['Image · video', '1K · 480P', 'From Small 2K·720P', 'All tiers 4K · 4K'],
          ['Models', 'Partial', 'All open', 'All open'],
          ['Commercial use', 'AI output no', 'AI output yes', 'All deliverables yes'],
          ['Enhance / upscale (Arco)', 'Consumes', 'Consumes', 'Consumes'],
          ['Enhance / upscale (Render)', 'N/A', 'N/A', 'No consume'],
          ['Top-up', 'Unavailable', 'List or +10% · 90d', '+10% / +20% · 180d'],
        ],
      },
      {
        title: 'Scene editing',
        rows: [
          ['Unlimited scenes / projects', true, true, true],
          ['Geo sky & weather', true, true, true],
          ['Plant brush / path / scatter', true, true, true],
          ['Camera & growth templates', true, true, true],
          ['Stage & projection lights', false, false, true],
          ['City generator', false, false, true],
          ['Project merge', false, false, true],
        ],
      },
      {
        title: 'Render output',
        rows: [
          ['Image & panorama', 'Up to 16K', 'Up to 16K', 'Up to 16K'],
          ['Base video output', 'Up to 4K', 'Up to 4K', 'Up to 4K'],
          ['Channels / watermark / sequences', false, false, true],
          ['VR / stereo / XR', false, false, true],
          ['Interactive demos', 'Create 1', 'Create 1', 'Unlimited'],
          ['Space & panorama roam', 'Create 1', 'Create 1', 'Unlimited'],
        ],
      },
      {
        title: 'Assets & cloud',
        rows: [
          ['Official assets', '2,100+', '2,100+', '16,000+'],
          ['Custom asset library', true, true, true],
          ['D5 Works', false, false, true],
          ['Cloud storage', 'Limited', 'Limited', '10 GB'],
        ],
      },
    ],
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

function listItems(list, keyPrefix) {
  return list.map((item, idx) => {
    const body = Array.isArray(item) ? `${item[0]}<em>${item[1]}</em>` : item;
    const edit = keyPrefix ? ` data-edit="${keyPrefix}.${idx}" data-edit-html="1"` : '';
    return `<li><img class="check" src="assets/figma/check-circle.svg" alt=""><span${edit}>${body}</span></li>`;
  }).join('');
}

function capacityBlock(plan, tierIndex) {
  const c = capacityCopy(state.lang, plan, tierIndex);
  const ticks = plan === 'community'
    ? ''
    : `<div class="capacity-meter" aria-hidden="true"><i class="${tierIndex >= 0 ? 'on' : ''}"></i><i class="${tierIndex >= 1 ? 'on' : ''}"></i><i class="${tierIndex >= 2 ? 'on' : ''}"></i></div>`;
  return `
    <div class="capacity-zone" data-capacity-zone="${plan}">
      <div class="capacity-label" data-edit="capacity.label">${state.lang === 'zh' ? '用量额度' : 'Capacity'}</div>
      <div class="capacity-title" data-capacity-title="${plan}" data-edit="capacity.${plan}.title">${c.title}</div>
      <div class="capacity-sub" data-capacity-sub="${plan}" data-edit="capacity.${plan}.sub">${c.sub}</div>
      ${ticks}
    </div>`;
}

function benefitBlocks(aiList, workflowList, plan, tierIndex) {
  const p = P();
  const tierKey = plan === 'community' ? '0' : String(tierIndex ?? 0);
  return `
    <div class="benefit-stack">
      <div class="benefit-block benefit-ai">
        <div class="benefit-label" data-edit="plan.aiLabel">${p.aiLabel}</div>
        <ul class="plan-list" data-ai-list>${listItems(aiList, `benefit.${plan}.ai.${tierKey}`)}</ul>
      </div>
      <div class="benefit-divider" aria-hidden="true"></div>
      <div class="benefit-block benefit-workflow">
        <div class="benefit-label" data-edit="plan.workflowLabel">${p.workflowLabel}</div>
        <ul class="plan-list plan-list-secondary" data-workflow-list>${listItems(workflowList, `benefit.${plan}.workflow`)}</ul>
      </div>
    </div>`;
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
  const edu = document.querySelector('.education');
  if (edu) edu.hidden = state.audience === 'team';
  const billing = document.querySelector('.billing');
  if (billing) billing.hidden = state.audience === 'team';
  if (state.audience === 'team') {
    const modules = businessModules[state.lang];
    const meta = businessMeta[state.lang];
    const p = P();
    // Two version modules side-by-side; each shows 基础|专业 seats in one row
    grid.innerHTML = modules.map(mod => `
      <section class="biz-module" data-biz-module="${mod.id}">
        <div class="biz-module-head">
          <h2 data-edit="biz.${mod.id}.title">${mod.title}</h2>
          <p data-edit="biz.${mod.id}.subtitle">${mod.subtitle}</p>
          <p class="biz-module-note" data-edit="biz.${mod.id}.note">${meta.note}</p>
        </div>
        <div class="biz-seat-grid">
          ${mod.seats.map(seat => `
            <article class="plan-card ${seat.style} seat-card" data-seat="${seat.id}">
              <div class="plan-zone-a">
                <div class="plan-title">
                  <div class="plan-name"><h2 data-edit="biz.seat.${seat.id}.name">${seat.name}</h2></div>
                  <p class="plan-desc" data-edit="biz.seat.${seat.id}.desc">${seat.desc}</p>
                </div>
                <div class="capacity-zone seat-capacity">
                  <div class="capacity-title"><span data-edit="biz.seat.${seat.id}.credits">${seat.credits.toLocaleString('en-US')}</span> <span data-edit="plan.seatYear">${p.seatYear}</span></div>
                </div>
              </div>
              <button type="button" class="plan-button" data-contact-sales="${seat.id}"><span data-edit="biz.seat.${seat.id}.cta">${seat.cta}</span></button>
              <ul class="plan-list seat-bullets">${listItems(seat.bullets, `biz.seat.${seat.id}.bullet`)}</ul>
            </article>`).join('')}
        </div>
      </section>`).join('');
    if (window.D5Flows) window.D5Flows.afterPricingRender();
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
      <div class="plan-zone-a">
        <div class="plan-title">
          <p class="plan-desc" data-edit="plan.${id}.desc">${p[id].desc}</p>
          <div class="plan-name"><h2 data-edit="plan.${id}.name">${p[id].name}</h2>${firstTag(id)}</div>
        </div>
        <div class="plan-price"><span class="price-value">￥<span data-price="${id}">${price(id, i)}</span></span><span class="price-period" data-period data-edit="plan.period">${period}</span></div>
        <div class="credit-block">
          <div class="credit-wrap"><div class="credit-info"><img src="assets/figma/star-four.svg" alt=""><strong><span data-credits="${id}">${tier.credits}</span> <span data-edit="plan.credits">${p.credits}</span></strong><span data-edit="plan.perMonth">${p.perMonth}</span></div></div>
          <div class="plan-slider" data-plan-slider data-plan="${id}" style="--progress:${tierProgress[i]}">
            <span class="slider-fill" aria-hidden="true"></span>
            <span class="slider-ticks" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="slider-handle" aria-hidden="true"></span>
            <span class="slider-label" data-tier-label="${id}" data-edit="plan.tierNames.${i}" aria-hidden="true">${p.tierNames[i]}</span>
            <input type="range" min="0" max="2" step="1" value="${i}" aria-label="${p[id].name} · ${p.sliderLabel}" aria-valuetext="${p.tierNames[i]}, ${tier.credits} ${p.credits}">
          </div>
        </div>
      </div>
      <button type="button" class="plan-button" data-flow-buy="${id}"><span data-edit="plan.${id}.cta">${p.upgrade}</span></button>
      ${capacityBlock(id, i)}
      ${benefitBlocks(personalAi(state.lang, id, i), personalWorkflow(state.lang, id), id, i)}
    </article>`;
  };

  grid.innerHTML = `
    <article class="plan-card community">
      <div class="plan-zone-a">
        <div class="plan-title">
          <p class="plan-desc" data-edit="plan.community.desc">${p.community.desc}</p>
          <div class="plan-name"><h2 data-edit="plan.community.name">${p.community.name}</h2></div>
        </div>
        <div class="plan-price"><span class="price-value">￥0</span><span class="price-period" data-edit="plan.free">${p.free}</span></div>
        <div class="plan-info"><p data-edit="plan.community.info">${p.community.info}</p></div>
      </div>
      <a class="plan-button" href="#pricing" data-nav="pricing"><span data-edit="plan.community.download">${p.download}</span></a>
      ${capacityBlock('community', 0)}
      ${benefitBlocks(personalAi(state.lang, 'community', 0), personalWorkflow(state.lang, 'community'), 'community', 0)}
    </article>
    ${paidCard('basic')}
    ${paidCard('pro')}`;
  if (window.D5Flows) window.D5Flows.afterPricingRender();
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

  const aiList = card.querySelector('[data-ai-list]');
  if (aiList) aiList.innerHTML = listItems(personalAi(state.lang, plan, i), `benefit.${plan}.ai.${i}`);
  const wfList = card.querySelector('[data-workflow-list]');
  if (wfList) wfList.innerHTML = listItems(personalWorkflow(state.lang, plan), `benefit.${plan}.workflow`);

  const cap = capacityCopy(state.lang, plan, i);
  const titleEl = card.querySelector(`[data-capacity-title="${plan}"]`);
  const subEl = card.querySelector(`[data-capacity-sub="${plan}"]`);
  if (titleEl) titleEl.textContent = cap.title;
  if (subEl) subEl.textContent = cap.sub;
  const meter = card.querySelector('[data-capacity-zone] .capacity-meter');
  if (meter) {
    [...meter.children].forEach((tick, idx) => tick.classList.toggle('on', idx <= i));
  }
}

function syncTier(scope) {
  if (state.audience === 'team') return;
  const sync = (typeof window.syncPaidCard === 'function') ? window.syncPaidCard : syncPaidCard;
  if (scope === 'basic' || scope === 'pro') {
    sync(scope);
  } else {
    sync('basic');
    sync('pro');
  }
  const discount = $('[data-i18n="billing.discount"]');
  if (discount && state.audience !== 'team') discount.textContent = billingDiscountText();
}

function cellHtml(value) {
  if (value === true) return '<img src="assets/figma/check-circle.svg" alt="">';
  if (value === false) return '<span class="compare-empty">—</span>';
  return `<span class="compare-text">${value}</span>`;
}

function renderCompare() {
  const c = compareData[state.lang];
  $('#compare').innerHTML = `
    <table class="compare-table">
      <thead class="compare-head"><tr>
        <th scope="col" class="lead"><span data-edit="compare.lead">${c.lead}</span><img src="assets/figma/chevron-down-12.svg" alt=""></th>
        ${c.cols.map((name, i) => `<th scope="col" class="col" data-edit="compare.col.${i}">${name}</th>`).join('')}
      </tr></thead>
      <tbody class="compare-body">
        ${c.groups.map((group, gi) => `
          <tr><th colspan="4" class="compare-group"><img src="assets/figma/caret-down.svg" alt=""><span data-edit="compare.g${gi}.title">${group.title}</span></th></tr>
          ${group.rows.map((row, ri) => {
            const [label, ...vals] = row;
            return `<tr class="compare-row"><th scope="row" class="lead" data-edit="compare.g${gi}.r${ri}.label">${label}</th>${vals.map((v, ci) => {
              if (v === true || v === false) return `<td class="col">${cellHtml(v)}</td>`;
              return `<td class="col"><span class="compare-text" data-edit="compare.g${gi}.r${ri}.c${ci}">${v}</span></td>`;
            }).join('')}</tr>`;
          }).join('')}
        `).join('')}
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
    const seat = businessModules[state.lang].flatMap(m => m.seats).find(s => s.id === btn.dataset.contactSales);
    const meta = businessMeta[state.lang];
    const mod = businessModules[state.lang].find(m => m.seats.some(s => s.id === btn.dataset.contactSales));
    $('#announcer').textContent = `${mod ? mod.title + ' · ' : ''}${seat ? seat.name : ''} · ${meta.preview}`;
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

// Expose for flows.js (SPA checkout / edit mode)
window.state = state;
window.tiers = tiers;
window.plans = plans;
window.businessModules = businessModules;
window.businessMeta = businessMeta;
window.copy = copy;
window.compareData = compareData;
window.renderPlans = renderPlans;
window.renderCompare = renderCompare;
window.renderAll = renderAll;
window.syncPaidCard = syncPaidCard;
window.syncTier = syncTier;
window.selectTier = selectTier;
window.applyLanguage = applyLanguage;

renderAll();
