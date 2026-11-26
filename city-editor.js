(() => {
  const $ = id => document.getElementById(id);
  const frame=document.querySelector('.city-frame'), input=$('css-input'), status=$('status');
  const topics={
    selectors:{title:'Селекторы',tasks:[
      {title:'Подсвети левое здание',prompt:'Сделай рамку левого жилого здания бирюзовой (#60a4a1). Измени только это здание.',hint:'Выбери класс .building-left. Свойство border-color задаёт цвет рамки.',reference:[{title:'Рамка',items:[['border','Задаёт рамку целиком: толщину, стиль и цвет. Например: border: 2px solid teal;'],['border-color','Меняет только цвет уже существующей рамки. Можно задать один цвет или разные стороны.'],['border-width','Толщина рамки. Например: 2px.'],['border-style','Вид линии: solid, dashed, dotted, double, none. Без стиля рамка обычно не видна.'],['border-radius','Скругляет углы рамки.'] ]},{title:'Контур рядом с рамкой',items:[['outline','Рисует внешний контур вокруг элемента; не занимает место в раскладке.'],['outline-color','Цвет внешнего контура.'],['outline-width / style','Толщина и вид внешнего контура.'] ]},{title:'Подсветка и свечение',items:[['box-shadow','Тень или свечение вокруг элемента. Для свечения используют цветной shadow без большого смещения, например 0 0 12px #60a4a1.'],['opacity','Прозрачность всего элемента вместе с содержимым: от 0 до 1.'] ]},{title:'Цвет и прозрачность',items:[['color','Цвет текста и некоторых других передних элементов, но не рамки.'],['background / background-color','Цвет или фон внутри элемента. Не меняет цвет рамки.'],['rgba() / #RRGGBBAA','Цвет с альфа-каналом: позволяет сделать сам цвет полупрозрачным.'] ]}],solution:'.building-left {\n  border-color: #60a4a1;\n}',check:{selector:'.building-left',property:'border-top-color',expected:'rgb(96, 164, 161)'}}]},
    colors:{title:'Цвет и фон',tasks:[
      {title:'Подсвети центральную башню',prompt:'Сделай окна центральной башни бирюзовыми (#60a4a1). Окна других зданий не меняй.',hint:'Составной селектор: сначала класс здания, затем через пробел класс окон.',solution:'.building-center .window {\n  background: #60a4a1;\n}',check:{selector:'.building-center .window',property:'background-color',expected:'rgb(96, 164, 161)'}}]},
    spacing:{title:'Размеры и расстояния',tasks:[
      {title:'Раздвинь этажи',prompt:'Установи промежуток между этажами правого здания — ровно 12px.',hint:'Контейнер называется .building-floors. Свойство gap задаёт промежуток между его дочерними элементами.',solution:'.building-right .building-floors {\n  gap: 12px;\n}',check:{selector:'.building-right .building-floors',property:'row-gap',expected:'12px'}}]},
    effects:{title:'Эффекты',tasks:[
      {title:'Сделай окна прозрачнее',prompt:'Установи прозрачность окон центральной башни на 0.55 (55%).',hint:'Выбери окна центрального здания и задай opacity.',solution:'.building-center .window {\n  opacity: 0.55;\n}',check:{selector:'.building-center .window',property:'opacity',expected:'0.55'}}]}
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
    const reference=$('reference-content');reference.innerHTML=(task.reference||[]).map(group=>'<section class="reference-group"><h3>'+group.title+'</h3>'+group.items.map(item=>'<div class="reference-item"><code>'+item[0]+'</code><p>'+item[1]+'</p></div>').join('')+'</section>').join('')+'<p class="reference-note">Справочник не ограничивает выбор одним способом. Смотри, пробуй свойства и сравнивай результат в городе.</p>';
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