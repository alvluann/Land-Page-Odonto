export const brand = {
  name: "Dra. Luara Alves",
  role: "Cirurgiã-Dentista",
  cro: "CRO-SP 178662",
  city: "São Paulo - SP",
  whatsappNumber: "5512988588015",
  phoneDisplay: "(12) 98858-8015",
  email: "contato@draluaraalves.com.br",
  instagram: "@draluaraalves",
  instagramUrl: "https://instagram.com/draluaraalves",
};

const whatsappMessage =
  "Olá, Dra. Luara! Gostaria de agendar minha avaliação personalizada.";

export const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Resultados", href: "#resultados" },
  { label: "Depoimentos", href: "#depoimentos" },
];

export const heroHighlights = [
  "Atendimento humanizado em cada etapa",
  "Planejamento estético com naturalidade",
  "Tecnologia para conforto e segurança clínica",
];

export type ServiceIcon =
  | "cleaning"
  | "whitening"
  | "botox"
  | "harmonization"
  | "evaluation"
  | "aesthetics"
  | "prevention";

export interface ServiceItem {
  title: string;
  description: string;
  icon: ServiceIcon;
}

export const services: ServiceItem[] = [
  {
    title: "Limpeza dental premium",
    description:
      "Profilaxia completa para remover placa, devolver brilho ao sorriso e preservar a saúde bucal.",
    icon: "cleaning",
  },
  {
    title: "Clareamento dental",
    description:
      "Protocolos seguros e personalizados para um sorriso mais claro, harmônico e natural.",
    icon: "whitening",
  },
  {
    title: "Botox funcional e estético",
    description:
      "Suaviza linhas de expressão e auxilia no equilíbrio facial com aplicação precisa.",
    icon: "botox",
  },
  {
    title: "Harmonização facial",
    description:
      "Técnicas avançadas para realçar sua beleza sem perder identidade e expressão.",
    icon: "harmonization",
  },
  {
    title: "Avaliação personalizada",
    description:
      "Diagnóstico detalhado com escuta ativa para montar o plano ideal para o seu momento.",
    icon: "evaluation",
  },
  {
    title: "Estética dental",
    description:
      "Soluções para forma, cor e proporção dental, valorizando seu sorriso de forma elegante.",
    icon: "aesthetics",
  },
  {
    title: "Prevenção e manutenção",
    description:
      "Acompanhamento contínuo para manter resultados duradouros e saúde bucal em dia.",
    icon: "prevention",
  },
];

export const differentials = [
  {
    title: "Atendimento humanizado",
    description:
      "Você é acolhida com atenção real, escuta ativa e um plano feito para suas prioridades.",
  },
  {
    title: "Tecnologia atual",
    description:
      "Recursos clínicos modernos para garantir previsibilidade, precisão e segurança.",
  },
  {
    title: "Conforto em cada detalhe",
    description:
      "Ambiente leve, calmo e elegante para transformar a experiência odontológica.",
  },
  {
    title: "Segurança clínica",
    description:
      "Protocolos rigorosos de biossegurança e condutas baseadas em evidência.",
  },
  {
    title: "Resultado natural",
    description:
      "Tratamentos que preservam sua essência, buscando equilíbrio e sofisticação.",
  },
  {
    title: "Acompanhamento contínuo",
    description:
      "Pós-tratamento próximo para ajustar detalhes e manter excelência ao longo do tempo.",
  },
];

export const confidencePoints = [
  "Resultados reais com foco em naturalidade",
  "Cuidado personalizado para cada perfil facial",
  "Compromisso com saúde, estética e bem-estar",
];

export const resultGallery = [
  {
    src: "/assets/resultado-01.jpeg",
    alt: "Comparativo de resultado facial em paciente atendida pela Dra. Luara.",
    label: "Resultados reais",
  },
  {
    src: "/assets/resultado-02.jpeg",
    alt: "Antes e depois com expressão natural e harmoniosa.",
    label: "Naturalidade",
  },
  {
    src: "/assets/resultado-03.jpeg",
    alt: "Evolução estética com suavização de linhas de expressão.",
    label: "Precisão clínica",
  },
  {
    src: "/assets/resultado-05.jpeg",
    alt: "Tratamento de harmonização facial com equilíbrio de traços.",
    label: "Personalização",
  },
  {
    src: "/assets/resultado-06.jpeg",
    alt: "Comparativo clínico de rejuvenescimento facial sem exageros.",
    label: "Delicadeza",
  },
  {
    src: "/assets/resultado-07.jpeg",
    alt: "Paciente com resultado harmonioso e sorriso mais confiante.",
    label: "Confiança",
  },
];

export const testimonials = [
  {
    name: "Mariana S.",
    text: "A Dra. Luara é extremamente cuidadosa. O atendimento foi acolhedor e o resultado ficou elegante, exatamente como eu queria.",
  },
  {
    name: "Patrícia F.",
    text: "Me senti segura desde a avaliação. O plano foi explicado com clareza e cada detalhe do tratamento foi conduzido com muito profissionalismo.",
  },
  {
    name: "Camila R.",
    text: "A clínica transmite calma e confiança. Saí mais feliz com meu sorriso e com uma experiência muito melhor do que eu imaginava.",
  },
];
