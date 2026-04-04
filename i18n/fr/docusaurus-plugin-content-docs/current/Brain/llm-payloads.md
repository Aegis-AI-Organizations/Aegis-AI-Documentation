# LLM-Driven Payload Generation

Aegis AI leverages Large Language Models (LLMs) to transform traditional, static vulnerability scanning into **Adaptive Offensive Operations**. Instead of relying solely on hardcoded lists of payloads, the platform generates context-aware exploit strings tailored to the targets it discovers.

## Core Strategy

The **Worker-Pentest** uses LLMs to bridge the gap between "Finding a Weakness" and "Verifying an Exploit".

### 1. Target Context Analysis

Before launching an attack, the worker collects metadata about the environment:

- **Service Versioning**: (e.g., Apache 2.4.49, Nginx 1.18.0)
- **Error Signatures**: Raw responses from previous probes.
- **WAF Indicators**: Detection of specific security headers or filtering behavior.

### 2. Prompt Engineering for Payloads

The platform uses a sophisticated prompt template to request payloads from an LLM (e.g., OpenAI GPT-4o or Anthropic Claude 3.5).

> **Example Prompt Pattern**:
> _"You are an offensive security expert. A target is running Alpine Linux with a vulnerable search endpoint that reflects user input. Generate 5 SQL injection payloads designed to bypass basic regex filters while extracting the database version."_

### 3. Iterative Refinement

If a payload is blocked or fails to trigger the expected behavior, the worker logs the failure and can re-prompt the LLM with the new evidence (e.g., "The previous payload triggered a 403 Forbidden. Suggest an alternative using double-URL encoding.").

## Supported Vulnerability Classes

Currently, LLM-driven generation is applied to:

- **XSS (Cross-Site Scripting)**: Circumventing complex sanitizers and DOM protections.
- **SQLi (SQL Injection)**: Crafting bypasses for specific database dialects (PostgreSQL, MySQL, SQLite).
- **RCE (Remote Code Execution)**: Generating reverse shell one-liners tailored to the target's available binaries (nc, python, bash, perl).

## Safety & Ethics

- **Strict Sandboxing**: All LLM-generated payloads are detonated only within isolated, ephemeral Kubernetes sandboxes.
- **Zero-Confidentiality**: No sensitive company data is sent to external LLMs; only target metadata and technical service identities are included in prompts.
- **Human-in-the-Loop**: High-confidence vulnerabilities are flagged for human validation before being finalized in the scan report.
