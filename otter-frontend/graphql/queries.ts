import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query MyQuery {
        postList {
            body
            created_at
            id
            image
            title
            space_id
            name
            comments {
                created_at
                id
                post_id
                text
                name
            }
            space {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                name
            }
        }
    }
`
export const GET_SPACE_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSpaceListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`