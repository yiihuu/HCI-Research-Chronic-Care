// ============================================================
// 归因林 · Attribution Grove
// ------------------------------------------------------------
// 交互核心：在树林上直接生长。
//   · 点树干上的 ＋ → 长出一根新枝
//   · 枝头长出候选叶子（叶子就是选项）
//   · 点一片叶子 → 它被收拢到枝上，枝条继续往外长
//   · 已选的叶子留在枝上，没选的留成空芽（可随时补选）
//   · 多选 = 从同一个节上分出多根枝
// 跨发作层：同标签的叶子之间连一条淡线，规律自己浮出来。
// ============================================================

const $ = (id) => document.getElementById(id);
const STORE_KEY = 'grove_records_v2';

let records = loadRecords();
let pending = null;      // 正在生长的那根枝
let zoom = 1;
let svgW = 0;
let customBox = null;    // 自定义标签输入框 {stage, sub, x, y}
let lastPick = null;     // 刚点的叶子（播放生长动画）

// ---------- 布局常量 ----------
const L = {
  areaX: 10, areaH: 34,
  jointX: 150,          // 记录节点
  stage0X: 205,         // 第一个阶段节点
  stageGap: 150,
  leafOff: 42,          // 叶子列相对阶段节点的偏移
  leafGap: 24,
  nodeTop: 26,          // 节点上方留白
  rowPad: 10,
};

const CATC = {
  area: '#3f6b4a', symptom: '#c07a4e', env: '#3f8ba6',
  mood: '#9a6b4a', coping: '#7b6aa8', relief: '#4f7f52',
};

const STAGES = [
  { key: 'area',    q: '哪里不舒服？',      n: '部位' },
  { key: 'symptom', q: '是什么感觉？',      n: '感觉' },
  { key: 'trigger', q: '可能因为什么？',    n: '触发' },
  { key: 'coping',  q: '后来怎么缓解的？',  n: '缓解' },
  { key: 'relief',  q: '有缓解吗？',        n: '效果' },
];

// ============================================================
// 存储
// ============================================================
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

// ============================================================
// 工具
// ============================================================
function uid() { return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function pad2(n) { return String(n).padStart(2, '0'); }
function fmtTime(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function fmtShort(ts) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}
function fmtHM(ts) { const d = new Date(ts); return `${d.getHours()}:${pad2(d.getMinutes())}`; }
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
// 粗略估算文本宽度（CJK 按字号全宽）
function tw(s, fs) {
  fs = fs || 12;
  let w = 0;
  for (const ch of String(s)) w += /[\u2e80-\u9fff\uff00-\uffef]/.test(ch) ? fs : fs * 0.56;
  return w;
}
function trunc(s, n) { s = String(s); return s.length > n ? s.slice(0, n) + '…' : s; }
function seg(a, b, bow) {
  const mx = (a.x + b.x) / 2;
  return `M${a.x} ${a.y} Q${mx} ${(a.y + b.y) / 2 + bow} ${b.x} ${b.y}`;
}
function sevColor(s) { return s === 'light' ? '#9ec4a2' : s === 'heavy' ? '#d1705f' : '#e0a83c'; }

// ============================================================
// 选项表
// ============================================================
function customUsed(cat) {
  const set = new Set();
  if (cat === 'area' || cat === 'relief') return [];
  records.forEach((r) => {
    const arr = cat === 'symptom' ? r.symptoms
      : cat === 'trigger' ? [...r.env, ...r.mood]
        : cat === 'coping' ? r.copings : [];
    arr.forEach((x) => { if (typeof x === 'string' && x.indexOf('custom:') === 0) set.add(x); });
  });
  return [...set];
}
function stageOptions(key) {
  let base = [];
  if (key === 'area') base = ONTOLOGY.areas.map((o) => ({ ...o, cat: 'area' }));
  else if (key === 'symptom') base = ONTOLOGY.symptoms.map((o) => ({ ...o, cat: 'symptom' }));
  else if (key === 'trigger') base = ONTOLOGY.env.map((o) => ({ ...o, cat: 'env' }))
    .concat(ONTOLOGY.mood.map((o) => ({ ...o, cat: 'mood' })));
  else if (key === 'coping') base = ONTOLOGY.copings.map((o) => ({ ...o, cat: 'coping' }));
  else if (key === 'relief') base = RELIEF.map((o) => ({ ...o, cat: 'relief' }));
  const custom = customUsed(key).map((id) => ({
    id, zh: id.slice(7), en: 'custom', cat: key === 'trigger' ? 'env' : key,
  }));
  return base.concat(custom);
}
function freqMap(cat) {
  const f = {};
  records.forEach((r) => {
    let arr = [];
    if (cat === 'area') arr = [r.area];
    else if (cat === 'symptom') arr = r.symptoms;
    else if (cat === 'env') arr = r.env;
    else if (cat === 'mood') arr = r.mood;
    else if (cat === 'coping') arr = r.copings;
    arr.forEach((x) => { if (x) f[x] = (f[x] || 0) + 1; });
  });
  return f;
}
// 候选排序：自己身上出现过的排前面（低负担）
function orderedOptions(key) {
  const opts = stageOptions(key);
  if (key === 'trigger') {
    const fe = freqMap('env'), fm = freqMap('mood');
    const env = opts.filter((o) => o.cat === 'env').sort((a, b) => (fe[b.id] || 0) - (fe[a.id] || 0));
    const mood = opts.filter((o) => o.cat === 'mood').sort((a, b) => (fm[b.id] || 0) - (fm[a.id] || 0));
    return env.concat(mood);
  }
  const f = freqMap(key);
  return opts.slice().sort((a, b) => (f[b.id] || 0) - (f[a.id] || 0));
}
function findOption(stageKey, id, sub) {
  const list = stageOptions(stageKey);
  const hit = list.find((o) => o.id === id);
  if (hit) return hit;
  if (id && id.indexOf('custom:') === 0) {
    return { id, zh: id.slice(7), en: 'custom', cat: stageKey === 'trigger' ? (sub || 'env') : stageKey };
  }
  return { id, zh: id, en: id, cat: stageKey };
}

// ============================================================
// 生长状态机
// ============================================================
function startGrowth(areaId) {
  pending = {
    area: areaId || '',
    loose: !areaId,          // 从地面新芽长出来的：先不归到任何一棵树上
    chain: areaId ? ['symptom', 'trigger', 'coping', 'relief']
      : ['area', 'symptom', 'trigger', 'coping', 'relief'],
    stageKey: areaId ? 'symptom' : 'area',
    symptoms: [], env: [], mood: [], copings: [],
    relief: '', severity: 'medium', emotions: [],
    ts: Date.now(), note: '', timeOpt: 'now',
    picked: [], open: {}, expanded: {},
  };
  pending.open[pending.stageKey] = true;
  customBox = null;
  switchView('grove');
  renderAll();
  setTimeout(() => scrollToPending(), 60);
}
function cancelGrowth() {
  pending = null; customBox = null;
  renderAll();
}
function isPicked(stageKey, id) {
  return pending.picked.some((p) => p.stage === stageKey && p.id === id);
}
function pickOption(stageKey, id, sub) {
  const p = pending;
  if (!p) return;
  if (stageKey === 'area') {
    p.area = id;
    p.stageKey = p.chain[1];
    p.open[p.stageKey] = true;
  } else if (stageKey === 'symptom') {
    if (!p.symptoms.includes(id)) p.symptoms.push(id);
  } else if (stageKey === 'trigger') {
    const arr = sub === 'mood' ? p.mood : p.env;
    if (!arr.includes(id)) arr.push(id);
  } else if (stageKey === 'coping') {
    if (!p.copings.includes(id)) p.copings.push(id);
  } else if (stageKey === 'relief') {
    p.relief = id;
  }
  p.picked.push({ stage: stageKey, id, sub: sub || '' });
  lastPick = stageKey + '|' + id;
  // 只有点当前阶段的叶子才会让枝条继续往外长
  const i = p.chain.indexOf(stageKey);
  if (i >= 0 && i === p.chain.indexOf(p.stageKey)) {
    const nx = p.chain[i + 1];
    if (nx) { p.stageKey = nx; p.open[nx] = true; }
    else { commitPending(); return; }
  }
  renderAll();
  scrollToStage();
}
function skipStage(stageKey) {
  const p = pending;
  if (!p) return;
  if (stageKey === 'relief') { p.relief = 'pending'; commitPending(); return; }
  const i = p.chain.indexOf(stageKey);
  const nx = p.chain[i + 1];
  if (nx) { p.stageKey = nx; p.open[nx] = true; }
  renderAll();
  scrollToStage();
}
function commitPending() {
  const p = pending;
  if (!p) return;
  records.push({
    id: uid(), ts: p.ts, area: p.area,
    symptoms: p.symptoms.slice(), emotions: p.emotions.slice(),
    severity: p.severity,
    env: p.env.slice(), mood: p.mood.slice(),
    copings: p.copings.slice(), relief: p.relief, note: p.note,
  });
  saveRecords();
  pending = null; customBox = null;
  renderAll();
  showToast('记下了 🌱 你的归因林又长了一根枝条');
}

// ---------- 生长中的列内容 ----------
function pendingColumn(stage) {
  const items = [];
  pending.picked.filter((p) => p.stage === stage.key).forEach((p) => {
    const o = findOption(stage.key, p.id, p.sub);
    items.push({ id: o.id, zh: o.zh, en: o.en, cat: o.cat, picked: true });
  });
  if (!pending.open[stage.key]) return items;
  const all = orderedOptions(stage.key);
  const unpicked = all.filter((o) => !isPicked(stage.key, o.id));
  const expanded = !!pending.expanded[stage.key];
  const limit = expanded ? unpicked.length : Math.min(6, unpicked.length);
  unpicked.slice(0, limit).forEach((o) => {
    items.push({ id: o.id, zh: o.zh, en: o.en, cat: o.cat, ghost: true });
  });
  if (!expanded && unpicked.length > limit) {
    items.push({ special: 'more', zh: '更多…', ghost: true, cat: stage.key });
  }
  const has = pending.picked.some((p) => p.stage === stage.key);
  if (!has && (stage.key === 'trigger' || stage.key === 'coping' || stage.key === 'relief')) {
    items.push({ special: 'skip', zh: '先跳过', ghost: true, cat: stage.key });
  }
  if (stage.key !== 'relief') {
    items.push({ special: 'custom', zh: '＋ 自己写一个', ghost: true, cat: stage.key });
  }
  return items;
}
function pendingCols() {
  const stages = pending.chain.map((k) => {
    const s = STAGES.find((x) => x.key === k);
    return { ...s, x: L.stage0X + pending.chain.indexOf(k) * L.stageGap };
  });
  const cols = {};
  stages.forEach((s) => { cols[s.key] = { stage: s, x: s.x + L.leafOff, items: pendingColumn(s) }; });
  return { stages, cols };
}
function pendingBand() {
  const { cols } = pendingCols();
  let max = 1;
  Object.values(cols).forEach((c) => { if (c.items.length > max) max = c.items.length; });
  return L.nodeTop + max * L.leafGap + L.rowPad + 10;
}

// ============================================================
// 渲染：树林
// ============================================================
function renderGrove() {
  const svg = $('groveSvg');
  if (!svg) return;
  const links = [];    // 枝干
  const threads = [];  // 规律线
  const nodes = [];    // 可点元素

  let y = 26;

  // —— 按部位分组 ——
  const byArea = {};
  records.forEach((r) => {
    const k = r.area || 'diffuse';
    (byArea[k] = byArea[k] || []).push(r);
  });

  const blocks = [];
  Object.keys(byArea).forEach((k) => {
    const rows = byArea[k].sort((a, b) => a.ts - b.ts);
    const b = layoutBlock(k, rows, y, !!(pending && !pending.loose && pending.area === k));
    blocks.push(b);
    y = b.bottom + 24;
  });

  // —— 还没归属的待生长枝 ——
  let loose = null;
  if (pending && pending.loose) {
    loose = layoutLoosePending(y);
    y = loose.bottom;
  }

  // —— 渲染各块 ——
  blocks.forEach((b) => renderBlock(b, links, threads, nodes));
  if (loose) renderLoosePending(loose, links, nodes);

  // —— 地面 + 新芽 ——
  const groundY = y + 14;
  let W = 800;
  blocks.forEach((b) => { W = Math.max(W, 780); });
  if (loose) W = Math.max(W, loose.right);
  if (pending) W = Math.max(W, L.stage0X + pending.chain.length * L.stageGap + L.leafOff + 130);

  const H = groundY + 96;
  svgW = W;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', W * zoom);
  svg.setAttribute('height', H * zoom);

  let out = '';
  // 地面线
  out += `<path d="M0 ${groundY} L${W} ${groundY}" stroke="#dbe7dc" stroke-width="1.5" stroke-dasharray="2 6"/>`;
  // 规律线（跨发作）
  threads.forEach((t) => {
    out += `<path d="M${t.x} ${t.y1} L${t.x} ${t.y2}" stroke="${t.c}" stroke-width="1.4"
      stroke-dasharray="1 3" opacity=".38" fill="none"/>`;
    t.dots.forEach((d) => {
      out += `<circle cx="${t.x}" cy="${d}" r="2" fill="${t.c}" opacity=".45"/>`;
    });
  });
  // 枝干
  links.forEach((l) => {
    out += `<path d="${l.d}" class="${l.cls}" fill="none" stroke="${l.c || '#c3d4c5'}"
      stroke-width="${l.w || 1.4}" opacity="${l.o == null ? 1 : l.o}"
      stroke-dasharray="${l.dash || ''}" stroke-linecap="round"/>`;
  });
  // 节点
  nodes.forEach((n) => { out += n; });

  // —— 新芽（长一根新枝）——
  out += `<g class="node sprout" data-act="bud" data-area="">
    <path d="M44 ${groundY} C44 ${groundY - 14} 50 ${groundY - 20} 56 ${groundY - 22}"
      fill="none" stroke="#6b9c6e" stroke-width="2" stroke-linecap="round"/>
    <path d="M50 ${groundY - 18} C50 ${groundY - 24} 55 ${groundY - 28} 60 ${groundY - 28}
      C60 ${groundY - 22} 55 ${groundY - 18} 50 ${groundY - 18}z" fill="#a9cba6"/>
    <circle cx="44" cy="${groundY - 30}" r="11" fill="#fff" stroke="#3f6b4a" stroke-width="1.6"/>
    <path d="M40 ${groundY - 30} L48 ${groundY - 30} M44 ${groundY - 34} L44 ${groundY - 26}"
      stroke="#3f6b4a" stroke-width="1.8" stroke-linecap="round"/>
    <text class="nlabel" x="${64}" y="${groundY - 26}" fill="#3f6b4a">长一根新枝</text>
  </g>`;

  // —— 自定义标签输入 ——
  if (customBox) {
    const cb = customBox;
    out += `<foreignObject x="${cb.x}" y="${cb.y}" width="250" height="72">
      <div xmlns="http://www.w3.org/1999/xhtml" class="cf-wrap">
        ${cb.stage === 'trigger' ? `
          <div class="cf-sub">
            <span class="cf-sub-b ${cb.sub === 'env' ? 'on' : ''}" data-sub="env">环境</span>
            <span class="cf-sub-b ${cb.sub === 'mood' ? 'on' : ''}" data-sub="mood">心情</span>
          </div>` : ''}
        <input class="cf-in" id="cfInput" type="text" maxlength="12" placeholder="写一个标签，回车确认" />
      </div>
    </foreignObject>`;
  }

  svg.innerHTML = out;
  wireGrove();
}

// ---------- 布局 ----------
function rowBand(r) {
  const n = Math.max(r.symptoms.length, r.env.length + r.mood.length, r.copings.length, 1);
  return L.nodeTop + n * L.leafGap + L.rowPad;
}
function layoutBlock(areaKey, rows, top, withPending) {
  const items = [];
  let cursor = top;
  rows.forEach((r) => {
    const h = rowBand(r);
    items.push({ type: 'rec', r, y: cursor + L.nodeTop, h });
    cursor += h + L.rowPad;
  });
  if (withPending) {
    const h = pendingBand();
    items.push({ type: 'pending', y: cursor + L.nodeTop, h });
    cursor += h + L.rowPad;
  }
  const areaY = items.length ? (items[0].y + items[items.length - 1].y) / 2 : top + 20;
  return { areaKey, items, top, bottom: cursor, areaY };
}
function layoutLoosePending(top) {
  const h = pendingBand();
  return { y: top + L.nodeTop, h, bottom: top + h + L.rowPad, right: L.stage0X + pending.chain.length * L.stageGap + 200 };
}

// ---------- 渲染一个块 ----------
function renderBlock(b, links, threads, nodes) {
  const label = zh(ONTOLOGY.areas, b.areaKey);
  const pillW = Math.max(92, tw(label, 13) + 30);
  const pillRight = L.areaX + pillW;

  // 部位牌
  nodes.push(`<g class="node area-pill" data-act="area" data-area="${b.areaKey}">
    <rect class="nbox" x="${L.areaX}" y="${b.areaY - 17}" width="${pillW}" height="34" rx="11"
      fill="#3f6b4a" stroke="#2f5638" stroke-width="1"/>
    <text class="nlabel" x="${L.areaX + 13}" y="${b.areaY - 2}" fill="#fff">${esc(label)}</text>
    <text class="nsub" x="${L.areaX + 13}" y="${b.areaY + 12}" fill="#b9d3bd">${b.items.filter((i) => i.type === 'rec').length} 次</text>
  </g>`);
  // 长新枝的芽
  nodes.push(`<g class="node bud" data-act="bud" data-area="${b.areaKey}">
    <circle class="nbox" cx="${pillRight}" cy="${b.areaY - 15}" r="9" fill="#fff" stroke="#3f6b4a" stroke-width="1.6"/>
    <path d="M${pillRight - 4} ${b.areaY - 15} L${pillRight + 4} ${b.areaY - 15} M${pillRight} ${b.areaY - 19} L${pillRight} ${b.areaY - 11}"
      stroke="#3f6b4a" stroke-width="1.7" stroke-linecap="round"/>
  </g>`);

  // 收集每类叶子的位置，用于规律线
  const leafPos = { symptom: [], env: [], mood: [], coping: [] };

  b.items.forEach((it) => {
    if (it.type === 'rec') {
      // 部位 → 记录节点的枝
      links.push({ d: seg({ x: pillRight, y: b.areaY }, { x: L.jointX, y: it.y }, 6), c: '#c3d4c5', w: 1.6 });
      renderRecRow(it.r, it.y, links, nodes, leafPos);
    } else {
      links.push({
        d: seg({ x: pillRight, y: b.areaY }, { x: L.jointX, y: it.y }, 6),
        c: '#6b9c6e', w: 1.8, dash: '4 4', o: .75,
      });
      renderPendingRow(it.y, links, nodes);
    }
  });

  // 规律线：同标签的叶子连起来
  ['symptom', 'env', 'mood', 'coping'].forEach((cat) => {
    const groups = {};
    leafPos[cat].forEach((p) => { (groups[p.label] = groups[p.label] || []).push(p); });
    Object.keys(groups).forEach((k) => {
      const g = groups[k];
      if (g.length < 2) return;
      const ys = g.map((p) => p.y);
      threads.push({
        x: g[0].x - 11, y1: Math.min.apply(null, ys), y2: Math.max.apply(null, ys),
        c: CATC[cat], dots: ys,
      });
    });
  });
}

// ---------- 已长成的记录行 ----------
function renderRecRow(r, nodeY, links, nodes, leafPos) {
  const sev = sevColor(r.severity);
  const chain = [L.jointX, 205, 355, 505, 655].map((x) => ({ x, y: nodeY }));
  for (let i = 0; i < chain.length - 1; i++) {
    links.push({ d: seg(chain[i], chain[i + 1], i % 2 ? 6 : -6), c: '#d6e3d7', w: 1.3 });
  }
  // 记录节点
  nodes.push(`<g class="node rec-joint" data-act="detail" data-rec="${r.id}">
    <circle class="nbox" cx="${L.jointX}" cy="${nodeY}" r="6.5" fill="${sev}" stroke="#fff" stroke-width="2"/>
    <text class="nsub" x="${L.jointX}" y="${nodeY - 14}" text-anchor="middle" fill="#8b9a91">${fmtShort(r.ts)}</text>
  </g>`);

  // 阶段节点
  [205, 355, 505, 655].forEach((x) => {
    nodes.push(`<circle class="stage-dot" cx="${x}" cy="${nodeY}" r="3.5" fill="#cddccf"/>`);
  });

  // 症状叶子
  r.symptoms.forEach((s, i) => {
    const y = nodeY + 18 + i * L.leafGap;
    links.push({ d: seg({ x: 205, y: nodeY }, { x: 247, y }, 3), c: '#e6cdb8', w: 1.1 });
    nodes.push(leafSVG({ zh: zh(ONTOLOGY.symptoms, s), cat: 'symptom', picked: true }, 247, y, 'detail', { rec: r.id }));
    leafPos.symptom.push({ label: zh(ONTOLOGY.symptoms, s), x: 247, y });
  });

  // 触发叶子（环境 + 心情）
  const trig = r.env.map((e) => ({ id: e, cat: 'env', zh: zh(ONTOLOGY.env, e) }))
    .concat(r.mood.map((e) => ({ id: e, cat: 'mood', zh: zh(ONTOLOGY.mood, e) })));
  trig.forEach((t, i) => {
    const y = nodeY + 18 + i * L.leafGap;
    links.push({ d: seg({ x: 355, y: nodeY }, { x: 397, y }, 3), c: t.cat === 'env' ? '#cfe1e9' : '#e5d3c4', w: 1.1 });
    nodes.push(leafSVG({ ...t, picked: true }, 397, y, 'detail', { rec: r.id }));
    leafPos[t.cat].push({ label: t.zh, x: 397, y });
  });

  // 缓解叶子
  r.copings.forEach((c, i) => {
    const y = nodeY + 18 + i * L.leafGap;
    links.push({ d: seg({ x: 505, y: nodeY }, { x: 547, y }, 3), c: '#dcd3ec', w: 1.1 });
    nodes.push(leafSVG({ zh: zh(ONTOLOGY.copings, c), cat: 'coping', picked: true }, 547, y, 'detail', { rec: r.id }));
    leafPos.coping.push({ label: zh(ONTOLOGY.copings, c), x: 547, y });
  });

  // 效果
  const rel = RELIEF.find((x) => x.id === r.relief) || RELIEF[3];
  nodes.push(`<g class="node relief-badge" data-act="detail" data-rec="${r.id}">
    <rect class="nbox" x="${697}" y="${nodeY - 10}" width="${Math.max(56, tw(rel.zh, 11) + 18)}" height="20" rx="10"
      fill="#eef4ee" stroke="#9dbca2" stroke-width="1.1"/>
    <text class="nlabel" x="${697 + 9}" y="${nodeY + 4}" fill="#4f7f52" font-size="11">${esc(rel.zh)}</text>
  </g>`);
}

// ---------- 正在生长的枝 ----------
function renderPendingRow(nodeY, links, nodes) {
  const { stages, cols } = pendingCols();
  const cur = pending.stageKey;
  const curIdx = stages.findIndex((s) => s.key === cur);

  const pts = [{ x: L.jointX, y: nodeY }].concat(stages.map((s) => ({ x: s.x, y: nodeY })));
  for (let i = 0; i < pts.length - 1; i++) {
    const solid = curIdx >= 0 ? i <= curIdx : true;
    links.push({
      d: seg(pts[i], pts[i + 1], i % 2 ? 7 : -7),
      c: solid ? '#7fb083' : '#dde7de', w: solid ? 2 : 1.4, dash: solid ? '' : '3 5',
    });
  }

  // 生长中的记录节点
  nodes.push(`<g class="node pend-joint" data-act="annotate" data-x="${L.jointX}" data-y="${nodeY}">
    <circle class="nbox pulse" cx="${L.jointX}" cy="${nodeY}" r="8" fill="#fff" stroke="#3f6b4a" stroke-width="2"/>
    <circle cx="${L.jointX}" cy="${nodeY}" r="3" fill="#3f6b4a"/>
    <text class="nsub" x="${L.jointX}" y="${nodeY - 15}" text-anchor="middle" fill="#3f6b4a">${fmtShort(pending.ts)} ${fmtHM(pending.ts)}</text>
    <text class="nsub" x="${L.jointX}" y="${nodeY + 22}" text-anchor="middle" fill="#9fb0a4">${sevWord(pending.severity)} · ＋细节</text>
  </g>`);

  stages.forEach((s) => {
    const active = s.key === cur;
    nodes.push(`<circle class="stage-dot ${active ? 'on' : ''}" cx="${s.x}" cy="${nodeY}" r="${active ? 6 : 3.5}"
      fill="${active ? '#3f6b4a' : '#cddccf'}"/>`);
    // 已过阶段可以重新打开（补选）
    if (pending.loose && s.key === 'area' && pending.area) return;
    if (!active && cols[s.key].items.some((i) => i.picked)) {
      nodes.push(`<g class="node re-open" data-act="open" data-stage="${s.key}">
        <circle class="nbox" cx="${s.x}" cy="${nodeY - 15}" r="7.5" fill="#fff" stroke="#a9bfae" stroke-width="1.4"/>
        <path d="M${s.x - 3.5} ${nodeY - 15} L${s.x + 3.5} ${nodeY - 15} M${s.x} ${nodeY - 18.5} L${s.x} ${nodeY - 11.5}"
          stroke="#6b9c6e" stroke-width="1.5" stroke-linecap="round"/>
      </g>`);
    }
  });

  // 各阶段的叶子
  stages.forEach((s) => {
    const col = cols[s.key];
    const active = s.key === cur;
    // 散枝选定部位后，部位已由左侧的牌显示，枝上不再重复挂一次
    if (pending.loose && s.key === 'area' && pending.area) return;
    col.items.forEach((it, i) => {
      const y = nodeY + 18 + i * L.leafGap;
      const picked = !!it.picked;
      links.push({
        d: seg({ x: s.x, y: nodeY }, { x: col.x, y }, 3),
        c: picked ? (CATC[it.cat] || '#cddccf') : '#e4ece5',
        w: picked ? 1.4 : 1, o: picked ? .85 : .7, dash: picked ? '' : '2 3',
      });
      const act = it.special || 'pick';
      const data = {
        act,
        stage: s.key,
        id: it.id || '',
        sub: it.cat && (it.cat === 'env' || it.cat === 'mood') ? it.cat : '',
        x: col.x, y,
      };
      const fresh = lastPick === s.key + '|' + it.id ? ' fresh' : '';
      nodes.push(leafSVG(it, col.x, y, act, data, fresh, !active));
    });
  });
}
function sevWord(s) {
  const hit = SEVERITY.find((x) => x.id === s);
  return hit ? hit.zh : '中';
}

// ---------- 叶子 ----------
function leafSVG(o, x, y, act, data, extraCls, faded) {
  const label = trunc(o.zh || '', 8);
  const w = Math.max(44, tw(label, 12) + 18);
  const c = CATC[o.cat] || '#8b9a91';
  const picked = !!o.picked;
  const special = o.special;
  const fill = picked ? tint(c) : '#fff';
  const stroke = picked ? c : (special ? '#b9c8bd' : c);
  const dash = picked ? '' : '4 3';
  const op = (faded && !picked) ? .42 : 1;
  const cls = `node leaf ${picked ? 'picked' : 'ghost'} ${special ? 'sp-' + special : ''}${extraCls || ''}`;
  const d = data || {};
  const attrs = [
    `data-act="${act}"`,
    d.stage ? `data-stage="${d.stage}"` : '',
    d.id ? `data-id="${esc(d.id)}"` : '',
    d.sub ? `data-sub="${d.sub}"` : '',
    d.x != null ? `data-x="${d.x}"` : '',
    d.y != null ? `data-y="${d.y}"` : '',
    d.rec ? `data-rec="${d.rec}"` : '',
  ].join(' ');
  return `<g class="${cls}" ${attrs} opacity="${op}">
    <rect class="nbox" x="${x}" y="${y - 10}" width="${w}" height="20" rx="10"
      fill="${fill}" stroke="${stroke}" stroke-width="${picked ? 1.4 : 1.2}" stroke-dasharray="${dash}"/>
    <text class="nlabel" x="${x + 9}" y="${y + 4}" fill="${picked ? c : (special ? '#9fb0a4' : c)}"
      font-size="${special ? 11 : 12}">${esc(label)}</text>
  </g>`;
}
function tint(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const mix = (v) => Math.round(v + (255 - v) * 0.88);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

// ---------- 还没归属的待生长枝 ----------
function renderLoosePending(b, links, nodes) {
  const { stages, cols } = pendingCols();
  if (pending.area) {
    const label = zh(ONTOLOGY.areas, pending.area);
    const pillW = Math.max(92, tw(label, 13) + 30);
    nodes.push(`<g class="node area-pill">
      <rect class="nbox" x="${L.areaX}" y="${b.y - 17}" width="${pillW}" height="34" rx="11"
        fill="#3f6b4a" stroke="#2f5638" stroke-width="1"/>
      <text class="nlabel" x="${L.areaX + 13}" y="${b.y - 2}" fill="#fff">${esc(label)}</text>
      <text class="nsub" x="${L.areaX + 13}" y="${b.y + 12}" fill="#b9d3bd">新的一枝</text>
    </g>`);
    links.push({
      d: seg({ x: L.areaX + pillW, y: b.y }, { x: L.jointX, y: b.y }, 0),
      c: '#6b9c6e', w: 1.8, dash: '4 4', o: .8,
    });
  } else {
    nodes.push(`<g class="node area-pill ghost-pill">
      <rect class="nbox" x="${L.areaX}" y="${b.y - 17}" width="104" height="34" rx="11"
        fill="#fff" stroke="#c3d4c5" stroke-width="1.4" stroke-dasharray="5 4"/>
      <text class="nlabel" x="${L.areaX + 13}" y="${b.y + 5}" fill="#9fb0a4">选一个部位…</text>
    </g>`);
    links.push({
      d: seg({ x: L.areaX + 104, y: b.y }, { x: L.jointX, y: b.y }, 0),
      c: '#c3d4c5', w: 1.6, dash: '4 4',
    });
  }
  renderPendingRow(b.y, links, nodes);
}

// ============================================================
// 交互接线
// ============================================================
function wireGrove() {
  const svg = $('groveSvg');
  if (!svg) return;
  svg.querySelectorAll('.node').forEach((g) => {
    g.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const act = g.dataset.act;
      if (act === 'pick') pickOption(g.dataset.stage, g.dataset.id, g.dataset.sub);
      else if (act === 'more') { pending.expanded[g.dataset.stage] = true; renderAll(); }
      else if (act === 'skip') skipStage(g.dataset.stage);
      else if (act === 'custom') openCustom(g.dataset.stage, +g.dataset.x, +g.dataset.y);
      else if (act === 'open') { pending.open[g.dataset.stage] = !pending.open[g.dataset.stage]; renderAll(); }
      else if (act === 'bud') startGrowth(g.dataset.area || '');
      else if (act === 'annotate') openAnnotate(+g.dataset.x || L.jointX, +g.dataset.y);
      else if (act === 'detail') openRecord(g.dataset.rec);
      else if (act === 'area') openArea(g.dataset.area);
    });
  });
  const inp = document.getElementById('cfInput');
  if (inp) {
    inp.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') { e.preventDefault(); commitCustom(inp.value.trim()); }
      else if (e.key === 'Escape') { customBox = null; renderAll(); }
    });
    inp.addEventListener('click', (e) => e.stopPropagation());
    setTimeout(() => { const i = document.getElementById('cfInput'); if (i) i.focus(); }, 30);
  }
  svg.querySelectorAll('.cf-sub-b').forEach((b) => {
    b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      customBox.sub = b.dataset.sub;
      renderAll();
      setTimeout(() => { const i = document.getElementById('cfInput'); if (i) i.focus(); }, 30);
    });
  });
}
function openCustom(stage, x, y) {
  customBox = { stage, sub: 'env', x: Math.max(6, x - 76), y: y + 14 };
  renderAll();
}
function commitCustom(text) {
  if (!text || !customBox) return;
  const id = 'custom:' + text;
  const stage = customBox.stage;
  const sub = customBox.sub;
  customBox = null;
  pickOption(stage, id, sub);
}

// ---------- 细节浮层（时间 / 程度 / 情绪 / 备注） ----------
function svgToClient(x, y) {
  const svg = $('groveSvg');
  const r = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  const scale = vb.width ? r.width / vb.width : 1;
  return { x: r.left + x * scale, y: r.top + y * scale };
}
function openAnnotate(x, y) {
  const p = pending;
  if (!p) return;
  const layer = $('popLayer');
  const now = Date.now(), H = 3600e3, D = 24 * H;
  const times = [
    { k: 'now', l: '就是现在', v: now },
    { k: 't1', l: '今天早些时候', v: now - 3 * H },
    { k: 't2', l: '今天早上', v: now - 8 * H },
    { k: 'd1', l: '昨天', v: now - D },
    { k: 'd2', l: '更早', v: now - 3 * D },
  ];
  if (!p.timeOpt) p.timeOpt = 'now';
  layer.innerHTML = `
    <div class="pop">
      <div class="pop-h">这次的细节<button class="pop-x" id="popX">×</button></div>
      <div class="pop-row"><div class="pop-k">什么时候</div><div class="pop-chips" id="popTime">
        ${times.map((t) => `<span class="pc ${p.timeOpt === t.k ? 'on' : ''}" data-k="${t.k}" data-v="${t.v}">${t.l}</span>`).join('')}
      </div></div>
      <div class="pop-row"><div class="pop-k">有多难受</div><div class="pop-chips" id="popSev">
        ${SEVERITY.map((s) => `<span class="pc ${p.severity === s.id ? 'on' : ''}" data-v="${s.id}">${s.zh}</span>`).join('')}
      </div></div>
      <div class="pop-row"><div class="pop-k">情绪 <i>选填</i>
        <button class="pop-fold" id="popEmoFold">展开</button></div>
        <div class="pop-chips" id="popEmo" hidden>
        ${ONTOLOGY.emotions.map((e) => `<span class="pc sm ${p.emotions.includes(e.id) ? 'on' : ''}" data-v="${e.id}">${e.zh}</span>`).join('')}
      </div></div>
      <div class="pop-row"><div class="pop-k">写一句 <i>选填</i></div>
        <textarea id="popNote" class="pop-note" placeholder="一句话也算">${esc(p.note || '')}</textarea></div>
    </div>`;
  layer.hidden = false;
  const c = svgToClient(x, y);
  const pop = layer.querySelector('.pop');
  const h = pop.offsetHeight || 460;
  let top = c.y + 20;
  if (top + h > window.innerHeight - 10) top = Math.max(10, c.y - h - 16);
  layer.style.left = Math.max(10, Math.min(window.innerWidth - 326, c.x - 150)) + 'px';
  layer.style.top = top + 'px';

  $('popX').addEventListener('click', () => { layer.hidden = true; });
  $('popTime').addEventListener('click', (e) => {
    const s = e.target.closest('.pc'); if (!s) return;
    p.ts = +s.dataset.v; p.timeOpt = s.dataset.k; layer.hidden = true; renderAll();
  });
  $('popSev').addEventListener('click', (e) => {
    const s = e.target.closest('.pc'); if (!s) return;
    p.severity = s.dataset.v; layer.hidden = true; renderAll();
  });
  $('popEmoFold').addEventListener('click', () => {
    const box = $('popEmo');
    box.hidden = !box.hidden;
    $('popEmoFold').textContent = box.hidden ? '展开' : '收起';
  });
  $('popEmo').addEventListener('click', (e) => {
    const s = e.target.closest('.pc'); if (!s) return;
    const id = s.dataset.v;
    const i = p.emotions.indexOf(id);
    if (i >= 0) p.emotions.splice(i, 1); else p.emotions.push(id);
    s.classList.toggle('on');
  });
  $('popNote').addEventListener('input', (e) => { p.note = e.target.value; });
}

// ============================================================
// 视图切换
// ============================================================
function switchView(v) {
  document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('active', x.dataset.view === v));
  $('viewGrove').hidden = v !== 'grove';
  $('viewRecord').hidden = v !== 'record';
  $('viewPattern').hidden = v !== 'pattern';
  if (v === 'grove') renderGrove();
  if (v === 'record') renderRecent();
  if (v === 'pattern') renderPatterns();
  window.scrollTo(0, 0);
}
document.querySelectorAll('.tab').forEach((b) => {
  b.addEventListener('click', () => switchView(b.dataset.view));
});
$('startBtn').addEventListener('click', () => startGrowth(''));
$('growCancel').addEventListener('click', () => cancelGrowth());

// ---------- 缩放 ----------
$('zoomIn').addEventListener('click', () => { zoom = Math.min(1.8, zoom * 1.15); renderGrove(); });
$('zoomOut').addEventListener('click', () => { zoom = Math.max(0.4, zoom / 1.15); renderGrove(); });
$('zoomFit').addEventListener('click', () => {
  const box = $('groveScroll');
  zoom = Math.max(0.4, Math.min(1.6, (box.clientWidth - 26) / (svgW || 800)));
  renderGrove();
});

// ---------- 滚动到正在生长的枝 ----------
function stageLeft() {
  const box = $('groveScroll');
  const svg = $('groveSvg');
  if (!pending || !box || !svg) return 0;
  const s = pendingCols().stages.find((x) => x.key === pending.stageKey);
  if (!s) return 0;
  const vb = svg.viewBox.baseVal;
  const w = svg.getBoundingClientRect().width;
  if (!vb.width || !w) return 0;
  const scale = w / vb.width;
  return Math.max(0, (s.x + 150) * scale - box.clientWidth * 0.42);
}
function scrollToPending() {
  const box = $('groveScroll');
  const svg = $('groveSvg');
  if (!box || !svg) return;
  let top = box.scrollTop;
  const j = svg.querySelector('.pend-joint');
  if (j) {
    const jr = j.getBoundingClientRect();
    const br = box.getBoundingClientRect();
    top = box.scrollTop + (jr.top - br.top) - 80;
  }
  box.scrollTo({ left: stageLeft(), top: Math.max(0, top), behavior: 'smooth' });
}
// ---------- 横向滚到当前阶段 ----------
function scrollToStage() {
  const box = $('groveScroll');
  if (!box) return;
  box.scrollTo({ left: stageLeft(), behavior: 'smooth' });
}

// ============================================================
// 生长提示条
// ============================================================
function updateGrowBar() {
  const bar = $('growBar');
  if (!pending) { bar.hidden = true; return; }
  bar.hidden = false;
  const i = pending.chain.indexOf(pending.stageKey);
  const stage = STAGES.find((s) => s.key === pending.stageKey);
  const marks = '①②③④⑤';
  $('gbQ').textContent = `${marks[i] || ''} ${stage ? stage.q : ''}`;
  const picked = pending.picked.filter((p) => p.stage === pending.stageKey).length;
  $('gbHint').textContent = picked
    ? `已选 ${picked} 片 · 点枝头其他叶子可继续选`
    : '点枝头的叶子；选过的会长在枝上';
}

// ============================================================
// 最近记录
// ============================================================
function renderRecent() {
  const wrap = $('recentList');
  $('recCount').textContent = `${records.length} 条`;
  if (!records.length) {
    wrap.innerHTML = '<div class="empty">还没有记录。<br>感觉不舒服的时候，回来记一笔。</div>';
    return;
  }
  const sorted = [...records].sort((a, b) => b.ts - a.ts);
  wrap.innerHTML = sorted.slice(0, 20).map((r) => {
    const sev = SEVERITY.find((s) => s.id === r.severity);
    const sevCls = r.severity === 'light' ? 'sev-l' : r.severity === 'medium' ? 'sev-m' : 'sev-h';
    const tags = [];
    r.env.forEach((x) => tags.push(`<span class="tg env">${esc(zh(ONTOLOGY.env, x))}</span>`));
    r.mood.forEach((x) => tags.push(`<span class="tg mood">${esc(zh(ONTOLOGY.mood, x))}</span>`));
    r.copings.forEach((x) => tags.push(`<span class="tg cope">${esc(zh(ONTOLOGY.copings, x))}</span>`));
    return `<div class="rec" data-rec="${r.id}">
      <div class="rec-time">${fmtShort(r.ts)}<br>${fmtHM(r.ts)}</div>
      <div class="rec-main">
        <div class="rec-line">${esc(zh(ONTOLOGY.areas, r.area))}<span class="sep">·</span>${esc(r.symptoms.map((x) => zh(ONTOLOGY.symptoms, x)).join('、'))}<span class="tg ${sevCls}" style="margin-left:7px">${sev.zh}</span></div>
        <div class="rec-tags">${tags.join('') || '<span class="tg">未记录归因</span>'}</div>
      </div>
    </div>`;
  }).join('');
  wrap.querySelectorAll('.rec').forEach((el) => {
    el.addEventListener('click', () => openRecord(el.dataset.rec));
  });
}

// ============================================================
// 详情弹层
// ============================================================
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

// ============================================================
// 规律
// ============================================================
function renderPatterns() {
  const pb = $('patternBody');
  const rb = $('reliefBody');
  if (records.length < 2) {
    pb.innerHTML = '<div class="empty">至少记两条，才能看出规律。</div>';
    rb.innerHTML = '<div class="empty">—</div>';
    return;
  }
  const pair = {};
  records.forEach((r) => {
    const sym = r.symptoms.map((s) => zh(ONTOLOGY.symptoms, s)).join('、') || '未描述';
    [...r.env, ...r.mood].forEach((t) => {
      const isEnv = r.env.includes(t);
      const k = t + '||' + sym;
      const tLabel = isEnv ? zh(ONTOLOGY.env, t) : zh(ONTOLOGY.mood, t);
      pair[k] = pair[k] || { t: tLabel, sym, env: isEnv, n: 0 };
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

  const copeStat = {};
  records.forEach((r) => {
    r.copings.forEach((c) => {
      copeStat[c] = copeStat[c] || { n: 0, helped: 0 };
      copeStat[c].n++;
      if (r.relief === 'helped') copeStat[c].helped++;
    });
  });
  const cTop = Object.entries(copeStat)
    .sort((a, b) => (b[1].helped - b[1].n / 2) - (a[1].helped - a[1].n / 2))
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

// ============================================================
// Toast
// ============================================================
function showToast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

// ============================================================
// 演示数据
// ============================================================
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

// ============================================================
// 渲染入口
// ============================================================
function renderAll() {
  renderGrove();
  renderRecent();
  renderPatterns();
  updateGrowBar();
}
renderAll();
switchView('grove');
