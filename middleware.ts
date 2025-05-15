import { NextRequest, NextResponse } from 'next/server';

// In-memory store for rate limiting
// Note: This will reset on deployments and doesn't scale across multiple instances
// For production, use Redis or another distributed cache
// IMPORTANT: Use environment variables for production configuration
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();
const blockedIps = new Map<string, number>();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const RATE_LIMIT_MAX = 100; // Maximum requests per minute
const BLOCK_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const SUSPICIOUS_USER_AGENTS = [
  'curl', 'python-requests', 'go-http-client', 'wget',
  'bot', 'spider', 'crawl', 'scan'
];

// Static assets extensions to bypass protection
const STATIC_EXTENSIONS = /\.(jpg|jpeg|png|gif|svg|css|js|woff|woff2|ttf|eot|ico|webp)$/i;

// Debug settings - set to true to enable detailed logging
const DEBUG_MODE = true;

export function middleware(request: NextRequest) {
  // Get IP from headers as request.ip is no longer available
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const url = request.nextUrl.clone();
  
  // Skip DDoS protection for static assets
  if (url.pathname.match(STATIC_EXTENSIONS)) {
    return NextResponse.next();
  }
  
  // Check if IP is blocked
  if (blockedIps.has(ip)) {
    const blockExpiry = blockedIps.get(ip) || 0;
    if (Date.now() < blockExpiry) {
      // Log blocked IP with remaining block time
      const remainingBlockTime = Math.ceil((blockExpiry - Date.now()) / 1000);
      console.log(`🛑 BLOCKED REQUEST: IP ${ip} blocked for ${remainingBlockTime} more seconds`);
      
      return new NextResponse(`Too Many Requests you are banned for  ${remainingBlockTime}`, {
        status: 429,
        headers: {
          'Retry-After': '300',
          'Content-Type': 'text/plain',
        },
      });
    } else {
      blockedIps.delete(ip);
    }
  }
  
  // Rate limiting
  const now = Date.now();
  const ipData = ipRequestCounts.get(ip) || { count: 0, timestamp: now };
  
  // Reset counter if outside window
  if (now - ipData.timestamp > RATE_LIMIT_WINDOW) {
    ipData.count = 0;
    ipData.timestamp = now;
  }
  
  ipData.count++;
  ipRequestCounts.set(ip, ipData);
  
  // Debug logging for requests (only if in debug mode)
  if (DEBUG_MODE && ipData.count % 10 === 0) { // Log every 10th request
    console.log(`📊 Request stats for IP ${ip}: ${ipData.count} requests in current window`);
  }
  
  // Check if rate limit exceeded
  if (ipData.count > RATE_LIMIT_MAX) {
    blockedIps.set(ip, now + BLOCK_DURATION);
    
    // Log when an IP gets blocked due to rate limiting
    const blockDurationMinutes = BLOCK_DURATION / (60 * 1000);
    console.log(`⛔ RATE LIMIT EXCEEDED: Blocking IP ${ip} for ${blockDurationMinutes} minutes (${ipData.count} requests in 1 minute)`);
    
    return new NextResponse(`Too Many Requests you are banned for  ${remainingBlockTime}`, {
      status: 429,
      headers: {
        'Retry-After': '300',
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Bot detection - simple heuristics
  const isSuspiciousUserAgent = SUSPICIOUS_USER_AGENTS.some(agent => 
    userAgent.toLowerCase().includes(agent)
  );
  
  // Check for missing or suspicious headers
  const hasAcceptHeader = request.headers.has('accept');
  const hasAcceptLanguage = request.headers.has('accept-language');
  
  // Suspicious behavior score
  let suspiciousScore = 0;
  
  if (isSuspiciousUserAgent) suspiciousScore += 2;
  if (!hasAcceptHeader) suspiciousScore += 1;
  if (!hasAcceptLanguage) suspiciousScore += 1;
  if (!referer && url.pathname !== '/' && !request.headers.get('sec-fetch-site')) suspiciousScore += 1;
  
  // Additional checks for potential DDoS patterns
  const method = request.method;
  if (method !== 'GET' && method !== 'POST') suspiciousScore += 1;
  
  // Block highly suspicious requests
  if (suspiciousScore >= 3) {
    blockedIps.set(ip, now + BLOCK_DURATION);
    
    // Log when an IP gets blocked due to suspicious behavior
    console.log(`🚨 SUSPICIOUS BEHAVIOR: Blocking IP ${ip} for suspicious activity (score: ${suspiciousScore})`);
    console.log(`- User-Agent: ${userAgent}`);
    console.log(`- Path: ${url.pathname}`);
    console.log(`- Method: ${request.method}`);
    console.log(`- Missing headers: ${!hasAcceptHeader ? 'accept, ' : ''}${!hasAcceptLanguage ? 'accept-language, ' : ''}${!referer ? 'referer' : ''}`);
    
    return new NextResponse('Forbidden', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Add security headers to response
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}

// Configure the middleware to run on all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * But still apply protection to API routes and all other paths
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
