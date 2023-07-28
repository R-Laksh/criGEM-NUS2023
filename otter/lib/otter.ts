// WHEN IT'S DONE, OTTER API GOES HERE.
// I'M USING OPENAI FOR NOW, SO REPLACE ACCORDINGLY. 
// ANYTHING YOU NOT SURE PLEASE TELE SYARWINA @syarwinaaa09
// THANK YOU ^_^

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai;