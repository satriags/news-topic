import pgPromise from 'pg-promise';
const pg = pgPromise({});
export const db = pg("postgres://postgres:root@localhost:5432/news_topic");