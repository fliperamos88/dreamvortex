process.env.NODE_ENV = 'test';
import { sequelize } from '../config/config.js';
import * as fs from 'fs';
import app from '../app.js';
import request from 'supertest';

beforeAll(async () => {
  await sequelize.sync({ force: true });
  const sql_string = fs.readFileSync('./database/db_test_seed.sql', 'utf8');
  await sequelize.query(sql_string);
  console.log('DB_TEST seeding concluded.');
});

describe('GET /api/setting', () => {
  test('Get all settings', async () => {
    const res = await request(app).get('/api/setting');
    expect(res.statusCode).toBe(200);
    expect(res.body.settings.length).toEqual(5);
  });
  test('Get forest settings', async () => {
    const res = await request(app).get('/api/setting/forest');
    expect(res.statusCode).toBe(200);
    expect(res.body.setting.name).toBe('forest');
    expect(res.body.setting.dialogues.length).toBe(9);
  });
});

describe('POST /api/player', () => {
  test('Create Player', async () => {
    const res = await request(app)
      .post('/api/player')
      .send({ player_id: 'player_1' });
    expect(res.statusCode).toBe(200);
    expect(res.body.player.player_id).toBe('player_1');
  });
});

describe('GET /api/player', () => {
  test('Get all players', async () => {
    const res = await request(app).get('/api/player');
    expect(res.statusCode).toBe(200);
    expect(res.body.players.length).toBe(1);
    expect(res.body.players[0].player_id).toBe('player_1');
  });
});

describe('POST & GET /api/player', () => {
  test('Create Player', async () => {
    const res = await request(app)
      .post('/api/player')
      .send({ player_id: 'player_2' });
    expect(res.statusCode).toBe(200);
    expect(res.body.player.player_id).toBe('player_2');
  });
  test('Get player', async () => {
    const res = await request(app).get('/api/player/player_2');
    expect(res.statusCode).toBe(200);
    expect(res.body.player.player_id).toBe('player_2');
  });
});

describe('DELETE /api/player', () => {
  test('Delete player', async () => {
    const res = await request(app).delete('/api/player/player_2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ msg: 'Player Deleted' });
  });
});

afterAll(async () => {
  await sequelize.drop();
  await sequelize.close();
});
