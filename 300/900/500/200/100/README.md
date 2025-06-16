# 100 - Device Registration Workflow

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

3. **Add MongoDB Connection Step**
  - Click "+" to add new step
  - Search for "MongoDB"
  - Select "MongoDB - Execute Aggregation"
  - Connect your MongoDB account using connection string

![Image](https://github.com/user-attachments/assets/e0b77120-bf73-4254-b29b-76cd2817ea7f)

Skip **Test Connection** if it fails.

![Image](https://github.com/user-attachments/assets/55d7ae47-f4e3-4e3f-a737-9ba7aafc2eee)

Choose database **mqtt_registry**:

![Image](https://github.com/user-attachments/assets/d1102c42-79ab-4e1a-a7f9-be33fc152bc7)

4. **Add Name Generation Logic**
  - Add "Node.js" step for custom code:​​​​​​​​​​​​​​​​

== WE ARE HERE ==

MORE