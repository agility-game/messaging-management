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
