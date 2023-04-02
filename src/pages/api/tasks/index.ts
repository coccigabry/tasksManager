import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";


export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req

    switch (method) {
        case 'GET':
            try {
                const query = 'SELECT * FROM tasks'
                const tasks = await conn.query(query)
                return res.status(200).json(tasks.rows)
            } catch (err) {
                console.error(err)
                return res.status(500).json('Something went wrong')
            }
        case 'POST':
            try {
                const { title, description } = body
                const postQuery = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *'
                const values = [title, description]
                const newTask = await conn.query(postQuery, values)
                return res.status(200).json(newTask.rows[0])
            } catch (err) {
                console.error(err)
                return res.status(500).json('Something went wrong')
            }
        default:
            return res.status(500).json('invalid method')
    }
}