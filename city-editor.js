(() => {
  const frame = document.querySelector('.city-frame');
  const input = document.getElementById('city-css-input');
  const status = document.getElementById('task-status');
  const number = document.getElementById('task-number');
  const prompt = document.getElementById('task-prompt');
  const hint = document.getElementById('task-hint');
  const solution = document.getElementById('task-solution');
  const progress = document.getElementById('task-progress-fill');
  const checkButton = document.getElementById('task-check');
  const skipButton = document.getElementById('task-skip');
  const resetButton = document.getElementById('task-reset');
  const insertButton = document.getElementById('insert-solution');
  if (![frame,input,status,number,prompt,hint,solution,progress,checkButton,skipButton,resetButton,insertButton].every(Boolean)) return;

  const tasks = [
    { prompt:"Сделай углы всех окон слегка скруглёнными: радиус должен быть 4 пикселя.", hint:"Выбери класс .window и используй свойство border-radius.", solution:".window {\n  border-radius: 4px;\n}", check:{selector:".window",property:"border-top-left-radius",expected:"4px"} },
    { prompt:"Подсвети окна центральной башни бирюзовым цветом #60a4a1.", hint:"Нужен селектор окон внутри центрального здания. Измени их background-color.", solution:".building-center .window {\n  background-color: #60a4a1;\n}", check:{selector:".building-center .window",property:"background-color",expected:"rgb(96, 164, 161)"} },
    { prompt:"Сделай промежутки между этажами правого здания равными 12 пикселям.", hint:"Этажи находятся внутри .building-floors. Контейнер уже использует Flexbox.", solution:".building-right .building-floors {\n  gap: 12px;\n}", check:{selector:".building-right .building-floors",property:"row-gap",expected:"12px"} },
    { prompt:"Сделай окна центральной башни полупрозрачными: opacity должна быть 0.55.", hint:"Выбери окна центрального здания и задай свойство opacity.", solution:".building-center .window {\n  opacity: 0.55;\n}", check:{selector:".building-center .window",property:"opacity",expected:"0.55"} }
  ];
  let current = 0;
  let requestId = 0;
  let pending = null;
  let completed = false;

  const apply = () => {
    if (!frame.contentWindow) return;
    frame.contentWindow.postMessage({ type:"NOCTURNE_APPLY_CSS", css:input.value }, "*");
  };
  const setStatus = (message, kind="") => { status.textContent=message; status.className="task-status"+(kind?" "+kind:""); };
  const closeDisclosures = () => document.querySelectorAll(".task-disclosure[open]").forEach(item=>{item.open=false;});
  const renderTask = () => {
    const task=tasks[current];
    pending=null;
    completed=false;
    number.textContent=String(current+1).padStart(2,"0")+" / "+String(tasks.length).padStart(2,"0");
    prompt.textContent=task.prompt;
    hint.textContent=task.hint;
    solution.textContent=task.solution;
    input.value="";
    apply();
    closeDisclosures();
    setStatus("Изменения сразу видны в городе.");
    progress.style.width=((current+1)/tasks.length*100)+"%";
    checkButton.disabled=false;
    skipButton.textContent=current===tasks.length-1?"Начать заново":"Пропустить";
  };
  input.addEventListener("input",()=>{apply();if(completed){completed=false;checkButton.disabled=false;}});
  frame.addEventListener("load",apply);
  resetButton.addEventListener("click",()=>{pending=null;completed=false;checkButton.disabled=false;input.value="";apply();setStatus("Код очищен. Можно попробовать заново.");});
  insertButton.addEventListener("click",()=>{input.value=tasks[current].solution;apply();setStatus("Решение вставлено. Можешь изменить его.");});
  skipButton.addEventListener("click",()=>{
    pending=null;
    if(current<tasks.length-1){current++;renderTask();return;}
    current=0;renderTask();setStatus("Начинаем задания сначала.");
  });
  checkButton.addEventListener("click",()=>{
    if(pending || completed)return;
    if(!input.value.trim()){setStatus("Сначала напиши CSS или открой решение.","bad");return;}
    const id=String(++requestId);
    setStatus("Проверяю результат в городской сцене…");
    pending=id;
    frame.contentWindow.postMessage({type:"NOCTURNE_CHECK_TASK",id,check:tasks[current].check},"*");
    window.setTimeout(()=>{
      if(pending!==id)return;
      pending=null;
      setStatus("Сцена не ответила. Попробуй проверить ещё раз.","bad");
    },1800);
  });
  window.addEventListener("message",event=>{
    if(event.source!==frame.contentWindow || !event.data || event.data.type!=="NOCTURNE_TASK_RESULT" || event.data.id!==pending)return;
    pending=null;
    if(event.data.passed){
      completed=true;
      setStatus(current===tasks.length-1?"Верно. Все задания выполнены.":"Верно. Задание выполнено — переходи дальше.","good");
      checkButton.disabled=true;
    }else if(!event.data.found){
      setStatus("Нужный элемент не найден. Проверь селектор.","bad");
    }else{
      setStatus("Пока не выполнено. Сравни CSS-значение с условием.","bad");
    }
  });
  renderTask();
})();