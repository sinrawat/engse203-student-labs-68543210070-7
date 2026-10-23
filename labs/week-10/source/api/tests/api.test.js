import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => { await loadSeed(); app = createApp(); });

/**
 * TODO W10-TEST (🏠 CP33) · เขียน test อย่างน้อย 6 เคส ที่ยิงเข้าฐานข้อมูลจริง
 *   1. GET /api/requests → 200 และได้ array
 *   2. คืน requesterName ไม่ใช่ requester_id
 *   3. GET /:id พบ → 200 · ไม่พบ → 404
 *   4. POST ถูกต้อง → 201
 *   5. POST ไม่ครบ → 400
 *   6. ยิง SQL injection ผ่าน ?status= แล้วต้องไม่หลุด
 */
describe('API tests', () => {
  test('GET /api/requests → 200 และได้ array', async () => {
    const r = await request(app).get('/api/requests');

    assert.equal(r.status, 200);
    assert.ok(Array.isArray(r.body));
  });

  test('คืน requesterName ไม่ใช่ requester_id', async () => {
    const r = await request(app).get('/api/requests');

    assert.equal(r.status, 200);
    assert.ok(r.body.length > 0);
    assert.ok('requesterName' in r.body[0]);
    assert.ok(!('requester_id' in r.body[0]));
  });

  test('GET /:id พบ → 200 และไม่พบ → 404', async () => {
    const found = await request(app).get('/api/requests/REQ-001');

    assert.equal(found.status, 200);

    const notFound = await request(app).get('/api/requests/REQ-999');

    assert.equal(notFound.status, 404);
  });

  test('POST ถูกต้อง → 201', async () => {
    const r = await request(app)
      .post('/api/requests')
      .send({
        requesterName: 'ทดสอบ CP33',
        requestType: 'อื่น ๆ',
        location: 'ห้องทดสอบ',
        details: 'รายละเอียดสำหรับทดสอบ CP33',
        priority: 'normal'
      });

    assert.equal(r.status, 201);
    assert.equal(r.body.requesterName, 'ทดสอบ CP33');
  });

  test('POST ไม่ครบ → 400', async () => {
    const r = await request(app)
      .post('/api/requests')
      .send({
        requesterName: 'ทดสอบ CP33'
      });

    assert.equal(r.status, 400);
  });

  test('SQL injection ผ่าน ?status= ไม่หลุด', async () => {
    const evil = encodeURIComponent("x' OR '1'='1");

    const r = await request(app)
      .get(`/api/requests?status=${evil}`);

    assert.equal(r.status, 200);
    assert.equal(r.body.length, 0);
  });
});
