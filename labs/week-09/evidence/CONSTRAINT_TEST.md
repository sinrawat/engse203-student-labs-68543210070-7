# CONSTRAINT_TEST.md — ผลการทดสอบ Constraint

### ① Foreign Key

**คำสั่งที่ลอง**

```sql
INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('TEST-FK', 999, 'แจ้งซ่อม', 'ห้อง 101', 'ทดสอบ Foreign Key', 'normal', 'pending');
```

**ผลที่ได้** `FOREIGN KEY constraint failed` ✓ ถูกปฏิเสธตามที่ควร

---

### ② CHECK

**คำสั่งที่ลอง**

```sql
INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('TEST-CHECK', 1, 'แจ้งซ่อม', 'ห้อง 101', 'ทดสอบ CHECK', 'normal', 'wrong-status');
```

**ผลที่ได้** `CHECK constraint failed` ✓ ถูกปฏิเสธตามที่ควร

---

### ③ UNIQUE

**คำสั่งที่ลอง**

```sql
INSERT INTO users
(name, department, email)
VALUES
('ทดสอบ UNIQUE', 'ทดสอบ', 'somchai@example.com');
```

**ผลที่ได้** `UNIQUE constraint failed` ✓ ถูกปฏิเสธตามที่ควร

---

### ④ PRIMARY KEY

**คำสั่งที่ลอง**

```sql
INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('REQ-001', 1, 'แจ้งซ่อม', 'ห้อง 999', 'ทดสอบ ID ซ้ำ', 'normal', 'pending');;
```

**ผลที่ได้** `UNIQUE constraint failed` ✓ ถูกปฏิเสธตามที่ควร

---

### ⑤ NOT NULL

**คำสั่งที่ลอง**

```sql
INSERT INTO requests
(id, requester_id, request_type, location, details, priority, status)
VALUES
('TEST-NOTNULL', 1, 'แจ้งซ่อม', NULL, 'ทดสอบ NOT NULL', 'normal', 'pending');;
```

**ผลที่ได้** `NOT NULL constraint failed` ✓ ถูกปฏิเสธตามที่ควร

---


