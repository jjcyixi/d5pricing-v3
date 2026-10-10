/**
 * ZH↔EN marketing copy sync for the D5 pricing demo.
 * Builds a lexicon from live copy trees + curated phrases; used by edit mode.
 */
(function (global) {
  const BRAND_KEEP = /^(D5|Arco|Lite|Works|Render|Discord|Instagram|FAQ|VR|XR|AI|GB|K|P)$/i;

  /** Curated marketing phrase pairs (zh → en). Longer phrases first after sort. */
  const PHRASE_PAIRS = [
    ['按创作用量，选择适合你的方案', 'Choose a plan by your creative usage'],
    ['从第一次灵感探索，到专业交付；小 / 中 / 大按用量选档', 'From first exploration to professional delivery — Small / Medium / Large by usage'],
    ['个人创作', 'For creators'],
    ['团队协作', 'For teams'],
    ['按月', 'Monthly'],
    ['按年', 'Yearly'],
    ['立即申请', 'Apply'],
    ['立即购买', 'Buy now'],
    ['免费下载', 'Free Download'],
    ['方案推荐', 'Plan finder'],
    ['选择你心仪的方案', 'Choose your preferred plan'],
    ['选择你心动的优惠', 'Choose your preferred offer'],
    ['让创作走的更远', 'Take your creativity further'],
    ['完整功能对比', 'Compare all features'],
    ['详细对比套餐及功能权益', 'Detailed comparison of plans and features'],
    ['创作额度与规格', 'Credits & output'],
    ['软件与工作流', 'Software & workflow'],
    ['用量额度', 'Capacity'],
    ['社区版', 'Community'],
    ['基础版', 'Basic'],
    ['专业版', 'Pro'],
    ['团队版', 'Teams'],
    ['企业版', 'Enterprise'],
    ['基础席位', 'Basic seat'],
    ['专业席位', 'Pro seat'],
    ['免费探索 D5 创作', 'Explore D5 creation for free'],
    ['适合日常 AI 创作，按用量选档', 'Everyday AI creation — pick by usage'],
    ['在社区版权益之上，解锁专业工作流', 'Everything in Community, plus the professional workflow'],
    ['确认订单', 'Confirm order'],
    ['确认支付', 'Confirm payment'],
    ['正在确认支付结果', 'Confirming payment'],
    ['正在开通', 'Provisioning'],
    ['购买成功', 'Purchase successful'],
    ['续购成功', 'Renewal successful'],
    ['升级成功', 'Upgrade successful'],
    ['充值成功', 'Top-up successful'],
    ['返回价格页', 'Back to pricing'],
    ['确认升级', 'Confirm upgrade'],
    ['升级到此方案', 'Upgrade to this plan'],
    ['获取配置建议与报价', 'Get a quote & configuration advice'],
    ['提交需求', 'Submit request'],
    ['该方案暂不可购买', 'This plan is not available'],
    ['请返回价格页重新选择。', 'Please go back to pricing and choose again.'],
    ['续购一个月', 'Renew one month'],
    ['续购一年', 'Renew one year'],
    ['获取团队方案', 'Get a Teams plan'],
    ['获取企业方案', 'Get an Enterprise plan'],
    ['联系企业顾问', 'Talk to an advisor'],
    ['并发任务', 'Concurrency'],
    ['不限', 'unlimited'],
    ['全部开放', 'all open'],
    ['部分开放', 'partial'],
    ['可商用', 'commercial'],
    ['不可商用', 'not commercial'],
    ['生成内容', 'AI output'],
    ['全部成果', 'All deliverables'],
    ['增强、放大', 'Enhance / upscale'],
    ['消耗积分', 'consumes credits'],
    ['不消耗积分', 'free of credits'],
    ['渲染器', 'Render'],
    ['图片', 'Image'],
    ['视频', 'video'],
    ['模型', 'Models'],
    ['积分', 'credits'],
    ['每月', 'per month'],
    ['按月发放', 'issued monthly'],
    ['联系销售', 'contact sales'],
    ['功能与权益', 'Features & benefits'],
    ['场景编辑', 'Scene editing'],
    ['渲染输出', 'Render output'],
    ['素材库与云存储', 'Assets & cloud'],
    ['AI 权益', 'AI benefits'],
    ['版本', 'Plan'],
    ['用量档位', 'Usage tier'],
    ['购买周期', 'Billing cycle'],
    ['服务起止', 'Service period'],
    ['积分发放', 'Credits'],
    ['本次应付', 'Amount due'],
    ['优惠资格', 'Offer eligibility'],
    ['到期不自动续费', 'Does not auto-renew at expiry'],
    ['年购一次支付；积分按月发放，未用完不累计。', 'Yearly paid once; credits issued monthly; unused credits do not roll over.'],
    ['无首月优惠', 'No first-month offer'],
    ['当前方案', 'Current plan'],
    ['目标方案', 'Target plan'],
    ['预估补差', 'Estimated upgrade fee'],
    ['联系人姓名', 'Contact name'],
    ['手机号', 'Phone'],
    ['公司或团队名称', 'Company or team'],
    ['团队规模', 'Team size'],
    ['意向版本', 'Preferred plan'],
    ['预计席位数量', 'Estimated seats'],
    ['意向席位', 'Preferred seat'],
    ['邮箱', 'Email'],
    ['采购时间', 'Purchase timing'],
    ['发票与合同需求', 'Invoice & contract needs'],
    ['主要使用场景', 'Primary use case'],
    ['选填', 'Optional'],
    ['请选择', 'Please select'],
    ['完成', 'Done'],
    ['小', 'Small'],
    ['中', 'Medium'],
    ['大', 'Large'],
    ['产品', 'Product'],
    ['支持', 'Support'],
    ['学习', 'Learn'],
    ['社区', 'Community'],
    ['商务合作', 'For Business'],
    ['公司', 'Company'],
    ['隐私政策', 'Privacy Policy'],
    ['服务协议', 'Service Agreement'],
    ['加入我们', 'Join Us'],
    ['帮助中心', 'Help Center'],
    ['为什么选择 D5', 'Why D5'],
    ['最新动态', 'What’s New'],
    ['价格', 'Pricing'],
    ['下载', 'Download'],
    ['推荐方案', 'Recommended plan'],
    ['推荐理由', 'Why we recommend it'],
    ['选择', 'Choose'],
    ['开始使用 D5 工作流', 'Start using D5 Workflow'],
    ['方案预览', 'Plan preview'],
    ['继续调整', 'Keep exploring'],
    ['首月优惠', 'First-month offer'],
    ['长期订阅更省', 'Long-term savings'],
    ['充值补充积分', 'Top up credits'],
    ['偶尔尝试', 'Explore occasionally'],
    ['稳定创作', 'Create regularly'],
    ['高频交付', 'Deliver at high volume'],
    ['个人兴趣及探索', 'Personal exploration'],
    ['AI 图片与视频生成', 'AI image and video creation'],
    ['设计项目策划和汇报', 'Design planning and presentations'],
    ['更高品质、更可控的 3D 渲染', 'Higher-quality, more controllable 3D rendering'],
    ['可漫游及互动的 3D 演示', 'Walkthroughs and interactive 3D presentations'],
    ['中小型团队 · 按席配置 · 联系销售报价', 'SMB teams · per-seat · sales quote'],
    ['大型组织 · 按席配置 · 联系销售报价', 'Large orgs · per-seat · sales quote'],
    ['按席位年度报价，具体合同价由销售确认。', 'Annual per-seat quotes; contract pricing is confirmed by sales.'],
    ['按量创作 · 增强耗积分', 'Metered creation · enhance uses credits'],
    ['专业交付 · 渲染器增强不耗积分', 'Pro delivery · Render enhance free of credits'],
    ['组织按量创作 · 增强耗积分', 'Org metered creation · enhance uses credits'],
    ['组织专业交付 · 渲染器增强不耗积分', 'Org pro delivery · Render enhance free of credits'],
    ['积分 / 席 / 年', 'credits / seat / year'],
    ['登录一次性领取 · 有效期 365 天', 'One-time on sign-in · valid 365 days'],
    ['用于 AI 图像 / 视频 / 3D 创作 · 按月发放', 'For AI image / video / 3D · issued monthly'],
    ['增强、放大功能消耗积分', 'Enhance / upscale consumes credits'],
    ['增强、放大：渲染器不消耗积分 · Arco 消耗积分', 'Enhance / upscale: Render free of credits · Arco metered'],
    ['生成内容不可商用', 'AI output not commercial'],
    ['生成内容 <b>可商用</b>', 'AI output <b>commercial</b>'],
    ['全部成果 <b>可商用</b>', 'All deliverables <b>commercial</b>'],
    ['模型 <b>全部开放</b>', 'Models <b>all open</b>'],
    ['模型 <b>部分开放</b>', 'Models <b>partial</b>'],
    ['并发任务 <b>不限</b>', 'Concurrency <b>unlimited</b>'],
    ['无限项目数量', 'Unlimited projects'],
    ['工作流同步插件', 'Workflow sync plugins'],
    ['环境光照与天气编辑', 'Environment lighting & weather'],
    ['植物笔刷 / 路径 / 散布', 'Plant brush / path / scatter'],
    ['图片 / 全景 / 视频渲染', 'Image / panorama / video render'],
    ['包含社区版场景编辑与基础渲染', 'Community scene editing & base render'],
    ['D5 Arco AI 创作衔接', 'D5 Arco AI creation workflow'],
    ['文件导入 / 导出衔接各产品', 'Connect products via import / export'],
    ['在线串流 · 16,000+ 云素材', 'Live streaming · 16,000+ cloud assets'],
    ['城市生成器 · 舞台灯 / 投影灯', 'City generator · stage / projection lights'],
    ['VR / XR · 交互与全景展示不限', 'VR / XR · unlimited interactive & panorama'],
    ['10 GB 云存储 · 专业输出通道', '10 GB cloud · pro output channels'],
    ['保留所有权利。', 'All rights reserved.'],
    ['获取最新消息、文章、资源和设计灵感。', 'Subscribe to get the latest news, articles, resources and inspiration.'],
    ['订阅动态', 'Hear from us'],
    ['关注我们', 'Follow us'],
    ['下一步', 'Next'],
    ['输入邮箱', 'Enter your email'],
    ['邮箱地址', 'Email address'],
    ['D5学生版', 'D5 for Education'],
    ['专为高校在校生推出的特别权益方案，助力教与学', 'A special plan for enrolled university students — teaching and learning'],
  ];

  function buildLexicon() {
    const zh2en = new Map();
    const en2zh = new Map();
    const add = (zh, en) => {
      if (!zh || !en || typeof zh !== 'string' || typeof en !== 'string') return;
      const z = zh.trim();
      const e = en.trim();
      if (!z || !e) return;
      if (!zh2en.has(z)) zh2en.set(z, e);
      if (!en2zh.has(e)) en2zh.set(e, z);
    };
    PHRASE_PAIRS.forEach(([z, e]) => add(z, e));

    const walkPair = (a, b) => {
      if (typeof a === 'string' && typeof b === 'string') add(a, b);
      else if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
        a.forEach((v, i) => walkPair(v, b[i]));
      } else if (a && b && typeof a === 'object' && typeof b === 'object') {
        Object.keys(a).forEach(k => {
          if (k in b) walkPair(a[k], b[k]);
        });
      }
    };

    if (global.copy?.zh && global.copy?.en) walkPair(global.copy.zh, global.copy.en);
    if (global.plans?.zh && global.plans?.en) walkPair(global.plans.zh, global.plans.en);
    if (global.businessModules?.zh && global.businessModules?.en) walkPair(global.businessModules.zh, global.businessModules.en);
    if (global.businessMeta?.zh && global.businessMeta?.en) walkPair(global.businessMeta.zh, global.businessMeta.en);
    if (global.compareData?.zh && global.compareData?.en) walkPair(global.compareData.zh, global.compareData.en);
    if (global.flowCopyAll?.zh && global.flowCopyAll?.en) walkPair(global.flowCopyAll.zh, global.flowCopyAll.en);

    return { zh2en, en2zh };
  }

  let lexicon = null;
  function refreshLexicon() {
    lexicon = buildLexicon();
    return lexicon;
  }
  function getLexicon() {
    return lexicon || refreshLexicon();
  }

  function hasCJK(s) {
    return /[\u4e00-\u9fff]/.test(s);
  }

  function detectLang(text) {
    const plain = String(text || '').replace(/<[^>]+>/g, '');
    if (hasCJK(plain)) return 'zh';
    return 'en';
  }

  /** Preserve HTML tags; translate text segments. */
  function translateHtml(html, from, to) {
    const raw = String(html ?? '');
    if (!raw.trim()) return raw;
    // Prefer full-string lexicon hit (keeps spacing around tags as authored)
    const lex = getLexicon();
    const map = from === 'zh' ? lex.zh2en : lex.en2zh;
    if (map.has(raw.trim())) {
      const edge = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
      return (edge[1] || '') + map.get(raw.trim()) + (edge[3] || '');
    }
    const parts = raw.split(/(<[^>]+>)/g);
    return parts.map(part => {
      if (!part || part.startsWith('<')) return part;
      return translateText(part, from, to);
    }).join('');
  }

  function translateText(text, from, to) {
    const src = String(text ?? '');
    if (!src.trim()) return src;
    const lex = getLexicon();
    const map = from === 'zh' ? lex.zh2en : lex.en2zh;
    if (map.has(src.trim())) return map.get(src.trim());

    // Exact ignoring outer whitespace
    const trimmed = src.trim();
    if (map.has(trimmed)) {
      const edge = src.match(/^(\s*)([\s\S]*?)(\s*)$/);
      return (edge[1] || '') + map.get(trimmed) + (edge[3] || '');
    }

    // Greedy phrase replace (longest first)
    const entries = [...map.entries()].sort((a, b) => b[0].length - a[0].length);
    let out = src;
    const protectedTokens = [];
    out = out.replace(/(\d[\d,]*(?:\.\d+)?%?|￥|¥|\/月|\/mo|\/年|\/year|4K|2K|1K|480P|720P|16K|10 GB|16,000\+|2,100\+)/gi, (m) => {
      const id = `\u0000${protectedTokens.length}\u0000`;
      protectedTokens.push(m);
      return id;
    });

    for (const [a, b] of entries) {
      if (a.length < 2) continue;
      if (out.includes(a)) out = out.split(a).join(b);
    }

    protectedTokens.forEach((tok, i) => {
      out = out.split(`\u0000${i}\u0000`).join(tok);
    });

    // If still identical and from zh with CJK left, apply light structural hints
    if (out === src && from === 'zh' && hasCJK(out)) {
      out = out
        .replace(/每月\s*/g, '')
        .replace(/积分/g, ' credits')
        .replace(/席位/g, ' seat')
        .replace(/不限/g, 'unlimited')
        .replace(/可商用/g, 'commercial')
        .replace(/不可商用/g, 'not commercial')
        .replace(/消耗积分/g, 'consumes credits')
        .replace(/不消耗积分/g, 'free of credits')
        .replace(/增强、放大/g, 'Enhance / upscale')
        .replace(/并发任务/g, 'Concurrency')
        .replace(/基础版/g, 'Basic')
        .replace(/专业版/g, 'Pro')
        .replace(/社区版/g, 'Community')
        .replace(/团队版/g, 'Teams')
        .replace(/企业版/g, 'Enterprise')
        .replace(/年购/g, 'Yearly')
        .replace(/月购/g, 'Monthly');
    }
    if (out === src && from === 'en' && !hasCJK(out)) {
      out = out
        .replace(/\bcredits\b/gi, '积分')
        .replace(/\bConcurrency\b/g, '并发任务')
        .replace(/\bunlimited\b/gi, '不限')
        .replace(/\bBasic\b/g, '基础版')
        .replace(/\bPro\b/g, '专业版')
        .replace(/\bCommunity\b/g, '社区版')
        .replace(/\bTeams\b/g, '团队版')
        .replace(/\bEnterprise\b/g, '企业版')
        .replace(/\bMonthly\b/g, '按月')
        .replace(/\bYearly\b/g, '按年')
        .replace(/Enhance \/ upscale/gi, '增强、放大')
        .replace(/consumes credits/gi, '消耗积分')
        .replace(/free of credits/gi, '不消耗积分');
    }

    return out;
  }

  function translate(text, from, to) {
    if (from === to) return text;
    if (String(text).includes('<')) return translateHtml(text, from, to);
    return translateText(text, from, to);
  }

  function twinLang(lang) {
    return lang === 'zh' ? 'en' : 'zh';
  }

  /** Normalize override value to { zh, en }. */
  function toBilingual(val, currentLang) {
    if (val && typeof val === 'object' && !Array.isArray(val) && ('zh' in val || 'en' in val)) {
      return { zh: val.zh ?? '', en: val.en ?? '' };
    }
    const s = String(val ?? '');
    const from = currentLang || detectLang(s);
    const other = twinLang(from);
    const pair = { zh: '', en: '' };
    pair[from] = s;
    pair[other] = translate(s, from, other);
    return pair;
  }

  function getOverrideText(entry, lang) {
    if (entry == null) return null;
    if (typeof entry === 'string') return entry;
    if (typeof entry === 'object') return entry[lang] ?? entry.zh ?? entry.en ?? null;
    return null;
  }

  /** Write bilingual value into known source trees when key maps cleanly. */
  function writeSource(key, bilingual) {
    if (!key || !bilingual) return;
    ['zh', 'en'].forEach(lang => {
      const val = bilingual[lang];
      if (val == null) return;
      const plain = String(val).replace(/<[^>]+>/g, (m) => m); // keep html

      if (global.copy?.[lang] && Object.prototype.hasOwnProperty.call(global.copy[lang], key)) {
        global.copy[lang][key] = plain;
      }

      let m = key.match(/^plan\.(community|basic|pro)\.(name|desc|info|cta|upgrade|download)$/);
      if (m && global.plans?.[lang]) {
        const plan = m[1];
        const field = m[2];
        if (field === 'cta' || field === 'upgrade') global.plans[lang].upgrade = plain;
        else if (field === 'download') global.plans[lang].download = plain;
        else if (global.plans[lang][plan]) global.plans[lang][plan][field] = plain;
      }

      m = key.match(/^plan\.(aiLabel|workflowLabel|credits|perMonth|monthly|annual|free|sliderLabel|seatYear)$/);
      if (m && global.plans?.[lang]) global.plans[lang][m[1]] = plain;

      m = key.match(/^plan\.tierNames\.(\d)$/);
      if (m && global.plans?.[lang]?.tierNames) global.plans[lang].tierNames[Number(m[1])] = plain;

      m = key.match(/^biz\.(team|enterprise)\.(title|subtitle|note)$/);
      if (m) {
        if (m[2] === 'note' && global.businessMeta?.[lang]) global.businessMeta[lang].note = plain;
        else {
          const mod = global.businessModules?.[lang]?.find(x => x.id === m[1]);
          if (mod) mod[m[2]] = plain;
        }
      }

      m = key.match(/^biz\.seat\.([^.(]+)\.(name|desc|cta)$/);
      if (m && global.businessModules?.[lang]) {
        for (const mod of global.businessModules[lang]) {
          const seat = mod.seats.find(s => s.id === m[1]);
          if (seat) { seat[m[2]] = plain; break; }
        }
      }

      m = key.match(/^biz\.seat\.([^.(]+)\.bullet\.(\d+)$/);
      if (m && global.businessModules?.[lang]) {
        for (const mod of global.businessModules[lang]) {
          const seat = mod.seats.find(s => s.id === m[1]);
          if (seat && seat.bullets) { seat.bullets[Number(m[2])] = plain; break; }
        }
      }

      m = key.match(/^compare\.lead$/);
      if (m && global.compareData?.[lang]) global.compareData[lang].lead = plain;

      m = key.match(/^compare\.col\.(\d+)$/);
      if (m && global.compareData?.[lang]?.cols) global.compareData[lang].cols[Number(m[1])] = plain;

      m = key.match(/^compare\.g(\d+)\.title$/);
      if (m && global.compareData?.[lang]?.groups?.[Number(m[1])]) {
        global.compareData[lang].groups[Number(m[1])].title = plain;
      }

      m = key.match(/^compare\.g(\d+)\.r(\d+)\.(label|c(\d+))$/);
      if (m && global.compareData?.[lang]?.groups?.[Number(m[1])]?.rows?.[Number(m[2])]) {
        const row = global.compareData[lang].groups[Number(m[1])].rows[Number(m[2])];
        if (m[3] === 'label') row[0] = plain;
        else if (m[4] != null) {
          const idx = Number(m[4]) + 1;
          if (typeof row[idx] === 'string') row[idx] = plain;
        }
      }

      // flow.* keys handled via flowCopyAll in flows.js
      if (key.startsWith('flow.') && typeof global.writeFlowCopy === 'function') {
        global.writeFlowCopy(key, lang, plain);
      }

      // recommender words
      if (key.startsWith('finder.') && typeof global.writeFinderCopy === 'function') {
        global.writeFinderCopy(key, lang, plain);
      }
    });
    refreshLexicon();
  }

  global.D5I18n = {
    translate,
    detectLang,
    twinLang,
    toBilingual,
    getOverrideText,
    writeSource,
    refreshLexicon,
    hasCJK,
  };
})(window);
