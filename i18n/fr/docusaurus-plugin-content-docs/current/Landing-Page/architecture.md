# Architecture Landing Page

La landing page est le point d'entrée public marketing et confiance d'Aegis. Elle est séparée du Dashboard authentifié et ne doit pas dépendre des services privés de la plateforme.

## Responsabilités

- Présenter le produit et la posture sécurité.
- Rediriger vers la documentation et les contacts.
- Isoler le trafic public de la surface applicative privée.
- Ne pas manipuler d'état authentifié.

## Frontière sécurité

La landing page ne doit partager ni cookies Dashboard, ni JWT, ni tokens de déploiement, ni identifiants API internes.
