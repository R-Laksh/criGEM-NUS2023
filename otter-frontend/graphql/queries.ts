import { gql } from "@apollo/client";

export const GET_POST_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getPostListByPostId(post_id: $post_id) {
            body
            comments {
                created_at
                id
                post_id
                text
                name
            }
            created_at
            id
            image
            space {
                created_at
                id
                topic
            }
            title
            space_id
            name
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

export const GET_ALL_POSTS_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getPostListByTopic(topic: $topic) {
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