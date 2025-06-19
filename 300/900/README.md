## 900 - Messaging Management

I'll help you integrate Home Assistant with LavinMQ on CloudAMQP. This setup allows Home Assistant to publish and subscribe to MQTT messages through LavinMQ's MQTT broker service.

See also [Infrastructure](../../INFRASTRUCTURE.md).

## 100 - Architecture Overview

See [README.md](./100/README.md)

## 200 - Prerequisites

See [README.md](./200/README.md)

## 300 - Configure Pepper C1 MUX Reader

See [README.md](./300/README.md)

## 400 - Setting Up MongoDB on Sliplane

See [README.md](./500/README.md)

## 500 - Setting Up Workflows on Pipedream

See [README.md](./500/README.md)

## 600 - Setting Up EMQX Broker

See [README.md](./600/README.md)

== WE ARE HERE ==

## 700 - Configuring Home Assistant

See [README.md](./400/README.md)

=== MOVE THE BELOW TO THE SPECIFIC README.md FILE ====

### Method 1: Using the UI (Recommended)

1. Go to **Settings** → **Devices & Services** 
2. Click **Add Integration** 
3. Search for and select **MQTT** 
4. Choose **Manual configuration** 
5. Enter your LavinMQ details:
   - **Broker**: Your LavinMQ host (without protocol) (here: collie.lmq.cloudamqp.com)
   - **Port**: 1883 or 8883 (here: 1883)
   - **Username**: Your LavinMQ username (here: tlkaaxtf:tlkaaxtf)
   - **Password**: Your LavinMQ password (see https://api.cloudamqp.com/console/36c83daa-48f9-4a5a-9b3a-edf871ac74bb/details)
   - **Client ID**: Leave default or set custom
   - **Keep alive**: 60 (default)

### Method 2: Configuration.yaml

Add this to your `configuration.yaml`:

```yaml
mqtt:
  broker: your-lavinmq-host.cloudamqp.com
  port: 1883
  username: your-username
  password: your-password
  client_id: home_assistant
  keepalive: 60
  protocol: 3.1.1
```

For SSL/TLS connection:
```yaml
mqtt:
  broker: your-lavinmq-host.cloudamqp.com
  port: 8883
  username: your-username
  password: your-password
  client_id: home_assistant
  certificate: auto  # or path to certificate file ```

## Testing the Connection

After configuration, test the connection:

1. Go to **Developer Tools** → **Services** 
2. Search for `mqtt.publish` 
3. Use this service data:
```yaml
topic: homeassistant/test
payload: "Hello from Home Assistant!"
```

Check your LavinMQ management interface to see if the message appears.

## Basic MQTT Device Configuration

Here's an example of configuring an MQTT sensor:

```yaml
mqtt:
  sensor:
    - name: "Temperature Sensor"
      state_topic: "sensors/temperature"
      unit_of_measurement: "°C"
      device_class: temperature
```

## Troubleshooting

**Connection Issues:**
- Verify your LavinMQ credentials in CloudAMQP dashboard
- Check if your Home Assistant instance can reach the LavinMQ host
- Ensure the correct port is used (1883 for non-SSL, 8883 for SSL)

**Authentication Errors:**
- Double-check username and password
- Verify the virtual host setting if using a custom vhost

**SSL/TLS Issues:**
- Use `certificate: auto` for automatic certificate verification
- For self-signed certificates, you may need to disable certificate verification (not recommended for production)

## Advanced Configuration

For more complex setups, you can configure:

**Birth and Last Will messages:**
```yaml
mqtt:
  broker: your-lavinmq-host.cloudamqp.com
  # ... other settings
  birth_message:
    topic: homeassistant/status
    payload: online
  will_message:
    topic: homeassistant/status
    payload: offline
```

**Custom discovery prefix:**
```yaml
mqtt:
  # ... other settings
  discovery: true
  discovery_prefix: homeassistant
```

This setup will enable Home Assistant to communicate with your devices and services through LavinMQ's reliable MQTT broker on CloudAMQP. The integration supports automatic device discovery, real-time messaging, and all standard MQTT features.



MORE
