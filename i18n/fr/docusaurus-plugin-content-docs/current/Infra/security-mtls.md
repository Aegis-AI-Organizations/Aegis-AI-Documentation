# Sécurité service-à-service

La communication Gateway vers Brain est prévue sur des canaux internes authentifiés. Les certificats TLS et secrets Kubernetes sont des prérequis de déploiement.

## Entrées certificat

- `BRAIN_TLS_CA_CERT`;
- `BRAIN_TLS_CLIENT_CERT`;
- `BRAIN_TLS_CLIENT_KEY`.

Les valeurs par défaut pointent vers `/etc/brain/certs`.

## Checklist

- CA montée dans le pod Gateway.
- Certificat client et clé cohérents.
- Certificat Brain approuvé par la Gateway.
- DNS service compatible avec le nom serveur configuré.
- Rotation avant expiration.
