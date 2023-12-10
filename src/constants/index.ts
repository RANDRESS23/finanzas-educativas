import pkg from "@/../package.json";

// Human-readable title for your website
export const rpName = pkg.description;
// A unique identifier for your website
export const rpID = new URL(
  process.env.NODE_ENV === "production"
    ? process.env.NEXTAUTH_ON_PRODUCTION_URL!
    : process.env.NEXTAUTH_URL!,
).hostname;
// The URL at which registrations and authentications should occur
export const origin =
  process.env.NODE_ENV === "production" ? `https://${rpID}` : `http://${rpID}`;
export const expectedOrigin =
  process.env.NODE_ENV === "production" ? origin : `${origin}:3000`;
