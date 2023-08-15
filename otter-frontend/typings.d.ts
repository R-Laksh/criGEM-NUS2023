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
}