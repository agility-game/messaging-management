## 300 - Add lookup tables

**TIP**: Use the Visual Studio Code Extension ```MongoDB for VS Code``` to run mongo commands directly from the terminal in Visual Studio Code (as well as in Cursor).

![Image](https://github.com/user-attachments/assets/57640382-a0c9-4adb-9243-3754202109ae)

Then open the script at ```mongo/configuration.mongodb.js``` in Visual Studio Code (or Cursor) from the root of this repository. You will see a play button to run the script after having connected to the mongodb instance on Sliplane.

![Image](https://github.com/user-attachments/assets/0dc54473-c191-44f7-a715-ce799ee09d8a)

After running the script you will see:

![Image](https://github.com/user-attachments/assets/a28112a4-2207-4c9a-ba86-2eb97254b157)

In the MongoDB Client (here: Studio T3 Community Edition), you will see the newly created indexes:

![Image](https://github.com/user-attachments/assets/a9cfd40f-adb6-4ecf-ab03-b88078745451)

As well as the newly created collection **word_lists**:

![Image](https://github.com/user-attachments/assets/de5adf9b-3a9a-4e0f-b2a4-e790bfc30a9d)

Alternatively, run scripts manually as follows.

Connect to your Sliplane MongoDB instance (**`mongodb://username:password@mongo-taco.sliplane.app:27017/mqtt_registry`**) and run these commands

## 100 - Switch to mqtt_registry database (creates if doesn't exist)

```
use mqtt_registry
```

## 200 - Create word lists collection with naming data

```
db.word_lists.insertOne({
"_id": "naming_words",
"adjectives": [
  "crimson", "silver", "golden", "azure", "emerald",
  "obsidian", "crystal", "phantom", "midnight", "storm",
  "blazing", "frozen", "electric", "mystic", "digital",
  "stellar", "cosmic", "quantum", "neural", "cyber",
  "rapid", "smart", "swift", "bold", "bright"
],
"nouns": [
  "falcon", "raven", "tiger", "phoenix", "wolf",
  "eagle", "shark", "viper", "dragon", "storm",
  "bolt", "shield", "blade", "arrow", "flame",
  "node", "pulse", "core", "matrix", "nexus",
  "hub", "link", "gate", "bridge", "tower"
]
})
```

## 300 -  Create indexes for optimal performance

```
// Index on device registry collection
db.device_registry.createIndex({ "original_client_id": 1 }, { unique: false })
db.device_registry.createIndex({ "client_id": 1 }, { unique: true })
db.device_registry.createIndex({ "mac_address": 1 }, { unique: false })
db.device_registry.createIndex({ "location": 1 })
db.device_registry.createIndex({ "status": 1 })
db.device_registry.createIndex({ "device_type": 1 })
db.device_registry.createIndex({ "last_seen": -1 })
db.device_registry.createIndex({ "registered_at": -1 })

// Compound indexes for common query patterns
db.device_registry.createIndex({ "location": 1, "status": 1 })
db.device_registry.createIndex({ "status": 1, "last_seen": -1 })
db.device_registry.createIndex({ "device_type": 1, "location": 1 })
```

## 400 - Create audit collection index

```
db.device_audit.createIndex({ "action": 1 })
db.device_audit.createIndex({ "deleted_at": -1 })
db.device_audit.createIndex({ "device_id": 1 })
```

## 500 -  Insert a test document to verify everything works

```
db.connection_test.insertOne({
"_id": "setup_test",
"message": "Sliplane MongoDB setup completed successfully",
"timestamp": new Date(),
"version": "7.0.12",
"host": "mongo-taco.sliplane.app"
})
```

## 600 - Verify setup

```
print("=== Setup Verification ===")
print("Database name:", db.getName())
print("Collections created:")
db.getCollectionNames().forEach(function(collection) {
print("  - " + collection)
})

print("\nWord lists document:")
printjson(db.word_lists.findOne({_id: "naming_words"}))

print("\nIndexes on device_registry:")
db.device_registry.getIndexes().forEach(function(index) {
print("  - " + index.name + ": " + JSON.stringify(index.key))
})

print("\nSetup completed successfully!")
```