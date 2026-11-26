(() => {
  const $ = id => document.getElementById(id);
  const frame=document.querySelector('.city-frame'), input=$('css-input'), status=$('status');
  const referenceLibrary={
    frame:{title:'Рамка и контур',items:[
      ['border','Сокращённая запись рамки: толщина + стиль линии + цвет.',[
        ['Порядок частей','Например: 2px solid #60a4a1. Части можно записывать в любом порядке.'],
        ['Толщина','thin, medium, thick или размер: 1px, 2px, 0.15rem.'],
        ['Стиль линии','solid — сплошная; dashed — штрихи; dotted — точки; double — двойная; groove/ridge — объёмная; inset/outset — вдавленная/выступающая; none — без линии.'],
        ['Цвет','Название цвета, HEX (#60a4a1), rgb(), hsl(), transparent.']
      ]],
      ['border-width','Толщина рамки. Принимает thin, medium, thick или размер в px/rem и других единицах.',[
        ['Одна величина','Одинаковая толщина со всех сторон.'],
        ['Две величины','Первая — верх/низ, вторая — лево/право.'],
        ['Четыре величины','По часовой стрелке: верх, право, низ, лево.']
      ]],
      ['border-style','Вид линии рамки. Без видимого стиля рамка не отображается.',[
        ['solid','Сплошная линия.'],
        ['dashed','Линия из штрихов.'],
        ['dotted','Линия из точек.'],
        ['double','Две параллельные линии.'],
        ['groove / ridge','Объёмная борозда или выступ.'],
        ['inset / outset','Эффект вдавленной или выступающей рамки.'],
        ['none / hidden','Рамка не рисуется.']
      ]],
      ['border-color','Цвет рамки. Можно задать один цвет или цвета отдельных сторон.',[
        ['Один цвет','Все четыре стороны одного цвета.'],
        ['Два значения','Первое — верх/низ, второе — лево/право.'],
        ['Четыре значения','По часовой стрелке: верх, право, низ, лево.'],
        ['Форматы цвета','Имена (teal), HEX (#60a4a1), rgb(), hsl(), transparent.']
      ]],
      ['border-radius','Скругляет углы рамки.',[
        ['px / rem','Фиксированный радиус: 8px, 1rem.'],
        ['%','Радиус относительно размеров элемента; 50% у квадрата даёт круг.'],
        ['Разные углы','Можно задать от одного до четырёх значений или обратиться к border-top-left-radius и другим углам.']
      ]]
    ]},
    outline:{title:'Внешний контур',items:[
      ['outline','Контур снаружи элемента. Не занимает место и не сдвигает соседей.',[
        ['Состав','Толщина + стиль + цвет, например 2px dashed #60a4a1.'],
        ['Отличие от border','Не участвует в размерах элемента; обычно рисуется поверх соседних областей.']
      ]],
      ['outline-style','Стиль внешнего контура: auto, solid, dashed, dotted, double, groove, ridge, inset, outset, none.',[
        ['solid / dashed / dotted','Сплошная, штриховая или точечная линия.'],
        ['double','Двойная линия.'],
        ['none','Контур отключён.']
      ]],
      ['outline-width','Толщина контура: thin, medium, thick или размер в единицах длины.',[]],
      ['outline-color','Цвет контура: имя, HEX, rgb(), hsl() или invert.',[]],
      ['outline-offset','Расстояние между краем элемента и контуром. Может быть положительным или отрицательным.',[]]
    ]},
    effects:{title:'Тень и прозрачность',items:[
      ['box-shadow','Добавляет тень или свечение вокруг элемента.',[
        ['Смещение по X и Y','Первые два значения задают сдвиг тени вправо/влево и вниз/вверх.'],
        ['Размытие','Третье значение: чем больше, тем мягче край. Например 12px.'],
        ['Распространение','Четвёртое значение увеличивает или уменьшает размер тени.'],
        ['Цвет','Можно использовать HEX, rgb(), rgba() и другие форматы.'],
        ['inset','Делает тень внутренней. Для свечения вокруг элемента обычно не нужен.'],
        ['Несколько теней','Несколько наборов значений разделяются запятыми.']
      ]],
      ['opacity','Прозрачность всего элемента вместе с его содержимым.',[
        ['0','Полностью прозрачный, элемент невидим.'],
        ['0.5','Половинная непрозрачность.'],
        ['1','Полностью непрозрачный.'],
        ['Диапазон','Число от 0 до 1; можно использовать и проценты в современных браузерах.']
      ]]
    ]},
    color:{title:'Цвет и фон',items:[
      ['color','Цвет текста и других передних элементов. Не задаёт цвет рамки или фон.',[
        ['Имена','red, teal, rebeccapurple и другие именованные цвета.'],
        ['HEX','#60a4a1; сокращённая запись возможна для некоторых цветов.'],
        ['RGB / HSL','rgb(96 164 161), hsl(...). Удобны для точной настройки оттенка.'],
        ['Прозрачность','Можно использовать alpha-канал: например rgb(96 164 161 / 50%).']
      ]],
      ['background-color','Заливает внутреннюю область элемента цветом.',[
        ['Форматы','Имена цветов, HEX, rgb(), hsl(), transparent.'],
        ['Прозрачный фон','transparent показывает то, что находится позади элемента.']
      ]],
      ['background','Сокращённая запись фона: цвет, изображение, градиент и параметры их размещения.',[
        ['Цвет','Можно задать цвет фона.'],
        ['Изображение','url(...) подключает изображение.'],
        ['Градиент','linear-gradient() — переход между цветами; radial-gradient() — круговой/радиальный переход.'],
        ['Размещение','Можно задать положение, повторение и размер фонового изображения.']
      ]],
      ['rgba() / alpha','Способ задать цвет с прозрачностью.',[
        ['Первые три компонента','Красный, зелёный и синий каналы цвета.'],
        ['Четвёртый компонент','Прозрачность от 0 (невидимый) до 1 (непрозрачный). Например rgba(96, 164, 161, 0.5).'],
        ['HEX с альфой','Формат #RRGGBBAA: последние две цифры задают прозрачность.']
      ]]
    ]},
    spacing:{title:'Промежутки',items:[
      ['gap','Расстояние между дочерними элементами flex- или grid-контейнера.',[
        ['Одно значение','Одинаковый промежуток между строками и колонками.'],
        ['Два значения','Первое — между строками, второе — между колонками.'],
        ['Единицы','px, rem, em, %, а также другие допустимые единицы длины.']
      ]],
      ['row-gap','Расстояние между рядами или строками сетки.',[
        ['Значения','Размер: 12px, 1rem и т. п.; normal — стандартный промежуток.']
      ]],
      ['column-gap','Расстояние между колонками.',[
        ['Значения','Размер: 12px, 1rem и т. п.; normal — стандартный промежуток.']
      ]]
    ]}
  };
  const renderReference=groups=>groups.map(group=>'<section class="reference-group"><h3>'+group.title+'</h3>'+group.items.map(([name,description,parts])=>'<details class="reference-property"><summary><code>'+name+'</code><span>'+description+'</span></summary>'+(parts&&parts.length?'<div class="reference-parts">'+parts.map(([label,detail])=>'<details class="reference-part"><summary>'+label+'</summary><p>'+detail+'</p></details>').join('')+'</div>':'')+'</details>').join('')+'</section>').join('')+'<p class="reference-note">Нажми на свойство, чтобы раскрыть его части. Нажми на часть, чтобы увидеть варианты и значения.</p>';

  const topics={
    selectors:{title:'Селекторы',tasks:[
      {title:'Подсвети левое здание',prompt:'Сделай рамку левого жилого здания бирюзовой (#60a4a1). Измени только это здание.',hint:'Выбери класс .building-left. Свойство border-color задаёт цвет рамки.',reference:[referenceLibrary.frame,referenceLibrary.outline,referenceLibrary.effects,referenceLibrary.color],solution:'.building-left {\n  border-color: #60a4a1;\n}',check:{selector:'.building-left',property:'border-top-color',expected:'rgb(96, 164, 161)'}}]},
    colors:{title:'Цвет и фон',tasks:[
      {title:'Подсвети центральную башню',prompt:'Сделай окна центральной башни бирюзовыми (#60a4a1). Окна других зданий не меняй.',hint:'Составной селектор: сначала класс здания, затем через пробел класс окон.',reference:[referenceLibrary.color],solution:'.building-center .window {\n  background: #60a4a1;\n}',check:{selector:'.building-center .window',property:'background-color',expected:'rgb(96, 164, 161)'}}]},
    spacing:{title:'Размеры и расстояния',tasks:[
      {title:'Раздвинь этажи',prompt:'Установи промежуток между этажами правого здания — ровно 12px.',hint:'Контейнер называется .building-floors. Свойство gap задаёт промежуток между его дочерними элементами.',reference:[referenceLibrary.spacing],solution:'.building-right .building-floors {\n  gap: 12px;\n}',check:{selector:'.building-right .building-floors',property:'row-gap',expected:'12px'}}]},
    effects:{title:'Эффекты',tasks:[
      {title:'Сделай окна прозрачнее',prompt:'Установи прозрачность окон центральной башни на 0.55 (55%).',hint:'Выбери окна центрального здания и задай opacity.',reference:[referenceLibrary.effects],solution:'.building-center .window {\n  opacity: 0.55;\n}',check:{selector:'.building-center .window',property:'opacity',expected:'0.55'}}]}
  };
  let topic='selectors',index=0,pending=null,request=0,done=false;
  const apply=()=>frame.contentWindow?.postMessage({type:'NOCTURNE_APPLY_CSS',css:input.value},'*');
  const setStatus=(s,kind='')=>{status.textContent=s;status.className='status'+(kind?' '+kind:'');};
  const current=()=>topics[topic].tasks[index];
  function render(){
    const data=topics[topic],task=current();
    $('topic-kicker').textContent='ТЕМА '+String(Object.keys(topics).indexOf(topic)+1).padStart(2,'0');
    $('topic-title').textContent=data.title;
    $('task-title').textContent=task.title;
    $('task-prompt').textContent=task.prompt;
    $('hint').textContent=task.hint;
    const reference=$('reference-content');reference.innerHTML=renderReference(task.reference||[]);
    $('reference-content').closest('details').open=false;
    $('solution').textContent=task.solution;
    $('task-count').textContent=String(index+1).padStart(2,'0')+' / '+String(data.tasks.length).padStart(2,'0');
    $('progress').style.width=((index+1)/data.tasks.length*100)+'%';
    input.value='';pending=null;done=false;$('check').disabled=false;
    document.querySelectorAll('.help[open]').forEach(x=>x.open=false);
    setStatus('Изменения сразу видны в городе.');apply();
    document.querySelectorAll('.topic').forEach(b=>b.classList.toggle('active',b.dataset.topic===topic));
  }
  document.querySelectorAll('.topic').forEach(b=>b.addEventListener('click',()=>{topic=b.dataset.topic;index=0;render();}));
  document.querySelectorAll('[data-selector]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.selector+' {\n  \n}';input.focus();apply();setStatus('Селектор добавлен. Измени нужные свойства.');}));
  input.addEventListener('input',()=>{apply();if(done){done=false;$('check').disabled=false;}});
  frame.addEventListener('load',apply);
  $('reset').addEventListener('click',()=>{pending=null;done=false;input.value='';$('check').disabled=false;apply();setStatus('Код очищен.');});
  $('insert').addEventListener('click',()=>{input.value=current().solution;apply();setStatus('Решение вставлено в редактор.');});
  $('skip').addEventListener('click',()=>{const order=Object.keys(topics);topic=order[(order.indexOf(topic)+1)%order.length];index=0;render();});
  $('check').addEventListener('click',()=>{
    if(pending||done)return;
    if(!input.value.trim()){setStatus('Сначала напиши CSS.','bad');return;}
    const id=String(++request);pending=id;setStatus('Проверка…');
    frame.contentWindow.postMessage({type:'NOCTURNE_CHECK_TASK',id,check:current().check},'*');
    window.setTimeout(()=>{if(pending===id){pending=null;setStatus('Город не ответил. Повтори проверку.','bad');}},1800);
  });
  window.addEventListener('message',event=>{
    if(event.source!==frame.contentWindow||!event.data||event.data.type!=='NOCTURNE_TASK_RESULT'||event.data.id!==pending)return;
    pending=null;
    if(event.data.passed){done=true;$('check').disabled=true;setStatus('Верно. Задание выполнено.','good');}
    else setStatus(event.data.found?'Пока не выполнено. Сверь значение свойства с условием.':'Элемент не найден. Проверь селектор.','bad');
  });
  render();
})();