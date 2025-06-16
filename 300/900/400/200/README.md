# 200 - Initialize Database and Collections

## 100 - You can connect to your Sliplane MongoDB using MongoDB Compass, Studio 3T, or mongo shell:

```
mongodb://your_username:your_password@mongo-tafo.sliplane.app:27017/your-database
```

## 200 - Create the mqtt_registry database (if not exists)

From the **File** menu, choose **Add Database ...**:

![Image](https://github.com/user-attachments/assets/7a1e8392-a144-447c-8b2d-7e94b685a2d2)

Give the Database a name (here: **mqtt_registry**):

![Image](https://github.com/user-attachments/assets/cd2997de-4278-455b-90b8-d738954f0c70)


## 300 - Create collections and initial data

Collections:

- device_registry

Add a collection to the Database **mqtt_registry**:

![Image](https://github.com/user-attachments/assets/cbac1f7e-e2d4-46d9-85a1-602aad98ecf6)

Name the new collection **device_registry**:

![Image](https://github.com/user-attachments/assets/006f5334-3e5c-442f-b4c5-1420a0fdd893)

It will look like this:

![Image](https://github.com/user-attachments/assets/38acc6f4-f23a-45b3-995f-a4837882f4a9)

## 400 - Check for new entries

 - Connect to: `mongodb://username:password@mongo-taco.sliplane.app:27017/mqtt_registry`
 - Check `device_registry` collection for new entries
