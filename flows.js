/**
 * D5 pricing demo — SPA flow routes + edit mode + membership mock.
 * Depends on globals from app.js: state, tiers, plans, businessModules, copy, $, $$, renderAll, selectTier
 */
(function () {
  const STORAGE_KEY = 'd5-pricing-demo-v3';
  const FLOW_ROUTES = new Set([
    'pricing', 'checkout', 'paying', 'provisioning', 'success', 'upgrade', 'team-lead', 'blocked',
  ]);

  const MEMBERSHIPS = [
    { id: 'community', label: '社区版', plan: 'community', tier: null, billing: null },
    { id: 'basic-mid-monthly', label: '基础版 · 中 · 月购', plan: 'basic', tier: 1, billing: 'monthly' },
    { id: 'pro-small-monthly', label: '专业版 · 小 · 月购', plan: 'pro', tier: 0, billing: 'monthly' },
  ];

  const flowCopy = {
    back: '返回价格页',
    checkout: {
      kicker: '确认订单',
      title: '确认支付',
      lead: '请核对方案与应付金额。页面、报价与订单须使用同一价格与权益版本。',
      rows: {
        plan: '版本',
        tier: '用量档位',
        cycle: '购买周期',
        service: '服务起止',
        points: '积分发放',
        pay: '本次应付',
        first: '优惠资格',
      },
      noteMonthly: '到期不自动续费',
      noteAnnual: '年购一次支付；积分按月发放，未用完不累计。',
      notePoints: '购买生效后发放当期 {{credits}} 积分；积分月结束时到期。',
      confirm: '确认支付 ¥{{amount}}',
      firstYes: '首月优惠适用 · 首月 ¥{{first}}，后续 ¥{{regular}} / 月',
      firstNo: '无首月优惠',
    },
    paying: {
      title: '正在确认支付结果',
      body: '请稍候，勿重复支付。可刷新状态或查看订单。',
    },
    provisioning: {
      title: '正在开通',
      body: '付款已收到，正在开通权益，请稍候。',
    },
    success: {
      newTitle: '购买成功',
      newBody: '{{plan}} 已生效，有效期至 {{serviceEnd}}；当期 {{credits}} 积分已到账，积分有效期至 {{pointsEnd}}。',
      renewTitle: '续购成功',
      renewBody: '下一周期为 {{serviceStart}} 至 {{serviceEnd}}，权益与用量按确认页约定生效。',
      upgradeTitle: '升级成功',
      upgradeBodySame: '{{plan}} 已生效，当前服务到期日仍为 {{serviceEnd}}。',
      upgradeBodyNew: '{{plan}} 已生效，新服务周期为 {{serviceStart}} 至 {{serviceEnd}}。',
      rechargeTitle: '充值成功',
      rechargeBody: '{{credits}} D5 AI 积分已到账，有效期至 {{pointsEnd}}。',
      extraNoAuto: '单次购买：到期不自动续费',
      extraAnnual: '年购含积分：积分按月发放；续购积分在新周期开始时发放',
      extraTopup: '已补发 {{credits}} 积分，有效期至 {{pointsEnd}}',
      done: '完成',
    },
    upgrade: {
      kicker: '升级确认',
      title: '升级到此方案',
      lead: '按剩余服务期补差价升级（路径 A 简版）。当前服务到期日不变；当期积分差额按规则补发。',
      from: '当前方案',
      to: '目标方案',
      diff: '预估补差',
      note: '同额度升级不写「积分已到账」。不可在有效期内降低版本或积分额度。',
      confirm: '确认升级',
      blockedDown: '当前有效期内不支持降低版本或积分额度，可在到期后重新选择。',
    },
    teamLead: {
      kicker: '团队与企业',
      title: '获取配置建议与报价',
      lead: '请填写团队规模与使用需求，我们将通过你预留的联系方式与你沟通。',
      submit: '提交需求',
      submitting: '正在提交…',
      ok: '需求已提交，我们将通过你预留的联系方式与你沟通。',
      fail: '提交未完成，请重试。你填写的内容已保留。',
      fields: {
        name: '联系人姓名',
        phone: '手机号',
        company: '公司或团队名称',
        size: '团队规模',
        intentVersion: '意向版本',
        seats: '预计席位数量',
        intentSeat: '意向席位',
        email: '邮箱',
        purchaseTime: '采购时间',
        invoice: '发票与合同需求',
        scene: '主要使用场景',
      },
      optional: '选填',
      sizes: ['1–5 人', '6–20 人', '21–50 人', '51–200 人', '200 人以上'],
      versions: ['团队版', '企业版'],
      seatOptions: ['基础席位', '专业席位', '待定'],
    },
    blocked: {
      title: '该方案暂不可购买',
      body: '请返回价格页重新选择。',
    },
    cta: {
      buy: '立即购买',
      renewMonth: '续购一个月',
      renewYear: '续购一年',
      upgrade: '升级到此方案',
      download: '免费下载',
    },
  };

  const demo = {
    route: 'pricing',
    editing: false,
    membershipId: 'community',
    order: null, // pending checkout / upgrade payload
    successKind: 'new', // new | renew | upgrade | recharge
    timers: [],
    copyOverrides: {},
    editPanelOpen: false,
  };

  function P() { return plans[state.lang]; }
  function tierName(i) { return P().tierNames[i]; }
  function planName(plan) {
    if (plan === 'community') return P().community.name;
    return P()[plan].name;
  }
  function membership() {
    return MEMBERSHIPS.find(m => m.id === demo.membershipId) || MEMBERSHIPS[0];
  }

  function addDays(base, days) {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d;
  }
  function fmtDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  function serviceWindow(billing) {
    const start = new Date();
    const end = billing === 'annual' ? addDays(start, 365) : addDays(start, 30);
    const pointsEnd = addDays(start, 30);
    return { start: fmtDate(start), end: fmtDate(end), pointsEnd: fmtDate(pointsEnd) };
  }

  function planRank(plan) {
    return { community: 0, basic: 1, pro: 2 }[plan] ?? 0;
  }

  function resolveAction(targetPlan, targetTier) {
    const m = membership();
    if (targetPlan === 'community') return { type: 'download', label: flowCopy.cta.download };

    if (m.plan === 'community') {
      return { type: 'buy', label: flowCopy.cta.buy };
    }

    // Downgrade blocked
    if (planRank(targetPlan) < planRank(m.plan)) {
      return { type: 'blocked', label: flowCopy.cta.buy, reason: 'downgrade' };
    }
    if (planRank(targetPlan) === planRank(m.plan) && targetTier < (m.tier ?? 0)) {
      return { type: 'blocked', label: flowCopy.cta.buy, reason: 'downgrade-tier' };
    }

    // Same plan + same tier → renew
    if (m.plan === targetPlan && m.tier === targetTier) {
      const label = state.billing === 'annual' ? flowCopy.cta.renewYear : flowCopy.cta.renewMonth;
      return { type: 'renew', label };
    }

    // Upgrade (higher plan or higher tier)
    if (planRank(targetPlan) > planRank(m.plan) || (m.plan === targetPlan && targetTier > m.tier)) {
      return { type: 'upgrade', label: flowCopy.cta.upgrade };
    }

    return { type: 'buy', label: flowCopy.cta.buy };
  }

  function buildOrder({ plan, tier, billing, kind }) {
    const t = tiers[tier];
    const annual = billing === 'annual';
    const regular = annual ? t[`${plan}Annual`] : t[plan];
    const first = t[`${plan}First`];
    const eligibleFirst = kind === 'buy' && !annual && membership().plan === 'community';
    const amount = eligibleFirst ? first : regular;
    const win = serviceWindow(billing);
    return {
      plan,
      tier,
      billing,
      kind, // buy | renew | upgrade
      credits: t.credits,
      amount,
      regular,
      first,
      eligibleFirst,
      planLabel: `${planName(plan)} · ${tierName(tier)}`,
      cycleLabel: annual ? (state.lang === 'zh' ? '年购 · 一次支付' : 'Yearly · pay once') : (state.lang === 'zh' ? '月购 · 单次' : 'Monthly · one-time'),
      serviceStart: win.start,
      serviceEnd: win.end,
      pointsEnd: win.pointsEnd,
    };
  }

  function estimateUpgradeDiff(order) {
    const m = membership();
    if (!m || m.plan === 'community') return order.amount;
    const fromTier = tiers[m.tier ?? 0];
    const fromPrice = m.billing === 'annual' ? fromTier[`${m.plan}Annual`] : fromTier[m.plan];
    // Simplified remaining-period proration mock: ~50% of monthly delta or annual delta slice
    const delta = Math.max(0, order.regular - fromPrice);
    return Math.max(1, Math.round(delta * 0.5));
  }

  /* ---------- persistence ---------- */
  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.membershipId && MEMBERSHIPS.some(m => m.id === data.membershipId)) {
        demo.membershipId = data.membershipId;
      }
      if (data.copyOverrides && typeof data.copyOverrides === 'object') {
        demo.copyOverrides = data.copyOverrides;
      }
      if (data.editing) demo.editing = !!data.editing;
      if (typeof data.basicTier === 'number') state.basicTier = data.basicTier;
      if (typeof data.proTier === 'number') state.proTier = data.proTier;
      if (data.billing === 'monthly' || data.billing === 'annual') state.billing = data.billing;
    } catch (_) { /* ignore */ }
  }

  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        membershipId: demo.membershipId,
        copyOverrides: demo.copyOverrides,
        editing: demo.editing,
        basicTier: state.basicTier,
        proTier: state.proTier,
        billing: state.billing,
      }));
    } catch (_) { /* ignore */ }
  }

  function applyOverridesToDom() {
    Object.entries(demo.copyOverrides).forEach(([key, val]) => {
      document.querySelectorAll(`[data-edit="${key}"]`).forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = val;
        else el.textContent = val;
      });
    });
  }

  function captureEdit(el) {
    const key = el.getAttribute('data-edit');
    if (!key) return;
    const val = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') ? el.value : el.textContent;
    demo.copyOverrides[key] = val.trim();
    saveStorage();
  }

  /* ---------- routing ---------- */
  function clearTimers() {
    demo.timers.forEach(id => clearTimeout(id));
    demo.timers = [];
  }

  function parseHash() {
    const raw = (location.hash || '#pricing').replace(/^#/, '');
    const [path, qs] = raw.split('?');
    const route = FLOW_ROUTES.has(path) ? path : 'pricing';
    const params = {};
    if (qs) {
      qs.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }
    return { route, params };
  }

  function navigate(route, params = {}) {
    const q = Object.keys(params).length
      ? '?' + Object.entries(params).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
      : '';
    const next = `#${route}${q}`;
    if (location.hash === next) {
      showRoute(route, params);
      return;
    }
    location.hash = next;
  }

  function showRoute(route, params = {}) {
    clearTimers();
    demo.route = route;
    document.body.dataset.route = route;

    // All non-pricing routes share #flow-root (single .view host). Keep it is-active
    // whenever a flow is shown — matching against view-${route} would strip is-active
    // and .view { display:none } would hide checkout / upgrade / etc.
    const flowRoot = document.getElementById('flow-root');
    if (flowRoot) flowRoot.classList.toggle('is-active', route !== 'pricing');

    // pricing view is the main content (not wrapped as .view alone — we toggle visibility)
    const mainPricing = document.getElementById('view-pricing');
    const flowHost = document.getElementById('flow-host');
    if (route === 'pricing') {
      if (mainPricing) mainPricing.hidden = false;
      if (flowHost) flowHost.hidden = true;
      document.querySelector('.reference-footer')?.removeAttribute('hidden');
    } else {
      if (mainPricing) mainPricing.hidden = true;
      if (flowHost) flowHost.hidden = false;
      document.querySelector('.reference-footer')?.setAttribute('hidden', '');
      renderFlow(route, params);
    }

    window.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
  }

  function fill(template, map) {
    return template.replace(/\{\{(\w+)\}\}/g, (_, k) => (map[k] != null ? map[k] : ''));
  }

  function backLink() {
    return `<button type="button" class="flow-btn secondary" data-nav="pricing">${flowCopy.back}</button>`;
  }

  function renderCheckout() {
    const o = demo.order;
    if (!o) {
      return `<div class="flow-card"><h1>${flowCopy.blocked.title}</h1><p class="flow-lead">${flowCopy.blocked.body}</p><div class="flow-actions">${backLink()}</div></div>`;
    }
    const c = flowCopy.checkout;
    const pointsNote = fill(c.notePoints, { credits: o.credits.toLocaleString('en-US') });
    const firstRow = o.eligibleFirst
      ? fill(c.firstYes, { first: o.first, regular: o.regular })
      : c.firstNo;
    return `
      <div class="flow-card">
        <div class="flow-kicker" data-edit="flow.checkout.kicker">${c.kicker}</div>
        <h1 data-edit="flow.checkout.title">${c.title}</h1>
        <p class="flow-lead" data-edit="flow.checkout.lead">${c.lead}</p>
        <div class="flow-rows">
          <div class="flow-row"><span class="k">${c.rows.plan}</span><span class="v">${o.planLabel}</span></div>
          <div class="flow-row"><span class="k">${c.rows.tier}</span><span class="v">${tierName(o.tier)}</span></div>
          <div class="flow-row"><span class="k">${c.rows.cycle}</span><span class="v">${o.cycleLabel}</span></div>
          <div class="flow-row"><span class="k">${c.rows.service}</span><span class="v">${o.serviceStart} → ${o.serviceEnd}</span></div>
          <div class="flow-row"><span class="k">${c.rows.points}</span><span class="v">${o.credits.toLocaleString('en-US')} · ${o.pointsEnd}</span></div>
          <div class="flow-row"><span class="k">${c.rows.first}</span><span class="v">${firstRow}</span></div>
          <div class="flow-row"><span class="k">${c.rows.pay}</span><span class="v">¥${o.amount}</span></div>
        </div>
        <div class="flow-note" data-edit="flow.checkout.note">${o.billing === 'annual' ? c.noteAnnual : c.noteMonthly}<br>${pointsNote}</div>
        <div class="flow-actions">
          <button type="button" class="flow-btn" data-action="confirm-pay">${fill(c.confirm, { amount: o.amount })}</button>
          ${backLink()}
        </div>
      </div>`;
  }

  function renderStatus(kind) {
    const c = flowCopy[kind];
    return `
      <div class="flow-card">
        <div class="flow-status">
          <div class="spinner" aria-hidden="true"></div>
          <h1 data-edit="flow.${kind}.title">${c.title}</h1>
          <p data-edit="flow.${kind}.body">${c.body}</p>
        </div>
      </div>`;
  }

  function renderSuccess(params) {
    const kind = params.type || demo.successKind || 'new';
    const o = demo.order || buildOrder({ plan: 'basic', tier: 1, billing: 'monthly', kind: 'buy' });
    const c = flowCopy.success;
    let title = c.newTitle;
    let body = fill(c.newBody, {
      plan: o.planLabel,
      serviceEnd: o.serviceEnd,
      credits: o.credits.toLocaleString('en-US'),
      pointsEnd: o.pointsEnd,
    });
    const extras = [];

    if (kind === 'renew') {
      title = c.renewTitle;
      body = fill(c.renewBody, { serviceStart: o.serviceStart, serviceEnd: o.serviceEnd });
    } else if (kind === 'upgrade') {
      title = c.upgradeTitle;
      body = fill(c.upgradeBodySame, { plan: o.planLabel, serviceEnd: o.serviceEnd });
      if (o.topupCredits) {
        extras.push(fill(c.extraTopup, { credits: o.topupCredits.toLocaleString('en-US'), pointsEnd: o.pointsEnd }));
      }
    } else if (kind === 'recharge') {
      title = c.rechargeTitle;
      body = fill(c.rechargeBody, { credits: (o.credits || 1000).toLocaleString('en-US'), pointsEnd: o.pointsEnd });
    } else {
      extras.push(c.extraNoAuto);
      if (o.billing === 'annual') extras.push(c.extraAnnual);
    }

    return `
      <div class="flow-card">
        <div class="flow-kicker">结果</div>
        <h1 data-edit="flow.success.title">${title}</h1>
        <p class="flow-lead" data-edit="flow.success.body">${body}</p>
        ${extras.length ? `<ul class="success-extra">${extras.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
        <div class="flow-actions" style="margin-top:24px">
          <button type="button" class="flow-btn" data-nav="pricing">${c.done}</button>
        </div>
      </div>`;
  }

  function renderUpgrade() {
    const o = demo.order;
    const m = membership();
    const c = flowCopy.upgrade;
    if (!o) {
      return `<div class="flow-card"><h1>${flowCopy.blocked.title}</h1><p class="flow-lead">${flowCopy.blocked.body}</p><div class="flow-actions">${backLink()}</div></div>`;
    }
    if (o.kind === 'blocked') {
      return `<div class="flow-card"><h1 data-edit="flow.upgrade.blocked">${c.blockedDown}</h1><div class="flow-actions" style="margin-top:24px">${backLink()}</div></div>`;
    }
    const fromLabel = m.plan === 'community'
      ? planName('community')
      : `${planName(m.plan)} · ${tierName(m.tier)} · ${m.billing === 'annual' ? '年购' : '月购'}`;
    const diff = estimateUpgradeDiff(o);
    o.amount = diff;
    o.topupCredits = Math.max(0, o.credits - (m.tier != null ? tiers[m.tier].credits : 0));

    return `
      <div class="flow-card">
        <div class="flow-kicker" data-edit="flow.upgrade.kicker">${c.kicker}</div>
        <h1 data-edit="flow.upgrade.title">${c.title}</h1>
        <p class="flow-lead" data-edit="flow.upgrade.lead">${c.lead}</p>
        <div class="flow-rows">
          <div class="flow-row"><span class="k">${c.from}</span><span class="v">${fromLabel}</span></div>
          <div class="flow-row"><span class="k">${c.to}</span><span class="v">${o.planLabel}</span></div>
          <div class="flow-row"><span class="k">${c.diff}</span><span class="v">¥${diff}</span></div>
          <div class="flow-row"><span class="k">服务到期日</span><span class="v">${o.serviceEnd}（不变）</span></div>
        </div>
        <div class="flow-note" data-edit="flow.upgrade.note">${c.note}</div>
        <div class="flow-actions">
          <button type="button" class="flow-btn" data-action="confirm-upgrade">${c.confirm}</button>
          ${backLink()}
        </div>
      </div>`;
  }

  function renderTeamLead(params) {
    const c = flowCopy.teamLead;
    const presetVersion = params.version || '';
    const presetSeat = params.seat || '';
    return `
      <div class="flow-card wide">
        <div class="flow-kicker" data-edit="flow.team.kicker">${c.kicker}</div>
        <h1 data-edit="flow.team.title">${c.title}</h1>
        <p class="flow-lead" data-edit="flow.team.lead">${c.lead}</p>
        <form class="flow-form" id="team-lead-form" novalidate>
          <div class="flow-field-grid">
            <div class="flow-field"><label data-edit="flow.team.name">${c.fields.name}<span class="req">*</span></label><input name="name" required autocomplete="name"></div>
            <div class="flow-field"><label data-edit="flow.team.phone">${c.fields.phone}<span class="req">*</span></label><input name="phone" required inputmode="tel" autocomplete="tel"></div>
          </div>
          <div class="flow-field"><label data-edit="flow.team.company">${c.fields.company}<span class="req">*</span></label><input name="company" required autocomplete="organization"></div>
          <div class="flow-field-grid">
            <div class="flow-field">
              <label data-edit="flow.team.size">${c.fields.size}<span class="req">*</span></label>
              <select name="size" required>
                <option value="">请选择</option>
                ${c.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div class="flow-field">
              <label data-edit="flow.team.intentVersion">${c.fields.intentVersion}<span class="req">*</span></label>
              <select name="intentVersion" required>
                <option value="">请选择</option>
                ${c.versions.map(s => `<option value="${s}" ${presetVersion === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="flow-field-grid">
            <div class="flow-field"><label data-edit="flow.team.seats">${c.fields.seats}<span class="req">*</span></label><input name="seats" required inputmode="numeric" placeholder="例如 10"></div>
            <div class="flow-field">
              <label>${c.fields.intentSeat} <span style="color:var(--text-60)">(${c.optional})</span></label>
              <select name="intentSeat">
                <option value="">请选择</option>
                ${c.seatOptions.map(s => `<option value="${s}" ${presetSeat === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="flow-field-grid">
            <div class="flow-field"><label>${c.fields.email} <span style="color:var(--text-60)">(${c.optional})</span></label><input name="email" type="email" autocomplete="email"></div>
            <div class="flow-field"><label>${c.fields.purchaseTime} <span style="color:var(--text-60)">(${c.optional})</span></label><input name="purchaseTime" placeholder="例如 本季度"></div>
          </div>
          <div class="flow-field"><label>${c.fields.invoice} <span style="color:var(--text-60)">(${c.optional})</span></label><input name="invoice"></div>
          <div class="flow-field"><label>${c.fields.scene} <span style="color:var(--text-60)">(${c.optional})</span></label><textarea name="scene"></textarea></div>
          <div class="flow-form-msg" id="team-lead-msg" aria-live="polite"></div>
          <div class="flow-actions">
            <button type="submit" class="flow-btn" data-edit="flow.team.submit">${c.submit}</button>
            ${backLink()}
          </div>
        </form>
      </div>`;
  }

  function renderBlocked() {
    return `
      <div class="flow-card">
        <h1 data-edit="flow.blocked.title">${flowCopy.blocked.title}</h1>
        <p class="flow-lead" data-edit="flow.blocked.body">${flowCopy.blocked.body}</p>
        <div class="flow-actions">${backLink()}</div>
      </div>`;
  }

  function renderFlow(route, params) {
    const host = document.getElementById('flow-root');
    if (!host) return;
    let html = '';
    if (route === 'checkout') html = renderCheckout();
    else if (route === 'paying') html = renderStatus('paying');
    else if (route === 'provisioning') html = renderStatus('provisioning');
    else if (route === 'success') html = renderSuccess(params);
    else if (route === 'upgrade') html = renderUpgrade();
    else if (route === 'team-lead') html = renderTeamLead(params);
    else if (route === 'blocked') html = renderBlocked();
    else html = renderBlocked();

    host.innerHTML = `<section class="flow-page container">${html}</section>`;
    applyOverridesToDom();
    enableEditingIfNeeded();

    if (route === 'paying') {
      demo.timers.push(setTimeout(() => navigate('provisioning'), 1200));
    } else if (route === 'provisioning') {
      demo.timers.push(setTimeout(() => navigate('success', { type: demo.successKind }), 900));
    }

    const form = host.querySelector('#team-lead-form');
    if (form) {
      form.addEventListener('submit', onTeamLeadSubmit);
    }
  }

  function onTeamLeadSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById('team-lead-msg');
    const btn = form.querySelector('[type="submit"]');
    const c = flowCopy.teamLead;

    if (!form.checkValidity()) {
      form.reportValidity();
      if (msg) { msg.textContent = c.fail; msg.className = 'flow-form-msg err'; }
      return;
    }

    btn.disabled = true;
    btn.textContent = c.submitting;
    if (msg) { msg.textContent = ''; msg.className = 'flow-form-msg'; }

    // Demo: 90% success
    demo.timers.push(setTimeout(() => {
      const ok = Math.random() > 0.1;
      if (ok) {
        if (msg) { msg.textContent = c.ok; msg.className = 'flow-form-msg ok'; }
        btn.textContent = c.submit;
        btn.disabled = false;
      } else {
        if (msg) { msg.textContent = c.fail; msg.className = 'flow-form-msg err'; }
        btn.textContent = c.submit;
        btn.disabled = false;
      }
    }, 800));
  }

  /* ---------- CTA wiring from pricing cards ---------- */
  function startBuy(plan) {
    const tier = plan === 'basic' ? state.basicTier : state.proTier;
    const action = resolveAction(plan, tier);
    if (action.type === 'blocked') {
      demo.order = { kind: 'blocked' };
      navigate('blocked');
      return;
    }
    if (action.type === 'upgrade') {
      demo.order = buildOrder({ plan, tier, billing: state.billing, kind: 'upgrade' });
      demo.successKind = 'upgrade';
      navigate('upgrade');
      return;
    }
    const kind = action.type === 'renew' ? 'renew' : 'buy';
    demo.order = buildOrder({ plan, tier, billing: state.billing, kind });
    demo.successKind = kind === 'renew' ? 'renew' : 'new';
    navigate('checkout');
  }

  function startTeamLead(seatId) {
    let version = '团队版';
    let seat = '基础席位';
    if (seatId?.startsWith('enterprise')) version = '企业版';
    if (seatId?.includes('pro')) seat = '专业席位';
    navigate('team-lead', { version, seat });
  }

  function patchPlanButtons() {
    // After renderPlans, rewrite CTA labels + actions
    if (state.audience === 'team') {
      document.querySelectorAll('[data-contact-sales]').forEach(btn => {
        btn.setAttribute('data-flow-team', btn.dataset.contactSales);
      });
      return;
    }
    ['basic', 'pro'].forEach(plan => {
      const card = document.querySelector(`[data-plan-card="${plan}"]`);
      if (!card) return;
      const btn = card.querySelector('.plan-button');
      if (!btn) return;
      const tier = plan === 'basic' ? state.basicTier : state.proTier;
      const action = resolveAction(plan, tier);
      btn.textContent = action.label;
      btn.dataset.flowBuy = plan;
      btn.dataset.flowAction = action.type;
    });
  }

  // Hook into app render
  const _renderPlans = window.renderPlans || null;
  const origRenderAll = typeof renderAll === 'function' ? renderAll : null;

  function afterPricingRender() {
    patchPlanButtons();
    applyOverridesToDom();
    enableEditingIfNeeded();
    saveStorage();
  }

  /* ---------- edit mode ---------- */
  function setEditing(on) {
    demo.editing = !!on;
    document.body.classList.toggle('editing', demo.editing);
    const toggle = document.getElementById('btn-edit-toggle');
    if (toggle) toggle.classList.toggle('on', demo.editing);
    enableEditingIfNeeded();
    saveStorage();
  }

  function enableEditingIfNeeded() {
    const on = demo.editing;
    document.querySelectorAll('[data-edit]').forEach(el => {
      if (on) {
        if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && el.tagName !== 'SELECT' && el.tagName !== 'BUTTON') {
          el.setAttribute('contenteditable', 'true');
        }
      } else {
        el.removeAttribute('contenteditable');
      }
    });
    // Also mark common pricing i18n nodes when editing
    if (on) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        if (!el.hasAttribute('data-edit')) {
          el.setAttribute('data-edit', el.dataset.i18n);
          el.setAttribute('contenteditable', 'true');
        }
      });
      document.querySelectorAll('.plan-desc, .benefit-label, .capacity-title, .capacity-sub, .plan-list li span, .faq-list summary span, .faq-list details p, .biz-module-head h2, .biz-module-head p').forEach((el, idx) => {
        if (!el.hasAttribute('data-edit')) {
          const key = el.getAttribute('data-edit-auto') || `auto.${el.className || 'node'}.${idx}`;
          el.setAttribute('data-edit', key);
          el.setAttribute('contenteditable', 'true');
        }
      });
    }
  }

  function exportJson() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      membershipId: demo.membershipId,
      billing: state.billing,
      basicTier: state.basicTier,
      proTier: state.proTier,
      copyOverrides: demo.copyOverrides,
      tiers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'd5-pricing-demo-copy.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importJsonText(text) {
    const data = JSON.parse(text);
    if (data.copyOverrides) demo.copyOverrides = data.copyOverrides;
    if (data.membershipId) demo.membershipId = data.membershipId;
    if (typeof data.basicTier === 'number') state.basicTier = data.basicTier;
    if (typeof data.proTier === 'number') state.proTier = data.proTier;
    if (data.billing) state.billing = data.billing;
    if (Array.isArray(data.tiers) && data.tiers.length === 3) {
      data.tiers.forEach((t, i) => Object.assign(tiers[i], t));
    }
    saveStorage();
    if (typeof window.renderAll === 'function') window.renderAll();
    afterPricingRender();
    syncToolbar();
    applyOverridesToDom();
  }

  function resetDemo() {
    demo.copyOverrides = {};
    demo.membershipId = 'community';
    demo.editing = false;
    state.basicTier = 1;
    state.proTier = 1;
    state.billing = 'monthly';
    localStorage.removeItem(STORAGE_KEY);
    document.body.classList.remove('editing');
    if (typeof window.renderAll === 'function') window.renderAll();
    afterPricingRender();
    syncToolbar();
    navigate('pricing');
  }

  function syncToolbar() {
    const sel = document.getElementById('demo-membership');
    if (sel) sel.value = demo.membershipId;
    const toggle = document.getElementById('btn-edit-toggle');
    if (toggle) toggle.classList.toggle('on', demo.editing);
    document.body.classList.toggle('editing', demo.editing);
  }

  function buildToolbar() {
    const bar = document.getElementById('demo-toolbar');
    if (!bar) return;
    bar.innerHTML = `
      <div class="demo-toolbar-inner">
        <div class="tb-group">
          <span class="tb-label">演示会员</span>
          <select class="tb-select" id="demo-membership" aria-label="当前会员状态">
            ${MEMBERSHIPS.map(m => `<option value="${m.id}">${m.label}</option>`).join('')}
          </select>
        </div>
        <div class="tb-group">
          <button type="button" class="tb-btn" id="btn-edit-toggle">编辑模式</button>
          <button type="button" class="tb-btn" id="btn-export">导出 JSON</button>
          <button type="button" class="tb-btn" id="btn-import">导入 JSON</button>
          <button type="button" class="tb-btn" id="btn-json-panel">价格 / JSON 面板</button>
          <button type="button" class="tb-btn warn" id="btn-reset">重置</button>
        </div>
        <span class="tb-hint">路由：#pricing · #checkout · #upgrade · #team-lead · #success … · 本地自动保存</span>
      </div>
      <div class="edit-json-panel" id="edit-json-panel">
        <div class="wrap">
          <label for="edit-json-text">复制覆盖 + tiers（可改价格数字后点「应用」）</label>
          <textarea id="edit-json-text" spellcheck="false"></textarea>
          <div class="edit-json-actions">
            <button type="button" class="tb-btn on" id="btn-apply-json">应用</button>
            <button type="button" class="tb-btn" id="btn-refresh-json">刷新面板内容</button>
            <span class="edit-json-msg" id="edit-json-msg"></span>
          </div>
        </div>
      </div>
      <input type="file" id="import-file" accept="application/json,.json" hidden>`;
  }

  function refreshJsonPanel() {
    const ta = document.getElementById('edit-json-text');
    if (!ta) return;
    ta.value = JSON.stringify({
      copyOverrides: demo.copyOverrides,
      tiers,
      membershipId: demo.membershipId,
      basicTier: state.basicTier,
      proTier: state.proTier,
      billing: state.billing,
    }, null, 2);
  }

  function bindToolbar() {
    document.getElementById('demo-membership')?.addEventListener('change', e => {
      demo.membershipId = e.target.value;
      saveStorage();
      if (typeof window.renderAll === 'function') window.renderAll();
      afterPricingRender();
    });
    document.getElementById('btn-edit-toggle')?.addEventListener('click', () => setEditing(!demo.editing));
    document.getElementById('btn-export')?.addEventListener('click', exportJson);
    document.getElementById('btn-import')?.addEventListener('click', () => document.getElementById('import-file')?.click());
    document.getElementById('import-file')?.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          importJsonText(String(reader.result));
          const msg = document.getElementById('edit-json-msg');
          if (msg) msg.textContent = '导入成功';
        } catch (err) {
          const msg = document.getElementById('edit-json-msg');
          if (msg) msg.textContent = '导入失败：' + err.message;
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
    document.getElementById('btn-reset')?.addEventListener('click', () => {
      if (confirm('重置本地文案覆盖与演示状态？')) resetDemo();
    });
    document.getElementById('btn-json-panel')?.addEventListener('click', () => {
      demo.editPanelOpen = !demo.editPanelOpen;
      const panel = document.getElementById('edit-json-panel');
      panel?.classList.toggle('open', demo.editPanelOpen);
      if (demo.editPanelOpen) refreshJsonPanel();
    });
    document.getElementById('btn-refresh-json')?.addEventListener('click', refreshJsonPanel);
    document.getElementById('btn-apply-json')?.addEventListener('click', () => {
      const ta = document.getElementById('edit-json-text');
      const msg = document.getElementById('edit-json-msg');
      try {
        importJsonText(ta.value);
        if (msg) msg.textContent = '已应用';
      } catch (err) {
        if (msg) msg.textContent = '应用失败：' + err.message;
      }
    });
  }

  function bindGlobal() {
    document.addEventListener('click', e => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        e.preventDefault();
        navigate(nav.dataset.nav);
        return;
      }
      const pay = e.target.closest('[data-action="confirm-pay"]');
      if (pay) {
        e.preventDefault();
        navigate('paying');
        return;
      }
      const up = e.target.closest('[data-action="confirm-upgrade"]');
      if (up) {
        e.preventDefault();
        demo.successKind = 'upgrade';
        navigate('paying');
        return;
      }
      const buy = e.target.closest('[data-flow-buy]');
      if (buy) {
        e.preventDefault();
        startBuy(buy.dataset.flowBuy);
        return;
      }
      const team = e.target.closest('[data-flow-team], [data-contact-sales]');
      if (team && demo.route === 'pricing') {
        e.preventDefault();
        e.stopPropagation();
        startTeamLead(team.dataset.flowTeam || team.dataset.contactSales);
        return;
      }
    }, true);

    document.addEventListener('focusout', e => {
      if (!demo.editing) return;
      const el = e.target.closest('[data-edit]');
      if (el) captureEdit(el);
    });

    document.addEventListener('input', e => {
      if (!demo.editing) return;
      const el = e.target.closest('[data-edit]');
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) captureEdit(el);
    });

    window.addEventListener('hashchange', () => {
      const { route, params } = parseHash();
      showRoute(route, params);
    });
  }

  function installHooks() {
    // app.js const functions already call D5Flows.afterPricingRender / patch via MutationObserver.
    // Re-expose wrappers so reset/import can safely call window.renderAll.
    if (typeof window.renderAll === 'function') {
      const origAll = window.renderAll;
      window.renderAll = function () {
        origAll.apply(this, arguments);
        afterPricingRender();
      };
    }
    if (typeof window.syncPaidCard === 'function') {
      const origSync = window.syncPaidCard;
      window.syncPaidCard = function (plan) {
        origSync.apply(this, arguments);
        patchPlanButtons();
      };
    }
  }

  // Expose for app.js / debug
  window.D5Flows = {
    navigate,
    startBuy,
    startTeamLead,
    resolveAction,
    patchPlanButtons,
    afterPricingRender,
    demo,
    MEMBERSHIPS,
  };

  function init() {
    buildToolbar();
    bindToolbar();
    bindGlobal();
    loadStorage();
    syncToolbar();
    installHooks();

    // Wrap renderPlans by intercepting after first paint — app.js uses const, so hook via MutationObserver-ish: patch after renderAll already called
    // Force re-patch: call afterPricingRender now
    afterPricingRender();

    // Intercept future renderPlans by wrapping selectTier's sync path — listen DOM changes on plan-grid
    const grid = document.getElementById('plan-grid');
    if (grid) {
      const mo = new MutationObserver(() => {
        patchPlanButtons();
        if (demo.editing) enableEditingIfNeeded();
      });
      mo.observe(grid, { childList: true, subtree: false });
    }

    const { route, params } = parseHash();
    showRoute(route, params);
    if (demo.editing) setEditing(true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // app.js already ran renderAll; init immediately after this script
    init();
  }
})();
