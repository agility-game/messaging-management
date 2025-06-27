# 600 - Managing Publish

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
    G --> I[Publish Logic]
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

![Image](https://github.com/user-attachments/assets/57bfd7f1-425f-4bc1-816f-1ff2d9664485)

Lookup the URL of the Webhook on Pipedream to be used for "Publish v1":

See https://pipedream.com/@wvanheemstra/projects/proj_e5smjgK/publish-v1-p_aNCx3Va/inspect

![Image](https://github.com/user-attachments/assets/c5bd890f-c05a-4a81-b9c6-71fb66c34070)

The URL of the Webhook is: https://eowu9nfjfw5x4qr.m.pipedream.net

Now choose **Web Service** -> **HTTP** on EMQX's Data Integration page, which allows you to enter the previously found URL of the Webhook in Pipedream.

![Image](https://github.com/user-attachments/assets/24c208cc-cbe8-4511-b61c-779dbfabf210)


**Note**: Make sure to have ```Enable TLS``` **enabled**, and ```TLS Verify``` **disabled**.

Click **Test** to check if the triggering of the webhook is working successfully.

![Image](https://github.com/user-attachments/assets/5c98e4ca-9ec8-4703-b46e-4fb88ef50e31)

We see a dialogue in the upper right corner **Connector Available**, hence the test is successful.

Click **New** to save the newly created connector (here: ```c-q3297d6a-db112d```).

You will see the new connector listed (here: **Publish v1**).

![Image](https://github.com/user-attachments/assets/e5476bd3-c4b7-4a34-b198-078e4052b554)

Now it is time to add a Rule, by clicking on **+ New Rule**.





MORE