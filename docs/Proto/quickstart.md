# Proto Quickstart

## Generate Stubs

From the proto repository:

```bash
buf generate
```

Generated files are consumed by:

- `Aegis-AI-Api-Gateway` for Go gRPC clients;
- `Aegis-AI-Brain` for Python gRPC services.

## Change Workflow

1. Update the `.proto` definition.
2. Regenerate stubs.
3. Update Gateway handlers and Brain services together.
4. Update `openapi.yaml` when the contract is exposed through REST.
5. Add or update tests in both consumers.

## Review Checklist

- Field numbers are stable.
- New fields are optional or have safe defaults.
- Error semantics are documented.
- Tenant and auth metadata requirements are clear.
