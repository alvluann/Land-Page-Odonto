export type ConversionEventName =
  | "whatsapp_click"
  | "results_gallery_engaged"
  | "experience_video_play";

export interface ConversionEvent {
  event: ConversionEventName;
  placement: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

declare global {
  interface Window {
    dataLayer?: ConversionEvent[];
  }
}

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const STORAGE_KEY = "luara_campaign_attribution";

type CampaignData = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;

function sanitizeCampaignValue(value: string | null) {
  if (!value) return undefined;
  const sanitized = value.trim().replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 80);
  return sanitized || undefined;
}

export function getCampaignData(): CampaignData {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(
    CAMPAIGN_KEYS.flatMap((key) => {
      const value = sanitizeCampaignValue(params.get(key));
      return value ? [[key, value]] : [];
    }),
  ) as CampaignData;

  if (Object.keys(current).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      // A atribuição é opcional quando o armazenamento está indisponível.
    }
    return current;
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CampaignData) : {};
  } catch {
    return {};
  }
}

export function trackConversion(event: ConversionEventName, placement: string) {
  if (typeof window === "undefined") return;

  const detail: ConversionEvent = { event, placement, ...getCampaignData() };
  window.dispatchEvent(new CustomEvent("luara:conversion", { detail }));
  window.dataLayer?.push(detail);
}
