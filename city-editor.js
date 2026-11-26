(() => {
  const $ = id => document.getElementById(id);
  const frame=document.querySelector('.city-frame'), input=$('css-input'), status=$('status');
  const referenceLibrary={
    frame:{title:'Рамка и контур',items:[
      ['border','Рисует рамку вокруг элемента. В одной записи можно задать её толщину, вид линии и цвет.',[
        ['Как записать','• Пример: border: 2px solid #60a4a1;\n• Сначала указывают толщину, затем вид линии и цвет.\n• Порядок этих трёх частей можно менять.\n• Если часть пропущена, браузер использует её значение по умолчанию.'],
        ['Толщина','• Задаёт ширину линии рамки.\n• thin — тонкая; medium — средняя; thick — толстая.\n• Можно указать точный размер: 1px, 2px, 0.15rem.'],
        ['Вид линии','• solid — сплошная линия.\n• dashed — линия из штрихов.\n• dotted — линия из точек.\n• double — две параллельные линии.\n• groove / ridge — рельефная линия с эффектом углубления или выступа.\n• inset / outset — эффект вдавленной или выступающей рамки.\n• none — рамка не рисуется.'],
        ['Цвет','• Можно указать название: teal.\n• HEX: #60a4a1.\n• Функции: rgb(), hsl().\n• transparent — полностью прозрачный цвет.']
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

  const selectorReference={title:'Селекторы и связи',items:[
    ['.class','Выбирает все элементы, у которых есть указанный класс.',[
      ['Один класс','Например, .window выбирает все окна города. Точка перед именем означает класс.'],
      ['Несколько классов','.window.lit выбирает элементы, у которых одновременно есть оба класса. Между классами пробела нет.'],
      ['Класс у конкретного элемента','.building-left выбирает левое здание. Класс можно сочетать с другими условиями.']
    ]],
    ['*','Универсальный селектор: выбирает любой элемент.',[
      ['Без ограничения','* выбирает все элементы страницы.'],
      ['Внутри блока','.building-left * выбирает все элементы внутри левого здания, но не само здание.']
    ]],
    ['Список селекторов','Запятая объединяет независимые выборки.',[
      ['Пример','.roof, .building-base { ... } применяет одно правило и к крышам, и к основаниям зданий.'],
      ['Важно','Запятая означает «или». Без запятой селекторы обычно уточняют одну и ту же выборку.']
    ]],
    ['Потомок: пробел','Выбирает элементы внутри другого элемента на любой глубине.',[
      ['Пример','.building .window — все окна внутри любого здания, в том числе глубоко вложенные.'],
      ['Порядок','Сначала указывают внешний элемент, затем внутренний.']
    ]],
    ['Прямой ребёнок: >','Выбирает только непосредственных детей элемента.',[
      ['Пример','.building > .roof — крыша, которая находится прямо внутри здания.'],
      ['Отличие от пробела','Промежуточные вложенные элементы не подходят.']
    ]],
    ['Соседи: + и ~','Выбирают элементы, расположенные после другого элемента на том же уровне.',[
      ['+ следующий сосед','.floor + .floor выбирает этаж, который идёт сразу после другого этажа.'],
      ['~ последующие соседи','.floor ~ .floor выбирает все этажи после предыдущего подходящего этажа.']
    ]],
    [':not() — исключение','Выбирает элементы, которые подходят под основной селектор, но не подходят под условие внутри скобок.',[
      ['Исключить класс','.window:not(.lit) выбирает окна без класса lit.'],
      ['Сочетать условия','.building-center .window:not(.pink) выбирает окна центральной башни, кроме розовых.'],
      ['Важно','Внутри :not() указывают селектор того, что нужно исключить.']
    ]],
    [':is() — любой из вариантов','Объединяет несколько вариантов селектора внутри одного условия.',[
      ['Список вариантов',':is(.roof, .building-base) выбирает крыши или основания.'],
      ['Вложенное условие','.building :is(.roof, .building-base) ограничивает выборку частями здания.'],
      ['Отличие от запятой',':is() удобно вставлять внутрь более длинного селектора, не повторяя его общую часть.']
    ]],
    [':where() — любой вариант без усиления','Работает как :is(), но не добавляет специфичность селектора.',[
      ['Пример',':where(.building-left, .building-right) .window выбирает окна левого или правого здания.'],
      ['Когда полезно','Удобно задавать базовые стили, которые легко переопределить более точным селектором.']
    ]],
    [':has() — элемент с условием внутри','Выбирает сам элемент, если внутри него есть элемент, подходящий под условие.',[
      ['Найти родителя','.building:has(.window.pink) выбирает здание, внутри которого есть розовое окно.'],
      ['Сочетать с дочерним элементом','.building:has(.window.pink) > .roof выбирает крышу именно такого здания.'],
      ['Важно','В отличие от пробела, :has() выбирает внешний элемент, а не внутренний.']
    ]],
    [':first-child и :last-child','Выбирают элемент, если он стоит первым или последним среди всех детей своего родителя.',[
      [':first-child','.floor:first-child — первый этаж в каждом контейнере этажей.'],
      [':last-child','.floor:last-child — последний этаж в каждом контейнере этажей.'],
      ['Важно','Позиция считается среди всех дочерних элементов, а не только элементов с нужным классом.']
    ]],
    [':nth-child() — номер по порядку','Выбирает детей по их позиции внутри родителя.',[
      ['Конкретный номер',':nth-child(3) — третий ребёнок. Нумерация начинается с 1.'],
      ['odd и even','odd — нечётные позиции: 1, 3, 5…; even — чётные: 2, 4, 6…'],
      ['Формула 2n','Каждый второй элемент: 2, 4, 6… Формула 2n+1 — позиции 1, 3, 5…'],
      ['Формула 3n','Каждый третий: 3, 6, 9… Формула 3n+1 — 1, 4, 7…'],
      ['Диапазон','-n+3 выбирает первые три элемента; n+4 — начиная с четвёртого и далее.']
    ]],
    [':nth-of-type() — номер среди своего типа','Считает позицию только среди соседних элементов того же HTML-тега.',[
      ['Пример','i.window:nth-of-type(2) выбирает второе окно среди соседних элементов i.'],
      ['Отличие от :nth-child()','Если перед окнами есть другой тег, :nth-child() учитывает его позицию, а :nth-of-type() — нет.']
    ]]
  ]};
  const topics={
    selectors:{title:'Селекторы',tasks:[
      {title:'Выбери левое здание',prompt:'Сделай рамку левого жилого здания бирюзовой (#60a4a1). Остальные здания не меняй.',hint:'Класс левого здания — .building-left. Точка перед именем означает, что это селектор класса.',reference:[selectorReference],solution:'.building-left {\\n  border-color: #60a4a1;\\n}',check:{selector:'.building-left',property:'border-top-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери только светящиеся окна',prompt:'Сделай светящиеся окна города бирюзовыми. Обычные окна не меняй.',hint:'У светящихся окон есть сразу два класса: window и lit. Запиши их подряд, без пробела.',reference:[selectorReference],solution:'.window.lit {\\n  background-color: #60a4a1;\\n}',check:{selector:'.window.lit',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери все элементы внутри левого здания',prompt:'Добавь сплошной бирюзовый контур всем элементам внутри левого здания. Само здание не должно получить этот контур.',hint:'Универсальный селектор * выбирает любые элементы. Поставь его после .building-left через пробел.',reference:[selectorReference],solution:'.building-left * {\\n  outline: 1px solid #60a4a1;\\n}',check:{selector:'.building-left .window',property:'outline-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери крыши и основания',prompt:'Сделай крыши и основания всех трёх зданий бирюзовыми по цвету рамки. Остальные части зданий не меняй.',hint:'Запятая объединяет две независимые выборки: .roof и .building-base.',reference:[selectorReference],solution:'.roof, .building-base {\\n  border-color: #60a4a1;\\n}',checks:[{selector:'.roof',property:'border-top-color',expected:'rgb(96, 164, 161)'},{selector:'.building-base',property:'border-top-color',expected:'rgb(96, 164, 161)'}]},
      {title:'Найди окна внутри центральной башни',prompt:'Сделай все окна центральной башни бирюзовыми. Окна двух других зданий не меняй.',hint:'Пробел означает «внутри»: сначала укажи здание, затем его окна.',reference:[selectorReference],solution:'.building-center .window {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери только прямую крышу здания',prompt:'Сделай верхнюю рамку крыш бирюзовой, используя связь «непосредственный ребёнок».',hint:'Знак > выбирает только прямых детей. Крыша находится непосредственно внутри article.building.',reference:[selectorReference],solution:'.building > .roof {\\n  border-top-color: #60a4a1;\\n}',check:{selector:'.building > .roof',property:'border-top-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери этажи после первого',prompt:'Сделай верхнюю рамку всех этажей, которые идут сразу после другого этажа, бирюзовой.',hint:'Знак + выбирает непосредственного следующего соседа. Этажи расположены рядом внутри .building-floors.',reference:[selectorReference],solution:'.floor + .floor {\\n  border-top: 1px solid #60a4a1;\\n}',check:{selector:'.floor + .floor',property:'border-top-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери все следующие этажи',prompt:'Сделай фон всех этажей после первого в каждом здании бирюзовым. Первый этаж не меняй.',hint:'В отличие от +, знак ~ выбирает не только ближайшего, но и всех следующих соседей.',reference:[selectorReference],solution:'.floor ~ .floor {\\n  background-color: #60a4a1;\\n}',check:{selector:'.floor ~ .floor',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Исключи светящиеся окна',prompt:'Сделай обычные окна центральной башни бирюзовыми. Светящиеся окна не меняй.',hint:'Сначала выбери окна центральной башни, затем исключи окна с классом lit через :not(.lit).',reference:[selectorReference],solution:'.building-center .window:not(.lit) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window:not(.lit)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Исключи розовые окна',prompt:'Сделай все окна центральной башни, кроме розовых, бирюзовыми.',hint:'Добавь к выборке окон исключение :not(.pink). Здесь два условия работают вместе: здание и класс окна.',reference:[selectorReference],solution:'.building-center .window:not(.pink) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window:not(.pink)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери крышу или основание',prompt:'Сделай рамку бирюзовой у крыши и основания только центральной башни.',hint:'Используй :is(.roof, .building-base), чтобы перечислить два варианта внутри одного селектора.',reference:[selectorReference],solution:'.building-center :is(.roof, .building-base) {\\n  border-color: #60a4a1;\\n}',check:{selector:'.building-center :is(.roof, .building-base)',property:'border-top-color',expected:'rgb(96, 164, 161)'}},
      {title:'Объедини два здания через :where()',prompt:'Сделай окна левого и правого зданий бирюзовыми, а окна центральной башни не меняй.',hint:'В :where() перечисли два класса зданий через запятую, а после скобок укажи .window.',reference:[selectorReference],solution:':where(.building-left, .building-right) .window {\\n  background-color: #60a4a1;\\n}',check:{selector:':where(.building-left, .building-right) .window',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Найди здание с розовыми окнами',prompt:'Выбери крышу здания, внутри которого есть хотя бы одно розовое окно, и сделай её рамку бирюзовой.',hint:':has(.window.pink) проверяет содержимое здания. Затем > .roof выбирает его прямую крышу.',reference:[selectorReference],solution:'.building:has(.window.pink) > .roof {\\n  border-color: #60a4a1;\\n}',check:{selector:'.building:has(.window.pink) > .roof',property:'border-top-color',expected:'rgb(96, 164, 161)'}},
      {title:'Собери составной селектор',prompt:'В центральной башне выбери все окна, которые не светятся и не окрашены в розовый. Сделай их бирюзовыми.',hint:'Соедини выбор здания и окон с двумя исключениями: :not(.lit):not(.pink). Оба условия должны выполняться.',reference:[selectorReference],solution:'.building-center .window:not(.lit):not(.pink) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window:not(.lit):not(.pink)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Сочетай :has() и :is()',prompt:'У здания с розовыми окнами выбери крышу или основание. Сделай рамку этих частей бирюзовой.',hint:'Сначала найди здание через :has(.window.pink), затем выбери один из двух его элементов через :is(.roof, .building-base).',reference:[selectorReference],solution:'.building:has(.window.pink) :is(.roof, .building-base) {\\n  border-color: #60a4a1;\\n}',check:{selector:'.building:has(.window.pink) :is(.roof, .building-base)',property:'border-top-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери первые этажи',prompt:'Сделай фон первого этажа каждого здания бирюзовым. Остальные этажи не меняй.',hint:':first-child выбирает первый элемент среди детей своего родителя. Каждый корпус имеет свой контейнер этажей.',reference:[selectorReference],solution:'.floor:first-child {\\n  background-color: #60a4a1;\\n}',check:{selector:'.floor:first-child',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери последние этажи',prompt:'Сделай фон последнего этажа каждого здания бирюзовым.',hint:':last-child выбирает последний дочерний элемент. Здесь это последний этаж в каждом .building-floors.',reference:[selectorReference],solution:'.floor:last-child {\\n  background-color: #60a4a1;\\n}',check:{selector:'.floor:last-child',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери третий этаж',prompt:'Сделай фон третьего этажа центральной башни бирюзовым. Другие этажи не меняй.',hint:':nth-child(3) выбирает третьего ребёнка. Добавь ограничение на центральное здание.',reference:[selectorReference],solution:'.building-center .floor:nth-child(3) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .floor:nth-child(3)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери чётные этажи',prompt:'Сделай фон каждого второго этажа всех зданий бирюзовым: 2-й, 4-й, 6-й и так далее.',hint:':nth-child(even) выбирает чётные позиции. Позиция считается отдельно внутри каждого контейнера этажей.',reference:[selectorReference],solution:'.floor:nth-child(even) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.floor:nth-child(even)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери каждый третий этаж',prompt:'Сделай фон третьего, шестого и девятого этажей центральной башни бирюзовым.',hint:':nth-child(3n) выбирает позиции, кратные трём: 3, 6, 9 и далее.',reference:[selectorReference],solution:'.building-center .floor:nth-child(3n) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .floor:nth-child(3n)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери первый и каждый третий после него',prompt:'Сделай фон этажей центральной башни на позициях 1, 4 и 7 бирюзовым.',hint:':nth-child(3n+1) даёт последовательность 1, 4, 7, 10…',reference:[selectorReference],solution:'.building-center .floor:nth-child(3n+1) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .floor:nth-child(3n+1)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Ограничь выборку первыми тремя',prompt:'Сделай фон первых трёх этажей правого здания бирюзовым. Остальные не меняй.',hint:':nth-child(-n+3) выбирает позиции от первой до третьей включительно.',reference:[selectorReference],solution:'.building-right .floor:nth-child(-n+3) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-right .floor:nth-child(-n+3)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери окна по позиции',prompt:'Сделай бирюзовым фон второго окна на каждом этаже центральной башни.',hint:'Ограничь выборку центральной башней, затем выбери окно по позиции :nth-child(2).',reference:[selectorReference],solution:'.building-center .window:nth-child(2) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window:nth-child(2)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Выбери окна через nth-of-type()',prompt:'Сделай бирюзовым фон четвёртого окна на каждом этаже центральной башни.',hint:':nth-of-type(4) считает позицию среди элементов того же тега. В каждом ряду окна — элементы i.',reference:[selectorReference],solution:'.building-center .window:nth-of-type(4) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window:nth-of-type(4)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Сочетай позицию и исключение',prompt:'Сделай бирюзовыми нечётные окна центральной башни, кроме светящихся.',hint:'Сначала выбери нечётные окна через :nth-child(odd), затем исключи класс lit через :not(.lit).',reference:[selectorReference],solution:'.building-center .window:nth-child(odd):not(.lit) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window:nth-child(odd):not(.lit)',property:'background-color',expected:'rgb(96, 164, 161)'}},
      {title:'Собери формулу с условием',prompt:'Выбери в центральной башне каждое третье окно, начиная с первого, но исключи розовые. Сделай фон оставшихся окон бирюзовым.',hint:'Соедини :nth-child(3n+1) и :not(.pink). Оба условия должны выполняться одновременно.',reference:[selectorReference],solution:'.building-center .window:nth-child(3n+1):not(.pink) {\\n  background-color: #60a4a1;\\n}',check:{selector:'.building-center .window:nth-child(3n+1):not(.pink)',property:'background-color',expected:'rgb(96, 164, 161)'}}
    ]},
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
    frame.contentWindow.postMessage({type:'NOCTURNE_CHECK_TASK',id,check:{checks:current().checks||[current().check]}},'*');
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