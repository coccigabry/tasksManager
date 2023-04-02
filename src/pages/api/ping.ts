import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../utils/database";

type Data = string

export default async function (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const response = await conn.query('SELECT NOW()')
    return res.status(200).json(response.rows[0].now)
}