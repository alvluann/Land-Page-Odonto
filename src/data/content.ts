import { assetUrl } from "../lib/assetUrl";
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
      "Profilaxia comp���q�^