# 100 - Device Registration Workflow

Architecture Overview

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

1. **Go to Pipedream Dashboard**
  - Visit [https://pipedream.com](https://pipedream.com)
  - Sign in to your account (here: using email ```wvanheemstra@icloud.com```)
  - Go to project "[Agility Game]()"
  - Click "New Workflow"
  - Name it "Device Registration"

![Image](https://github.com/user-attachments/assets/7fbb6688-942c-405e-85cc-8a16898de6fe)  

2. **Setup HTTP Webhook Trigger**
  - Select "HTTP / Webhook" as trigger
  - Choose "New HTTP Requests"
  - Copy the webhook URL (e.g., `https://eoh8781e35at724.m.pipedream.net`)

![Image](https://github.com/user-attachments/assets/8c8a8820-6c57-4aab-886b-12a095d3f6b8)

![Image](https://github.com/user-attachments/assets/63e04d6a-c6ea-4627-99fd-f3c6e0694fd2)

![Image](https://github.com/user-attachments/assets/184afd67-19b5-47a3-b601-5c95108ee18c)

![Image](https://github.com/user-attachments/assets/56b15863-1303-4cb9-8faa-87bae124cbe4)

Optionally, send a Test event:

![Image](https://github.com/user-attachments/assets/f035656e-297b-4443-a058-9874e348e630)

Success!!

![Image](https://github.com/user-attachments/assets/2a8e4914-0091-4f29-a4f3-3e80f996a2ef)

3. **Add Name Generation Logic**
  - Add "Node.js" step for custom code:​​​​​​​​​​​​​​​​

![Image](https://github.com/user-attachments/assets/11d9e113-86bd-4d3d-b758-467986821cd3)

```
// Generate Two-Word Name
import { MongoClient } from 'mongodb';

export default defineComponent({
 async run({ steps, $ }) {
   
   // MongoDB connection details
   const uri = process.env.MONGODB_URI; // Set in Pipedream environment variables
   const client = new MongoClient(uri);

   try {
     await client.connect();
     const db = client.db('mqtt_registry');

     // Get word lists
     const wordLists = await db.collection('word_lists').findOne({_id: 'naming_words'});
     const adjectives = wordLists.adjectives;
     const nouns = wordLists.nouns;

     // Generate unique name
     let generatedName;
     let nameExists = true;
     let attempts = 0;

     while (nameExists && attempts < 50) {
       const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
       const noun = nouns[Math.floor(Math.random() * nouns.length)];
       generatedName = `${adj}-${noun}`;

       // Check if name exists
       const existing = await db.collection('device_registry').findOne({_id: generatedName});
       nameExists = existing !== null;
       attempts++;
     }

     if (nameExists) {
       throw new Error('Could not generate unique name after 50 attempts');
     }

     // Extract device data from webhook payload
     const deviceData = steps.trigger.event.body;

     // Prepare device document
     const deviceDoc = {
       _id: generatedName,
       client_id: generatedName,
       original_client_id: deviceData.client_id || steps.trigger.event.headers['x-client-id'],
       device_type: deviceData.device_type,
       mac_address: deviceData.mac_address,
       location: deviceData.location,
       ip_address: deviceData.ip_address,
       firmware_version: deviceData.firmware_version,
       status: "online",
       registered_at: new Date().toISOString(),
       last_seen: new Date().toISOString(),
       metadata: deviceData.metadata || {}
     };

     // Insert device into registry
     await db.collection('device_registry').insertOne(deviceDoc);

     return {
       success: true,
       assigned_name: generatedName,
       device_data: deviceDoc,
       message: "Device registered successfully"
     };

   } catch (error) {
     return {
       success: false,
       error: error.message
     };
   } finally {
     await client.close();
   }
 }
});
```

Name the step "generate_name".

![Image](https://github.com/user-attachments/assets/1502c0f5-d821-4be0-b22b-5062f58cf610)

Test our step:

![Image](https://github.com/user-attachments/assets/52b49fd0-0736-46f0-8a15-7c2045ef5008)

Success! A new device is registered in the MongoDB database "**mqtt_registery**" inside the collection "**device_registry**" and a two-word combination is assigned to it (here: ```rapid-flame```).

This can also be seen from our MongoDB Client:

![Image](https://github.com/user-attachments/assets/234f7c29-384c-4789-a17e-2536d2c78e61)

4. **Add Response to EMQX Broker Logic**
  - Add "Node.js" step for custom code:​​​​​​​​​​​​​​​​

![Image](https://github.com/user-attachments/assets/0e17a3c0-de5c-484a-8461-f7f55ae8da71)

**WARNING**: You will have to configure the workflow to allow for **returning a custom response**.

![Image](https://github.com/user-attachments/assets/eeb3f1d9-e8ee-4a67-a8f8-76c8992a31fc)

```
// HTTP Response (Send response back to EMQX)
export default defineComponent({
 async run({ steps, $ }) {
   const result = steps.generate_name.$return_value;

   await $.respond({
     status: result.success ? 200 : 400,
     headers: {
       "Content-Type": "application/json"
     },
     body: {
       success: result.success,
       assigned_name: result.assigned_name,
       message: result.message,
       timestamp: new Date().toISOString()
     }
   });
 }
});
```

5. **Add MQQT Response to EMQX Broker Logic**
  - Add "Node.js" step for custom code:​​​​​​​​​​​​​​​​

![Image](https://github.com/user-attachments/assets/84a3aac8-a83a-4558-93dd-938ef9f0cc68)  

```
// Send MQTT Response (if you have MQTT client capability)
export default defineComponent({
 async run({ steps, $ }) {
   const result = steps.generate_name.$return_value;
   const originalClientId = result.device_data.original_client_id;

   // This would require MQTT client library in Pipedream
   // For now, we'll use HTTP to EMQX REST API to publish response

   const emqxApiUrl = process.env.EMQX_API_URL; // e.g., https://your-emqx.com/api/v5
   const emqxApiKey = process.env.EMQX_API_KEY;

   const publishPayload = {
     topic: `device/register/response/${originalClientId}`,
     payload: JSON.stringify({
       success: result.success,
       assigned_name: result.assigned_name,
       message: result.message,
       timestamp: new Date().toISOString()
     }),
     qos: 1,
     retain: false
   };

   try {
     const response = await fetch(`${emqxApiUrl}/publish`, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${emqxApiKey}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(publishPayload)
     });

     return {
       mqtt_published: response.ok,
       response_topic: publishPayload.topic
     };
   } catch (error) {
     return {
       mqtt_published: false,
       error: error.message
     };
   }
 }
});
```

6. **Deploy the workflow**

![Image](https://github.com/user-attachments/assets/80129162-4eba-4285-99c9-3db8bb47300b)

And test the deployed workflow (https://eoh8781e35at724.m.pipedream.net):

![Image](https://github.com/user-attachments/assets/0fbf992c-f3cd-47ec-8451-f8dc85dac47d)

We sent a sample device configuration:

```
{
    "device_type": "Eccel Pepper C1 MUX",
    "mac_address": "AA:BB:CC:DD:EE:FF",
    "location": "office",
    "ip_address": "192.168.1.100",
    "firmware_version": "1.2.3"
}
```

And the workflow shows successful!

![Image](https://github.com/user-attachments/assets/4109b4b7-a26b-4f5e-a300-3efa1d138982)

Also when looked at from the MongoDB Client:

![Image](https://github.com/user-attachments/assets/e367889f-e09b-409c-a015-69621f23b88c)

== WE ARE HERE ==
