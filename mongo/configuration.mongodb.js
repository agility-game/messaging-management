/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mqtt_registry');

// Create word lists collection with naming data
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

// Create indexes for optimal performance
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

// Create audit collection index
db.device_audit.createIndex({ "action": 1 })
db.device_audit.createIndex({ "deleted_at": -1 })
db.device_audit.createIndex({ "device_id": 1 })

// Insert a test document to verify everything works
db.connection_test.insertOne({
"_id": "setup_test",
"message": "Sliplane MongoDB setup completed successfully",
"timestamp": new Date(),
"version": "7.0.12",
"host": "mongo-tafo.sliplane.app"
})

// Verify setup
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