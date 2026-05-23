# Landing Page Architecture

The landing page is the public marketing and trust entry point for Aegis. It is separate from the authenticated Dashboard and should not depend on private platform runtime services.

## Responsibilities

- Present the product and security posture.
- Link users to documentation and contact flows.
- Keep public traffic isolated from the private application surface.
- Avoid handling authenticated platform state.

## Security Boundary

The landing page must not share Dashboard cookies, JWTs, deployment tokens, or internal API credentials. Any user transition into the product should happen through the Dashboard login or onboarding flow.

## Content Ownership

Marketing copy can describe product value, but technical installation, API, and architecture details should live in Docusaurus so they stay versioned with the platform.
