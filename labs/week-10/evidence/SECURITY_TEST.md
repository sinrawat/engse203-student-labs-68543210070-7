# ผลการทดสอบ SQL Injection

## ① เงื่อนไขที่เป็นจริงเสมอ

**ยิง**

`GET /api/requests?status=x' OR '1'='1`

**ผลที่ได้**

`[]` (0 รายการ)

**ผล:** ผ่าน ✓

**เหตุผล:** ใช้ parameterized query โดยใช้ `?` ทำให้ค่าที่ผู้ใช้ส่งเข้ามาถูกตีความเป็นข้อความ ไม่ใช่คำสั่ง SQL

---

## ② พยายามลบตาราง

**ยิง**

`GET /api/requests?status='; DROP TABLE requests; --`

**ผลที่ได้**

`[]` (0 รายการ)

จากนั้นเรียก:

`GET /api/requests`

ระบบยังสามารถคืนข้อมูลคำร้องได้ตามปกติ

**ผล:** ผ่าน ✓

**เหตุผล:** ค่า input ถูกส่งผ่าน parameterized query จึงไม่สามารถถูก execute เป็น SQL command ได้

---

## ③ ต่อเงื่อนไขเพิ่ม

**ยิง**

`GET /api/requests?status=pending' OR status='completed`

**ผลที่ได้**

`[]` (0 รายการ)

**ผล:** ผ่าน ✓

**เหตุผล:** input ถูกส่งเป็น parameter จึงไม่สามารถเปลี่ยนโครงสร้างของ SQL query ได้