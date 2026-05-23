# LLM Payload Assistance

Aegis can use LLM-assisted logic to help generate candidate payloads and remediation explanations. This capability must stay bounded by safety controls and should not replace deterministic validation.

## Intended Use

- Suggest candidate payloads for supported vulnerability classes.
- Adapt test inputs to observed service behavior.
- Summarize technical evidence for reports.
- Help produce remediation guidance after a finding is confirmed.

## Safety Boundaries

- Do not send secrets, customer credentials, tokens, or raw private data to external model providers.
- Execute offensive payloads only inside controlled scan/sandbox workflows.
- Store evidence from the worker, not from model claims.
- Require deterministic validation before marking a vulnerability as confirmed.

## Worker Interaction

The Pentest Worker should treat model output as input candidates. The worker remains responsible for:

- request execution;
- response capture;
- proof extraction;
- severity classification;
- evidence upload;
- final status reporting.

## Prompt Data

Allowed prompt context should be limited to technical metadata such as service type, version, error class, HTTP status patterns, and sanitized response snippets.
