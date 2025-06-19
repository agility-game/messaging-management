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

Lookup the URL of the Webhook on Pipedream to be used for "Register Device":

See https://pipedream.com/@wvanheemstra/projects/proj_e5smjgK/device-registration-p_7NCZ6WK/inspect

![Image](https://github.com/user-attachments/assets/8de941fa-e382-4b60-b3a1-9e797c21ac20)

The URL of the Webhook is: https://eoh8781e35at724.m.pipedream.net

Now choose HTTP on EMQX's Data Integration page, which allows you to enter the previously found URL of the Webhook in Pipedream.

![Image](https://github.com/user-attachments/assets/686f785d-72ed-47db-ad21-a02bc32ae081)

Click **Test** to check if the triggering of the webhook is working successfully.

MORE
