// ================= 暖记 · 多人物档案 + 症状速记 → 身体地图 =================
// 研究原型：症状回忆助手，两次复诊之间

const PERSONAS = [
  {
    id: 'lin', name: '林晓雨', age: 26, condition: '多发性硬化 · 3 年', city: '广州',
    avatarBg: '#e3f0ee', avatarFg: '#2f6f6a',
    motto: '把身体的变化，慢慢说给自己听 🌱',
    lastVisit: '2026-09-12', nextVisit: '2026-10-28',
    meds: ['β-干扰素 · 隔日注射', '维生素D · 每日1粒'],
    advice: ['规律作息，避免过度疲劳', '出现新症状请及时记录', '按计划复查磁共振'],
    events: [
      { date: '2026-09-20', part: 'head',  type: '头晕',     sev: '中', ctx: '连续加班后地铁上' },
      { date: '2026-09-28', part: 'whole', type: '乏力',     sev: '轻', ctx: '傍晚散步后' },
      { date: '2026-10-08', part: 'hand',  type: '手麻',     sev: '轻', ctx: '早晨起床时' },
      { date: '2026-10-15', part: 'thigh', type: '腿部乏力', sev: '中', ctx: '爬楼梯明显' },
      { date: '2026-10-21', part: 'head',  type: '头晕',     sev: '轻', ctx: '午睡醒来' },
    ],
  },
  {
    id: 'chen', name: '陈志远', age: 34, condition: '过敏性鼻炎 · 哮喘', city: '杭州',
    avatarBg: '#fbeedd', avatarFg: '#b4763a',
    motto: '换季不难熬，记录帮你看清规律 🍂',
    lastVisit: '2026-09-30', nextVisit: '2026-11-04',
    meds: ['布地奈德鼻喷剂 · 每日2次', '氯雷他定 · 每晚1片'],
    advice: ['远离粉尘与花粉刺激', '坚持记录鼻部症状发作时间'],
    events: [
      { date: '2026-10-03', part: 'nose',  type: '鼻塞',     sev: '中', ctx: '换季晨起' },
      { date: '2026-10-09', part: 'nose',  type: '打喷嚏',   sev: '轻', ctx: '外出赏花后' },
      { date: '2026-10-14', part: 'ear',   type: '耳闷',     sev: '轻', ctx: '飞机起降时' },
      { date: '2026-10-19', part: 'chest', type: '胸闷',     sev: '轻', ctx: '夜跑后' },
      { date: '2026-10-22', part: 'nose',  type: '流涕',     sev: '中', ctx: '降温当天' },
    ],
  },
  {
    id: 'wang', name: '王美玲', age: 52, condition: '类风湿关节炎 · 5 年', city: '上海',
    avatarBg: '#ece9f7', avatarFg: '#6b5fa8',
    motto: '照顾好关节，也照顾好心情 ☕',
    lastVisit: '2026-09-18', nextVisit: '2026-11-01',
    meds: ['甲氨蝶呤 · 每周1次', '叶酸 · 每周补服'],
    advice: ['注意关节保暖', '按时复查肝肾功能'],
    events: [
      { date: '2026-09-25', part: 'hand',  type: '晨僵',   sev: '中', ctx: '清晨持续半小时' },
      { date: '2026-10-05', part: 'knee',  type: '膝痛',   sev: '中', ctx: '阴雨天加重' },
      { date: '2026-10-13', part: 'waist', type: '腰酸',   sev: '轻', ctx: '久坐做家务后' },
      { date: '2026-10-20', part: 'hand',  type: '晨僵',   sev: '重', ctx: '气温骤降' },
    ],
  },
];

// ---- 部位定义（精细定位） ----
const PARTS = {
  head:    { name: '头部', kws: ['头', '头晕', '头疼', '头痛', '偏头痛', '眩晕'] },
  eyes:    { name: '眼部', kws: ['眼', '视物', '视力'] },
  nose:    { name: '鼻部', kws: ['鼻', '鼻炎', '鼻塞', '喷嚏', '流涕', '鼻痒'] },
  mouth:   { name: '口咽部', kws: ['嗓', '喉', '咽', '扁桃体', '口腔'] },
  ear:     { name: '耳部', kws: ['耳', '耳鸣', '听力'] },
  neck:    { name: '颈部', kws: ['脖', '颈'] },
  shoulder:{ name: '肩背', kws: ['肩', '背', '斜方'] },
  hand:    { name: '手部', kws: ['手麻', '手疼', '手抖', '手指', '手掌', '手心', '手'] },
  arm:     { name: '手臂', kws: ['臂', '胳膊', '肘', '手腕', '腕'] },
  chest:   { name: '胸口', kws: ['胸', '心口', '胸闷', '心悸'] },
  abdomen: { name: '腹部', kws: ['肚', '腹', '胃', '肠'] },
  waist:   { name: '腰部', kws: ['腰', '胯'] },
  hip:     { name: '臀部', kws: ['臀', '髋'] },
  thigh:   { name: '大腿', kws: ['大腿', '腿'] },
  knee:    { name: '膝盖', kws: ['膝'] },
  shin:    { name: '小腿', kws: ['小腿', '抽筋'] },
  foot:    { name: '足部', kws: ['脚', '足', '踝'] },
};
const WHOLE_KWS = ['乏力', '疲劳', '疲惫', '累', '全身', '没劲', '无力'];

// ---- 状态 ----
const DAY = 86400000;
const $ = (id) => document.getElementById(id);
let cur = null;            // 当前人物对象
let events = [];           // 当前人物的事件（含 localStorage 持久化）
const selected = new Map();
let selectSeq = 0;
let currentTab = 'workbench';

function pad2(n) { return String(n).padStart(2, '0'); }
function md(s) { const d = new Date(s + 'T00:00:00'); return `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }
function toTs(s) { return new Date(s + 'T00:00:00').getTime(); }
function todayStr() { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }

// ---- 解析 ----
function parsePart(text) {
  for (const key in PARTS) {
    if (PARTS[key].kws.some((k) => text.includes(k))) return key;
  }
  return null;
}
function isWhole(text) { return WHOLE_KWS.some((k) => text.includes(k)); }
function parseSev(text) {
  if (/重|剧|很|特别|非常/.test(text)) return '重';
  if (/轻|有点|稍微|一点点|一点/.test(text)) return '轻';
  return '中';
}
function parseSymWord(text) {
  const m = text.match(/疼|痛|酸|麻|胀|闷|晕|僵|沉|乏|痒|塞|堵/);
  return m ? m[0] : '不适';
}

// ---- 屏幕一：人物卡片 ----
function renderPersonas() {
  const wrap = $('personaList');
  wrap.innerHTML = '';
  PERSONAS.forEach((p) => {
    const n = loadEvents(p).length;
    const days = Math.max(0, Math.round((toTs(p.nextVisit) - Date.now()) / DAY));
    const card = document.createElement('div');
    card.className = 'persona-card';
    card.innerHTML = `
      <div class="avatar" style="background:${p.avatarBg};color:${p.avatarFg}">${p.name[0]}</div>
      <div class="p-info">
        <div class="p-name">${p.name} <span style="font-size:11px;color:var(--sub);font-weight:500">${p.age}岁 · ${p.city}</span></div>
        <div class="p-cond">${p.condition}</div>
        <div class="p-meta">
          <span class="p-chip">📋 ${n} 条症状记录</span>
          <span class="p-chip warm">距复诊 ${days} 天</span>
        </div>
      </div>
      <div class="p-go">›</div>`;
    card.addEventListener('click', () => enterPersona(p));
    wrap.appendChild(card);
  });
}

// ---- 持久化 ----
function makeId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
// 数据模型对齐 Nomi 文档：{ id, timestamp, part, type, severity, context, source, edited, shared }
function loadEvents(p) {
  let arr;
  try {
    const raw = localStorage.getItem('wr_events_' + p.id);
    if (raw) arr = JSON.parse(raw);
  } catch (_) {}
  if (!arr) arr = p.events.map((e) => ({ ...e }));
  arr.forEach((e) => {
    if (!e.id) e.id = makeId();
    if (!e.source) e.source = 'demo';
    if (e.edited === undefined) e.edited = false;
    if (e.shared === undefined) e.shared = false;
  });
  return arr;
}
function saveEvents() {
  try { localStorage.setItem('wr_events_' + cur.id, JSON.stringify(events)); } catch (_) {}
}

// ---- 进入 / 退出档案 ----
function enterPersona(p) {
  cur = p;
  events = loadEvents(p);
  selected.clear(); selectSeq = 0;
  $('screenSelect').hidden = true;
  $('screenApp').hidden = false;
  switchTab('workbench');

  $('tbAvatar').textContent = p.name[0];
  $('tbAvatar').style.background = p.avatarBg;
  $('tbAvatar').style.color = p.avatarFg;
  $('tbName').textContent = p.name;
  $('tbCond').textContent = `${p.condition} · ${p.city}`;
  $('greetName').textContent = p.name;
  $('greetMotto').textContent = p.motto;
  $('lastDate').textContent = md(p.lastVisit);
  $('nextDate').textContent = md(p.nextVisit);
  $('fabbar').dataset.persona = p.id;
  $('syncNote').hidden = true;
  $('transcript').hidden = true;
  $('mapInfo').textContent = '轻点身体部位，查看已记录的症状';

  renderAll();
  // FR1：温和可选的提示（Nomi 陪伴）。本次会话跳过过则不再出现
  try { $('nomiPrompt').hidden = !!sessionStorage.getItem('nomi_prompt_dismissed'); }
  catch (_) { $('nomiPrompt').hidden = false; }
  window.scrollTo(0, 0);
}

$('backBtn').addEventListener('click', () => {
  $('screenApp').hidden = true;
  $('fabbar').hidden = true;
  $('screenSelect').hidden = false;
  renderPersonas();
  window.scrollTo(0, 0);
});

// ---- 四分类 Tab 切换（工作台 / 身体 / 复诊 / 时间表） ----
function switchTab(name) {
  currentTab = name;
  document.querySelectorAll('.tabpage').forEach((p) => { p.hidden = (p.id !== 'tab-' + name); });
  document.querySelectorAll('.tab-item').forEach((b) => { b.classList.toggle('active', b.dataset.tab === name); });
  updateFab();
  window.scrollTo(0, 0);
}
document.querySelectorAll('.tab-item').forEach((b) => {
  b.addEventListener('click', () => switchTab(b.dataset.tab));
});

// ---- 渲染总入口 ----
function renderAll() {
  const days = Math.max(0, Math.round((toTs(cur.nextVisit) - Date.now()) / DAY));
  $('greetDays').textContent = days;
  $('tbCount').textContent = `${events.length} 条记录`;
  renderWinbar();
  renderEvList();
  renderAnchors();
  renderLegend();
  updateFab();
}

// ---- 时间轴 ----
function renderWinbar() {
  const bar = $('winbar');
  bar.querySelectorAll('.dot').forEach((d) => d.remove());
  const start = toTs(cur.lastVisit), end = toTs(cur.nextVisit);
  events.forEach((e, i) => {
    const pct = Math.min(100, Math.max(0, ((toTs(e.date) - start) / (end - start)) * 100));
    const d = document.createElement('div');
    d.className = 'dot';
    d.dataset.sev = e.sev;
    d.style.left = pct + '%';
    d.addEventListener('click', () => {
      bar.querySelectorAll('.dot.active').forEach((x) => x.classList.remove('active'));
      d.classList.add('active');
      const det = $('evDetail');
      det.hidden = false;
      const pname = e.part && PARTS[e.part] ? PARTS[e.part].name : '全身';
      det.innerHTML = `<div>📅 ${e.date} · ${e.type}（${e.sev}）· ${pname}</div>` +
        `<div>生活情境：${e.ctx}　·　来源：${e.source === 'voice' ? '语音' : e.source === 'text' ? '文字' : '示例'}</div>`;
      det.appendChild(entryActions(e));
    });
    bar.appendChild(d);
  });
}

function renderEvList() {
  const wrap = $('evList');
  wrap.innerHTML = '';
  [...events].sort((a, b) => b.date.localeCompare(a.date)).forEach((e) => {
    const row = document.createElement('div');
    row.className = 'ev-row';
    const d = document.createElement('span');
    d.className = 'ev-date'; d.textContent = md(e.date);
    const dot = document.createElement('span');
    dot.className = 'ev-dot'; dot.dataset.sev = e.sev;
    const type = document.createElement('span');
    type.className = 'ev-type'; type.textContent = e.type;
    const ctx = document.createElement('span');
    ctx.className = 'ev-ctx'; ctx.textContent = e.ctx;
    row.append(d, dot, type, ctx, entryActions(e));
    wrap.appendChild(row);
  });
}

// ---- 回忆锚点 ----
function renderAnchors() {
  const wrap = $('anchors');
  wrap.innerHTML = '';
  const mk = (title) => {
    const d = document.createElement('div');
    d.className = 'anchor';
    d.innerHTML = `<div class="a-title">${title}</div>`;
    const box = document.createElement('div');
    box.className = 'chips';
    d.appendChild(box);
    return { d, box };
  };
  const sel = (el, id, label, cat) => {
    el.classList.add('chip');
    if (selected.has(id)) el.classList.add('selected');
    el.addEventListener('click', () => {
      if (selected.has(id)) { selected.delete(id); el.classList.remove('selected'); }
      else { selected.set(id, { label, cat }); el.classList.add('selected'); }
      updateFab();
    });
    return el;
  };

  const m = mk('💊 本次用药');
  cur.meds.forEach((x) => m.box.appendChild(sel(Object.assign(document.createElement('span'), { textContent: x }), 'med-' + x, x, '用药')));
  wrap.appendChild(m.d);

  const ins = mk('📋 关键医嘱');
  const ul = document.createElement('ul');
  cur.advice.forEach((x) => {
    const li = document.createElement('li');
    li.textContent = x;
    if (selected.has('ins-' + x)) li.classList.add('selected');
    li.addEventListener('click', () => {
      if (selected.has('ins-' + x)) { selected.delete('ins-' + x); li.classList.remove('selected'); }
      else { selected.set('ins-' + x, { label: x, cat: '医嘱' }); li.classList.add('selected'); }
      updateFab();
    });
    ul.appendChild(li);
  });
  ins.d.appendChild(ul);
  wrap.appendChild(ins.d);

  const locs = [...new Set(events.map((e) => e.part).filter((p) => p && p !== 'whole' && PARTS[p]).map((p) => PARTS[p].name))];
  const l = mk('📍 近期不适部位');
  locs.forEach((x) => l.box.appendChild(sel(Object.assign(document.createElement('span'), { textContent: x }), 'loc-' + x, x, '不适部位')));
  wrap.appendChild(l.d);
}

// ---- 身体地图 ----
function sevRank(s) { return s === '重' ? 3 : s === '中' ? 2 : 1; }

function renderLegend(activeKey) {
  const counts = {}, worst = {};
  events.forEach((e) => {
    if (!e.part) return;
    counts[e.part] = (counts[e.part] || 0) + 1;
    if (!worst[e.part] || sevRank(e.sev) > sevRank(worst[e.part])) worst[e.part] = e.sev;
  });
  const lg = $('bmLegend');
  lg.innerHTML = '';
  const keys = Object.keys(counts).filter((k) => k !== 'whole');
  if (counts.whole) keys.push('whole');
  keys.forEach((k) => {
    const name = PARTS[k] ? PARTS[k].name : '全身';
    const row = document.createElement('div');
    row.className = 'lg' + (k === activeKey ? ' active' : '');
    const swc = worst[k] === '中' ? ' s2' : worst[k] === '重' ? ' s3' : '';
    row.innerHTML = `<span class="sw${swc}"></span><span>${name}</span><b>×${counts[k]}</b>`;
    row.addEventListener('click', () => { highlightPart(k); showMapInfo(k); });
    lg.appendChild(row);
  });
  if (!keys.length) lg.innerHTML = '<div style="font-size:12px;color:var(--sub)">还没有记录<br>用上方话筒记一条吧</div>';
  highlightCounts(counts, activeKey);
}

function highlightCounts(counts, activeKey) {
  document.querySelectorAll('#bodyMap .bpart').forEach((g) => {
    g.classList.remove('active', 's1', 's2', 's3');
    const k = g.dataset.part;
    if (k === activeKey) { g.classList.add('active'); return; }
    const w = worstSev(counts[k]);
    if (w) g.classList.add('s' + w);
  });
}
function worstSev(count) {
  if (!count) return 0;
  // 用记录数粗略上色：1条轻、2条中、3+重（示意）
  return count >= 3 ? 3 : count;
}

function highlightPart(key) {
  document.querySelectorAll('#bodyMap .bpart').forEach((g) => {
    g.classList.toggle('active', g.dataset.part === key);
    if (g.dataset.part !== key) {
      g.classList.remove('s1', 's2', 's3');
      const counts = countByPart();
      const w = worstSev(counts[g.dataset.part]);
      if (w) g.classList.add('s' + w);
    }
  });
}
function countByPart() {
  const c = {};
  events.forEach((e) => { if (e.part) c[e.part] = (c[e.part] || 0) + 1; });
  return c;
}

function showMapInfo(key) {
  const name = PARTS[key] ? PARTS[key].name : '全身';
  const rows = events.filter((e) => (key === 'whole' ? e.part === 'whole' : e.part === key));
  const info = $('mapInfo');
  if (!rows.length) {
    info.innerHTML = `「${name}」还没有记录。<br>轻点话筒说一句，比如「我${name}疼」。`;
    return;
  }
  info.innerHTML = `<b>${name} · ${rows.length} 条记录</b>`;
  rows.forEach((e) => {
    const line = document.createElement('div');
    line.className = 'mi-line';
    const txt = document.createElement('span');
    txt.className = 'mi-txt';
    txt.innerHTML = `${md(e.date)} ${e.type}（${e.sev}）· ${e.ctx}`;
    line.appendChild(txt);
    line.appendChild(entryActions(e));
    info.appendChild(line);
  });
}

// ---- FR4：条目的查看 / 编辑（改程度）/ 删除 ----
function entryActions(e) {
  const box = document.createElement('span');
  box.className = 'ev-actions';
  const ed = document.createElement('button');
  ed.className = 'mini-btn'; ed.textContent = '改程度';
  ed.addEventListener('click', (ev) => { ev.stopPropagation(); editEntry(e.id); });
  const dl = document.createElement('button');
  dl.className = 'mini-btn del'; dl.textContent = '删除';
  dl.addEventListener('click', (ev) => { ev.stopPropagation(); deleteEntry(e.id); });
  box.append(ed, dl);
  return box;
}
function editEntry(id) {
  const e = events.find((x) => x.id === id);
  if (!e) return;
  const order = ['轻', '中', '重'];
  e.sev = order[(order.indexOf(e.sev) + 1) % 3];
  e.edited = true;
  saveEvents(); renderAll();
  showToast(`已调整程度为：${e.sev}`);
}
function deleteEntry(id) {
  const e = events.find((x) => x.id === id);
  if (!e) return;
  if (!confirm('确定删除这条记录吗？删除后无法恢复。')) return;
  events = events.filter((x) => x.id !== id);
  saveEvents(); renderAll();
  showToast('已删除该记录');
}

$('bodyMap').addEventListener('click', (e) => {
  const g = e.target.closest('.bpart');
  if (!g) return;
  highlightPart(g.dataset.part);
  showMapInfo(g.dataset.part);
});

// ---- 语音输入（Web Speech API） + 文字兜底 ----
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null, listening = false;

function setMicUI(on, statusText) {
  $('micBtn').classList.toggle('listening', on);
  $('micStatus').textContent = statusText || (on ? '正在聆听…说出症状' : '轻点话筒开始');
}

if (SR) {
  rec = new SR();
  rec.lang = 'zh-CN';
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = (ev) => {
    let interim = '', final = '';
    for (const res of ev.results) {
      if (res.isFinal) final += res[0].transcript;
      else interim += res[0].transcript;
    }
    const t = $('transcript');
    t.hidden = false;
    t.textContent = final || interim || '…';
    if (final) handleInput(final.trim(), true);
  };
  rec.onerror = (ev) => {
    setMicUI(false);
    showToast(ev.error === 'not-allowed' ? '麦克风未授权，可用文字输入' : '没听清，再试一次或用文字输入');
  };
  rec.onend = () => { if (listening) { listening = false; setMicUI(false); } };
} else {
  setMicUI(false, '此浏览器不支持语音识别，可直接输入文字');
}

$('micBtn').addEventListener('click', () => {
  if (!SR) { showToast('此浏览器不支持语音，请用文字输入'); return; }
  if (listening) { listening = false; rec.stop(); setMicUI(false); return; }
  try { listening = true; rec.start(); setMicUI(true); }
  catch (_) { listening = false; setMicUI(false); }
});

$('textBtn').addEventListener('click', () => {
  const v = $('textInput').value.trim();
  if (v) { handleInput(v); $('textInput').value = ''; }
});
$('textInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('textBtn').click(); });

// 快捷例句
(function renderQuickChips() {
  const examples = ['我鼻子塞了', '我脖子疼', '我有点头晕', '膝盖很疼'];
  const wrap = $('quickChips');
  examples.forEach((x) => {
    const c = document.createElement('button');
    c.className = 'q-chip'; c.textContent = '「' + x + '」';
    c.addEventListener('click', () => { $('textInput').value = x; $('textBtn').click(); });
    wrap.appendChild(c);
  });
})();

// ---- 输入 → 解析 → 同步 ----
function handleInput(text, fromVoice) {
  const t = $('transcript');
  t.hidden = false;
  t.textContent = text;

  const key = parsePart(text);
  const whole = !key && isWhole(text);
  if (!key && !whole) {
    showToast('没识别到部位，试试：鼻子 / 头 / 脖子 / 腰 / 膝盖');
    return;
  }
  const partName = key ? PARTS[key].name : '全身';
  const sev = parseSev(text);
  const sym = parseSymWord(text);
  const evt = {
    id: makeId(),
    date: todayStr(),
    part: whole ? 'whole' : key,
    type: whole ? '乏力' : `${partName}${sym === '塞' || sym === '堵' ? '塞' : sym}`,
    sev,
    ctx: `${fromVoice ? '语音' : '文字'}速记：「${text}」`,
    source: fromVoice ? 'voice' : 'text',
    edited: false,
    shared: false,
  };
  events.push(evt);
  saveEvents();
  renderAll();

  const note = $('syncNote');
  note.hidden = false;
  note.innerHTML = `<span class="ok">✦ 已同步</span> ${partName} · ${evt.type}（${sev}）→ 身体地图 & 时间轴<br>` +
    `<span class="sync-soft">已经帮你记下来了，随时可以回看 🌿</span>`;
  const chip = document.createElement('span');
  chip.className = 'chip';
  chip.textContent = '记入我的整理';
  chip.addEventListener('click', () => {
    selected.set('voice-' + (++selectSeq), { label: `${evt.date} ${evt.type}（${sev}）· ${partName}`, cat: '近期症状', eid: evt.id });
    chip.classList.add('selected');
    updateFab();
    showToast('已标记，将出现在我的整理');
  });
  note.appendChild(chip);

  if (key) { highlightPart(key); showMapInfo(key); }
  showToast(`已记录：${partName}（${sev}）`);
}

// ---- 我的整理（面向自己） ----
function updateFab() {
  $('fabCount').textContent = `已选 ${selected.size} 项`;
  $('fabBtn').textContent = selected.size > 0 ? `生成我的整理 (${selected.size})` : '生成我的整理';
  // 底部操作条只在「复诊」分类页显示
  $('fabbar').hidden = (currentTab !== 'visit');
}

const CATS = ['用药', '医嘱', '不适部位', '近期症状'];
function renderModal() {
  const groups = {};
  selected.forEach((v) => { (groups[v.cat] = groups[v.cat] || []).push(v.label); });
  let html = '';
  CATS.forEach((cat) => {
    if (groups[cat]) {
      html += `<div class="modal-grp"><h4>${cat}</h4>` +
        groups[cat].map((l) => `<div class="mi">${l}</div>`).join('') + `</div>`;
    }
  });
  $('modalBody').innerHTML = html || '<div class="modal-empty">还没有选择。<br>轻点用药 / 医嘱 / 部位，标记你想留意的部分。</div>';
}
function buildPlainText() {
  const groups = {};
  selected.forEach((v) => { (groups[v.cat] = groups[v.cat] || []).push(v.label); });
  let t = `【我的症状整理 · ${cur.name} · ${cur.condition}】\n`;
  CATS.forEach((cat) => {
    if (groups[cat]) t += `\n${cat}：\n` + groups[cat].map((l) => `· ${l}`).join('\n') + '\n';
  });
  return t.trim();
}

$('fabBtn').addEventListener('click', () => {
  renderModal();
  $('modal').hidden = false;
});
$('modalClose').addEventListener('click', () => { $('modal').hidden = true; });
$('modal').addEventListener('click', (e) => { if (e.target.id === 'modal') $('modal').hidden = true; });
$('modalCopy').addEventListener('click', async () => {
  if (selected.size === 0) { showToast('还没有选择内容'); return; }
  try {
    await navigator.clipboard.writeText(buildPlainText());
    // 标记这批条目已被整理回顾（数据模型 shared 字段复用为 reviewed 标记）
    selected.forEach((v) => {
      if (v.eid) { const e = events.find((x) => x.id === v.eid); if (e) e.shared = true; }
    });
    saveEvents();
    showToast('已复制，可以贴到备忘录保存 🌿');
  } catch (_) { showToast('复制失败，请手动记录'); }
});

// ---- FR1：Nomi 温和可选提示 ----
$('nomiRecord').addEventListener('click', () => {
  const inp = $('textInput');
  inp.focus();
  inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
$('nomiSkip').addEventListener('click', () => {
  $('nomiPrompt').hidden = true;
  try { sessionStorage.setItem('nomi_prompt_dismissed', '1'); } catch (_) {}
});

// ---- Toast ----
function showToast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 1800);
}

// ---- 初始 ----
renderPersonas();
