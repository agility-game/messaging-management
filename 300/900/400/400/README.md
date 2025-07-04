# 400 - Use Amazon Iceberg Format

In short, **Amazon Iceberg Format** is an open table format for large analytic datasets that provides ACID transactions, schema evolution, and time travel capabilities. It's designed to work with Amazon S3 and provides efficient query performance, data versioning, and seamless integration with various analytics engines like Apache Spark, Presto, and Amazon Athena. Iceberg format enables reliable data lake operations with atomic commits, concurrent writes, and efficient metadata management, making it ideal for building scalable data architectures in cloud environments. 

For Agility Game, this format allows anyone to easily query the documents in MongoDB and even allow for time travel, i.e. going back and forth in time how document changes effected the development within the game.

For a simple recording of a "Field", here is an example document following the Iceberg format:

```
...
```
