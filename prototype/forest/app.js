// ============================================================
// 归因林 · Attribution Grove
// 三段式低负担归因：感觉 → 触发 → 缓解
// 跨发作层：累积为「归因树」，长出个人模式
// ============================================================

const $ = (id) => document.getElementById(id);
const STORE_KEY = 'grove_records_v1';

// ---------- 状态 ----------
let records = loadRecords();
let draft = null;       // 当前录入草稿
let step = 1;           // 1 感觉 / 2 触发 / 3 缓解
let zoom = 1;
let svgWidth = 0;       // 当前归因树的原始宽度

function loadRecords() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length) return arr;
    }
  } catch (_) {}
  return seedRecords();
}
function saveRecords() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(records)); } catch (_) {}
}

// ---------- 工具 ----------
function uid() {
  return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function pad2(n) { return String(n).padStart(2, '0'); }
function fmtTime(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function fmtShort(ts) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- 视图切换 ----------
document.querySelectorAll('.tab').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('active', x === b));
    const v = b.dataset.view;
    $('viewRecord').hidden = v !== 'record';
    $('viewGrove').hidden = v !== 'grove';
    $('viewPattern').hidden = v !== 'pattern';
    if (v === 'grove') renderGrove();
    if (v === 'pattern') renderPatterns();
    window.scrollTo(0, 0);
  });
});

// ---------- 录入：三段式 ----------
$('startBtn').addEventListener('click', () => {
  draft = {
    id: uid(),
    ts: Date.now(),
    area: '', symptoms: [], emotions: [], severity: 'medium',
    env: [], mood: [], copings: [], relief: 'pending', note: '',
  };
  step = 1;
  openDrawer();
});

function openDrawer() {
  $('drawerMask').hidden = false;
  renderStep();
  updateStepsBar();
}
function closeDrawer() {
  $('drawerMask').hidden = true;
  draft = null;
}

function updateStepsBar() {
  document.querySelectorAll('.step').forEach((s) => {
    const n = +s.dataset.s;
    s.classList.toggle('active', n === step);
    s.classList.toggle('done', n < step);
  });
  document.querySelectorAll('.step-line').forEach((l, i) => {
    l.classList.toggle('done', i + 1 < step);
  });
  $('backBtn').hidden = step === 1;
  $('nextBtn').textContent = step === 3 ? '记下来' : '下一步';
}

function renderStep() {
  const body = $('drawerBody');
  if (step === 1) body.innerHTML = step1HTML();
  else if (step === 2) body.innerHTML = step2HTML();
  else body.innerHTML = step3HTML();
  wireStep();
}

// —— 通用 chip 组（多选）——
function chipGroup(field, list, cls, onPick, grid) {
  const wrap = document.createElement('div');
  wrap.className = 'chips' + (grid ? ' grid' : '');
  list.forEach((it) => {
    const b = document.createElement('button');
    b.className = 'chip' + (cls ? ' ' + cls : '') +
      (draft[field].includes(it.id) ? ' on' : '');
    b.innerHTML = `${esc(it.zh)}<span class="en">${esc(it.en)}</span>`;
    b.addEventListener('click', () => {
      const arr = draft[field];
      const i = arr.indexOf(it.id);
      if (i >= 0) arr.splice(i, 1); else arr.push(it.id);
      b.classList.toggle('on');
      if (onPick) onPick();
    });
    wrap.appendChild(b);
  });
  return wrap;
}

// —— 通用 chip 组（单选）——
function chipRadio(field, list, cls, onPick, grid) {
  const wrap = document.createElement('div');
  wrap.className = 'chips' + (grid ? ' grid' : '');
  list.forEach((it) => {
    const b = document.createElement('button');
    b.className = 'chip' + (cls ? ' ' + cls : '') +
      (draft[field] === it.id ? ' on' : '');
    b.innerHTML = `${esc(it.zh)}<span class="en">${esc(it.en)}</span>`;
    b.addEventListener('click', () => {
      draft[field] = it.id;
      wrap.querySelectorAll('.chip').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      if (onPick) onPick();
    });
    wrap.appendChild(b);
  });
  return wrap;
}

// —— 自定义标签 ——
function customAdd(field, cls, onAdd) {
  const wrap = document.createElement('div');
  wrap.className = 'chip-wrap';
  const inp = document.createElement('input');
  inp.className = 'chip-in';
  inp.placeholder = '自己写一个…';
  inp.maxLength = 12;
  const btn = document.createElement('button');
  btn.className = 'chip-add';
  btn.textContent = '+ 自定义';
  const commit = () => {
    const v = inp.value.trim();
    if (!v) return;
    const id = 'custom:' + v;
    if (!draft[field].includes(id)) {
      draft[field].push(id);
      const b = document.createElement('button');
      b.className = 'chip on' + (cls ? ' ' + cls : '');
      b.innerHTML = `${esc(v)}<span class="en">custom</span>`;
      b.addEventListener('click', () => {
        const i = draft[field].indexOf(id);
        if (i >= 0) draft[field].splice(i, 1);
        b.classList.toggle('on');
        if (onAdd) onAdd();
      });
      wrap.insertBefore(b, btn);
      if (onAdd) onAdd();
    }
    inp.value = '';
    inp.focus();
  };
  btn.addEventListener('click', commit);
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); commit(); } });
  wrap.append(inp, btn);
  return wrap;
}

// —— 第 1 步：感觉 ——
function step1HTML() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="q-head">现在感觉怎么样？</div>
    <div class="q-sub">先说身体哪儿不舒服，再说说是什么感觉。可以只选最贴近的。</div>
    <div class="q-block">
      <div class="q-label">身体部位 <span class="opt">必选</span></div>
      <div id="areaBox"></div>
    </div>
    <div class="q-block">
      <div class="q-label">是什么感觉 <span class="opt">可多选</span></div>
      <div id="symBox"></div>
    </div>
    <div class="q-block">
      <button class="fold-toggle" id="emoFold" type="button">
        <span class="arrow">›</span><span class="fold-txt">这次的情绪 · 选填</span>
      </button>
      <div class="fold-body" id="emoBody"></div>
    </div>
    <div class="q-block">
      <div class="q-label">有多难受 <span class="opt">必选</span></div>
      <div id="sevBox"></div>
    </div>
    <div class="q-block">
      <div class="q-label">什么时候开始</div>
      <div class="time-row" id="timeRow"></div>
    </div>`;
  return div.innerHTML;
}

// —— 第 2 步：触发 ——
function step2HTML() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="q-head">你觉得是什么引起的？</div>
    <div class="q-sub">凭直觉选就好，不用确定。选不出来也可以直接跳过——先记下来，之后再补。</div>
    <div class="q-block">
      <div class="q-label">环境因素 <span class="opt">可多选</span></div>
      <div id="envBox"></div>
    </div>
    <div class="q-block">
      <div class="q-label">心情因素 <span class="opt">可多选</span></div>
      <div id="moodBox"></div>
    </div>
    <div class="q-block">
      <div class="q-label">还想说点什么 <span class="opt">选填</span></div>
      <textarea class="note-in" id="noteIn" placeholder="比如：那天刚好赶上一个 deadline…"></textarea>
      <div class="hint">写多写少都可以。一句话也算。</div>
    </div>`;
  return div.innerHTML;
}

// —— 第 3 步：缓解 ——
function step3HTML() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="q-head">后来怎么好一些的？</div>
    <div class="q-sub">记下当时做了什么、有没有用。这些以后会变成你的「有效清单」。</div>
    <div class="q-block">
      <div class="q-label">做了什么 <span class="opt">可多选</span></div>
      <div id="copeBox"></div>
    </div>
    <div class="q-block">
      <div class="q-label">效果如何 <span class="opt">必选</span></div>
      <div id="reliefBox"></div>
    </div>
    <div class="q-block">
      <div class="q-label">回看这条记录</div>
      <div id="reviewBox"></div>
    </div>`;
  return div.innerHTML;
}

function wireStep() {
  if (step === 1) {
    $('areaBox').appendChild(chipRadio('area', ONTOLOGY.areas, '', updateNextEnabled, true));
    $('symBox').appendChild(chipGroup('symptoms', ONTOLOGY.symptoms, '', updateNextEnabled));
    // 情绪：默认折叠，降低初始选择负担
    const emoBody = $('emoBody');
    emoBody.appendChild(chipGroup('emotions', ONTOLOGY.emotions));
    const fold = $('emoFold');
    fold.addEventListener('click', () => {
      const open = emoBody.classList.toggle('show');
      fold.classList.toggle('open', open);
      fold.querySelector('.fold-txt').textContent = open ? '这次的情绪' : '这次的情绪 · 选填';
    });
    const sevBox = $('sevBox');
    const sw = document.createElement('div');
    sw.className = 'chips';
    SEVERITY.forEach((s) => {
      const b = document.createElement('button');
      b.className = 'chip' + (draft.severity === s.id ? ' on' : '');
      b.textContent = s.zh;
      b.addEventListener('click', () => {
        draft.severity = s.id;
        sw.querySelectorAll('.chip').forEach((x) => x.classList.remove('on'));
        b.classList.add('on');
      });
      sw.appendChild(b);
    });
    sevBox.appendChild(sw);

    // 时间
    const now = Date.now();
    const opts = [
      { label: '就是现在', ts: now },
      { label: '今天早些时候', ts: now - 3 * 3600e3 },
      { label: '今天早上', ts: now - 8 * 3600e3 },
      { label: '昨天', ts: now - 24 * 3600e3 },
      { label: '更早', ts: now - 72 * 3600e3 },
    ];
    const row = $('timeRow');
    opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'time-btn' + (i === 0 ? ' on' : '');
      b.textContent = o.label;
      b.addEventListener('click', () => {
        draft.ts = o.ts;
        row.querySelectorAll('.time-btn').forEach((x) => x.classList.remove('on'));
        b.classList.add('on');
      });
      row.appendChild(b);
    });
  } else if (step === 2) {
    $('envBox').appendChild(chipGroup('env', ONTOLOGY.env, 'env'));
    $('envBox').appendChild(customAdd('env', 'env'));
    $('moodBox').appendChild(chipGroup('mood', ONTOLOGY.mood, 'mood'));
    $('moodBox').appendChild(customAdd('mood', 'mood'));
    $('noteIn').value = draft.note || '';
    $('noteIn').addEventListener('input', (e) => { draft.note = e.target.value; });
  } else {
    $('copeBox').appendChild(chipGroup('copings', ONTOLOGY.copings, 'cope', refreshReview));
    $('copeBox').appendChild(customAdd('copings', 'cope', refreshReview));
    const rBox = $('reliefBox');
    const sw = document.createElement('div');
    sw.className = 'chips';
    RELIEF.forEach((r) => {
      const b = document.createElement('button');
      b.className = 'chip' + (draft.relief === r.id ? ' on' : '');
      b.innerHTML = `${esc(r.zh)}<span class="en">${esc(r.en)}</span>`;
      b.addEventListener('click', () => {
        draft.relief = r.id;
        sw.querySelectorAll('.chip').forEach((x) => x.classList.remove('on'));
        b.classList.add('on');
      });
      sw.appendChild(b);
    });
    rBox.appendChild(sw);

    refreshReview();
  }
  updateNextEnabled();
}

// —— 第 3 步的「回看」区，随选择实时刷新 ——
function refreshReview() {
  const rv = $('reviewBox');
  if (!rv) return;
  const sevZh = (SEVERITY.find((s) => s.id === draft.severity) || SEVERITY[1]).zh;
  const lines = [
    ['部位', zh(ONTOLOGY.areas, draft.area) || '—'],
    ['感觉', draft.symptoms.map((x) => zh(ONTOLOGY.symptoms, x)).join('、') || '—'],
    ['情绪', draft.emotions.map((x) => zh(ONTOLOGY.emotions, x)).join('、') || '—'],
    ['程度', sevZh],
    ['触发', [...draft.env.map((x) => zh(ONTOLOGY.env, x)),
               ...draft.mood.map((x) => zh(ONTOLOGY.mood, x))].join('、') || '未记录'],
    ['缓解', draft.copings.map((x) => zh(ONTOLOGY.copings, x)).join('、') || '未记录'],
  ];
  rv.innerHTML = lines.map(([k, v]) =>
    `<div class="review-line"><span class="rl-k">${k}</span><span class="rl-v">${esc(v)}</span></div>`
  ).join('');
}

function updateNextEnabled() {
  let ok = true;
  if (step === 1) ok = !!(draft.area && draft.symptoms.length);
  if (step === 3) ok = !!draft.relief;
  $('nextBtn').disabled = !ok;
}

$('backBtn').addEventListener('click', () => {
  if (step === 2) draft.note = $('noteIn') ? $('noteIn').value : draft.note;
  step -= 1;
  renderStep();
  updateStepsBar();
});

$('nextBtn').addEventListener('click', () => {
  if (step < 3) {
    step += 1;
    renderStep();
    updateStepsBar();
  } else {
    records.push(draft);
    saveRecords();
    closeDrawer();
    renderRecent();
    renderGrove();
    renderPatterns();
    showToast('记下了 🌱 你的归因林又长了一根枝条');
  }
});

$('drawerClose').addEventListener('click', closeDrawer);
$('drawerMask').addEventListener('click', (e) => { if (e.target.id === 'drawerMask') closeDrawer(); });

// ---------- 最近记录 ----------
function renderRecent() {
  const wrap = $('recentList');
  $('recCount').textContent = `${records.length} 条`;
  if (!records.length) {
    wrap.innerHTML = '<div class="empty">还没有记录。<br>感觉不舒服的时候，回来记一笔。</div>';
    return;
  }
  const sorted = [...records].sort((a, b) => b.ts - a.ts);
  wrap.innerHTML = sorted.slice(0, 12).map((r) => {
    const sev = SEVERITY.find((s) => s.id === r.severity);
    const sevCls = r.severity === 'light' ? 'sev-l' : r.severity === 'medium' ? 'sev-m' : 'sev-h';
    const tags = [];
    r.env.forEach((x) => tags.push(`<span class="tg env">${esc(zh(ONTOLOGY.env, x))}</span>`));
    r.mood.forEach((x) => tags.push(`<span class="tg mood">${esc(zh(ONTOLOGY.mood, x))}</span>`));
    r.copings.forEach((x) => tags.push(`<span class="tg cope">${esc(zh(ONTOLOGY.copings, x))}</span>`));
    return `<div class="rec">
      <div class="rec-time">${fmtShort(r.ts)}<br>${new Date(r.ts).getHours()}:${pad2(new Date(r.ts).getMinutes())}</div>
      <div class="rec-main">
        <div class="rec-line">${esc(zh(ONTOLOGY.areas, r.area))}<span class="sep">·</span>${esc(r.symptoms.map((x) => zh(ONTOLOGY.symptoms, x)).join('、'))}<span class="tg ${sevCls}" style="margin-left:7px">${sev.zh}</span></div>
        <div class="rec-tags">${tags.join('') || '<span class="tg">未记录归因</span>'}</div>
      </div>
    </div>`;
  }).join('');
}

// ---------- 树林（归因树） ----------
// 结构：身体部位 → 症状 → 每次发作（枝条）
// 每个症状节点下挂若干「枝条」（= 一次发作记录），枝条末端连出触发与缓解叶子。
function renderGrove() {
  const svg = $('groveSvg');
  if (!records.length) {
    svg.setAttribute('viewBox', '0 0 400 120');
    svg.setAttribute('width', 400);
    svg.innerHTML = `<text x="200" y="55" text-anchor="middle" font-size="13" fill="#8b9a91">还没有记录，树林还是空的</text>
      <text x="200" y="78" text-anchor="middle" font-size="12" fill="#a8b6ad">记一笔之后，树枝就会长出来</text>`;
    return;
  }

  // 聚合：部位 → 症状 → 记录
  const tree = {};
  records.forEach((r) => {
    const a = r.area || 'diffuse';
    tree[a] = tree[a] || {};
    const symKey = r.symptoms.join('+') || '未描述';
    tree[a][symKey] = tree[a][symKey] || { syms: r.symptoms, items: [] };
    tree[a][symKey].items.push(r);
  });

  const areaKeys = Object.keys(tree);
  // 列位（相对每棵树的水平偏移）——树自上而下堆叠
  const COL_SYM = 128;    // 症状
  const COL_REC = 296;    // 记录点（枝条末端）
  const COL_TRIG = 392;   // 触发标签
  const COL_COPE = 548;   // 缓解标签
  const TREE_W = 660;     // 单棵树宽度
  const CHIP_GAP = 22;    // 同一行内标签的垂直间距
  const PAD = 26;
  const parts = [];

  let y = PAD;
  const areaBlocks = [];

  areaKeys.forEach((aKey) => {
    const areaX = PAD;
    const symKeys = Object.keys(tree[aKey]);
    let cursorY = y + 34;
    const symNodes = [];
    const blockTop = y;

    symKeys.forEach((sKey) => {
      const g = tree[aKey][sKey];
      const items = g.items.sort((x1, x2) => x1.ts - x2.ts);
      const symX = areaX + COL_SYM;
      cursorY += 12;
      const symY = cursorY;

      // 症状节点
      symNodes.push({
        x: symX, y: symY,
        label: g.syms.length ? g.syms.map((s) => zh(ONTOLOGY.symptoms, s)).join('、') : '未描述',
        count: items.length, kind: 'sym',
        area: aKey,
      });

      // 每条记录 = 一根枝条，纵向排列；行高按该行标签数自适应
      const symLabel = g.syms.length ? g.syms.map((s) => zh(ONTOLOGY.symptoms, s)).join('、') : '未描述';
      const symShown = symLabel.length > 5 ? symLabel.slice(0, 5) + '…' : symLabel;
      const symW = Math.max(70, symShown.length * 13 + 34);
      items.forEach((r) => {
        const envs = r.env.map((e) => zh(ONTOLOGY.env, e));
        const moods = r.mood.map((e) => zh(ONTOLOGY.mood, e));
        const cops = r.copings.map((e) => zh(ONTOLOGY.copings, e));
        const nTrig = envs.length + moods.length;
        const rowH = Math.max(nTrig, cops.length, 1) * CHIP_GAP + 10;

        const brY = cursorY + rowH / 2;
        const recX = areaX + COL_REC;

        parts.push({ type: 'branch', x1: symX + symW, y1: symY, x2: recX - 8, y2: brY });
        // 触发叶子（环境 + 心情）
        envs.concat(moods).forEach((t, i) => {
          const isEnv = i < envs.length;
          parts.push({
            type: 'leaf', x: areaX + COL_TRIG, y: brY + (i - (nTrig - 1) / 2) * CHIP_GAP,
            label: t, kind: isEnv ? 'env' : 'mood', rec: r,
          });
        });
        // 缓解叶子
        cops.forEach((t, i) => {
          parts.push({
            type: 'leaf', x: areaX + COL_COPE, y: brY + (i - (cops.length - 1) / 2) * CHIP_GAP,
            label: t, kind: 'cope', rec: r,
          });
        });
        parts.push({ type: 'record', x: recX, y: brY, rec: r });

        cursorY += rowH;
      });
      cursorY += 18;
    });

    // 部位节点（主干，垂直居中于该树的症状群）
    const areaY = symNodes.length
      ? (symNodes[0].y + symNodes[symNodes.length - 1].y) / 2
      : blockTop + 24;
    parts.push({ type: 'area', x: areaX, y: areaY, label: zh(ONTOLOGY.areas, aKey),
      count: records.filter((r) => (r.area || 'diffuse') === aKey).length, area: aKey });
    symNodes.forEach((s) => {
      parts.push({ type: 'link', x1: areaX + 104, y1: areaY, x2: s.x, y2: s.y });
      parts.push(Object.assign({ type: 'sym' }, s));
    });

    // 树与树之间的分隔（地面线）
    areaBlocks.push({ top: blockTop, bottom: cursorY, areaY: areaY });
    y = cursorY + 30;
  });

  // 渲染
  const W = Math.max(680, TREE_W + PAD * 2), H = y + 10;
  svgWidth = W;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', W * zoom);
  svg.setAttribute('height', H * zoom);

  const COL = { body: '#3f6b4a', sym: '#c07a4e', env: '#4a8fa8', mood: '#a2724f', cope: '#7b6aa8' };

  let out = '';
  // 地面线（分隔每棵树）
  areaBlocks.forEach((b, i) => {
    if (i > 0) {
      out += `<path d="M${PAD - 8} ${b.top - 15} L${W - PAD + 8} ${b.top - 15}"
        fill="none" stroke="#e6ede6" stroke-width="1" stroke-dasharray="3 4"/>`;
    }
  });
  // 树干（每棵树一条竖线，从主干标签延伸到症状群）
  areaBlocks.forEach((b) => {
    const ay = b.areaY;
    if (ay === undefined) return;
    out += `<path d="M${PAD + 104} ${ay} L${PAD + 104} ${b.top + 18}"
      fill="none" stroke="#3f6b4a" stroke-width="2" stroke-linecap="round" opacity=".22"/>`;
  });
  // 连线
  parts.forEach((p) => {
    if (p.type === 'link') {
      const mx = (p.x1 + p.x2) / 2;
      out += `<path d="M${p.x1} ${p.y1} C${mx} ${p.y1} ${mx} ${p.y2} ${p.x2} ${p.y2}"
        fill="none" stroke="#c3d4c5" stroke-width="1.6"/>`;
    } else if (p.type === 'branch') {
      const mx = (p.x1 + p.x2) / 2;
      out += `<path d="M${p.x1} ${p.y1} C${mx} ${p.y1} ${mx} ${p.y2} ${p.x2} ${p.y2}"
        fill="none" stroke="#d6e3d7" stroke-width="1.3"/>`;
    }
  });

  // 叶子（触发 / 缓解）
  parts.forEach((p) => {
    if (p.type !== 'leaf') return;
    const c = COL[p.kind];
    const w = Math.max(52, p.label.length * 12 + 18);
    out += `<g class="node" data-kind="${p.kind}" data-rec="${p.rec.id}">
      <rect class="nbox" x="${p.x - 4}" y="${p.y - 11}" width="${w}" height="22" rx="11"
        fill="#fff" stroke="${c}" stroke-width="1.3"/>
      <text class="nlabel" x="${p.x + 10}" y="${p.y + 1}" fill="${c}">${esc(p.label)}</text>
    </g>`;
  });

  // 记录节点（枝条末端的小圆点 + 日期）
  parts.forEach((p) => {
    if (p.type !== 'record') return;
    const sev = p.rec.severity;
    const c = sev === 'light' ? '#9ec4a2' : sev === 'medium' ? '#e0a83c' : '#d1705f';
    out += `<g class="node" data-rec="${p.rec.id}" data-detail="1">
      <circle class="nbox" cx="${p.x}" cy="${p.y}" r="6" fill="${c}" stroke="#fff" stroke-width="2"/>
      <text class="nsub" x="${p.x + 12}" y="${p.y + 4}" fill="#8b9a91">${fmtShort(p.rec.ts)}</text>
    </g>`;
  });

  // 症状节点（标签过长时截断，完整名放 title）
  parts.forEach((p) => {
    if (p.type !== 'sym') return;
    const full = p.label;
    const shown = full.length > 5 ? full.slice(0, 5) + '…' : full;
    const w = Math.max(70, shown.length * 13 + 34);
    out += `<g class="node" data-sym="1" data-area="${p.area}" data-detail="1">
      <title>${esc(full)}</title>
      <rect class="nbox" x="${p.x}" y="${p.y - 15}" width="${w}" height="30" rx="9"
        fill="#fdf3ea" stroke="#c07a4e" stroke-width="1.5"/>
      <text class="nlabel" x="${p.x + 12}" y="${p.y + 1}" fill="#a05f37">${esc(shown)}</text>
      <text class="ncount" x="${p.x + w - 11}" y="${p.y + 1}" text-anchor="end" fill="#c07a4e">${p.count}</text>
    </g>`;
  });

  // 部位节点（主干）
  parts.forEach((p) => {
    if (p.type !== 'area') return;
    const w = Math.max(88, p.label.length * 14 + 30);
    out += `<g class="node" data-area="${p.area}" data-detail="1">
      <rect class="nbox" x="${p.x}" y="${p.y - 17}" width="${w}" height="34" rx="11"
        fill="#3f6b4a" stroke="#2f5638" stroke-width="1"/>
      <text class="nlabel" x="${p.x + 13}" y="${p.y - 2}" fill="#fff">${esc(p.label)}</text>
      <text class="nsub" x="${p.x + 13}" y="${p.y + 11}" fill="#b9d3bd">${p.count} 次</text>
    </g>`;
  });

  svg.innerHTML = out;

  svg.querySelectorAll('.node').forEach((g) => {
    g.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (g.dataset.rec) openRecord(g.dataset.rec);        // 叶子标签 / 记录点
      else if (g.dataset.sym) openArea(g.dataset.area);      // 症状节点 → 该部位的聚合
      else if (g.dataset.area) openArea(g.dataset.area);     // 部位主干
    });
  });
}

$('zoomIn').addEventListener('click', () => { zoom = Math.min(1.8, zoom * 1.15); renderGrove(); });
$('zoomOut').addEventListener('click', () => { zoom = Math.max(0.4, zoom / 1.15); renderGrove(); });
$('zoomFit').addEventListener('click', () => {
  // 适配：宽度铺满容器，高度按比例
  const box = document.querySelector('.grove-scroll');
  zoom = Math.max(0.5, Math.min(1.6, (box.clientWidth - 26) / (svgWidth || 680)));
  renderGrove();
});

// ---------- 详情 ----------
function openRecord(id) {
  const r = records.find((x) => x.id === id);
  if (!r) return;
  $('sheetTitle').textContent = `${zh(ONTOLOGY.areas, r.area)} · ${r.symptoms.map((s) => zh(ONTOLOGY.symptoms, s)).join('、')}`;
  const sev = SEVERITY.find((s) => s.id === r.severity);
  const sec = (k, arr, list, cls) => `
    <div class="sh-sec">
      <div class="sh-k">${k}</div>
      <div class="sh-tags">${arr.length
        ? arr.map((x) => `<span class="tg ${cls}">${esc(zh(list, x))}</span>`).join('')
        : '<span class="sh-empty">未记录</span>'}</div>
    </div>`;
  $('sheetBody').innerHTML = `
    <div class="sh-when">${fmtTime(r.ts)} · 程度 ${sev.zh} · 情绪 ${r.emotions.map((e) => zh(ONTOLOGY.emotions, e)).join('、') || '未记录'}</div>
    ${sec('环境触发', r.env, ONTOLOGY.env, 'env')}
    ${sec('心情触发', r.mood, ONTOLOGY.mood, 'mood')}
    ${sec('如何缓解', r.copings, ONTOLOGY.copings, 'cope')}
    ${r.note ? `<div class="sh-sec"><div class="sh-k">补充</div><div>${esc(r.note)}</div></div>` : ''}`;
  $('sheetMask').hidden = false;
}

function openArea(areaKey) {
  const list = records.filter((r) => (r.area || 'diffuse') === areaKey);
  $('sheetTitle').textContent = zh(ONTOLOGY.areas, areaKey);
  const counts = {};
  list.forEach((r) => {
    r.env.forEach((e) => { counts[e] = (counts[e] || 0) + 1; });
    r.mood.forEach((e) => { counts[e] = (counts[e] || 0) + 1; });
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  $('sheetBody').innerHTML = `
    <div class="sh-when">共 ${list.length} 次记录</div>
    <div class="sh-sec">
      <div class="sh-k">常见触发</div>
      <div class="sh-tags">${top.length
        ? top.map(([k, n]) => `<span class="tg env">${esc(zh(ONTOLOGY.env, k))} ×${n}</span>`).join('')
        : '<span class="sh-empty">还没有触发记录</span>'}</div>
    </div>
    <div class="sh-sec">
      <div class="sh-k">记录列表</div>
      ${list.sort((a, b) => b.ts - a.ts).map((r) => `
        <div style="padding:7px 0;border-bottom:1px dashed var(--line);font-size:13px">
          ${fmtShort(r.ts)} · ${esc(r.symptoms.map((s) => zh(ONTOLOGY.symptoms, s)).join('、'))}
          ${r.copings.length ? '<span class="tg cope">' + esc(r.copings.map((c) => zh(ONTOLOGY.copings, c)).join('、')) + '</span>' : ''}
        </div>`).join('')}
    </div>`;
  $('sheetMask').hidden = false;
}

$('sheetClose').addEventListener('click', () => { $('sheetMask').hidden = true; });
$('sheetMask').addEventListener('click', (e) => { if (e.target.id === 'sheetMask') $('sheetMask').hidden = true; });

// ---------- 规律（跨发作层） ----------
function renderPatterns() {
  const pb = $('patternBody');
  const rb = $('reliefBody');

  if (records.length < 2) {
    pb.innerHTML = '<div class="empty">至少记两条，才能看出规律。</div>';
    rb.innerHTML = '<div class="empty">—</div>';
    return;
  }

  // 触发 → 症状 关联
  const pair = {};
  records.forEach((r) => {
    const sym = r.symptoms.map((s) => zh(ONTOLOGY.symptoms, s)).join('、') || '未描述';
    const trig = [...r.env, ...r.mood];
    trig.forEach((t) => {
      const isEnv = r.env.includes(t);
      const k = t + '||' + sym;
      pair[k] = pair[k] || { t, sym, env: isEnv, n: 0 };
      pair[k].n++;
    });
  });
  const top = Object.values(pair).sort((a, b) => b.n - a.n).slice(0, 6);
  const maxN = top.length ? top[0].n : 1;

  pb.innerHTML = top.map((p) => `
    <div class="pat-group">
      <div class="pg-title">${esc(p.t)} → ${esc(p.sym)}</div>
      <div class="pg-sub">${p.env ? '环境因素' : '心情因素'}</div>
      <div class="pat-row">
        <div class="pr-bar"><div class="pr-fill" style="width:${(p.n / maxN) * 100}%;background:${p.env ? 'var(--env)' : 'var(--mood)'}"></div></div>
        <div class="pr-num">${p.n} 次</div>
      </div>
    </div>`).join('');

  // 缓解有效性
  const copeStat = {};
  records.forEach((r) => {
    r.copings.forEach((c) => {
      copeStat[c] = copeStat[c] || { n: 0, helped: 0 };
      copeStat[c].n++;
      if (r.relief === 'helped') copeStat[c].helped++;
    });
  });
  const cTop = Object.entries(copeStat)
    .sort((a, b) => (b[1].helped - a[1].n / 2) - (a[1].helped - a[1].n / 2))
    .slice(0, 6);
  const cMax = cTop.length ? Math.max.apply(null, cTop.map((x) => x[1].n)) : 1;

  rb.innerHTML = cTop.length ? cTop.map(([k, v]) => {
    const rate = v.n ? Math.round((v.helped / v.n) * 100) : 0;
    return `
    <div class="pat-group">
      <div class="pg-title">${esc(zh(ONTOLOGY.copings, k))}</div>
      <div class="pg-sub">用过 ${v.n} 次，其中 ${v.helped} 次有缓解</div>
      <div class="pat-row">
        <div class="pr-bar"><div class="pr-fill" style="width:${(v.n / cMax) * 100}%;background:var(--cope)"></div></div>
        <div class="pr-num">${rate}% 有效</div>
      </div>
    </div>`;
  }).join('') : '<div class="empty">还没有缓解记录。</div>';
}

// ---------- Toast ----------
function showToast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

// ---------- 演示数据 ----------
function seedRecords() {
  const now = Date.now();
  const H = 3600e3, D = 24 * H;
  const mk = (o) => Object.assign({
    id: uid(), ts: now, area: '', symptoms: [], emotions: [], severity: 'medium',
    env: [], mood: [], copings: [], relief: 'pending', note: '',
  }, o);
  return [
    mk({ ts: now - 2 * D - 5 * H, area: 'head', symptoms: ['brainfog', 'fatigue'], emotions: ['frustration'], severity: 'medium',
      env: ['sleepdep', 'screen'], mood: ['overwork'], copings: ['rest', 'screenbreak'], relief: 'helped' }),
    mk({ ts: now - 5 * D - 3 * H, area: 'waist', symptoms: ['stiffness'], emotions: ['irritable'], severity: 'light',
      env: ['sitting'], mood: ['stress'], copings: ['stretching', 'pacing'], relief: 'partial' }),
    mk({ ts: now - 8 * D - 9 * H, area: 'head', symptoms: ['dizziness'], emotions: ['anxiety'], severity: 'heavy',
      env: ['sleepdep'], mood: ['appreh'], copings: ['quiet', 'rest'], relief: 'partial',
      note: '前一晚几乎没睡，早上起来更明显。' }),
    mk({ ts: now - 12 * D - 2 * H, area: 'knee', symptoms: ['stiffness', 'swelling'], emotions: ['low'], severity: 'medium',
      env: ['weather', 'temp'], mood: [], copings: ['heat', 'pacing'], relief: 'helped' }),
    mk({ ts: now - 15 * D - 6 * H, area: 'head', symptoms: ['brainfog'], emotions: ['anxiety', 'loneliness'], severity: 'medium',
      env: ['screen'], mood: ['stress', 'recall'], copings: ['walk', 'journal'], relief: 'helped',
      note: '开会前一小时开始，后来出去走了一圈好一些。' }),
    mk({ ts: now - 19 * D - 4 * H, area: 'hand', symptoms: ['numbness'], emotions: ['fear'], severity: 'light',
      env: [], mood: ['stress'], copings: ['posture', 'stretching'], relief: 'helped' }),
    mk({ ts: now - 23 * D - 7 * H, area: 'diffuse', symptoms: ['fatigue'], emotions: ['low', 'numb'], severity: 'medium',
      env: ['sleepdep', 'exertion'], mood: ['overwork'], copings: ['sleep'], relief: 'helped' }),
    mk({ ts: now - 28 * D - 1 * H, area: 'head', symptoms: ['throbbing'], emotions: ['frustration'], severity: 'heavy',
      env: ['temp', 'weather'], mood: ['stress'], copings: ['medication', 'quiet'], relief: 'partial' }),
    mk({ ts: now - 33 * D - 5 * H, area: 'neck', symptoms: ['stiffness'], emotions: ['irritable'], severity: 'light',
      env: ['sitting', 'screen'], mood: ['overwork'], copings: ['stretching', 'posture'], relief: 'helped' }),
    mk({ ts: now - 40 * D - 8 * H, area: 'head', symptoms: ['brainfog', 'dizziness'], emotions: ['anxiety'], severity: 'medium',
      env: ['sleepdep'], mood: ['stress', 'visitanx'], copings: ['rest', 'breathing'], relief: 'partial',
      note: '复诊前一晚，睡不好。' }),
  ];
}

// ---------- 初始化 ----------
renderRecent();
renderGrove();
renderPatterns();
