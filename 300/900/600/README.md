# 600 - Setting Up EMQX Broker

## 100 - Logging into EMQX Broker

We use EMQX Broker as our MQTT Broker.

To login, browse for https://cloud-intl.emqx.com/console/ (Sign in with GitHub account for wvanheemstra@icloud.com)

![Image](https://github.com/user-attachments/assets/9e132501-a827-4ff3-9eee-cb7cbdbae66f)

## 200 - Connecting to EMQX Broker from a Client

The process of connecting to our EMQX Broker from a Client (e.g. NodeJS, Python, etc) consists of these steps for our particular deployment (here: q3297d6a):

### Step 1: Get Connection Address

Here: q3297d6a.ala.eu-central-1.emqxsl.com

![Image](https://github.com/user-attachments/assets/4e9a479a-ceb1-49c7-8c71-f012edbb2e53)

### Step 2: Get Connection Port

Here: 

- MQTT over TLS/SSL Port: 8883
- WebSocket over TLS/SSL Port: 8084

![Image](https://github.com/user-attachments/assets/84cec9ec-3ac4-4cab-ab7f-517c9cd17642)

### Step 3: Add Authentication

Here:

Username: tlkaaxtf:tlkaaxtf 

![Image](https://github.com/user-attachments/assets/c6364821-54aa-4d41-b390-6f274810787b)

See https://docs.emqx.com/en/cloud/latest/deployments/authz_overview.html

### Step 4: Connection Demo & SDK

![Image](https://github.com/user-attachments/assets/1ed491e7-44c7-4e01-a7d6-5d019c409ed4)

- SDK:

  [Java SDK Demo](https://docs.emqx.com/en/cloud/latest/connect_to_deployments/java_sdk.html)

  [Python SDK Demo](https://docs.emqx.com/en/cloud/latest/connect_to_deployments/python_sdk.html)

  [More](https://docs.emqx.com/en/cloud/latest/connect_to_deployments/overview.html)

- Tools:

  [MQTTX](https://docs.emqx.com/en/cloud/latest/connect_to_deployments/mqttx.html)

  [MQTT.fx](https://docs.emqx.com/en/cloud/latest/connect_to_deployments/mqttfx.html)

  [More](https://docs.emqx.com/en/cloud/latest/connect_to_deployments/overview.html)

- WebSocket:

  [Online Test](https://cloud-intl.emqx.com/console/deployments/q3297d6a/online_test)

  [WebSocket Instruction](https://www.emqx.com/en/blog/connect-to-mqtt-broker-with-websocket)

- Advanced Features

  [Connectors Settings](https://docs.emqx.com/en/cloud/latest/data_integration/connectors.html)

  [Data Integration](https://docs.emqx.com/en/cloud/latest/data_integration/introduction.html)

## 300 - Triggering a Pipedream Workflow from EMQX Broker

See also [Data Integration Overview](https://docs.emqx.com/en/cloud/latest/data_integration/introduction.html).

MORE