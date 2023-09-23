/**
 * This is a Next.js API route that retrieves a list of models from an otter library and returns them
 * as options with their values and labels.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request. It contains information such as the request method, headers, query parameters, and body.
 * @param res - The `res` parameter is the NextApiResponse object, which is used to send the response
 * back to the client. It has methods like `status()` to set the HTTP status code, and `json()` to send
 * a JSON response.
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import otter from "../../lib/otter";

type Option = {
    value: string;
    label: string;
};

type Data = {
    modelOptions: Option[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const models = await otter.listModels().then((res) => res.data.data);

    const modelOptions = models.map((model) => ({
        value: model.id,
        label: model.id,
    }));

    res.status(200).json({
        modelOptions, 
    });
}