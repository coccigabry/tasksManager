import { Pool } from 'pg'

let conn: any

if (!conn) {
    conn = new Pool({
        user: process.env.NEXT_PUBLIC_DB_USER,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        host: 'localhost',
        port: 5432,
        database: 'nextjspostgrests'
    })
}

export { conn }