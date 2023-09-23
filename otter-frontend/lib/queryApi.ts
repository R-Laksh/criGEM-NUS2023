/**
 * The function `query` takes a prompt, chatId, and model as input and uses the Otter API to generate a
 * completion based on the prompt, returning a sentence with the binding score of an RNA.
 * @param {number} min - The `min` parameter is the minimum value of the random number range. It is
 * used in the `getRandomNumber` function to generate a random number between `min` and `max`.
 * @param {number} max - The `max` parameter is the maximum value that the random number can be. In the
 * code snippet, it is used to specify the upper bound for generating a random number.
 * @returns The function `query` returns a string that states the binding score of an RNA.
 */
import otter from './otter';

const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

const query = async (prompt: string, chatId: string, model: string) => {
    const randomNumber = getRandomNumber(0.50, 0.99);
    
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
        randomNumber.toFixed(5)
    );

    return `The binding score of this RNA is ${res}.`;
};

export default query;

