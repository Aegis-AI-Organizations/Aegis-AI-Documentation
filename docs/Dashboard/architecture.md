# Dashboard Architecture

## Real-time Updates

The dashboard integrates real-time scan status updates using **Server-Sent Events (SSE)**.
A custom hook `useScanStream` is used to establish a persistent connection to the API Gateway.
Whenever a status update is received, it automatically triggers a refresh of the scan data.

## Communication

- **API Gateway**: REST for actions, SSE for updates.
- **Brain**: gRPC streaming with the Gateway.
