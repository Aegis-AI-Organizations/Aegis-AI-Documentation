# Fixer Worker Telemetry

## Recommended Signals

- remediation job id;
- vulnerability id;
- remediation rule name;
- generated patch count;
- validation result;
- external provider error class when a Git provider is used.

## Audit Requirements

Every accepted remediation must be traceable from user action to generated change and final status.
