// Three-step plan finder. Uses independent personal tiers (小/中/大) and latest口径.
(() => {
  const selection = { goals: new Set([2, 3]), tier: 1, manualTier: false, offer: '2' };
  const root = document.querySelector('#plan-finder');
  const words = {
    zh: {
      title: '方案推荐', subtitle: '让创作走的更远',
      questions: ['你想完成哪类创作？', '你的创作频率大概是怎样？', '选择你心仪的方案'],
      goals: ['个人兴趣及探索', 'AI 图片与视频生成', '设计项目策划和汇报', '更高品质、更可控的 3D 渲染', '可漫游及互动的 3D 演示'],
      goalHints: ['尝试 AI 创作，探索灵感和不同表达', '生成图片、视频，进行多轮创意迭代', '辅助方案构思、视觉表达和项目汇报', '使用更多 D5 产品，完成更精细的渲染表达', '制作可漫游、可互动的空间演示'],
      usage: ['偶尔尝试', '稳定创作', '高频交付'], offers: ['首月优惠', '长期订阅更省', '充值补充积分'],
      offerHints: ['降低第一次购买的成本', '持续使用，关注长期成本', '按需充值；赠送比例与有效期随方案档位变化'],
      monthly: '按月', annual: '按年', perYear: '/年', equivalent: '折合', annualTotal: '年付总额', annualSaving: '较连续月付 12 个月节省', perMonth: '/月', credits: 'AI 积分',
      recommended: '推荐方案', why: '推荐理由',
      firstOffer: '首月优惠需确认购买资格；月付时页面展示首月价与后续常规月价。', firstOfferAnnual: '首月优惠适用于符合资格的月付购买，当前展示年付价格；年购积分按月发放。',
      basicReason: '适合日常创作：按小 / 中 / 大选积分、并发与输出规格。增强、放大功能消耗积分（渲染器侧增强基础版不支持）。',
      proReason: '解锁专业工作流。同档积分与基础版一致；增强、放大：渲染器不消耗积分 · Arco 消耗积分。',
      topupNote: '充值不改变版本功能。基础版充值积分有效期 90 天（中 / 大额外赠送 10%）；专业版 180 天（小 10%、中 / 大 20%），以充值确认页为准。',
      choose: '选择', proChoose: '开始使用 D5 工作流', preview: '方案预览', previewNote: '购买通道尚未接入。你可以继续调整方案，当前不会创建订单或扣款。', close: '继续调整',
    },
    en: {
      title: 'Choose the right plan for you', subtitle: 'Take your creativity further',
      questions: ['What would you like to create?', 'How often do you create?', 'Choose your preferred plan'],
      goals: ['Personal exploration', 'AI image and video creation', 'Design planning and presentations', 'Higher-quality, more controllable 3D rendering', 'Walkthroughs and interactive 3D presentations'],
      goalHints: ['Explore inspiration and new creative styles', 'Generate images and videos and iterate on ideas', 'Develop concepts, visuals and project presentations', 'Use more D5 products for refined rendering', 'Create immersive, interactive spatial presentations'],
      usage: ['Explore occasionally', 'Create regularly', 'Deliver at high volume'], offers: ['First-month offer', 'Long-term savings', 'Top up credits'],
      offerHints: ['Lower the cost of your first purchase', 'Reduce costs over continued use', 'Top up as needed; bonus and validity follow plan tier'],
      monthly: 'Monthly', annual: 'Yearly', perYear: '/year', equivalent: 'Equivalent to', annualTotal: 'Annual total', annualSaving: 'Saved compared with 12 monthly payments', perMonth: '/mo', credits: 'AI credits',
      recommended: 'Recommended plan', why: 'Why we recommend it',
      firstOffer: 'First-month offers depend on eligibility. Monthly cards show first-month and ongoing prices.', firstOfferAnnual: 'First-month offers apply to eligible monthly purchases. Yearly pricing is shown; credits are issued monthly.',
      basicReason: 'Everyday creation: pick Small / Medium / Large for credits, concurrency and output. Enhance / upscale consumes credits (Render-side enhance unsupported on Basic).',
      proReason: 'Unlocks the pro workflow. Same credit tiers as Basic; enhance / upscale: Render free of credits · Arco metered.',
      topupNote: 'Top-ups do not change plan features. Basic top-up credits last 90 days (+10% on Medium/Large); Pro lasts 180 days (+10% Small, +20% Medium/Large). Confirmation page wins.',
      choose: 'Choose', proChoose: 'Start using D5 Workflow', preview: 'Plan preview', previewNote: 'Checkout is not connected yet. You can keep adjusting your plan; no order or charge will be created.', close: 'Keep exploring',
    },
  };
  const w = () => words[state.lang];
  const q = selector => root.querySelector(selector);
  const format = n => n.toLocaleString('en-US');
  const plan = () => [...selection.goals].some(i => i >= 3) ? 'pro' : 'basic';
  const asset = name => `assets/figma/${name}.svg`;

  window.writeFinderCopy = function writeFinderCopy(key, lang, val) {
    const tree = words[lang];
    if (!tree) return;
    const m = key.match(/^finder\.(questions|goals|goalHints|usage|offers|offerHints)\.(\d+)$/);
    if (m) {
      tree[m[1]][Number(m[2])] = val;
      return;
    }
    const simple = key.match(/^finder\.(title|subtitle|recommended|why|monthly|annual|choose|proChoose|preview|previewNote|close|basicReason|proReason|topupNote|firstOffer|firstOfferAnnual|credits|perMonth)$/);
    if (simple) tree[simple[1]] = val;
  };
  window.finderWords = words;

  function render() {
    const c = w();
    const titleEl = document.querySelector('#workflow-title');
    const subEl = document.querySelector('#workflow .section-head p');
    if (titleEl) { titleEl.textContent = c.title; titleEl.setAttribute('data-edit', 'finder.title'); }
    if (subEl) { subEl.textContent = c.subtitle; subEl.setAttribute('data-edit', 'finder.subtitle'); }
    root.innerHTML = `
      <div class="finder-steps">
        ${c.questions.map((question, step) => `<div class="finder-step"><fieldset>
          <legend><span class="step-number">0${step + 1}</span><span data-edit="finder.questions.${step}">${question}</span></legend>
          <div class="finder-options ${step === 0 ? 'goal-options' : ''}">
            ${step === 0 ? c.goals.map((label, i) => `<label class="finder-option goal-option" title="${c.goalHints[i]}">
              <input type="checkbox" name="creative-goal" value="${i}">
              <img class="goal-icon" src="${asset('goal-unchecked')}" alt=""><span data-edit="finder.goals.${i}">${label}</span>
            </label>`).join('') : step === 1 ? c.usage.map((label, i) => `<label class="finder-option usage-option">
              <input type="radio" name="finder-usage" value="${i}"><span><span data-edit="finder.usage.${i}">${label}</span><small>${format(tiers[i].credits)} ${c.credits}${c.perMonth}</small></span>
            </label>`).join('') : c.offers.map((label, i) => `<label class="finder-option offer-option" title="${c.offerHints[i]}">
              <input type="radio" name="finder-offer" value="${i}"><span data-edit="finder.offers.${i}">${label}</span>
            </label>`).join('')}
          </div>
        </fieldset>
          ${step < 2 ? `<div class="step-connector" aria-hidden="true"><img src="${asset(`step-line-${step + 1}`)}" alt=""></div>` : ''}
        </div>`).join('')}
      </div>
      <aside class="finder-result" aria-label="${c.recommended}">
        <div class="finder-result-box">
        <p class="finder-eyebrow" data-edit="finder.recommended">${c.recommended}</p>
        <div class="finder-billing"><span data-edit="finder.monthly">${c.monthly}</span><button class="toggle" type="button" data-finder-billing aria-pressed="false"><span></span></button><span class="finder-annual"><span data-edit="finder.annual">${c.annual}</span><b class="finder-discount" data-finder-discount></b></span></div>
        <div class="finder-result-content">
          <div class="finder-summary" aria-live="polite" aria-atomic="true"></div>
          <div class="credit-block">
            <div class="credit-wrap"><div class="credit-info"><span class="finder-star"><img src="${asset('recommend-star')}" alt=""></span><strong data-finder-credits></strong><span>${c.perMonth}</span></div></div>
            <div class="plan-slider finder-slider">
              <span class="slider-fill" aria-hidden="true"></span><span class="finder-ticks" aria-hidden="true"><img src="${asset('recommend-ticks')}" alt=""></span><span class="slider-handle" aria-hidden="true"></span><span class="slider-label" aria-hidden="true"></span>
              <input type="range" min="0" max="2" step="1" aria-label="${P().sliderLabel}">
            </div>
          </div>
          <div class="finder-explanation"></div>
          <button class="plan-button finder-choose" type="button" data-edit="finder.choose"></button>
        </div>
        </div>
      </aside>
      <dialog class="finder-dialog" aria-labelledby="finder-dialog-title"><h3 id="finder-dialog-title" data-edit="finder.preview">${c.preview}</h3><p data-preview-summary></p><p data-edit="finder.previewNote">${c.previewNote}</p><form method="dialog"><button class="plan-button" data-edit="finder.close">${c.close}</button></form></dialog>`;
    sync();
    if (window.D5Flows?.demo?.editing) {
      // Re-enable editing after finder re-render
      try { window.D5Flows.afterPricingRender(); } catch (_) {}
    }
  }

  function sync() {
    const c = w(), id = plan(), pro = id === 'pro', tier = tiers[selection.tier];
    root.querySelectorAll('[name="creative-goal"]').forEach(input => {
      input.checked = selection.goals.has(Number(input.value));
      input.nextElementSibling.src = asset(input.checked ? 'goal-checked' : 'goal-unchecked');
    });
    root.querySelectorAll('[name="finder-usage"]').forEach(input => { input.checked = Number(input.value) === selection.tier; });
    root.querySelectorAll('[name="finder-offer"]').forEach(input => { input.checked = input.value === selection.offer; });
    const annual = state.billing === 'annual';
    const amount = annual ? tier[`${id}Annual`] : tier[id];
    const period = annual ? c.perYear : c.perMonth;
    const annualAmount = tier[`${id}Annual`];
    const monthlyEquivalent = format(Number((annualAmount / 12).toFixed(2)));
    const annualSaving = format(tier[id] * 12 - annualAmount);
    const discount = Math.round((1 - annualAmount / (tier[id] * 12)) * 100);
    q('[data-finder-discount]').textContent = state.lang === 'zh' ? `省 ${discount}%` : `Save ${discount}%`;
    const annualOffer = `${c.annualTotal} ￥${format(annualAmount)}${c.perYear} · ${c.equivalent} ￥${monthlyEquivalent}${c.perMonth} · ${c.annualSaving} ￥${annualSaving}`;
    const toggle = q('[data-finder-billing]');
    toggle.setAttribute('aria-pressed', String(annual));
    toggle.setAttribute('aria-label', t(annual ? 'billing.toMonthly' : 'billing.toAnnual'));
    const name = `${P()[id].name} · ${P().tierNames[selection.tier]}`;
    const firstHint = !annual
      ? `<p class="finder-hint">${state.lang === 'zh' ? `首月￥${tier[`${id}First`]}，后续￥${format(tier[id])}${c.perMonth}` : `First month ￥${tier[`${id}First`]}, then ￥${format(tier[id])}${c.perMonth}`}</p>`
      : `<p class="finder-hint">${c.equivalent} ￥${monthlyEquivalent}${c.perMonth} · ${state.lang === 'zh' ? '积分按月发放' : 'Credits issued monthly'}</p>`;
    q('.finder-summary').innerHTML = `<h3>${name}</h3><div class="plan-price"><span class="price-value">￥${format(amount)}</span><span class="price-period">${period}</span></div>${firstHint}`;
    q('[data-finder-credits]').textContent = `${format(tier.credits)} ${c.credits}`;
    q('.finder-slider').style.setProperty('--progress', tierProgress[selection.tier]);
    q('.slider-label').textContent = P().tierNames[selection.tier];
    const slider = q('input[type="range"]');
    slider.value = selection.tier;
    slider.setAttribute('aria-valuetext', `${P().tierNames[selection.tier]}, ${format(tier.credits)} ${c.credits}${c.perMonth}`);
    const offer = selection.offer === '0' ? (annual ? c.firstOfferAnnual : c.firstOffer) : selection.offer === '1' ? annualOffer : c.topupNote;
    q('.finder-explanation').innerHTML = `<div><h4>${c.why}</h4><p>${pro ? c.proReason : c.basicReason}</p></div>
      <div class="finder-offer-note"><h4>${c.offers[Number(selection.offer)]}</h4><p>${offer}</p></div>`;
    q('.finder-choose').textContent = pro ? c.proChoose : `${c.choose} ${name}`;
    q('[data-preview-summary]').textContent = `${name} · ￥${format(amount)}${period} · ${format(tier.credits)} ${c.credits}${c.perMonth}`;
  }

  root.addEventListener('change', event => {
    const input = event.target;
    if (input.name === 'creative-goal') {
      const goal = Number(input.value);
      if (input.checked) selection.goals.add(goal);
      else if (selection.goals.size > 1) selection.goals.delete(goal);
      if (!selection.manualTier) {
        const mapped = [...selection.goals].filter(i => i < 3);
        selection.tier = mapped.length ? Math.min(2, Math.max(0, ...mapped)) : 1;
      }
    } else if (input.name === 'finder-usage') {
      selection.tier = Number(input.value); selection.manualTier = true;
    } else if (input.name === 'finder-offer') {
      selection.offer = input.value;
      if (selection.offer !== '2') {
        state.billing = selection.offer === '1' ? 'annual' : 'monthly';
        syncTier();
        syncBillingToggle();
      }
    }
    else return;
    sync();
  });
  let pointerDrag = null;
  function setPointerTier(slider, x) {
    const bounds = slider.getBoundingClientRect();
    const ratio = (x - bounds.left) / bounds.width;
    selection.tier = Math.max(0, Math.min(2, Math.round((ratio - 1 / 3) / (1 / 3))));
    selection.manualTier = true;
    sync();
  }
  root.addEventListener('pointerdown', event => {
    const slider = event.target.closest('.finder-slider');
    if (!slider || pointerDrag || event.button !== 0 || event.isPrimary === false) return;
    event.preventDefault();
    slider.setPointerCapture(event.pointerId);
    pointerDrag = { slider, id: event.pointerId };
    slider.querySelector('input').focus({ preventScroll: true });
    setPointerTier(slider, event.clientX);
  });
  root.addEventListener('pointermove', event => {
    if (pointerDrag?.id === event.pointerId) setPointerTier(pointerDrag.slider, event.clientX);
  });
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    root.addEventListener(name, event => {
      if (pointerDrag?.id !== event.pointerId) return;
      const { slider, id } = pointerDrag;
      pointerDrag = null;
      if (slider.hasPointerCapture(id)) slider.releasePointerCapture(id);
    });
  }
  root.addEventListener('input', event => {
    if (event.target.type !== 'range') return;
    selection.tier = Number(event.target.value); selection.manualTier = true; sync();
  });
  root.addEventListener('click', event => {
    if (event.target.closest('[data-finder-billing]')) {
      state.billing = state.billing === 'annual' ? 'monthly' : 'annual';
      syncTier();
      syncBillingToggle();
      sync();
    }
    if (event.target.closest('.finder-choose')) q('dialog').showModal();
  });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-lang]')) render();
    else if (event.target.closest('[data-billing-toggle]')) sync();
  });
  render();
})();
