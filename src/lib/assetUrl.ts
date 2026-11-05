import blobUrls from "../data/blob-urls.json";

export function assetUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return (blobUrls as Record<string, string>)[normalizedPath] ?? `${import.meta.env.BASE_URL}${normalizedPath}`;
}
