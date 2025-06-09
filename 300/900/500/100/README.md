# 100 - Testing with Sliplane MongoDB

## 100 - How to Get Sliplane Credentials

1. **Go to your Sliplane project:**
 ```
 https://sliplane.io/app/projects/project_1i5szbhfgm12
 ```

2. **Click on your MongoDB service (Mongo-tAfO)**

![Image](https://github.com/user-attachments/assets/67a11add-aca2-4448-a145-ad1195c47ff8)

3. **Look for connection details section** - you should find:
 - Database username (here: admin)
 - Database password (hidden in above screenshot)
 - Database name (default might be the same as username) (here: mongo-tafo)

4. **If credentials aren't visible:**
 - Check the "Environment Variables" tab
 - Look for "Connection" or "Credentials" section
 - Check service logs for initial setup information

## 200 - Connection String Examples

For external tools (MongoDB Compass, Studio 3T, etc.):

**NOTE**: Recommended to use is [RoboMongo](https://robomongo.org/) by Studio 3T Community Edition.

```
mongodb://your_username:your_password@mongo-tafo.sliplane.app:27017/your_database
```

**NOTE**: If you just deployed or just connected your custom domain, it may take a while until the DNS propagation reaches your location.

Connection settings in RoboMongo:

![Image](https://github.com/user-attachments/assets/b8f6078f-9e31-46ce-9e39-ea83561126c8)

![Image](https://github.com/user-attachments/assets/99c28af0-9ab4-4f07-81ec-e2f671714574)

![Image](https://github.com/user-attachments/assets/01a2e402-fee7-4be4-803f-78d9f01a6385)

![Image](https://github.com/user-attachments/assets/49dcfc66-5850-4c19-9d50-3eee5ee56d2b)

For applications with connection options:
```javascript
{
host: 'mongo-taco.sliplane.app',
port: 27017,
database: 'your_database',
username: 'your_username',
password: 'your_password'
}
```

We are now connected to our MongoDB instance through RoboMongo:

![Image](https://github.com/user-attachments/assets/b54d14ad-38b8-45fa-8622-33a4ae4bc845)
