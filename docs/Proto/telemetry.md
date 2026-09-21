# Proto Telemetry

The proto repository does not emit runtime telemetry. Its operational value is contract traceability.

## What to Track

- Generated stub version in Gateway and Brain commits.
- Breaking-change reviews before merge.
- CI generation failures.
- Consumer test failures after contract changes.

## Documentation Link

Any REST-exposed proto change must be reflected in `openapi.yaml` and in the relevant module documentation.
