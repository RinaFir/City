const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const worlds = $$('.world-card');
const workbench = $('#workbench');
const selectorInput = $('#selector-input');
const scene = $('#selector-scene');
const feedback = $('#selector-feedback');
const count = $('#scene-count');

function applySelector() {
  $$('.sample-card', scene).forEach(card => card.classList.remove('selected'));
  const selector = selectorInput.value.trim();
  if (!selector) {
    feedback.textContent = 'Введи селектор, чтобы проверить его.';
    feedback.className = 'selector-feedback bad';
    count.textContent = '0 элементов выбрано';
    return;
  }
  try {
    const matches = $$(selector, scene);
    matches.forEach(el => { if (el.classList.contains('sample-card')) el.classList.add('selected'); });
    const cards = matches.filter(el => el.classList.contains('sample-card'));
    count.textContent = cards.length + ' элементов выбрано';
    feedback.className = 'selector-feedback ' + (cards.length ? 'good' : '');
    feedback.textContent = cards.length
      ? 'Сработало: браузер нашёл ' + cards.length + ' ' + (cards.length === 1 ? 'элемент' : 'элемента') + '. Посмотри, почему выбраны именно они.'
      : 'Синтаксис допустим, но в этой сцене ничего не найдено. Попробуй другой селектор.';
  } catch (err) {
    feedback.textContent = 'Ошибка селектора: ' + err.message;
    feedback.className = 'selector-feedback bad';
    count.textContent = 'Селектор не разобран';
  }
}
$('#apply-selector').addEventListener('click', applySelector);
selectorInput.addEventListener('keydown', e => { if (e.key === 'Enter') applySelector(); });
$$('[data-selector]').forEach(btn => btn.addEventListener('click', () => { selectorInput.value = btn.dataset.selector; applySelector(); }));
$('#reset-world').addEventListener('click', () => {
  const activeWorld = worlds.find(card => card.classList.contains('active'))?.dataset.world || 'selectors';
  showWorld(activeWorld);
});
applySelector();

const moduleData = {
  selectors: {
    kicker:'МИР 01 · CSS SELECTORS', title:'Selector Lab', level:'ПРАКТИКА · 01',
    mission:'Найди карточки с изображением',
    copy:'Выбери элементы .sample-card, внутри которых есть изображение. Подсказка: условие можно записать прямо в селекторе.',
    hint:'Попробуй :has(.sample-visual). Это проверка содержимого элемента.'
  },
  flex: {
    kicker:'МИР 02 · FLEXBOX', title:'Flex Arena', level:'ПРАКТИКА · 01',
    mission:'Собери боевой строй',
    copy:'Управляй расположением отряда. Меняй направление, выравнивание и распределение свободного места — бойцы перестраиваются по настоящим правилам Flexbox.',
    hint:'Начни с justify-content: оно распределяет элементы вдоль главной оси.'
  },
  grid: {
    kicker:'МИР 03 · CSS GRID', title:'Grid Garden', level:'ПРАКТИКА · 01',
    mission:'Спланируй грядки',
    copy:'Управляй сеткой сада. Меняй число колонок и размер промежутков. Каждая грядка — отдельная ячейка CSS Grid.',
    hint:'grid-template-columns задаёт колонки. Попробуй 1fr 2fr 1fr.'
  }
};
function showWorld(world) {
  worlds.forEach(card => card.classList.toggle('active', card.dataset.world === world));
  const data = moduleData[world];
  $('#module-kicker').textContent = data.kicker;
  $('#module-title').textContent = data.title;
  $('#module-level').textContent = data.level;
  $('#mission-title').textContent = data.mission;
  $('#mission-copy').textContent = data.copy;
  $('#mission-hint').textContent = data.hint;
  const exp = $('.experiment');
  if (world === 'selectors') {
    exp.innerHTML = `
      <div class="experiment-top"><span>ЖИВАЯ СЦЕНА</span><span class="scene-count" id="scene-count">0 элементов выбрано</span></div>
      <div class="scene" id="selector-scene">
        <article class="sample-card" data-kind="image"><span class="sample-visual landscape">▧</span><span class="sample-name">Пейзаж</span><small>.card · img</small></article>
        <article class="sample-card" data-kind="text"><span class="sample-visual text-visual">Aa</span><span class="sample-name">Типографика</span><small>.card · без img</small></article>
        <article class="sample-card featured" data-kind="image"><span class="sample-visual portrait">◉</span><span class="sample-name">Портрет</span><small>.card.active · img</small></article>
        <article class="sample-card" data-kind="empty"><span class="sample-visual empty-visual">＋</span><span class="sample-name">Пустая</span><small>.card · пусто</small></article>
      </div>
      <div class="code-panel"><div class="code-panel-head"><span>ТВОЙ CSS-СЕЛЕКТОР</span><span class="editor-live"><i></i> LIVE PREVIEW</span></div>
      <div class="code-input-wrap"><span class="code-line">1</span><input id="selector-input" spellcheck="false" autocomplete="off" value=".sample-card:has(.landscape)" aria-label="CSS селектор"><button id="apply-selector" class="apply-button">ПРИМЕНИТЬ ↗</button></div>
      <div class="selector-feedback" id="selector-feedback" aria-live="polite">Измени селектор и посмотри результат.</div></div>
      <div class="quick-selectors"><span>ПОПРОБУЙ:</span><button data-selector=".sample-card:has(.sample-visual)">:has()</button><button data-selector=".sample-card:not(.featured)">:not()</button><button data-selector=":is(.featured, [data-kind='empty'])">:is()</button><button data-selector=".sample-card:nth-child(2n)">:nth-child()</button></div>`;
    const input=$('#selector-input');
    const run=()=>{const root=$('#selector-scene');$$('.sample-card',root).forEach(c=>c.classList.remove('selected'));try{const found=$$(input.value,root).filter(el=>el.classList.contains('sample-card'));found.forEach(el=>el.classList.add('selected'));$('#scene-count').textContent=found.length+' элементов выбрано';$('#selector-feedback').textContent=found.length?'Браузер нашёл '+found.length+' элементов. Посмотри, почему выбраны именно они.':'Синтаксис допустим, совпадений нет.';$('#selector-feedback').className='selector-feedback '+(found.length?'good':'')}catch(e){$('#selector-feedback').textContent='Ошибка селектора: '+e.message;$('#selector-feedback').className='selector-feedback bad'}};
    $('#apply-selector').addEventListener('click',run);input.addEventListener('keydown',e=>{if(e.key==='Enter')run()});$$('[data-selector]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.selector;run()}));run();
    $('#concept-list').innerHTML='<span class="concept current">:has()</span><span class="concept">:not()</span><span class="concept">:is()</span><span class="concept">::before / ::after</span>';
  } else if (world === 'flex') {
    exp.innerHTML = `
      <div class="experiment-top"><span>БОЕВАЯ ПОЗИЦИЯ · FLEX CONTAINER</span><span class="scene-count">4 бойца</span></div>
      <div class="arena" id="arena"><div class="fighter">♟<small>SCOUT</small></div><div class="fighter">♜<small>GUARD</small></div><div class="fighter">♞<small>RIDER</small></div><div class="fighter">♟<small>ARCHER</small></div></div>
      <div class="control-row">
        <div class="control"><label for="flex-direction">FLEX-DIRECTION</label><select id="flex-direction"><option>row</option><option>row-reverse</option><option>column</option><option>column-reverse</option></select></div>
        <div class="control"><label for="justify-content">JUSTIFY-CONTENT</label><select id="justify-content"><option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option><option>space-around</option><option>space-evenly</option></select></div>
        <div class="control"><label for="align-items">ALIGN-ITEMS</label><select id="align-items"><option>center</option><option>flex-start</option><option>flex-end</option><option>stretch</option></select></div>
      </div>
      <p class="world-note"><strong>Наблюдай:</strong> главная ось меняется вместе с flex-direction. Поэтому justify-content и align-items могут менять направление действия.</p>`;
    const arena=$('#arena');
    ['flex-direction','justify-content','align-items'].forEach(id=>$('#'+id).addEventListener('change',()=>{arena.style[id.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=$('#'+id).value}));
    $('#concept-list').innerHTML='<span class="concept current">display: flex</span><span class="concept">justify-content</span><span class="concept">align-items</span><span class="concept">flex-direction</span>';
  } else {
    exp.innerHTML = `
      <div class="experiment-top"><span>ПЛАН САДА · GRID CONTAINER</span><span class="scene-count">9 грядок</span></div>
      <div class="garden" id="garden"><div class="plot">🌱</div><div class="plot">🥕</div><div class="plot">🌿</div><div class="plot">🌷</div><div class="plot">🍓</div><div class="plot">🌱</div><div class="plot">🌻</div><div class="plot">🥬</div><div class="plot">🌿</div></div>
      <div class="control-row">
        <div class="control"><label for="grid-columns">GRID-TEMPLATE-COLUMNS</label><select id="grid-columns"><option value="1fr 1fr 1fr">1fr 1fr 1fr</option><option value="1fr 2fr 1fr">1fr 2fr 1fr</option><option value="repeat(2, 1fr)">repeat(2, 1fr)</option><option value="repeat(4, 1fr)">repeat(4, 1fr)</option><option value="120px 1fr 2fr">120px 1fr 2fr</option></select></div>
        <div class="control"><label for="grid-gap">GAP</label><select id="grid-gap"><option value="8px">8px</option><option value="2px">2px</option><option value="16px">16px</option><option value="24px">24px</option></select></div>
      </div>
      <p class="world-note"><strong>Наблюдай:</strong> каждая колонка получает долю свободного пространства. 2fr — вдвое больше, чем 1fr, если нет других ограничений.</p>`;
    $('#grid-columns').addEventListener('change',e=>$('#garden').style.gridTemplateColumns=e.target.value);
    $('#grid-gap').addEventListener('change',e=>$('#garden').style.gap=e.target.value);
    $('#concept-list').innerHTML='<span class="concept current">display: grid</span><span class="concept">grid-template-columns</span><span class="concept">fr</span><span class="concept">gap</span>';
  }
}
worlds.forEach(card=>card.addEventListener('click',()=>{showWorld(card.dataset.world);workbench.scrollIntoView({behavior:'smooth',block:'start'})}));
