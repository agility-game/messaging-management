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

**NOTE**: Recommended to use is [RoboMongo](https://robomongo.org/).

```
mongodb://your_username:your_password@mongo-tafo.sliplane.app:27017/your_database
```

**NOTE**: If you just deployed or just connected your custom domain, it may take a while until the DNS propagation reaches your location.

For applications with connection options:
```javascript
{
host: 'mongo-taco.sliplane.app',
port: 27017,
database: 'your_database',
username: 'your_username',
password: 'your_password'
}
