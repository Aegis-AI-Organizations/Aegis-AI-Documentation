# Email Service & Routing Configuration

This document describes how to configure, update, and manage outgoing and incoming email services for Aegis AI.

---

## 1. Environment Variables (SMTP Outgoing)

The `brain` component handles outgoing e-mails (such as team invitations and notifications) using standard SMTP parameters. In production, these are loaded from the `aegis-env` Kubernetes secret.

| Variable Name              | Description                                        | Default / Example Value                          |
| :------------------------- | :------------------------------------------------- | :----------------------------------------------- |
| `ONBOARDING_EMAIL_ENABLED` | Enables or disables email-sending features.        | `true`                                           |
| `SMTP_HOST`                | Host address of the SMTP provider.                 | `smtp.resend.com`                                |
| `SMTP_PORT`                | Port number of the SMTP provider.                  | `587`                                            |
| `SMTP_USERNAME`            | Username for SMTP authentication.                  | `resend` (For Resend, always literally `resend`) |
| `SMTP_PASSWORD`            | Password or API token for SMTP auth.               | `re_123456789...` (Your Resend API Key)          |
| `SMTP_USE_TLS`             | Enables secure connection via STARTTLS.            | `true`                                           |
| `SMTP_FROM_EMAIL`          | Verified sender address (must match DNS SPF/DKIM). | `onboarding@aegis-ai.fr`                         |

### Modifying outgoing email settings (Under 5 minutes)

1. Update the `.env` file in the `Aegis-AI-Infra` repository with the new SMTP credentials.
2. Push the local variables into the Kubernetes secret:
   ```bash
   ./scripts/setup-env.sh mvp
   ```
3. Restart/rolling-update the `brain` deployment:
   ```bash
   kubectl rollout restart deployment brain-mvp
   ```

---

## 2. Cloudflare Email Routing (Incoming)

All incoming emails sent to `@aegis-ai.fr` are intercepted by Cloudflare and redirected to personal inbox addresses without running an email server.

### Modifying destination addresses or aliases

To modify redirect targets (e.g., forwarding `team@aegis-ai.fr` to a different administrator):

1. **Log in** to the Cloudflare Dashboard and select the **`aegis-ai.fr`** zone.
2. Go to **Email** > **Email Routing** in the left sidebar.
3. **Add a new destination address** under the **Destination addresses** tab if it is not verified yet. Confirm it by clicking the verification link sent by Cloudflare.
4. Go back to the **Routes** tab, click **Edit** next to the `team` custom address, and update the **Destination address** selector to your new verified target.
5. Click **Save**.

---

## 3. Service Quotas & Limitations

### Resend (Free Tier)

- **Monthly Limit**: 3,000 emails per month.
- **Daily Limit**: 100 emails per day.
- **Domain Verification**: Required (via CNAME records for DKIM, and MX/TXT for `bounces` sub-domain Return-Path).

### Cloudflare Email Routing (Free Tier)

- **Limits**: Unlimited custom routing addresses and redirected messages.
- **Data storage**: None (emails are directly routed/forwarded and not stored on Cloudflare).

---

## 4. Swapping Email Providers (e.g., Resend to Brevo / SendGrid)

To change the outgoing email provider, modify the DNS zone in Cloudflare and update the environment variables:

1. **Generate SPF and DKIM** records from the new provider's dashboard.
2. **Add the records** to Cloudflare DNS (deleting the old Resend CNAMEs and SPF records).
3. **Update SMTP credentials** in your `.env` variables (e.g., change `SMTP_HOST` to `smtp-relay.brevo.com` or `smtp.sendgrid.net`).
4. **Push the secret** and restart the brain:
   ```bash
   ./scripts/setup-env.sh mvp
   kubectl rollout restart deployment brain-mvp
   ```
