# 100 - Configuration Files

## Home Assistant MQTT Configuration

See also [Splitting up the configuration](https://www.home-assistant.io/docs/configuration/splitting_configuration/).

In your `configuration.yaml`:

```yaml
mqtt: !include mqtt.yaml
sensor: !include sensor.yaml
automation: !include automation.yaml
```

### 1. MQTT Broker Configuration (CloudAMQP/LavinMQ)

In your `mqtt.yaml`:

```yaml
mqtt:
  broker: your-cloudamqp-instance.cloudamqp.com
  port: 1883  # or 8883 for SSL
  username: your_username
  password: your_password
  client_id: home_assistant
  keepalive: 60
  protocol: 3.1.1
```

For SSL connection (recommended):
```yaml
mqtt:
  broker: your-cloudamqp-instance.cloudamqp.com
  port: 8883
  username: your_username
  password: your_password
  certificate: auto
  tls_insecure: false
```

### 2. NFC Tag Sensor Configuration

In your `sensor.yaml`:

```yaml
sensor:
  - platform: mqtt
    name: "NFC Reader"
    state_topic: "nfc/reader/tag"
    json_attributes_topic: "nfc/reader/tag"
    value_template: "{{ value_json.uid }}"
    json_attributes_template: "{{ value_json | tojson }}"
```

### 3. Tag Event Configuration

In your `mqtt.yaml`:

```yaml
mqtt:
  tag:
    topic: "nfc/reader/scanned"
    payload: "{{ tag_id }}"
```

Or for more advanced tag handling:

In your `automation.yaml`:

```yaml
automation:
  - alias: "NFC Tag Scanned"
    trigger:
      platform: mqtt
      topic: "nfc/reader/tag"
    action:
      - event: tag_scanned
        event_data:
          tag_id: "{{ trigger.payload_json.uid }}"
          reader_location: "{{ trigger.payload_json.location | default('unknown') }}"
          antenna: "{{ trigger.payload_json.antenna | default(1) }}"
```

## Eccel Pepper C1 MUX Reader Configuration

### 4. Reader MQTT Settings

The Pepper C1 can "send a tag UID over MQTT or WebSockets, and so can easily be integrated with IoT systems" [![Eccel Technology](claude-citation:/icon.png?validation=8CD38674-6504-443F-AE7C-817215174658&citation=eyJlbmRJbmRleCI6MTc3MCwibWV0YWRhdGEiOnsiZmF2aWNvblVybCI6Imh0dHBzOlwvXC93d3cuZ29vZ2xlLmNvbVwvczJcL2Zhdmljb25zP3N6PTY0JmRvbWFpbj1lY2NlbC5jby51ayIsInNpdGVEb21haW4iOiJlY2NlbC5jby51ayIsInNpdGVOYW1lIjoiRWNjZWwgVGVjaG5vbG9neSIsInR5cGUiOiJ3ZWJwYWdlX21ldGFkYXRhIn0sInNvdXJjZXMiOlt7Imljb25VcmwiOiJodHRwczpcL1wvd3d3Lmdvb2dsZS5jb21cL3MyXC9mYXZpY29ucz9zej02NCZkb21haW49ZWNjZWwuY28udWsiLCJzb3VyY2UiOiJFY2NlbCBUZWNobm9sb2d5IiwidGl0bGUiOiJQZXBwZXIgQzEgTW9kdWxlIEJhc2Vib2FyZCAtIEVjY2VsIFRlY2hub2xvZ3kgLSBSRklEIG1hZGUgc2ltcGxlIiwidXJsIjoiaHR0cHM6XC9cL2VjY2VsLmNvLnVrXC9wcm9kdWN0XC9wZXBwZXItYzEtbW9kdWxlLWJhc2Vib2FyZFwvIn1dLCJzdGFydEluZGV4IjoxNjYyLCJ0aXRsZSI6IlBlcHBlciBDMSBNb2R1bGUgQmFzZWJvYXJkIC0gRWNjZWwgVGVjaG5vbG9neSAtIFJGSUQgbWFkZSBzaW1wbGUiLCJ1cmwiOiJodHRwczpcL1wvZWNjZWwuY28udWtcL3Byb2R1Y3RcL3BlcHBlci1jMS1tb2R1bGUtYmFzZWJvYXJkXC8iLCJ1dWlkIjoiYjNmYmUzMWQtYzI2ZS00N2IxLTg1ZDItMDEyNjFhN2VlMGI3In0%3D)](https://eccel.co.uk/product/pepper-c1-module-baseboard/) in standalone mode. Configure the reader's MQTT settings:

**MQTT Topic Structure:**
```
nfc/reader/tag          # Main tag detection topic
nfc/reader/status       # Reader status
nfc/reader/antenna/[1-8] # Individual antenna readings
```

**Payload Format:**
```json
{
  "uid": "E00302400860",
  "antenna": 1,
  "location": "living_room",
  "timestamp": "2025-06-05T10:30:00Z",
  "reader_id": "pepper_c1_001"
}
```

### 5. Multi-Antenna Configuration

For the MUX capability (up to 8 antennas), in your `sensor.yaml`:

```yaml
sensor:
  - platform: mqtt
    name: "NFC Antenna 1"
    state_topic: "nfc/reader/antenna/1"
    value_template: "{{ value_json.uid }}"
  
  - platform: mqtt
    name: "NFC Antenna 2" 
    state_topic: "nfc/reader/antenna/2"
    value_template: "{{ value_json.uid }}"
    
  # Continue for antennas 3-8 as needed
```

### 6. CloudAMQP/LavinMQ Specific Settings

**Connection Parameters:**
- **Host:** your-instance.cloudamqp.com
- **Port:** 1883 (non-SSL) or 8883 (SSL)
- **Virtual Host:** Usually `/` or your specific vhost
- **Protocol:** MQTT 3.1.1 (recommended for compatibility)

### 7. Advanced Tag Recognition

In your `automation.yaml`:

```yaml
input_text:
  nfc_tags:
    name: "Known NFC Tags"
    initial: '{"E00302400860": "guest_card", "A1B2C3D4E5F6": "admin_card"}'

automation:
  - alias: "Process NFC Tag"
    trigger:
      platform: mqtt
      topic: "nfc/reader/tag"
    action:
      - variables:
          tag_name: >
            {% set tags = states('input_text.nfc_tags') | from_json %}
            {{ tags.get(trigger.payload_json.uid, 'unknown_tag') }}
      - choose:
          - conditions:
              - condition: template
                value_template: "{{ tag_name != 'unknown_tag' }}"
            sequence:
              - event: known_tag_scanned
                event_data:
                  tag_name: "{{ tag_name }}"
                  tag_id: "{{ trigger.payload_json.uid }}"
```

### 8. Reader Configuration Web Interface

The default configuration includes "baud: 115200, Data: 8 bit, Parity: none, Stop bits: 1 bit, Flow Control: none" [![Manuals+](claude-citation:/icon.png?validation=8CD38674-6504-443F-AE7C-817215174658&citation=eyJlbmRJbmRleCI6MzgyNiwibWV0YWRhdGEiOnsiZmF2aWNvblVybCI6Imh0dHBzOlwvXC93d3cuZ29vZ2xlLmNvbVwvczJcL2Zhdmljb25zP3N6PTY0JmRvbWFpbj1tYW51YWxzLnBsdXMiLCJzaXRlRG9tYWluIjoibWFudWFscy5wbHVzIiwic2l0ZU5hbWUiOiJNYW51YWxzKyIsInR5cGUiOiJ3ZWJwYWdlX21ldGFkYXRhIn0sInNvdXJjZXMiOlt7Imljb25VcmwiOiJodHRwczpcL1wvd3d3Lmdvb2dsZS5jb21cL3MyXC9mYXZpY29ucz9zej02NCZkb21haW49bWFudWFscy5wbHVzIiwic291cmNlIjoiTWFudWFscysiLCJ0aXRsZSI6IkVjY2VsIFBFUFBFUk1VWCBQZXBwZXIgQzEgTVVYIFJGSUQgUmVhZGVyIFVzZXIgTWFudWFsIiwidXJsIjoiaHR0cHM6XC9cL21hbnVhbHMucGx1c1wvZWNjZWxcL3BlcHBlcm11eC1wZXBwZXItYzEtbXV4LXJmaWQtcmVhZGVyLW1hbnVhbCJ9XSwic3RhcnRJbmRleCI6MzcxMiwidGl0bGUiOiJFY2NlbCBQRVBQRVJNVVggUGVwcGVyIEMxIE1VWCBSRklEIFJlYWRlciBVc2VyIE1hbnVhbCIsInVybCI6Imh0dHBzOlwvXC9tYW51YWxzLnBsdXNcL2VjY2VsXC9wZXBwZXJtdXgtcGVwcGVyLWMxLW11eC1yZmlkLXJlYWRlci1tYW51YWwiLCJ1dWlkIjoiOGU3YjBlMTYtYzFjYy00NzFiLWE4ODctNDExN2MwNWM5ZDgzIn0%3D)](https://manuals.plus/eccel/peppermux-pepper-c1-mux-rfid-reader-manual) and you can access the web interface to configure MQTT settings directly on the Pepper C1 MUX device.

This configuration provides a complete setup for NFC tag reading via MQTT using CloudAMQP's LavinMQ service with the Eccel Pepper C1 MUX reader, supporting multiple antennas and proper tag recognition in Home Assistant.
