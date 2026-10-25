/* Dane przykładowe do prototypu. Strukturę pól można odwzorować na ACF i CPT. */
window.KOCIAMBERKI_CMS = {
  siteSettings: {
    name: "Stowarzyszenie Kociamberki – Mrucząca Przystań",
    shortName: "Kociamberki",
    tagline: "Dajemy kotom czas, troskę i dobry adres.",
    instagramHandle: "@kociambry_poznan",
    address: "ul. Madziarska 2, 61-615 Poznań",
    nip: "9721367876",
    regon: "542315965",
    phone: "Numer telefonu do uzupełnienia",
    email: "Adres e-mail do uzupełnienia",
    socialLinks: [
      { label: "Instagram", handle: "@kociambry_poznan", url: "https://www.instagram.com/kociambry_poznan/" },
      { label: "Facebook", handle: "Link do uzupełnienia", url: "" },
      { label: "TikTok", handle: "Link do uzupełnienia", url: "" },
      { label: "Linktree", handle: "Link do uzupełnienia", url: "" }
    ],
    dropPoints: [
      { name: "Paczkomat InPost", address: "ul. Sarmacka 7, Poznań", detail: "" },
      { name: "Allegro One Box", address: "ul. Madziarska 2, Poznań", detail: "" }
    ],
    links: {
      adoptionForm: "",
      temporaryHomeForm: "",
      volunteerForm: "",
      rescuedPaws: "https://ocalonelapki.pl/organizacja/511/stowarzyszenie-kociamberki-mruczaca-przystan",
      bazaar: "https://www.facebook.com/groups/869517238772503",
      mainFundraiser: "http://pomagam.pl/arryry",
      goalFundraiser: "https://pomagam.pl/pbc3yp",
      privacy: "#polityka-prywatnosci"
    }
  },
  cats: [
    {
      id: "rita", name: "Rita", sex: "Kotka", ageMonths: 28, status: "urgent", fivfelv: "FIV/FeLV: ujemne",
      company: "Na dokocenie", temperament: "otwarta", tags: ["spokojny-dom", "zabawa", "towarzystwo-kota"],
      photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85"],
      description: "Rita to czuła obserwatorka, która lubi mieć człowieka w zasięgu wzroku. Gdy poczuje się bezpiecznie, sama zaprasza do głaskania i chętnie bawi się wędką. Szuka spokojnego domu, najlepiej z łagodnym kocim towarzyszem.",
      bioTag: "Szukam człowieka, który wie, że najlepsze rozmowy zaczynają się od mruknięcia.",
      wishes: ["Mokra karma wysokomięsna", "Żwirek zbrylający", "Podkłady higieniczne"], seasonal: true, quizShy: false
    },
    {
      id: "bąbel", name: "Bąbel", sex: "Kocur", ageMonths: 9, status: "urgent", fivfelv: "FIV/FeLV: ujemne",
      company: "Na dokocenie", temperament: "energiczny", tags: ["zabawa", "towarzystwo-kota", "duzo-domu"],
      photo: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1000&q=85"],
      description: "Bąbel ma w sobie tyle energii, że zabawki czasem proszą o przerwę. Jest ciekawski, wesoły i bardzo lubi kocie towarzystwo. Szuka domu, w którym ktoś znajdzie czas na wspólną zabawę.",
      bioTag: "Z zawodu tester wędek. Szukam stałego meldunku i półki na zabawki.",
      wishes: ["Mokra karma dla kociąt", "Zabawki na wędce", "Miękkie kocyki"], seasonal: true, quizShy: false
    },
    {
      id: "klusek", name: "Klusek", sex: "Kocur", ageMonths: 42, status: "urgent", fivfelv: "FIV/FeLV: ujemne",
      company: "Jedynak", temperament: "spokojny", tags: ["spokojny-dom", "jedynak", "duzo-domu"],
      photo: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=85"],
      description: "Klusek marzy o własnym fotelu i człowieku, który doceni wspólne, ciche wieczory. Jest łagodny, lubi rutynę i najlepiej czuje się jako jedyny koci lokator.",
      bioTag: "Szukam spokojnego mieszkania. Fotel może być już zajęty, byle miękki.",
      wishes: ["Karma weterynaryjna", "Podkłady", "Transporter"], seasonal: true, quizShy: false
    },
    {
      id: "migotka", name: "Migotka", sex: "Kotka", ageMonths: 18, status: "adoption", fivfelv: "FIV/FeLV: ujemne",
      company: "Na dokocenie", temperament: "czuła", tags: ["spokojny-dom", "towarzystwo-kota", "zabawa"],
      photo: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1000&q=85"],
      description: "Migotka szybko nawiązuje kontakt i chętnie odpoczywa blisko człowieka. Lubi zabawę, a po niej długi koci reset. Dobrze odnajdzie się z przyjaznym kotem.",
      bioTag: "Czułość, drzemki i wspólne patrzenie przez okno. To mój plan.",
      wishes: ["Mokra karma", "Drapak", "Zabawki"], seasonal: false, quizShy: false
    },
    {
      id: "mietek", name: "Miętek", sex: "Kocur", ageMonths: 64, status: "adoption", fivfelv: "FIV/FeLV: ujemne",
      company: "Jedynak", temperament: "spokojny", tags: ["spokojny-dom", "jedynak", "duzo-domu"],
      photo: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85"],
      description: "Miętek jest statecznym gentlemanem. Lubi przewidywalne dni, delikatne głaski i własny kąt do odpoczynku. Szuka spokojnego domu bez pośpiechu.",
      bioTag: "Koneser kocyków i ciszy. Do rozmów wystarczy mi łagodne mruknięcie.",
      wishes: ["Karma dla seniorów", "Miękkie posłanie", "Suplementy"], seasonal: true, quizShy: false
    },
    {
      id: "mglka", name: "Mgiełka", sex: "Kotka", ageMonths: 15, status: "adoption", fivfelv: "FIV/FeLV: ujemne",
      company: "Na dokocenie", temperament: "wycofana", tags: ["cisza", "cierpliwosc", "spokojny-dom", "towarzystwo-kota"],
      photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=85"],
      description: "Mgiełka jest ostrożna i potrzebuje czasu, żeby zaufać. Nie wskoczy od razu na kolana, ale spokojny, cierpliwy dom może pomóc jej rozkwitnąć. Przyjazny kot będzie dla niej dobrym przewodnikiem.",
      bioTag: "Najpierw popatrzę z bezpiecznej odległości. Potem może zamruczę.",
      wishes: ["Karma mokra", "Kryjówki i tunele", "Podkłady"], seasonal: true, quizShy: true
    },
    {
      id: "pestka", name: "Pestka", sex: "Kotka", ageMonths: 7, status: "adoption", fivfelv: "FIV/FeLV: ujemne",
      company: "Na dokocenie", temperament: "energiczna", tags: ["zabawa", "towarzystwo-kota", "duzo-domu"],
      photo: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1000&q=85"],
      description: "Pestka jest młoda, ciekawa świata i gotowa na zabawę w każdej wolnej chwili. Szuka domu z kocim kompanem i opiekunem, który zadba o bezpieczne wprowadzenie.",
      bioTag: "Mam siedem miesięcy i plan na każdy sznurek w domu.",
      wishes: ["Karma dla kociąt", "Wędki", "Drapak"], seasonal: false, quizShy: false
    },
    {
      id: "tulipan", name: "Tulipan", sex: "Kocur", ageMonths: 36, status: "foster", fivfelv: "FIV/FeLV: w trakcie badań",
      company: "Na dokocenie", temperament: "łagodny", tags: ["spokojny-dom", "cierpliwosc", "towarzystwo-kota"],
      photo: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=85"],
      description: "Tulipan czeka na dom tymczasowy, w którym będzie mógł spokojnie dojść do siebie i pokazać swój charakter. Fundacja zapewnia wsparcie i potrzebne rzeczy.",
      bioTag: "Szukam bezpiecznego przystanku i człowieka z dobrym sercem.",
      wishes: ["Podkłady higieniczne", "Karma mokra", "Żwirek"], seasonal: true, quizShy: false
    },
    {
      id: "figa", name: "Figa", sex: "Kotka", ageMonths: 10, status: "foster", fivfelv: "FIV/FeLV: ujemne",
      company: "Jedynak", temperament: "nieśmiała", tags: ["cisza", "cierpliwosc", "spokojny-dom", "jedynak"],
      photo: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=900&q=85",
      photos: ["https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=85", "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=85"],
      description: "Figa potrzebuje spokojnego domu tymczasowego i opiekuna, który pozwoli jej oswajać się we własnym tempie. Małe kroki i rutyna znaczą dla niej bardzo dużo.",
      bioTag: "Cenię ciszę, bezpieczną kryjówkę i ludzi, którzy nie poganiają.",
      wishes: ["Kryjówki", "Podkłady", "Mokra karma"], seasonal: false, quizShy: true
    },
    {
      id: "luna", name: "Luna", sex: "Kotka", ageMonths: 30, status: "adopted", fivfelv: "", company: "",
      photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85", photos: [], description: ""
    },
    {
      id: "feliks", name: "Feliks", sex: "Kocur", ageMonths: 22, status: "adopted", fivfelv: "", company: "",
      photo: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=85", photos: [], description: ""
    },
    {
      id: "iskierka", name: "Iskierka", sex: "Kotka", ageMonths: 48, status: "rainbow", fivfelv: "", company: "",
      photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=85", photos: [], description: ""
    }
  ],
  news: [
    { id: "pierwszy-krok", date: "2026-10-18", category: "Z życia przystani", title: "Każdy wielki krok zaczyna się od spokojnego mruknięcia", excerpt: "Mgiełka coraz śmielej wychodzi z kryjówki. Dziękujemy, że dajecie naszym podopiecznym czas i przestrzeń.", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=85" },
    { id: "paczka-dobra", date: "2026-10-07", category: "Dziękujemy", title: "Wasze paczki zamieniają się w pełne miseczki", excerpt: "Do przystani dotarły karma, żwirek i miękkie kocyki. Każdy taki gest pomaga nam troszczyć się o koty.", image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1000&q=85" },
    { id: "dom-tymczasowy", date: "2026-09-26", category: "Potrzebujemy", title: "Otwórz drzwi na mały, tymczasowy koci krok", excerpt: "Szukamy spokojnych domów tymczasowych w Poznaniu i okolicy. Zapewniamy wsparcie, wyprawkę i kontakt z wolontariuszkami.", image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85" },
    { id: "dziekuje", date: "2026-09-11", category: "Z życia przystani", title: "Małe zwycięstwa, które cieszą najbardziej", excerpt: "Pierwsze mruknięcie, spokojny posiłek i nowa zabawka. Zapisujemy te chwile, bo z nich składa się bezpieczny dom.", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1000&q=85" }
  ],
  pagesContent: {
    home: {
      eyebrow: "Poznań · Mrucząca Przystań",
      title: "Małe łapki. Wielkie historie.",
      intro: "Dajemy kotom czas, troskę i dobry adres. Poznaj naszych podopiecznych i znajdź sposób, w jaki możesz pomóc.",
      trustLine: "Każda dobra historia zaczyna się od Ciebie.",
      supportEyebrow: "Pomoc ma wiele imion",
      supportTitle: "Nie możesz adoptować? Nadal możesz zmienić koci dzień.",
      supportIntro: "Dom tymczasowy, paczka karmy, transport do lecznicy albo dobre słowo. Każda forma wsparcia pomaga nam troszczyć się o koty.",
      supportWays: ["Podaruj potrzebne rzeczy z aktualnej listy.", "Otwórz dom tymczasowy na kocią historię.", "Dołącz do zespołu wolontariuszek."],
      supportAction: "Zobacz sposoby pomocy",
      urgentTitle: "Poznaj pilnych kociamberków",
      urgentIntro: "Każdy z nich zasługuje na spokojny początek. Może właśnie u Ciebie?",
      quizTitle: "Nie wiesz, który kot pasuje do Twojego domu?",
      quizIntro: "Odpowiedz na 6 krótkich pytań. Pomożemy Ci spotkać się z trzema kocimi osobowościami.",
      newsTitle: "Ostatnie kocie wieści",
      newsIntro: "Małe kroki, ważne spotkania i dobre wiadomości."
    },
    cats: {
      eyebrow: "Nasi podopieczni",
      title: "Każdy ma swój charakter. Każdy zasługuje na dom.",
      intro: "Poznaj ich historie, zobacz kto czeka na adopcję i wybierzcie się na pierwsze spotkanie."
    },
    quiz: {
      eyebrow: "Empatyczny quiz",
      title: "Kto zamruczy w Twoim rytmie?",
      intro: "Sześć pytań pomoże nam znaleźć wspólny język. To początek rozmowy, nie egzamin z kociej obsługi.",
      resultsTitle: "Trzy historie do poznania.",
      resultsIntro: "Quiz podpowiada, ale najlepsze dopasowanie rodzi się podczas rozmowy i spokojnego spotkania.",
      resultLabels: ["🎯 Strzał w dziesiątkę", "💜 Bratnia dusza w cieniu · kandydat cierpliwego serca", "✨ Alternatywa z Mruczącej Przystani"],
      resultExplanations: [
        "Wasze codzienne tempo i potrzeby mają wiele wspólnego. To świetny punkt wyjścia do poznania się na żywo.",
        "Mgiełka potrzebuje spokojnego domu i czasu. Twoje odpowiedzi pokazują, że możesz dać jej bezpieczną przestrzeń, w której zaufanie będzie rosło małymi krokami.",
        "Inna osobowość, która może pięknie odnaleźć się w Twoim domu. Porozmawiajmy o jej potrzebach."
      ],
      questions: [
        { text: "Jak brzmi Twój dom w zwykły dzień?", options: [
          { label: "Cicho i spokojnie, lubimy własne tempo.", tags: ["cisza", "spokojny-dom"] },
          { label: "Jest trochę życia, rozmów i codziennego ruchu.", tags: ["zabawa", "towarzystwo-kota"] },
          { label: "Dużo się dzieje, energia nas napędza.", tags: ["zabawa", "duzo-domu"] }
        ] },
        { text: "Ile czasu kot będzie zwykle spędzać sam?", options: [
          { label: "Niewiele, często ktoś jest w domu.", tags: ["duzo-domu", "zabawa"] },
          { label: "Kilka godzin, mamy przewidywalny rytm.", tags: ["spokojny-dom", "cierpliwosc"] },
          { label: "Dłużej, ale zapewnimy bezpieczną przestrzeń i zabawę.", tags: ["jedynak", "spokojny-dom"] }
        ] },
        { text: "Jak wyobrażasz sobie relację z kotem?", options: [
          { label: "Bliskość przyjdzie stopniowo, bez pośpiechu.", tags: ["cierpliwosc", "cisza"] },
          { label: "Chętnie spędzamy czas obok siebie.", tags: ["spokojny-dom", "towarzystwo-kota"] },
          { label: "Marzą nam się wspólne zabawy i dużo kontaktu.", tags: ["zabawa", "duzo-domu"] }
        ] },
        { text: "Czy w domu mieszkają już inne zwierzęta?", options: [
          { label: "Tak, mamy łagodnego kota.", tags: ["towarzystwo-kota"] },
          { label: "Nie, nowy kot będzie jedynakiem.", tags: ["jedynak"] },
          { label: "Jest pies lub inne zwierzę, zaplanujemy spokojne zapoznanie.", tags: ["cierpliwosc", "spokojny-dom"] }
        ] },
        { text: "Czy masz ochotę na codzienną zabawę wędką?", options: [
          { label: "Tak! Będziemy polować na piórka.", tags: ["zabawa", "duzo-domu"] },
          { label: "Czasem, ale stawiamy też na spokojne chwile.", tags: ["spokojny-dom", "towarzystwo-kota"] },
          { label: "Wolimy wspólne odpoczywanie.", tags: ["cisza", "jedynak"] }
        ] },
        { text: "Czy jesteś otwarty/a na kota z trudniejszą historią?", options: [
          { label: "Tak, damy mu czas i poszukamy wsparcia.", tags: ["cierpliwosc", "cisza"] },
          { label: "Możemy rozważyć, jeśli poznamy jego potrzeby.", tags: ["spokojny-dom", "cierpliwosc"] },
          { label: "Na początek wolimy kota, który szybciej odnajdzie się w domu.", tags: ["zabawa", "towarzystwo-kota"] }
        ] }
      ]
    },
    santa: {
      eyebrow: "Całoroczny Koci Mikołaj",
      title: "Konkretne potrzeby. Konkretne kocie pyszczki.",
      intro: "Zostań Mikołajem wybranego kota i pomóż rzeczami, których naprawdę potrzebuje. Wysyłka darów odbywa się bezpośrednio do punktu wskazanego w instrukcji."
    },
    adopted: {
      eyebrow: "Dobre wieści",
      title: "Własny kąt, własne miseczki.",
      intro: "Te koty są już w swoich domach. Dziękujemy, że kibicowaliście im w drodze do szczęśliwego zakończenia."
    },
    rainbow: {
      eyebrow: "Zawsze w naszych sercach",
      title: "Miłość zostaje z nami.",
      intro: "Pamiętamy o kotach, które były częścią naszej przystani. Każde z nich zostawiło po sobie ciepły ślad."
    },
    news: {
      eyebrow: "Aktualności z Mruczącej Przystani",
      title: "Kocie wieści i małe zwycięstwa.",
      intro: "Zajrzyj do naszej codzienności. Znajdziesz tu historie podopiecznych, podziękowania i aktualne potrzeby."
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Porozmawiajmy o kocich sprawach.",
      intro: "Jesteśmy w Poznaniu. Napisz do nas w sprawie adopcji, domu tymczasowego, wolontariatu albo aktualnych potrzeb."
    },
    adoption: {
      eyebrow: "Dom stały",
      title: "Poznajmy się. Potem zamruczmy na swoim.",
      intro: "Adopcja to początek wspólnej historii. Dbamy o to, by kot i człowiek dobrze do siebie pasowali, a cały proces był spokojny i przejrzysty.",
      steps: ["Wypełnij ankietę adopcyjną i opowiedz nam o swoim domu.", "Porozmawiamy, odpowiemy na pytania i wspólnie dobierzemy kota.", "Umówimy zapoznanie. Czasem potrzebna jest więcej niż jedna wizyta.", "Po podpisaniu umowy kot ruszy do domu z wyprawką i naszym wsparciem."],
      requirements: ["Zabezpieczone okna i balkon, jeśli kot będzie miał do nich dostęp.", "Zgoda wszystkich domowników i gotowość na koszty opieki weterynaryjnej.", "Cierpliwość w czasie aklimatyzacji oraz kontakt z fundacją po adopcji."],
      formLabel: "Wypełnij ankietę adopcyjną"
    },
    foster: {
      eyebrow: "Dom tymczasowy",
      title: "Zostań bezpiecznym przystankiem.",
      intro: "Dom tymczasowy daje kotu przestrzeń, by dojść do siebie, oswoić się z codziennością i przygotować do adopcji. To ważna pomoc, nawet jeśli możesz przyjąć kota tylko na określony czas.",
      provides: ["Karmę i żwirek, zależnie od potrzeb kota.", "Opiekę weterynaryjną organizowaną przez fundację.", "Wsparcie wolontariuszki, wskazówki i kontakt w trudniejszych chwilach."],
      caregiver: ["Spokojne, bezpieczne pomieszczenie na początek.", "Codzienną opiekę, obserwację i cierpliwość.", "Współpracę przy poznawaniu charakteru kota i szukaniu domu stałego."],
      formLabel: "Zgłoś się na dom tymczasowy"
    },
    volunteer: {
      eyebrow: "Wolontariat",
      title: "Masz trochę czasu? Koty mają dla Ciebie mruknięcie.",
      intro: "Pomoc ma wiele kształtów. Możesz dołączyć do dyżurów, zrobić transport, pomóc przy zdjęciach albo wesprzeć nas organizacyjnie.",
      roles: [
        { title: "Opieka i dyżury", text: "Karmienie, sprzątanie, zabawa i spokojna obecność przy kotach." },
        { title: "Transporty", text: "Pomoc w dojazdach do lecznicy, domów tymczasowych i na spotkania." },
        { title: "Zdjęcia i ogłoszenia", text: "Pokazywanie osobowości podopiecznych i szukanie im dobrych domów." },
        { title: "Organizacja i bazarek", text: "Wsparcie wydarzeń, zbiórek rzeczowych oraz codziennych spraw stowarzyszenia." }
      ],
      formLabel: "Napisz do nas o wolontariacie"
    },
    physical: {
      eyebrow: "Jak pomóc?",
      title: "Paczka, która zmienia zwykły dzień w dobry dzień.",
      intro: "Najbardziej przydają nam się rzeczy z listy poniżej. Przy kotach ze specjalnymi potrzebami aktualizujemy ją na bieżąco.",
      needs: [
        { name: "Karma mokra wysokomięsna", note: "Mile widziane dobre składy i różne smaki." },
        { name: "Środki czystości", note: "Płyny do podłóg, ręczniki papierowe i worki na śmieci." },
        { name: "Żwirek", note: "Zbrylający, najlepiej drobny i bezzapachowy." },
        { name: "Suplementy", note: "Po wcześniejszym uzgodnieniu aktualnych potrzeb." },
        { name: "Smaczki", note: "Pomagają w oswajaniu i budowaniu dobrych skojarzeń." }
      ]
    },
    paws: {
      eyebrow: "Ocalone Łapki",
      title: "Mały pakiet, wielka pomoc dla kocich łapek.",
      intro: "Wybierz pakiet wsparcia na platformie Ocalone Łapki. Cała płatność odbywa się na zewnętrznej stronie zbiórki.",
      packages: [{ name: "Mini", amount: "49,99 zł", description: "Na pełną miseczkę i codzienną troskę." }, { name: "Standard", amount: "99,99 zł", description: "Na spokojniejszy zapas potrzebnych rzeczy." }, { name: "Maxi", amount: "149,99 zł", description: "Większy pakiet dobra dla naszych podopiecznych." }]
    },
    bazaar: {
      eyebrow: "Bazarek",
      title: "Fanty, licytacje i dużo mruczącego dobra.",
      intro: "Na naszej grupie bazarkowej znajdziesz rękodzieło, drobiazgi i rzeczy przekazane przez darczyńców. Licytując, pomagasz nam opiekować się podopiecznymi."
    },
    finance: {
      eyebrow: "Wsparcie finansowe",
      title: "Pomóż nam opłacić leczenie i codzienną opiekę.",
      intro: "Zbiórki prowadzone są na zewnętrznych platformach. Przejdź do wybranej strony, aby poznać aktualny cel i wesprzeć go bezpośrednio."
    },
    tax: {
      eyebrow: "1,5% podatku",
      title: "Sprawdź, komu możesz przekazać 1,5% podatku.",
      intro: "Zanim przekażesz 1,5%, sprawdź aktualne dane uprawnionej organizacji w swoim rozliczeniu podatkowym.",
      notice: "Numer KRS i status uprawniający do otrzymywania 1,5% wymagają potwierdzenia przez stowarzyszenie. Uzupełnij te dane przed publikacją tej sekcji.",
      krs: "",
      goal: "Stowarzyszenie Kociamberki – Mrucząca Przystań"
    },
    privacy: {
      eyebrow: "Informacje",
      title: "Polityka prywatności",
      intro: "Ten prototyp nie wysyła formularzy ani nie zapisuje danych osobowych. Preferencja zamknięcia banera cookies jest przechowywana lokalnie w przeglądarce. Przed wdrożeniem należy uzupełnić politykę prywatności o informacje dotyczące rzeczywistych narzędzi i administratora danych."
    }
  }
};
