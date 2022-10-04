"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fastify_1 = __importDefault(require("fastify"));
const postgres_1 = require("@fastify/postgres");
const db = (0, fastify_1.default)();
exports.db = db;
db.register(postgres_1.fastifyPostgres, {
    connectionString: 'postgres://postgres:root@localhost:5432/news_topic',
});
db.get('/calc', async () => {
    const client = await db.pg.connect();
    const sumResult = await client.query('SELECT 2 + 2 as sum');
    client.release();
    return {
        sum: sumResult.rows,
    };
});
