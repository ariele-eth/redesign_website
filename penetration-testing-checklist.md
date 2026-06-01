# Website Penetration Testing Checklist

This checklist is tailored to your stack (Next.js, Cloudflare deployment, Sanity Studio, API endpoints, auth/integrations).  
For each test case, document evidence (request, response, screenshot, logs) and severity.

## 1) Authentication & Session

### 1.1 Broken Authentication on Admin/Studio Routes
- **Title:** Unauthorized access to protected routes
- **Explanation:** Attackers should not access admin, studio, or privileged endpoints without valid auth.
- **How to test:** Try direct access to `/studio`, admin paths, and protected API routes as logged-out user; test with modified cookies and expired tokens.

### 1.2 Session Fixation
- **Title:** Session ID reuse after login
- **Explanation:** Session identifiers should rotate on successful login.
- **How to test:** Capture session cookie before login, log in, verify cookie/session token changes.

### 1.3 Weak Logout
- **Title:** Session remains valid after logout
- **Explanation:** Logout should invalidate active session/token.
- **How to test:** Log in, logout, replay old authenticated request/cookie, confirm denial.

### 1.4 Brute-Force Resistance
- **Title:** No rate limiting on login/auth endpoints
- **Explanation:** Repeated auth attempts must be throttled/blocked.
- **How to test:** Send repeated invalid credentials; verify `429`/delays/challenge behavior and logging.

## 2) Authorization & Access Control

### 2.1 IDOR on User/Content Objects
- **Title:** Insecure direct object reference
- **Explanation:** Users must not access/edit resources by changing IDs in requests.
- **How to test:** Intercept requests with IDs (document IDs, user IDs), swap to other IDs, verify access denied.

### 2.2 Role Escalation
- **Title:** Privilege escalation via client-controlled fields
- **Explanation:** Role/permission fields must be server-enforced.
- **How to test:** Modify request payload fields like `role`, `isAdmin`, `ownerId`; confirm backend ignores/rejects.

### 2.3 Method-Level Access Control
- **Title:** Access allowed on disallowed HTTP methods
- **Explanation:** Endpoints may protect `GET` but forget `PUT/DELETE/PATCH`.
- **How to test:** Probe each API route with all methods; verify proper authorization and `405/403`.

## 3) Input Validation & Injection

### 3.1 SQL/NoSQL Injection
- **Title:** Injection through query/body parameters
- **Explanation:** Backend data layer must not execute untrusted input as query logic.
- **How to test:** Test payloads like quotes, boolean logic, operators, and malformed JSON in all filters/search params.

### 3.2 GROQ Injection (Sanity)
- **Title:** Unsafe dynamic GROQ query construction
- **Explanation:** Concatenated GROQ strings can leak/alter data.
- **How to test:** Review query-building code; inject crafted params into any dynamic query segments; ensure parameterized queries.

### 3.3 Command Injection
- **Title:** Server-side command execution via user input
- **Explanation:** Any shell/process invocation must sanitize input.
- **How to test:** Test metacharacters (`;`, `&&`, `|`, `$()`) in fields consumed by server tasks/jobs.

### 3.4 Path Traversal
- **Title:** File path escape via user-controlled path
- **Explanation:** Attackers should not read/write files outside intended directories.
- **How to test:** Probe file endpoints with `../` variants and URL-encoded traversal payloads.

## 4) XSS, CSRF, and Browser-Side Attacks

### 4.1 Stored XSS in CMS Content
- **Title:** Script injection in Sanity-managed fields
- **Explanation:** Content displayed from CMS can become persistent XSS if unsanitized.
- **How to test:** Insert payloads in rich text/title/description fields; verify rendered output is escaped/sanitized.

### 4.2 Reflected XSS
- **Title:** XSS via query/path parameters
- **Explanation:** URL-driven values may be reflected into HTML/JS.
- **How to test:** Add payloads to URL params and fragments; inspect DOM/source and runtime execution.

### 4.3 DOM-Based XSS
- **Title:** Client-side script execution via unsafe DOM sinks
- **Explanation:** `innerHTML`, URL parsing, and template insertion can be abused.
- **How to test:** Trace client JS handling user input and test payloads in hash/query/localStorage flows.

### 4.4 CSRF on State-Changing Endpoints
- **Title:** Missing CSRF protection
- **Explanation:** Authenticated browser requests should require CSRF defenses.
- **How to test:** Build cross-site form/fetch PoC for POST/PUT/DELETE actions; verify tokens/SameSite protections block.

### 4.5 Clickjacking
- **Title:** Missing frame protections
- **Explanation:** Site should not be embeddable for UI redress attacks.
- **How to test:** Load app in external `<iframe>` and verify `X-Frame-Options`/`frame-ancestors` blocks.

## 5) API & Backend Hardening

### 5.1 Rate Limiting on Public APIs
- **Title:** Abuse of unauthenticated endpoints
- **Explanation:** Public endpoints can be scraped or DoS-amplified.
- **How to test:** Burst requests to public APIs; verify throttling, challenge, and graceful degradation.

### 5.2 Mass Assignment
- **Title:** Unintended writable model fields
- **Explanation:** Backends that map JSON blindly may allow sensitive field writes.
- **How to test:** Add extra fields (`createdAt`, `ownerId`, `isVisible`, `role`) and verify whitelist enforcement.

### 5.3 Error Message Leakage
- **Title:** Stack traces/internal errors exposed
- **Explanation:** Verbose errors reveal internals useful for attackers.
- **How to test:** Send malformed payloads and trigger failures; confirm sanitized errors in production mode.

### 5.4 CORS Misconfiguration
- **Title:** Overly permissive cross-origin API access
- **Explanation:** `*` or reflected origins can expose authenticated APIs.
- **How to test:** Send cross-origin requests from untrusted origin; validate strict allowlist and credentials policy.

## 6) Secrets, Config, and Deployment

### 6.1 Exposed Secrets in Client Bundle
- **Title:** Sensitive env vars leaked to browser
- **Explanation:** Only public-safe variables should be shipped client-side.
- **How to test:** Inspect built JS and source maps for keys/tokens; verify only intended `NEXT_PUBLIC_*` values exist.

### 6.2 Publicly Accessible Debug Files
- **Title:** Source maps/config artifacts exposed
- **Explanation:** Debug artifacts can leak code logic and endpoints.
- **How to test:** Probe for `.map`, backup files, `.env`, and hidden config paths.

### 6.3 Security Header Coverage
- **Title:** Missing HTTP security headers
- **Explanation:** Headers reduce exploitability of browser attacks.
- **How to test:** Verify CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors.

### 6.4 TLS/HTTPS Enforcement
- **Title:** Insecure transport fallback
- **Explanation:** All traffic should be encrypted and redirected to HTTPS.
- **How to test:** Attempt `http://` access, check redirect behavior, HSTS preload settings, and mixed-content warnings.

## 7) File Uploads & Media

### 7.1 Malicious File Upload
- **Title:** Executable or polyglot file acceptance
- **Explanation:** Upload endpoints can enable malware/XSS if type checks are weak.
- **How to test:** Upload mismatched MIME/extension files, SVG with script, large files, and double extensions.

### 7.2 File Retrieval Authorization
- **Title:** Unauthorized access to private files
- **Explanation:** Private assets should require proper authorization.
- **How to test:** Attempt direct URL access to private assets without auth and with altered IDs/tokens.

## 8) Business Logic Abuse

### 8.1 Workflow Bypass
- **Title:** Bypass of publish/approval constraints
- **Explanation:** Attackers may skip intended moderation/approval logic.
- **How to test:** Replay or forge API calls to set publish flags/status directly.

### 8.2 Automation Abuse
- **Title:** High-frequency action abuse
- **Explanation:** Bots can abuse forms, newsletter, contact, and search endpoints.
- **How to test:** Script repeated submissions; verify captcha/rate limit/abuse detection.

## 9) Sanity Studio-Specific

### 9.1 Studio Access Restrictions
- **Title:** Unauthorized access to Sanity Studio
- **Explanation:** Studio should be restricted to intended identities.
- **How to test:** Access `*.sanity.studio` and `/studio` as unauthenticated/unprivileged user; verify denial.

### 9.2 Dataset Permission Boundaries
- **Title:** Over-permissive Sanity dataset tokens
- **Explanation:** Tokens should follow least privilege and not allow destructive operations unnecessarily.
- **How to test:** Review token scopes and attempt read/write/delete beyond intended permissions.

### 9.3 Content Tampering via API
- **Title:** Unauthorized document mutation
- **Explanation:** Sanity mutations should require proper credentials and scopes.
- **How to test:** Attempt mutation requests with missing/low-privileged tokens; verify strict authorization.

## 10) Verification & Reporting

### 10.1 Log and Alert Validation
- **Title:** Security events not logged/alerted
- **Explanation:** Detection is as important as prevention.
- **How to test:** Trigger blocked behaviors (rate limit, auth failure, 403) and verify logs/alerts.

### 10.2 Re-test After Fix
- **Title:** Regression and fix validation
- **Explanation:** Security fixes should remain effective over time.
- **How to test:** Re-run all exploited PoCs after patching; confirm closure and no side effects.

---

## Suggested Evidence Template (per finding)

- **Title:**
- **Severity:**
- **Endpoint/Path:**
- **Explanation:**
- **How to test (steps):**
- **Observed result:**
- **Expected secure result:**
- **Proof (request/response/screenshot):**
- **Fix recommendation:**

