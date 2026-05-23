# Service-to-Service Security

Gateway-to-Brain communication is designed to run over authenticated internal channels. TLS certificates and Kubernetes secrets must be handled as deployment prerequisites.

## Certificate Inputs

Gateway supports:

- `BRAIN_TLS_CA_CERT`;
- `BRAIN_TLS_CLIENT_CERT`;
- `BRAIN_TLS_CLIENT_KEY`.

Defaults point to mounted certificate files under `/etc/brain/certs`.

## Validation Checklist

- CA certificate is mounted in the Gateway pod.
- Client certificate and key match.
- Brain presents a certificate trusted by the Gateway.
- Service DNS name matches the configured server name.
- Expiring certificates are rotated before outage.

## Troubleshooting

For connection failures, check certificate mounts, pod clocks, service DNS, and Brain pod logs before changing application code.
