# Kafka Interview Q&A (Core Concepts) - 20 Questions

## 1) What is Apache Kafka, and why is it used?

**Answer:**

Apache Kafka is a **distributed event streaming platform** used to **publish, store, and process large volumes of events/messages** reliably and at scale.

### Why Kafka is used:
- **High throughput** for handling large event streams
- **Durable storage** because messages are written to disk
- **Scalable architecture** using partitions and brokers
- **Loose coupling** between producers and consumers
- **Replay capability** because consumers can read data again using offsets

### Common use cases:
- Log collection
- Event-driven microservices
- Real-time analytics
- Data pipeline integration
- Stream processing

---

## 2) What are the main components of Kafka architecture?

**Answer:**

### Main components:
- **Producer**: Sends messages to Kafka topics
- **Consumer**: Reads messages from Kafka topics
- **Broker**: Kafka server that stores and serves data
- **Topic**: Logical category or stream of messages
- **Partition**: A topic is split into partitions for scalability and ordering
- **Consumer Group**: A group of consumers sharing the work of reading a topic
- **ZooKeeper / KRaft**:
  - **ZooKeeper** was used earlier for broker metadata, controller election, and cluster coordination
  - **KRaft** is Kafka's newer built-in metadata quorum, removing the need for ZooKeeper

### Simple flow:
Producer -> Topic Partition on Broker -> Consumer Group reads records

---

## 3) What is a topic in Kafka?

**Answer:**

A **topic** is a logical channel or category where messages are published.

For example:
- `orders`
- `payments`
- `user-signups`

### Important points:
- Producers write to a topic
- Consumers read from a topic
- A topic is divided into **partitions**
- Kafka retains topic data for a configured time/size, even after consumers read it

Think of a topic as a named event stream.

---

## 4) What is a partition, and why does Kafka use partitions?

**Answer:**

A **partition** is an **ordered, append-only log** inside a topic.

### Why Kafka uses partitions:
- **Scalability**: topic data can be spread across multiple brokers
- **Parallelism**: multiple consumers can read different partitions in parallel
- **Higher throughput**: reads and writes are distributed
- **Ordering**: Kafka guarantees order **within a partition**

### Example:
If topic `orders` has 3 partitions:
- Partition 0
- Partition 1
- Partition 2

Kafka can distribute those partitions across brokers and consumers.

**Interview point:** Ordering is guaranteed per partition, not across the whole topic.

---

## 5) How does Kafka achieve high throughput and scalability?

**Answer:**

Kafka is fast because it is designed around **sequential disk writes** and **distributed parallel processing**.

### Reasons Kafka is highly performant:
- **Sequential append-only writes** are faster than random writes
- **Partitioning** allows load to be spread across brokers
- **Batching** lets producers and consumers handle many records efficiently
- **Compression** reduces network and storage overhead
- **Zero-copy style optimizations** help Kafka send data efficiently
- **Pull-based consumption** allows consumers to fetch data at their own pace
- **Horizontal scaling** is easy by adding more brokers and partitions

---

## 6) What is the difference between a Kafka producer and a consumer?

**Answer:**

- **Producer**:
  - Publishes records to Kafka topics
  - Can choose a partition directly or by key
  - Responsible for write-side reliability settings such as retries and `acks`

- **Consumer**:
  - Reads records from Kafka topics
  - Tracks progress using offsets
  - Usually belongs to a consumer group for parallel processing

### In short:
- Producer = writes data
- Consumer = reads data

---

## 7) What is a consumer group in Kafka?

**Answer:**

A **consumer group** is a set of consumers with the same `group.id` working together to consume a topic.

### Rules:
- Each partition is consumed by **only one consumer within the same group**
- Different consumer groups can read the same topic independently
- Consumer groups provide **scalability** and **fault tolerance**

### Example:
If a topic has 4 partitions and a consumer group has 2 consumers:
- Consumer A may read partitions 0 and 1
- Consumer B may read partitions 2 and 3

If another group reads the same topic, it gets its **own full copy of consumption progress**.

---

## 8) How does Kafka guarantee message ordering?

**Answer:**

Kafka guarantees message ordering **only within a single partition**.

### How it works:
- Records are appended to a partition in order
- Consumers read that partition in offset order
- If messages with the same key go to the same partition, their order is preserved

### Important limitation:
- Kafka does **not** guarantee global ordering across multiple partitions

### Best practice:
If order matters for a user, order ID, or account:
- Use that value as the **message key**
- Make sure all related messages go to the **same partition**

---

## 9) What is an offset in Kafka?

**Answer:**

An **offset** is the unique sequential position of a record within a partition.

### Important points:
- Offsets are **partition-specific**
- They help consumers know what has already been read
- Consumers can commit offsets to resume later
- Offsets also allow replay from an older position

### Example:
Partition 0 records may have offsets:
`0, 1, 2, 3, 4...`

Offset means position, not message ID across the full topic.

---

## 10) What is the difference between auto offset commit and manual offset commit?

**Answer:**

### Auto offset commit
- Kafka client commits offsets automatically at intervals
- Easier to configure
- Less control over when a message is considered processed
- Can cause **message loss or duplicates** if the app crashes at the wrong time

### Manual offset commit
- Application commits offsets explicitly
- More control
- Usually safer for real processing workflows
- Lets you commit only **after successful processing**

```properties
enable.auto.commit=false
```

**Interview point:** Manual commit is preferred when processing has side effects like DB writes or API calls.

---

## 11) What happens when a consumer in a consumer group fails?

**Answer:**

If a consumer fails, Kafka detects it through missed heartbeats.

### Then Kafka does this:
- Marks that consumer as unavailable
- Triggers a **rebalance**
- Reassigns that consumer's partitions to other active consumers in the same group

### Result:
- Consumption continues
- Some records may be reprocessed if offsets were not committed yet

This is how Kafka provides **fault tolerance** in consumer groups.

---

## 12) What is replication in Kafka, and why is it important?

**Answer:**

**Replication** means Kafka keeps multiple copies of a partition on different brokers.

### Why it matters:
- **Fault tolerance**: data survives broker failure
- **High availability**: another replica can take over
- **Durability**: reduces risk of data loss

### Example:
If a topic has:
- 3 partitions
- replication factor = 3

Each partition will have 3 copies across brokers.

**Interview point:** Replication improves reliability, not ordering or business logic correctness.

---

## 13) What is the difference between leader and follower replicas?

**Answer:**

For each partition, Kafka designates:

- **Leader replica**
  - Handles all reads and writes for that partition
  - Producers and consumers interact with the leader

- **Follower replica**
  - Copies data from the leader
  - Stays synchronized
  - Can become leader if the current leader fails

### In short:
- Leader = active replica
- Follower = backup replica

---

## 14) What is ISR (In-Sync Replica) in Kafka?

**Answer:**

**ISR** stands for **In-Sync Replicas**.

These are the replicas that are:
- Alive
- Replicating correctly
- Close enough to the leader to be considered safe for failover

### Why ISR matters:
- Kafka uses ISR to decide which replicas are eligible to become leader
- With `acks=all`, the producer waits for confirmation from the leader after the record is replicated to the required in-sync replicas

### Related concept:
`min.insync.replicas` controls the minimum number of in-sync replicas required for safer writes.

---

## 15) What is the purpose of ZooKeeper in Kafka?

**Answer:**

### In older Kafka architecture, ZooKeeper was used for:
- Cluster metadata management
- Broker registration
- Controller election
- Coordination tasks

### What changed with KRaft mode?
- Kafka introduced **KRaft (Kafka Raft Metadata mode)**
- Metadata is now managed by Kafka itself using an internal Raft-based quorum
- This removes the external ZooKeeper dependency
- Architecture becomes simpler to operate and scale

### Interview summary:
- **ZooKeeper** = old metadata/coordination layer
- **KRaft** = modern built-in replacement

---

## 16) What delivery guarantees does Kafka provide?

**Answer:**

Kafka supports three main delivery guarantees:

### 1) At-most-once
- Message may be lost
- Message is not processed more than once
- Happens when offsets are committed before successful processing, or retries are disabled

### 2) At-least-once
- Message is not lost in normal failure scenarios
- Message may be processed more than once
- Most common model in real systems

### 3) Exactly-once
- Message is processed once from Kafka's perspective
- Requires **idempotent producers** and **transactions**
- Most useful when consuming from Kafka and writing back to Kafka

```properties
enable.idempotence=true
acks=all
```

**Important:** Exactly-once for external systems still needs careful design or idempotent side effects.

---

## 17) What is the difference between Kafka and traditional message brokers like RabbitMQ?

**Answer:**

Kafka and RabbitMQ both move messages, but they are optimized for different patterns.

### Kafka
- Distributed event streaming platform
- Stores messages as an append-only log
- Consumers track offsets themselves
- Strong replay capability
- Better suited for high-throughput event streams and data pipelines

### RabbitMQ
- Traditional message broker
- Queue-based messaging model
- Strong routing features using exchanges
- Often used for task queues, request/reply, and more complex broker-side routing

### Simple interview comparison:
- **Kafka** is stronger for streaming, replay, and very large-scale event pipelines
- **RabbitMQ** is stronger for classic queueing and flexible routing patterns

---

## 18) What are Kafka producers' acks settings, and how do they affect reliability?

**Answer:**

The `acks` setting defines how many broker acknowledgments the producer waits for before considering a write successful.

### `acks=0`
- Producer does not wait for broker acknowledgment
- Fastest
- Highest risk of data loss

### `acks=1`
- Producer waits only for leader acknowledgment
- Better than `acks=0`
- Data can still be lost if leader fails before followers replicate it

### `acks=all` (or `-1`)
- Producer waits for all required in-sync replicas
- Strongest durability
- Slightly higher latency

```properties
acks=all
enable.idempotence=true
retries=2147483647
```

**Interview point:** For strong reliability, use `acks=all` with replication and proper `min.insync.replicas`.

---

## 19) What is log retention in Kafka, and how does Kafka store messages?

**Answer:**

Kafka stores messages on disk as an **append-only log**, split into partition files called **log segments**.

### How messages are stored:
- Each topic partition is a log
- New records are appended at the end
- Records are identified by offsets
- Data is retained based on policy, not whether consumers already read it

### Retention types:
- **Time-based retention**: keep data for a configured duration
- **Size-based retention**: keep data until log size limit is reached

### Related concept:
- **Log compaction** keeps the latest value for each key instead of keeping every old record forever

**Interview point:** Kafka does not delete a message immediately after consumption like a traditional queue.

---

## 20) How do you handle duplicate messages in Kafka consumers?

**Answer:**

Duplicates can happen in Kafka, especially with **at-least-once** delivery.

### Common ways to handle duplicates:
- Make processing **idempotent**
- Store and check a **unique event ID**
- Use **upsert** instead of blind insert
- Commit offsets only after successful processing
- Use transactional or exactly-once patterns where applicable

### Example strategies:
- Maintain a processed-event table in the database
- Use a business key like `orderId` to avoid double updates
- Design downstream APIs to safely accept retries

**Interview point:** In real systems, duplicate handling is usually a consumer responsibility.
