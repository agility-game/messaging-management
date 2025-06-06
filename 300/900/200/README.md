# 200 - Prerequisites

First, ensure you have:
- A CloudAMQP account with a [LavinMQ](https://customer.cloudamqp.com/instance/) instance
- Home Assistant installed and running
- Your LavinMQ connection details from CloudAMQP dashboard

![Image](https://github.com/user-attachments/assets/045e752b-ff05-4589-8ff9-d893c8b23eea)

Hence:

## MQTT details

From your CloudAMQP dashboard, you'll need:
- **Server/Host**: Your LavinMQ instance URL (here: collie.lmq.cloudamqp.com)
- **Port**: Usually 1883 (non-SSL) or 8883 (SSL) (here: 1883)
- **Username**: Your LavinMQ username (here: tlkaaxtf:tlkaaxtf)
- **Password**: Your LavinMQ password (see https://api.cloudamqp.com/console/36c83daa-48f9-4a5a-9b3a-edf871ac74bb/details)
- **Virtual Host**: Usually "/" or your specific vhost
