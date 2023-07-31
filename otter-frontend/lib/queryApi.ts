import otter from './otter'

const query = async (prompt: string, chatId: string, model: string) => {
    const res = await otter.createCompletion({
        model,
        prompt,
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0, 
    }).then(res => res.data.choices[0].text)
    .catch(
        (err) => 
        // `OTTER was unable to find an output for that! (Error: ${err.message})`
        "I'm still waiting for my API, sorry :("
    );

    return res;
};

export default query;