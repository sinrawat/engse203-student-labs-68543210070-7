-- ═══════════════════════════════════════════════════════════
-- Campus Service Request — โครงสร้างฐานข้อมูล
-- ENGSE203 สัปดาห์ที่ 9 · หน่วยที่ 4
--
-- 🏠 TODO W09-SCHEMA (CP23)
-- ไฟล์นี้ต้องรันแล้วสร้างฐานข้อมูลได้ครบทั้งหมดในครั้งเดียว
-- และต้อง "รันซ้ำได้" โดยไม่ error
-- ═══════════════════════════════════════════════════════════

PRAGMA foreign_keys = ON;

-- TODO ①  ลบตารางเดิมก่อน เพื่อให้รันไฟล์นี้ซ้ำได้
--         ⚠ ลำดับสำคัญ — ต้องลบตารางที่มี foreign key ก่อน
--         คำใบ้: DROP TABLE IF EXISTS ...
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS users;

-- TODO ②  สร้างตาราง users
--         ต้องมี: id (PK, INTEGER, AUTOINCREMENT)
--                name (TEXT, ห้ามว่าง)
--                department (TEXT, ห้ามว่าง)
--                email (TEXT, ห้ามว่าง, ห้ามซ้ำ)
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- TODO ③  สร้างตาราง requests
--         ต้องมี: id (PK, TEXT — ใช้รหัสแบบ REQ-001)
--                requester_id (INTEGER, ห้ามว่าง, ชี้ไป users(id))
--                request_type (TEXT, ห้ามว่าง, จำกัดค่าด้วย CHECK)
--                location, details (TEXT, ห้ามว่าง)
--                priority (ค่าเริ่มต้น 'normal', จำกัดด้วย CHECK)
--                status (ค่าเริ่มต้น 'pending', จำกัดด้วย CHECK)
--                created_at (ค่าเริ่มต้นเป็นเวลาปัจจุบัน)
--
--         ⚠ อย่าลืม FOREIGN KEY — เป็นหัวใจของสัปดาห์นี้
CREATE TABLE requests (
    id TEXT PRIMARY KEY,
    requester_id INTEGER NOT NULL,
    request_type TEXT NOT NULL
        CHECK (request_type IN ('แจ้งซ่อม', 'ขอใช้อุปกรณ์', 'แจ้งปัญหา')),
    location TEXT NOT NULL,
    details TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal'
        CHECK (priority IN ('normal', 'urgent')),
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'in-progress', 'completed')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (requester_id)
        REFERENCES users(id)
);

-- TODO ④  ใส่ข้อมูลตั้งต้น
--         users อย่างน้อย 4 คน · requests อย่างน้อย 5 รายการ
INSERT INTO users (id, name, department, email)
VALUES
    (1, 'สมชาย ใจดี', 'วิศวกรรมซอฟต์แวร์', 'somchai@example.com'),
    (2, 'สุภาวดี รักเรียน', 'วิทยาการคอมพิวเตอร์', 'supawadee@example.com'),
    (3, 'ธนกฤต ตั้งใจ', 'วิศวกรรมซอฟต์แวร์', 'thanakrit@example.com'),
    (4, 'กมลชนก สดใส', 'เทคโนโลยีสารสนเทศ', 'kamonchanok@example.com');

INSERT INTO requests
    (id, requester_id, request_type, location, details, priority, status)
VALUES
    ('REQ-001', 1, 'แจ้งซ่อม', 'ห้องปฏิบัติการ 301',
     'คอมพิวเตอร์เปิดไม่ติด', 'urgent', 'pending'),

    ('REQ-002', 2, 'แจ้งปัญหา', 'ห้องเรียน 201',
     'โปรเจคเตอร์แสดงผลไม่ชัด', 'normal', 'in-progress'),

    ('REQ-003', 3, 'ขอใช้อุปกรณ์', 'ห้องปฏิบัติการ 402',
     'ขอยืมอุปกรณ์สำหรับการเรียน', 'normal', 'completed'),

    ('REQ-004', 4, 'แจ้งซ่อม', 'อาคารเรียน A',
     'เครื่องปรับอากาศไม่ทำงาน', 'urgent', 'pending'),

    ('REQ-005', 1, 'แจ้งปัญหา', 'ห้องสมุด',
     'ระบบอินเทอร์เน็ตช้า', 'normal', 'in-progress');

INSERT INTO requests
    (id, requester_id, request_type, location, details, priority, status)
VALUES
    ('REQ-006', 2, 'แจ้งซ่อม', 'ห้องปฏิบัติการ 401',
     'ไฟในห้องกะพริบตลอดเวลา', 'normal', 'pending'),

    ('REQ-007', 3, 'ขอใช้อุปกรณ์', 'ห้องเรียน 203',
     'ขอยืมไมโครโฟนสำหรับกิจกรรม', 'normal', 'completed'),

    ('REQ-008', 4, 'แจ้งซ่อม', 'ห้องสมุด ชั้น 3',
     'ไฟเพดานดับ', 'urgent', 'in-progress');