import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $text: String!) {
        insertComment(post_id: $post_id, text: $text, username: $username) {
            created_at
            id
            post_id
            text
            name
        }
    }
`

export const ADD_POST = gql`
    mutation MyMutation(
        $body: String!
        $image: String!
        $space_id: String!
        $title: ID!
        $name: String!
    ) {
        insertPost(
            body: $body
            image: $image
            space: $space_id
            title: $title
            name: $name
        ) {
            body
            created_at
            id
            image
            space_id
            title
            username
        }
    }
`

export const ADD_SPACE = gql `
    mutation MyMutation($topic: String!) {
        insertSpace(topic: $topic) {
            id
            topic
            created_at
        }
    }
`