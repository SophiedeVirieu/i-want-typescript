import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from '@jest/globals';

describe('Routes API', () => {
  it('la GET répond correctement', async () => {
    const response = await request(app).get('/api/v1/sysinfo');

    expect(response.status).toBe(200);
  });

  it('GET /route-inconnue répond 404', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(404);
  });
});