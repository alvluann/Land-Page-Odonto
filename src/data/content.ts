export const brand = {
  name: "Dra. Luara Alves",
  role: "Cirurgiã-Dentista",
  cro: "CRO-SP 178662",
  whatsappNumber: "5512988588015",
  phoneDisplay: "(12) 98858-8015",
  email: "contato@draluaraalves.com.br",
  instagram: "@draluaraalves",
  instagramUrl: "https://instagram.com/draluaraalves",
};

export const siteUrl = "https://lumiodontologia.net";

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
  { label: "Dúvidas", href: "#duvidas" },
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

export interface ResultGalleryItem {
  src: string;
  alt: string;
  label: string;
  category: string;
  format?: "portrait";
}

const resultLabels = [
  "Evolução real",
  "Identidade preservada",
  "Cuidado individual",
  "Naturalidade",
  "Precisão clínica",
  "Acompanhamento",
] as const;

export const resultGallery: ResultGalleryItem[] = Array.from(
  { length: 54 },
  (_, index) => ({
    src: `results/caso-${String(index + 1).padStart(2, "0")}.webp`,
    alt: `Registro comparativo do caso clínico ${String(index + 1).padStart(2, "0")} atendido pela Dra. Luara Alves.`,
    label: resultLabels[index % resultLabels.length],
    category: "Caso clínico",
    format: "portrait",
  }),
);

export interface ExperienceMediaItem {
  src: string;
  poster: string;
  title: string;
  description: string;
  ariaLabel: string;
}

export const experienceMedia: ExperienceMediaItem[] = [
  {
    src: "videos/dra-luara-apresentacao.mp4",
    poster: "videos/dra-luara-apresentacao-poster.webp",
    title: "Cuidado que começa na escuta",
    description: "Dra. Luara apresenta a experiência e o olhar por trás de cada atendimento.",
    ariaLabel: "Vídeo de apresentação da Dra. Luara Alves",
  },
  {
    src: "videos/orientacao-botox.mp4",
    poster: "videos/orientacao-botox-poster.webp",
    title: "Informação antes da decisão",
    description: "Uma orientação breve sobre avaliação individual e escolhas conscientes.",
    ariaLabel: "Vídeo de orientação da Dra. Luara sobre Botox",
  },
  {
    src: "videos/preenchimento-labial.mp4",
    poster: "videos/preenchimento-labial-poster.webp",
    title: "Precisão em cada detalhe",
    description: "Um registro vertical de procedimento realizado no consultório.",
    ariaLabel: "Vídeo de procedimento labial realizado pela Dra. Luara Alves",
  },
  {
    src: "videos/estetica-sorriso.mp4",
    poster: "videos/estetica-sorriso-poster.webp",
    title: "Sorrisos em evolução",
    description: "Um registro odontológico que aproxima o resultado da experiência real.",
    ariaLabel: "Vídeo de resultado odontológico apresentado pela Dra. Luara Alves",
  },
];

export const aboutPortraits = [
  {
    src: "editorial/dra-luara-retrato-01.webp",
    alt: "Retrato da Dra. Luara Alves em ambiente externo ao consultório.",
  },
  {
    src: "editorial/dra-luara-retrato-02.webp",
    alt: "Dra. Luara Alves em retrato espontâneo.",
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

export const faqs = [
  {
    question: "Como funciona a primeira avaliação?",
    answer:
      "A avaliação começa com uma conversa sobre suas prioridades e seu histórico. Depois do exame clínico, a Dra. Luara explica as possibilidades adequadas ao seu caso e os próximos passos.",
  },
  {
    question: "Como o tratamento é definido?",
    answer:
      "Não existe um plano único para todas as pessoas. A indicação depende da avaliação individual, das características do sorriso ou da face e do resultado que você deseja alcançar.",
  },
  {
    question: "Quanto tempo dura o tratamento?",
    answer:
      "O tempo varia conforme o procedimento e a necessidade de cada pessoa. A previsão de etapas e retornos é apresentada depois da avaliação, antes de qualquer decisão.",
  },
  {
    question: "Os resultados são iguais para todo mundo?",
    answer:
      "Não. Cada organismo e cada anatomia respondem de uma forma. As imagens da página mostram casos individuais e não representam promessa de resultado.",
  },
  {
    question: "Posso tirar dúvidas pelo WhatsApp?",
    answer:
      "Sim. A equipe pode orientar sobre agenda e funcionamento do atendimento. Dúvidas clínicas e indicações de tratamento precisam ser avaliadas individualmente pela profissional.",
  },
  {
    question: "O que acontece depois que eu peço um horário?",
    answer:
      "A equipe continua a conversa pelo WhatsApp para verificar disponibilidade e combinar os detalhes da avaliação. O envio da mensagem não confirma automaticamente um horário.",
  },
];
