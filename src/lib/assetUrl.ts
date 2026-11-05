const BLOB_MEDIA_BASE = "https://h2ye6tn1vb5bxygx.public.blob.vercel-storage.com/media/";

export function assetUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "").replace(/^media\//, "");
  const encodedPath = normalizedPath
    .split("/")
    .map((part) => encodeURIComponent(part).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`))
    .join("/");
  return `${BLOB_MEDIA_BASE}${encodedPath}`;
}
