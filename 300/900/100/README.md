## 100 - Architecture Overview

The data flow will be:
**Pepper C1 MUX Reader** → **LavinMQ (CloudAMQP)** → **Home Assistant**

## Step 1: Configure Pepper C1 MUX Reader

### Access Pepper C1 Web Interface
1. Find the Pepper C1's IP address on your network (check your router's DHCP client list) 
2. Open a web browser and navigate to `http://[pepper-c1-ip-address]` 
3. Log in with your credentials (default is usually admin/admin)

### Configure MQTT Settings
In the Pepper C1 web interface:

1. Go to **Network** → **MQTT Settings** 
2. Configure the following:
   - **MQTT Broker**: Your LavinMQ host from CloudAMQP
   - **Port**: 1883 (or 8883 for SSL)
   - **Username**: Your LavinMQ username
   - **Password**: Your LavinMQ password
   - **Client ID**: `pepper_c1_reader` (or similar unique name)
   - **Keep Alive**: 60 seconds

### Configure Data Publishing
1. Go to **Data** → **Publishing Settings** 
2. Set up topic structure, for example:
   - **Base Topic**: `pepper_c1/data`
   - **Device ID Topic**: `pepper_c1/device_id`
   - **Status Topic**: `pepper_c1/status`

Common topic patterns for the Pepper C1:
```
pepper_c1/mux/channel_1
pepper_c1/mux/channel_2
pepper_c1/mux/channel_3
pepper_c1/mux/channel_4
pepper_c1/mux/channel_5
pepper_c1/mux/channel_6
pepper_c1/mux/channel_7
pepper_c1/mux/channel_8
pepper_c1/status
pepper_c1/config
```

## Step 2: Configure Home Assistant MQTT Integration

If you haven't already set up MQTT in Home Assistant:

### Via UI:
1. **Settings** → **Devices & Services** → **Add Integration** 
2. Search for **MQTT** and configure with your LavinMQ credentials

### Via configuration.yaml:
```yaml
mqtt: !include mqtt.yaml
```

See also [Splitting up the configuration](https://www.home-assistant.io/docs/configuration/splitting_configuration/).

### mqtt.yaml
```yaml
mqtt:
  broker: your-lavinmq-host.cloudamqp.com
  port: 1883
  username: your-lavinmq-username
  password: your-lavinmq-password
  client_id: home_assistant_pepper_c1
```

## Step 3: Create Home Assistant Sensors

Add these sensors to your `mqtt.yaml` to read Pepper C1 data:

```yaml
mqtt:
  sensor:
    # MUX Channel readings
    - name: "Pepper C1 Channel 1"
      state_topic: "pepper_c1/mux/channel_1"
      unit_of_measurement: "V"
      device_class: voltage
      value_template: "{{ value_json.voltage | float }}"

    - name: "Pepper C1 Channel 2"
      state_topic: "pepper_c1/mux/channel_2"
      unit_of_measurement: "V"
      device_class: voltage
      value_template: "{{ value_json.voltage | float }}"

    - name: "Pepper C1 Channel 3"
      state_topic: "pepper_c1/mux/channel_3"
      unit_of_measurement: "V"
      device_class: voltage
      value_template: "{{ value_json.voltage | float }}"

    - name: "Pepper C1 Channel 4"
      state_topic: "pepper_c1/mux/channel_4"
      unit_of_measurement: "V"
      device_class: voltage
      value_template: "{{ value_json.voltage | float }}"

    # Device status
    - name: "Pepper C1 Status"
      state_topic: "pepper_c1/status"
      value_template: "{{ value_json.status }}"

    # Temperature if available
    - name: "Pepper C1 Temperature"
      state_topic: "pepper_c1/temperature"
      unit_of_measurement: "°C"
      device_class: temperature
      value_template: "{{ value_json.temperature | float }}"

  # Binary sensors for connection status
  binary_sensor:
    - name: "Pepper C1 Online"
      state_topic: "pepper_c1/status"
      payload_on: "online"
      payload_off: "offline"
      device_class: connectivity
```

## Step 4: Advanced Configuration

### If Pepper C1 sends raw data:
```yaml
mqtt:
  sensor:
    - name: "Pepper C1 Raw Data"
      state_topic: "pepper_c1/data"
      value_template: >
        {% set data = value.split(',') %}
        {% if data|length >= 4 %}
          {{ {
            'channel_1': data[0]|float,
            'channel_2': data[1]|float,
            'channel_3': data[2]|float,
            'channel_4': data[3]|float
          } | to_json }}
        {% endif %}
```

### For data logging and history:
```yaml
recorder:
  include:
    entities:
      - sensor.pepper_c1_channel_1
      - sensor.pepper_c1_channel_2
      - sensor.pepper_c1_channel_3
      - sensor.pepper_c1_channel_4
      - sensor.pepper_c1_temperature

history:
  include:
    entities:
      - sensor.pepper_c1_channel_1
      - sensor.pepper_c1_channel_2
      - sensor.pepper_c1_channel_3
      - sensor.pepper_c1_channel_4
```

## Step 5: Testing and Verification

### Test MQTT Connection:
1. In Home Assistant, go to **Developer Tools** → **MQTT** 
2. Subscribe to `pepper_c1/#` to see all messages from your device 
3. Check if data is being received

### Verify Pepper C1 Publishing:
1. Check LavinMQ management interface on CloudAMQP 
2. Look for active connections from your Pepper C1 
3. Monitor message rates and topics

### Debug Common Issues:

**No data received:**
- Check Pepper C1 network connectivity
- Verify MQTT credentials match between Pepper C1 and LavinMQ
- Ensure topics are correctly configured

**Connection drops:**
- Increase keep-alive interval
- Check WiFi stability
- Monitor CloudAMQP connection limits

## Step 6: Dashboard Creation

Create a dashboard to visualize your Pepper C1 data:

```yaml
# In your dashboard configuration
cards:
  - type: entities
    title: Pepper C1 MUX Reader
    entities:
      - sensor.pepper_c1_channel_1
      - sensor.pepper_c1_channel_2
      - sensor.pepper_c1_channel_3
      - sensor.pepper_c1_channel_4
      - sensor.pepper_c1_temperature
      - binary_sensor.pepper_c1_online

  - type: history-graph
    title: Channel Readings
    entities:
      - sensor.pepper_c1_channel_1
      - sensor.pepper_c1_channel_2
      - sensor.pepper_c1_channel_3
      - sensor.pepper_c1_channel_4
```

This setup will allow you to monitor your Pepper C1 MUX Reader data in real-time through Home Assistant, with all communication routed through your reliable LavinMQ broker on CloudAMQP.
