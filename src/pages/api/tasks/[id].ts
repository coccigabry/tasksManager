import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";


export default async function (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, body } = req
    const { id } = req.query

    switch (method) {
        case 'GET':
            try {
                const query = 'SELECT * FROM tasks WHERE id = $1'
                const values = [id]
                const task = await conn.query(query, values)
                if (task.rows.length === 0) return res.status(404).json('Task not found')
                return res.status(200).json(task.rows[0])
            } catch (err) {
                console.error(err)
                return res.status(500).json('Something went wrong')
            }
        case 'PUT':
            try {
                const { title, description } = body
                const query = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *'
                const values = [title, description, id]
                const task = await conn.query(query, values)
                if (task.rows.length === 0) return res.status(404).json('Task not found')
                return res.status(200).json('Task deleted successfully')
            } catch (err) {
                console.error(err)
                return res.status(500).json('Something went wrong')
            }
        case 'DELETE':
            try {
                const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
                const values = [id]
                const task = await conn.query(query, values)
                if (task.rows.length === 0) return res.status(404).json('Task not found')
                return res.status(200).json('Task deleted successfully')
            } catch (err) {
                console.error(err)
                return res.status(500).json('Something went wrong')
            }
        default:
            return res.status(500).json('invalid method')
    }
}