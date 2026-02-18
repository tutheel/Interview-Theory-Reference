# PostgreSQL & Data Modeling Interview Questions

## Level-wise Classification

This groups all 170 questions by recommended interview prep level.

### Beginner

- Q1: What is PostgreSQL?
- Q6: What is index?
- Q7: What is B-tree index?
- Q12: What is foreign key?
- Q13: What is primary key?
- Q14: What is unique constraint?
- Q15: What is check constraint?
- Q16: What is normalization?
- Q17: What is 1NF?
- Q18: What is 2NF?
- Q19: What is 3NF?
- Q20: What is denormalization?
- Q21: What is join?
- Q22: What is left join?
- Q23: What is right join?
- Q24: What is full join?
- Q25: What is inner join?
- Q26: What is self join?
- Q27: What is subquery?
- Q28: What is CTE?
- Q42: What is transaction?
- Q43: What is savepoint?
- Q44: What is rollback?
- Q45: What is commit?
- Q46: What is ACID?
- Q51: What is vacuum?
- Q52: What is analyze?
- Q53: What is materialized view?
- Q54: What is view?
- Q56: What is function?
- Q57: What is stored procedure?
- Q58: What is sequence?
- Q59: What is UUID?
- Q60: What is connection pooling?
- Q62: What is N+1 problem?
- Q63: What is foreign key cascade?
- Q70: What is composite key?
- Q71: What is surrogate key?
- Q72: What is natural key?
- Q82: What is autoincrement?
- Q87: What is role?
- Q88: What is privilege?
- Q89: What is GRANT?
- Q90: What is REVOKE?
- Q91: What is default value?
- Q92: What is constraint violation?
- Q93: What is unique index?
- Q94: What is index scan?
- Q95: What is sequential scan?
- Q101: What is schema?
- Q108: What is data type?
- Q109: What is numeric precision?
- Q110: What is timestamp?
- Q111: What is timezone handling?
- Q112: What is array column?
- Q114: What is extension?
- Q122: What is connection timeout?
- Q141: What is referential integrity?
- Q150: What is database migration tool?
- Q154: What is soft delete?
- Q155: What is hard delete?
- Q162: What is query cache?

### Intermediate

- Q2: What is MVCC?
- Q3: What is WAL?
- Q4: What is checkpoint?
- Q5: What is autovacuum?
- Q8: What is GIN index?
- Q9: What is GiST index?
- Q10: What is partial index?
- Q11: What is composite index?
- Q29: What is recursive CTE?
- Q30: What is EXPLAIN?
- Q31: What is EXPLAIN ANALYZE?
- Q32: What is query planner?
- Q33: What is cost estimation?
- Q34: What is deadlock?
- Q35: What is isolation level?
- Q36: What is read committed?
- Q37: What is repeatable read?
- Q38: What is serializable?
- Q39: What is phantom read?
- Q40: What is row lock?
- Q41: What is table lock?
- Q47: What is indexing strategy?
- Q48: What is partitioning?
- Q49: What is range partition?
- Q50: What is hash partition?
- Q55: What is trigger?
- Q61: What is PgBouncer?
- Q64: What is data migration?
- Q65: What is schema versioning?
- Q66: What is audit log design?
- Q67: What is multi-tenant schema?
- Q68: What is row-level security?
- Q69: What is index selectivity?
- Q73: What is JSONB?
- Q74: What is full text search?
- Q75: What is transaction log?
- Q76: What is replication?
- Q77: What is streaming replication?
- Q78: What is logical replication?
- Q80: What is read replica?
- Q81: What is write amplification?
- Q83: What is foreign key index?
- Q84: What is dead tuple?
- Q85: What is HOT update?
- Q86: What is WAL archiving?
- Q96: What is bitmap index scan?
- Q97: What is execution plan?
- Q98: What is cardinality?
- Q99: What is latency optimization?
- Q100: What is connection leak?
- Q102: What is table inheritance?
- Q103: What is check constraint usage?
- Q104: What is partial index usage?
- Q105: What is covering index?
- Q106: What is index-only scan?
- Q107: What is explain verbose?
- Q113: What is composite type?
- Q115: What is pg_stat_activity?
- Q116: What is lock monitoring?
- Q119: What is parallel query?
- Q120: What is foreign data wrapper?
- Q123: What is transaction timeout?
- Q125: What is lock wait timeout?
- Q126: What is deadlock detection?
- Q139: What is batch insert?
- Q140: What is bulk update?
- Q142: What is row versioning?
- Q143: What is audit trigger?
- Q144: What is unique violation handling?
- Q146: What is pessimistic locking?
- Q147: What is optimistic locking?
- Q148: What is version column?
- Q149: What is schema separation?
- Q151: What is Flyway?
- Q152: What is Liquibase?
- Q153: What is test database strategy?
- Q156: What is composite foreign key?
- Q157: What is database constraint best practice?
- Q158: What is concurrency control?
- Q163: What is DB indexing tradeoff?
- Q164: What is table scan issue?
- Q165: What is DB connection exhaustion?
- Q167: What is normalization tradeoff?
- Q168: What is index overhead?
- Q169: What is write-heavy optimization?
- Q170: What is read-heavy optimization?

### Advanced

- Q79: What is failover?
- Q117: What is autovacuum tuning?
- Q118: What is statistics target?
- Q121: What is sharding?
- Q124: What is constraint deferrable?
- Q127: What is index maintenance?
- Q128: What is reindex?
- Q129: What is backup strategy?
- Q130: What is PITR?
- Q131: What is restore procedure?
- Q132: What is retention policy?
- Q133: What is database size optimization?
- Q134: What is index fragmentation?
- Q135: What is cluster command?
- Q136: What is performance tuning?
- Q137: What is workload analysis?
- Q138: What is explain cost interpretation?
- Q145: What is transaction isolation anomaly?
- Q159: What is data consistency strategy?
- Q160: What is replication lag?
- Q161: What is replication slot?
- Q166: What is schema optimization?

## Detailed Q&A (with examples)

1. **What is PostgreSQL?**
   PostgreSQL is an open-source relational database known for reliability, SQL compliance, and advanced features like JSONB, indexing types, and strong transactional guarantees.
   Example: Teams use PostgreSQL for OLTP systems where consistency and complex querying matter.

2. **What is MVCC?**
   MVCC (Multi-Version Concurrency Control) lets readers and writers work concurrently by keeping row versions instead of blocking reads during writes.
   Example: While one transaction updates an order row, another transaction can still read the older committed version.

   ```text
   Tx A: UPDATE row (new version)
   Tx B: SELECT row (sees old committed version)
   Commit A -> future readers see new version
   ```

3. **What is WAL?**
   WAL (Write-Ahead Log) records changes to log files before the data files are updated, which guarantees crash recovery and supports replication.
   Example: If the server crashes mid-write, PostgreSQL replays WAL to restore a consistent state.

4. **What is checkpoint?**
   A checkpoint flushes dirty pages from memory to disk and marks a recovery point in WAL.
   Example: More frequent checkpoints reduce crash recovery time but can increase regular I/O pressure.

5. **What is autovacuum?**
   Autovacuum automatically removes dead tuples and updates planner statistics.
   Example: In a busy orders table with frequent updates, autovacuum prevents table bloat and bad plans.

6. **What is index?**
   An index is an auxiliary structure that speeds up lookups by avoiding full table scans.
   Example: `WHERE email = 'a@b.com'` becomes fast with an index on `email`.

7. **What is B-tree index?**
   B-tree is PostgreSQL's default index type and works well for equality, ranges, sorting, and prefix conditions.
   Example: `WHERE created_at >= now() - interval '7 days'` can use a B-tree index on `created_at`.

8. **What is GIN index?**
   GIN (Generalized Inverted Index) is best for columns containing many tokens/values, such as JSONB, arrays, and full-text vectors.
   Example: Searching JSONB tags or `to_tsvector` text benefits from GIN.

9. **What is GiST index?**
   GiST is a flexible index framework used for geometric data, ranges, nearest-neighbor, and extension operators.
   Example: PostGIS location queries often rely on GiST indexes.

10. **What is partial index?**
    A partial index indexes only rows that match a predicate, reducing size and write cost.
    Example: Index only active rows in a soft-delete table.

    ```sql
    CREATE INDEX idx_users_active_email
    ON users (email)
    WHERE deleted_at IS NULL;
    ```

11. **What is composite index?**
    A composite index covers multiple columns, and column order determines how well queries can use it.
    Example: `(tenant_id, created_at)` helps tenant-filtered time-range queries.

12. **What is foreign key?**
    A foreign key enforces referential integrity between child and parent tables.
    Example: `orders.customer_id` must exist in `customers.id`.

13. **What is primary key?**
    A primary key uniquely identifies each row and is always `UNIQUE` and `NOT NULL`.
    Example: `users(id bigint generated always as identity primary key)`.

14. **What is unique constraint?**
    A unique constraint prevents duplicate values for one column or a column set.
    Example: `UNIQUE (tenant_id, email)` allows same email across tenants but not inside one tenant.

15. **What is check constraint?**
    A check constraint enforces domain rules at the database level.
    Example: Ensure amount is non-negative.

    ```sql
    ALTER TABLE payments
    ADD CONSTRAINT chk_amount_non_negative
    CHECK (amount >= 0);
    ```

16. **What is normalization?**
    Normalization is the process of structuring tables to reduce redundancy and prevent update anomalies.
    Example: Move repeating address data into a separate `addresses` table.

17. **What is 1NF?**
    First Normal Form requires atomic values and no repeating groups in a row.
    Example: Avoid storing `phone_numbers` as a comma-separated string.

18. **What is 2NF?**
    Second Normal Form requires 1NF and removal of partial dependencies on a composite key.
    Example: In `(order_id, product_id)` table, product name should depend on `product_id`, not the pair.

19. **What is 3NF?**
    Third Normal Form requires 2NF and no transitive dependencies on non-key columns.
    Example: If `zip -> city`, store zip reference, not repeated city text everywhere.

20. **What is denormalization?**
    Denormalization intentionally duplicates data to reduce joins and improve read performance.
    Example: Store `customer_name` on an `order_summary` table for fast dashboard queries.

21. **What is join?**
    A join combines rows from two or more tables based on a relationship.
    Example: Join `orders` with `customers` to return order plus customer profile.

22. **What is left join?**
    LEFT JOIN returns all rows from left table and matching rows from right table.
    Example: Show all customers, including those with zero orders.

23. **What is right join?**
    RIGHT JOIN returns all rows from right table and matching rows from left table.
    Example: Same logic as left join, but table order is reversed.

24. **What is full join?**
    FULL JOIN returns all matched rows plus unmatched rows from both sides with NULLs.
    Example: Reconcile records from two systems and find missing entries on either side.

    ```text
    LEFT only  +  BOTH  +  RIGHT only
    ```

25. **What is inner join?**
    INNER JOIN returns only rows where the join condition matches in both tables.
    Example: Orders that have a valid customer row.

26. **What is self join?**
    A self join joins a table to itself, commonly for hierarchies.
    Example: `employees e` joined to `employees m` for manager relationship.

27. **What is subquery?**
    A subquery is a query inside another query.
    Example: `WHERE id IN (SELECT user_id FROM admins)`.

28. **What is CTE?**
    A CTE (Common Table Expression) is a named subquery written with `WITH`, often improving readability.
    Example: Break a complex report into steps.

29. **What is recursive CTE?**
    A recursive CTE repeatedly references itself to walk hierarchical data.
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

30. **What is EXPLAIN?**
    `EXPLAIN` shows the query planner's chosen plan without executing the query.
    Example: Use it before adding an index to understand whether a seq scan is expected.

31. **What is EXPLAIN ANALYZE?**
    `EXPLAIN ANALYZE` executes the query and shows actual timing/rows per step.
    Example: Compare estimated rows vs actual rows to detect stale statistics.

32. **What is query planner?**
    The planner decides how to execute SQL using statistics and cost rules.
    Example: It chooses between index scan, bitmap scan, or seq scan.

33. **What is cost estimation?**
    Cost estimation is PostgreSQL's internal estimate of work (CPU, I/O) for each plan.
    Example: A lower estimated total cost plan is usually selected, even if estimates can be wrong.

34. **What is deadlock?**
    A deadlock occurs when transactions wait on each other in a cycle; PostgreSQL cancels one transaction.
    Example: Tx A locks row 1 then needs row 2, while Tx B locks row 2 then needs row 1.

35. **What is isolation level?**
    Isolation level defines how transaction visibility works under concurrency.
    Example: Choose `READ COMMITTED` for normal workloads and `SERIALIZABLE` for strongest correctness.

36. **What is read committed?**
    `READ COMMITTED` gives each statement its own snapshot of committed data.
    Example: Two SELECTs in one transaction can see different committed results.

37. **What is repeatable read?**
    `REPEATABLE READ` gives one consistent snapshot for the whole transaction.
    Example: Re-reading the same row returns the same version during that transaction.

38. **What is serializable?**
    `SERIALIZABLE` enforces behavior equivalent to running transactions one-by-one.
    Example: It may abort one transaction with serialization failure; application should retry.

39. **What is phantom read?**
    Phantom read is when repeated range queries see new/deleted rows from concurrent commits.
    Example: `count(*) where status='open'` changes between reads in the same transaction.

40. **What is row lock?**
    Row lock protects selected rows from conflicting modifications.
    Example: `SELECT ... FOR UPDATE` before deducting account balance.

41. **What is table lock?**
    Table lock applies at whole-table level and can block broader operations.
    Example: Some DDL statements require stronger table locks than normal DML.

42. **What is transaction?**
    A transaction is a unit of work that either fully commits or fully rolls back.
    Example: Transfer money by debiting one account and crediting another in one transaction.

43. **What is savepoint?**
    A savepoint marks a point inside a transaction for partial rollback.
    Example: Roll back one failed item in a batch while keeping earlier successful items.

44. **What is rollback?**
    `ROLLBACK` undoes uncommitted changes.
    Example: If step 3 fails in a 5-step transaction, rollback to maintain consistency.

45. **What is commit?**
    `COMMIT` makes transaction changes durable and visible.
    Example: After successful inventory update + order insert, commit both.

46. **What is ACID?**
    ACID means Atomicity, Consistency, Isolation, Durability.
    Example: Financial systems rely on ACID so partial writes never corrupt balances.

47. **What is indexing strategy?**
    Indexing strategy is deliberate index design based on real query patterns and write budget.
    Example: Add indexes for top slow predicates, avoid indexing every column.

48. **What is partitioning?**
    Partitioning splits a large table into smaller pieces by key, improving manageability and query pruning.
    Example: `events` partitioned monthly by `created_at`.

    ```text
    events
    |- events_2026_01
    |- events_2026_02
    |- events_2026_03
    ```

49. **What is range partition?**
    Range partitioning routes rows based on value intervals.
    Example: Orders by month or year.

50. **What is hash partition?**
    Hash partitioning distributes rows using hash of key for balanced write spread.
    Example: Partition by `tenant_id` when tenant IDs are uneven over time.

51. **What is vacuum?**
    `VACUUM` cleans dead tuples and updates visibility metadata.
    Example: Prevent bloat in frequently updated tables.

52. **What is analyze?**
    `ANALYZE` collects column statistics used by the planner.
    Example: After bulk load, run `ANALYZE` so planner stops choosing poor scans.

53. **What is materialized view?**
    A materialized view stores query output physically and must be refreshed.
    Example: Daily sales summary precomputed for dashboards.

54. **What is view?**
    A view is a virtual table defined by a SQL query.
    Example: Expose `active_users_view` and hide deleted rows by default.

55. **What is trigger?**
    A trigger automatically runs function logic on table events.
    Example: Auto-fill `updated_at` on every row update.

56. **What is function?**
    A function is reusable server-side routine returning value(s).
    Example: `calculate_tax(amount numeric)` used across queries.

57. **What is stored procedure?**
    A stored procedure (invoked with `CALL`) can include transaction control logic.
    Example: Multi-step ETL workflow handled in DB-side procedure.

58. **What is sequence?**
    A sequence generates incrementing numbers independent of table rows.
    Example: Identity columns are often backed by sequences.

59. **What is UUID?**
    UUID is a 128-bit identifier with very low collision probability.
    Example: Useful when IDs are generated across distributed services.

60. **What is connection pooling?**
    Connection pooling reuses DB connections instead of creating one per request.
    Example: Web APIs with short requests rely on pooling to avoid connection overhead.

    ```text
    App workers -> Pool (50 conns) -> PostgreSQL
    ```

61. **What is PgBouncer?**
    PgBouncer is a lightweight PostgreSQL connection pooler that reduces backend connection pressure.
    Example: Use transaction pooling for high-concurrency APIs with short transactions.

62. **What is N+1 problem?**
    N+1 happens when one query fetches N parent rows and then runs N additional child queries.
    Example: Fetch users, then fetch orders per user in a loop. Fix with join/batch loading.

    ```sql
    -- Better: one query instead of N+1
    SELECT u.id, u.name, o.id AS order_id
    FROM users u
    LEFT JOIN orders o ON o.user_id = u.id
    WHERE u.tenant_id = 10;
    ```

63. **What is foreign key cascade?**
    Cascade rules automate child-row action when parent rows change.
    Example: `ON DELETE CASCADE` removes line items automatically when order is deleted.

64. **What is data migration?**
    Data migration is controlled movement/transformation of existing data during schema or system changes.
    Example: Split `full_name` into `first_name` and `last_name` safely in phases.

65. **What is schema versioning?**
    Schema versioning tracks and applies ordered DB changes across environments.
    Example: `V42__add_orders_index.sql` runs once and is recorded.

66. **What is audit log design?**
    Audit design captures who changed what, when, and often previous/new values.
    Example: Store `actor_id`, `action`, `entity_id`, `old_data`, `new_data`, `changed_at`.

67. **What is multi-tenant schema?**
    Multi-tenancy stores many tenants in one system with isolation via DB-per-tenant, schema-per-tenant, or row-per-tenant.
    Example: Row-level model with mandatory `tenant_id` in each table.

68. **What is row-level security?**
    RLS enforces per-row access rules directly in PostgreSQL.
    Example: A user can only select rows where `tenant_id = current_setting('app.tenant_id')`.

    ```sql
    ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
    CREATE POLICY tenant_isolation ON invoices
      USING (tenant_id = current_setting('app.tenant_id')::int);
    ```

69. **What is index selectivity?**
    Selectivity is how well a predicate narrows rows; high selectivity usually means index is useful.
    Example: `email` is highly selective; `is_active` may be low selective.

70. **What is composite key?**
    Composite key uses multiple columns as the unique identifier.
    Example: `PRIMARY KEY (tenant_id, external_id)`.

71. **What is surrogate key?**
    Surrogate key is artificial identifier (identity/UUID) with no business meaning.
    Example: `id bigint generated always as identity`.

72. **What is natural key?**
    Natural key is a business-meaningful identifier.
    Example: ISO country code can be natural key in a countries table.

73. **What is JSONB?**
    JSONB stores JSON in a binary format with indexing and operators.
    Example: Keep flexible attributes while still querying specific keys.

    ```sql
    CREATE INDEX idx_products_attrs ON products USING gin (attributes);
    SELECT * FROM products WHERE attributes @> '{"color":"black"}';
    ```

74. **What is full text search?**
    Full text search tokenizes text and ranks matches, better than plain `LIKE` for document search.
    Example: Search article body with stemming and relevance ranking.

75. **What is transaction log?**
    In PostgreSQL, transaction log is WAL, used for durability and replication.
    Example: Recovery after crash replays WAL records.

76. **What is replication?**
    Replication copies primary changes to other nodes for availability and read scaling.
    Example: One primary plus two replicas for reporting and failover.

77. **What is streaming replication?**
    Streaming replication sends WAL continuously from primary to standbys.
    Example: Replica lag is usually seconds or less under healthy network/load.

    ```text
    Primary --WAL stream--> Replica A
            --WAL stream--> Replica B
    ```

78. **What is logical replication?**
    Logical replication publishes row-level changes per table/publication.
    Example: Replicate only customer-facing tables to analytics service.

79. **What is failover?**
    Failover is promoting a standby to primary when primary is unavailable.
    Example: Orchestrator detects failure and switches application endpoint.

80. **What is read replica?**
    Read replica is a standby used for read-only workloads.
    Example: Route heavy reporting queries to replica to protect primary latency.

81. **What is write amplification?**
    Write amplification means one logical change causes multiple physical writes (table + indexes + WAL).
    Example: Wide table with many indexes increases write cost per insert/update.

82. **What is autoincrement?**
    Autoincrement means DB auto-generates increasing numeric IDs.
    Example: `GENERATED BY DEFAULT AS IDENTITY`.

83. **What is foreign key index?**
    It is an index on child FK columns to speed joins and FK checks.
    Example: Without it, deleting parent rows can trigger expensive scans on child table.

84. **What is dead tuple?**
    Dead tuple is an old row version no longer visible to active transactions.
    Example: Frequent updates create dead tuples until vacuum cleans them.

85. **What is HOT update?**
    HOT (Heap-Only Tuple) update avoids index updates when indexed columns are unchanged.
    Example: Updating `last_seen_at` can be cheaper if that column is not indexed.

86. **What is WAL archiving?**
    WAL archiving copies completed WAL segments to long-term storage.
    Example: Required for robust PITR beyond local disk WAL retention.

87. **What is role?**
    A role is PostgreSQL identity for login and permissions.
    Example: Separate `app_read`, `app_write`, and `app_admin` roles.

88. **What is privilege?**
    Privilege is permission to perform action on object.
    Example: `SELECT` on tables, `USAGE` on schema, `EXECUTE` on function.

89. **What is GRANT?**
    `GRANT` gives privileges to roles.
    Example: `GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read;`.

90. **What is REVOKE?**
    `REVOKE` removes privileges previously granted.
    Example: Revoke write access during incident containment.

91. **What is default value?**
    A default value is applied when insert omits a column.
    Example: `created_at timestamptz NOT NULL DEFAULT now()`.

92. **What is constraint violation?**
    It is an error when data breaks defined constraints.
    Example: Inserting duplicate email into unique column raises `23505`.

93. **What is unique index?**
    Unique index enforces uniqueness and accelerates lookups.
    Example: Unique index on `lower(email)` for case-insensitive uniqueness.

94. **What is index scan?**
    Index scan navigates index then fetches rows from heap.
    Example: Good for selective predicates returning small subset.

95. **What is sequential scan?**
    Sequential scan reads full table pages in order.
    Example: Faster than index for small tables or low-selectivity filters.

96. **What is bitmap index scan?**
    Bitmap scan combines index hits into bitmap, then reads heap pages efficiently.
    Example: Useful for moderate selectivity or multiple index conditions.

97. **What is execution plan?**
    Execution plan is the operator tree PostgreSQL executes (scan, join, aggregate, sort).
    Example: A nested loop may be fine for small outer rows, bad for large ones.

98. **What is cardinality?**
    Cardinality is row count (actual or estimated) at table or plan node.
    Example: Wrong cardinality estimates often lead to wrong join strategy.

99. **What is latency optimization?**
    Latency optimization reduces end-to-end query response time.
    Example: Add right index, remove unnecessary columns, avoid N+1, cache hot reads.

100. **What is connection leak?**
     Connection leak happens when app code does not return connections to pool.
     Example: Missing `finally { client.release(); }` eventually causes request timeouts.

101. **What is schema?**
     A schema is a namespace that groups DB objects.
     Example: `app`, `audit`, and `reporting` schemas separate concerns.

102. **What is table inheritance?**
     Table inheritance lets child tables inherit columns from parent.
     Example: Legacy partitioning patterns used inheritance before declarative partitioning became common.

103. **What is check constraint usage?**
     Use check constraints for business rules that must never be bypassed.
     Example: status in allowed set, date ranges valid.

104. **What is partial index usage?**
     Use partial indexes when query repeatedly targets subset of rows.
     Example: `WHERE status = 'PENDING'` queue processor index.

105. **What is covering index?**
     Covering index includes queried output columns to reduce heap visits.
     Example: `CREATE INDEX ... ON orders (tenant_id, created_at) INCLUDE (total_amount);`.

106. **What is index-only scan?**
     Index-only scan returns data from index without heap fetch when visibility map allows it.
     Example: Common on well-vacuumed read-heavy tables.

107. **What is explain verbose?**
     `EXPLAIN (VERBOSE)` shows additional internal details like output columns and aliases.
     Example: Useful when diagnosing complex views/CTEs.

108. **What is data type?**
     Data type defines valid values, storage layout, and operations.
     Example: Choosing `numeric(12,2)` over `float` for money avoids precision surprises.

109. **What is numeric precision?**
     Precision is total digits; scale is digits after decimal.
     Example: `numeric(10,2)` stores up to 99999999.99.

110. **What is timestamp?**
     Timestamp stores date+time; choose with/without timezone carefully.
     Example: `timestamptz` is preferred for global systems.

111. **What is timezone handling?**
     Store in `timestamptz` (UTC internally), convert only at presentation layer.
     Example: User sees local time in UI while DB stays consistent globally.

112. **What is array column?**
     Array column stores multiple same-type values in one column.
     Example: `text[]` for small tag lists, but use join tables when relationships grow complex.

113. **What is composite type?**
     Composite type is custom structured type with named fields.
     Example: Return `(street, city, zip)` as one typed value from function.

114. **What is extension?**
     Extension adds packaged capabilities to PostgreSQL.
     Example: `pgcrypto` for UUID generation, `postgis` for geospatial queries.

115. **What is pg_stat_activity?**
     `pg_stat_activity` shows active sessions, queries, wait events, and states.
     Example: Identify long-running query blocking others.

116. **What is lock monitoring?**
     Lock monitoring tracks who is blocking whom.
     Example: Join `pg_locks` with `pg_stat_activity` to find blocker PID and SQL.

117. **What is autovacuum tuning?**
     Tuning adjusts thresholds and scale factors per table to match write churn.
     Example: Lower thresholds on hot tables to control bloat sooner.

118. **What is statistics target?**
     Statistics target controls detail of collected stats for planner.
     Example: Increase target on skewed columns used in filters.

119. **What is parallel query?**
     Parallel query uses worker processes to speed scans/aggregations.
     Example: Large analytics query can use multiple CPUs with parallel plan.

120. **What is foreign data wrapper?**
     FDW lets PostgreSQL query external systems as foreign tables.
     Example: Join local table with remote Postgres table using `postgres_fdw`.

121. **What is sharding?**
     Sharding distributes data horizontally across multiple databases or nodes.
     Example: Tenant-based sharding keeps each shard smaller and easier to scale.

122. **What is connection timeout?**
     Connection timeout is max time to establish DB connection before failing.
     Example: Fail fast in app when DB is unreachable instead of hanging threads.

123. **What is transaction timeout?**
     Transaction timeout limits long-running statements/transactions to protect system health.
     Example: Use `statement_timeout` and `idle_in_transaction_session_timeout`.

124. **What is constraint deferrable?**
     Deferrable constraint can be checked at commit time instead of each statement.
     Example: Useful when temporarily violating FK during batch reorder updates.

125. **What is lock wait timeout?**
     `lock_timeout` aborts statement if lock wait exceeds configured threshold.
     Example: Prevent API requests from waiting indefinitely on blocked rows.

126. **What is deadlock detection?**
     PostgreSQL periodically checks lock wait graph for cycles and cancels one transaction.
     Example: Application should retry aborted transaction safely.

127. **What is index maintenance?**
     Index maintenance means measuring usage/bloat, dropping unused indexes, and rebuilding bloated ones.
     Example: Keep only indexes that support real workload.

128. **What is reindex?**
     `REINDEX` rebuilds index to fix heavy bloat or corruption.
     Example: `REINDEX INDEX CONCURRENTLY idx_orders_created_at;` in production.

129. **What is backup strategy?**
     Backup strategy defines full/incremental cadence, WAL retention, restore testing, and ownership.
     Example: Nightly base backup + continuous WAL archiving + monthly recovery drill.

130. **What is PITR?**
     Point-In-Time Recovery restores DB to a specific timestamp or LSN.
     Example: Recover state right before accidental `DELETE` at 10:37:12 UTC.

131. **What is restore procedure?**
     Restore procedure is documented, repeatable recovery runbook from backup and WAL.
     Example: New instance restore, replay to target time, validate checks, cutover.

132. **What is retention policy?**
     Retention policy sets how long backups/WAL/logs are kept.
     Example: Keep 35 days operational backups and 1 year monthly snapshots.

133. **What is database size optimization?**
     It is reducing storage and I/O by cleaning old data, controlling bloat, and using right data types.
     Example: Archive stale events and partition/drop old partitions.

134. **What is index fragmentation?**
     In PostgreSQL this is usually called index bloat from page splits and dead entries.
     Example: Heavy random updates on indexed columns gradually bloat index size.

135. **What is cluster command?**
     `CLUSTER` rewrites table physically ordered by an index.
     Example: Helpful for range scans on correlated data but requires maintenance window.

136. **What is performance tuning?**
     Performance tuning is iterative measurement and optimization of SQL, schema, and DB settings.
     Example: Start with slow query logs, then tune highest-impact queries first.

137. **What is workload analysis?**
     Workload analysis profiles read/write mix, hot tables, peak hours, and query shapes.
     Example: OLTP workload needs different tuning than reporting workload.

138. **What is explain cost interpretation?**
     EXPLAIN costs are relative planner units, not direct milliseconds.
     Example: Compare plans by cost and validate with `EXPLAIN ANALYZE` for real timing.

139. **What is batch insert?**
     Batch insert writes many rows per statement/transaction to reduce round trips.
     Example: Use multi-row `INSERT` or `COPY` for large imports.

140. **What is bulk update?**
     Bulk update modifies many rows efficiently, often in chunks.
     Example: Update 10k-row chunks to limit lock duration and WAL spikes.

141. **What is referential integrity?**
     Referential integrity guarantees relationships remain valid.
     Example: Every `invoice.customer_id` must map to existing customer row.

142. **What is row versioning?**
     Row versioning is MVCC behavior where updates create new tuple versions.
     Example: Readers can continue using older visible version while writer commits new one.

143. **What is audit trigger?**
     Audit trigger writes change metadata to audit table automatically.
     Example: Log old/new values on update for compliance traceability.

144. **What is unique violation handling?**
     Handle uniqueness races using upsert or controlled retry.
     Example: `INSERT ... ON CONFLICT DO UPDATE` for idempotent writes.

145. **What is transaction isolation anomaly?**
     It is incorrect concurrent behavior like dirty reads, non-repeatable reads, phantoms, or write skew.
     Example: Two doctors both on-call check and both mark themselves off-call due to snapshot anomaly.

146. **What is pessimistic locking?**
     Pessimistic locking blocks conflicting writers early using explicit locks.
     Example: `SELECT ... FOR UPDATE` in inventory reservation.

147. **What is optimistic locking?**
     Optimistic locking allows concurrent edits and detects collision at update time.
     Example: `UPDATE ... WHERE id = ? AND version = ?` then increment version.

148. **What is version column?**
     Version column tracks row revision count for optimistic concurrency control.
     Example: If update affects 0 rows, client retries because version changed.

149. **What is schema separation?**
     Schema separation isolates objects by domain/team/tenant boundary.
     Example: `billing.*` separated from `identity.*` to simplify permissions.

150. **What is database migration tool?**
     A migration tool manages ordered, repeatable schema changes with audit trail.
     Example: CI applies migrations automatically before integration tests.

151. **What is Flyway?**
     Flyway is SQL-first migration tool using versioned scripts.
     Example: `V1__init.sql`, `V2__add_index.sql` applied in strict order.

152. **What is Liquibase?**
     Liquibase is migration framework using changelogs (XML/YAML/JSON/SQL).
     Example: Track checksums and generate SQL diffs for multiple DB targets.

153. **What is test database strategy?**
     Test DB strategy ensures repeatable, isolated tests with known schema and data.
     Example: Spin up disposable DB per test suite and run migrations fresh.

154. **What is soft delete?**
     Soft delete marks rows as deleted instead of physically removing them.
     Example: `deleted_at` timestamp enables restore and audit.

155. **What is hard delete?**
     Hard delete permanently removes row data.
     Example: Required for strict privacy erasure requests after retention checks.

156. **What is composite foreign key?**
     Composite FK references multi-column key in parent table.
     Example: `(tenant_id, product_id)` child FK to parent composite PK.

157. **What is database constraint best practice?**
     Put critical invariants in DB constraints, name constraints clearly, and index FK columns.
     Example: Keep app validation too, but DB remains final source of truth.

158. **What is concurrency control?**
     Concurrency control coordinates transactions so correctness is preserved under parallel load.
     Example: MVCC + locks + isolation level selection work together.

159. **What is data consistency strategy?**
     Consistency strategy combines transactions, constraints, idempotency, and reconciliation jobs.
     Example: Outbox pattern for reliable cross-service updates.

160. **What is replication lag?**
     Replication lag is delay between primary commit and replica replay.
     Example: Read-after-write on replica may return stale data under lag.

161. **What is replication slot?**
     Replication slot tracks subscriber progress and prevents early WAL removal.
     Example: Monitor inactive slots to avoid unbounded WAL disk growth.

162. **What is query cache?**
     PostgreSQL does not provide global result query cache like some systems.
     Example: Use application cache/Redis and rely on shared buffers for page caching.

163. **What is DB indexing tradeoff?**
     More indexes improve reads but slow writes and increase storage/maintenance.
     Example: On write-heavy tables, keep only highest-value indexes.

164. **What is table scan issue?**
     Full scans on large tables can cause high I/O and latency spikes.
     Example: Missing predicate index makes one API endpoint slow under load.

165. **What is DB connection exhaustion?**
     It occurs when incoming requests exceed available DB connections.
     Example: Burst traffic without pool limits can exhaust `max_connections` quickly.

166. **What is schema optimization?**
     Schema optimization aligns table design, keys, constraints, and types with access patterns.
     Example: Move large optional payload columns to side table to keep hot rows narrow.

167. **What is normalization tradeoff?**
     Higher normalization improves integrity but may increase join cost and query complexity.
     Example: OLTP tends normalized; analytics/reporting often uses denormalized projections.

168. **What is index overhead?**
     Index overhead includes extra disk, RAM pressure, and additional work per write.
     Example: Updating indexed columns touches both heap and index pages plus WAL.

169. **What is write-heavy optimization?**
     Optimize write-heavy systems by minimizing indexes, batching writes, and tuning checkpoints/autovacuum/WAL.
     Example: Use append-friendly schema and defer expensive secondary updates.

170. **What is read-heavy optimization?**
     Optimize read-heavy systems with selective indexes, read replicas, caching, and pre-aggregated views.
     Example: Materialized summary table for dashboard queries every 5 minutes.

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
