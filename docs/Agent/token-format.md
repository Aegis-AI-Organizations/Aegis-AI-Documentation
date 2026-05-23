# Agent Token Format

The deployment token is the one-time credential used to register a new Aegis Agent.

## Format

```text
ag_<43+ URL-safe chars>
```

Rules:

- the token always starts with `ag_`;
- the body contains at least 43 characters;
- allowed characters are `A-Z`, `a-z`, `0-9`, `_`, and `-`;
- the clear token is displayed only once in the Dashboard;
- only the SHA-256 hash is stored by the backend.

Example:

```text
ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

## Usage

The deployment token is used only for first registration:

```http
Authorization: Bearer ag_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefg
```

After registration, the agent receives an `agent_secret`. This secret is used for operational routes such as heartbeat updates and upload URL retrieval.

## Rotation and Revocation

Token rotation invalidates the previous deployment token and displays the new token once.

Token revocation removes the active deployment token. No new agent can register until a new token is generated.
