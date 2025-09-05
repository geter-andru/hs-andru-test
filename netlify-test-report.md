# H&S Platform Netlify Test Report - Phase 2 (Build Testing)
Generated: 2025-09-05T05:12:50.177Z
Duration: 10.31s
Total Tests: 12

## Summary
✅ Passed: 9
❌ Failed: 3
⚠️ Warnings: 3

## Test Results

### ✅ Passed Tests (9)
- Large Files Check: No large files in src directory
- Dependency: react: 19.1.0
- Dependency: react-dom: 19.1.0
- Dependency: next: 15.4.6
- Dependency: axios: ^1.11.0
- React Version Compatibility: React and ReactDOM versions compatible
- Security Audit: No high-severity vulnerabilities
- Build Cleanup: Previous build files cleaned
- Source Maps: No source maps in production build

### ❌ Failed Tests (3)
- TypeScript Check: Type errors found - may prevent build
- Build Failed: Build failed: Command failed: npm run build

> hs-platform-frontend@0.1.0 build
> npm run pre-build-audit && npm run validate:honesty && next build


> hs-platform-frontend@0.1.0 pre-build-audit
> npm run validate:no-jsx && npm run validate:no-mock && npm run type-check && npm run lint-check


> hs-platform-frontend@0.1.0 validate:no-jsx
> ! find app lib -name '*.jsx' -not -path '*/node_modules/*' 2>/dev/null | grep . && echo '✓ No JSX files found' || (echo '✗ ERROR: JSX files found! Convert to TSX:' && find app lib -name '*.jsx' -not -path '*/node_modules/*' && exit 1)

✓ No JSX files found

> hs-platform-frontend@0.1.0 validate:no-mock
> ! grep -r 'mockData\|MOCK_DATA\|fakeData\|dummyData\|testData' app/ lib/ --include='*.tsx' --include='*.ts' 2>/dev/null | grep -v '// @production-approved' && echo '✓ No mock data found' || (echo '✗ ERROR: Mock data found!' && grep -r 'mockData\|MOCK_DATA\|fakeData\|dummyData\|testData' app/ lib/ --include='*.tsx' --include='*.ts' | head -10 && exit 1)

✓ No mock data found

> hs-platform-frontend@0.1.0 type-check
> tsc --noEmit --strict

app/api/admin/migrate/route.ts(49,71): error TS2345: Argument of type '{ sql: string; }' is not assignable to parameter of type 'undefined'.
app/api/airtable/test/route.ts(51,22): error TS18046: 'data' is of type 'unknown'.
app/api/auth/[...supabase]/route.ts(82,23): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; created_at: string; updated_at: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; created_at: string; updated_at: string; }' is not assignable to parameter of type 'never[]'.
      Type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; created_at: string; updated_at: string; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/api/invitations/route.ts(187,52): error TS2339: Property 'max_members' does not exist on type 'never'.
app/api/invitations/route.ts(196,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "team_invitations", never, "POST">', gave the following error.
    Argument of type '{ organization_id: string; email: string; role: string; permissions: string[]; invited_by: string; expires_at: string; status: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "team_invitations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'organization_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(226,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: string; activity_type: string; details: { invited_email: string; role: string; organization_name: any; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(233,43): error TS2339: Property 'name' does not exist on type 'never'.
app/api/invitations/route.ts(239,87): error TS2339: Property 'name' does not exist on type 'never'.
app/api/invitations/route.ts(294,29): error TS2339: Property 'expires_at' does not exist on type 'never'.
app/api/invitations/route.ts(297,17): error TS2345: Argument of type '{ status: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(307,22): error TS2339: Property 'email' does not exist on type 'never'.
app/api/invitations/route.ts(313,22): error TS2339: Property 'status' does not exist on type 'never'.
app/api/invitations/route.ts(323,43): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(326,52): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/invitations/route.ts(335,10): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; role: any; permissions: any; invited_by: any; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(337,39): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(338,28): error TS2339: Property 'role' does not exist on type 'never'.
app/api/invitations/route.ts(339,35): error TS2339: Property 'permissions' does not exist on type 'never'.
app/api/invitations/route.ts(340,34): error TS2339: Property 'invited_by' does not exist on type 'never'.
app/api/invitations/route.ts(355,17): error TS2345: Argument of type '{ status: string; accepted_at: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(364,10): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; activity_type: string; details: { organization_name: any; role: any; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(366,39): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(369,43): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/invitations/route.ts(370,30): error TS2339: Property 'role' does not exist on type 'never'.
app/api/invitations/route.ts(377,22): error TS2339: Property 'email' does not exist on type 'never'.
app/api/invitations/route.ts(385,17): error TS2345: Argument of type '{ status: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(394,43): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(398,66): error TS2339: Property 'role' does not exist on type 'never'.
app/api/invitations/route.ts(406,17): error TS2345: Argument of type '{ status: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(432,16): error TS2339: Property 'id' does not exist on type 'never'.
app/api/jobs/[jobId]/route.ts(46,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/[jobId]/route.ts(155,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/[jobId]/route.ts(238,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/[jobId]/route.ts(310,38): error TS2345: Argument of type '(request: NextRequest, { params }: { params: JobParams; }) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest, args_0: { params: JobParams; }) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/[jobId]/route.ts(311,41): error TS2345: Argument of type '(request: NextRequest, { params }: { params: JobParams; }) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest, args_0: { params: JobParams; }) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/[jobId]/route.ts(312,39): error TS2345: Argument of type '(request: NextRequest, { params }: { params: JobParams; }) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest, args_0: { params: JobParams; }) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(68,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/route.ts(130,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/route.ts(216,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/route.ts(259,39): error TS2345: Argument of type '(request: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(261,38): error TS2345: Argument of type '(req: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(273,41): error TS2345: Argument of type '(req: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(276,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/middleware/auth.ts(36,39): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
app/api/middleware/auth.ts(37,40): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
app/api/organizations/route.ts(53,42): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/organizations/route.ts(57,11): error TS2698: Spread types may only be created from object types.
app/api/organizations/route.ts(59,24): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/organizations/route.ts(89,13): error TS2339: Property 'name' does not exist on type 'unknown'.
app/api/organizations/route.ts(89,19): error TS2339: Property 'slug' does not exist on type 'unknown'.
app/api/organizations/route.ts(89,25): error TS2339: Property 'description' does not exist on type 'unknown'.
app/api/organizations/route.ts(89,38): error TS2339: Property 'plan' does not exist on type 'unknown'.
app/api/organizations/route.ts(120,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "organizations", never, "POST">', gave the following error.
    Argument of type '{ name: any; slug: any; description: any; owner_id: string; plan: any; max_members: number; settings: {}; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "organizations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'name' does not exist in type 'never[]'.
app/api/organizations/route.ts(144,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; role: string; permissions: string[]; invited_by: string; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/organizations/route.ts(146,33): error TS2339: Property 'id' does not exist on type 'never'.
app/api/organizations/route.ts(159,26): error TS2339: Property 'id' does not exist on type 'never'.
app/api/organizations/route.ts(170,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; activity_type: string; details: { action: string; organization_name: any; role: string; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/organizations/route.ts(172,33): error TS2339: Property 'id' does not exist on type 'never'.
app/api/progress/[customerId]/track/route.ts(30,15): error TS2339: Property 'action' does not exist on type 'unknown'.
app/api/progress/[customerId]/track/route.ts(30,23): error TS2339: Property 'metadata' does not exist on type 'unknown'.
app/api/research/route.ts(51,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/research/route.ts(173,39): error TS2345: Argument of type '(request: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/roles/route.ts(32,68): error TS2339: Property 'role' does not exist on type 'never'.
app/api/roles/route.ts(109,7): error TS2339: Property 'userId' does not exist on type 'unknown'.
app/api/roles/route.ts(110,7): error TS2339: Property 'roleName' does not exist on type 'unknown'.
app/api/roles/route.ts(111,7): error TS2339: Property 'expiresAt' does not exist on type 'unknown'.
app/api/roles/route.ts(112,7): error TS2339: Property 'metadata' does not exist on type 'unknown'.
app/api/roles/route.ts(147,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_roles", never, "POST">', gave the following error.
    Argument of type '{ user_id: any; role_name: any; granted_by: string; expires_at: any; metadata: any; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_roles", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/roles/route.ts(169,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: any; activity_type: string; details: { action: string; role_name: any; assigned_by: string | undefined; expires_at: any; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/roles/route.ts(211,13): error TS2339: Property 'roleId' does not exist on type 'unknown'.
app/api/roles/route.ts(235,15): error TS2345: Argument of type '{ is_active: boolean; updated_at: string; }' is not assignable to parameter of type 'never'.
app/api/roles/route.ts(252,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: any; activity_type: string; details: { action: string; role_name: any; revoked_by: string | undefined; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/roles/route.ts(253,23): error TS2339: Property 'user_id' does not exist on type 'never'.
app/api/roles/route.ts(257,27): error TS2339: Property 'role_name' does not exist on type 'never'.
app/api/test-supabase/route.ts(38,9): error TS7034: Variable 'tables' implicitly has type 'any[]' in some locations where its type cannot be determined.
app/api/test-supabase/route.ts(78,19): error TS7005: Variable 'tables' implicitly has an 'any[]' type.
app/api/users/profile/route.ts(45,17): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; preferences: { email_notifications: boolean; marketing_emails: boolean; theme: string; language: string; }; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; preferences: { email_notifications: boolean; marketing_emails: boolean; theme: string; language: string; }; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never[]'.
      Type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; preferences: { email_notifications: boolean; marketing_emails: boolean; theme: string; language: string; }; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/api/users/profile/route.ts(63,30): error TS2339: Property 'created_at' does not exist on type 'SupabaseUser'.
app/api/users/profile/route.ts(102,9): error TS2698: Spread types may only be created from object types.
app/api/users/profile/route.ts(127,7): error TS2339: Property 'full_name' does not exist on type 'unknown'.
app/api/users/profile/route.ts(128,7): error TS2339: Property 'avatar_url' does not exist on type 'unknown'.
app/api/users/profile/route.ts(129,7): error TS2339: Property 'company' does not exist on type 'unknown'.
app/api/users/profile/route.ts(130,7): error TS2339: Property 'job_title' does not exist on type 'unknown'.
app/api/users/profile/route.ts(131,7): error TS2339: Property 'phone' does not exist on type 'unknown'.
app/api/users/profile/route.ts(132,7): error TS2339: Property 'timezone' does not exist on type 'unknown'.
app/api/users/profile/route.ts(133,7): error TS2339: Property 'locale' does not exist on type 'unknown'.
app/api/users/profile/route.ts(134,7): error TS2339: Property 'preferences' does not exist on type 'unknown'.
app/api/users/profile/route.ts(161,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
app/api/users/profile/route.ts(193,17): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; job_title: any; phone: any; timezone: any; locale: any; preferences: any; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; job_title: any; phone: any; timezone: any; locale: any; preferences: any; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never[]'.
      Type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; job_title: any; phone: any; timezone: any; locale: any; preferences: any; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/api/users/profile/route.ts(217,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; activity_type: string; details: { updated_fields: string[]; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/users/profile/route.ts(252,15): error TS2345: Argument of type '{ is_active: boolean; updated_at: string; }' is not assignable to parameter of type 'never'.
app/api/users/profile/route.ts(271,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; activity_type: string; details: { action: string; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/auth/actions.ts(25,7): error TS7027: Unreachable code detected.
app/auth/page.tsx(5,26): error TS2307: Cannot find module '../components/auth/SupabaseAuth' or its corresponding type declarations.
app/customer/[customerId]/dashboard-premium/DashboardPremiumClient.tsx(88,46): error TS2322: Type '{ children: Element; key: string; size: string; className: string; }' is not assignable to type 'IntrinsicAttributes & ModernCardProps'.
  Property 'size' does not exist on type 'IntrinsicAttributes & ModernCardProps'.
app/customer/[customerId]/dashboard-premium/DashboardPremiumClient.tsx(94,19): error TS2322: Type '{ percentage: number; size: number; className: string; }' is not assignable to type 'IntrinsicAttributes & ModernCircularProgressProps'.
  Property 'className' does not exist on type 'IntrinsicAttributes & ModernCircularProgressProps'.
app/customer/[customerId]/dashboard-premium/DashboardPremiumClient.tsx(105,21): error TS2322: Type '{ children: Element[]; size: string; className: string; }' is not assignable to type 'IntrinsicAttributes & ModernCardProps'.
  Property 'size' does not exist on type 'IntrinsicAttributes & ModernCardProps'.
app/customer/[customerId]/simplified/dashboard/ModernPlatformDashboard.tsx(108,32): error TS2322: Type '{ children: Element; customerId: any; }' is not assignable to type 'IntrinsicAttributes & SystematicScalingProviderProps'.
  Property 'customerId' does not exist on type 'IntrinsicAttributes & SystematicScalingProviderProps'.
app/customer/[customerId]/simplified/resources/ResourcesClient.tsx(93,32): error TS2322: Type '{ children: Element; customerId: string; }' is not assignable to type 'IntrinsicAttributes & SystematicScalingProviderProps'.
  Property 'customerId' does not exist on type 'IntrinsicAttributes & SystematicScalingProviderProps'.
app/demo/phase-3f/page.tsx(11,25): error TS2307: Cannot find module '../../components/progressive-engagement/WelcomeHero' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(12,44): error TS2307: Cannot find module '../../components/progressive-engagement/ProgressiveEngagementContainer' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(13,34): error TS2307: Cannot find module '../../components/progressive-engagement/CompellingAspectDemo' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(14,42): error TS2307: Cannot find module '../../components/progressive-engagement/IntegratedIntelligenceReveal' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(15,58): error TS2307: Cannot find module '../../components/progressive-engagement/SuccessMetrics' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(129,51): error TS7006: Parameter 'interaction' implicitly has an 'any' type.
app/demo/phase-3f/page.tsx(129,64): error TS7006: Parameter 'index' implicitly has an 'any' type.
app/hooks/useResourceGeneration.ts(170,25): error TS18046: 'errorData' is of type 'unknown'.
app/integration-test/page.tsx(20,17): error TS18046: 'apiData' is of type 'unknown'.
app/integration-test/page.tsx(21,18): error TS18046: 'apiData' is of type 'unknown'.
app/integration-test/page.tsx(45,17): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(45,39): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(46,27): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(62,17): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(62,44): error TS18046: 'data2' is of type 'unknown'.
app/lib/components/ErrorBoundary.tsx(25,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
app/lib/components/ErrorBoundary.tsx(33,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
app/lib/contexts/UserIntelligenceContext.tsx(76,7): error TS2353: Object literal may only specify known properties, and 'performance' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(88,7): error TS2353: Object literal may only specify known properties, and 'industry' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(99,7): error TS2353: Object literal may only specify known properties, and 'tier' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(105,7): error TS2353: Object literal may only specify known properties, and 'totalSessions' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(112,25): error TS2698: Spread types may only be created from object types.
app/lib/contexts/UserIntelligenceContext.tsx(116,30): error TS2698: Spread types may only be created from object types.
app/lib/contexts/UserIntelligenceContext.tsx(125,16): error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'SetStateAction<null>'.
app/lib/events/ResourceGenerationEvents.ts(114,7): error TS2353: Object literal may only specify known properties, and 'available' does not exist in type 'Omit<EventPayload, "timestamp">'.
app/lib/events/ResourceGenerationEvents.ts(124,7): error TS2353: Object literal may only specify known properties, and 'available' does not exist in type 'Omit<EventPayload, "timestamp">'.
app/lib/services/agentOrchestrationService.ts(172,7): error TS18004: No value exists in scope for the shorthand property 'agentsSpawned'. Either declare one or provide an initializer.
app/lib/services/agentOrchestrationService.ts(553,12): error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ revenue_crisis: { requiredAgents: ("customer_intelligence" | "value_communication" | "sales_execution" | "systematic_optimization")[]; actionPlan: string[]; expectedResolution: string; }; customer_churn: { ...; }; competitive_threat: { ...; }; growth_bottleneck: { ...; }; }'.
  No index signature with a parameter of type 'string' was found on type '{ revenue_crisis: { requiredAgents: ("customer_intelligence" | "value_communication" | "sales_execution" | "systematic_optimization")[]; actionPlan: string[]; expectedResolution: string; }; customer_churn: { ...; }; competitive_threat: { ...; }; growth_bottleneck: { ...; }; }'.
app/lib/services/claudeAIService.ts(246,12): error TS18046: 'data' is of type 'unknown'.
app/lib/services/customerValueOrchestrator.ts(761,86): error TS1064: The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<string[]>'?
app/lib/services/exportService.ts(94,25): error TS18046: 'error' is of type 'unknown'.
app/lib/services/exportService.ts(299,58): error TS1064: The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<ExportResult>'?
app/lib/services/exportService.ts(423,14): error TS18046: 'data' is of type 'unknown'.
app/lib/services/supabaseClient.ts(242,3): error TS2322: Type 'string | boolean | undefined' is not assignable to type 'boolean'.
  Type 'undefined' is not assignable to type 'boolean'.
app/lib/services/supabaseClient.ts(254,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; session_id: string; pipeline_status: string; current_step: string; progress_data: { started_at: string; }; error_count: number; expires_at: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'customer_id' does not exist in type 'never[]'.
app/lib/services/supabaseClient.ts(281,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
app/lib/services/supabaseClient.ts(297,34): error TS2339: Property 'error_count' does not exist on type 'never'.
app/lib/services/supabaseClient.ts(302,15): error TS2345: Argument of type '{ error_count: any; last_error: string; pipeline_status: string; updated_at: string; }' is not assignable to parameter of type 'never'.
app/lib/services/supabaseDataService.ts(129,17): error TS2345: Argument of type '{ user_id: string; status: string; updated_at: string; }' is not assignable to parameter of type 'never'.
app/lib/services/supabaseDataService.ts(134,30): error TS2339: Property 'id' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(146,35): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(147,34): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(148,27): error TS2339: Property 'email' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(151,36): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(156,43): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(163,50): error TS2339: Property 'created_at' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(171,17): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_assets", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; customer_name: string; company_name?: string | undefined; email: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_assets", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; customer_name: string; company_name?: string | undefined; email: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is not assignable to parameter of type 'never[]'.
      Type '{ customer_id: string; customer_name: string; company_name?: string | undefined; email: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/lib/services/supabaseDataService.ts(182,12): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; customer_id: string; full_name: any; company_name: any; job_title: any; subscription_status: string; onboarding_completed: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/lib/services/supabaseDataService.ts(185,35): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(186,38): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(187,35): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(230,27): error TS2339: Property 'session_id' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(231,32): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(232,23): error TS2339: Property 'email' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(233,27): error TS2339: Property 'created_at' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(269,36): error TS2339: Property 'customer_id' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(277,25): error TS2322: Type 'null' is not assignable to type '{ id: string; customer_id: string; customer_name: string; company_name: string; email: string; workflow_progress: any; competency_progress: any; tool_access_status: any; detailed_icp_analysis: any; ... 9 more ...; updated_at: string; } | undefined'.
app/lib/services/supabaseDataService.ts(301,41): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(341,17): error TS2345: Argument of type '{ updated_at: string; customer_name?: string; company_name?: string; email?: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is not assignable to parameter of type 'never'.
app/lib/services/supabaseDataService.ts(388,10): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "assessment_sessions", never, "POST">', gave the following error.
    Argument of type '{ session_id: string; assessment_data: AssessmentData; email: string | undefined; status: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "assessment_sessions", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'session_id' does not exist in type 'never[]'.
app/lib/services/webResearchService.ts(90,15): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(90,28): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(91,60): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(93,61): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(330,25): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
app/lib/services/webResearchService.ts(350,14): error TS18046: 'data' is of type 'unknown'.
app/lib/types/supabase.ts(7,7): error TS2411: Property 'customer_assets' of type '{ Row: CustomerAsset; Insert: Partial<CustomerAsset>; Update: Partial<CustomerAsset>; }' is not assignable to 'string' index type '{ Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown>; }'.
app/lib/utils/performanceMonitor.ts(89,22): error TS2339: Property 'hadRecentInput' does not exist on type 'PerformanceEntry'.
app/lib/utils/performanceMonitor.ts(90,31): error TS2339: Property 'value' does not exist on type 'PerformanceEntry'.
app/profile/page.tsx(74,20): error TS18046: 'data' is of type 'unknown'.
app/profile/page.tsx(76,18): error TS18046: 'data' is of type 'unknown'.
app/profile/page.tsx(103,20): error TS18046: 'data' is of type 'unknown'.
app/profile/page.tsx(107,18): error TS18046: 'data' is of type 'unknown'.
app/providers.tsx(35,12): error TS2741: Property 'founderId' is missing in type '{ children: ReactNode; }' but required in type 'SystematicScalingProviderProps'.
app/storage-test/page.tsx(46,9): error TS2322: Type 'string | null' is not assignable to type 'null'.
  Type 'string' is not assignable to type 'null'.
app/test-new-features/page.tsx(95,9): error TS2353: Object literal may only specify known properties, and 'resourceType' does not exist in type 'ExportRequest'.
app/test-new-features/page.tsx(115,9): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
app/test-new-features/page.tsx(163,7): error TS2322: Type '"email-html"' is not assignable to type 'ExportFormat'.
app/test-new-features/page.tsx(164,7): error TS2322: Type '"salesforce-csv"' is not assignable to type 'ExportFormat'.
app/test-new-features/page.tsx(165,7): error TS2322: Type '"slack-blocks"' is not assignable to type 'ExportFormat'.
app/test-session/page.tsx(40,41): error TS2445: Property 'supabaseUrl' is protected and only accessible within class 'SupabaseClient<Database, SchemaNameOrClientOptions, SchemaName, Schema, ClientOptions>' and its subclasses.
lib/api/client.ts(2,21): error TS7016: Could not find a declaration file for module 'js-cookie'. '/Users/geter/andru/hs-andru-test/modern-platform/node_modules/js-cookie/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/js-cookie` if it exists or add a new declaration (.d.ts) file containing `declare module 'js-cookie';`
lib/api/client.ts(614,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(633,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(651,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(669,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(691,77): error TS18046: 'errorData' is of type 'unknown'.
lib/auth/supabase-auth.ts(66,38): error TS18047: 'session' is possibly 'null'.
lib/auth/supabase-auth.ts(113,12): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'customer_id' does not exist in type 'never[]'.
lib/auth/unified-auth.ts(31,7): error TS2322: Type 'string | undefined' is not assignable to type 'string | null'.
  Type 'undefined' is not assignable to type 'string | null'.
lib/hooks/useAPI.ts(148,11): error TS18046: 'data' is of type 'unknown'.
lib/hooks/useAPI.ts(149,46): error TS18046: 'data' is of type 'unknown'.
lib/performance/caching.ts(172,9): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
lib/performance/caching.ts(267,20): error TS2554: Expected 1 arguments, but got 0.
lib/performance/caching.ts(333,53): error TS7030: Not all code paths return a value.
lib/queue/job-queue.ts(139,26): error TS2345: Argument of type 'Job<T>' is not assignable to parameter of type 'Job<JobData>'.
  Type 'T' is not assignable to type 'JobData'.
lib/queue/job-queue.ts(142,31): error TS2345: Argument of type 'Job<T>' is not assignable to parameter of type 'Job<JobData>'.
  Type 'T' is not assignable to type 'JobData'.
lib/queue/job-queue.ts(145,30): error TS2345: Argument of type 'Job<T>' is not assignable to parameter of type 'Job<JobData>'.
  Type 'T' is not assignable to type 'JobData'.
lib/services/authService.ts(4,21): error TS7016: Could not find a declaration file for module 'js-cookie'. '/Users/geter/andru/hs-andru-test/modern-platform/node_modules/js-cookie/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/js-cookie` if it exists or add a new declaration (.d.ts) file containing `declare module 'js-cookie';`
lib/services/authService.ts(416,38): error TS2339: Property 'getAdminProfile' does not exist on type 'AuthService'.
lib/services/authService.ts(448,10): error TS2554: Expected 1 arguments, but got 0.
lib/services/authService.ts(457,12): error TS2554: Expected 1 arguments, but got 0.
lib/services/claude-ai-service.ts(83,5): error TS2322: Type 'string | undefined' is not assignable to type 'string | null'.
  Type 'undefined' is not assignable to type 'string | null'.
lib/services/email-service.ts(280,27): error TS2345: Argument of type '{ to: string; from: string; template: string; templateVariables: { userName: string; companyName: string; currentARR: string; targetARR: string; dashboardUrl: string; }; priority: "high"; tags: string[]; }' is not assignable to parameter of type 'EmailRequest'.
  Property 'subject' is missing in type '{ to: string; from: string; template: string; templateVariables: { userName: string; companyName: string; currentARR: string; targetARR: string; dashboardUrl: string; }; priority: "high"; tags: string[]; }' but required in type 'EmailRequest'.
lib/services/email-service.ts(307,27): error TS2345: Argument of type '{ to: string; from: string; template: string; templateVariables: { userName: string; analysisType: string; insights: string[]; reportUrl: string; hasAttachment: boolean; }; attachments: EmailAttachment[] | undefined; tags: string[]; }' is not assignable to parameter of type 'EmailRequest'.
  Property 'subject' is missing in type '{ to: string; from: string; template: string; templateVariables: { userName: string; analysisType: string; insights: string[]; reportUrl: string; hasAttachment: boolean; }; attachments: EmailAttachment[] | undefined; tags: string[]; }' but required in type 'EmailRequest'.
lib/services/email-service.ts(339,27): error TS2345: Argument of type '{ to: string | string[]; from: string; template: string; templateVariables: { subject: string; title: string; userName: string; message: string; actionUrl: string | undefined; actionText: string; senderName: string; }; priority: "high" | ... 1 more ... | "low"; tags: string[]; }' is not assignable to parameter of type 'EmailRequest'.
  Property 'subject' is missing in type '{ to: string | string[]; from: string; template: string; templateVariables: { subject: string; title: string; userName: string; message: string; actionUrl: string | undefined; actionText: string; senderName: string; }; priority: "high" | ... 1 more ... | "low"; tags: string[]; }' but required in type 'EmailRequest'.
lib/services/email-service.ts(538,61): error TS1501: This regular expression flag is only available when targeting 'es2018' or later.
lib/services/job-service.ts(262,5): error TS2322: Type 'T | undefined' is not assignable to type 'T'.
  'T' could be instantiated with an arbitrary type which could be unrelated to 'T | undefined'.
lib/supabase/admin.ts(60,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
lib/supabase/client.ts(219,10): error TS2552: Cannot find name 'isSupabaseConfigured'. Did you mean 'isSupabaseConfiguredProp'?
lib/supabase/client.ts(233,10): error TS2552: Cannot find name 'isSupabaseConfigured'. Did you mean 'isSupabaseConfiguredProp'?
lib/supabase/client.ts(245,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; session_id: string; pipeline_status: string; current_step: string; progress_data: { started_at: string; }; error_count: number; expires_at: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'customer_id' does not exist in type 'never[]'.
lib/supabase/client.ts(272,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
lib/supabase/client.ts(288,34): error TS2339: Property 'error_count' does not exist on type 'never'.
lib/supabase/client.ts(293,15): error TS2345: Argument of type '{ error_count: any; last_error: string; pipeline_status: string; updated_at: string; }' is not assignable to parameter of type 'never'.
lib/validation/index.ts(70,5): error TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
lib/validation/index.ts(79,12): error TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
lib/validation/index.ts(79,32): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type 'ComponentType<T>' is not assignable to parameter of type 'string | FunctionComponent<{}> | ComponentClass<{}, any>'.
      Type 'ComponentClass<T, any>' is not assignable to type 'string | FunctionComponent<{}> | ComponentClass<{}, any>'.
        Type 'ComponentClass<T, any>' is not assignable to type 'ComponentClass<{}, any>'.
          Types of property 'getDerivedStateFromProps' are incompatible.
            Type 'GetDerivedStateFromProps<T, any> | undefined' is not assignable to type 'GetDerivedStateFromProps<{}, any> | undefined'.
              Type 'GetDerivedStateFromProps<T, any>' is not assignable to type 'GetDerivedStateFromProps<{}, any>'.
                Types of parameters 'nextProps' and 'nextProps' are incompatible.
                  Type 'Readonly<{}>' is not assignable to type 'Readonly<T>'.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(3,28): error TS2307: Cannot find module 'braintrust' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(4,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(10,7): error TS2416: Property 'createConnection' in type '(Anonymous class)' is not assignable to the same property in base type 'Agent'.
  Type '(_: any, callback: Function) => net.Socket' is not assignable to type '(options: ClientRequestArgs, callback?: ((err: Error | null, stream: Duplex) => void) | undefined) => Duplex'.
    Types of parameters 'callback' and 'callback' are incompatible.
      Type '((err: Error | null, stream: Duplex) => void) | undefined' is not assignable to type 'Function'.
        Type 'undefined' is not assignable to type 'Function'.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(10,7): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Agent'.
mcp-servers/stripe-mcp/evals/eval.ts(7,8): error TS2307: Cannot find module 'openai/resources' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/eval.ts(8,22): error TS2307: Cannot find module 'braintrust' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/eval.ts(98,34): error TS7006: Parameter 'tc' implicitly has an 'any' type.
mcp-servers/stripe-mcp/evals/eval.ts(117,18): error TS7006: Parameter 'input' implicitly has an 'any' type.
mcp-servers/stripe-mcp/evals/scorer.ts(3,26): error TS2307: Cannot find module 'autoevals' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(4,19): error TS2307: Cannot find module 'lodash/every' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(7,44): error TS2307: Cannot find module 'openai/resources/chat/completions.mjs' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(8,47): error TS2307: Cannot find module 'openai/resources/chat/completions.mjs' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(10,21): error TS2307: Cannot find module 'lodash/isEqual' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(65,46): error TS7006: Parameter 'r' implicitly has an 'any' type.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(6,3): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(7,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(14,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(15,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(16,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(19,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(22,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(23,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(26,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(29,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(30,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(33,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(37,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(38,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(41,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(45,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(46,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(47,14): error TS2790: The operand of a 'delete' operator must be optional.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(50,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(56,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(61,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(64,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(71,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(72,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(73,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(77,3): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(78,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(80,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(85,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(87,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(92,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(98,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(103,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(105,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(110,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(116,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(121,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(126,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(133,1): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(134,1): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(136,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(137,3): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(138,5): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(141,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(146,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(154,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(157,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(167,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(187,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(190,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(201,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(209,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/examples/ai-sdk/index.ts(1,34): error TS2307: Cannot find module '@stripe/agent-toolkit/ai-sdk' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/ai-sdk/index.ts(2,22): error TS2307: Cannot find module '@ai-sdk/openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/ai-sdk/index.ts(6,8): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(3,20): error TS2307: Cannot find module 'hono' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(14,33): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(25,21): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(33,30): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(65,36): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(77,29): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(94,7): error TS7027: Unreachable code detected.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(1,25): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(6,8): error TS2307: Cannot find module '@stripe/agent-toolkit/cloudflare' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(8,29): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(28,63): error TS7031: Binding element 'a' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(28,66): error TS7031: Binding element 'b' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(35,10): error TS2339: Property 'paidTool' does not exist on type 'MyMCP'.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(61,10): error TS2339: Property 'paidTool' does not exist on type 'MyMCP'.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(68,9): error TS7031: Binding element 'a' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(68,12): error TS7031: Binding element 'b' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(90,10): error TS2339: Property 'paidTool' does not exist on type 'MyMCP'.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(96,9): error TS7031: Binding element 'object' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(3,20): error TS2307: Cannot find module 'hono' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(14,33): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(25,21): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(33,30): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(65,36): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(77,29): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(94,7): error TS7027: Unreachable code detected.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/utils.ts(4,25): error TS2307: Cannot find module 'hono/html' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/utils.ts(5,38): error TS2307: Cannot find module 'hono/utils/html' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/utils.ts(6,32): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(1,34): error TS2307: Cannot find module '@stripe/agent-toolkit/langchain' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(2,26): error TS2307: Cannot find module '@langchain/openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(3,39): error TS2307: Cannot find module '@langchain/core/prompts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(4,20): error TS2307: Cannot find module 'langchain/hub' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(5,56): error TS2307: Cannot find module 'langchain/agents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(1,34): error TS2307: Cannot find module '@stripe/agent-toolkit/openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(2,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(3,47): error TS2307: Cannot find module 'openai/resources' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(51,33): error TS7006: Parameter 'tc' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/jest.config.ts(1,27): error TS2307: Cannot find module 'jest' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/tool.ts(1,29): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/tool.ts(2,20): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/tool.ts(10,11): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/toolkit.ts(8,8): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/toolkit.ts(80,29): error TS7031: Binding element 'doGenerate' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/toolkit.ts(90,27): error TS7031: Binding element 'doStream' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(2,28): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(3,25): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(38,39): error TS2339: Property 'server' does not exist on type 'experimental_PaidMcpAgent<Bindings, State, Props>'.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(40,28): error TS2339: Property 'props' does not exist on type 'experimental_PaidMcpAgent<Bindings, State, Props>'.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(2,30): error TS2307: Cannot find module '@langchain/core/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(3,41): error TS2307: Cannot find module '@langchain/core/callbacks/manager' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(4,30): error TS2307: Cannot find module '@langchain/core/runnables' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(16,11): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(22,13): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/langchain/toolkit.ts(1,27): error TS2307: Cannot find module '@langchain/core/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/register-paid-tool.ts(2,30): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/register-paid-tool.ts(3,28): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/register-paid-tool.ts(4,35): error TS2307: Cannot find module '@modelcontextprotocol/sdk/types.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/toolkit.ts(1,25): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/toolkit.ts(2,35): error TS2307: Cannot find module '@modelcontextprotocol/sdk/shared/protocol.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/toolkit.ts(37,12): error TS2339: Property 'tool' does not exist on type 'StripeAgentToolkit'.
mcp-servers/stripe-mcp/typescript/src/openai/toolkit.ts(4,31): error TS2307: Cannot find module 'zod-to-json-schema' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/openai/toolkit.ts(9,8): error TS2307: Cannot find module 'openai/resources' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/balance/retrieveBalance.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/balance/retrieveBalance.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/balance/retrieveBalance.ts(12,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/coupons/createCoupon.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/coupons/createCoupon.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/coupons/createCoupon.ts(24,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/coupons/listCoupons.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/coupons/listCoupons.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/createCustomer.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/createCustomer.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/createCustomer.ts(16,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/customers/listCustomers.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/listCustomers.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/listDisputes.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/listDisputes.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/updateDispute.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/updateDispute.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(15,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(64,18): error TS2339: Property 'sources' does not exist on type '{}'.
mcp-servers/stripe-mcp/typescript/src/shared/invoiceItems/createInvoiceItem.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoiceItems/createInvoiceItem.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoiceItems/createInvoiceItem.ts(41,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/invoices/createInvoice.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/createInvoice.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/createInvoice.ts(22,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/invoices/finalizeInvoice.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/finalizeInvoice.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/finalizeInvoice.ts(8,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/invoices/listInvoices.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/listInvoices.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/listInvoices.ts(37,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/paymentIntents/listPaymentIntents.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/paymentIntents/listPaymentIntents.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/paymentIntents/listPaymentIntents.ts(51,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/paymentLinks/createPaymentLink.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/paymentLinks/createPaymentLink.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/createPrice.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/createPrice.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/listPrices.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/listPrices.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/listPrices.ts(23,65): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/products/createProduct.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/createProduct.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/listProducts.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/listProducts.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/listProducts.ts(32,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/refunds/createRefund.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/refunds/createRefund.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/refunds/createRefund.ts(38,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/cancelSubscription.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/cancelSubscription.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/cancelSubscription.ts(28,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/listSubscriptions.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/listSubscriptions.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/listSubscriptions.ts(29,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/updateSubscription.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/updateSubscription.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/updateSubscription.ts(42,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(3,32): error TS2307: Cannot find module '@/shared/customers/createCustomer' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(4,31): error TS2307: Cannot find module '@/shared/customers/listCustomers' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(5,31): error TS2307: Cannot find module '@/shared/products/createProduct' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(6,30): error TS2307: Cannot find module '@/shared/products/listProducts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(7,29): error TS2307: Cannot find module '@/shared/prices/createPrice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(8,28): error TS2307: Cannot find module '@/shared/prices/listPrices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(9,35): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(10,31): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(11,30): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(12,35): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(13,33): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(14,33): error TS2307: Cannot find module '@/shared/balance/retrieveBalance' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(15,29): error TS2307: Cannot find module '@/shared/coupons/listCoupons' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(16,30): error TS2307: Cannot find module '@/shared/coupons/createCoupon' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(17,30): error TS2307: Cannot find module '@/shared/refunds/createRefund' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(18,36): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(19,35): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(20,36): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(21,36): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(22,37): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(23,30): error TS2307: Cannot find module '@/shared/disputes/listDisputes' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(24,31): error TS2307: Cannot find module '@/shared/disputes/updateDispute' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(33,15): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(2,30): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(8,8): error TS2307: Cannot find module '@modelcontextprotocol/sdk/types.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(9,40): error TS2307: Cannot find module '@modelcontextprotocol/sdk/shared/protocol.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(12,1): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(16,22): error TS2503: Cannot find namespace 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(17,19): error TS2503: Cannot find namespace 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(20,3): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(22,5): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(26,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(32,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(33,17): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(37,19): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(38,21): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(39,17): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(43,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(47,19): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(52,27): error TS2503: Cannot find namespace 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(57,25): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(58,20): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(63,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(69,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(94,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(98,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(123,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(147,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(150,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(155,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(171,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(195,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(207,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(222,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(225,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(255,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(282,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(1,31): error TS2307: Cannot find module '@/shared/balance/retrieveBalance' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(5,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(25,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(26,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(29,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(40,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(1,41): error TS2307: Cannot find module '@/shared/balance/retrieveBalance' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(2,29): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(49,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(93,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(129,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(1,30): error TS2307: Cannot find module '@/shared/customers/createCustomer' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(2,29): error TS2307: Cannot find module '@/shared/customers/listCustomers' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(31,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(32,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(35,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(50,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(53,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(57,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(58,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(69,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(70,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(73,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(86,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(92,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(1,40): error TS2307: Cannot find module '@/shared/customers/createCustomer' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(2,39): error TS2307: Cannot find module '@/shared/customers/listCustomers' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(12,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(15,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(19,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(20,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(24,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(25,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(30,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(33,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(37,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(38,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(1,29): error TS2307: Cannot find module '@/shared/disputes/updateDispute' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(2,28): error TS2307: Cannot find module '@/shared/disputes/listDisputes' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(42,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(45,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(63,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(73,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(77,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(78,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(86,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(87,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(90,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(100,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(106,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(109,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(123,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(124,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(1,35): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(3,45): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(5,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(9,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(19,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(20,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(43,23): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(46,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(51,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(57,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(60,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(72,23): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(75,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(80,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(86,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(1,45): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(1,33): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(5,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(31,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(32,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(35,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(52,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(55,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(58,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(74,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(81,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(1,43): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(1,39): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(6,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(9,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(12,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(1,29): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(2,28): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(3,31): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(5,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(7,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(8,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(9,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(10,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(16,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(20,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(21,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(39,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(42,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(58,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(65,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(68,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(83,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(91,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(95,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(96,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(108,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(109,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(112,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(126,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(130,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(133,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(147,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(151,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(155,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(156,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(167,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(171,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(174,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(187,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(190,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(1,39): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(2,38): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(3,41): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(14,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(19,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(23,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(24,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(28,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(32,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(36,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(37,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(41,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(42,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(47,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(50,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(54,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(55,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(1,35): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(2,34): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(3,37): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(11,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(13,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(14,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(18,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(19,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(21,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(24,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(26,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(31,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(32,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(1,34): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(5,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(33,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(37,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(56,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(62,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(65,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(84,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(93,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(112,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(116,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(1,44): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(1,40): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(6,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(9,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(14,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(1,33): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(5,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(40,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(41,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(44,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(70,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(73,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(76,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(107,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(108,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(1,43): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(1,39): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(7,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(14,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(19,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(22,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(23,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(26,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(1,27): error TS2307: Cannot find module '@/shared/prices/createPrice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(2,26): error TS2307: Cannot find module '@/shared/prices/listPrices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(32,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(33,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(36,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(52,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(55,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(59,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(60,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(71,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(72,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(75,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(88,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(94,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(1,37): error TS2307: Cannot find module '@/shared/prices/createPrice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(2,36): error TS2307: Cannot find module '@/shared/prices/listPrices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(13,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(22,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(23,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(28,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(31,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(36,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(1,29): error TS2307: Cannot find module '@/shared/products/createProduct' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(2,28): error TS2307: Cannot find module '@/shared/products/listProducts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(30,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(31,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(34,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(48,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(51,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(55,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(56,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(67,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(68,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(71,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(84,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(1,39): error TS2307: Cannot find module '@/shared/products/createProduct' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(2,38): error TS2307: Cannot find module '@/shared/products/listProducts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(13,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(22,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(23,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(28,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(31,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(36,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(1,28): error TS2307: Cannot find module '@/shared/refunds/createRefund' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(5,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(30,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(33,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(47,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(48,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(51,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(66,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(69,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(1,38): error TS2307: Cannot find module '@/shared/refunds/createRefund' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(1,33): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(2,34): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(3,34): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(5,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(8,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(9,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(15,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(19,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(20,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(62,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(63,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(66,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(94,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(98,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(101,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(129,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(132,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(135,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(142,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(146,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(147,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(173,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(178,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(181,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(190,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(194,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(195,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(227,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(239,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(242,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(257,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(260,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(289,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(298,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(1,43): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(2,44): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(3,44): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(14,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(19,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(23,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(24,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(31,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(32,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(38,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(40,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(43,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(45,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(1,39): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(2,40): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(3,40): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(12,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(13,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(14,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(17,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(20,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(21,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(22,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(23,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(24,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(25,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(29,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(30,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(33,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(38,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(39,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(42,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(45,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(47,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/tsup.config.ts(1,28): error TS2307: Cannot find module 'tsup' or its corresponding type declarations.
server.ts(46,3): error TS2322: Type '(string | undefined)[]' is not assignable to type 'StaticOrigin | CustomOrigin | undefined'.
  Type '(string | undefined)[]' is not assignable to type '(string | boolean | RegExp)[]'.
    Type 'string | undefined' is not assignable to type 'string | boolean | RegExp'.
      Type 'undefined' is not assignable to type 'string | boolean | RegExp'.
server.ts(144,56): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(145,22): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(146,30): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(147,31): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(148,22): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(165,30): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'JobStatus | undefined'.
  Type 'string' is not assignable to type 'JobStatus | undefined'.
server.ts(220,62): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(260,66): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(261,11): error TS2339: Property 'message' does not exist on type 'ReadableStream<Uint8Array<ArrayBuffer>> | null'.
server.ts(261,20): error TS2339: Property 'options' does not exist on type 'ReadableStream<Uint8Array<ArrayBuffer>> | null'.
server.ts(268,18): error TS7052: Element implicitly has an 'any' type because type 'Headers' has no index signature. Did you mean to call 'req.headers.get'?
server.ts(277,5): error TS2322: Type '{ type: string; delay: number; }' is not assignable to type '"fixed" | "exponential" | undefined'.
server.ts(294,63): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(299,60): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(301,19): error TS7052: Element implicitly has an 'any' type because type 'Headers' has no index signature. Did you mean to call 'req.headers.get'?
server.ts(307,9): error TS2339: Property 'clear' does not exist on type '{ get: <T = any>(key: string) => T | null; set: <T = any>(key: string, value: T, ttl?: number | undefined) => void; delete: (key: string) => boolean; user: { get: <T = any>(key: string) => T | null; set: <T = any>(key: string, value: T, ttl?: number | undefined) => void; delete: (key: string) => boolean; }; file: { ...'.
server.ts(312,9): error TS7030: Not all code paths return a value.
server.ts(368,21): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type 'string' is not assignable to parameter of type 'number'.
src/features/cost-business-case/business-case/SimplifiedBusinessCaseBuilder.tsx(56,25): error TS2345: Argument of type '{ eventType: string; metadata: { tool: string; action: string; currentCost: number; revenueImpact: number; }; scalingContext: { currentARR: any; targetARR: any; growthStage: string; systematicApproach: boolean; }; businessImpact: string; professionalCredibility: number; }' is not assignable to parameter of type 'string'.
src/features/cost-business-case/business-case/SimplifiedBusinessCaseBuilder.tsx(94,49): error TS2554: Expected 2 arguments, but got 3.
src/features/cost-business-case/cost-calculator/CostCalculatorForm.tsx(103,35): error TS2339: Property 'totalCost' does not exist on type '{ totalCostOfInaction: number; monthlyImpact: number; breakdown: { missedGrowthRevenue: number; inefficiencyLoss: number; churnImpact: number; salesCycleCost: number; }; inputData: any; calculatedAt: string; }'.
src/features/cost-business-case/cost-calculator/SimplifiedCostCalculator.tsx(59,25): error TS2345: Argument of type '{ eventType: string; metadata: { tool: string; action: string; timeframe: number; totalCost: number; }; scalingContext: { currentARR: any; targetARR: any; growthStage: string; systematicApproach: boolean; }; businessImpact: string; professionalCredibility: number; }' is not assignable to parameter of type 'string'.
src/features/cost-business-case/cost-calculator/SimplifiedCostCalculator.tsx(78,49): error TS2554: Expected 2 arguments, but got 3.
src/features/cost-business-case/index.ts(5,10): error TS2305: Module '"./cost-calculator/CostCalculatorForm"' has no exported member 'default'.
src/features/cost-business-case/index.ts(6,10): error TS2305: Module '"./cost-calculator/CostHistory"' has no exported member 'default'.
src/features/cost-business-case/index.ts(7,10): error TS2305: Module '"./cost-calculator/CostResults"' has no exported member 'default'.
src/features/dashboard/ActiveToolDisplay.tsx(396,15): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'onCompletion' does not exist in type 'Partial<unknown> & Attributes'.
src/features/dashboard/CircularCompetencyGauge.tsx(4,50): error TS2307: Cannot find module 'react-circular-progressbar' or its corresponding type declarations.
src/features/dashboard/components/index.ts(27,10): error TS2305: Module '"../DashboardLayout"' has no exported member 'default'.
src/features/dashboard/components/index.ts(30,10): error TS2305: Module '"../ExportCenter"' has no exported member 'default'.
src/features/dashboard/components/index.ts(50,10): error TS2305: Module '"../InsightsPanel"' has no exported member 'default'.
src/features/dashboard/components/index.ts(52,10): error TS2305: Module '"../MilestonesCard"' has no exported member 'default'.
src/features/dashboard/components/index.ts(56,10): error TS2305: Module '"../ProgressVisualization"' has no exported member 'default'.
src/features/dashboard/CustomerDashboard.tsx(5,35): error TS2307: Cannot find module './progressive-engagement/EnhancedTabNavigation' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(6,37): error TS2307: Cannot find module './../hooks/useWorkflowProgress' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(7,36): error TS2307: Cannot find module './../hooks/useCompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(8,28): error TS2307: Cannot find module './common/LoadingSpinner' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(9,25): error TS2307: Cannot find module './common/ContentDisplay' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(10,33): error TS2307: Cannot find module './competency/CompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(14,35): error TS2307: Cannot find module './competency/ProgressiveToolAccess' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(15,35): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(16,42): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(17,25): error TS2307: Cannot find module './progressive-engagement/WelcomeHero' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(18,44): error TS2307: Cannot find module './progressive-engagement/ProgressiveEngagementContainer' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(19,36): error TS2307: Cannot find module './auth/DashboardAccessControl' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(145,13): error TS7030: Not all code paths return a value.
src/features/dashboard/CustomerDashboard.tsx(550,47): error TS2345: Argument of type '(prev: "progressive" | "integrated") => "integrated" | "classic"' is not assignable to parameter of type 'SetStateAction<"progressive" | "integrated">'.
  Type '(prev: "progressive" | "integrated") => "integrated" | "classic"' is not assignable to type '(prevState: "progressive" | "integrated") => "progressive" | "integrated"'.
    Type '"integrated" | "classic"' is not assignable to type '"progressive" | "integrated"'.
      Type '"classic"' is not assignable to type '"progressive" | "integrated"'.
src/features/dashboard/CustomerDashboardEnhanced.tsx(12,35): error TS2307: Cannot find module './progressive-engagement/EnhancedTabNavigation' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(13,37): error TS2307: Cannot find module './../hooks/useWorkflowProgress' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(14,36): error TS2307: Cannot find module './../hooks/useCompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(15,28): error TS2307: Cannot find module './common/LoadingSpinner' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(16,25): error TS2307: Cannot find module './common/ContentDisplay' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(17,33): error TS2307: Cannot find module './competency/CompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(21,35): error TS2307: Cannot find module './competency/ProgressiveToolAccess' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(22,35): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(23,42): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(24,44): error TS2307: Cannot find module './progressive-engagement/ProgressiveEngagementContainer' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(170,13): error TS7030: Not all code paths return a value.
src/features/dashboard/FilterDropdown.tsx(49,13): error TS7030: Not all code paths return a value.
src/features/dashboard/ProfessionalDashboard.tsx(14,36): error TS2307: Cannot find module './../contexts/AssessmentContext' or its corresponding type declarations.
src/features/dashboard/ProfessionalDashboard.tsx(15,36): error TS2307: Cannot find module './auth/DashboardAccessControl' or its corresponding type declarations.
src/features/dashboard/ProfessionalDashboard.tsx(202,9): error TS2322: Type '{ title: string; priority: string; }' is not assignable to type 'string'.
src/features/dashboard/ProfessionalDashboard.tsx(205,46): error TS2322: Type 'string' is not assignable to type 'boolean'.
src/features/dashboard/ProfessionalDashboard.tsx(507,16): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(508,15): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(516,16): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(517,15): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(547,11): error TS2322: Type 'Activity[]' is not assignable to type 'FilterResult[]'.
  Property 'id' is missing in type 'Activity' but required in type 'FilterResult'.
src/features/dashboard/ProfessionalDashboard.tsx(555,11): error TS2322: Type 'DevelopmentFocus' is not assignable to type 'DevelopmentData'.
  Types of property 'nextUnlock' are incompatible.
    Type 'NextUnlock | undefined' is not assignable to type 'NextUnlock | undefined'. Two different types with this name exist, but they are unrelated.
      Type 'NextUnlock' is missing the following properties from type 'NextUnlock': name, benefits, currentProgress, requiredProgress
src/features/dashboard/ProfessionalDashboard.tsx(556,11): error TS2322: Type 'CompetencyScores' is not assignable to type 'Record<string, number>'.
  Index signature for type 'string' is missing in type 'CompetencyScores'.
src/features/dashboard/ProfessionalDashboard.tsx(557,11): error TS2322: Type '(recommendation?: string | null) => void' is not assignable to type '(recommendation?: Recommendation | undefined) => void | Promise<void>'.
  Types of parameters 'recommendation' and 'recommendation' are incompatible.
    Type 'Recommendation | undefined' is not assignable to type 'string | null | undefined'.
      Type 'Recommendation' is not assignable to type 'string'.
src/features/dashboard/ProfessionalDashboard.tsx(564,11): error TS2719: Type 'CompetencyArea[]' is not assignable to type 'CompetencyArea[]'. Two different types with this name exist, but they are unrelated.
  Type 'CompetencyArea' is missing the following properties from type 'CompetencyArea': level, color, unlockBenefit
src/features/dashboard/ProfessionalDashboard.tsx(574,11): error TS2322: Type 'Action[]' is not assignable to type 'ActionItem[]'.
  Type 'Action' is missing the following properties from type 'ActionItem': category, estimatedTime, pointValue, progress
src/features/dashboard/ProfessionalDashboard.tsx(576,11): error TS2719: Type 'CompetencyScores' is not assignable to type 'CompetencyScores'. Two different types with this name exist, but they are unrelated.
  Index signature for type 'string' is missing in type 'CompetencyScores'.
src/features/dashboard/ProfessionalDashboard.tsx(581,11): error TS2719: Type 'Activity[]' is not assignable to type 'Activity[]'. Two different types with this name exist, but they are unrelated.
  Type 'Activity' is missing the following properties from type 'Activity': id, description
src/features/dashboard/ProfessionalDashboard.tsx(588,11): error TS2739: Type 'WeeklySummary' is missing the following properties from type 'WeeklyData': currentWeek, previousWeek, goals, achievements
src/features/dashboard/ProfessionalDashboard.tsx(596,11): error TS2719: Type 'AssessmentData | undefined' is not assignable to type 'AssessmentData | undefined'. Two different types with this name exist, but they are unrelated.
  Type 'AssessmentData' is missing the following properties from type 'AssessmentData': completed_date, duration_minutes, percentile, lead_priority
src/features/dashboard/RecentActivity.tsx(147,15): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
src/features/dashboard/RecentActivity.tsx(148,15): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(311,13): error TS2304: Cannot find name 'Users'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(380,27): error TS2345: Argument of type '{ id: string; type: string; title: string; description: string; }' is not assignable to parameter of type 'Achievement'.
  Type '{ id: string; type: string; title: string; description: string; }' is missing the following properties from type 'Achievement': points, achievedAt
src/features/dashboard/RevenueIntelligenceDashboard.tsx(652,22): error TS2304: Cannot find name 'ShadowCRMIntegration'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(671,22): error TS2304: Cannot find name 'ExperienceDrivenPriorities'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(690,22): error TS2304: Cannot find name 'DealMomentumAnalyzer'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(781,22): error TS2304: Cannot find name 'CompetitiveIntelligenceTracker'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(800,22): error TS2304: Cannot find name 'StakeholderRelationshipMap'.
src/features/dashboard/SimpleEnhancedDashboard.tsx(13,28): error TS2307: Cannot find module './common/LoadingSpinner' or its corresponding type declarations.
src/features/dashboard/SimpleEnhancedDashboard.tsx(14,25): error TS2307: Cannot find module './common/ContentDisplay' or its corresponding type declarations.
src/features/dashboard/SimpleEnhancedDashboard.tsx(174,13): error TS7030: Not all code paths return a value.
src/features/dashboard/StakeholderRelationshipMap.tsx(65,3): error TS7061: A mapped type may not declare properties or methods.
src/features/dashboard/SystematicScalingDashboard.tsx(336,19): error TS2322: Type '{ children: Element[]; key: string; className: string; onClick: () => Promise<void>; }' is not assignable to type 'IntrinsicAttributes & ModernCardProps'.
  Property 'onClick' does not exist on type 'IntrinsicAttributes & ModernCardProps'.
src/features/icp-analysis/components/index.ts(5,10): error TS2305: Module '"../ICPAnalysisForm"' has no exported member 'default'.
src/features/icp-analysis/components/index.ts(6,10): error TS2305: Module '"../EnhancedICPAnalysisForm"' has no exported member 'default'.
src/features/icp-analysis/components/index.ts(12,10): error TS2305: Module '"../ICPResults"' has no exported member 'default'.
src/features/icp-analysis/components/index.ts(13,10): error TS2305: Module '"../ICPHistory"' has no exported member 'default'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(435,5): error TS2304: Cannot find name 'setProductDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(435,27): error TS2304: Cannot find name 'sampleProduct'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(436,5): error TS2304: Cannot find name 'setIcpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(436,23): error TS2304: Cannot find name 'sampleICP'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(519,28): error TS2304: Cannot find name 'productDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(520,38): error TS2304: Cannot find name 'setProductDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(532,28): error TS2304: Cannot find name 'icpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(533,38): error TS2304: Cannot find name 'setIcpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(542,30): error TS2304: Cannot find name 'generateFramework'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(543,32): error TS2304: Cannot find name 'productDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(543,55): error TS2304: Cannot find name 'icpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(545,23): error TS2304: Cannot find name 'productDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(545,45): error TS2304: Cannot find name 'icpDescription'.
src/features/icp-analysis/ICPResults.tsx(141,31): error TS7006: Parameter 'factor' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(141,39): error TS7006: Parameter 'index' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(169,34): error TS7006: Parameter 'insight' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(169,43): error TS7006: Parameter 'index' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(189,41): error TS7006: Parameter 'recommendation' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(189,57): error TS7006: Parameter 'index' implicitly has an 'any' type.
src/features/icp-analysis/IntegratedICPTool.tsx(112,58): error TS18046: 'error' is of type 'unknown'.
src/features/resources-library/ResourceLibrary.tsx(275,27): error TS2345: Argument of type '{ eventType: string; metadata: { resourceId: string; resourceCategory: "advanced" | "core" | "strategic"; quality: number | undefined; }; scalingContext: { currentARR: any; targetARR: any; growthStage: string; systematicApproach: boolean; }; businessImpact: string; professionalCredibility: number; }' is not assignable to parameter of type 'string'.
src/features/resources-library/ResourceLibrary.tsx(370,9): error TS2554: Expected 2 arguments, but got 3.
src/shared/components/layout/FlexLayout.tsx(35,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/FlexLayout.tsx(201,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/FlexLayout.tsx(201,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/FlexLayout.tsx(231,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/FlexLayout.tsx(296,11): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/FlexLayout.tsx(296,11): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/GridLayout.tsx(43,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/GridLayout.tsx(245,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/GridLayout.tsx(245,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/GridLayout.tsx(280,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/GridLayout.tsx(361,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/GridLayout.tsx(361,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/Header.tsx(18,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(6,32): error TS2307: Cannot find module '../admin/AdminModeIndicator' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(33,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(34,50): error TS2307: Cannot find module '../../../lib/services/airtableService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(90,13): error TS7030: Not all code paths return a value.
src/shared/components/layout/Layout.tsx(93,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(107,37): error TS2307: Cannot find module '../common/LoadingSpinner' or its corresponding type declarations.
src/shared/components/layout/ModernSidebarLayout.tsx(80,50): error TS2307: Cannot find module '../../../lib/services/airtableService' or its corresponding type declarations.
src/shared/components/layout/ModernSidebarLayout.tsx(88,48): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Navigation.tsx(34,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/PageLayout.tsx(402,7): error TS2322: Type '{ children: Element; variant: "centered"; showBreadcrumbs: false; showFooter: false; maxWidth: string; className: string; style: { backgroundImage: string; } | undefined; loading?: boolean | undefined; ... 17 more ...; stickyFooter?: boolean | undefined; }' is not assignable to type 'IntrinsicAttributes & PageLayoutProps'.
  Property 'style' does not exist on type 'IntrinsicAttributes & PageLayoutProps'.
src/shared/components/layout/ResponsiveContainer.tsx(35,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/ResponsiveContainer.tsx(156,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/ResponsiveContainer.tsx(156,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/SectionLayout.tsx(56,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/SectionLayout.tsx(231,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/SectionLayout.tsx(231,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/SectionLayout.tsx(263,41): error TS2322: Type '{ initial: { opacity: number; y: number; }; animate: { opacity: number; y: number; transition: { duration: number; ease: string; }; }; }' is not assignable to type 'Variants'.
  Property 'animate' is incompatible with index signature.
    Type '{ opacity: number; y: number; transition: { duration: number; ease: string; }; }' is not assignable to type 'Variant'.
      Type '{ opacity: number; y: number; transition: { duration: number; ease: string; }; }' is not assignable to type 'TargetAndTransition'.
        Type '{ opacity: number; y: number; transition: { duration: number; ease: string; }; }' is not assignable to type '{ transition?: Transition<any> | undefined; transitionEnd?: ResolvedValues | undefined; }'.
          Types of property 'transition' are incompatible.
            Type '{ duration: number; ease: string; }' is not assignable to type 'Transition<any> | undefined'.
              Type '{ duration: number; ease: string; }' is not assignable to type 'TransitionWithValueOverrides<any>'.
                Type '{ duration: number; ease: string; }' is not assignable to type 'ValueAnimationTransition<any>'.
                  Types of property 'ease' are incompatible.
                    Type 'string' is not assignable to type 'Easing | Easing[] | undefined'.
src/shared/components/ui/Accordion.tsx(88,14): error TS2323: Cannot redeclare exported variable 'AccordionItem'.
src/shared/components/ui/Accordion.tsx(123,23): error TS2345: Argument of type 'string | number | undefined' is not assignable to parameter of type 'string | number | (string | number)[]'.
  Type 'undefined' is not assignable to type 'string | number | (string | number)[]'.
src/shared/components/ui/Accordion.tsx(174,14): error TS2323: Cannot redeclare exported variable 'AccordionTrigger'.
src/shared/components/ui/Accordion.tsx(279,14): error TS2323: Cannot redeclare exported variable 'AccordionContent'.
src/shared/components/ui/Accordion.tsx(397,21): error TS2345: Argument of type 'string | number | (string | number)[] | undefined' is not assignable to parameter of type 'string | number | (string | number)[]'.
  Type 'undefined' is not assignable to type 'string | number | (string | number)[]'.
src/shared/components/ui/Accordion.tsx(588,10): error TS2323: Cannot redeclare exported variable 'AccordionItem'.
src/shared/components/ui/Accordion.tsx(588,10): error TS2484: Export declaration conflicts with exported declaration of 'AccordionItem'.
src/shared/components/ui/Accordion.tsx(588,25): error TS2323: Cannot redeclare exported variable 'AccordionTrigger'.
src/shared/components/ui/Accordion.tsx(588,25): error TS2484: Export declaration conflicts with exported declaration of 'AccordionTrigger'.
src/shared/components/ui/Accordion.tsx(588,43): error TS2323: Cannot redeclare exported variable 'AccordionContent'.
src/shared/components/ui/Accordion.tsx(588,43): error TS2484: Export declaration conflicts with exported declaration of 'AccordionContent'.
src/shared/components/ui/BreadcrumbNavigation.tsx(116,28): error TS2339: Property 'isCurrentPage' does not exist on type 'BreadcrumbItem | { label: string; href: undefined; icon: Element; }'.
  Property 'isCurrentPage' does not exist on type '{ label: string; href: undefined; icon: Element; }'.
src/shared/components/ui/BreadcrumbNavigation.tsx(122,38): error TS2339: Property 'isCurrentPage' does not exist on type 'BreadcrumbItem | { label: string; href: undefined; icon: Element; }'.
  Property 'isCurrentPage' does not exist on type '{ label: string; href: undefined; icon: Element; }'.
src/shared/components/ui/Button.tsx(162,8): error TS2322: Type '{ children: Element; form?: string | undefined; formAction?: string | ((formData: FormData) => void | Promise<void>) | undefined; formEncType?: string | undefined; ... 288 more ...; transition: { ...; }; }' is not assignable to type 'Omit<HTMLMotionProps<"button">, "ref">'.
  Types of property 'onDrag' are incompatible.
    Type 'DragEventHandler<HTMLButtonElement> | undefined' is not assignable to type '((event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => void) | undefined'.
      Type 'DragEventHandler<HTMLButtonElement>' is not assignable to type '(event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => void'.
        Types of parameters 'event' and 'event' are incompatible.
          Type 'MouseEvent | PointerEvent | TouchEvent' is not assignable to type 'DragEvent<HTMLButtonElement>'.
            Type 'MouseEvent' is missing the following properties from type 'DragEvent<HTMLButtonElement>': dataTransfer, nativeEvent, isDefaultPrevented, isPropagationStopped, persist
src/shared/components/ui/Button.tsx(275,13): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'size' does not exist in type 'Partial<unknown> & Attributes'.
src/shared/components/ui/Button.tsx(275,19): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/Button.tsx(276,22): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/Button.tsx(278,27): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/ColorPicker.tsx(5,45): error TS2305: Module '"lucide-react"' has no exported member 'Eyedropper'.
src/shared/components/ui/Divider.tsx(266,24): error TS2304: Cannot find name 'spacingClasses'.
src/shared/components/ui/DropdownComponents.tsx(234,27): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/DropdownComponents.tsx(371,43): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/DropdownComponents.tsx(372,25): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/DropdownComponents.tsx(372,118): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/ErrorBoundary.tsx(3,39): error TS2440: Import declaration conflicts with local declaration of 'ErrorInfo'.
src/shared/components/ui/ErrorBoundary.tsx(74,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
src/shared/components/ui/ErrorBoundary.tsx(146,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
src/shared/components/ui/ErrorBoundary.tsx(152,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
src/shared/components/ui/FileUploader.tsx(161,9): error TS2322: Type 'string | null' is not assignable to type 'string | undefined'.
  Type 'null' is not assignable to type 'string | undefined'.
src/shared/components/ui/FormComponents.tsx(59,11): error TS2430: Interface 'InputProps' incorrectly extends interface 'InputHTMLAttributes<HTMLInputElement>'.
  Types of property 'size' are incompatible.
    Type '"sm" | "md" | "lg" | undefined' is not assignable to type 'number | undefined'.
      Type 'string' is not assignable to type 'number'.
src/shared/components/ui/FormComponents.tsx(129,11): error TS2430: Interface 'SelectProps' incorrectly extends interface 'SelectHTMLAttributes<HTMLSelectElement>'.
  Types of property 'size' are incompatible.
    Type '"sm" | "md" | "lg" | undefined' is not assignable to type 'number | undefined'.
      Type 'string' is not assignable to type 'number'.
src/shared/components/ui/FormWizard.tsx(86,17): error TS7006: Parameter 'prev' implicitly has an 'any' type.
src/shared/components/ui/Icon.tsx(195,13): error TS2322: Type 'MotionValueHelper<Transform | undefined>' is not assignable to type '(Transform & (AnyMotionValue | Transform)) | undefined'.
  Type 'MotionValueNumber' is not assignable to type '(Transform & (AnyMotionValue | Transform)) | undefined'.
    Type 'MotionValue<number>' is not assignable to type '"none" & MotionValueAny'.
      Type 'MotionValue<number>' is not assignable to type '"none"'.
src/shared/components/ui/Icon.tsx(483,22): error TS2339: Property 'spin' does not exist on type '{ name: "User" | "X" | "Heading1" | "Heading2" | "Heading3" | "Heading4" | "Heading5" | "Heading6" | "Phone" | "Server" | "Slack" | "Figma" | "Infinity" | "Expand" | "Menu" | "Sun" | ... 5521 more ... | "icons"; variant: IconVariant; text: string; } | { ...; } | { ...; } | { ...; } | { ...; }'.
  Property 'spin' does not exist on type '{ name: "User" | "X" | "Heading1" | "Heading2" | "Heading3" | "Heading4" | "Heading5" | "Heading6" | "Phone" | "Server" | "Slack" | "Figma" | "Infinity" | "Expand" | "Menu" | "Sun" | ... 5521 more ... | "icons"; variant: IconVariant; text: string; }'.
src/shared/components/ui/Input.tsx(75,25): error TS2554: Expected 1 arguments, but got 0.
src/shared/components/ui/LazyIcons.tsx(112,20): error TS2769: No overload matches this call.
  Overload 1 of 2, '(props: {}): string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<...> | Component<...> | null | undefined', gave the following error.
    Type '{ className: string; }' is not assignable to type 'IntrinsicAttributes'.
      Property 'className' does not exist on type 'IntrinsicAttributes'.
  Overload 2 of 2, '(props: {}, context?: any): string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<...> | Component<...> | null | undefined', gave the following error.
    Type '{ className: string; }' is not assignable to type 'IntrinsicAttributes'.
      Property 'className' does not exist on type 'IntrinsicAttributes'.
src/shared/components/ui/ModalComponents.tsx(153,13): error TS7030: Not all code paths return a value.
src/shared/components/ui/ModalComponents.tsx(386,11): error TS2322: Type '{ children: string; variant: "primary" | "danger"; onClick: () => void; loading: boolean; }' is not assignable to type 'IntrinsicAttributes & PrimaryButtonProps'.
  Property 'variant' does not exist on type 'IntrinsicAttributes & PrimaryButtonProps'.
src/shared/components/ui/Radio.tsx(562,3): error TS2339: Property 'children' does not exist on type 'RadioCardProps'.
src/shared/components/ui/Slider.tsx(523,18): error TS2430: Interface 'RangeSliderProps' incorrectly extends interface 'Omit<SliderProps, "value" | "defaultValue">'.
  Types of property 'onChange' are incompatible.
    Type '((value: [number, number]) => void) | undefined' is not assignable to type '((value: number | number[]) => void) | undefined'.
      Type '(value: [number, number]) => void' is not assignable to type '(value: number | number[]) => void'.
        Types of parameters 'value' and 'value' are incompatible.
          Type 'number | number[]' is not assignable to type '[number, number]'.
            Type 'number' is not assignable to type '[number, number]'.
src/shared/components/ui/Tabs.tsx(170,13): error TS7030: Not all code paths return a value.
src/shared/components/ui/Tooltip.tsx(65,26): error TS2554: Expected 1 arguments, but got 0.
src/shared/components/ui/Tooltip.tsx(66,26): error TS2554: Expected 1 arguments, but got 0.
src/shared/components/ui/Tooltip.tsx(297,31): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/Tooltip.tsx(298,22): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/Tooltip.tsx(299,31): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/Tooltip.tsx(300,23): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/ValidationSystem.tsx(471,5): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'onBlur' does not exist in type 'Partial<unknown> & Attributes'.
src/shared/contexts/SystematicScalingContext.tsx(454,26): error TS2339: Property 'founderId' does not exist on type 'SystematicScalingContextType'.

- Build Directory: No build output directory found

### ⚠️ Warnings (3)
- ESLint Check: Linting issues found
- Production Build Config: Consider setting NODE_ENV=production for optimized builds
- JS Minification: JavaScript files are large

## Phase 2 Status
🛑 PHASE 2 ISSUES - Fix failed tests before deploying

## Build Performance
- Build performance metrics not available

## Next Steps
- Fix build errors before attempting deployment

## Critical Issues to Fix
- TypeScript Check: Type errors found - may prevent build
- Build Failed: Build failed: Command failed: npm run build

> hs-platform-frontend@0.1.0 build
> npm run pre-build-audit && npm run validate:honesty && next build


> hs-platform-frontend@0.1.0 pre-build-audit
> npm run validate:no-jsx && npm run validate:no-mock && npm run type-check && npm run lint-check


> hs-platform-frontend@0.1.0 validate:no-jsx
> ! find app lib -name '*.jsx' -not -path '*/node_modules/*' 2>/dev/null | grep . && echo '✓ No JSX files found' || (echo '✗ ERROR: JSX files found! Convert to TSX:' && find app lib -name '*.jsx' -not -path '*/node_modules/*' && exit 1)

✓ No JSX files found

> hs-platform-frontend@0.1.0 validate:no-mock
> ! grep -r 'mockData\|MOCK_DATA\|fakeData\|dummyData\|testData' app/ lib/ --include='*.tsx' --include='*.ts' 2>/dev/null | grep -v '// @production-approved' && echo '✓ No mock data found' || (echo '✗ ERROR: Mock data found!' && grep -r 'mockData\|MOCK_DATA\|fakeData\|dummyData\|testData' app/ lib/ --include='*.tsx' --include='*.ts' | head -10 && exit 1)

✓ No mock data found

> hs-platform-frontend@0.1.0 type-check
> tsc --noEmit --strict

app/api/admin/migrate/route.ts(49,71): error TS2345: Argument of type '{ sql: string; }' is not assignable to parameter of type 'undefined'.
app/api/airtable/test/route.ts(51,22): error TS18046: 'data' is of type 'unknown'.
app/api/auth/[...supabase]/route.ts(82,23): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; created_at: string; updated_at: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; created_at: string; updated_at: string; }' is not assignable to parameter of type 'never[]'.
      Type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; created_at: string; updated_at: string; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/api/invitations/route.ts(187,52): error TS2339: Property 'max_members' does not exist on type 'never'.
app/api/invitations/route.ts(196,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "team_invitations", never, "POST">', gave the following error.
    Argument of type '{ organization_id: string; email: string; role: string; permissions: string[]; invited_by: string; expires_at: string; status: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "team_invitations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'organization_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(226,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: string; activity_type: string; details: { invited_email: string; role: string; organization_name: any; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(233,43): error TS2339: Property 'name' does not exist on type 'never'.
app/api/invitations/route.ts(239,87): error TS2339: Property 'name' does not exist on type 'never'.
app/api/invitations/route.ts(294,29): error TS2339: Property 'expires_at' does not exist on type 'never'.
app/api/invitations/route.ts(297,17): error TS2345: Argument of type '{ status: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(307,22): error TS2339: Property 'email' does not exist on type 'never'.
app/api/invitations/route.ts(313,22): error TS2339: Property 'status' does not exist on type 'never'.
app/api/invitations/route.ts(323,43): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(326,52): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/invitations/route.ts(335,10): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; role: any; permissions: any; invited_by: any; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(337,39): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(338,28): error TS2339: Property 'role' does not exist on type 'never'.
app/api/invitations/route.ts(339,35): error TS2339: Property 'permissions' does not exist on type 'never'.
app/api/invitations/route.ts(340,34): error TS2339: Property 'invited_by' does not exist on type 'never'.
app/api/invitations/route.ts(355,17): error TS2345: Argument of type '{ status: string; accepted_at: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(364,10): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; activity_type: string; details: { organization_name: any; role: any; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/invitations/route.ts(366,39): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(369,43): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/invitations/route.ts(370,30): error TS2339: Property 'role' does not exist on type 'never'.
app/api/invitations/route.ts(377,22): error TS2339: Property 'email' does not exist on type 'never'.
app/api/invitations/route.ts(385,17): error TS2345: Argument of type '{ status: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(394,43): error TS2339: Property 'organization_id' does not exist on type 'never'.
app/api/invitations/route.ts(398,66): error TS2339: Property 'role' does not exist on type 'never'.
app/api/invitations/route.ts(406,17): error TS2345: Argument of type '{ status: string; }' is not assignable to parameter of type 'never'.
app/api/invitations/route.ts(432,16): error TS2339: Property 'id' does not exist on type 'never'.
app/api/jobs/[jobId]/route.ts(46,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/[jobId]/route.ts(155,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/[jobId]/route.ts(238,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/[jobId]/route.ts(310,38): error TS2345: Argument of type '(request: NextRequest, { params }: { params: JobParams; }) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest, args_0: { params: JobParams; }) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/[jobId]/route.ts(311,41): error TS2345: Argument of type '(request: NextRequest, { params }: { params: JobParams; }) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest, args_0: { params: JobParams; }) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/[jobId]/route.ts(312,39): error TS2345: Argument of type '(request: NextRequest, { params }: { params: JobParams; }) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest, args_0: { params: JobParams; }) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(68,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/route.ts(130,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/route.ts(216,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/jobs/route.ts(259,39): error TS2345: Argument of type '(request: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(261,38): error TS2345: Argument of type '(req: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(273,41): error TS2345: Argument of type '(req: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/jobs/route.ts(276,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/middleware/auth.ts(36,39): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
app/api/middleware/auth.ts(37,40): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
app/api/organizations/route.ts(53,42): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/organizations/route.ts(57,11): error TS2698: Spread types may only be created from object types.
app/api/organizations/route.ts(59,24): error TS2339: Property 'organizations' does not exist on type 'never'.
app/api/organizations/route.ts(89,13): error TS2339: Property 'name' does not exist on type 'unknown'.
app/api/organizations/route.ts(89,19): error TS2339: Property 'slug' does not exist on type 'unknown'.
app/api/organizations/route.ts(89,25): error TS2339: Property 'description' does not exist on type 'unknown'.
app/api/organizations/route.ts(89,38): error TS2339: Property 'plan' does not exist on type 'unknown'.
app/api/organizations/route.ts(120,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "organizations", never, "POST">', gave the following error.
    Argument of type '{ name: any; slug: any; description: any; owner_id: string; plan: any; max_members: number; settings: {}; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "organizations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'name' does not exist in type 'never[]'.
app/api/organizations/route.ts(144,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; role: string; permissions: string[]; invited_by: string; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_organizations", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/organizations/route.ts(146,33): error TS2339: Property 'id' does not exist on type 'never'.
app/api/organizations/route.ts(159,26): error TS2339: Property 'id' does not exist on type 'never'.
app/api/organizations/route.ts(170,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; organization_id: any; activity_type: string; details: { action: string; organization_name: any; role: string; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/organizations/route.ts(172,33): error TS2339: Property 'id' does not exist on type 'never'.
app/api/progress/[customerId]/track/route.ts(30,15): error TS2339: Property 'action' does not exist on type 'unknown'.
app/api/progress/[customerId]/track/route.ts(30,23): error TS2339: Property 'metadata' does not exist on type 'unknown'.
app/api/research/route.ts(51,24): error TS2339: Property 'allowed' does not exist on type 'Response | { allowed: boolean; headers: Headers; }'.
  Property 'allowed' does not exist on type 'Response'.
app/api/research/route.ts(173,39): error TS2345: Argument of type '(request: NextRequest) => Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to parameter of type '(req: NextRequest) => Promise<NextResponse<unknown>>'.
  Type 'Promise<Response | { allowed: boolean; headers: Headers; }>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'Response | { allowed: boolean; headers: Headers; }' is not assignable to type 'NextResponse<unknown>'.
      Type 'Response' is missing the following properties from type 'NextResponse<unknown>': cookies, [INTERNALS]
app/api/roles/route.ts(32,68): error TS2339: Property 'role' does not exist on type 'never'.
app/api/roles/route.ts(109,7): error TS2339: Property 'userId' does not exist on type 'unknown'.
app/api/roles/route.ts(110,7): error TS2339: Property 'roleName' does not exist on type 'unknown'.
app/api/roles/route.ts(111,7): error TS2339: Property 'expiresAt' does not exist on type 'unknown'.
app/api/roles/route.ts(112,7): error TS2339: Property 'metadata' does not exist on type 'unknown'.
app/api/roles/route.ts(147,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_roles", never, "POST">', gave the following error.
    Argument of type '{ user_id: any; role_name: any; granted_by: string; expires_at: any; metadata: any; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_roles", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/roles/route.ts(169,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: any; activity_type: string; details: { action: string; role_name: any; assigned_by: string | undefined; expires_at: any; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/roles/route.ts(211,13): error TS2339: Property 'roleId' does not exist on type 'unknown'.
app/api/roles/route.ts(235,15): error TS2345: Argument of type '{ is_active: boolean; updated_at: string; }' is not assignable to parameter of type 'never'.
app/api/roles/route.ts(252,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: any; activity_type: string; details: { action: string; role_name: any; revoked_by: string | undefined; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/roles/route.ts(253,23): error TS2339: Property 'user_id' does not exist on type 'never'.
app/api/roles/route.ts(257,27): error TS2339: Property 'role_name' does not exist on type 'never'.
app/api/test-supabase/route.ts(38,9): error TS7034: Variable 'tables' implicitly has type 'any[]' in some locations where its type cannot be determined.
app/api/test-supabase/route.ts(78,19): error TS7005: Variable 'tables' implicitly has an 'any[]' type.
app/api/users/profile/route.ts(45,17): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; preferences: { email_notifications: boolean; marketing_emails: boolean; theme: string; language: string; }; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; preferences: { email_notifications: boolean; marketing_emails: boolean; theme: string; language: string; }; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never[]'.
      Type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; preferences: { email_notifications: boolean; marketing_emails: boolean; theme: string; language: string; }; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/api/users/profile/route.ts(63,30): error TS2339: Property 'created_at' does not exist on type 'SupabaseUser'.
app/api/users/profile/route.ts(102,9): error TS2698: Spread types may only be created from object types.
app/api/users/profile/route.ts(127,7): error TS2339: Property 'full_name' does not exist on type 'unknown'.
app/api/users/profile/route.ts(128,7): error TS2339: Property 'avatar_url' does not exist on type 'unknown'.
app/api/users/profile/route.ts(129,7): error TS2339: Property 'company' does not exist on type 'unknown'.
app/api/users/profile/route.ts(130,7): error TS2339: Property 'job_title' does not exist on type 'unknown'.
app/api/users/profile/route.ts(131,7): error TS2339: Property 'phone' does not exist on type 'unknown'.
app/api/users/profile/route.ts(132,7): error TS2339: Property 'timezone' does not exist on type 'unknown'.
app/api/users/profile/route.ts(133,7): error TS2339: Property 'locale' does not exist on type 'unknown'.
app/api/users/profile/route.ts(134,7): error TS2339: Property 'preferences' does not exist on type 'unknown'.
app/api/users/profile/route.ts(161,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
app/api/users/profile/route.ts(193,17): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; job_title: any; phone: any; timezone: any; locale: any; preferences: any; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; job_title: any; phone: any; timezone: any; locale: any; preferences: any; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is not assignable to parameter of type 'never[]'.
      Type '{ id: string; email: string; full_name: any; avatar_url: any; company: any; job_title: any; phone: any; timezone: any; locale: any; preferences: any; onboarding_completed: boolean; onboarding_step: number; is_active: boolean; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/api/users/profile/route.ts(217,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; activity_type: string; details: { updated_fields: string[]; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/api/users/profile/route.ts(252,15): error TS2345: Argument of type '{ is_active: boolean; updated_at: string; }' is not assignable to parameter of type 'never'.
app/api/users/profile/route.ts(271,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; activity_type: string; details: { action: string; timestamp: string; }; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_activity_log", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/auth/actions.ts(25,7): error TS7027: Unreachable code detected.
app/auth/page.tsx(5,26): error TS2307: Cannot find module '../components/auth/SupabaseAuth' or its corresponding type declarations.
app/customer/[customerId]/dashboard-premium/DashboardPremiumClient.tsx(88,46): error TS2322: Type '{ children: Element; key: string; size: string; className: string; }' is not assignable to type 'IntrinsicAttributes & ModernCardProps'.
  Property 'size' does not exist on type 'IntrinsicAttributes & ModernCardProps'.
app/customer/[customerId]/dashboard-premium/DashboardPremiumClient.tsx(94,19): error TS2322: Type '{ percentage: number; size: number; className: string; }' is not assignable to type 'IntrinsicAttributes & ModernCircularProgressProps'.
  Property 'className' does not exist on type 'IntrinsicAttributes & ModernCircularProgressProps'.
app/customer/[customerId]/dashboard-premium/DashboardPremiumClient.tsx(105,21): error TS2322: Type '{ children: Element[]; size: string; className: string; }' is not assignable to type 'IntrinsicAttributes & ModernCardProps'.
  Property 'size' does not exist on type 'IntrinsicAttributes & ModernCardProps'.
app/customer/[customerId]/simplified/dashboard/ModernPlatformDashboard.tsx(108,32): error TS2322: Type '{ children: Element; customerId: any; }' is not assignable to type 'IntrinsicAttributes & SystematicScalingProviderProps'.
  Property 'customerId' does not exist on type 'IntrinsicAttributes & SystematicScalingProviderProps'.
app/customer/[customerId]/simplified/resources/ResourcesClient.tsx(93,32): error TS2322: Type '{ children: Element; customerId: string; }' is not assignable to type 'IntrinsicAttributes & SystematicScalingProviderProps'.
  Property 'customerId' does not exist on type 'IntrinsicAttributes & SystematicScalingProviderProps'.
app/demo/phase-3f/page.tsx(11,25): error TS2307: Cannot find module '../../components/progressive-engagement/WelcomeHero' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(12,44): error TS2307: Cannot find module '../../components/progressive-engagement/ProgressiveEngagementContainer' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(13,34): error TS2307: Cannot find module '../../components/progressive-engagement/CompellingAspectDemo' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(14,42): error TS2307: Cannot find module '../../components/progressive-engagement/IntegratedIntelligenceReveal' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(15,58): error TS2307: Cannot find module '../../components/progressive-engagement/SuccessMetrics' or its corresponding type declarations.
app/demo/phase-3f/page.tsx(129,51): error TS7006: Parameter 'interaction' implicitly has an 'any' type.
app/demo/phase-3f/page.tsx(129,64): error TS7006: Parameter 'index' implicitly has an 'any' type.
app/hooks/useResourceGeneration.ts(170,25): error TS18046: 'errorData' is of type 'unknown'.
app/integration-test/page.tsx(20,17): error TS18046: 'apiData' is of type 'unknown'.
app/integration-test/page.tsx(21,18): error TS18046: 'apiData' is of type 'unknown'.
app/integration-test/page.tsx(45,17): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(45,39): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(46,27): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(62,17): error TS18046: 'data' is of type 'unknown'.
app/integration-test/page.tsx(62,44): error TS18046: 'data2' is of type 'unknown'.
app/lib/components/ErrorBoundary.tsx(25,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
app/lib/components/ErrorBoundary.tsx(33,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
app/lib/contexts/UserIntelligenceContext.tsx(76,7): error TS2353: Object literal may only specify known properties, and 'performance' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(88,7): error TS2353: Object literal may only specify known properties, and 'industry' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(99,7): error TS2353: Object literal may only specify known properties, and 'tier' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(105,7): error TS2353: Object literal may only specify known properties, and 'totalSessions' does not exist in type '(prevState: null) => null'.
app/lib/contexts/UserIntelligenceContext.tsx(112,25): error TS2698: Spread types may only be created from object types.
app/lib/contexts/UserIntelligenceContext.tsx(116,30): error TS2698: Spread types may only be created from object types.
app/lib/contexts/UserIntelligenceContext.tsx(125,16): error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'SetStateAction<null>'.
app/lib/events/ResourceGenerationEvents.ts(114,7): error TS2353: Object literal may only specify known properties, and 'available' does not exist in type 'Omit<EventPayload, "timestamp">'.
app/lib/events/ResourceGenerationEvents.ts(124,7): error TS2353: Object literal may only specify known properties, and 'available' does not exist in type 'Omit<EventPayload, "timestamp">'.
app/lib/services/agentOrchestrationService.ts(172,7): error TS18004: No value exists in scope for the shorthand property 'agentsSpawned'. Either declare one or provide an initializer.
app/lib/services/agentOrchestrationService.ts(553,12): error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ revenue_crisis: { requiredAgents: ("customer_intelligence" | "value_communication" | "sales_execution" | "systematic_optimization")[]; actionPlan: string[]; expectedResolution: string; }; customer_churn: { ...; }; competitive_threat: { ...; }; growth_bottleneck: { ...; }; }'.
  No index signature with a parameter of type 'string' was found on type '{ revenue_crisis: { requiredAgents: ("customer_intelligence" | "value_communication" | "sales_execution" | "systematic_optimization")[]; actionPlan: string[]; expectedResolution: string; }; customer_churn: { ...; }; competitive_threat: { ...; }; growth_bottleneck: { ...; }; }'.
app/lib/services/claudeAIService.ts(246,12): error TS18046: 'data' is of type 'unknown'.
app/lib/services/customerValueOrchestrator.ts(761,86): error TS1064: The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<string[]>'?
app/lib/services/exportService.ts(94,25): error TS18046: 'error' is of type 'unknown'.
app/lib/services/exportService.ts(299,58): error TS1064: The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<ExportResult>'?
app/lib/services/exportService.ts(423,14): error TS18046: 'data' is of type 'unknown'.
app/lib/services/supabaseClient.ts(242,3): error TS2322: Type 'string | boolean | undefined' is not assignable to type 'boolean'.
  Type 'undefined' is not assignable to type 'boolean'.
app/lib/services/supabaseClient.ts(254,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; session_id: string; pipeline_status: string; current_step: string; progress_data: { started_at: string; }; error_count: number; expires_at: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'customer_id' does not exist in type 'never[]'.
app/lib/services/supabaseClient.ts(281,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
app/lib/services/supabaseClient.ts(297,34): error TS2339: Property 'error_count' does not exist on type 'never'.
app/lib/services/supabaseClient.ts(302,15): error TS2345: Argument of type '{ error_count: any; last_error: string; pipeline_status: string; updated_at: string; }' is not assignable to parameter of type 'never'.
app/lib/services/supabaseDataService.ts(129,17): error TS2345: Argument of type '{ user_id: string; status: string; updated_at: string; }' is not assignable to parameter of type 'never'.
app/lib/services/supabaseDataService.ts(134,30): error TS2339: Property 'id' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(146,35): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(147,34): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(148,27): error TS2339: Property 'email' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(151,36): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(156,43): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(163,50): error TS2339: Property 'created_at' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(171,17): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_assets", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; customer_name: string; company_name?: string | undefined; email: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_assets", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; customer_name: string; company_name?: string | undefined; email: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is not assignable to parameter of type 'never[]'.
      Type '{ customer_id: string; customer_name: string; company_name?: string | undefined; email: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is missing the following properties from type 'never[]': length, pop, push, concat, and 35 more.
app/lib/services/supabaseDataService.ts(182,12): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Argument of type '{ user_id: string; customer_id: string; full_name: any; company_name: any; job_title: any; subscription_status: string; onboarding_completed: boolean; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "user_profiles", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'user_id' does not exist in type 'never[]'.
app/lib/services/supabaseDataService.ts(185,35): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(186,38): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(187,35): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(230,27): error TS2339: Property 'session_id' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(231,32): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(232,23): error TS2339: Property 'email' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(233,27): error TS2339: Property 'created_at' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(269,36): error TS2339: Property 'customer_id' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(277,25): error TS2322: Type 'null' is not assignable to type '{ id: string; customer_id: string; customer_name: string; company_name: string; email: string; workflow_progress: any; competency_progress: any; tool_access_status: any; detailed_icp_analysis: any; ... 9 more ...; updated_at: string; } | undefined'.
app/lib/services/supabaseDataService.ts(301,41): error TS2339: Property 'assessment_data' does not exist on type 'never'.
app/lib/services/supabaseDataService.ts(341,17): error TS2345: Argument of type '{ updated_at: string; customer_name?: string; company_name?: string; email?: string; workflow_progress?: any; competency_progress?: any; tool_access_status?: any; detailed_icp_analysis?: any; ... 7 more ...; export_history?: any; }' is not assignable to parameter of type 'never'.
app/lib/services/supabaseDataService.ts(388,10): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "assessment_sessions", never, "POST">', gave the following error.
    Argument of type '{ session_id: string; assessment_data: AssessmentData; email: string | undefined; status: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "assessment_sessions", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'session_id' does not exist in type 'never[]'.
app/lib/services/webResearchService.ts(90,15): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(90,28): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(91,60): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(93,61): error TS18046: 'data' is of type 'unknown'.
app/lib/services/webResearchService.ts(330,25): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
app/lib/services/webResearchService.ts(350,14): error TS18046: 'data' is of type 'unknown'.
app/lib/types/supabase.ts(7,7): error TS2411: Property 'customer_assets' of type '{ Row: CustomerAsset; Insert: Partial<CustomerAsset>; Update: Partial<CustomerAsset>; }' is not assignable to 'string' index type '{ Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown>; }'.
app/lib/utils/performanceMonitor.ts(89,22): error TS2339: Property 'hadRecentInput' does not exist on type 'PerformanceEntry'.
app/lib/utils/performanceMonitor.ts(90,31): error TS2339: Property 'value' does not exist on type 'PerformanceEntry'.
app/profile/page.tsx(74,20): error TS18046: 'data' is of type 'unknown'.
app/profile/page.tsx(76,18): error TS18046: 'data' is of type 'unknown'.
app/profile/page.tsx(103,20): error TS18046: 'data' is of type 'unknown'.
app/profile/page.tsx(107,18): error TS18046: 'data' is of type 'unknown'.
app/providers.tsx(35,12): error TS2741: Property 'founderId' is missing in type '{ children: ReactNode; }' but required in type 'SystematicScalingProviderProps'.
app/storage-test/page.tsx(46,9): error TS2322: Type 'string | null' is not assignable to type 'null'.
  Type 'string' is not assignable to type 'null'.
app/test-new-features/page.tsx(95,9): error TS2353: Object literal may only specify known properties, and 'resourceType' does not exist in type 'ExportRequest'.
app/test-new-features/page.tsx(115,9): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
app/test-new-features/page.tsx(163,7): error TS2322: Type '"email-html"' is not assignable to type 'ExportFormat'.
app/test-new-features/page.tsx(164,7): error TS2322: Type '"salesforce-csv"' is not assignable to type 'ExportFormat'.
app/test-new-features/page.tsx(165,7): error TS2322: Type '"slack-blocks"' is not assignable to type 'ExportFormat'.
app/test-session/page.tsx(40,41): error TS2445: Property 'supabaseUrl' is protected and only accessible within class 'SupabaseClient<Database, SchemaNameOrClientOptions, SchemaName, Schema, ClientOptions>' and its subclasses.
lib/api/client.ts(2,21): error TS7016: Could not find a declaration file for module 'js-cookie'. '/Users/geter/andru/hs-andru-test/modern-platform/node_modules/js-cookie/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/js-cookie` if it exists or add a new declaration (.d.ts) file containing `declare module 'js-cookie';`
lib/api/client.ts(614,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(633,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(651,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(669,77): error TS18046: 'errorData' is of type 'unknown'.
lib/api/client.ts(691,77): error TS18046: 'errorData' is of type 'unknown'.
lib/auth/supabase-auth.ts(66,38): error TS18047: 'session' is possibly 'null'.
lib/auth/supabase-auth.ts(113,12): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; email: string; first_name: any; last_name: any; company_name: any; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_profiles", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'customer_id' does not exist in type 'never[]'.
lib/auth/unified-auth.ts(31,7): error TS2322: Type 'string | undefined' is not assignable to type 'string | null'.
  Type 'undefined' is not assignable to type 'string | null'.
lib/hooks/useAPI.ts(148,11): error TS18046: 'data' is of type 'unknown'.
lib/hooks/useAPI.ts(149,46): error TS18046: 'data' is of type 'unknown'.
lib/performance/caching.ts(172,9): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
lib/performance/caching.ts(267,20): error TS2554: Expected 1 arguments, but got 0.
lib/performance/caching.ts(333,53): error TS7030: Not all code paths return a value.
lib/queue/job-queue.ts(139,26): error TS2345: Argument of type 'Job<T>' is not assignable to parameter of type 'Job<JobData>'.
  Type 'T' is not assignable to type 'JobData'.
lib/queue/job-queue.ts(142,31): error TS2345: Argument of type 'Job<T>' is not assignable to parameter of type 'Job<JobData>'.
  Type 'T' is not assignable to type 'JobData'.
lib/queue/job-queue.ts(145,30): error TS2345: Argument of type 'Job<T>' is not assignable to parameter of type 'Job<JobData>'.
  Type 'T' is not assignable to type 'JobData'.
lib/services/authService.ts(4,21): error TS7016: Could not find a declaration file for module 'js-cookie'. '/Users/geter/andru/hs-andru-test/modern-platform/node_modules/js-cookie/index.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/js-cookie` if it exists or add a new declaration (.d.ts) file containing `declare module 'js-cookie';`
lib/services/authService.ts(416,38): error TS2339: Property 'getAdminProfile' does not exist on type 'AuthService'.
lib/services/authService.ts(448,10): error TS2554: Expected 1 arguments, but got 0.
lib/services/authService.ts(457,12): error TS2554: Expected 1 arguments, but got 0.
lib/services/claude-ai-service.ts(83,5): error TS2322: Type 'string | undefined' is not assignable to type 'string | null'.
  Type 'undefined' is not assignable to type 'string | null'.
lib/services/email-service.ts(280,27): error TS2345: Argument of type '{ to: string; from: string; template: string; templateVariables: { userName: string; companyName: string; currentARR: string; targetARR: string; dashboardUrl: string; }; priority: "high"; tags: string[]; }' is not assignable to parameter of type 'EmailRequest'.
  Property 'subject' is missing in type '{ to: string; from: string; template: string; templateVariables: { userName: string; companyName: string; currentARR: string; targetARR: string; dashboardUrl: string; }; priority: "high"; tags: string[]; }' but required in type 'EmailRequest'.
lib/services/email-service.ts(307,27): error TS2345: Argument of type '{ to: string; from: string; template: string; templateVariables: { userName: string; analysisType: string; insights: string[]; reportUrl: string; hasAttachment: boolean; }; attachments: EmailAttachment[] | undefined; tags: string[]; }' is not assignable to parameter of type 'EmailRequest'.
  Property 'subject' is missing in type '{ to: string; from: string; template: string; templateVariables: { userName: string; analysisType: string; insights: string[]; reportUrl: string; hasAttachment: boolean; }; attachments: EmailAttachment[] | undefined; tags: string[]; }' but required in type 'EmailRequest'.
lib/services/email-service.ts(339,27): error TS2345: Argument of type '{ to: string | string[]; from: string; template: string; templateVariables: { subject: string; title: string; userName: string; message: string; actionUrl: string | undefined; actionText: string; senderName: string; }; priority: "high" | ... 1 more ... | "low"; tags: string[]; }' is not assignable to parameter of type 'EmailRequest'.
  Property 'subject' is missing in type '{ to: string | string[]; from: string; template: string; templateVariables: { subject: string; title: string; userName: string; message: string; actionUrl: string | undefined; actionText: string; senderName: string; }; priority: "high" | ... 1 more ... | "low"; tags: string[]; }' but required in type 'EmailRequest'.
lib/services/email-service.ts(538,61): error TS1501: This regular expression flag is only available when targeting 'es2018' or later.
lib/services/job-service.ts(262,5): error TS2322: Type 'T | undefined' is not assignable to type 'T'.
  'T' could be instantiated with an arbitrary type which could be unrelated to 'T | undefined'.
lib/supabase/admin.ts(60,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
lib/supabase/client.ts(219,10): error TS2552: Cannot find name 'isSupabaseConfigured'. Did you mean 'isSupabaseConfiguredProp'?
lib/supabase/client.ts(233,10): error TS2552: Cannot find name 'isSupabaseConfigured'. Did you mean 'isSupabaseConfiguredProp'?
lib/supabase/client.ts(245,8): error TS2769: No overload matches this call.
  Overload 1 of 2, '(values: never, options?: { count?: "exact" | "planned" | "estimated" | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Argument of type '{ customer_id: string; session_id: string; pipeline_status: string; current_step: string; progress_data: { started_at: string; }; error_count: number; expires_at: string; }' is not assignable to parameter of type 'never'.
  Overload 2 of 2, '(values: never[], options?: { count?: "exact" | "planned" | "estimated" | undefined; defaultToNull?: boolean | undefined; } | undefined): PostgrestFilterBuilder<{ PostgrestVersion: "12"; }, never, never, null, "customer_sessions", never, "POST">', gave the following error.
    Object literal may only specify known properties, and 'customer_id' does not exist in type 'never[]'.
lib/supabase/client.ts(272,15): error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'.
lib/supabase/client.ts(288,34): error TS2339: Property 'error_count' does not exist on type 'never'.
lib/supabase/client.ts(293,15): error TS2345: Argument of type '{ error_count: any; last_error: string; pipeline_status: string; updated_at: string; }' is not assignable to parameter of type 'never'.
lib/validation/index.ts(70,5): error TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
lib/validation/index.ts(79,12): error TS2686: 'React' refers to a UMD global, but the current file is a module. Consider adding an import instead.
lib/validation/index.ts(79,32): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type 'ComponentType<T>' is not assignable to parameter of type 'string | FunctionComponent<{}> | ComponentClass<{}, any>'.
      Type 'ComponentClass<T, any>' is not assignable to type 'string | FunctionComponent<{}> | ComponentClass<{}, any>'.
        Type 'ComponentClass<T, any>' is not assignable to type 'ComponentClass<{}, any>'.
          Types of property 'getDerivedStateFromProps' are incompatible.
            Type 'GetDerivedStateFromProps<T, any> | undefined' is not assignable to type 'GetDerivedStateFromProps<{}, any> | undefined'.
              Type 'GetDerivedStateFromProps<T, any>' is not assignable to type 'GetDerivedStateFromProps<{}, any>'.
                Types of parameters 'nextProps' and 'nextProps' are incompatible.
                  Type 'Readonly<{}>' is not assignable to type 'Readonly<T>'.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(3,28): error TS2307: Cannot find module 'braintrust' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(4,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(10,7): error TS2416: Property 'createConnection' in type '(Anonymous class)' is not assignable to the same property in base type 'Agent'.
  Type '(_: any, callback: Function) => net.Socket' is not assignable to type '(options: ClientRequestArgs, callback?: ((err: Error | null, stream: Duplex) => void) | undefined) => Duplex'.
    Types of parameters 'callback' and 'callback' are incompatible.
      Type '((err: Error | null, stream: Duplex) => void) | undefined' is not assignable to type 'Function'.
        Type 'undefined' is not assignable to type 'Function'.
mcp-servers/stripe-mcp/evals/braintrust_openai.ts(10,7): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Agent'.
mcp-servers/stripe-mcp/evals/eval.ts(7,8): error TS2307: Cannot find module 'openai/resources' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/eval.ts(8,22): error TS2307: Cannot find module 'braintrust' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/eval.ts(98,34): error TS7006: Parameter 'tc' implicitly has an 'any' type.
mcp-servers/stripe-mcp/evals/eval.ts(117,18): error TS7006: Parameter 'input' implicitly has an 'any' type.
mcp-servers/stripe-mcp/evals/scorer.ts(3,26): error TS2307: Cannot find module 'autoevals' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(4,19): error TS2307: Cannot find module 'lodash/every' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(7,44): error TS2307: Cannot find module 'openai/resources/chat/completions.mjs' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(8,47): error TS2307: Cannot find module 'openai/resources/chat/completions.mjs' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(10,21): error TS2307: Cannot find module 'lodash/isEqual' or its corresponding type declarations.
mcp-servers/stripe-mcp/evals/scorer.ts(65,46): error TS7006: Parameter 'r' implicitly has an 'any' type.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(6,3): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(7,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(14,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(15,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(16,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(19,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(22,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(23,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(26,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(29,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(30,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(33,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(37,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(38,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(41,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(45,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(46,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(47,14): error TS2790: The operand of a 'delete' operator must be optional.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(50,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(56,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(61,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(64,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(71,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(72,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(73,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(77,3): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(78,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(80,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(85,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(87,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(92,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(98,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(103,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(105,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(110,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(116,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(121,5): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(126,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(133,1): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(134,1): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(136,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(137,3): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(138,5): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(141,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(146,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(154,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(157,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(167,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(187,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(190,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(201,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/modelcontextprotocol/src/test/index.test.ts(209,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/examples/ai-sdk/index.ts(1,34): error TS2307: Cannot find module '@stripe/agent-toolkit/ai-sdk' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/ai-sdk/index.ts(2,22): error TS2307: Cannot find module '@ai-sdk/openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/ai-sdk/index.ts(6,8): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(3,20): error TS2307: Cannot find module 'hono' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(14,33): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(25,21): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(33,30): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(65,36): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(77,29): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/app.ts(94,7): error TS7027: Unreachable code detected.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(1,25): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(6,8): error TS2307: Cannot find module '@stripe/agent-toolkit/cloudflare' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(8,29): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(28,63): error TS7031: Binding element 'a' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(28,66): error TS7031: Binding element 'b' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(35,10): error TS2339: Property 'paidTool' does not exist on type 'MyMCP'.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(61,10): error TS2339: Property 'paidTool' does not exist on type 'MyMCP'.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(68,9): error TS7031: Binding element 'a' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(68,12): error TS7031: Binding element 'b' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(90,10): error TS2339: Property 'paidTool' does not exist on type 'MyMCP'.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/index.ts(96,9): error TS7031: Binding element 'object' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(3,20): error TS2307: Cannot find module 'hono' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(14,33): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(25,21): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(33,30): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(65,36): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(77,29): error TS7006: Parameter 'c' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/oauth.ts(94,7): error TS7027: Unreachable code detected.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/utils.ts(4,25): error TS2307: Cannot find module 'hono/html' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/utils.ts(5,38): error TS2307: Cannot find module 'hono/utils/html' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/cloudflare/src/utils.ts(6,32): error TS2307: Cannot find module '@cloudflare/workers-oauth-provider' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(1,34): error TS2307: Cannot find module '@stripe/agent-toolkit/langchain' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(2,26): error TS2307: Cannot find module '@langchain/openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(3,39): error TS2307: Cannot find module '@langchain/core/prompts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(4,20): error TS2307: Cannot find module 'langchain/hub' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/langchain/index.ts(5,56): error TS2307: Cannot find module 'langchain/agents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(1,34): error TS2307: Cannot find module '@stripe/agent-toolkit/openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(2,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(3,47): error TS2307: Cannot find module 'openai/resources' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/examples/openai/index.ts(51,33): error TS7006: Parameter 'tc' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/jest.config.ts(1,27): error TS2307: Cannot find module 'jest' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/tool.ts(1,29): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/tool.ts(2,20): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/tool.ts(10,11): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/toolkit.ts(8,8): error TS2307: Cannot find module 'ai' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/toolkit.ts(80,29): error TS7031: Binding element 'doGenerate' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/src/ai-sdk/toolkit.ts(90,27): error TS7031: Binding element 'doStream' implicitly has an 'any' type.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(2,28): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(3,25): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(38,39): error TS2339: Property 'server' does not exist on type 'experimental_PaidMcpAgent<Bindings, State, Props>'.
mcp-servers/stripe-mcp/typescript/src/cloudflare/index.ts(40,28): error TS2339: Property 'props' does not exist on type 'experimental_PaidMcpAgent<Bindings, State, Props>'.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(2,30): error TS2307: Cannot find module '@langchain/core/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(3,41): error TS2307: Cannot find module '@langchain/core/callbacks/manager' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(4,30): error TS2307: Cannot find module '@langchain/core/runnables' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(16,11): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/langchain/tool.ts(22,13): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/langchain/toolkit.ts(1,27): error TS2307: Cannot find module '@langchain/core/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/register-paid-tool.ts(2,30): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/register-paid-tool.ts(3,28): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/register-paid-tool.ts(4,35): error TS2307: Cannot find module '@modelcontextprotocol/sdk/types.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/toolkit.ts(1,25): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/toolkit.ts(2,35): error TS2307: Cannot find module '@modelcontextprotocol/sdk/shared/protocol.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/modelcontextprotocol/toolkit.ts(37,12): error TS2339: Property 'tool' does not exist on type 'StripeAgentToolkit'.
mcp-servers/stripe-mcp/typescript/src/openai/toolkit.ts(4,31): error TS2307: Cannot find module 'zod-to-json-schema' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/openai/toolkit.ts(9,8): error TS2307: Cannot find module 'openai/resources' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/balance/retrieveBalance.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/balance/retrieveBalance.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/balance/retrieveBalance.ts(12,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/coupons/createCoupon.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/coupons/createCoupon.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/coupons/createCoupon.ts(24,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/coupons/listCoupons.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/coupons/listCoupons.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/createCustomer.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/createCustomer.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/createCustomer.ts(16,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/customers/listCustomers.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/customers/listCustomers.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/listDisputes.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/listDisputes.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/updateDispute.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/disputes/updateDispute.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(15,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/documentation/searchDocumentation.ts(64,18): error TS2339: Property 'sources' does not exist on type '{}'.
mcp-servers/stripe-mcp/typescript/src/shared/invoiceItems/createInvoiceItem.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoiceItems/createInvoiceItem.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoiceItems/createInvoiceItem.ts(41,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/invoices/createInvoice.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/createInvoice.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/createInvoice.ts(22,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/invoices/finalizeInvoice.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/finalizeInvoice.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/finalizeInvoice.ts(8,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/invoices/listInvoices.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/listInvoices.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/invoices/listInvoices.ts(37,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/paymentIntents/listPaymentIntents.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/paymentIntents/listPaymentIntents.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/paymentIntents/listPaymentIntents.ts(51,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/paymentLinks/createPaymentLink.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/paymentLinks/createPaymentLink.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/createPrice.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/createPrice.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/listPrices.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/listPrices.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/prices/listPrices.ts(23,65): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/products/createProduct.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/createProduct.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/listProducts.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/listProducts.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/products/listProducts.ts(32,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/refunds/createRefund.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/refunds/createRefund.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/refunds/createRefund.ts(38,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/cancelSubscription.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/cancelSubscription.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/cancelSubscription.ts(28,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/listSubscriptions.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/listSubscriptions.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/listSubscriptions.ts(29,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/updateSubscription.ts(3,28): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/updateSubscription.ts(4,25): error TS2307: Cannot find module '@/shared/tools' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/subscriptions/updateSubscription.ts(42,6): error TS2724: '"/Users/geter/andru/hs-andru-test/modern-platform/node_modules/zod/v4/classic/external"' has no exported member named 'AnyZodObject'. Did you mean 'ZodObject'?
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(3,32): error TS2307: Cannot find module '@/shared/customers/createCustomer' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(4,31): error TS2307: Cannot find module '@/shared/customers/listCustomers' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(5,31): error TS2307: Cannot find module '@/shared/products/createProduct' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(6,30): error TS2307: Cannot find module '@/shared/products/listProducts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(7,29): error TS2307: Cannot find module '@/shared/prices/createPrice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(8,28): error TS2307: Cannot find module '@/shared/prices/listPrices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(9,35): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(10,31): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(11,30): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(12,35): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(13,33): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(14,33): error TS2307: Cannot find module '@/shared/balance/retrieveBalance' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(15,29): error TS2307: Cannot find module '@/shared/coupons/listCoupons' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(16,30): error TS2307: Cannot find module '@/shared/coupons/createCoupon' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(17,30): error TS2307: Cannot find module '@/shared/refunds/createRefund' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(18,36): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(19,35): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(20,36): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(21,36): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(22,37): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(23,30): error TS2307: Cannot find module '@/shared/disputes/listDisputes' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(24,31): error TS2307: Cannot find module '@/shared/disputes/updateDispute' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/shared/tools.ts(33,15): error TS2707: Generic type 'ZodObject<Shape, Config>' requires between 0 and 2 type arguments.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(2,30): error TS2307: Cannot find module '@modelcontextprotocol/sdk/server/mcp.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(8,8): error TS2307: Cannot find module '@modelcontextprotocol/sdk/types.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(9,40): error TS2307: Cannot find module '@modelcontextprotocol/sdk/shared/protocol.js' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(12,1): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(16,22): error TS2503: Cannot find namespace 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(17,19): error TS2503: Cannot find namespace 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(20,3): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(22,5): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(26,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(32,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(33,17): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(37,19): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(38,21): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(39,17): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(43,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(47,19): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(52,27): error TS2503: Cannot find namespace 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(57,25): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(58,20): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(63,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(69,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(94,7): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(98,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(123,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(147,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(150,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(155,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(171,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(195,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(207,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(222,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(225,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(255,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/modelcontextprotocol/register-paid-tool.test.ts(282,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(1,31): error TS2307: Cannot find module '@/shared/balance/retrieveBalance' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(5,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(25,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(26,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(29,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(40,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/functions.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(1,41): error TS2307: Cannot find module '@/shared/balance/retrieveBalance' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/balance/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(2,29): error TS2307: Cannot find module '@/shared/configuration' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(49,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(93,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/configuration.test.ts(129,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(1,30): error TS2307: Cannot find module '@/shared/customers/createCustomer' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(2,29): error TS2307: Cannot find module '@/shared/customers/listCustomers' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(31,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(32,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(35,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(50,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(53,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(57,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(58,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(69,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(70,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(73,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(86,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/functions.test.ts(92,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(1,40): error TS2307: Cannot find module '@/shared/customers/createCustomer' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(2,39): error TS2307: Cannot find module '@/shared/customers/listCustomers' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(12,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(15,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(19,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(20,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(24,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(25,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(30,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(33,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(37,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/customers/parameters.test.ts(38,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(1,29): error TS2307: Cannot find module '@/shared/disputes/updateDispute' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(2,28): error TS2307: Cannot find module '@/shared/disputes/listDisputes' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(42,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(45,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(63,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(73,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(77,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(78,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(86,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(87,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(90,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(100,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(106,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(109,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(123,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/disputes/functions.test.ts(124,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(1,35): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(3,45): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(5,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(9,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(19,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(20,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(43,23): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(46,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(51,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(57,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(60,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(72,23): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(75,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(80,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/functions.test.ts(86,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(1,45): error TS2307: Cannot find module '@/shared/documentation/searchDocumentation' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/documentation/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(1,33): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(5,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(31,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(32,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(35,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(52,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(55,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(58,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(74,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/functions.test.ts(81,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(1,43): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(1,39): error TS2307: Cannot find module '@/shared/invoiceItems/createInvoiceItem' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(6,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(9,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoiceItems/prompts.test.ts(12,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(1,29): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(2,28): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(3,31): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(5,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(7,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(8,22): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(9,15): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(10,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(16,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(20,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(21,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(39,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(42,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(58,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(65,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(68,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(83,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(91,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(95,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(96,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(108,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(109,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(112,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(126,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(130,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(133,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(147,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(151,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(155,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(156,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(167,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(171,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(174,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(187,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/functions.test.ts(190,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(1,39): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(2,38): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(3,41): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(14,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(19,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(23,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(24,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(28,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(32,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(36,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(37,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(41,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(42,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(47,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(50,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(54,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/parameters.test.ts(55,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(1,35): error TS2307: Cannot find module '@/shared/invoices/createInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(2,34): error TS2307: Cannot find module '@/shared/invoices/listInvoices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(3,37): error TS2307: Cannot find module '@/shared/invoices/finalizeInvoice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(11,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(13,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(14,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(18,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(19,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(21,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(24,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(26,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(31,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(32,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/invoices/prompts.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(1,34): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(5,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(33,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(37,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(56,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(62,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(65,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(84,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(93,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(112,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/functions.test.ts(116,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(1,44): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(1,40): error TS2307: Cannot find module '@/shared/paymentIntents/listPaymentIntents' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(6,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(9,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(14,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentIntents/prompts.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(1,33): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(5,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(40,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(41,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(44,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(70,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(73,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(76,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(107,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/functions.test.ts(108,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(1,43): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(1,39): error TS2307: Cannot find module '@/shared/paymentLinks/createPaymentLink' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(7,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(14,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(19,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(22,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(23,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(26,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/paymentLinks/prompts.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(1,27): error TS2307: Cannot find module '@/shared/prices/createPrice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(2,26): error TS2307: Cannot find module '@/shared/prices/listPrices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(32,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(33,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(36,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(52,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(55,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(59,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(60,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(71,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(72,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(75,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(88,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/functions.test.ts(94,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(1,37): error TS2307: Cannot find module '@/shared/prices/createPrice' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(2,36): error TS2307: Cannot find module '@/shared/prices/listPrices' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(13,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(22,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(23,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(28,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(31,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/prices/parameters.test.ts(36,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(1,29): error TS2307: Cannot find module '@/shared/products/createProduct' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(2,28): error TS2307: Cannot find module '@/shared/products/listProducts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(4,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(6,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(13,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(17,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(18,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(30,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(31,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(34,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(48,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(51,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(55,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(56,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(67,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(68,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(71,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(84,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/functions.test.ts(90,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(1,39): error TS2307: Cannot find module '@/shared/products/createProduct' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(2,38): error TS2307: Cannot find module '@/shared/products/listProducts' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(4,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(5,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(13,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(22,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(23,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(28,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(31,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/products/parameters.test.ts(36,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(1,28): error TS2307: Cannot find module '@/shared/refunds/createRefund' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(3,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(5,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(11,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(15,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(16,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(29,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(30,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(33,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(47,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(48,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(51,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(66,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/functions.test.ts(69,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(1,38): error TS2307: Cannot find module '@/shared/refunds/createRefund' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(3,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(4,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(8,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(12,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(16,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/refunds/parameters.test.ts(17,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(1,33): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(2,34): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(3,34): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(5,16): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(7,11): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(8,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(9,13): error TS2304: Cannot find name 'jest'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(15,1): error TS2304: Cannot find name 'beforeEach'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(19,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(20,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(62,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(63,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(66,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(94,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(98,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(101,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(129,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(132,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(135,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(142,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(146,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(147,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(173,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(178,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(181,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(190,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(194,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(195,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(227,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(239,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(242,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(257,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(260,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(289,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/functions.test.ts(298,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(1,43): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(2,44): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(3,44): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(14,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(18,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(19,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(23,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(24,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(27,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(31,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(32,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(35,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(38,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(40,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(43,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(45,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/parameters.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(1,39): error TS2307: Cannot find module '@/shared/subscriptions/listSubscriptions' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(2,40): error TS2307: Cannot find module '@/shared/subscriptions/cancelSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(3,40): error TS2307: Cannot find module '@/shared/subscriptions/updateSubscription' or its corresponding type declarations.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(5,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(6,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(9,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(10,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(11,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(12,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(13,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(14,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(17,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(20,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(21,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(22,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(23,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(24,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(25,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(29,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(30,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(33,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(34,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(38,1): error TS2582: Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(39,3): error TS2582: Cannot find name 'it'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha`.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(42,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(45,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(46,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/src/test/shared/subscriptions/prompts.test.ts(47,5): error TS2304: Cannot find name 'expect'.
mcp-servers/stripe-mcp/typescript/tsup.config.ts(1,28): error TS2307: Cannot find module 'tsup' or its corresponding type declarations.
server.ts(46,3): error TS2322: Type '(string | undefined)[]' is not assignable to type 'StaticOrigin | CustomOrigin | undefined'.
  Type '(string | undefined)[]' is not assignable to type '(string | boolean | RegExp)[]'.
    Type 'string | undefined' is not assignable to type 'string | boolean | RegExp'.
      Type 'undefined' is not assignable to type 'string | boolean | RegExp'.
server.ts(144,56): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(145,22): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(146,30): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(147,31): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(148,22): error TS2339: Property 'query' does not exist on type 'NextRequest'.
server.ts(165,30): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'JobStatus | undefined'.
  Type 'string' is not assignable to type 'JobStatus | undefined'.
server.ts(220,62): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(260,66): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(261,11): error TS2339: Property 'message' does not exist on type 'ReadableStream<Uint8Array<ArrayBuffer>> | null'.
server.ts(261,20): error TS2339: Property 'options' does not exist on type 'ReadableStream<Uint8Array<ArrayBuffer>> | null'.
server.ts(268,18): error TS7052: Element implicitly has an 'any' type because type 'Headers' has no index signature. Did you mean to call 'req.headers.get'?
server.ts(277,5): error TS2322: Type '{ type: string; delay: number; }' is not assignable to type '"fixed" | "exponential" | undefined'.
server.ts(294,63): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(299,60): error TS2345: Argument of type '(req: NextRequest, res: any) => Promise<void>' is not assignable to parameter of type '(req: NextRequest, res: any) => Promise<NextResponse<unknown>>'.
  Type 'Promise<void>' is not assignable to type 'Promise<NextResponse<unknown>>'.
    Type 'void' is not assignable to type 'NextResponse<unknown>'.
server.ts(301,19): error TS7052: Element implicitly has an 'any' type because type 'Headers' has no index signature. Did you mean to call 'req.headers.get'?
server.ts(307,9): error TS2339: Property 'clear' does not exist on type '{ get: <T = any>(key: string) => T | null; set: <T = any>(key: string, value: T, ttl?: number | undefined) => void; delete: (key: string) => boolean; user: { get: <T = any>(key: string) => T | null; set: <T = any>(key: string, value: T, ttl?: number | undefined) => void; delete: (key: string) => boolean; }; file: { ...'.
server.ts(312,9): error TS7030: Not all code paths return a value.
server.ts(368,21): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Argument of type 'string' is not assignable to parameter of type 'number'.
src/features/cost-business-case/business-case/SimplifiedBusinessCaseBuilder.tsx(56,25): error TS2345: Argument of type '{ eventType: string; metadata: { tool: string; action: string; currentCost: number; revenueImpact: number; }; scalingContext: { currentARR: any; targetARR: any; growthStage: string; systematicApproach: boolean; }; businessImpact: string; professionalCredibility: number; }' is not assignable to parameter of type 'string'.
src/features/cost-business-case/business-case/SimplifiedBusinessCaseBuilder.tsx(94,49): error TS2554: Expected 2 arguments, but got 3.
src/features/cost-business-case/cost-calculator/CostCalculatorForm.tsx(103,35): error TS2339: Property 'totalCost' does not exist on type '{ totalCostOfInaction: number; monthlyImpact: number; breakdown: { missedGrowthRevenue: number; inefficiencyLoss: number; churnImpact: number; salesCycleCost: number; }; inputData: any; calculatedAt: string; }'.
src/features/cost-business-case/cost-calculator/SimplifiedCostCalculator.tsx(59,25): error TS2345: Argument of type '{ eventType: string; metadata: { tool: string; action: string; timeframe: number; totalCost: number; }; scalingContext: { currentARR: any; targetARR: any; growthStage: string; systematicApproach: boolean; }; businessImpact: string; professionalCredibility: number; }' is not assignable to parameter of type 'string'.
src/features/cost-business-case/cost-calculator/SimplifiedCostCalculator.tsx(78,49): error TS2554: Expected 2 arguments, but got 3.
src/features/cost-business-case/index.ts(5,10): error TS2305: Module '"./cost-calculator/CostCalculatorForm"' has no exported member 'default'.
src/features/cost-business-case/index.ts(6,10): error TS2305: Module '"./cost-calculator/CostHistory"' has no exported member 'default'.
src/features/cost-business-case/index.ts(7,10): error TS2305: Module '"./cost-calculator/CostResults"' has no exported member 'default'.
src/features/dashboard/ActiveToolDisplay.tsx(396,15): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'onCompletion' does not exist in type 'Partial<unknown> & Attributes'.
src/features/dashboard/CircularCompetencyGauge.tsx(4,50): error TS2307: Cannot find module 'react-circular-progressbar' or its corresponding type declarations.
src/features/dashboard/components/index.ts(27,10): error TS2305: Module '"../DashboardLayout"' has no exported member 'default'.
src/features/dashboard/components/index.ts(30,10): error TS2305: Module '"../ExportCenter"' has no exported member 'default'.
src/features/dashboard/components/index.ts(50,10): error TS2305: Module '"../InsightsPanel"' has no exported member 'default'.
src/features/dashboard/components/index.ts(52,10): error TS2305: Module '"../MilestonesCard"' has no exported member 'default'.
src/features/dashboard/components/index.ts(56,10): error TS2305: Module '"../ProgressVisualization"' has no exported member 'default'.
src/features/dashboard/CustomerDashboard.tsx(5,35): error TS2307: Cannot find module './progressive-engagement/EnhancedTabNavigation' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(6,37): error TS2307: Cannot find module './../hooks/useWorkflowProgress' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(7,36): error TS2307: Cannot find module './../hooks/useCompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(8,28): error TS2307: Cannot find module './common/LoadingSpinner' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(9,25): error TS2307: Cannot find module './common/ContentDisplay' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(10,33): error TS2307: Cannot find module './competency/CompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(14,35): error TS2307: Cannot find module './competency/ProgressiveToolAccess' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(15,35): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(16,42): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(17,25): error TS2307: Cannot find module './progressive-engagement/WelcomeHero' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(18,44): error TS2307: Cannot find module './progressive-engagement/ProgressiveEngagementContainer' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(19,36): error TS2307: Cannot find module './auth/DashboardAccessControl' or its corresponding type declarations.
src/features/dashboard/CustomerDashboard.tsx(145,13): error TS7030: Not all code paths return a value.
src/features/dashboard/CustomerDashboard.tsx(550,47): error TS2345: Argument of type '(prev: "progressive" | "integrated") => "integrated" | "classic"' is not assignable to parameter of type 'SetStateAction<"progressive" | "integrated">'.
  Type '(prev: "progressive" | "integrated") => "integrated" | "classic"' is not assignable to type '(prevState: "progressive" | "integrated") => "progressive" | "integrated"'.
    Type '"integrated" | "classic"' is not assignable to type '"progressive" | "integrated"'.
      Type '"classic"' is not assignable to type '"progressive" | "integrated"'.
src/features/dashboard/CustomerDashboardEnhanced.tsx(12,35): error TS2307: Cannot find module './progressive-engagement/EnhancedTabNavigation' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(13,37): error TS2307: Cannot find module './../hooks/useWorkflowProgress' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(14,36): error TS2307: Cannot find module './../hooks/useCompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(15,28): error TS2307: Cannot find module './common/LoadingSpinner' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(16,25): error TS2307: Cannot find module './common/ContentDisplay' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(17,33): error TS2307: Cannot find module './competency/CompetencyDashboard' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(21,35): error TS2307: Cannot find module './competency/ProgressiveToolAccess' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(22,35): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(23,42): error TS2307: Cannot find module './notifications/ProgressNotifications' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(24,44): error TS2307: Cannot find module './progressive-engagement/ProgressiveEngagementContainer' or its corresponding type declarations.
src/features/dashboard/CustomerDashboardEnhanced.tsx(170,13): error TS7030: Not all code paths return a value.
src/features/dashboard/FilterDropdown.tsx(49,13): error TS7030: Not all code paths return a value.
src/features/dashboard/ProfessionalDashboard.tsx(14,36): error TS2307: Cannot find module './../contexts/AssessmentContext' or its corresponding type declarations.
src/features/dashboard/ProfessionalDashboard.tsx(15,36): error TS2307: Cannot find module './auth/DashboardAccessControl' or its corresponding type declarations.
src/features/dashboard/ProfessionalDashboard.tsx(202,9): error TS2322: Type '{ title: string; priority: string; }' is not assignable to type 'string'.
src/features/dashboard/ProfessionalDashboard.tsx(205,46): error TS2322: Type 'string' is not assignable to type 'boolean'.
src/features/dashboard/ProfessionalDashboard.tsx(507,16): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(508,15): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(516,16): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(517,15): error TS2532: Object is possibly 'undefined'.
src/features/dashboard/ProfessionalDashboard.tsx(547,11): error TS2322: Type 'Activity[]' is not assignable to type 'FilterResult[]'.
  Property 'id' is missing in type 'Activity' but required in type 'FilterResult'.
src/features/dashboard/ProfessionalDashboard.tsx(555,11): error TS2322: Type 'DevelopmentFocus' is not assignable to type 'DevelopmentData'.
  Types of property 'nextUnlock' are incompatible.
    Type 'NextUnlock | undefined' is not assignable to type 'NextUnlock | undefined'. Two different types with this name exist, but they are unrelated.
      Type 'NextUnlock' is missing the following properties from type 'NextUnlock': name, benefits, currentProgress, requiredProgress
src/features/dashboard/ProfessionalDashboard.tsx(556,11): error TS2322: Type 'CompetencyScores' is not assignable to type 'Record<string, number>'.
  Index signature for type 'string' is missing in type 'CompetencyScores'.
src/features/dashboard/ProfessionalDashboard.tsx(557,11): error TS2322: Type '(recommendation?: string | null) => void' is not assignable to type '(recommendation?: Recommendation | undefined) => void | Promise<void>'.
  Types of parameters 'recommendation' and 'recommendation' are incompatible.
    Type 'Recommendation | undefined' is not assignable to type 'string | null | undefined'.
      Type 'Recommendation' is not assignable to type 'string'.
src/features/dashboard/ProfessionalDashboard.tsx(564,11): error TS2719: Type 'CompetencyArea[]' is not assignable to type 'CompetencyArea[]'. Two different types with this name exist, but they are unrelated.
  Type 'CompetencyArea' is missing the following properties from type 'CompetencyArea': level, color, unlockBenefit
src/features/dashboard/ProfessionalDashboard.tsx(574,11): error TS2322: Type 'Action[]' is not assignable to type 'ActionItem[]'.
  Type 'Action' is missing the following properties from type 'ActionItem': category, estimatedTime, pointValue, progress
src/features/dashboard/ProfessionalDashboard.tsx(576,11): error TS2719: Type 'CompetencyScores' is not assignable to type 'CompetencyScores'. Two different types with this name exist, but they are unrelated.
  Index signature for type 'string' is missing in type 'CompetencyScores'.
src/features/dashboard/ProfessionalDashboard.tsx(581,11): error TS2719: Type 'Activity[]' is not assignable to type 'Activity[]'. Two different types with this name exist, but they are unrelated.
  Type 'Activity' is missing the following properties from type 'Activity': id, description
src/features/dashboard/ProfessionalDashboard.tsx(588,11): error TS2739: Type 'WeeklySummary' is missing the following properties from type 'WeeklyData': currentWeek, previousWeek, goals, achievements
src/features/dashboard/ProfessionalDashboard.tsx(596,11): error TS2719: Type 'AssessmentData | undefined' is not assignable to type 'AssessmentData | undefined'. Two different types with this name exist, but they are unrelated.
  Type 'AssessmentData' is missing the following properties from type 'AssessmentData': completed_date, duration_minutes, percentile, lead_priority
src/features/dashboard/RecentActivity.tsx(147,15): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
src/features/dashboard/RecentActivity.tsx(148,15): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(311,13): error TS2304: Cannot find name 'Users'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(380,27): error TS2345: Argument of type '{ id: string; type: string; title: string; description: string; }' is not assignable to parameter of type 'Achievement'.
  Type '{ id: string; type: string; title: string; description: string; }' is missing the following properties from type 'Achievement': points, achievedAt
src/features/dashboard/RevenueIntelligenceDashboard.tsx(652,22): error TS2304: Cannot find name 'ShadowCRMIntegration'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(671,22): error TS2304: Cannot find name 'ExperienceDrivenPriorities'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(690,22): error TS2304: Cannot find name 'DealMomentumAnalyzer'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(781,22): error TS2304: Cannot find name 'CompetitiveIntelligenceTracker'.
src/features/dashboard/RevenueIntelligenceDashboard.tsx(800,22): error TS2304: Cannot find name 'StakeholderRelationshipMap'.
src/features/dashboard/SimpleEnhancedDashboard.tsx(13,28): error TS2307: Cannot find module './common/LoadingSpinner' or its corresponding type declarations.
src/features/dashboard/SimpleEnhancedDashboard.tsx(14,25): error TS2307: Cannot find module './common/ContentDisplay' or its corresponding type declarations.
src/features/dashboard/SimpleEnhancedDashboard.tsx(174,13): error TS7030: Not all code paths return a value.
src/features/dashboard/StakeholderRelationshipMap.tsx(65,3): error TS7061: A mapped type may not declare properties or methods.
src/features/dashboard/SystematicScalingDashboard.tsx(336,19): error TS2322: Type '{ children: Element[]; key: string; className: string; onClick: () => Promise<void>; }' is not assignable to type 'IntrinsicAttributes & ModernCardProps'.
  Property 'onClick' does not exist on type 'IntrinsicAttributes & ModernCardProps'.
src/features/icp-analysis/components/index.ts(5,10): error TS2305: Module '"../ICPAnalysisForm"' has no exported member 'default'.
src/features/icp-analysis/components/index.ts(6,10): error TS2305: Module '"../EnhancedICPAnalysisForm"' has no exported member 'default'.
src/features/icp-analysis/components/index.ts(12,10): error TS2305: Module '"../ICPResults"' has no exported member 'default'.
src/features/icp-analysis/components/index.ts(13,10): error TS2305: Module '"../ICPHistory"' has no exported member 'default'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(435,5): error TS2304: Cannot find name 'setProductDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(435,27): error TS2304: Cannot find name 'sampleProduct'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(436,5): error TS2304: Cannot find name 'setIcpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(436,23): error TS2304: Cannot find name 'sampleICP'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(519,28): error TS2304: Cannot find name 'productDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(520,38): error TS2304: Cannot find name 'setProductDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(532,28): error TS2304: Cannot find name 'icpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(533,38): error TS2304: Cannot find name 'setIcpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(542,30): error TS2304: Cannot find name 'generateFramework'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(543,32): error TS2304: Cannot find name 'productDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(543,55): error TS2304: Cannot find name 'icpDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(545,23): error TS2304: Cannot find name 'productDescription'.
src/features/icp-analysis/ICPRatingFrameworkGenerator.tsx(545,45): error TS2304: Cannot find name 'icpDescription'.
src/features/icp-analysis/ICPResults.tsx(141,31): error TS7006: Parameter 'factor' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(141,39): error TS7006: Parameter 'index' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(169,34): error TS7006: Parameter 'insight' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(169,43): error TS7006: Parameter 'index' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(189,41): error TS7006: Parameter 'recommendation' implicitly has an 'any' type.
src/features/icp-analysis/ICPResults.tsx(189,57): error TS7006: Parameter 'index' implicitly has an 'any' type.
src/features/icp-analysis/IntegratedICPTool.tsx(112,58): error TS18046: 'error' is of type 'unknown'.
src/features/resources-library/ResourceLibrary.tsx(275,27): error TS2345: Argument of type '{ eventType: string; metadata: { resourceId: string; resourceCategory: "advanced" | "core" | "strategic"; quality: number | undefined; }; scalingContext: { currentARR: any; targetARR: any; growthStage: string; systematicApproach: boolean; }; businessImpact: string; professionalCredibility: number; }' is not assignable to parameter of type 'string'.
src/features/resources-library/ResourceLibrary.tsx(370,9): error TS2554: Expected 2 arguments, but got 3.
src/shared/components/layout/FlexLayout.tsx(35,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/FlexLayout.tsx(201,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/FlexLayout.tsx(201,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/FlexLayout.tsx(231,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/FlexLayout.tsx(296,11): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/FlexLayout.tsx(296,11): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/GridLayout.tsx(43,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/GridLayout.tsx(245,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/GridLayout.tsx(245,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/GridLayout.tsx(280,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/GridLayout.tsx(361,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/GridLayout.tsx(361,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/Header.tsx(18,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(6,32): error TS2307: Cannot find module '../admin/AdminModeIndicator' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(33,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(34,50): error TS2307: Cannot find module '../../../lib/services/airtableService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(90,13): error TS7030: Not all code paths return a value.
src/shared/components/layout/Layout.tsx(93,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Layout.tsx(107,37): error TS2307: Cannot find module '../common/LoadingSpinner' or its corresponding type declarations.
src/shared/components/layout/ModernSidebarLayout.tsx(80,50): error TS2307: Cannot find module '../../../lib/services/airtableService' or its corresponding type declarations.
src/shared/components/layout/ModernSidebarLayout.tsx(88,48): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/Navigation.tsx(34,46): error TS2307: Cannot find module '../../../lib/services/authService' or its corresponding type declarations.
src/shared/components/layout/PageLayout.tsx(402,7): error TS2322: Type '{ children: Element; variant: "centered"; showBreadcrumbs: false; showFooter: false; maxWidth: string; className: string; style: { backgroundImage: string; } | undefined; loading?: boolean | undefined; ... 17 more ...; stickyFooter?: boolean | undefined; }' is not assignable to type 'IntrinsicAttributes & PageLayoutProps'.
  Property 'style' does not exist on type 'IntrinsicAttributes & PageLayoutProps'.
src/shared/components/layout/ResponsiveContainer.tsx(35,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/ResponsiveContainer.tsx(156,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/ResponsiveContainer.tsx(156,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/SectionLayout.tsx(56,14): error TS2503: Cannot find namespace 'JSX'.
src/shared/components/layout/SectionLayout.tsx(231,6): error TS2604: JSX element type 'Component' does not have any construct or call signatures.
src/shared/components/layout/SectionLayout.tsx(231,6): error TS2786: 'Component' cannot be used as a JSX component.
  Its type 'string | number | symbol | (<Props, TagName extends keyof DOMMotionComponents | string = "div">(Component: string | TagName | ComponentType<Props>, { forwardMotionProps }?: MotionComponentOptions | undefined, preloadedFeatures?: FeaturePackages | undefined, createVisualElement?: CreateVisualElement<...> | undefined)...' is not a valid JSX element type.
    Type 'number' is not assignable to type 'ElementType'.
src/shared/components/layout/SectionLayout.tsx(263,41): error TS2322: Type '{ initial: { opacity: number; y: number; }; animate: { opacity: number; y: number; transition: { duration: number; ease: string; }; }; }' is not assignable to type 'Variants'.
  Property 'animate' is incompatible with index signature.
    Type '{ opacity: number; y: number; transition: { duration: number; ease: string; }; }' is not assignable to type 'Variant'.
      Type '{ opacity: number; y: number; transition: { duration: number; ease: string; }; }' is not assignable to type 'TargetAndTransition'.
        Type '{ opacity: number; y: number; transition: { duration: number; ease: string; }; }' is not assignable to type '{ transition?: Transition<any> | undefined; transitionEnd?: ResolvedValues | undefined; }'.
          Types of property 'transition' are incompatible.
            Type '{ duration: number; ease: string; }' is not assignable to type 'Transition<any> | undefined'.
              Type '{ duration: number; ease: string; }' is not assignable to type 'TransitionWithValueOverrides<any>'.
                Type '{ duration: number; ease: string; }' is not assignable to type 'ValueAnimationTransition<any>'.
                  Types of property 'ease' are incompatible.
                    Type 'string' is not assignable to type 'Easing | Easing[] | undefined'.
src/shared/components/ui/Accordion.tsx(88,14): error TS2323: Cannot redeclare exported variable 'AccordionItem'.
src/shared/components/ui/Accordion.tsx(123,23): error TS2345: Argument of type 'string | number | undefined' is not assignable to parameter of type 'string | number | (string | number)[]'.
  Type 'undefined' is not assignable to type 'string | number | (string | number)[]'.
src/shared/components/ui/Accordion.tsx(174,14): error TS2323: Cannot redeclare exported variable 'AccordionTrigger'.
src/shared/components/ui/Accordion.tsx(279,14): error TS2323: Cannot redeclare exported variable 'AccordionContent'.
src/shared/components/ui/Accordion.tsx(397,21): error TS2345: Argument of type 'string | number | (string | number)[] | undefined' is not assignable to parameter of type 'string | number | (string | number)[]'.
  Type 'undefined' is not assignable to type 'string | number | (string | number)[]'.
src/shared/components/ui/Accordion.tsx(588,10): error TS2323: Cannot redeclare exported variable 'AccordionItem'.
src/shared/components/ui/Accordion.tsx(588,10): error TS2484: Export declaration conflicts with exported declaration of 'AccordionItem'.
src/shared/components/ui/Accordion.tsx(588,25): error TS2323: Cannot redeclare exported variable 'AccordionTrigger'.
src/shared/components/ui/Accordion.tsx(588,25): error TS2484: Export declaration conflicts with exported declaration of 'AccordionTrigger'.
src/shared/components/ui/Accordion.tsx(588,43): error TS2323: Cannot redeclare exported variable 'AccordionContent'.
src/shared/components/ui/Accordion.tsx(588,43): error TS2484: Export declaration conflicts with exported declaration of 'AccordionContent'.
src/shared/components/ui/BreadcrumbNavigation.tsx(116,28): error TS2339: Property 'isCurrentPage' does not exist on type 'BreadcrumbItem | { label: string; href: undefined; icon: Element; }'.
  Property 'isCurrentPage' does not exist on type '{ label: string; href: undefined; icon: Element; }'.
src/shared/components/ui/BreadcrumbNavigation.tsx(122,38): error TS2339: Property 'isCurrentPage' does not exist on type 'BreadcrumbItem | { label: string; href: undefined; icon: Element; }'.
  Property 'isCurrentPage' does not exist on type '{ label: string; href: undefined; icon: Element; }'.
src/shared/components/ui/Button.tsx(162,8): error TS2322: Type '{ children: Element; form?: string | undefined; formAction?: string | ((formData: FormData) => void | Promise<void>) | undefined; formEncType?: string | undefined; ... 288 more ...; transition: { ...; }; }' is not assignable to type 'Omit<HTMLMotionProps<"button">, "ref">'.
  Types of property 'onDrag' are incompatible.
    Type 'DragEventHandler<HTMLButtonElement> | undefined' is not assignable to type '((event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => void) | undefined'.
      Type 'DragEventHandler<HTMLButtonElement>' is not assignable to type '(event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => void'.
        Types of parameters 'event' and 'event' are incompatible.
          Type 'MouseEvent | PointerEvent | TouchEvent' is not assignable to type 'DragEvent<HTMLButtonElement>'.
            Type 'MouseEvent' is missing the following properties from type 'DragEvent<HTMLButtonElement>': dataTransfer, nativeEvent, isDefaultPrevented, isPropagationStopped, persist
src/shared/components/ui/Button.tsx(275,13): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'size' does not exist in type 'Partial<unknown> & Attributes'.
src/shared/components/ui/Button.tsx(275,19): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/Button.tsx(276,22): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/Button.tsx(278,27): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/ColorPicker.tsx(5,45): error TS2305: Module '"lucide-react"' has no exported member 'Eyedropper'.
src/shared/components/ui/Divider.tsx(266,24): error TS2304: Cannot find name 'spacingClasses'.
src/shared/components/ui/DropdownComponents.tsx(234,27): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/DropdownComponents.tsx(371,43): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/DropdownComponents.tsx(372,25): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/DropdownComponents.tsx(372,118): error TS18046: 'child.props' is of type 'unknown'.
src/shared/components/ui/ErrorBoundary.tsx(3,39): error TS2440: Import declaration conflicts with local declaration of 'ErrorInfo'.
src/shared/components/ui/ErrorBoundary.tsx(74,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
src/shared/components/ui/ErrorBoundary.tsx(146,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
src/shared/components/ui/ErrorBoundary.tsx(152,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'Component<ErrorBoundaryProps, ErrorBoundaryState, any>'.
src/shared/components/ui/FileUploader.tsx(161,9): error TS2322: Type 'string | null' is not assignable to type 'string | undefined'.
  Type 'null' is not assignable to type 'string | undefined'.
src/shared/components/ui/FormComponents.tsx(59,11): error TS2430: Interface 'InputProps' incorrectly extends interface 'InputHTMLAttributes<HTMLInputElement>'.
  Types of property 'size' are incompatible.
    Type '"sm" | "md" | "lg" | undefined' is not assignable to type 'number | undefined'.
      Type 'string' is not assignable to type 'number'.
src/shared/components/ui/FormComponents.tsx(129,11): error TS2430: Interface 'SelectProps' incorrectly extends interface 'SelectHTMLAttributes<HTMLSelectElement>'.
  Types of property 'size' are incompatible.
    Type '"sm" | "md" | "lg" | undefined' is not assignable to type 'number | undefined'.
      Type 'string' is not assignable to type 'number'.
src/shared/components/ui/FormWizard.tsx(86,17): error TS7006: Parameter 'prev' implicitly has an 'any' type.
src/shared/components/ui/Icon.tsx(195,13): error TS2322: Type 'MotionValueHelper<Transform | undefined>' is not assignable to type '(Transform & (AnyMotionValue | Transform)) | undefined'.
  Type 'MotionValueNumber' is not assignable to type '(Transform & (AnyMotionValue | Transform)) | undefined'.
    Type 'MotionValue<number>' is not assignable to type '"none" & MotionValueAny'.
      Type 'MotionValue<number>' is not assignable to type '"none"'.
src/shared/components/ui/Icon.tsx(483,22): error TS2339: Property 'spin' does not exist on type '{ name: "User" | "X" | "Heading1" | "Heading2" | "Heading3" | "Heading4" | "Heading5" | "Heading6" | "Phone" | "Server" | "Slack" | "Figma" | "Infinity" | "Expand" | "Menu" | "Sun" | ... 5521 more ... | "icons"; variant: IconVariant; text: string; } | { ...; } | { ...; } | { ...; } | { ...; }'.
  Property 'spin' does not exist on type '{ name: "User" | "X" | "Heading1" | "Heading2" | "Heading3" | "Heading4" | "Heading5" | "Heading6" | "Phone" | "Server" | "Slack" | "Figma" | "Infinity" | "Expand" | "Menu" | "Sun" | ... 5521 more ... | "icons"; variant: IconVariant; text: string; }'.
src/shared/components/ui/Input.tsx(75,25): error TS2554: Expected 1 arguments, but got 0.
src/shared/components/ui/LazyIcons.tsx(112,20): error TS2769: No overload matches this call.
  Overload 1 of 2, '(props: {}): string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<...> | Component<...> | null | undefined', gave the following error.
    Type '{ className: string; }' is not assignable to type 'IntrinsicAttributes'.
      Property 'className' does not exist on type 'IntrinsicAttributes'.
  Overload 2 of 2, '(props: {}, context?: any): string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<...> | Component<...> | null | undefined', gave the following error.
    Type '{ className: string; }' is not assignable to type 'IntrinsicAttributes'.
      Property 'className' does not exist on type 'IntrinsicAttributes'.
src/shared/components/ui/ModalComponents.tsx(153,13): error TS7030: Not all code paths return a value.
src/shared/components/ui/ModalComponents.tsx(386,11): error TS2322: Type '{ children: string; variant: "primary" | "danger"; onClick: () => void; loading: boolean; }' is not assignable to type 'IntrinsicAttributes & PrimaryButtonProps'.
  Property 'variant' does not exist on type 'IntrinsicAttributes & PrimaryButtonProps'.
src/shared/components/ui/Radio.tsx(562,3): error TS2339: Property 'children' does not exist on type 'RadioCardProps'.
src/shared/components/ui/Slider.tsx(523,18): error TS2430: Interface 'RangeSliderProps' incorrectly extends interface 'Omit<SliderProps, "value" | "defaultValue">'.
  Types of property 'onChange' are incompatible.
    Type '((value: [number, number]) => void) | undefined' is not assignable to type '((value: number | number[]) => void) | undefined'.
      Type '(value: [number, number]) => void' is not assignable to type '(value: number | number[]) => void'.
        Types of parameters 'value' and 'value' are incompatible.
          Type 'number | number[]' is not assignable to type '[number, number]'.
            Type 'number' is not assignable to type '[number, number]'.
src/shared/components/ui/Tabs.tsx(170,13): error TS7030: Not all code paths return a value.
src/shared/components/ui/Tooltip.tsx(65,26): error TS2554: Expected 1 arguments, but got 0.
src/shared/components/ui/Tooltip.tsx(66,26): error TS2554: Expected 1 arguments, but got 0.
src/shared/components/ui/Tooltip.tsx(297,31): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/Tooltip.tsx(298,22): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/Tooltip.tsx(299,31): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/Tooltip.tsx(300,23): error TS2339: Property 'ref' does not exist on type 'ReactElement<unknown, string | JSXElementConstructor<any>>'.
src/shared/components/ui/ValidationSystem.tsx(471,5): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'onBlur' does not exist in type 'Partial<unknown> & Attributes'.
src/shared/contexts/SystematicScalingContext.tsx(454,26): error TS2339: Property 'founderId' does not exist on type 'SystematicScalingContextType'.

- Build Directory: No build output directory found
