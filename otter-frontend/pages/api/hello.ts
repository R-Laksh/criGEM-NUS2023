/**
 * This is a TypeScript function that handles an API route in Next.js and returns a JSON response with
 * the name "John Doe".
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request. It contains information such as the request method, headers, query parameters, and body.
 * @param res - The `res` parameter is an instance of the `NextApiResponse` class, which represents the
 * HTTP response that will be sent back to the client. It provides methods and properties for setting
 * the response status, headers, and body.
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json( { name: 'John Doe' })
}
