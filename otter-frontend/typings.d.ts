/**
 * The above code defines TypeScript interfaces and types for a messaging system, including messages,
 * comments, votes, spaces, and posts.
 * @property {string} created_at - The `created_at` property is a timestamp that represents the date
 * and time when an object (such as a comment, vote, space, or post) was created. It is stored as a
 * string in ISO 8601 format.
 * @property {number} id - The "id" property is a unique identifier for each object. It is used to
 * distinguish one object from another.
 * @property {number} post_id - The `post_id` property is used to identify the post to which a comment
 * or vote belongs. It is a unique identifier for each post.
 * @property {string} text - The "text" property is a string that represents the content or message of
 * a message object.
 */
interface Message {
    text: string;
    createdAt: admin.firestore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string; 
    }
}

type Comments = {
    created_at: string
    id: number
    post_id: number
    text: string
}

type Vote = {
    created_at: string
    id: number
    post_id: boolean
    name: string
}

type Space = {
    created_at: string
    id: number
    topic: string
}

type Post = {
    body: string
    id: number
    image: string
    space_id: number
    title: string  
    name: string
    votes: Vote[]
    comments: Comments[]
    space: Space[]
    created_at: Date;
}