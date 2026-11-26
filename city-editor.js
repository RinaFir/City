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

  const basicSelectorReference={title:'Простые селекторы и сочетание признаков',items:[
    ['Селектор тега','Выбирает элементы по названию HTML-тега.',[
      ['Пример','article выбирает все элементы article. Точка и решётка здесь не нужны.']
    ]],
    ['.class — класс','Выбирает элементы, у которых есть указанный класс.',[
      ['Пример','.window выбирает все окна. Один и тот же класс может быть у многих элементов.']
    ]],
    ['#id — идентификатор','Выбирает элемент с указанным id.',[
      ['Пример','#central-tower выбирает элемент с id="central-tower". Идентификатор должен быть уникальным на странице.']
    ]],
    ['* — любой элемент','Универсальный селектор выбирает все элементы.',[
      ['Пример','* выбирает все элементы документа. Внутри составного селектора может ограничивать выборку: .building-left *.']
    ]],
    ['[attribute] — наличие атрибута','Выбирает элементы, у которых присутствует указанный HTML-атрибут.',[
      ['Пример','[data-building] выбирает элементы с атрибутом data-building независимо от его значения.']
    ]],
    ['[attribute="value"] — точное значение','Выбирает элементы, значение атрибута которых точно совпадает с указанным.',[
      ['Пример','[data-building="residential"] выбирает элемент с таким значением атрибута.']
    ]],
    ['Несколько классов одного элемента','Слитная запись классов означает, что все перечисленные классы должны быть у одного элемента.',[
      ['Пример','.window.lit выбирает элемент, у которого есть и window, и lit. Пробел между ними изменил бы смысл.']
    ]],
    ['Тег вместе с классом','Имя тега и класс без пробела уточняют один элемент.',[
      ['Пример','i.window выбирает только элементы i с классом window.']
    ]]
  ]};
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
  const pseudoClassReference={title:'Псевдоклассы и их сочетания',items:[
    [':not() — исключение','Исключает элементы, подходящие под селектор внутри скобок.',[
      ['Несколько исключений','Можно написать .window:not(.lit):not(.pink) — окна без обоих классов.'],
      ['Список внутри :not()','.window:not(.lit, .pink) — то же исключение несколькими вариантами внутри одной функции.'],
      ['Сочетание с позицией','.floor:nth-child(odd) .window:not(.lit) — окна без lit на нечётных этажах.']
    ]],
    [':is() — один из вариантов','Выбирает элемент, если подходит хотя бы один селектор из списка.',[
      ['Вложенное сочетание','.building :is(.roof, .building-base) выбирает крышу или основание внутри здания.'],
      ['Сочетание с :not()','.window:is(.pink, .teal):not(.lit) — розовые или бирюзовые окна, кроме светящихся.']
    ]],
    [':where() — варианты без специфичности','Работает как :is(), но не добавляет специфичность.',[
      ['В составе сложного селектора',':where(.building-left, .building-right) .floor:nth-child(even) выбирает чётные этажи двух зданий.']
    ]],
    [':has() — условие для родителя','Выбирает сам элемент, если внутри него есть совпадение.',[
      ['Сочетание с :not()','.building:has(.window.teal):not(:has(.window.pink)) — здание с бирюзовым окном, но без розовых.'],
      ['Вложенная связь','.building:has(> .building-floors .floor:nth-child(odd) .window.lit) — здание, где на нечётном этаже есть светящееся окно.']
    ]],
    ['Позиционные псевдоклассы','Проверяют место элемента среди детей родителя или среди элементов того же типа.',[
      [':first-child / :last-child','Первый или последний ребёнок родителя.'],
      [':nth-child(An+B)','Позиции по формуле: odd, even, 2n, 3n+1, -n+3. Считает всех детей.'],
      [':nth-of-type(An+B)','Та же формула, но считает только соседние элементы того же HTML-тега.'],
      ['Комбинации','.floor:nth-child(odd) > .window:nth-of-type(2n):not(.lit) объединяет этаж, прямого ребёнка, позицию окна и исключение класса.']
    ]],
    ['Псевдоклассы состояния','Выбирают элемент по текущему взаимодействию или состоянию формы.',[
      [':hover / :active','Наведение указателя и активное нажатие.'],
      [':focus / :focus-visible / :focus-within','Фокус самого элемента, видимый клавиатурный фокус и наличие фокуса внутри контейнера.'],
      [':checked / :disabled / :enabled','Состояния переключателей и доступности элементов формы.'],
      [':required / :optional / :valid / :invalid','Состояния проверки полей формы. Для них нужны настоящие элементы формы.']
    ]]
  ]};
  const pseudoElementReference={title:'Псевдоэлементы и их сочетания',items:[
    ['::before и ::after','Создают виртуальные элементы перед содержимым или после него.',[
      ['Синтаксис','Пишутся с двумя двоеточиями: .building-sign b::before.'],
      ['Обязательное условие','Для отображения обычно задают content, например content: "CORE"; без content псевдоэлемент не появится.'],
      ['Сочетание','.building-center .building-sign b:first-of-type::after — псевдоэлемент после содержимого выбранного элемента.']
    ]],
    ['::first-letter и ::first-line','Выбирают первую букву и первую отображаемую строку текста.',[
      ['Первая буква','.building-sign b::first-letter — первая буква названия здания.'],
      ['Первая строка','.building-sign b::first-line — первая отображаемая строка текста.']
    ]],
    ['::selection','Выбирает фрагмент текста, выделенный пользователем.',[
      ['Пример','.building-sign b::selection — выделенная часть названия здания.']
    ]],
    ['::placeholder','Выбирает текст-подсказку поля ввода.',[
      ['Пример','input::placeholder. Работает только на элементе формы с атрибутом placeholder; в текущей городской сцене такого поля нет, поэтому отдельное задание появится вместе с формами.']
    ]],
    ['Псевдокласс + псевдоэлемент','Сначала указывают условия самого элемента, затем псевдоэлемент через двойное двоеточие.',[
      ['Пример','.building-sign b:first-of-type::before — before у первого элемента b в заголовке здания.'],
      ['Важно','Псевдоэлемент — не самостоятельный DOM-узел. Он создаётся браузером для выбранного элемента.']
    ]]
  ]};
  const groupingReference={title:'Группировка селекторов',items:[
    ['Запятая — несколько независимых выборок','Каждый селектор в списке выбирает свою группу элементов. Все группы получают одно CSS-правило.',[
      ['Пример','.roof, .building-base выбирает все крыши и все основания.'],
      ['Логика','Запятая означает «ИЛИ»: элементу достаточно соответствовать одному из селекторов.']
    ]],
    ['Список и сочетание — не одно и то же','Запятая разделяет самостоятельные селекторы. Запись без запятой объединяет признаки или связи в одной выборке.',[
      ['Через запятую','.building, .window выбирает здания И отдельно окна.'],
      ['Без запятой','.building.window ищет один элемент, у которого одновременно есть оба класса.']
    ]],
    ['Общее правило для списка','После запятой можно указать ещё один, третий и последующие селекторы.',[
      ['Пример','.roof, .building-base, .entrance выбирает три разные группы элементов.']
    ]]
  ]};
  const topics={
    frame:{title:'Рамки',tasks:[
      {section:'Основы рамки',title:'Добавь сплошную рамку окнам',prompt:'Добавь окнам центральной башни рамку толщиной 2px, сплошную, бирюзового цвета.',hint:'Сокращённая запись border объединяет толщину, стиль линии и цвет.',reference:[referenceLibrary.frame],solution:'.building-center .window {\n  border: 2px solid #60a4a1;\n}',check:{selector:'.building-center .window',property:'border-top-width',expected:'2px'}}
    ]},
    outline:{title:'Внешний контур',tasks:[
      {section:'Основы внешнего контура',title:'Обведи центральную башню снаружи',prompt:'Добавь центральной башне внешний контур толщиной 2px, штриховой, бирюзовый. Контур не должен менять размеры элемента.',hint:'Для внешнего контура используется outline, а не border.',reference:[referenceLibrary.outline],solution:'.building-center {\n  outline: 2px dashed #60a4a1;\n}',check:{selector:'.building-center',property:'outline-width',expected:'2px'}}
    ]},
    selectors:{title:'Селекторы',tasks:[
      {section:'Простые селекторы',title:'Выбери все элементы универсальным селектором',prompt:'Выбери все элементы внутри города. Универсальный селектор обозначает любой HTML-элемент.',hint:'Для выбора любого элемента используется звёздочка *.',reference:[basicSelectorReference],solution:'* {\n  \n}',check:{mode:'selector',selector:'*'}},
      {section:'Простые селекторы',title:'Выбери элементы по тегу',prompt:'Выбери все элементы-здания города. В редакторе должна быть только запись селектора и пустой блок правила.',hint:'Здания в сцене — элементы article. Селектор тега записывается без точки.',reference:[basicSelectorReference],solution:'article {\n  \n}',check:{mode:'selector',selector:'article'}},
      {section:'Простые селекторы',title:'Выбери левое здание по классу',prompt:'Выбери только левое жилое здание. Остальные здания и элементы не должны попасть в выборку.',hint:'У левого здания есть класс building-left. Класс выбирают точкой перед именем.',reference:[basicSelectorReference],solution:'.building-left {\n  \n}',check:{mode:'selector',selector:'.building-left'}},
      {section:'Простые селекторы',title:'Выбери все окна',prompt:'Выбери все окна во всех трёх зданиях. Не выбирай этажи, крыши или сами здания.',hint:'У каждого окна есть класс window.',reference:[basicSelectorReference],solution:'.window {\n  \n}',check:{mode:'selector',selector:'.window'}},
      {section:'Простые селекторы',title:'Выбери центральную башню по идентификатору',prompt:'Выбери только центральную башню по её идентификатору.',hint:'Идентификатор выбирают через #. У центральной башни id="central-tower".',reference:[basicSelectorReference],solution:'#central-tower {\n  \n}',check:{mode:'selector',selector:'#central-tower'}},
      {section:'Простые селекторы',title:'Выбери элементы с атрибутом data-building',prompt:'Выбери все три здания по наличию атрибута data-building. Не перечисляй классы зданий.',hint:'Атрибутный селектор с квадратными скобками выбирает элементы, у которых есть указанный атрибут.',reference:[basicSelectorReference],solution:'[data-building] {\n  \n}',check:{mode:'selector',selector:'[data-building]'}},
      {section:'Простые селекторы',title:'Выбери жилое здание по значению атрибута',prompt:'Выбери только жилое здание, используя значение data-building="residential".',hint:'Для точного совпадения значение атрибута записывают в кавычках после знака =.',reference:[basicSelectorReference],solution:'[data-building="residential"] {\n  \n}',check:{mode:'selector',selector:'[data-building="residential"]'}},
      {section:'Сочетание признаков одного элемента',title:'Выбери светящиеся окна',prompt:'Выбери только окна, у которых одновременно есть классы window и lit.',hint:'Два класса одного элемента записываются подряд. Между ними нет пробела.',reference:[basicSelectorReference],solution:'.window.lit {\n  \n}',check:{mode:'selector',selector:'.window.lit'}},
      {section:'Сочетание признаков одного элемента',title:'Отличи тег от класса',prompt:'Выбери элементы i с классом window. Не выбирай другие элементы, даже если у них есть похожий класс.',hint:'Сначала укажи имя HTML-тега, затем сразу класс через точку: i.window.',reference:[basicSelectorReference],solution:'i.window {\n  \n}',check:{mode:'selector',selector:'i.window'}},
      {section:'Сочетание признаков одного элемента',title:'Найди бирюзовые светящиеся окна',prompt:'Выбери окна, у которых одновременно есть три класса: window, lit и teal.',hint:'Все три класса должны относиться к одному элементу. Запиши их подряд без пробелов.',reference:[basicSelectorReference],solution:'.window.lit.teal {\n  \n}',check:{mode:'selector',selector:'.window.lit.teal'}},
      {section:'Группировка селекторов',title:'Выбери крыши и основания',prompt:'Выбери все крыши и все основания зданий одним правилом. Это две самостоятельные группы элементов.',hint:'Запятая разделяет независимые селекторы. Укажи .roof, затем .building-base.',reference:[groupingReference],solution:'.roof, .building-base {\n  \n}',check:{mode:'selector',selector:'.roof, .building-base'}},
      {section:'Группировка селекторов',title:'Отличи список от сочетания классов',prompt:'Выбери все здания и отдельно все окна. Не ищи один элемент, у которого одновременно есть классы building и window.',hint:'Здесь нужны две независимые выборки. Раздели .building и .window запятой.',reference:[groupingReference],solution:'.building, .window {\n  \n}',check:{mode:'selector',selector:'.building, .window'}},
      {section:'Группировка селекторов',title:'Собери список из трёх селекторов',prompt:'Одним правилом выбери крыши, основания и входы всех зданий.',hint:'Перечисли три самостоятельных селектора через запятую: .roof, .building-base и .entrance.',reference:[groupingReference],solution:'.roof, .building-base, .entrance {\n  \n}',check:{mode:'selector',selector:'.roof, .building-base, .entrance'}},
      {section:'Сочетания псевдоклассов',title:'Исключи два вида окон',prompt:'Выбери окна, у которых нет ни класса lit, ни класса pink. Оба исключения должны относиться к одному окну.',hint:'Соедини два :not() подряд: сначала исключи .lit, затем .pink.',reference:[pseudoClassReference],solution:'.window:not(.lit):not(.pink) {\n  \n}',check:{mode:'selector',selector:'.window:not(.lit):not(.pink)'}},
      {section:'Сочетания псевдоклассов',title:'Объедини варианты и исключение',prompt:'Выбери розовые или бирюзовые окна, но исключи из результата все окна с классом lit.',hint:'Внутри :is() перечисли .pink и .teal, после него добавь :not(.lit).',reference:[pseudoClassReference],solution:'.window:is(.pink, .teal):not(.lit) {\n  \n}',check:{mode:'selector',selector:'.window:is(.pink, .teal):not(.lit)'}},
      {section:'Сочетания псевдоклассов',title:'Выбери этажи двух зданий по условию',prompt:'Выбери каждый второй этаж левого и правого зданий. Центральное здание не должно попасть в выборку.',hint:'Используй :where() для списка двух зданий и :nth-child(even) для этажей.',reference:[pseudoClassReference],solution:':where(.building-left, .building-right) .floor:nth-child(even) {\n  \n}',check:{mode:'selector',selector:':where(.building-left, .building-right) .floor:nth-child(even)'}},
      {section:'Сочетания псевдоклассов',title:'Найди здание по двум условиям',prompt:'Выбери здание, в котором есть бирюзовое окно, но нет ни одного розового окна.',hint:'Оба условия относятся к зданию: :has() проверяет наличие бирюзового окна, :not(:has()) — отсутствие розовых.',reference:[pseudoClassReference],solution:'.building:has(.window.teal):not(:has(.window.pink)) {\n  \n}',check:{mode:'selector',selector:'.building:has(.window.teal):not(:has(.window.pink))'}},
      {section:'Сочетания псевдоклассов',title:'Собери составное позиционное условие',prompt:'Выбери несветящиеся окна на нечётных этажах центральной башни. На каждом таком этаже нужны окна на чётных позициях.',hint:'Соедини :nth-child(odd) у этажа, :nth-of-type(even) у окна и :not(.lit).',reference:[pseudoClassReference],solution:'.building-center .floor:nth-child(odd) > .window:nth-of-type(even):not(.lit) {\n  \n}',check:{mode:'selector',selector:'.building-center .floor:nth-child(odd) > .window:nth-of-type(even):not(.lit)'}},
      {section:'Сочетания псевдоклассов',title:'Добавь условие наведения',prompt:'Выбери окна центральной башни только в момент наведения указателя. Светящиеся окна исключи.',hint:'Псевдокласс :hover добавь к окну, а :not(.lit) оставь вторым условием.',reference:[pseudoClassReference],solution:'.building-center .window:hover:not(.lit) {\n  \n}',check:{mode:'selector',selector:'.building-center .window:hover:not(.lit)'}},
      {section:'Псевдоэлементы',title:'Выбери место перед названием здания',prompt:'Обратись к псевдоэлементу, который создаётся перед текстом названия каждого здания.',hint:'Сначала выбери .building-sign b, затем добавь ::before. У псевдоэлементов два двоеточия.',reference:[pseudoElementReference],solution:'.building-sign b::before {\n  \n}',check:{mode:'selector',selector:'.building-sign b::before'}},
      {section:'Псевдоэлементы',title:'Выбери место после названия центральной башни',prompt:'Выбери псевдоэлемент после названия только центрального здания.',hint:'Ограничь b через .building-center .building-sign, затем добавь ::after.',reference:[pseudoElementReference],solution:'.building-center .building-sign b::after {\n  \n}',check:{mode:'selector',selector:'.building-center .building-sign b::after'}},
      {section:'Псевдоэлементы',title:'Выбери первую букву названия',prompt:'Выбери первую букву названия каждого здания.',hint:'Псевдоэлемент первой буквы — ::first-letter.',reference:[pseudoElementReference],solution:'.building-sign b::first-letter {\n  \n}',check:{mode:'selector',selector:'.building-sign b::first-letter'}},
      {section:'Псевдоэлементы',title:'Выбери первую строку названия',prompt:'Выбери первую отображаемую строку названия центрального здания.',hint:'Используй ::first-line после селектора текста.',reference:[pseudoElementReference],solution:'.building-center .building-sign b::first-line {\n  \n}',check:{mode:'selector',selector:'.building-center .building-sign b::first-line'}},
      {section:'Псевдоэлементы',title:'Выбери выделенный текст',prompt:'Выбери фрагмент названия здания в момент, когда пользователь выделяет его мышью или клавиатурой.',hint:'Для выделенного пользователем текста используется ::selection.',reference:[pseudoElementReference],solution:'.building-sign b::selection {\n  \n}',check:{mode:'selector',selector:'.building-sign b::selection'}},
      {section:'Сочетание псевдокласса и псевдоэлемента',title:'Соедини позицию и псевдоэлемент',prompt:'Выбери псевдоэлемент перед первым текстовым элементом b в заголовке центрального здания.',hint:'Сначала выбери центральный заголовок, затем b:first-of-type и в конце ::before.',reference:[pseudoElementReference],solution:'.building-center .building-sign b:first-of-type::before {\n  \n}',check:{mode:'selector',selector:'.building-center .building-sign b:first-of-type::before'}},
    ]},
    colors:{title:'Цвет и фон',tasks:[
      {title:'Подсвети центральную башню',prompt:'Сделай окна центральной башни бирюзовыми (#60a4a1). Окна других зданий не меняй.',hint:'Составной селектор: сначала класс здания, затем через пробел класс окон.',reference:[referenceLibrary.color],solution:'.building-center .window {\n  background: #60a4a1;\n}',check:{selector:'.building-center .window',property:'background-color',expected:'rgb(96, 164, 161)'}}]},
    spacing:{title:'Отступы и промежутки',tasks:[
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
    $('topic-kicker').textContent='ТЕМА '+String(Object.keys(topics).indexOf(topic)+1).padStart(2,'0')+(task.section?' · '+task.section.toUpperCase():'');
    $('topic-title').textContent=data.title;
    $('task-title').textContent=task.title;
    $('task-prompt').textContent=task.prompt;
    $('hint').textContent=task.hint;
    const reference=$('reference-content');reference.innerHTML=renderReference(task.reference||[]);
    $('reference-content').closest('details').open=false;
    $('solution').textContent=task.solution;
    $('task-count').textContent=String(index+1).padStart(2,'0')+' / '+String(data.tasks.length).padStart(2,'0');
    $('previous').disabled=index===0;
    $('skip').disabled=index===data.tasks.length-1;
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
  $('previous').addEventListener('click',()=>{if(index>0){index--;render();}});
  $('skip').addEventListener('click',()=>{if(index<topics[topic].tasks.length-1){index++;render();}});
  $('check').addEventListener('click',()=>{
    if(pending||done)return;
    if(!input.value.trim()){setStatus('Сначала напиши CSS.','bad');return;}
    const id=String(++request);pending=id;setStatus('Проверка…');
    frame.contentWindow.postMessage({type:'NOCTURNE_CHECK_TASK',id,check:current().check?.mode==='selector'?current().check:{checks:current().checks||[current().check]}},'*');
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