# 100 - Registering a Device

Overview

```mermaid
graph TD
    A[Eccel Pepper C1 MUX Reader] --> B[NFC Tag Detection]
    B --> C[Extract Tag Data]
    C --> D[MQTT Client Library]
    D --> E[EMQX Broker]
    E --> F[Pipedream Webhook Trigger]
    F --> G[Pipedream Workflow]
    G --> H[Sliplane MongoDB]
    G --> I[Device Registration Logic]
    I --> J[Success Response]
    J --> K[MQTT Publish to EMQX]
    K --> E

    style A fill:#e1f5fe
    style E fill:#f3e5f5
    style G fill:#e8f5e8
    style H fill:#fff3e0
```

We'll be using EMQX Broker's Rule Engine.

The Rule Engine in EMQX MQTT Broker is a software component that allows users to define and execute rules based on MQTT messages. It can be used to extract, filter, enrich, and transform MQTT messages, as well as trigger actions based on specific criteria. This helps to reduce manual intervention and accelerate data integration and application development.

See also [Getting Started with Rule Engine in MQTT Broker: A Quick Guide | EMQ](https://frshl.ink/EFMt).

**Note**: The Rule Engine is supported in EMQX Cloud. It has been officially renamed to '**Data Integration**'.

![Image](https://github.com/user-attachments/assets/1b2cd14d-e393-46fd-a261-0e5439127877)

Lookup the URL of the Webhook on Pipedream to be used for "Device Registration":

See https://pipedream.com/@wvanheemstra/projects/proj_e5smjgK/device-registration-p_7NCZ6WK/inspect

![Image](https://github.com/user-attachments/assets/8de941fa-e382-4b60-b3a1-9e797c21ac20)

The URL of the Webhook is: https://eoh8781e35at724.m.pipedream.net

Now choose **Web Service** -> **HTTP** on EMQX's Data Integration page, which allows you to enter the previously found URL of the Webhook in Pipedream.

![Image](https://github.com/user-attachments/assets/4270d83c-686c-43f2-9055-22a727680907)

**Note**: Make sure to have ```Enable TLS``` **enabled**, and ```TLS Verify``` **disabled**.

Click **Test** to check if the triggering of the webhook is working successfully.

![Image](https://github.com/user-attachments/assets/738600bf-029b-4380-b94e-544c1b1b624a)

We see a dialogue in the upper right corner **Connector Available**, hence the test is successful.

Click **New** to save the newly created connector (here: ```c-q3297d6a-00666d```).

You will see the new connector listed.

![Image](https://github.com/user-attachments/assets/eb202044-8c76-425e-adf1-da8feb08819c)

Now it is time to add a Rule, by clicking on **+ New Rule**.

![Image](https://github.com/user-attachments/assets/cbff1179-fa04-4e2c-b945-6c92e92736a1)

Use the following for SQL:

```sql
SELECT 
  clientid,
  payload.device_type as device_type,
  payload.mac_address as mac_address,
  payload.location as location,
  payload.ip_address as ip_address,
  payload.firmware_version as firmware_version,
  now_timestamp('millisecond') as timestamp
FROM 
  "device/register"
WHERE 
  payload.device_type != ''
```

Then above SQL statement does the following:

- It references the ```device/register``` MQTT topic defined on EMQX Broker used for registration of a device.
- It provides the data (here: ```payload```), as well as the client id that was sent in the MQTT message to the above topic and creates a timestamp.
- It won't progress if the ```device_type``` is empty.

In **Note**, write ```Device Registration``` for ease of reference.

Now for the purpose of testing our SQL, enable **...**.

![Image](https://github.com/user-attachments/assets/ca8080c0-f6bb-4cdf-a1a4-ea28c61a33a4)

You should see that the topic is now set to ```device/register```.

Click **Next**.

MORE


