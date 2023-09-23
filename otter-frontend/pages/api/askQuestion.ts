/**
 * This is a TypeScript function that handles an API route in a Next.js application. It receives a
 * request with a prompt, chatId, model, and session, and uses the prompt to query an external API
 * called OTTER. It then saves the response as a message in a Firebase Firestore database and returns
 * the response as the answer.
 * @param {NextApiRequest} req - The `req` parameter is the NextApiRequest object, which represents the
 * incoming HTTP request to the API route. It contains information such as the request method, headers,
 * query parameters, and body.
 * @param res - The `res` parameter is the NextApiResponse object, which is used to send the response
 * back to the client. It contains methods like `status()` to set the HTTP status code, and `json()` to
 * send a JSON response.
 * @returns The API route is returning a JSON object with the property "answer" which contains the text
 * message.
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import query from '../../lib/queryApi';
import admin from "firebase-admin";
import { adminDb } from '@/firebaseAdmin';

type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {


    const {prompt, chatId, model, session } = req.body;

    if (!prompt) {
        res.status(400).json({ answer: "Please provide an RNA sequence!" });
        return;
    }

    if (!chatId) {
        res.status(400).json({ answer: "Please provide a valid chat ID!" });
        return; 
    }

    // OTTER query
    const response = await query(prompt, chatId, model)

    const message: Message = {
        text: response || "OTTER was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'OTTER',
            name: 'OTTER',
            avatar: "./OtterLogo.png"
        },
    };

    await adminDb
    .collection('users')
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

    res.status(200).json( { answer: message.text })
}