# Fixer Worker API

The Fixer Worker does not expose a public REST API. It is a backend worker driven
by Brain or workflow orchestration; customer-facing approvals, audit history, and
permissions are handled through Brain and the Dashboard.

## Internal Operations

| Operation           | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| Propose remediation | Turn a confirmed finding + context into a patch proposal |
| Get status          | Return the current state of a remediation task           |
| Discard proposal    | Drop a generated proposal that was not accepted          |

## Required Inputs

- tenant / workflow identifier;
- confirmed vulnerability and its evidence;
- remediation context (affected asset, service type, version, code or config location);
- constraints (`allow_patch_apply`, `allow_pr_create` — both default off).

## Outputs

- proposal id;
- patch text or diff, plus a human-readable rationale;
- target reference (file, manifest, or configuration key);
- status: `pending`, `ready`, `failed`;
- error details when generation fails.

## Safety Rules

- Prefer pull-request-style remediation over direct mutation.
- Never apply patches or push Git changes unless the workflow explicitly allows it.
- Record actor, tenant, finding, and generated change for every proposal.
- Keep secrets out of patches and logs.
- Validate generated changes before presenting them to users.
