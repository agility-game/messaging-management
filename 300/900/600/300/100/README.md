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

Now for the purpose of testing our SQL, enable **Try It Out**.

![Image](https://github.com/user-attachments/assets/ca8080c0-f6bb-4cdf-a1a4-ea28c61a33a4)

You should see that the topic is now set to ```device/register```.

Scroll down and fill in the fields as follows:

- Data Source: **Message Publish**

![Image](https://github.com/user-attachments/assets/c4918519-e1af-4cf7-89fe-3de0a15e9951)

- Client ID: **undefined** (as we still have to register the device, which will set a Client ID)
- Username: **tlkaaxtf:tlkaaxtf** (as defined in EMQX Broker under authentication)
- Topic: **device/register**
- Quality of Service (QoS): **1** (meaning we expect confirmation by Pipedream on retrieval of the message)
- Payload:

   ```json
   {
     "device_type": "Eccel Pepper C1 MUX",
     "mac_address": "AA:BB:CC:DD:EE:FF",
     "location": "office",
     "ip_address": "192.168.1.100",
     "firmware_version": "1.2.3"
   }
   ```

For testing purposes we set arbitrary values as payload. In practice, this data will come from Eccel Pepper C1 MUX Reader.

![Image](https://github.com/user-attachments/assets/25fe760b-d23a-4288-ba5b-6801c0c7cc79)

Click **Test**.

![Image](https://github.com/user-attachments/assets/6f0884fb-bf58-4232-aa39-281675c34d14)

We see **Test Passed** and the following Output Result:

```json
{
  "clientid": "undefined",
  "device_type": "Eccel Pepper C1 MUX",
  "firmware_version": "1.2.3",
  "ip_address": "192.168.1.100",
  "location": "office",
  "mac_address": "AA:BB:CC:DD:EE:FF",
  "timestamp": 1750338400048
}

```

Congratulations!

Click **Next**.

Next, we will be prompted which Connector we want to be using with our newly created Rule.

![Image](https://github.com/user-attachments/assets/431812bd-9525-4910-a837-22449ffbd033)

We select the previously created Connector (here ```c-q3297d6a-00666d```, that connects with PipeDreams's Webhook for "Device Registration").

Fill in the fields as follows:

- Action Type: **HTTP Server** (as we are using a Webhook call)
- Action Name: **a-q3297d6a-031830** (which is auto-generated and unique)
- Note: **Device Registration**
- URL: ```Leave this empty, we are not specifying a deeper path for PipeDream's WebHook for "Device Registration"```
- Method: **POST** (as we expect a response from the PipeDream's Webhook for "Device Registration")

Leave all Headers at their default values.

![Image](https://github.com/user-attachments/assets/f7928532-1420-4c45-94ba-434d2aafa28d)

In addition, scroll down and fill in th following:

- Body: 

  ```json

  ```

- ...

Click **Confirm**.


MORE


