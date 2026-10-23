# บันทึกการไล่ปัญหา (Debug Log)

แต่ละ bug ตอบ 6 ข้อ: อาการ, วิธีทำซ้ำ, เครื่องมือ, สาเหตุ, วิธีแก้, test ที่กันไม่ให้กลับมา

---

## BUG #0 · ค่าขอบรายละเอียด 10 ตัวอักษร (test เจอ — ไม่มีผู้ใช้แจ้ง)

- **อาการ:** ส่งรายละเอียด 10 ตัวอักษรพอดี ถูกปฏิเสธ ทั้งที่ข้อความบอกว่า "อย่างน้อย 10"
- **วิธีทำซ้ำ:** unit test `validateRequestInput({ ...valid, details: '1234567890' })`
- **เครื่องมือ:** unit test ค่าขอบ (TC-03)
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/validators/requestValidator.js` บรรทัดที่ 37 เงื่อนไข `length <= MIN_DETAILS` ทำให้ 10 ตัวถูกนับว่าไม่ผ่าน
- **วิธีแก้:** เปลี่ยนเครื่องหมายเป็น `length < MIN_DETAILS`
- **test ที่กัน:** `tests/unit/requestValidator.test.js` -> "10 ตัวอักษร → ผ่าน (ตรงขอบพอดี)"

## BUG #1 · ลบคำร้องแล้วเพิ่มใหม่ ได้ 500

- **อาการ:** หลังลบคำร้องรายการกลาง การสร้างคำร้องใหม่ได้ 500
- **วิธีทำซ้ำ:** `DELETE /api/requests/REQ-002` แล้ว `POST /api/requests`
- **เครื่องมือ:** อ่าน log ใน terminal เจอ `UNIQUE constraint failed: requests.id` จึงวาง breakpoint ใน `nextId()`
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/services/requestService.js` ฟังก์ชัน `nextId()` คำนวณรหัสจาก `COUNT(*) + 1` เมื่อลบรายการกลาง จำนวนลดลง รหัสที่ได้จึงชนกับรหัสเดิมที่มีอยู่
- **วิธีแก้:** คิวรีหารหัสล่าสุดด้วย `ORDER BY id DESC LIMIT 1` แล้วนำตัวเลขมาบวก 1
- **test ที่กัน:** `tests/integration/requests.api.test.js` -> "ลบรายการกลาง แล้วเพิ่มใหม่ → 201 และรหัสไม่ซ้ำของเดิม"

## BUG #2 · Dashboard แสดง "กำลังดำเนินการ 0"

- **อาการ:** การ์ดสรุปบอกว่ากำลังดำเนินการ 0 แต่ในรายการมีคำร้อง in-progress
- **วิธีทำซ้ำ:** เปิด Dashboard ตรวจสอบการ์ดสรุปผล
- **เครื่องมือ:** Chrome DevTools แท็บ Network พบว่า `GET /api/requests` ส่งค่า status เป็น `"in-progress"` ถูกต้อง ปัญหาจึงอยู่ที่ฝั่ง frontend
- **สาเหตุ (ไฟล์:บรรทัด):** `frontend/src/utils/requestSummary.js` ฟังก์ชัน `summarizeRequests` นับด้วย `'in progress'` (เว้นวรรค) ซึ่งไม่ตรงกับ `'in-progress'` ของ API
- **วิธีแก้:** เปลี่ยนเป็น `'in-progress'` ให้ตรงกับ API
- **test ที่กัน:** `frontend/src/utils/requestSummary.test.js` -> "นับครบทุกสถานะ"

## BUG #3 · เปลี่ยนสถานะคำร้องที่ไม่มีอยู่ ได้ 500

- **อาการ:** `PUT /api/requests/REQ-999` ได้ 500 แทน 404
- **วิธีทำซ้ำ:** `curl -X PUT localhost:3001/api/requests/REQ-999 -H "Content-Type: application/json" -d '{"status":"completed"}'`
- **เครื่องมือ:** อ่าน stack trace ใน terminal พบ `TypeError: Cannot read properties of null (reading 'id')` ที่ `requestController.js`
- **สาเหตุ (ไฟล์:บรรทัด):** `api/src/controllers/requestController.js` ใน `updateRequestStatus` มีการเรียก log `updated.id` ก่อนตรวจ `if (!updated)` ทำให้เกิด error เมื่อ updated เป็น null
- **วิธีแก้:** ย้าย `console.log` ไปไว้หลังการตรวจ null
- **test ที่กัน:** `tests/integration/requests.api.test.js` -> "คำร้องที่ไม่มีอยู่ → 404 (ไม่ใช่ 500)"
