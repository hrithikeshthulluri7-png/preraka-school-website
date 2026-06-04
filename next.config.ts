import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const connectSrc = isProd
  ? "connect-src 'self' https://luma.com https://wa.me https://api.whatsapp.com"
  : "connect-src 'self' ws: http: https:";
const scriptSrc = isProd
  ? "script-src 'self' 'unsafe-inline'"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  connectSrc,
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  "form-action 'self'",
  isProd ? "upgrade-insecure-requests" : "",
].filter(Boolean).join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Access-Control-Allow-Origin", value: isProd ? "https://preraka-school-website.vercel.app" : "http://localhost:3001" },
  { key: "Access-Control-Allow-Methods", value: "GET, HEAD, OPTIONS" },
  { key: "Access-Control-Allow-Credentials", value: "false" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()" },
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] : []),
];

const nextConfig: NextConfig = {
  compress: true,
  devIndicators: false,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
