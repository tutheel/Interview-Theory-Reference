# PostgreSQL & Data Modeling Interview Questions

## Abbreviations and Full Forms

- `MVCC`: Multi-Version Concurrency Control
- `WAL`: Write-Ahead Logging
- `GIN`: Generalized Inverted Index
- `GiST`: Generalized Search Tree
- `CTE`: Common Table Expression
- `ACID`: Atomicity, Consistency, Isolation, Durability
- `UUID`: Universally Unique Identifier
- `JSONB`: JavaScript Object Notation Binary
- `HOT`: Heap-Only Tuple
- `PITR`: Point-In-Time Recovery
- `RLS`: Row-Level Security
- `FDW`: Foreign Data Wrapper
- `SQL`: Structured Query Language
- `NoSQL`: Not Only SQL
- `RDBMS`: Relational Database Management System
- `CAP`: Consistency, Availability, Partition Tolerance
- `OLTP`: Online Transaction Processing
- `ETL`: Extract, Transform, Load
- `DDL`: Data Definition Language
- `DML`: Data Manipulation Language
- `HA`: High Availability
- `DR`: Disaster Recovery
- `CPU`: Central Processing Unit
- `I/O`: Input/Output
- `DB`: Database

## Detailed Q&A (with examples)
1. **What is PostgreSQL?**
   PostgreSQL is an open-source relational database known for reliability, SQL compliance, and advanced features like JSONB, indexing types, and strong transactional guarantees.
   Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
   Example: Teams use PostgreSQL for OLTP systems where consistency and complex querying matter.

2. **What is MVCC (Multi-Version Concurrency Control)?**
   MVCC (Multi-Version Concurrency Control) lets readers and writers work concurrently by keeping row versions instead of blocking reads during writes.
   Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
   Example: While one transaction updates an order row, another transaction can still read the older committed version.

   ```text
   Tx A: UPDATE row (new version)
   Tx B: SELECT row (sees old committed version)
   Commit A -> future readers see new version
   ```

3. **What is WAL (Write-Ahead Logging)?**
   WAL (Write-Ahead Log) records changes to log files before the data files are updated, which guarantees crash recovery and supports replication.
   Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
   Example: If the server crashes mid-write, PostgreSQL replays WAL to restore a consistent state.

4. **What is checkpoint?**
   A checkpoint flushes dirty pages from memory to disk and marks a recovery point in WAL.
   Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
   Example: More frequent checkpoints reduce crash recovery time but can increase regular I/O pressure.

5. **What is autovacuum?**
   Autovacuum automatically removes dead tuples and updates planner statistics.
   Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
   Example: In a busy orders table with frequent updates, autovacuum prevents table bloat and bad plans.

6. **What is index?**
   An index is an auxiliary structure that speeds up lookups by avoiding full table scans.
   Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
   Example: `WHERE email = 'a@b.com'` becomes fast with an index on `email`.

7. **What is B-tree index?**
   B-tree is PostgreSQL's default index type and works well for equality, ranges, sorting, and prefix conditions.
   Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
   Example: `WHERE created_at >= now() - interval '7 days'` can use a B-tree index on `created_at`.

8. **What is GIN (Generalized Inverted Index) index?**
   GIN (Generalized Inverted Index) is best for columns containing many tokens/values, such as JSONB, arrays, and full-text vectors.
   Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
   Example: Searching JSONB tags or `to_tsvector` text benefits from GIN.

9. **What is GiST (Generalized Search Tree) index?**
   GiST is a flexible index framework used for geometric data, ranges, nearest-neighbor, and extension operators.
   Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
   Example: PostGIS location queries often rely on GiST indexes.

10. **What is partial index?**
    A partial index indexes only rows that match a predicate, reducing size and write cost.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Index only active rows in a soft-delete table.

    ```sql
    CREATE INDEX idx_users_active_email
    ON users (email)
    WHERE deleted_at IS NULL;
    ```

11. **What is composite index?**
    A composite index covers multiple columns, and column order determines how well queries can use it.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: `(tenant_id, created_at)` helps tenant-filtered time-range queries.

12. **What is foreign key?**
    A foreign key enforces referential integrity between child and parent tables.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: `orders.customer_id` must exist in `customers.id`.

13. **What is primary key?**
    A primary key uniquely identifies each row and is always `UNIQUE` and `NOT NULL`.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: `users(id bigint generated always as identity primary key)`.

14. **What is unique constraint?**
    A unique constraint prevents duplicate values for one column or a column set.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: `UNIQUE (tenant_id, email)` allows same email across tenants but not inside one tenant.

15. **What is check constraint?**
    A check constraint enforces domain rules at the database level.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Ensure amount is non-negative.

    ```sql
    ALTER TABLE payments
    ADD CONSTRAINT chk_amount_non_negative
    CHECK (amount >= 0);
    ```

16. **What is normalization?**
    Normalization is the process of structuring tables to reduce redundancy and prevent update anomalies.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Move repeating address data into a separate `addresses` table.

17. **What is 1NF?**
    First Normal Form requires atomic values and no repeating groups in a row.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Avoid storing `phone_numbers` as a comma-separated string.

18. **What is 2NF?**
    Second Normal Form requires 1NF and removal of partial dependencies on a composite key.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: In `(order_id, product_id)` table, product name should depend on `product_id`, not the pair.

19. **What is 3NF?**
    Third Normal Form requires 2NF and no transitive dependencies on non-key columns.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: If `zip -> city`, store zip reference, not repeated city text everywhere.

20. **What is denormalization?**
    Denormalization intentionally duplicates data to reduce joins and improve read performance.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Store `customer_name` on an `order_summary` table for fast dashboard queries.

21. **What is join?**
    A join combines rows from two or more tables based on a relationship.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Join `orders` with `customers` to return order plus customer profile.

22. **What is left join?**
    LEFT JOIN returns all rows from left table and matching rows from right table.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Show all customers, including those with zero orders.

23. **What is full join?**
    FULL JOIN returns all matched rows plus unmatched rows from both sides with NULLs.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Reconcile records from two systems and find missing entries on either side.

    ```text
    LEFT only  +  BOTH  +  RIGHT only
    ```

24. **What is inner join?**
    INNER JOIN returns only rows where the join condition matches in both tables.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Orders that have a valid customer row.

25. **What is self join?**
    A self join joins a table to itself, commonly for hierarchies.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: `employees e` joined to `employees m` for manager relationship.

26. **What is subquery?**
    A subquery is a query inside another query.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: `WHERE id IN (SELECT user_id FROM admins)`.

27. **What is CTE (Common Table Expression)?**
    A CTE (Common Table Expression) is a named subquery written with `WITH`, often improving readability.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Break a complex report into steps.

28. **What is recursive CTE?**
    A recursive CTE repeatedly references itself to walk hierarchical data.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Expand category tree from root to leaves.

    ```sql
    WITH RECURSIVE tree AS (
      SELECT id, parent_id, name, 1 AS depth
      FROM categories
      WHERE parent_id IS NULL
      UNION ALL
      SELECT c.id, c.parent_id, c.name, t.depth + 1
      FROM categories c
      JOIN tree t ON c.parent_id = t.id
    )
    SELECT * FROM tree;
    ```

29. **What is EXPLAIN?**
    `EXPLAIN` shows the query planner's chosen plan without executing the query.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Use it before adding an index to understand whether a seq scan is expected.
    Example command: `EXPLAIN SELECT * FROM orders WHERE tenant_id = 42;`

30. **What is EXPLAIN ANALYZE?**
    `EXPLAIN ANALYZE` executes the query and shows actual timing/rows per step.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Compare estimated rows vs actual rows to detect stale statistics.
    Example command: `EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE tenant_id = 42;`

31. **What is query planner?**
    The planner decides how to execute SQL using statistics and cost rules.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: It chooses between index scan, bitmap scan, or seq scan.

32. **What is cost estimation?**
    Cost estimation is PostgreSQL's internal estimate of work (CPU, I/O) for each plan.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: A lower estimated total cost plan is usually selected, even if estimates can be wrong.

33. **What is deadlock?**
    A deadlock occurs when transactions wait on each other in a cycle; PostgreSQL cancels one transaction.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Tx A locks row 1 then needs row 2, while Tx B locks row 2 then needs row 1.

34. **What is isolation level?**
    Isolation level defines how transaction visibility works under concurrency.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Choose `READ COMMITTED` for normal workloads and `SERIALIZABLE` for strongest correctness.

35. **What is read committed?**
    `READ COMMITTED` gives each statement its own snapshot of committed data.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Two SELECTs in one transaction can see different committed results.

36. **What is repeatable read?**
    `REPEATABLE READ` gives one consistent snapshot for the whole transaction.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Re-reading the same row returns the same version during that transaction.

37. **What is serializable?**
    `SERIALIZABLE` enforces behavior equivalent to running transactions one-by-one.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: It may abort one transaction with serialization failure; application should retry.

38. **What is phantom read?**
    Phantom read is when repeated range queries see new/deleted rows from concurrent commits.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: `count(*) where status='open'` changes between reads in the same transaction.

39. **What is row lock?**
    Row lock protects selected rows from conflicting modifications.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: `SELECT ... FOR UPDATE` before deducting account balance.

40. **What is table lock?**
    Table lock applies at whole-table level and can block broader operations.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Some DDL statements require stronger table locks than normal DML.

41. **What is transaction?**
    A transaction is a unit of work that either fully commits or fully rolls back.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Transfer money by debiting one account and crediting another in one transaction.

42. **What is savepoint?**
    A savepoint marks a point inside a transaction for partial rollback.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Roll back one failed item in a batch while keeping earlier successful items.

43. **What is rollback?**
    `ROLLBACK` undoes uncommitted changes.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: If step 3 fails in a 5-step transaction, rollback to maintain consistency.

44. **What is commit?**
    `COMMIT` makes transaction changes durable and visible.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: After successful inventory update + order insert, commit both.

45. **What is ACID (Atomicity, Consistency, Isolation, Durability)?**
    ACID means Atomicity, Consistency, Isolation, Durability.
    Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
    Example: Financial systems rely on ACID so partial writes never corrupt balances.

46. **What is indexing strategy?**
    Indexing strategy is deliberate index design based on real query patterns and write budget.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Add indexes for top slow predicates, avoid indexing every column.

47. **What is partitioning?**
    Partitioning splits a large table into smaller pieces by key, improving manageability and query pruning.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: `events` partitioned monthly by `created_at`.

    ```text
    events
    |- events_2026_01
    |- events_2026_02
    |- events_2026_03
    ```

48. **What is range partition?**
    Range partitioning routes rows based on value intervals.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Orders by month or year.

49. **What is hash partition?**
    Hash partitioning distributes rows using hash of key for balanced write spread.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Partition by `tenant_id` when tenant IDs are uneven over time.

50. **What is vacuum?**
    `VACUUM` cleans dead tuples and updates visibility metadata.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Prevent bloat in frequently updated tables.
    Example command: `VACUUM (VERBOSE, ANALYZE) orders;`

51. **What is analyze?**
    `ANALYZE` collects column statistics used by the planner.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: After bulk load, run `ANALYZE` so planner stops choosing poor scans.
    Example command: `ANALYZE orders;`

52. **What is materialized view?**
    A materialized view stores query output physically and must be refreshed.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Daily sales summary precomputed for dashboards.

53. **What is view?**
    A view is a virtual table defined by a SQL query.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Expose `active_users_view` and hide deleted rows by default.

54. **What is trigger?**
    A trigger automatically runs function logic on table events.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Auto-fill `updated_at` on every row update.

55. **What is function?**
    A function is reusable server-side routine returning value(s).
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: `calculate_tax(amount numeric)` used across queries.

56. **What is stored procedure?**
    A stored procedure (invoked with `CALL`) can include transaction control logic.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Multi-step ETL workflow handled in DB-side procedure.

57. **What is sequence?**
    A sequence generates incrementing numbers independent of table rows.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Identity columns are often backed by sequences.

58. **What is UUID (Universally Unique Identifier)?**
    UUID is a 128-bit identifier with very low collision probability.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Useful when IDs are generated across distributed services.

59. **What is connection pooling?**
    Connection pooling reuses DB connections instead of creating one per request.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Web APIs with short requests rely on pooling to avoid connection overhead.

    ```text
    App workers -> Pool (50 conns) -> PostgreSQL
    ```

60. **What is N+1 problem?**
    N+1 happens when one query fetches N parent rows and then runs N additional child queries.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Fetch users, then fetch orders per user in a loop. Fix with join/batch loading.

    ```sql
    -- Better: one query instead of N+1
    SELECT u.id, u.name, o.id AS order_id
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    WHERE u.tenant_id = 10;
    ```

61. **What is foreign key cascade?**
    Cascade rules automate child-row action when parent rows change.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: `ON DELETE CASCADE` removes line items automatically when order is deleted.

62. **What is data migration?**
    Data migration is controlled movement/transformation of existing data during schema or system changes.
    Why it matters: This keeps releases safe and repeatable across environments; good migration discipline reduces deployment risk.
    Example: Split `full_name` into `first_name` and `last_name` safely in phases.

63. **What is schema versioning?**
    Schema versioning tracks and applies ordered DB changes across environments.
    Why it matters: This keeps releases safe and repeatable across environments; good migration discipline reduces deployment risk.
    Example: `V42__add_orders_index.sql` runs once and is recorded.

64. **What is audit log design?**
    Audit design captures who changed what, when, and often previous/new values.
    Why it matters: This is core to least-privilege design and compliance; mature systems must enforce access boundaries at the database layer.
    Example: Store `actor_id`, `action`, `entity_id`, `old_data`, `new_data`, `changed_at`.

65. **What is multi-tenant schema?**
    Multi-tenancy stores many tenants in one system with isolation via DB-per-tenant, schema-per-tenant, or row-per-tenant.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Row-level model with mandatory `tenant_id` in each table.

66. **What is row-level security?**
    RLS enforces per-row access rules directly in PostgreSQL.
    Why it matters: This is core to least-privilege design and compliance; mature systems must enforce access boundaries at the database layer.
    Example: A user can only select rows where `tenant_id = current_setting('app.tenant_id')`.

    ```sql
    ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
    CREATE POLICY tenant_isolation ON invoices
      USING (tenant_id = current_setting('app.tenant_id')::int);
    ```

67. **What is index selectivity?**
    Selectivity is how well a predicate narrows rows; high selectivity usually means index is useful.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: `email` is highly selective; `is_active` may be low selective.

68. **What is composite key?**
    Composite key uses multiple columns as the unique identifier.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: `PRIMARY KEY (tenant_id, external_id)`.

69. **What is surrogate key?**
    Surrogate key is artificial identifier (identity/UUID) with no business meaning.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: `id bigint generated always as identity`.

70. **What is natural key?**
    Natural key is a business-meaningful identifier.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: ISO country code can be natural key in a countries table.

71. **What is JSONB (JavaScript Object Notation Binary)?**
    JSONB stores JSON in a binary format with indexing and operators.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Keep flexible attributes while still querying specific keys.

    ```sql
    CREATE INDEX idx_products_attrs ON products USING gin (attributes);
    SELECT * FROM products WHERE attributes @> '{"color":"black"}';
    ```

72. **What is full text search?**
    Full text search tokenizes text and ranks matches, better than plain `LIKE` for document search.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Search article body with stemming and relevance ranking.

73. **What is replication?**
    Replication copies primary changes to other nodes for availability and read scaling.
    Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
    Example: One primary plus two replicas for reporting and failover.
    Example command: `SELECT client_addr, state, sync_state FROM pg_stat_replication;`

74. **What is streaming replication?**
    Streaming replication sends WAL continuously from primary to standbys.
    Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
    Example: Replica lag is usually seconds or less under healthy network/load.
    Example command: `SELECT now() - pg_last_xact_replay_timestamp() AS replay_delay;`

    ```text
    Primary --WAL stream--> Replica A
            --WAL stream--> Replica B
    ```

75. **What is logical replication?**
    Logical replication publishes row-level changes per table/publication.
    Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
    Example: Replicate only customer-facing tables to analytics service.

76. **What is failover?**
    Failover is promoting a standby to primary when primary is unavailable.
    Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
    Example: Orchestrator detects failure and switches application endpoint.

77. **What is read replica?**
    Read replica is a standby used for read-only workloads.
    Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
    Example: Route heavy reporting queries to replica to protect primary latency.

78. **What is write amplification?**
    Write amplification means one logical change causes multiple physical writes (table + indexes + WAL).
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Wide table with many indexes increases write cost per insert/update.

79. **What is foreign key index?**
    It is an index on child FK columns to speed joins and FK checks.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Without it, deleting parent rows can trigger expensive scans on child table.

80. **What is dead tuple?**
    Dead tuple is an old row version no longer visible to active transactions.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Frequent updates create dead tuples until vacuum cleans them.

81. **What is HOT (Heap-Only Tuple) update?**
    HOT (Heap-Only Tuple) update avoids index updates when indexed columns are unchanged.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: Updating `last_seen_at` can be cheaper if that column is not indexed.

82. **What is WAL archiving?**
    WAL archiving copies completed WAL segments to long-term storage.
    Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
    Example: Required for robust PITR beyond local disk WAL retention.

83. **What is role?**
    A role is PostgreSQL identity for login and permissions.
    Why it matters: This is core to least-privilege design and compliance; mature systems must enforce access boundaries at the database layer.
    Example: Separate `app_read`, `app_write`, and `app_admin` roles.

84. **What is privilege?**
    Privilege is permission to perform action on object.
    Why it matters: This is core to least-privilege design and compliance; mature systems must enforce access boundaries at the database layer.
    Example: `SELECT` on tables, `USAGE` on schema, `EXECUTE` on function.

85. **What is GRANT?**
    `GRANT` gives privileges to roles.
    Why it matters: This is core to least-privilege design and compliance; mature systems must enforce access boundaries at the database layer.
    Example: `GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read;`.

86. **What is REVOKE?**
    `REVOKE` removes privileges previously granted.
    Why it matters: This is core to least-privilege design and compliance; mature systems must enforce access boundaries at the database layer.
    Example: Revoke write access during incident containment.

87. **What is default value?**
    A default value is applied when insert omits a column.
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: `created_at timestamptz NOT NULL DEFAULT now()`.

88. **What is constraint violation?**
    It is an error when data breaks defined constraints.
    Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
    Example: Inserting duplicate email into unique column raises `23505`.

89. **What is index scan?**
    Index scan navigates index then fetches rows from heap.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Good for selective predicates returning small subset.

90. **What is sequential scan?**
    Sequential scan reads full table pages in order.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Faster than index for small tables or low-selectivity filters.

91. **What is bitmap index scan?**
    Bitmap scan combines index hits into bitmap, then reads heap pages efficiently.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Useful for moderate selectivity or multiple index conditions.

92. **What is execution plan?**
    Execution plan is the operator tree PostgreSQL executes (scan, join, aggregate, sort).
    Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
    Example: A nested loop may be fine for small outer rows, bad for large ones.

93. **What is cardinality?**
    Cardinality is row count (actual or estimated) at table or plan node.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Wrong cardinality estimates often lead to wrong join strategy.

94. **What is latency optimization?**
    Latency optimization reduces end-to-end query response time.
    Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
    Example: Add right index, remove unnecessary columns, avoid N+1, cache hot reads.

95. **What is connection leak?**
     Connection leak happens when app code does not return connections to pool.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Missing `finally { client.release(); }` eventually causes request timeouts.

96. **What is schema?**
     A schema is a namespace that groups DB objects.
     Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
     Example: `app`, `audit`, and `reporting` schemas separate concerns.

97. **What is covering index?**
     Covering index includes queried output columns to reduce heap visits.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: `CREATE INDEX ... ON orders (tenant_id, created_at) INCLUDE (total_amount);`.

98. **What is index-only scan?**
     Index-only scan returns data from index without heap fetch when visibility map allows it.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Common on well-vacuumed read-heavy tables.

99. **What is data type?**
     Data type defines valid values, storage layout, and operations.
     Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
     Example: Choosing `numeric(12,2)` over `float` for money avoids precision surprises.

100. **What is numeric precision?**
     Precision is total digits; scale is digits after decimal.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: `numeric(10,2)` stores up to 99999999.99.

101. **What is timestamp?**
     Timestamp stores date+time; choose with/without timezone carefully.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: `timestamptz` is preferred for global systems.

102. **What is timezone handling?**
     Store in `timestamptz` (UTC internally), convert only at presentation layer.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: User sees local time in UI while DB stays consistent globally.

103. **What is array column?**
     Array column stores multiple same-type values in one column.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: `text[]` for small tag lists, but use join tables when relationships grow complex.

104. **What is extension?**
     Extension adds packaged capabilities to PostgreSQL.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: `pgcrypto` for UUID generation, `postgis` for geospatial queries.

105. **What is pg_stat_activity?**
     `pg_stat_activity` shows active sessions, queries, wait events, and states.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Identify long-running query blocking others.
     Example command: `SELECT pid, usename, state, wait_event_type, query FROM pg_stat_activity ORDER BY query_start NULLS LAST LIMIT 20;`

106. **What is lock monitoring?**
     Lock monitoring tracks who is blocking whom.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: Join `pg_locks` with `pg_stat_activity` to find blocker PID and SQL.
     Example command: `SELECT blocked.pid AS blocked_pid, blocker.pid AS blocker_pid FROM pg_locks bl JOIN pg_locks kl ON bl.locktype = kl.locktype AND bl.pid <> kl.pid AND NOT bl.granted AND kl.granted JOIN pg_stat_activity blocked ON bl.pid = blocked.pid JOIN pg_stat_activity blocker ON kl.pid = blocker.pid;`

107. **What is autovacuum tuning?**
     Tuning adjusts thresholds and scale factors per table to match write churn.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Lower thresholds on hot tables to control bloat sooner.
     Example command: `ALTER TABLE orders SET (autovacuum_vacuum_scale_factor = 0.02, autovacuum_analyze_scale_factor = 0.01);`

108. **What is statistics target?**
     Statistics target controls detail of collected stats for planner.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Increase target on skewed columns used in filters.
     Example command: `ALTER TABLE orders ALTER COLUMN status SET STATISTICS 500; ANALYZE orders;`

109. **What is parallel query?**
     Parallel query uses worker processes to speed scans/aggregations.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Large analytics query can use multiple CPUs with parallel plan.

110. **What is sharding?**
     Sharding distributes data horizontally across multiple databases or nodes.
     Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
     Example: Tenant-based sharding keeps each shard smaller and easier to scale.

111. **What is connection timeout?**
     Connection timeout is max time to establish DB connection before failing.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Fail fast in app when DB is unreachable instead of hanging threads.
     Example command: `psql "postgresql://user:pass@db-host:5432/appdb?connect_timeout=5"`

112. **What is transaction timeout?**
     Transaction timeout limits long-running statements/transactions to protect system health.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: Use `statement_timeout` and `idle_in_transaction_session_timeout`.
     Example command: `SET statement_timeout = '30s'; SET idle_in_transaction_session_timeout = '60s';`

113. **What is constraint deferrable?**
     Deferrable constraint can be checked at commit time instead of each statement.
     Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
     Example: Useful when temporarily violating FK during batch reorder updates.

114. **What is lock wait timeout?**
     `lock_timeout` aborts statement if lock wait exceeds configured threshold.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: Prevent API requests from waiting indefinitely on blocked rows.
     Example command: `SET lock_timeout = '3s';`

115. **What is index maintenance?**
     Index maintenance means measuring usage/bloat, dropping unused indexes, and rebuilding bloated ones.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Keep only indexes that support real workload.

116. **What is reindex?**
     `REINDEX` rebuilds index to fix heavy bloat or corruption.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: `REINDEX INDEX CONCURRENTLY idx_orders_created_at;` in production.

117. **What is backup strategy?**
     Backup strategy defines full/incremental cadence, WAL retention, restore testing, and ownership.
     Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
     Example: Nightly base backup + continuous WAL archiving + monthly recovery drill.
     Example command: `pg_basebackup -h primary-db -D /var/backups/base -U replicator -Fp -Xs -P`

118. **What is PITR (Point-In-Time Recovery)?**
     Point-In-Time Recovery restores DB to a specific timestamp or LSN.
     Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
     Example: Recover state right before accidental `DELETE` at 10:37:12 UTC.

119. **What is restore procedure?**
     Restore procedure is documented, repeatable recovery runbook from backup and WAL.
     Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
     Example: New instance restore, replay to target time, validate checks, cutover.
     Example command: `pg_restore -d appdb --clean --if-exists backup.dump`

120. **What is retention policy?**
     Retention policy sets how long backups/WAL/logs are kept.
     Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
     Example: Keep 35 days operational backups and 1 year monthly snapshots.

121. **What is database size optimization?**
     It is reducing storage and I/O by cleaning old data, controlling bloat, and using right data types.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Archive stale events and partition/drop old partitions.

122. **What is cluster command?**
     `CLUSTER` rewrites table physically ordered by an index.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Helpful for range scans on correlated data but requires maintenance window.

123. **What is performance tuning?**
     Performance tuning is iterative measurement and optimization of SQL, schema, and DB settings.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Start with slow query logs, then tune highest-impact queries first.

124. **What is workload analysis?**
     Workload analysis profiles read/write mix, hot tables, peak hours, and query shapes.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: OLTP workload needs different tuning than reporting workload.

125. **What is batch insert?**
     Batch insert writes many rows per statement/transaction to reduce round trips.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Use multi-row `INSERT` or `COPY` for large imports.
     Example command: `COPY orders (id, tenant_id, amount) FROM '/tmp/orders.csv' WITH (FORMAT csv, HEADER true);`

126. **What is bulk update?**
     Bulk update modifies many rows efficiently, often in chunks.
     Why it matters: This affects query latency, throughput, and hardware cost; strong answers show how to diagnose and tune production workloads.
     Example: Update 10k-row chunks to limit lock duration and WAL spikes.

127. **What is audit trigger?**
     Audit trigger writes change metadata to audit table automatically.
     Why it matters: This is core to least-privilege design and compliance; mature systems must enforce access boundaries at the database layer.
     Example: Log old/new values on update for compliance traceability.

128. **What is unique violation handling?**
     Handle uniqueness races using upsert or controlled retry.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: `INSERT ... ON CONFLICT DO UPDATE` for idempotent writes.

129. **What is transaction isolation anomaly?**
     It is incorrect concurrent behavior like dirty reads, non-repeatable reads, phantoms, or write skew.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: Two doctors both on-call check and both mark themselves off-call due to snapshot anomaly.

130. **What is pessimistic locking?**
     Pessimistic locking blocks conflicting writers early using explicit locks.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: `SELECT ... FOR UPDATE` in inventory reservation.

131. **What is optimistic locking?**
     Optimistic locking allows concurrent edits and detects collision at update time.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: `UPDATE ... WHERE id = ? AND version = ?` then increment version.

132. **What is version column?**
     Version column tracks row revision count for optimistic concurrency control.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: If update affects 0 rows, client retries because version changed.

133. **What is schema separation?**
     Schema separation isolates objects by domain/team/tenant boundary.
     Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
     Example: `billing.*` separated from `identity.*` to simplify permissions.

134. **What is test database strategy?**
     Test DB strategy ensures repeatable, isolated tests with known schema and data.
     Why it matters: This keeps releases safe and repeatable across environments; good migration discipline reduces deployment risk.
     Example: Spin up disposable DB per test suite and run migrations fresh.

135. **What is soft delete?**
     Soft delete marks rows as deleted instead of physically removing them.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: `deleted_at` timestamp enables restore and audit.

136. **What is hard delete?**
     Hard delete permanently removes row data.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Required for strict privacy erasure requests after retention checks.

137. **What is composite foreign key?**
     Composite FK references multi-column key in parent table.
     Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
     Example: `(tenant_id, product_id)` child FK to parent composite PK.

138. **What is concurrency control?**
     Concurrency control coordinates transactions so correctness is preserved under parallel load.
     Why it matters: This protects correctness under concurrent requests; interviewers expect you to explain anomaly prevention and retry/locking strategy.
     Example: MVCC + locks + isolation level selection work together.

139. **What is data consistency strategy?**
     Consistency strategy combines transactions, constraints, idempotency, and reconciliation jobs.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Outbox pattern for reliable cross-service updates.

140. **What is replication lag?**
     Replication lag is delay between primary commit and replica replay.
     Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
     Example: Read-after-write on replica may return stale data under lag.
     Example command: `SELECT now() - pg_last_xact_replay_timestamp() AS replica_delay;`

141. **What is replication slot?**
     Replication slot tracks subscriber progress and prevents early WAL removal.
     Why it matters: This drives high availability and disaster recovery posture; weak understanding can lead to data loss or long outage during incidents.
     Example: Monitor inactive slots to avoid unbounded WAL disk growth.
     Example command: `SELECT slot_name, active, restart_lsn, wal_status FROM pg_replication_slots;`

142. **What is DB (Database) connection exhaustion?**
     It occurs when incoming requests exceed available DB connections.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Burst traffic without pool limits can exhaust `max_connections` quickly.

143. **What is schema optimization?**
     Schema optimization aligns table design, keys, constraints, and types with access patterns.
     Why it matters: This determines long-term data model quality, maintainability, and query clarity as your system grows.
     Example: Move large optional payload columns to side table to keep hot rows narrow.

144. **What is write-heavy optimization?**
     Optimize write-heavy systems by minimizing indexes, batching writes, and tuning checkpoints/autovacuum/WAL.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Use append-friendly schema and defer expensive secondary updates.

145. **What is read-heavy optimization?**
     Optimize read-heavy systems with selective indexes, read replicas, caching, and pre-aggregated views.
     Why it matters: This is a frequent interview topic used to evaluate your practical PostgreSQL decision-making in real systems.
     Example: Materialized summary table for dashboard queries every 5 minutes.

146. **How do you add a new column in PostgreSQL using ALTER TABLE ADD COLUMN?**
   Use `ALTER TABLE ... ADD COLUMN` with column name and data type; this is the standard schema-evolution command.
   Why it matters: Schema changes are frequent in production, so you must know safe DDL (Data Definition Language) patterns.
   Example: Add a nullable text column to users.

   ```sql
ALTER TABLE users
ADD COLUMN middle_name text;
   ```

147. **How do you add multiple columns in one ALTER TABLE statement?**
   PostgreSQL lets you chain multiple `ADD COLUMN` actions in one statement, which is useful for grouped schema changes.
   Why it matters: This reduces migration noise and keeps related schema updates together in one versioned step.
   Example: Add `city` and `postal_code` in a single migration.

   ```sql
ALTER TABLE customers
ADD COLUMN city text,
ADD COLUMN postal_code text;
   ```

148. **How do you safely add a NOT NULL column to a non-empty table?**
   Use an expand-and-contract migration: add nullable column, backfill in batches, set default, then enforce `NOT NULL`.
   Why it matters: Directly adding a strict column can lock or fail on existing rows; phased rollout avoids downtime risk.
   Example: Add `status` to a large `orders` table without breaking writes.

   ```sql
ALTER TABLE orders ADD COLUMN status text;
-- backfill in controlled batches
UPDATE orders SET status = 'PENDING' WHERE status IS NULL;
ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'PENDING';
ALTER TABLE orders ALTER COLUMN status SET NOT NULL;
   ```

149. **When should you use IF NOT EXISTS with ADD COLUMN?**
   Use `ADD COLUMN IF NOT EXISTS` in idempotent migrations to avoid failure when reruns or partial deployments happen.
   Why it matters: Real pipelines may retry migrations; idempotent DDL improves reliability across environments.
   Example: Safe re-run when `last_login_at` might already exist.

   ```sql
ALTER TABLE users
ADD COLUMN IF NOT EXISTS last_login_at timestamptz;
   ```

150. **How do defaults behave when adding a new column?**
   A default defines the value for new inserts; for existing rows, set/backfill explicitly when business logic requires uniform values.
   Why it matters: Misunderstanding defaults leads to mixed historical data and inconsistent query behavior.
   Example: Ensure old and new rows both have `is_active = true`.

   ```sql
ALTER TABLE accounts ADD COLUMN is_active boolean DEFAULT true;
UPDATE accounts SET is_active = true WHERE is_active IS NULL;
   ```

151. **What is CAP theorem (Consistency, Availability, Partition Tolerance) in database system design?**
   CAP states that during a network partition, a distributed system must choose between strict consistency and availability; partition tolerance is required in distributed networks.
   Why it matters: This is a core architectural tradeoff when designing global, multi-node data systems.
   Example: A strongly consistent design may reject requests during partition, while an available design may serve stale data.

152. **How do you choose SQL (Structured Query Language) vs NoSQL (Not Only SQL) in system design?**
   Choose SQL for strong relational constraints and transactions; choose NoSQL for flexible schema or very large horizontal scale patterns.
   Why it matters: Interviewers expect explicit reasoning based on access patterns, consistency requirements, and growth model.
   Example: Payments ledger fits SQL; large event or document workloads may fit NoSQL.

153. **What is monolithic vs distributed database architecture?**
   Monolithic architecture keeps one primary database system, while distributed architecture spreads data/services across nodes or regions.
   Why it matters: Architecture choice impacts latency, failure domains, operational complexity, and scaling strategy.
   Example: Early-stage products often begin monolithic, then evolve to distributed patterns under scale.

154. **What consistency models matter in DB system design?**
   Common models are strong consistency, eventual consistency, and session-level guarantees like read-your-writes.
   Why it matters: Consistency requirements must align with product behavior; wrong choice causes user-visible data anomalies.
   Example: Account balance needs strong consistency; social feed ranking can tolerate eventual consistency.

155. **How do caching and database design work together?**
   Use patterns like cache-aside or write-through to reduce read load while preserving correctness with TTLs and invalidation strategy.
   Why it matters: Caching is often the first scaling layer; poor invalidation causes stale or inconsistent reads.
   Example: Hot product catalog pages are served from Redis cache, with DB as source of truth.

156. **What is a practical database capacity-planning checklist in system design?**
   Track QPS, p95 latency, storage growth, index growth, connection utilization, replication lag, and backup/restore recovery objectives.
   Why it matters: Capacity planning prevents firefighting by forecasting bottlenecks before incidents happen.
   Example: Alert when write IOPS or replica lag trends exceed safe thresholds.

157. **How do you design a zero-downtime schema migration workflow?**
   Follow expand-migrate-contract: add compatible schema, backfill safely, switch application reads/writes, then remove old fields.
   Why it matters: This is a required production skill for evolving schemas without outages.
   Example: Deploy code that writes both old/new columns before dropping legacy column.

158. **How can you verify that an `ADD COLUMN` change was applied correctly?**
   Validate schema and data visibility after migration. Typical checks are table metadata (`information_schema.columns`) and a quick data read.
   Why it matters: Schema changes should be verifiable in deployment pipelines to catch drift early.
   Example: After `ALTER TABLE cars ADD COLUMN color varchar(255);`, confirm that `color` exists and is queryable.

   ```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'cars'
  AND column_name = 'color';
   ```

159. **How do you add a column with type, default value, and `NOT NULL` in one migration?**
   You can define constraints and default directly in `ADD COLUMN` when data/backfill requirements allow it.
   Why it matters: This keeps schema intent explicit and reduces follow-up DDL steps for small/controlled tables.
   Example: Add account status with a safe default for new rows.

   ```sql
ALTER TABLE accounts
ADD COLUMN status varchar(20) NOT NULL DEFAULT 'ACTIVE';
   ```

160. **What should you check before using `ALTER TABLE ... ADD COLUMN` on very large tables?**
   Check lock impact, backfill strategy, deployment ordering, and rollback safety. Prefer phased rollout for high-traffic tables.
   Why it matters: Online schema changes can cause write stalls if not planned with production load in mind.
   Example: Add nullable column first, deploy app support, then enforce strict constraints later.

161. **What is vertical scaling vs horizontal scaling in database system design?**
   Vertical scaling increases resources on one node (CPU, RAM, storage), while horizontal scaling adds more nodes and distributes load/data.
   Why it matters: This is a core tradeoff in system design interviews: simplicity vs long-term scaling limits.
   Example: Start by scaling up a single PostgreSQL node; move to replicas/shards as traffic and data size grow.

162. **When is sharding needed instead of only scaling up?**
   Use sharding when one node cannot handle storage, write throughput, or maintenance windows even after optimization and scale-up.
   Why it matters: Sharding adds major operational complexity, so you should justify it with measurable limits.
   Example: Tenant-based shard keys can isolate heavy tenants and reduce hotspot contention.

163. **What is read-after-write consistency and how do you preserve it with replicas?**
   Read-after-write means a user immediately sees their latest write. With asynchronous replicas, this may break unless reads are routed carefully.
   Why it matters: Many production bugs come from stale replica reads after user writes.
   Example: Route post-write reads to primary, or use replica lag checks before serving consistency-sensitive reads.

164. **What is a shared database vs database-per-service tradeoff in system design?**
   Shared DB simplifies cross-service queries initially, while database-per-service improves ownership, isolation, and independent scaling.
   Why it matters: This decision affects team autonomy, failure blast radius, and long-term architecture flexibility.
   Example: Early-stage teams may start shared and progressively split databases by bounded context.

165. **How does CAP theorem guide multi-region database design decisions?**
   Under network partition, distributed systems choose between strong consistency and availability. Design choice depends on product guarantees.
   Why it matters: Interviewers expect explicit CAP-driven reasoning for global systems.
   Example: Payment authorization prioritizes consistency; social feed ranking can prioritize availability.

## DB System Design Notes (Reference)

References:
- W3Schools PostgreSQL ADD COLUMN: https://www.w3schools.com/postgresql/postgresql_add_column.php
- GeeksforGeeks Complete Reference to Databases in Designing Systems: https://www.geeksforgeeks.org/system-design/complete-reference-to-databases-in-designing-systems/

Key notes for interviews:
- Start with access patterns first, then choose schema and indexes.
- Prefer a monolithic database early for simplicity; move to distributed patterns only when scale requires it.
- Use CAP theorem to explain tradeoffs during partition events.
- Define consistency requirements per workflow (for example, payments vs feeds).
- Combine replication, backups, and tested restore runbooks for reliability.
- Treat schema migrations as a product of app + DB rollout, not just SQL scripts.
- Use cache with explicit invalidation strategy; database remains source of truth.
- Track operational metrics continuously: latency percentiles, connection usage, replica lag, storage growth.

## Extra ASCII diagrams

### Transaction and MVCC visibility

```text
T1: BEGIN                     T2: BEGIN
T1: UPDATE account=90
                              T2: SELECT account -> 100 (old visible version)
T1: COMMIT
                              T2: SELECT account -> still 100 (depends on isolation)
```

### Lock wait and deadlock idea

```text
Tx A holds Row X, waits Row Y
Tx B holds Row Y, waits Row X
=> cycle detected => PostgreSQL aborts one transaction
```

### Primary / Replica topology

```text
             +------------------+
Writes ----> | Primary Postgres |
             +------------------+
                |            |
            WAL stream    WAL stream
                v            v
          +-----------+  +-----------+
Reads --> | Replica 1 |  | Replica 2 |
          +-----------+  +-----------+
```

### Partition pruning concept

```text
Query: WHERE created_at >= '2026-02-01' AND created_at < '2026-03-01'
Planner reads only partition: events_2026_02
Skips: events_2025_*, events_2026_01, events_2026_03...
```


### Join types at a glance

```text
A INNER JOIN B  -> only matching keys
A LEFT JOIN B   -> all A + matching B
A RIGHT JOIN B  -> all B + matching A
A FULL JOIN B   -> all A and all B (matched + unmatched)
```

### Seq scan vs index scan intuition

```text
Sequential Scan: read every page -> good for tiny tables / broad filters
Index Scan: navigate index first -> good for selective predicates
Bitmap Scan: gather many index hits -> efficient page-ordered heap access
```


### Zero-downtime ADD COLUMN migration (expand-contract)

```text
Step 1: ADD nullable column
Step 2: Backfill existing rows in batches
Step 3: App writes old + new columns
Step 4: Read from new column
Step 5: Enforce NOT NULL / remove old column
```

### Cache-aside pattern around DB

```text
Client -> App -> Cache miss -> DB read -> Cache set -> Client
Client -> App -> Cache hit  --------------------------> Client
Write path: DB write -> Cache invalidate/update
```

## Practical SQL snippets

```sql
-- Upsert pattern for idempotent writes
INSERT INTO payments (external_id, amount, status)
VALUES ('pay_123', 100.00, 'PENDING')
ON CONFLICT (external_id)
DO UPDATE SET amount = EXCLUDED.amount,
              status = EXCLUDED.status,
              updated_at = now();
```

```sql
-- Common slow-query investigation flow
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE tenant_id = 42
  AND created_at >= now() - interval '30 days'
ORDER BY created_at DESC
LIMIT 100;
```

```sql
-- Good baseline index for tenant + time access pattern
CREATE INDEX CONCURRENTLY idx_orders_tenant_created_at
ON orders (tenant_id, created_at DESC);
```
