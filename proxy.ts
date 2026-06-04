import { NextRequest, NextResponse } from "next/server";

const allowedMethods = new Set(["GET", "HEAD", "OPTIONS"]);
const blockedPatterns = [
  /\.\./,
  /%2e/i,
  /%00/i,
  /<script/i,
  /\bunion\b.*\bselect\b/i,
  /\bselect\b.*\bfrom\b/i,
  /\/\.env/i,
  /\/\.git/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/xmlrpc\.php/i,
  /\.php(?:$|[/?#])/i,
];

function isSuspiciousTarget(value: string) {
  let decoded = value;

  try {
    decoded = decodeURIComponent(value);
  } catch {
    return true;
  }

  return blockedPatterns.some((pattern) => pattern.test(decoded));
}

export function proxy(request: NextRequest) {
  const target = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (!allowedMethods.has(request.method)) {
    return new NextResponse("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: Array.from(allowedMethods).join(", "),
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  if (isSuspiciousTarget(target)) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|txt)$).*)"],
};
