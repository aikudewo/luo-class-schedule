/* 浩维课表 — 数据来自《骆浩维(2026-2027-1)课表.pdf》 */
'use strict';

const START_DEFAULT = '2026-08-31';
const TOTAL_WEEKS = 20;
const DOW = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const SLOTS = [
  ['8:10', '8:55'], ['9:00', '9:45'], ['10:15', '11:00'], ['11:05', '11:50'],
  ['14:30', '15:15'], ['15:20', '16:05'], ['16:30', '17:15'], ['17:20', '18:05'],
  ['19:30', '20:15'], ['20:25', '21:10']
];

// [星期, 开始节, 结束节, 课程原名, 周次, 场地, 教师, 考核, 学分, 学时, 教学班, 组成, 授课方式]
const RAW = [
  [1,1,2,'数字经济概论*','1-8周','广学楼610 (多)','韩东初','考查','2.0','理论32 / 周4 / 总32','37221610x0-01','数经1251;数经1252;数经1253',''],
  [1,1,4,'经济建模与Python应用实验&','12-16周','博文楼C310-311','侯宇恒','考查','1.0','周1 / 总20','j3731720x0-01','数经1251;数经1252',''],
  [1,3,4,'经济建模与Python应用*','1-8周','广学楼310 (多)','侯宇恒','考试','2.0','理论32 / 周4 / 总32','37321610x0-01','数经1251;数经1252',''],
  [1,5,6,'排球*','1-17周','排球二区东5B','聂乃新','未安排','1.0','理论26 / 周2 / 总34','25111008-26','无','面授讲课'],
  [2,1,2,'区域经济学*','第16周','广学楼610 (多)','高溦','考试','2.0','理论32 / 周2 / 总32','37241301x0-01','数经1251;数经1252;数经1253',''],
  [2,3,4,'大学英语听说III$','2-4周(双),8-14周(双)','博文楼B304','黄津沙','考试','0.5','实验14 / 周2 / 总14','23112701x3-66','数经1251;数经1252',''],
  [2,5,6,'马克思主义基本原理*','1-5周,7-15周','钟海楼03021 (多)','卢灿丽','考试','2.5','理论40 / 周4 / 总40','27111301x0-21','数经1251;数经1252;数经1253;数经1254',''],
  [2,7,8,'宏观经济学*','1-5周,7-8周,10-12周','广学楼610 (多)','周奇美','考试','3.0','理论48 / 周3 / 总48','37241202x0-01','数经1251;数经1252;数经1253',''],
  [3,1,2,'线性代数*','1-5周,7-8周','广学楼228 (多)','吴龙渊','考试','2.0','理论32 / 周2 / 总32','32411102x0-07','数经1251;数经1252;数经1253;数经1254',''],
  [3,3,4,'马克思主义基本原理*','1-5周','钟海楼03020 (多)','卢灿丽','考试','2.5','理论40 / 周4 / 总40','27111301x0-21','数经1251;数经1252;数经1253;数经1254',''],
  [3,3,4,'习近平经济思想概论*','9-13周','明德楼B5401 (多)','陈琦','考试','2.0','理论32 / 周4 / 总32','37210312x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252',''],
  [3,3,4,'习近平经济思想概论*','14-16周','明德楼B5401 (多)','赵亮','考试','2.0','理论32 / 周4 / 总32','37210312x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252',''],
  [3,9,10,'食品营养学*','1-5周,7-12周','明德楼B5401 (多)','王海清','考查','1.5','理论24 / 周2 / 总24','12192001x0-02','无','面授讲课'],
  [4,1,2,'大学英语读写III*','1-16周','广学楼310 (多)','黄津沙','考试','2.0','理论32 / 周2 / 总32','23112601x3-66','数经1251;数经1252',''],
  [4,3,4,'数字经济发展与挑战专题*','3-4周','明德楼B1402 (多)','侯宇恒','考查','1.0','理论16 / 周2 / 总16','37241606x0-01','数经1251;数经1252;数经1253;数经1254','面授讲课'],
  [4,3,4,'数字经济发展与挑战专题*','5-6周','明德楼B1402 (多)','章成','考查','1.0','理论16 / 周2 / 总16','37241606x0-01','数经1251;数经1252;数经1253;数经1254','面授讲课'],
  [4,3,4,'数字经济发展与挑战专题*','7-8周','明德楼B1402 (多)','姚芳芳','考查','1.0','理论16 / 周2 / 总16','37241606x0-01','数经1251;数经1252;数经1253;数经1254','面授讲课'],
  [4,3,4,'数字经济发展与挑战专题*','9-10周','明德楼B1402 (多)','文雨辰','考查','1.0','理论16 / 周2 / 总16','37241606x0-01','数经1251;数经1252;数经1253;数经1254','面授讲课'],
  [4,5,6,'数字经济概论*','1-8周','钟海楼03035 (多)','韩东初','考查','2.0','理论32 / 周4 / 总32','37221610x0-01','数经1251;数经1252;数经1253',''],
  [4,5,6,'区域经济学*','9-10周,12-16周','广学楼601 (多)','高溦','考试','2.0','理论32 / 周2 / 总32','37241301x0-01','数经1251;数经1252;数经1253',''],
  [4,7,8,'宏观经济学*','1-5周,7-12周','广学楼610 (多)','周奇美','考试','3.0','理论48 / 周3 / 总48','37241202x0-01','数经1251;数经1252;数经1253',''],
  [4,9,10,'劳动教育2*','第2周','广学楼323 (多)','李斯雯','考查','0.0','理论2,实验6 / 周2 / 总2','j3731708x2-08','数经1251;数经1252',''],
  [5,1,2,'海洋经济学*','9-12周','明德楼B1202 (多)','高溦','考试','2.0','理论32 / 周4 / 总32','37211609x0-04','数经1251;数经1252;数经1253','面授讲课'],
  [5,3,4,'线性代数*','1-8周','广学楼228 (多)','吴龙渊','考试','2.0','理论32 / 周2 / 总32','32411102x0-07','数经1251;数经1252;数经1253;数经1254',''],
  [5,3,4,'全球经济与数字化转型专题*','9-10周','钟海楼03023 (多)','罗帅','考查','1.0','理论16 / 周2 / 总16','37241603x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252','面授讲课'],
  [5,3,4,'全球经济与数字化转型专题*','13-14周','钟海楼03023 (多)','胡兴艳','考查','1.0','理论16 / 周2 / 总16','37241603x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252','面授讲课'],
  [5,3,4,'全球经济与数字化转型专题*','15-16周','钟海楼03023 (多)','邢浩特','考查','1.0','理论16 / 周2 / 总16','37241603x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252','面授讲课'],
  [5,5,6,'区域经济学*','9-16周','广学楼609 (多)','高溦','考试','2.0','理论32 / 周2 / 总32','37241301x0-01','数经1251;数经1252;数经1253',''],
  [5,7,8,'经济建模与Python应用*','1-8周','广学楼519 (多)','侯宇恒','考试','2.0','理论32 / 周4 / 总32','37321610x0-01','数经1251;数经1252',''],
  [5,9,10,'宏观经济学*','第9周','广学楼313 (多)','周奇美','考试','3.0','理论48 / 周3 / 总48','37241202x0-01','数经1251;数经1252;数经1253',''],
  [5,9,10,'全球经济与数字化转型专题*','11-12周','钟海楼03023 (多)','高溦','考查','1.0','理论16 / 周2 / 总16','37241603x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252','面授讲课'],
  [6,1,2,'线性代数*','第6周','广学楼228 (多)','吴龙渊','考试','2.0','理论32 / 周2 / 总32','32411102x0-07','数经1251;数经1252;数经1253;数经1254',''],
  [6,1,2,'海洋经济学*','9-12周','明德楼B1202 (多)','高溦','考试','2.0','理论32 / 周4 / 总32','37211609x0-04','数经1251;数经1252;数经1253','面授讲课'],
  [6,1,2,'海洋经济学*','13-14周,16-17周','明德楼B1202 (多)','姚微','考试','2.0','理论32 / 周4 / 总32','37211609x0-04','数经1251;数经1252;数经1253','面授讲课'],
  [6,7,8,'习近平经济思想概论*','7-8周,11-12周,14周','明德楼B5401 (多)','赵亮','考试','2.0','理论32 / 周4 / 总32','37210312x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252',''],
  [6,7,8,'习近平经济思想概论*','9-10周,13周','明德楼B5401 (多)','陈琦','考试','2.0','理论32 / 周4 / 总32','37210312x0-01','数经1251;数经1252;数经1253;数经1254;应经1251;应经1252',''],
  [6,9,10,'食品营养学*','第6周','明德楼B5401 (多)','王海清','考查','1.5','理论24 / 周2 / 总24','12192001x0-02','无','面授讲课'],
  [7,1,2,'海洋经济学*','14-17周','明德楼B1202 (多)','姚微','考试','2.0','理论32 / 周4 / 总32','37211609x0-04','数经1251;数经1252;数经1253','面授讲课'],
  [7,3,4,'大学英语听说III$','第3周','博文楼B304','黄津沙','考试','0.5','实验14 / 周2 / 总14','23112701x3-66','数经1251;数经1252',''],
  [7,5,6,'马克思主义基本原理*','第3周','钟海楼03021 (多)','卢灿丽','考试','2.5','理论40 / 周4 / 总40','27111301x0-21','数经1251;数经1252;数经1253;数经1254',''],
  [7,5,6,'形势与政策教育3*','10-13周','广学楼330 (多)','丘有光','考查','0.25','理论8 / 周2 / 总8','28511401x3-49','国贸1251;国贸1252;数经1251;数经1252;数经1253;数经1254;应经1251;应经1252',''],
  [7,7,8,'宏观经济学*','3周,12周','广学楼610 (多)','周奇美','考试','3.0','理论48 / 周3 / 总48','37241202x0-01','数经1251;数经1252;数经1253','']
];

const OTHERS = [
  { name:'劳动教育2', kind:'实验', teacher:'李斯雯', weeks:'3-5周', count:'共3周' },
  { name:'创新创业基础教育', kind:'理论', teacher:'蔡静俏', weeks:'1-16周', count:'共16周' },
  { name:'海洋经济学课程实习', kind:'实践', teacher:'赵亮', weeks:'1-19周', count:'共19周' }
];

const COLORS = {
  '数字经济概论':'#e8843c', '经济建模与Python应用':'#2f9e6f', '经济建模与Python应用实验':'#2f9e6f',
  '排球':'#d95f8a', '区域经济学':'#c2417a', '宏观经济学':'#5468d8', '海洋经济学':'#0f9b8e',
  '海洋经济学课程实习':'#0f9b8e', '线性代数':'#7c5cd6', '习近平经济思想概论':'#d9504e',
  '马克思主义基本原理':'#c76a3f', '形势与政策教育3':'#8a6bb0', '劳动教育2':'#55a06a',
  '创新创业基础教育':'#7b8496', '全球经济与数字化转型专题':'#a05bbd',
  '数字经济发展与挑战专题':'#2b9aa8', '食品营养学':'#e0a02f',
  '大学英语听说III':'#3f7ad6', '大学英语读写III':'#3f7ad6'
};

function kindOf(raw){
  if (raw.endsWith('$')) return '实验';
  if (raw.endsWith('&')) return '实践';
  return '理论';
}
const SESSIONS = RAW.map((r,i) => {
  const mark = r[3].slice(-1);
  const name = (mark === '*' || mark === '$' || mark === '&') ? r[3].slice(0,-1) : r[3];
  return { id:i+1, d:r[0], s:r[1], e:r[2], name, kind:kindOf(r[3]), weeksText:r[4],
    room:r[5], teacher:r[6], exam:r[7], credit:r[8], hours:r[9], classId:r[10], group:r[11], mode:r[12] };
});

/* ---------- 工具 ---------- */
const $ = sel => document.querySelector(sel);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function parseDate(str){ const [y,m,d] = str.split('-').map(Number); return new Date(y, m-1, d); }
function dateStr(d){ return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
function addDays(d,n){ const x = new Date(d.getTime()); x.setDate(x.getDate()+n); return x; }
function mondayOf(d){ const x = new Date(d.getTime()); const off = (x.getDay()+6)%7; x.setDate(x.getDate()-off); return x; }
const TODAY = new Date(); TODAY.setHours(0,0,0,0);
const TODAY_STR = dateStr(TODAY);

const weekCache = {};
function weeksOf(text){
  if (weekCache[text]) return weekCache[text];
  const set = new Set();
  String(text).replace(/\s/g,'').split(/[,，;；]/).forEach(part => {
    let m = part.match(/^(?:第)?(\d+)-(\d+)周?(?:\(([单双])\))?$/);
    if (m){
      let a = +m[1], b = +m[2], parity = m[3];
      for (let w=a; w<=b; w++) if (!parity || (parity === '双' ? w%2===0 : w%2===1)) set.add(w);
      return;
    }
    m = part.match(/^(?:第)?(\d+)周?$/);
    if (m) set.add(+m[1]);
  });
  weekCache[text] = set;
  return set;
}
function timeRange(s){
  if (s.s === 3 && s.e === 4 && /广学楼|明德楼/.test(s.room)) return '10:05–11:35';
  if (s.s === 7 && s.e === 8 && /广学楼|明德楼/.test(s.room)) return '16:25–17:55';
  if (s.s === 3 && s.e === 4) return '10:15–11:50';
  if (s.s === 7 && s.e === 8) return '16:30–18:05';
  return SLOTS[s.s-1][0] + '–' + SLOTS[s.e-1][1];
}
function minutes(hhmm){ const [h,m] = hhmm.split(':').map(Number); return h*60+m; }
function colorOf(s){ return COLORS[s.name] || '#c0397c'; }
function setting(key, fallback){
  try { const v = localStorage.getItem('luo-schedule-' + key); return v === null ? fallback : v; }
  catch(e){ return fallback; }
}
function saveSetting(key, val){ try { localStorage.setItem('luo-schedule-' + key, val); } catch(e){} }
function semesterStart(){ return parseDate(setting('start', START_DEFAULT)); }
function currentWeek(date){
  const manual = setting('manualWeek','').trim();
  if (manual) return Math.min(TOTAL_WEEKS, Math.max(1, parseInt(manual,10) || 1));
  const diff = Math.floor((date.getTime() - semesterStart().getTime()) / 86400000);
  return diff < 0 ? 0 : Math.floor(diff/7) + 1;
}
function weekLabel(w){ return w > 0 && w <= TOTAL_WEEKS ? '第 ' + w + ' 周' : '学期外'; }
function sessionsOn(date){
  const w = currentWeek(date), dow = (date.getDay() || 7);
  return SESSIONS.filter(s => s.d === dow && weeksOf(s.weeksText).has(w)).sort((a,b) => a.s-b.s);
}
function greeting(){
  const h = new Date().getHours();
  return h < 6 ? '夜深了' : h < 11 ? '早上好' : h < 14 ? '中午好' : h < 18 ? '下午好' : '晚上好';
}

let state = {
  tab: 'today',
  selectedDate: new Date(TODAY.getTime()),
  week: currentWeek(TODAY)
};
const hashTab = (location.hash || '').slice(1);
if (['today','week','courses','settings'].includes(hashTab)) state.tab = hashTab;
let deferredPrompt = null;
let toastTimer = null;
function toast(msg){
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- 渲染 ---------- */
function statusOf(s, date){
  if (dateStr(date) !== TODAY_STR) return '';
  const [a,b] = timeRange(s).split('–').map(minutes);
  const now = new Date().getHours()*60 + new Date().getMinutes();
  if (now >= a && now < b) return 'now';
  if (now < a) return 'next';
  return 'done';
}
function cardHTML(s, date, allowStatus){
  const st = allowStatus ? statusOf(s, date) : '';
  const statusText = st === 'now' ? '<span class="status now">进行中</span>'
    : st === 'next' ? '<span class="status next">即将开始</span>' : '';
  const c = colorOf(s);
  return `<article class="course-card ${st === 'done' ? 'past' : ''}" data-id="${s.id}">
    <div class="rail" style="background:${c}"></div>
    <div class="body">
      <div class="row"><span class="course-name">${esc(s.name)}</span>
        ${s.kind !== '理论' ? `<span class="tag ${s.kind === '实验' ? 'exp' : 'pra'}">${s.kind}</span>` : ''}
        ${statusText}</div>
      <div class="course-time">${timeRange(s)} <span style="color:var(--ink-3);font-weight:400">· 第${s.s}-${s.e}节</span></div>
      <div class="course-room"><svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>${esc(s.room)}</div>
      <div class="course-foot"><span>${esc(s.teacher)}</span><span>${esc(s.weeksText)}</span><span>${esc(s.exam)} · ${esc(s.credit)}学分</span></div>
    </div>
  </article>`;
}
function nextClass(){
  const now = new Date();
  const today = sessionsOn(TODAY).filter(s => {
    const a = minutes(timeRange(s).split('–')[0]);
    return a > now.getHours()*60 + now.getMinutes();
  });
  if (today.length) return { date: new Date(TODAY.getTime()), s: today[0] };
  for (let i=1; i<=20; i++){
    const d = addDays(TODAY, i), list = sessionsOn(d);
    if (list.length) return { date:d, s:list[0] };
  }
  return null;
}
function nextBox(){
  const n = nextClass();
  if (!n) return '<div class="next-box"><div class="label">下一节课</div><div class="line">近期没有找到课程</div></div>';
  return `<div class="next-box"><div class="label">下一节课</div>
    <div class="line">${dateStr(n.date) === TODAY_STR ? '今天' : (n.date.getMonth()+1)+'月'+n.date.getDate()+'日 '+DOW[(n.date.getDay()+6)%7]} · ${esc(n.s.name)}</div>
    <div class="sub">${timeRange(n.s)} · ${esc(n.s.room)} · ${esc(n.s.weeksText)}</div></div>`;
}
const TIMING_NOTE = '上课时间：广学楼、明德楼第3-4节连上 10:05–11:35，第7-8节连上 16:25–17:55；其他楼宇按校历时间。调课以教务通知为准。';

function renderHero(){
  const d = state.selectedDate, w = currentWeek(d);
  const list = sessionsOn(d);
  const isToday = dateStr(d) === TODAY_STR;
  const mon = mondayOf(d);
  const chips = Array.from({length:7}, (_,i) => {
    const x = addDays(mon,i), ds = dateStr(x);
    const cls = ['daychip'];
    if (sessionsOn(x).length) cls.push('has');
    if (ds === dateStr(d)) cls.push('active');
    if (ds === TODAY_STR) cls.push('today');
    return `<button class="${cls.join(' ')}" data-date="${ds}" type="button">
      <span class="dow">${DOW[i]}</span><span class="num">${x.getDate()}</span><span class="dot"></span></button>`;
  }).join('');
  $('#hero').innerHTML = `
    <div class="hero-top"><span>2026-2027-1 · 湖光校区</span><span class="week-pill">${weekLabel(w)}</span></div>
    <h1>${d.getMonth()+1}月${d.getDate()}日 · ${DOW[(d.getDay()+6)%7]}</h1>
    <div class="hero-sub">${isToday ? greeting()+'，骆浩维 · ' : ''}${list.length ? '今天有 '+list.length+' 节课' : '今天没有课'}</div>
    <div class="daystrip">${chips}</div>`;
}
function viewToday(){
  const d = state.selectedDate, list = sessionsOn(d);
  if (!list.length){
    return `<div class="card empty">
        <div class="empty-icon"><svg viewBox="0 0 24 24"><path d="M4 7h16v13H4zM8 3v4m8-4v4M4 12h16M9 16h6"/></svg></div>
        <h3>今天没有安排课程</h3><p>可以休息一下，或者提前看看后面的课。</p>
        ${nextBox()}
      </div>
      <div class="note-box">${TIMING_NOTE}</div>`;
  }
  let nextMarked = false;
  const cards = list.map(s => {
    let html = cardHTML(s, d, true);
    if (!nextMarked && statusOf(s,d) === 'next'){ html = html.replace('class="course-card ', 'class="course-card highlight '); nextMarked = true; }
    return html;
  }).join('');
  return `<div class="section-head"><span class="section-title">${dateStr(d) === TODAY_STR ? '今天的课' : '当天课程'}</span><span class="section-hint">共 ${list.length} 节</span></div>
    ${cards}<div class="note-box">${TIMING_NOTE}</div>`;
}
function viewWeek(){
  const w = Math.min(TOTAL_WEEKS, Math.max(1, state.week));
  const mon = mondayOf(parseDate(setting('start', START_DEFAULT)));
  const first = addDays(mon, (w-1)*7), last = addDays(first, 6);
  const groups = Array.from({length:7}, (_,i) => {
    const d = addDays(first,i), list = sessionsOn(d);
    const isToday = dateStr(d) === TODAY_STR;
    return `<div class="daygroup ${isToday ? 'today' : ''}">
      <div class="daygroup-head"><b>${DOW[i]}</b><span>${d.getMonth()+1}/${d.getDate()}</span>${isToday ? '<span class="cnt">今天</span>' : `<span class="cnt">${list.length} 节</span>`}</div>
      ${list.length ? list.map(s => cardHTML(s, d, false)).join('') : '<div class="noclass">无课</div>'}
    </div>`;
  }).join('');
  return `<div class="weeknav">
      <button data-week="${w-1}" type="button" ${w <= 1 ? 'disabled' : ''} aria-label="上一周"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
      <div class="center"><strong>第 ${w} 周</strong><small>${first.getMonth()+1}/${first.getDate()} – ${last.getMonth()+1}/${last.getDate()}</small></div>
      <button data-week="${w+1}" type="button" ${w >= TOTAL_WEEKS ? 'disabled' : ''} aria-label="下一周"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
    </div>${groups}<div class="note-box">${TIMING_NOTE}</div>`;
}
function viewCourses(){
  const map = new Map();
  SESSIONS.forEach(s => {
    const key = s.name + '|' + s.kind;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  });
  const groups = Array.from(map.entries()).map(([key, arr]) => {
    const s = arr[0], c = colorOf(s);
    const slots = arr.map(x => `<div class="slot" data-id="${x.id}">
        <span class="when">${DOW[x.d-1]} ${x.s}-${x.e}节</span>
        <span class="where">${esc(x.room)}<div class="weeks">${esc(x.weeksText)} · ${esc(x.teacher)}</div></span>
      </div>`).join('');
    return `<div class="course-group">
      <div class="course-group-head"><span class="color-dot" style="background:${c}"></span><span class="name">${esc(s.name)}</span><span class="meta">${esc(s.teacher)} · ${esc(s.credit)}学分 · ${esc(s.exam)}</span></div>
      ${slots}</div>`;
  }).join('');
  const others = OTHERS.map(o => `<div class="other-item">
      <span class="color-dot" style="background:${COLORS[o.name] || '#7b8496'}"></span>
      <span class="txt"><b>${esc(o.name)} <span class="tag ${o.kind === '实验' ? 'exp' : o.kind === '实践' ? 'pra' : ''}">${o.kind}</span></b><small>${esc(o.teacher)} · ${esc(o.weeksText)} · ${esc(o.count)}</small></span>
    </div>`).join('');
  return `<div class="section-head"><span class="section-title">全部课程</span><span class="section-hint">${SESSIONS.length} 个课次 · ${map.size} 门课</span></div>
    ${groups}<div class="section-head" style="margin-top:18px"><span class="section-title">其他课程</span><span class="section-hint">无固定时间</span></div>
    <div class="other-list">${others}</div>`;
}
function viewSettings(){
  const start = setting('start', START_DEFAULT), manual = setting('manualWeek','');
  const installBtn = deferredPrompt ? '<button class="btn wide" id="installBtn" type="button">安装到手机主屏幕</button>' : '';
  return `<div class="note-box">这是一个可以添加到手机主屏幕的离线课表：打开一次后，断网也能查看。课次按 PDF 原表录入，临时调课请以教务通知为准。</div>
    <div class="set-card">
      <div class="set-row"><span class="label">开学日期<span class="val"><br>第 1 周周一是哪天</span></span><input type="date" id="startInput" value="${esc(start)}"></div>
      <div class="set-row"><span class="label">手动指定周次<span class="val"><br>留空则按开学日期自动计算</span></span><input type="number" id="weekInput" min="1" max="20" placeholder="自动" value="${esc(manual)}"></div>
    </div>
    <div class="set-card" style="padding:14px 16px">
      <div style="font-weight:700;margin-bottom:4px">安装到手机</div>
      <div class="tips" style="margin:0 0 12px">
        <b>iPhone：</b>用 Safari 打开本页 → 点底部分享按钮 <span class="kbd">⬆</span> → 选「添加到主屏幕」。<br>
        <b>安卓：</b>用 Chrome / Edge 打开本页 → 右上角菜单 → 选「安装应用」或「添加到主屏幕」。
      </div>
      ${installBtn}
    </div>
    <div class="set-card" style="padding:14px 16px">
      <div style="font-weight:700;margin-bottom:6px">数据来源</div>
      <div class="tips" style="margin:0">《骆浩维(2026-2027-1)课表.pdf》<br>学号 202511511217 · 打印时间 2026-11-23<br>湖光校区 · 教学周 1-18 周，19-20 周考试</div>
      <button class="btn danger" id="resetBtn" type="button">恢复默认设置</button>
    </div>
    <div class="brand-line">浩维课表 · 离线可用</div>`;
}
function render(){
  renderHero();
  $('#view').innerHTML = (state.tab === 'today' ? viewToday()
    : state.tab === 'week' ? viewWeek()
    : state.tab === 'courses' ? viewCourses() : viewSettings())
    + (state.tab === 'today' ? '<div class="made-by">这是钟幸运爷爷做的课表</div>' : '');
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === state.tab));
  window.scrollTo({top:0, behavior:'instant'});
}
function openSheet(id){
  const s = SESSIONS.find(x => x.id === Number(id)); if (!s) return;
  const c = colorOf(s);
  const staggered = /广学楼|明德楼/.test(s.room) && ((s.s === 3 && s.e === 4) || (s.s === 7 && s.e === 8));
  $('#sheet').innerHTML = `<div class="sheet-bar"></div>
    <div style="display:flex;align-items:center;gap:9px"><span class="color-dot" style="background:${c};width:11px;height:11px"></span><h2>${esc(s.name)}</h2><button id="closeSheet" style="margin-left:auto;color:var(--ink-3);font-size:12px" type="button">关闭 ✕</button></div>
    <div class="sheet-sub">${DOW[s.d-1]} · 第 ${s.s}-${s.e} 节 · ${timeRange(s)}</div>
    <div class="detail-grid">
      <span class="k">周次</span><span class="v">${esc(s.weeksText)}</span>
      <span class="k">场地</span><span class="v">${esc(s.room)}（湖光校区）</span>
      <span class="k">教师</span><span class="v">${esc(s.teacher)}</span>
      <span class="k">课程类型</span><span class="v">${esc(s.kind)} ${s.mode ? '· '+esc(s.mode) : ''}</span>
      <span class="k">考核方式</span><span class="v">${esc(s.exam)}</span>
      <span class="k">学分学时</span><span class="v">${esc(s.credit)} 学分 · ${esc(s.hours)}</span>
      <span class="k">教学班</span><span class="v">(2026-2027-1)-${esc(s.classId)}</span>
      <span class="k">组成</span><span class="v">${esc(s.group)}</span>
    </div>
    <div class="detail-note">${staggered ? '该时段在广学楼 / 明德楼连上，取消课间休息。' : ''}${TIMING_NOTE}</div>`;
  $('#sheetMask').hidden = false; $('#sheet').hidden = false;
}
function closeSheet(){ $('#sheetMask').hidden = true; $('#sheet').hidden = true; }

/* ---------- 事件 ---------- */
$('#tabbar').addEventListener('click', e => {
  const btn = e.target.closest('.tab'); if (!btn) return;
  state.tab = btn.dataset.tab; render();
});
$('#hero').addEventListener('click', e => {
  const chip = e.target.closest('[data-date]'); if (!chip) return;
  state.selectedDate = parseDate(chip.dataset.date);
  state.week = currentWeek(state.selectedDate);
  render();
});
$('#view').addEventListener('click', e => {
  const nav = e.target.closest('[data-week]');
  if (nav){ state.week = Number(nav.dataset.week); render(); return; }
  const card = e.target.closest('[data-id]');
  if (card){ openSheet(card.dataset.id); return; }
  if (e.target.closest('#installBtn') && deferredPrompt){
    deferredPrompt.prompt(); deferredPrompt = null; render();
    return;
  }
  if (e.target.closest('#resetBtn')){
    saveSetting('start', START_DEFAULT); saveSetting('manualWeek','');
    state.week = currentWeek(new Date()); render(); toast('已恢复默认设置'); return;
  }
});
$('#view').addEventListener('change', e => {
  if (e.target.id === 'startInput'){ saveSetting('start', e.target.value || START_DEFAULT); state.week = currentWeek(new Date()); render(); toast('开学日期已更新'); }
  if (e.target.id === 'weekInput'){ saveSetting('manualWeek', e.target.value.trim()); state.week = currentWeek(new Date()); render(); toast('周次已更新'); }
});
$('#sheet').addEventListener('click', e => { if (e.target.closest('#closeSheet')) closeSheet(); });
$('#sheetMask').addEventListener('click', closeSheet);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (state.tab === 'settings') render(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; toast('已安装到主屏幕'); });

if ('serviceWorker' in navigator && location.protocol !== 'file:'){
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
render();
