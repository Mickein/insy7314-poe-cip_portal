const request = require('supertest');
const express = require('express');

const app = express();
app.get('/health', (req, res) => res.status(200).json({ message: 'OK' }));

describe('Basic backend tests', () => {
  it('should return OK on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('OK');
  });
});
