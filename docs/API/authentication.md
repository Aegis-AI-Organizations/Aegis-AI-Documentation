# Authentication

Aegis AI implements a **Zero-Trust Security Model** based on JSON Web Tokens (JWT). All requests to the API Gateway (with the exception of Login) must include a valid identity token.

## Internal JWT Architecture

Unlike legacy versions that relied on external providers like Keycloak, Aegis AI now uses a decoupled **Internal Authentication Service**.

1.  **Identity Provider**: Users authenticate against the `/auth/login` endpoint.
2.  **JWT Issuance**: The Brain service verifies credentials and issues a signed JWT containing the `user_id`, `company_id`, and `role`.
3.  **Stateless Session**: The platform does not store session state. Every request is verified cryptographically using a shared `JWT_SECRET`.

## Zero-Trust Propagation

To ensure maximum security and service isolation, identity is propagated using a **forward-and-verify** pattern:

-   **API Gateway**: Validates the incoming token from the user. If valid, it extracts the claims and forwards the **raw token** to downstream microservices (like the Brain) via gRPC metadata.
-   **Microservices (Brain)**: Independently re-verify the token signature. This ensures that even if the internal network is compromised, a service will never execute an unauthenticated command.

## Usage

Include the token in the `Authorization` header of every request:

```bash
Authorization: Bearer <your_access_token>
```

### Token Claims
Your tokens include the following standard claims:
- `sub`: Your unique User ID.
- `company_id`: Your organization's unique ID (used for tenant isolation).
- `role`: Your access level (e.g., `admin`, `user`).
