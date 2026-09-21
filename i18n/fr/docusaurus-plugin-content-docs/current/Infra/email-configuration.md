# Configuration du Service de Messagerie & Routage

Ce document décrit comment configurer, mettre à jour et gérer les services de messagerie sortants (transactionnels) et entrants (redirections) pour Aegis AI.

---

## 1. Variables d'Environnement (SMTP Sortant)

Le composant `brain` gère l'envoi d'e-mails (tels que les invitations d'équipe et les notifications) en utilisant les paramètres SMTP standards. En production, ces variables sont chargées depuis le secret Kubernetes `aegis-env`.

| Nom de la Variable         | Description                                                    | Valeur par défaut / Exemple                             |
| :------------------------- | :------------------------------------------------------------- | :------------------------------------------------------ |
| `ONBOARDING_EMAIL_ENABLED` | Active ou désactive les fonctionnalités d'envoi d'e-mails.     | `true`                                                  |
| `SMTP_HOST`                | Adresse de l'hôte du fournisseur SMTP.                         | `smtp.resend.com`                                       |
| `SMTP_PORT`                | Port du fournisseur SMTP.                                      | `587`                                                   |
| `SMTP_USERNAME`            | Nom d'utilisateur pour l'authentification SMTP.                | `resend` (Pour Resend, toujours textuellement `resend`) |
| `SMTP_PASSWORD`            | Mot de passe ou clé API pour l'authentification.               | `re_123456789...` (Votre clé API Resend)                |
| `SMTP_USE_TLS`             | Active la connexion sécurisée via STARTTLS.                    | `true`                                                  |
| `SMTP_FROM_EMAIL`          | Adresse d'expédition validée (doit correspondre aux SPF/DKIM). | `onboarding@aegis-ai.fr`                                |

### Procédure de modification des paramètres SMTP (Moins de 5 minutes)

1. Modifiez le fichier `.env` dans le dépôt `Aegis-AI-Infra` avec les nouvelles coordonnées SMTP.
2. Injectez les variables locales dans le secret Kubernetes du cluster :
   ```bash
   ./scripts/setup-env.sh mvp
   ```
3. Effectuez un redémarrage progressif du composant `brain` :
   ```bash
   kubectl rollout restart deployment brain-mvp
   ```

---

## 2. Routage d'E-mails Cloudflare (Entrant)

Tous les e-mails entrants envoyés à `@aegis-ai.fr` sont interceptés par Cloudflare et redirigés vers des adresses personnelles sans héberger de serveur de messagerie.

### Modifier les adresses de redirection ou les alias

Pour modifier les cibles de redirection (par exemple, rediriger `team@aegis-ai.fr` vers un autre administrateur) :

1. **Connectez-vous** au tableau de bord Cloudflare et sélectionnez la zone **`aegis-ai.fr`**.
2. Cliquez sur **Email** > **Email Routing** dans le menu de gauche.
3. **Ajoutez la nouvelle adresse de destination** dans l'onglet **Destination addresses** si elle n'est pas encore validée. Validez-la en cliquant sur le lien reçu dans l'e-mail de confirmation.
4. Revenez sur l'onglet **Routes**, cliquez sur **Modifier** en face de l'adresse personnalisée `team` et mettez à jour l'adresse de destination avec la nouvelle adresse validée.
5. Cliquez sur **Enregistrer**.

---

## 3. Quotas & Limites des Forfaits Gratuits

### Resend (Forfait Gratuit)

- **Limite mensuelle** : 3 000 e-mails par mois.
- **Limite journalière** : 100 e-mails par jour.
- **Validation de domaine** : Obligatoire (via les enregistrements CNAME pour DKIM et MX/TXT pour le sous-domaine de rebond `bounces`).

### Routage d'E-mails Cloudflare (Gratuit)

- **Limites** : Nombre d'adresses de redirection et de messages redirigés illimités.
- **Stockage des données** : Aucun stockage (les e-mails sont transférés en direct et ne sont pas conservés sur Cloudflare).

---

## 4. Changer de Fournisseur de Messagerie (ex: Resend vers Brevo / SendGrid)

Pour changer de fournisseur SMTP sortant, modifiez la zone DNS dans Cloudflare et mettez à jour les variables :

1. **Générez les enregistrements SPF et DKIM** depuis le tableau de bord de votre nouveau fournisseur.
2. **Ajoutez les enregistrements** dans le DNS Cloudflare (en supprimant les anciennes lignes Resend).
3. **Mettez à jour les identifiants SMTP** dans vos variables d'environnement `.env` (ex: modifiez `SMTP_HOST` par `smtp-relay.brevo.com` ou `smtp.sendgrid.net`).
4. **Mettez à jour le secret** et redémarrez le brain :
   ```bash
   ./scripts/setup-env.sh mvp
   kubectl rollout restart deployment brain-mvp
   ```
