const WASABI_ENDPOINT = import.meta.env.WASABI_ENDPOINT || 'https://s3.wasabisys.com';
const WASABI_BUCKET = import.meta.env.WASABI_BUCKET || 'stigold-assets';
const WASABI_REGION = import.meta.env.WASABI_REGION || 'us-east-1';

export function getWasabiUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://${WASABI_BUCKET}.s3.${WASABI_REGION}.wasabisys.com/${cleanPath}`;
}
