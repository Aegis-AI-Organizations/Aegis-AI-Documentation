# Authentication

The API Gateway uses short-lived JWT access tokens for browser/API requests and an HTTP-only refresh cookie for session renewal. Agent traffic uses a separate deployment-token and agent-secret flow documented in the Agent section.

## User Session Flow

1. `POST /api/auth/login` validates credentials through the Brain auth service.
2. The Gateway returns `access_token` in the JSON response.
3. The Gateway sets `refresh_token` as an HTTP-only cookie.
4. The Dashboard sends `Authorization: Bearer <access_token>` on protected requests.
5. `POST /api/auth/refresh` rotates the access token using the cookie.
6. `POST /api/auth/logout` clears the refresh cookie and invalidates the server-side refresh token.

## First Login Activation

Invited owners and users activate their account with:

```http
POST /api/auth/setup-password
```

The request contains the invitation token and the new password. For company owners, the response also includes `agent_token`, the one-time deployment token used to connect the first Aegis Agent. Invited collaborators do not receive an agent token.

## Collaborator Invitations

Collaborators are not created with a temporary password. Admins and organization owners invite them with:

```http
POST /api/admin/users
```

The Brain creates the user in `pending_activation`, stores only a hashed one-time invitation token, and sends the activation email. The collaborator then uses `/api/auth/setup-password` to define their own password.

## Roles

Current roles are:

| Role             | Typical scope                   |
| ---------------- | ------------------------------- |
| `superadmin`     | Platform-wide administration    |
| `admin`          | Aegis-side administration       |
| `billing_aegis`  | Platform billing operations     |
| `technicien`     | Technical support operations    |
| `support`        | Support and customer assistance |
| `owner`          | Customer organization owner     |
| `billing_client` | Customer billing access         |
| `operateur`      | Customer technical operator     |
| `viewer`         | Read-only customer access       |

## Security Rules

- Keep access tokens in memory in the frontend.
- Do not expose refresh tokens to JavaScript.
- Treat deployment tokens and agent secrets as machine credentials, not user credentials.
- Rotate or revoke the company deployment token if it is copied to an unsafe location.
