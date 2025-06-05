# Infrastructure

![Image](https://github.com/user-attachments/assets/c584e72b-b909-4018-8317-61af872b44c0)

## Data Flows

- Eccel Pepper C1 MUX Reader to CloudAMQP LavinMQ: ```pepper_c1/mux/channel_1-8```, ```pepper_c1/status```

- LavinMQ to Home Assistant: Subscribe to ```pepper_c1``` topics

## Monitoring

- Home Assistant: Creates sensors for Near Field Communication (NFC) tags readings, status monitoring

## Network Configuration

- All devices on the same WiFi subnet (192.168.1.x)
- MQTT over Internet via CloudAMQP LavinMQ
- Parallels in Bridge Mode for direct network access