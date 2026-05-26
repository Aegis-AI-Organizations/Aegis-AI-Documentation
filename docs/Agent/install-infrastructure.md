# Install and Launch the Aegis Agent on Infrastructure

This guide explains how to connect a real infrastructure host to Aegis with the Rust agent.

## 1. Create or Retrieve the Deployment Token

From the Dashboard:

1. Open **Settings**.
2. Go to **Agent token**.
3. Rotate the token if no valid token is available.
4. Copy the token immediately. It is displayed only once.

The token must match:

```text
ag_<43+ URL-safe chars>
```

## 2. Choose the Installation Mode

Choose the best deployment method for your infrastructure:

### Docker

```bash
docker volume create aegis-agent-state

docker run -d \
  --name aegis-agent \
  --restart unless-stopped \
  --read-only \
  --cap-drop=ALL \
  -e GATEWAY_URL="https://api.aegis-ai.fr" \
  -e DEPLOYMENT_TOKEN="<YOUR_DEPLOYMENT_TOKEN>" \
  -e AGENT_NAME="$(hostname)-aegis-agent" \
  -v aegis-agent-state:/var/lib/aegis-agent \
  ghcr.io/aegis-ai/aegis-agent:latest
```

### Linux systemd

#### Method A: One-Click Dynamic Script Installer (Recommended)
You can run a single command to automatically download the compiled static MUSL binary from the release bucket, install it as a Systemd service, and pre-populate your credentials:

```bash
curl -sL "https://api.aegis-ai.fr/install.sh?token=<YOUR_DEPLOYMENT_TOKEN>" | sudo bash
```

#### Method B: Manual Build & Install
Build the `aegis-ai-agent` binary and run the local installation script manually:

```bash
cargo build --release
cp target/release/aegis-ai-agent .
sudo ./install.sh
```

Edit the environment file created by the installer:

```bash
sudo install -m 600 -o root -g root /dev/null /etc/aegis-agent/agent.env
sudo tee /etc/aegis-agent/agent.env >/dev/null <<'EOF'
GATEWAY_URL=https://api.aegis-ai.fr
DEPLOYMENT_TOKEN=<YOUR_DEPLOYMENT_TOKEN>
AGENT_NAME=my-production-host
HEALTH_BIND_ADDR=127.0.0.1
HEALTH_PORT=8081
EOF
```

Start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now aegis-agent.service
sudo systemctl status aegis-agent.service
```

### Kubernetes (Helm Chart DaemonSet)

Deploy the agent as a DaemonSet across all worker nodes in your cluster using the Helm chart (located in the agent repository):

```bash
helm install aegis-agent ./chart --set token=<YOUR_DEPLOYMENT_TOKEN>
```
*Note: The `--set token=XYZ` parameter is strictly required; the installation will fail if the deployment token is omitted.*

## 3. Network Requirements

The agent needs outbound connectivity to the Gateway:

| Destination                                   | Protocol  | Purpose                                        |
| --------------------------------------------- | --------- | ---------------------------------------------- |
| `https://api.aegis-ai.fr`                     | HTTPS     | Registration, heartbeats, upload URL retrieval |
| Presigned storage URL returned by the Gateway | HTTPS PUT | Topology and telemetry upload                  |

The local health server binds to `127.0.0.1:8081` by default. Expose it remotely only behind your own network controls.

## 4. Runtime Configuration

| Variable                     | Required          | Description                                                  |
| ---------------------------- | ----------------- | ------------------------------------------------------------ |
| `GATEWAY_URL`                | No                | Gateway URL. Defaults to `https://api.aegis-ai.fr`.          |
| `DEPLOYMENT_TOKEN`           | Yes for first run | One-time token used to register the agent.                   |
| `AGENT_NAME`                 | No                | Friendly name shown in Aegis. Defaults to `rust-agent-01`.   |
| `AGENT_ALLOW_HTTP`           | Local only        | Set to `true` only for local HTTP development.               |
| `AGENT_SECRET_FILE_OVERRIDE` | No                | Custom path for the persisted `agent_id` and `agent_secret`. |
| `HEALTH_BIND_ADDR`           | No                | Health endpoint bind address. Defaults to localhost.         |
| `HEALTH_PORT`                | No                | Health endpoint port. Defaults to `8081`.                    |

## 5. Registration Flow

On first boot, the agent calls:

```http
POST /api/agents/register
Authorization: Bearer <DEPLOYMENT_TOKEN>
Content-Type: application/json

{
  "token": "<DEPLOYMENT_TOKEN>",
  "name": "my-production-host"
}
```

The Gateway returns `agent_id` and `agent_secret`. The agent stores them locally and uses the secret for:

- `POST /api/agents/{agent_id}/status`
- `GET /api/agents/{agent_id}/upload-url?filename=<name>`

## 6. Dashboard Verification

Open the Dashboard. When no agent exists, the agent status panel displays a documentation button that points to this guide. After the agent starts:

1. `Agents deployed` should be at least `1`.
2. `Active` should be at least `1`.
3. `Last seen` should update after each heartbeat.

If the status does not change, check the service logs:

```bash
docker logs aegis-agent
# or
sudo journalctl -u aegis-agent.service -f
```
