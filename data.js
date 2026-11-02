/* Учебные материалы: уровень с нуля → первые разговорные темы A1. */
(typeof window !== 'undefined' ? window : globalThis).HU_DATA = {
  lessons: [
    {
      id: 'sounds', unit: '01', title: 'Первые звуки', subtitle: 'Как читать венгерские слова', icon: '✳', minutes: 8,
      intro: 'Начнём с хорошей новости: венгерские слова обычно читаются так, как пишутся. Выучим звуки и первое приветствие.',
      rules: [
        { title: 'Ударение — на первом слоге', text: 'В обычной венгерской речи ударение падает на первый слог. Долгий гласный не обязательно ударный: черточка над á, é, í, ó, ú обозначает долготу звука.', example: 'köszönöm', translation: 'спасибо · ударение на «кө»' },
        { title: 'Две буквы — один звук', text: 's ≈ «ш», sz ≈ «с», cs ≈ «ч», zs ≈ «ж». Буквосочетания gy, ny, ty, ly тоже обозначают отдельные звуки: приблизительно «дь», «нь», «ть», «й».', example: 'szia · család', translation: 'привет · семья' },
        { title: 'Точки и черточки важны', text: 'ö и ü — передние округлённые гласные (примерно как немецкие ö/ü); ő и ű — их долгие пары. По-русски передать их точно невозможно: лучше слушать произношение.', example: 'ő · ők', translation: 'он / она · они' }
      ],
      words: [ ['szia', 'привет / пока (на «ты»)'], ['jó napot', 'добрый день'], ['köszönöm', 'спасибо'], ['igen', 'да'], ['nem', 'нет'], ['viszontlátásra', 'до свидания (вежливо)'] ],
      quiz: [
        { type: 'choice', prompt: 'Как примерно читается сочетание sz?', options: ['с', 'ш', 'ч'], answer: 'с', explain: 'sz = «с», а одиночная s = «ш».' },
        { type: 'choice', prompt: 'Где обычно ударение в венгерском слове?', options: ['На первом слоге', 'На последнем слоге', 'На длинном гласном'], answer: 'На первом слоге', explain: 'Ударение обычно на первом слоге, долгота гласного — отдельное свойство.' },
        { type: 'input', prompt: 'Напишите «спасибо» по-венгерски.', answers: ['köszönöm'], explain: 'Köszönöm — спасибо.' },
        { type: 'choice', prompt: 'Что означает «Szia»?', options: ['Привет / пока', 'Спасибо', 'Извините'], answer: 'Привет / пока', explain: 'Szia — неформальное приветствие и прощание.' }
      ]
    },
    {
      id: 'greetings', unit: '02', title: 'Знакомство', subtitle: 'Поздороваться и назвать себя', icon: '☼', minutes: 9,
      intro: 'Научимся представляться и различать неформальное «ты» и вежливое обращение.',
      rules: [
        { title: 'Как вас зовут?', text: 'Hogy hívnak? — «Как тебя зовут?» (неформально). В вежливой ситуации: Hogy hívják? Отвечать можно: [имя] vagyok — «Я [имя]».', example: 'Hogy hívják? — Anna vagyok.', translation: 'Как вас зовут? — Я Анна.' },
        { title: 'Приветствия по ситуации', text: 'Szia — одному человеку на «ты», sziasztok — нескольким. Jó napot kívánok! — вежливое «добрый день». Viszontlátásra! — вежливое «до свидания».', example: 'Jó napot kívánok!', translation: 'Добрый день!' },
        { title: 'Как дела?', text: 'Hogy vagy? — «Как дела?» на «ты». Hogy van? — вежливо. Jól vagyok, köszönöm — «Хорошо, спасибо».', example: 'Jól vagyok, köszönöm.', translation: 'У меня всё хорошо, спасибо.' }
      ],
      words: [ ['hogy', 'как'], ['hívnak', 'тебя зовут'], ['hívják', 'вас зовут (вежливо)'], ['vagyok', 'я есть'], ['jól', 'хорошо'], ['sziasztok', 'привет / пока (нескольким)'] ],
      quiz: [
        { type: 'choice', prompt: 'Как вежливо сказать «Добрый день»?', options: ['Jó napot kívánok!', 'Sziasztok!', 'Jó éjszakát!'], answer: 'Jó napot kívánok!', explain: 'Jó napot kívánok! — вежливое дневное приветствие.' },
        { type: 'input', prompt: 'Напишите «Я Анна» по-венгерски.', answers: ['Anna vagyok'], explain: 'Имя + vagyok: Anna vagyok.' },
        { type: 'choice', prompt: 'Что спросить при вежливом знакомстве?', options: ['Hogy hívják?', 'Hogy hívnak?', 'Hol van?'], answer: 'Hogy hívják?', explain: 'Hogy hívják? — вежливая форма «Как вас зовут?».' },
        { type: 'choice', prompt: 'Что значит «Jól vagyok»?', options: ['У меня всё хорошо', 'Я дома', 'Я говорю'], answer: 'У меня всё хорошо', explain: 'Jól = хорошо; vagyok = я есть.' }
      ]
    },
    {
      id: 'pronouns', unit: '03', title: 'Я, ты, мы', subtitle: 'Местоимения и глагол «быть»', icon: '♧', minutes: 10,
      intro: 'Первое важное правило грамматики: венгерское «есть» иногда произносят, а иногда опускают.',
      rules: [
        { title: 'Личные местоимения', text: 'én — я, te — ты, ő — он/она, mi — мы, ti — вы (несколько человек), ők — они. Местоимение часто опускают: окончание глагола уже указывает на лицо.', example: 'Én magyarul tanulok.', translation: 'Я учу венгерский.' },
        { title: 'Vagyok, vagy, van', text: 'В настоящем времени: én vagyok, te vagy, ő van; mi vagyunk, ti vagytok, ők vannak. Но в 3-м лице с именным или качественным сказуемым van / vannak обычно опускают.', example: 'Ő tanár. · Ő itt van.', translation: 'Он/она учитель. · Он/она здесь.' },
        { title: 'Отрицание', text: 'Перед сказуемым ставим nem: Nem vagyok tanár. Если речь о наличии или нахождении, часто используется nincs («нет»): Nincs itt.', example: 'Nem vagyok tanár.', translation: 'Я не учитель.' }
      ],
      words: [ ['én', 'я'], ['te', 'ты'], ['ő', 'он / она'], ['mi', 'мы'], ['itt', 'здесь'], ['tanár', 'учитель'] ],
      quiz: [
        { type: 'choice', prompt: 'Как сказать «Он/она учитель»?', options: ['Ő tanár.', 'Ő van tanár.', 'Ő vagyok tanár.'], answer: 'Ő tanár.', explain: 'В 3-м лице с профессией «van» обычно не нужно.' },
        { type: 'input', prompt: 'Напишите «Я не учитель».', answers: ['Nem vagyok tanár'], explain: 'Nem ставим перед vagyok: Nem vagyok tanár.' },
        { type: 'choice', prompt: 'Что значит «mi»?', options: ['мы', 'ты', 'они'], answer: 'мы', explain: 'Mi — «мы», ők — «они».' },
        { type: 'choice', prompt: 'Как сказать «Он/она здесь»?', options: ['Ő itt van.', 'Ő itt.', 'Ő vagyok itt.'], answer: 'Ő itt van.', explain: 'При указании местонахождения van сохраняется.' }
      ]
    },
    {
      id: 'articles', unit: '04', title: 'Это что?', subtitle: 'Артикли и простые вопросы', icon: '◇', minutes: 9,
      intro: 'Пора научиться задавать вопросы о предметах и понимать, когда говорить a, az и egy.',
      rules: [
        { title: 'A, az и egy', text: 'Определённый артикль a перед согласным звуком, az перед гласным; egy — «один / какой-то», аналог неопределённого артикля. Артикль часто нужен там, где в русском его нет.', example: 'a ház · az autó · egy ház', translation: 'дом (этот) · машина (эта) · какой-то дом' },
        { title: 'Mi ez? — Что это?', text: 'Ez — это (близко), az — то (дальше). Mi ez? — «Что это?»; Ez egy könyv. — «Это книга». В 3-м лице глагол «быть» тут не произносят.', example: 'Mi ez? — Ez egy könyv.', translation: 'Что это? — Это книга.' },
        { title: 'Вопрос без перестановки', text: 'Вопрос «Это книга?» можно выразить интонацией: Ez egy könyv? В вопросительном слове mi ударение, как обычно, на первом слоге.', example: 'Ez egy autó?', translation: 'Это машина?' }
      ],
      words: [ ['ez', 'это'], ['az', 'то / определённый артикль'], ['egy', 'один / неопределённый артикль'], ['könyv', 'книга'], ['ház', 'дом'], ['autó', 'машина'] ],
      quiz: [
        { type: 'choice', prompt: 'Как сказать «(эта) машина»?', options: ['az autó', 'a autó', 'egy autó'], answer: 'az autó', explain: 'Перед гласным в определённом артикле появляется z: az.' },
        { type: 'input', prompt: 'Напишите «Это книга».', answers: ['Ez egy könyv'], explain: 'Ez egy könyv — «Это книга».' },
        { type: 'choice', prompt: 'Что значит «Mi ez?»?', options: ['Что это?', 'Где это?', 'Кто это?'], answer: 'Что это?', explain: 'Mi — что; ez — это.' },
        { type: 'choice', prompt: 'Какой артикль означает «один / какой-то»?', options: ['egy', 'az', 'a'], answer: 'egy', explain: 'Egy — числительное «один» и неопределённый артикль.' }
      ]
    },
    {
      id: 'vowels', unit: '05', title: 'Гармония гласных', subtitle: 'Почему окончания меняются', icon: '❋', minutes: 11,
      intro: 'Окончания в венгерском подстраиваются под гласные слова. Это основа, которая поможет в следующих уроках.',
      rules: [
        { title: 'Задние и передние гласные', text: 'Задние: a, á, o, ó, u, ú. Передние: e, é, i, í, ö, ő, ü, ű. После «заднего» слова обычно выбирают вариант окончания с a/o/u, после «переднего» — с e/ö/ü. Есть исключения, особенно у слов с i, í, é.', example: 'házban · könyvben', translation: 'в доме · в книге' },
        { title: '-ban / -ben: внутри', text: 'Это окончание означает «внутри чего-то» или «в городе/стране»: Budapest → Budapesten (особая форма), но Moszkva → Moszkvában. Учим формы целиком, не подставляя окончание наугад.', example: 'Moszkvában élek.', translation: 'Я живу в Москве.' },
        { title: 'Долгота меняет слово', text: 'Не игнорируйте черточки: kor и kór — разные слова. ö и ő, ü и ű тоже различаются по долготе. В упражнениях пишем диакритику точно.', example: 'örül · őrül', translation: 'радуется · сходит с ума' }
      ],
      words: [ ['város', 'город'], ['bolt', 'магазин'], ['iskola', 'школа'], ['könyvben', 'в книге'], ['házban', 'в доме'], ['Moszkvában', 'в Москве'] ],
      quiz: [
        { type: 'choice', prompt: 'Как сказать «в доме»?', options: ['házban', 'házben', 'házba'], answer: 'házban', explain: 'В ház задний гласный á → -ban.' },
        { type: 'input', prompt: 'Напишите «в книге».', answers: ['könyvben'], explain: 'Könyv → könyvben: передний ö → -ben.' },
        { type: 'choice', prompt: 'Что означает -ban / -ben?', options: ['внутри / в', 'изнутри / из', 'направление внутрь'], answer: 'внутри / в', explain: '-ban/-ben обозначает местонахождение внутри.' },
        { type: 'choice', prompt: 'Верно ли, что долгие гласные всегда ударные?', options: ['Нет', 'Да'], answer: 'Нет', explain: 'Ударение обычно на первом слоге, даже если долгий гласный дальше.' }
      ]
    },
    {
      id: 'places', unit: '06', title: 'Где? Куда? Откуда?', subtitle: 'Три полезные пары окончаний', icon: '⌂', minutes: 12,
      intro: 'Венгерский часто выражает то, для чего русский использует предлоги, окончаниями самого слова.',
      rules: [
        { title: 'Где? -ban / -ben', text: 'Местонахождение внутри: házban — «в доме», boltban — «в магазине». В ответ на вопрос Hol? — «Где?»', example: 'Hol vagy? — A boltban.', translation: 'Где ты? — В магазине.' },
        { title: 'Куда? -ba / -be', text: 'Движение внутрь: házba — «в дом», boltba — «в магазин». Вопрос Hová? — «Куда?» В разговорной речи границу с -ban/-ben иногда не соблюдают, но в упражнениях различаем.', example: 'A boltba megyek.', translation: 'Я иду в магазин.' },
        { title: 'Откуда? -ból / -ből', text: 'Движение изнутри: házból — «из дома», boltból — «из магазина». Вопрос Honnan? — «Откуда?» Для стран и городов есть и другие серии окончаний: учите конкретные формы.', example: 'A boltból jövök.', translation: 'Я иду из магазина.' }
      ],
      words: [ ['hol', 'где'], ['hová', 'куда'], ['honnan', 'откуда'], ['boltban', 'в магазине'], ['boltba', 'в магазин'], ['boltból', 'из магазина'] ],
      quiz: [
        { type: 'choice', prompt: '«Иду в магазин» — какое окончание?', options: ['-ba', '-ban', '-ból'], answer: '-ba', explain: 'Движение внутрь = -ba/-be.' },
        { type: 'input', prompt: 'Напишите «из магазина».', answers: ['boltból'], explain: 'Bolt + ból = boltból.' },
        { type: 'choice', prompt: 'Что означает Honnan?', options: ['Откуда?', 'Куда?', 'Где?'], answer: 'Откуда?', explain: 'Hol? — где; Hová? — куда; Honnan? — откуда.' },
        { type: 'choice', prompt: 'Как сказать «в магазине»?', options: ['boltban', 'boltba', 'boltból'], answer: 'boltban', explain: 'Boltban = нахожусь внутри магазина.' }
      ]
    },
    {
      id: 'numbers', unit: '07', title: 'Числа и время', subtitle: 'Считать и говорить о дне', icon: '◷', minutes: 10,
      intro: 'Добавим числа от 1 до 10 и короткие слова, без которых не обойтись в разговоре.',
      rules: [
        { title: 'Один — десять', text: 'egy, kettő, három, négy, öt, hat, hét, nyolc, kilenc, tíz. Перед существительным «два» обычно két: két könyv — «две книги».', example: 'két könyv · három nap', translation: 'две книги · три дня' },
        { title: 'После числа — единственное число', text: 'В отличие от русского, после числительного существительное обычно стоит в единственном числе: három könyv, не három könyvek.', example: 'Három könyv van itt.', translation: 'Здесь три книги.' },
        { title: 'Сегодня и завтра', text: 'ma — сегодня, holnap — завтра, tegnap — вчера, most — сейчас. Время часто стоит в начале фразы.', example: 'Ma tanulok.', translation: 'Сегодня я учусь.' }
      ],
      words: [ ['egy', 'один'], ['kettő', 'два'], ['három', 'три'], ['ma', 'сегодня'], ['holnap', 'завтра'], ['tegnap', 'вчера'] ],
      quiz: [
        { type: 'choice', prompt: 'Как правильно «три книги»?', options: ['három könyv', 'három könyvek', 'három egy könyv'], answer: 'három könyv', explain: 'После числа существительное обычно в единственном числе.' },
        { type: 'input', prompt: 'Напишите «сегодня».', answers: ['ma'], explain: 'Ma — сегодня.' },
        { type: 'choice', prompt: 'Какой вариант «две книги» правильнее?', options: ['két könyv', 'kettő könyvek', 'két könyvek'], answer: 'két könyv', explain: 'Перед существительным используется két.' },
        { type: 'choice', prompt: 'Что значит «holnap»?', options: ['завтра', 'вчера', 'сейчас'], answer: 'завтра', explain: 'Holnap — завтра; tegnap — вчера.' }
      ]
    },
    {
      id: 'verbs', unit: '08', title: 'Я учу венгерский', subtitle: 'Глаголы в настоящем времени', icon: '✎', minutes: 12,
      intro: 'Научимся строить свои первые фразы с глаголами и говорить, что вы делаете.',
      rules: [
        { title: 'Лицо видно по окончанию', text: 'У глагола меняется окончание. Например, tanulni — «учиться»: (én) tanulok — я учусь, (te) tanulsz — ты учишься, (ő) tanul — он/она учится. Для других глаголов форма может отличаться.', example: 'Magyarul tanulok.', translation: 'Я учу венгерский.' },
        { title: 'На каком языке? -ul / -ül', text: 'Magyarul — «по-венгерски», oroszul — «по-русски». Beszélek magyarul — «Я говорю по-венгерски». Окончания зависят от слова: учите частотные наречия целиком.', example: 'Beszélek magyarul.', translation: 'Я говорю по-венгерски.' },
        { title: 'Осторожно: две серии спряжения', text: 'Венгерский различает неопределённый и определённый объект: Kérek egy kávét («Я прошу [какой-то] кофе»), но Kérem a kávét («Я прошу этот кофе»). Пока запомните эту пару; дальше потренируем.', example: 'Kérek egy kávét.', translation: 'Мне, пожалуйста, кофе.' }
      ],
      words: [ ['tanulok', 'я учусь'], ['tanulsz', 'ты учишься'], ['magyarul', 'по-венгерски'], ['beszélek', 'я говорю'], ['kérek', 'я прошу / мне, пожалуйста'], ['oroszul', 'по-русски'] ],
      quiz: [
        { type: 'choice', prompt: 'Как сказать «Я учу венгерский»?', options: ['Magyarul tanulok.', 'Magyarul tanulsz.', 'Magyarul tanul.'], answer: 'Magyarul tanulok.', explain: 'Tanulok — форма «я учусь».' },
        { type: 'input', prompt: 'Напишите «Я говорю по-венгерски».', answers: ['Beszélek magyarul'], explain: 'Beszélek magyarul.' },
        { type: 'choice', prompt: 'Что значит «tanulsz»?', options: ['ты учишься', 'я учусь', 'он учится'], answer: 'ты учишься', explain: 'Tanulsz — «ты учишься».' },
        { type: 'choice', prompt: 'Что лучше подходит для «Мне, пожалуйста, один кофе»?', options: ['Kérek egy kávét.', 'Kérem a kávét.', 'Kérsz egy kávét.'], answer: 'Kérek egy kávét.', explain: 'С неопределённым egy употребляется kérek.' }
      ]
    },
    {
      id: 'food', unit: '09', title: 'В кафе', subtitle: 'Заказ и винительный падеж', icon: '☕', minutes: 11,
      intro: 'Теперь вы сможете заказать напиток и понять, почему к слову появляется -t.',
      rules: [
        { title: 'Что? Кого? — винительный падеж', text: 'Прямое дополнение обычно получает окончание -t, иногда со вставной гласной: kávé → kávét, víz → vizet. Формы стоит заучивать со словом.', example: 'Egy kávét kérek.', translation: 'Один кофе, пожалуйста.' },
        { title: 'Пожалуйста — два разных слова', text: 'Kérem — «пожалуйста» в просьбе / «прошу это»; szívesen — «пожалуйста» в ответ на «спасибо». Слова не взаимозаменяемы.', example: 'Köszönöm! — Szívesen!', translation: 'Спасибо! — Пожалуйста!' },
        { title: 'Сколько стоит?', text: 'Mennyibe kerül? — «Сколько стоит?» Можно указать предмет: Mennyibe kerül ez? — «Сколько это стоит?»', example: 'Mennyibe kerül ez?', translation: 'Сколько это стоит?' }
      ],
      words: [ ['kávé', 'кофе'], ['kávét', 'кофе (вин. падеж)'], ['víz', 'вода'], ['vizet', 'воду'], ['szívesen', 'пожалуйста (ответ на спасибо)'], ['mennyibe kerül', 'сколько стоит'] ],
      quiz: [
        { type: 'choice', prompt: 'Как заказать кофе?', options: ['Egy kávét kérek.', 'Egy kávé kérek.', 'Egy kávét kérsz.'], answer: 'Egy kávét kérek.', explain: 'Kávé → kávét, потому что кофе — прямое дополнение.' },
        { type: 'input', prompt: 'Напишите «воду» (винительный падеж).', answers: ['vizet'], explain: 'Víz → vizet: при добавлении окончания гласный укорачивается.' },
        { type: 'choice', prompt: 'Как ответить на «Köszönöm!»?', options: ['Szívesen!', 'Mennyibe kerül?', 'Nem vagyok.'], answer: 'Szívesen!', explain: 'Szívesen — «пожалуйста» в ответ на благодарность.' },
        { type: 'choice', prompt: 'Что означает «Mennyibe kerül?»?', options: ['Сколько стоит?', 'Где находится?', 'Как тебя зовут?'], answer: 'Сколько стоит?', explain: 'Mennyibe kerül? — вопрос о цене.' }
      ]
    },
    {
      id: 'family', unit: '10', title: 'Моя семья', subtitle: 'Родственники и притяжательные формы', icon: '♡', minutes: 12,
      intro: 'Научимся рассказывать о близких. Венгерское «мой» обычно прячется в окончании существительного.',
      rules: [
        { title: '«Мой» — окончание слова', text: 'anya → anyám («моя мама»), apa → apám («мой папа»), testvér → testvérem («мой брат / моя сестра»). Конкретное окончание зависит от основы слова; иногда меняется долгота гласного.', example: 'A családom itt él.', translation: 'Моя семья живёт здесь.' },
        { title: 'Есть у меня / нет у меня', text: 'Van egy testvérem — «У меня есть брат/сестра» (буквально «есть один мой брат/сестра»). Nincs testvérem — «У меня нет братьев и сестёр».', example: 'Van egy testvérem.', translation: 'У меня есть брат или сестра.' },
        { title: 'Прадед и происхождение', text: 'Dédapám — «мой прадед», dédanyám — «моя прабабушка». Для происхождения семьи полезно származik — «происходит / родом».', example: 'A családom Kárpátaljáról származik.', translation: 'Моя семья родом из Закарпатья.' }
      ],
      words: [ ['család', 'семья'], ['családom', 'моя семья'], ['anyám', 'моя мама'], ['apám', 'мой папа'], ['testvérem', 'мой брат / моя сестра'], ['dédapám', 'мой прадед'] ],
      quiz: [
        { type: 'choice', prompt: 'Как сказать «моя семья»?', options: ['családom', 'család', 'családok'], answer: 'családom', explain: 'Család → családom: окончание указывает на принадлежность.' },
        { type: 'input', prompt: 'Напишите «мой прадед».', answers: ['dédapám'], explain: 'Dédapám — мой прадед.' },
        { type: 'choice', prompt: 'Что означает «Van egy testvérem»?', options: ['У меня есть брат или сестра', 'У меня нет брата', 'Моя семья здесь'], answer: 'У меня есть брат или сестра', explain: 'Van ... testvérem — у меня есть брат/сестра.' },
        { type: 'choice', prompt: 'Как сказать «У меня нет брата или сестры»?', options: ['Nincs testvérem.', 'Nem van testvérem.', 'Van testvérem.'], answer: 'Nincs testvérem.', explain: 'Для отсутствия используем nincs.' }
      ]
    },
    {
      id: 'about', unit: '11', title: 'Рассказ о себе', subtitle: 'Жить, приехать, говорить', icon: '✦', minutes: 11,
      intro: 'Соберём короткий рассказ о себе: где вы живёте, откуда вы и какой язык учите.',
      rules: [
        { title: 'Где живёте?', text: 'Hol él? — «Где вы живёте?» (вежливо). Élek — «я живу»; в названии города форма зависит от топонима: Moszkvában élek — «Я живу в Москве».', example: 'Moszkvában élek.', translation: 'Я живу в Москве.' },
        { title: 'Откуда вы?', text: 'Honnan jött? — «Откуда вы приехали?» (вежливо). Oroszországból jöttem — «Я приехал(а) из России». Запоминайте страну и её форму вместе.', example: 'Oroszországból jöttem.', translation: 'Я приехал(а) из России.' },
        { title: 'Пока только немного', text: 'Egy kicsit beszélek magyarul — «Я немного говорю по-венгерски». Это честный ответ начинающего; для общения важно понимать и встречный вопрос.', example: 'Egy kicsit beszélek magyarul.', translation: 'Я немного говорю по-венгерски.' }
      ],
      words: [ ['élek', 'я живу'], ['jöttem', 'я приехал(а)'], ['honnan', 'откуда'], ['egy kicsit', 'немного'], ['Oroszország', 'Россия'], ['magyarul', 'по-венгерски'] ],
      quiz: [
        { type: 'choice', prompt: 'Что значит «Hol él?»?', options: ['Где вы живёте?', 'Куда вы идёте?', 'Как вас зовут?'], answer: 'Где вы живёте?', explain: 'Hol = где, él = живёт (вежливое обращение без местоимения).' },
        { type: 'input', prompt: 'Напишите «Я немного говорю по-венгерски».', answers: ['Egy kicsit beszélek magyarul'], explain: 'Egy kicsit beszélek magyarul.' },
        { type: 'choice', prompt: 'Что означает «jöttem»?', options: ['я приехал(а)', 'я живу', 'я учусь'], answer: 'я приехал(а)', explain: 'Jöttem — форма прошедшего времени «я пришёл/приехал».' },
        { type: 'choice', prompt: 'Как сказать «Я живу в Москве»?', options: ['Moszkvában élek.', 'Moszkvába élek.', 'Moszkvából élek.'], answer: 'Moszkvában élek.', explain: 'Местонахождение в Москве — Moszkvában.' }
      ]
    },
    {
      id: 'interview', unit: '12', title: 'Первый разговор', subtitle: 'Понимать вопросы на собеседовании', icon: '❀', minutes: 14,
      intro: 'Потренируем несколько типичных вопросов и честные короткие ответы. Это языковая практика, не сценарий, который нужно заучить слово в слово.',
      rules: [
        { title: 'Зачем вы учите язык?', text: 'Miért tanul magyarul? — «Почему вы изучаете венгерский?» (вежливо). Можно сказать: Szeretnék magyarul beszélni — «Я хотел(а) бы говорить по-венгерски».', example: 'Szeretnék magyarul beszélni.', translation: 'Я хотел(а) бы говорить по-венгерски.' },
        { title: 'Про семейные корни', text: 'A dédapám a történelmi Magyarország területén született — «Мой прадед родился на территории исторической Венгрии». Фраза описывает исторический контекст, не современную границу; употребляйте только если она соответствует вашим документам.', example: 'A családom Kárpátaljáról származik.', translation: 'Моя семья родом из Закарпатья.' },
        { title: 'Если не расслышали', text: 'Не нужно угадывать ответ. Elnézést, megismételné? — «Извините, не могли бы вы повторить?»; Lassabban, kérem — «Помедленнее, пожалуйста».', example: 'Elnézést, megismételné?', translation: 'Извините, не могли бы вы повторить?' }
      ],
      words: [ ['miért', 'почему'], ['szeretnék', 'я хотел(а) бы'], ['dédapám', 'мой прадед'], ['született', 'родился / родилась'], ['elnézést', 'извините'], ['lassabban', 'медленнее'] ],
      quiz: [
        { type: 'choice', prompt: 'Что значит «Miért tanul magyarul?»?', options: ['Почему вы изучаете венгерский?', 'Где вы изучаете венгерский?', 'Вы говорите по-венгерски?'], answer: 'Почему вы изучаете венгерский?', explain: 'Miért — «почему».' },
        { type: 'input', prompt: 'Как вежливо попросить повторить вопрос?', answers: ['Elnézést, megismételné'], explain: 'Elnézést, megismételné? — вежливая просьба повторить.' },
        { type: 'choice', prompt: 'Что сказать, если собеседник говорит слишком быстро?', options: ['Lassabban, kérem.', 'Viszontlátásra!', 'Nem vagyok tanár.'], answer: 'Lassabban, kérem.', explain: 'Lassabban, kérem — «Помедленнее, пожалуйста».' },
        { type: 'choice', prompt: 'Как сказать «Я хотел(а) бы говорить по-венгерски»?', options: ['Szeretnék magyarul beszélni.', 'Szeretnék magyarul tanár.', 'Beszélek szeretnék.'], answer: 'Szeretnék magyarul beszélni.', explain: 'Szeretnék + инфинитив beszélni.' }
      ]
    }
  ],
  phrases: [
    { category: 'Знакомство', items: [ ['Jó napot kívánok!', 'Добрый день!'], ['Hogy hívják?', 'Как вас зовут?'], ['Örvendek.', 'Очень приятно.'], ['Hogy van?', 'Как ваши дела?'] ] },
    { category: 'Когда трудно понять', items: [ ['Elnézést, megismételné?', 'Извините, не могли бы вы повторить?'], ['Lassabban, kérem.', 'Помедленнее, пожалуйста.'], ['Nem értem.', 'Я не понимаю.'], ['Egy kicsit beszélek magyarul.', 'Я немного говорю по-венгерски.'] ] },
    { category: 'О себе и семье', items: [ ['Moszkvában élek.', 'Я живу в Москве.'], ['Magyarul tanulok.', 'Я учу венгерский.'], ['A családom Kárpátaljáról származik.', 'Моя семья родом из Закарпатья.'], ['A dédapám a történelmi Magyarország területén született.', 'Мой прадед родился на территории исторической Венгрии.'] ] },
    { category: 'Каждый день', items: [ ['Köszönöm szépen!', 'Большое спасибо!'], ['Szívesen!', 'Пожалуйста! (в ответ на спасибо)'], ['Mennyibe kerül ez?', 'Сколько это стоит?'], ['Egy vizet kérek.', 'Воду, пожалуйста.'] ] }
  ]
};
