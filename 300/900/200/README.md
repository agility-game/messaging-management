# 200 - Prerequisites

## For CloudAMQP (Not yet working)

First, ensure you have:
- A CloudAMQP account with a [LavinMQ](https://customer.cloudamqp.com/instance/) instance
- Home Assistant installed and running
- Your LavinMQ connection details from CloudAMQP dashboard

![Image](https://github.com/user-attachments/assets/045e752b-ff05-4589-8ff9-d893c8b23eea)

Hence:

### MQTT details

From your CloudAMQP dashboard, you'll need:
- **Server/Host**: Your LavinMQ instance URL (here: collie.lmq.cloudamqp.com)
- **Port**: Usually 1883 (non-SSL) or 8883 (SSL) (here: 1883)
- **Username**: Your LavinMQ username (here: tlkaaxtf:tlkaaxtf)
- **Password**: Your LavinMQ password (see https://api.cloudamqp.com/console/36c83daa-48f9-4a5a-9b3a-edf871ac74bb/details)
- **Virtual Host**: Usually "/" or your specific vhost

## For EMQX (Experimental, but working)

First, ensure you have:
- An EMQX account with a [EMQX](https://cloud-intl.emqx.com/console/deployments/q3297d6a/settings) instance
- Home Assistant installed and running
- You have created a **Username** in EMQX [authentication](https://cloud-intl.emqx.com/console/deployments/q3297d6a/auth) page.

![Image](https://github.com/user-attachments/assets/e32cc310-e7cc-4315-ab84-8222ff50c8d2)

- You have created a **Client ID** with **Password** in EMQX [authorization](https://cloud-intl.emqx.com/console/deployments/q3297d6a/acl) page.

![Image](https://github.com/user-attachments/assets/7cf2a52e-ebc6-4579-968a-d7ea6be2ca56)

- You have created a **Username** with **Password** in EMQX [authorization](https://cloud-intl.emqx.com/console/deployments/q3297d6a/acl) page.

![Image](https://github.com/user-attachments/assets/6627e842-20dd-4805-ae73-8140958c4a35)

- Your EMQX connection details from [EMXQ dashboard](https://cloud-intl.emqx.com/console/deployments/q3297d6a/settings).

![Image](https://github.com/user-attachments/assets/0c5c43b4-6064-488f-be13-7544e7dc19c2)

Hence:

### MQTT details

From your EMQX dashboard, you'll need:
- **Server/Host**: Your EMQX instance URL (here: q3297d6a.ala.eu-central-1.emqxsl.com)
- **Port**: Usually 1883 (non-SSL) or 8883 (SSL) (here: 8883)
- **Username**: Your EMQX username (here: tlkaaxtf:tlkaaxtf)
- **Password**: Your EMQX password (see https://api.cloudamqp.com/console/36c83daa-48f9-4a5a-9b3a-edf871ac74bb/details)
- **Virtual Host**: Usually "/" or your specific vhost

### Test with MQTTX Client

Let us **publish*** a message on the ```out_topic``` in the [MQTTX Client](https://github.com/emqx/MQTTX):

![Image](https://github.com/user-attachments/assets/52992a57-9ee8-4310-baf2-8279bd91188e)

Within seconds the published message is also received, as the MQTTX client is **subscribed** to the ```out_topic```:

![Image](https://github.com/user-attachments/assets/05d6803d-e710-40e7-8df6-fe6e3003e978)

The message has been routed through the EMQX Message Broker successfully!

When we read an NFC tag by the Pepper C1 MUX Reader, as it send its UID, it is also received by the MQTTX Client:

![Image](https://github.com/user-attachments/assets/e50181be-0d6c-48c1-a22b-4f9069b2bac8)
