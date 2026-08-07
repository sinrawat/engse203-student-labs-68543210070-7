# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: ศิลวัต อาซอง
- รหัสนักศึกษา: 68543210070-7
- Section: SEC-2

## URLs

- Repository: https://github.com/sinrawat/engse203-student-labs-68543210070-7
- Pull Request: TODO
- GitHub Pages: TODO

## Component Tree

```text
App (State Owner: requests, statusFilter)
├── AppHeader (Props: title, subtitle)
├── SummaryPanel (Props: summary)
├── RequestForm (State Owner: formData, errors, feedback; Callback: onAddRequest)
├── FilterBar (Props: value; Callback: onFilterChange)
└── RequestList (Props: requests; Callback: onDeleteRequest)
    └── RequestCard (Props: request; Callback: onDeleteRequest)
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

App เป็น state owner ของ requests และ statusFilter

- requests: รายการคำร้องทั้งหมด
- statusFilter: ตัวกรองสถานะ
- App คำนวณ summary และ filteredRequests จาก state
- App ส่ง summary ลงไปให้ SummaryPanel ผ่าน props
- App ส่ง onAddRequest ให้ RequestForm เพื่อรับข้อมูลคำร้องใหม่
- App ส่ง value และ onFilterChange ให้ FilterBar เพื่อควบคุมตัวกรอง
- App ส่ง requests และ onDeleteRequest ให้ RequestList
- RequestList ส่งข้อมูล request และ callback การลบต่อให้ RequestCard

RequestForm มี local state ของตัวเอง ได้แก่ formData, errors และ feedback
โดย formData เป็น controlled form และอัปเดตผ่าน handleChange
เมื่อ submit สำเร็จ RequestForm เรียก onAddRequest callback กลับไปที่ App

การไหลของข้อมูลเป็นแบบ State → Props ลงไปยัง child components
และ Callback → ส่งเหตุการณ์กลับขึ้นไปยัง App

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | TODO | TODO | TODO |
| TC-02 Controlled input | TODO | TODO | TODO |
| TC-03 Invalid | TODO | TODO | TODO |
| TC-04 Valid add | TODO | TODO | TODO |
| TC-05 Filter | TODO | TODO | TODO |
| TC-06 All | TODO | TODO | TODO |
| TC-07 Empty | TODO | TODO | TODO |
| TC-08 Delete | TODO | TODO | TODO |
| TC-09 Mobile | TODO | TODO | TODO |
| TC-10 Keyboard | TODO | TODO | TODO |
| TC-11 Build | TODO | TODO | TODO |
| TC-12 Pages | TODO | TODO | TODO |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

ใน Week 03 การอัปเดต UI ต้องเข้าถึง DOM โดยตรง เช่น document.querySelector หรือ .innerHTML ซึ่งมีความซ้ำซ้อนและเสี่ยงต่อการหลุดของข้อมูล ใน Week 04 เมื่อเปลี่ยนเป็น State-driven UI ของ React การเปลี่ยนแปลงข้อมูล (State) จะส่งผลให้ React คำนวณ Virtual DOM และ re-render UI ที่เกี่ยวข้องให้อัตโนมัติ โดยเน้น One-Way Data Flow และ Immutable State ทำให้โค้ดมีความเป็นระเบียบ อ่านง่าย ปลอดภัย และทดสอบได้ง่ายยิ่งขึ้น

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”

