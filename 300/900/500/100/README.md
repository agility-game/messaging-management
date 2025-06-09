# 100 - Testing with Sliplane MongoDB

## 100 - How to Get Sliplane Credentials

1. **Go to your Sliplane project:**
 ```
 https://sliplane.io/app/projects/project_1i5szbhfgm12
 ```

2. **Click on your MongoDB service (Mongo-tAfO)**

3. **Look for connection details section** - you should find:
 - Database username
 - Database password  
 - Database name (default might be the same as username)

4. **If credentials aren't visible:**
 - Check the "Environment Variables" tab
 - Look for "Connection" or "Credentials" section
 - Check service logs for initial setup information

## 200 - Connection String Examples

For external tools (MongoDB Compass, Studio 3T, etc.):
```
mongodb://your_username:your_password@mongo-taco.sliplane.app:27017/your_database
```

For applications with connection options:
```javascript
{
host: 'mongo-taco.sliplane.app',
port: 27017,
database: 'your_database',
username: 'your_username',
password: 'your_password'
}
