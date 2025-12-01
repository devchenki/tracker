export type CompoundCategory = 'Injectables' | 'Orals' | 'Support';

export interface CompoundInfo {
  id: string;
  name: string;
  shortName: string;
  category: CompoundCategory;
  dosage: string;
  halfLife: string;
  aromatizes?: string;
  onset?: string;
  effects: string;
  requires?: string;
  warnings?: string;
  favorite?: boolean;
}

const COMPOUNDS_DATABASE: CompoundInfo[] = [
  // INJECTABLES
  {
    id: 'test_e',
    name: 'Testosterone Enanthate',
    shortName: 'Test E',
    category: 'Injectables',
    dosage: '200-600 мг/неделю',
    halfLife: '8-10.5 дня',
    aromatizes: 'Да (~20%)',
    onset: '3-4 недели',
    effects: 'Базовый андроген для большинства циклов',
    requires: 'AI: Anastrozole 0.5 мг 2x/неделю',
  },
  {
    id: 'deca',
    name: 'Nandrolone Decanoate',
    shortName: 'Deca/NPP',
    category: 'Injectables',
    dosage: '300-600 мг/неделю',
    halfLife: '15 дней',
    aromatizes: 'Низко (~20%)',
    effects: 'Набор массы, восстановление суставов',
    requires: 'PCT: Да, подавляет LH/FSH',
  },
  {
    id: 'tren_a',
    name: 'Trenbolone Acetate',
    shortName: 'Tren A',
    category: 'Injectables',
    dosage: '50-100 мг/день',
    halfLife: '2 дня',
    effects: 'Очень мощный, сухой рост',
    warnings: '⚠️ ОЧЕНЬ МОЩНЫЙ - только опытным. Побочные: Ночной пот, агрессия',
  },
  {
    id: 'eq',
    name: 'Boldenone Undecylenate',
    shortName: 'EQ',
    category: 'Injectables',
    dosage: '200-600 мг/неделю',
    halfLife: '14 дней',
    aromatizes: '~50% от Test',
    effects: 'Устойчивый рост, выносливость',
  },
  {
    id: 'hgh',
    name: 'Human Growth Hormone',
    shortName: 'HGH',
    category: 'Injectables',
    dosage: '2-6 МЕ/день',
    halfLife: '15-20 минут',
    onset: '3-6 месяцев',
    effects: 'Восстановление, жиросжигание, анти-эйдж',
    requires: 'Биотест для проверки подлинности',
  },
  
  // ORALS
  {
    id: 'anavar',
    name: 'Oxandrolone',
    shortName: 'Anavar/Var',
    category: 'Orals',
    dosage: '20-80 мг/день',
    aromatizes: 'Нет',
    effects: 'Сухой рост, минимум побочек',
    requires: 'Хорош для: Начинающих, женщин, финишеров',
  },
  {
    id: 'dbol',
    name: 'Methandienone',
    shortName: 'Dianabol/Dbol',
    category: 'Orals',
    dosage: '20-50 мг/день',
    aromatizes: 'Сильно',
    effects: 'БЫСТРЫЙ рост, вода, сила',
    requires: 'AI: Обязательно Anastrozole',
  },
  {
    id: 'winstrol',
    name: 'Stanozolol',
    shortName: 'Winstrol',
    category: 'Orals',
    dosage: '20-50 мг/день',
    aromatizes: 'Нет',
    effects: 'Сухой рост, сила',
  },
  {
    id: 'tbol',
    name: 'Turinabol',
    shortName: 'T-bol',
    category: 'Orals',
    dosage: '20-40 мг/день',
    aromatizes: 'Нет',
    effects: 'Сухой, качественный рост',
  },
  {
    id: 'andriol',
    name: 'Testosterone Undecanoate',
    shortName: 'Andriol',
    category: 'Orals',
    dosage: '120-240 мг/день (с едой)',
    aromatizes: 'Да, но медленно',
    effects: 'Мягкий рост, минимум побочек',
  },
  
  // SUPPORT
  {
    id: 'anastrozole',
    name: 'Anastrozole',
    shortName: 'Arimidex',
    category: 'Support',
    dosage: '0.5 мг 1-2x в неделю',
    effects: 'Ингибитор ароматазы',
    requires: 'Когда: При ароматизирующих стероидах',
  },
  {
    id: 'letrozole',
    name: 'Letrozole',
    shortName: 'Femara',
    category: 'Support',
    dosage: '1.25 мг через день',
    effects: 'Сильный ингибитор ароматазы',
    requires: 'Более мощный чем Anastrozole',
  },
  {
    id: 'tamoxifen',
    name: 'Tamoxifen',
    shortName: 'Nolvadex',
    category: 'Support',
    dosage: '20-40 мг/день',
    effects: 'SERM для PCT',
    requires: 'Восстановление LH/FSH и спермы',
  },
  {
    id: 'cabergoline',
    name: 'Cabergoline',
    shortName: 'Caber',
    category: 'Support',
    dosage: '0.25 мг 2x в неделю',
    effects: 'Снижение пролактина',
    requires: 'Когда: При Тренболоне, Деке',
  },
  {
    id: 'viagra_cialis',
    name: 'Viagra / Cialis',
    shortName: 'ED Meds',
    category: 'Support',
    dosage: '25-100 мг (Viagra), 5-20 мг (Cialis)',
    effects: 'Сексуальная дисфункция',
  },
];

class KnowledgeBaseServiceClass {
  getAllCompounds(): CompoundInfo[] {
    return COMPOUNDS_DATABASE;
  }

  getCompoundsByCategory(category: CompoundCategory): CompoundInfo[] {
    return COMPOUNDS_DATABASE.filter(c => c.category === category);
  }

  searchCompounds(query: string): CompoundInfo[] {
    const lowerQuery = query.toLowerCase();
    return COMPOUNDS_DATABASE.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) ||
      c.shortName.toLowerCase().includes(lowerQuery)
    );
  }

  getCompoundById(id: string): CompoundInfo | undefined {
    return COMPOUNDS_DATABASE.find(c => c.id === id);
  }
}

const KnowledgeBaseService = new KnowledgeBaseServiceClass();
export default KnowledgeBaseService;
