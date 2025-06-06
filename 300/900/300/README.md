# 300 - Configure Pepper C1 MUX Reader

### Access Pepper C1 Web Interface
1. Find the Pepper C1's IP address on your network (check your router's DHCP client list, e.g. 192.168.1.127) 
2. Open a web browser and navigate to `http://[pepper-c1-ip-address]` 
3. Log in with your credentials (default is usually ```admin```/```admin```)

### Configure MQTT Settings
In the Pepper C1 web interface:

1. Go to **Communication** → **MQTT client** 
2. Configure the following:
   - **MQTT Broker/Server Address**: Your LavinMQ host from CloudAMQP (here: ```collie.lmq.cloudamqp.com```)
   - **Port**: 1883 (or 8883 for SSL)
   - **Username**: Your LavinMQ username (here: ```tlkaaxtf:tlkaaxtf```)
   - **Password**: Your LavinMQ password (see https://api.cloudamqp.com/console/36c83daa-48f9-4a5a-9b3a-edf871ac74bb/details)
   - **Client ID**: `pepper_c1-mux-09dced` (or similar unique name)
   - **Keep Alive**: 60 seconds (if available)

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
