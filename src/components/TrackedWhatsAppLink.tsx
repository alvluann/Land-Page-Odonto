import type { AnchorHTMLAttributes, ReactNode } from "react";
import { whatsappHref } from "../data/content";
import { getCampaignData, trackConversion } from "../lib/analytics";

interface TrackedWhatsAppLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  placement: string;
  children: ReactNode;
}

function getAttributedHref() {
  const campaign = getCampaignData();
  const reference = [campaign.utm_source, campaign.utm_campaign].filter(Boolean).join(" / ");

  if (!reference) return whatsappHref;

  const url = new URL(whatsappHref);
  const message = url.searchParams.get("text") ?? "";
  url.searchParams.set("text", `${message}\n\nReferência da campanha: ${reference}`);
  return url.toString();
}

export function TrackedWhatsAppLink({
  placement,
  children,
  onClick,
  target = "_blank",
  rel = "noreferrer",
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      href={getAttributedHref()}
      target={target}
      rel={rel}
      onClick={(event) => {
        trackConversion("whatsapp_click", placement);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
