# 400 - Use Amazon Iceberg Format

In short, **Amazon Iceberg Format** is an open table format for large analytic datasets that provides ACID transactions, schema evolution, and time travel capabilities. It's designed to work with Amazon S3 and provides efficient query performance, data versioning, and seamless integration with various analytics engines like Apache Spark, Presto, and Amazon Athena. Iceberg format enables reliable data lake operations with atomic commits, concurrent writes, and efficient metadata management, making it ideal for building scalable data architectures in cloud environments. 

For Agility Game, this format allows anyone to easily query the documents in MongoDB and even allow for time travel, i.e. going back and forth in time how document changes effected the development within the game.

For a simple recording of a "Field", here is an example document following the Iceberg format:

```
{
  field_id: "field_antenna1",
  antenna_id: "antenna1", 
  field_name: "Go",
  player_id: "player1",
  position_x: -2.0,
  position_y: 0.0,
  position_z: -2.0,
  last_update_ts: "2025-07-02T10:30:00Z",
  created_at: "2025-07-02T10:00:00Z",
  updated_at: "2025-07-02T10:30:00Z",
  is_active: true,
  snapshot_id: 1719919800123,
  sequence_number: 5,
  __iceberg_metadata: {
    schema_id: 1,
    partition_data: {
      antenna_id: "antenna1",
      update_day: "2025-07-02"
    },
    file_path: "data/antenna1/2025/07/02/data.parquet",
    record_count: 1,
    file_size_bytes: 1024
  }
}
```

I’ll explain each key-value pair in this Iceberg-formatted document:

## Core Game Data Fields

**`field_id: "field_antenna1"`**

- **Purpose**: Unique identifier for the game field/board position
- **Format**: Composite ID combining “field_” prefix with antenna identifier
- **Usage**: Primary key for distinguishing different board positions in the game

**`antenna_id: "antenna1"`**

- **Purpose**: Identifies the physical NFC antenna/reader hardware
- **Format**: Simple string identifier (antenna1, antenna2, etc.)
- **Usage**: Maps to physical hardware for NFC tag detection; used for partitioning data

**`field_name: "Go"`**

- **Purpose**: Human-readable name for the game board position
- **Format**: String representing the board square name (Go, Jail, Park, Start)
- **Usage**: Display purposes and game logic identification

**`player_id: "player1"`**

- **Purpose**: Identifies which player is currently occupying this field
- **Format**: String identifier for the player (player1, player2, etc.)
- **Usage**: Tracks player positions; null when field is empty

## 3D Position Data

**`position_x: -2.0`**
**`position_y: 0.0`**
**`position_z: -2.0`**

- **Purpose**: 3D coordinates for rendering the field in BabylonJS scene
- **Format**: Double precision floating point numbers
- **Usage**: BabylonJS uses these coordinates to position field meshes in 3D space

## Timestamp Fields

**`last_update_ts: "2025-07-02T10:30:00Z"`**

- **Purpose**: Records when the field state last changed (player moved on/off)
- **Format**: ISO 8601 timestamp with timezone
- **Usage**: Track game activity timing; null when field hasn’t been updated

**`created_at: "2025-07-02T10:00:00Z"`**

- **Purpose**: When this document was first created
- **Format**: ISO 8601 timestamp with timezone
- **Usage**: Audit trail and data lifecycle management

**`updated_at: "2025-07-02T10:30:00Z"`**

- **Purpose**: When this document was last modified
- **Format**: ISO 8601 timestamp with timezone
- **Usage**: Track all changes to the document, updated on every modification

## Iceberg Transaction Fields

**`is_active: true`**

- **Purpose**: Soft delete flag for Iceberg tables
- **Format**: Boolean (true/false)
- **Usage**: Allows “deleting” records without physically removing them; enables time travel

**`snapshot_id: 1719919800123`**

- **Purpose**: Links this record to a specific Iceberg table snapshot
- **Format**: Long integer (timestamp-based)
- **Usage**: Enables time travel queries and ACID transaction support

**`sequence_number: 5`**

- **Purpose**: Monotonically increasing number for ordering operations
- **Format**: Long integer starting from 1
- **Usage**: Ensures proper ordering of operations; critical for ACID compliance

## Iceberg Metadata Section

**`__iceberg_metadata`**
This nested object contains Iceberg-specific metadata:

**`schema_id: 1`**

- **Purpose**: Links to the schema version used for this record
- **Format**: Integer identifier
- **Usage**: Enables schema evolution while maintaining backward compatibility

**`partition_data`**
This object defines how the data is partitioned:

**`antenna_id: "antenna1"`**

- **Purpose**: Partition key for organizing data by antenna
- **Format**: String matching the main antenna_id field
- **Usage**: Enables efficient querying by antenna; improves query performance

**`update_day: "2025-07-02"`**

- **Purpose**: Date-based partition for time-series organization
- **Format**: YYYY-MM-DD date string
- **Usage**: Allows efficient queries by date range; enables data lifecycle management

**`file_path: "data/antenna1/2025/07/02/data.parquet"`**

- **Purpose**: Path to the physical data file in the data lake
- **Format**: Hierarchical path structure
- **Usage**: Iceberg uses this to locate actual data files; enables distributed storage

**`record_count: 1`**

- **Purpose**: Number of records in the associated data file
- **Format**: Integer count
- **Usage**: Optimization for query planning and statistics

**`file_size_bytes: 1024`**

- **Purpose**: Size of the data file in bytes
- **Format**: Integer byte count
- **Usage**: Storage optimization and query cost estimation

## Why This Structure Matters

1. **ACID Compliance**: The snapshot_id and sequence_number enable atomic transactions
1. **Schema Evolution**: Records can adapt to new schemas without breaking existing queries
1. **Time Travel**: Can query data as it existed at any previous snapshot
1. **Efficient Partitioning**: Data is organized by antenna and date for fast queries
1. **Audit Trail**: Complete history of when data was created and modified
1. **Soft Deletes**: Records can be “deleted” while preserving history

This structure transforms a simple game state into an enterprise-grade data format suitable for production systems with requirements for data governance, compliance, and advanced analytics.​​​​​​​​​​​​​​​​

