# Infrastructure

![Image](https://github.com/user-attachments/assets/ad2c18b9-0d45-420f-8568-2278c014353d)

## Key Components

**1. Local Network (Home WiFi)**

- WiFi Router (192.168.1.1) - Central hub for your home network
- Eccel Pepper C1 MUX Reader (192.168.1.127) - Your 8-channel multiplexer device.**NOTE**: Due to DHCP setup, the automatically assigned IP address can vary.
- Mac Mini (192.168.1.200) - Physical host machine
- Parallels VM - Running Home Assistant in bridge network mode

**2. Cloud Infrastructure**

- CloudAMQP LavinMQ Broker - Your MQTT message broker in the cloud
- Internet connectivity for cloud communication

**3. Data Flow Path**

1. **Pepper C1** reads sensor data from 8 multiplexed channels 

2. Publishes MQTT messages to **LavinMQ** via topics like:
   - `pepper_c1/mux/channel_1`
   - `pepper_c1/mux/channel_2`
   - `pepper_c1/mux/channel_3`
   - `pepper_c1/mux/channel_4`
   - `pepper_c1/mux/channel_5`
   - `pepper_c1/mux/channel_6`
   - `pepper_c1/mux/channel_7`
   - `pepper_c1/mux/channel_8`   
   - `pepper_c1/status`

3. **Home Assistant** subscribes to these topics through LavinMQ 

4. Data appears as sensors in Home Assistant for monitoring and automation

**4. Network Configuration Benefits**

- All devices share the same WiFi network for easy local communication
- MQTT broker in the cloud provides reliability and remote access
- Parallels bridge mode gives the VM direct network access
- Redundant connectivity ensures data flow even if local network has issues

## Data Flows

- Eccel Pepper C1 MUX Reader to CloudAMQP LavinMQ: ```pepper_c1/mux/channel_1-8```, ```pepper_c1/status```

- LavinMQ to Home Assistant: Subscribe to ```pepper_c1``` topics

## Monitoring

- Home Assistant: Creates sensors for Near Field Communication (NFC) tags readings, status monitoring

## Network Configuration

- All devices on the same WiFi subnet (192.168.1.x)
- MQTT over Internet via CloudAMQP LavinMQ
- Parallels in Bridge Mode for direct network access

This architecture provides a robust, scalable solution for monitoring your Pepper C1 MUX Reader data through Home Assistant while leveraging cloud-based MQTT for reliability.
