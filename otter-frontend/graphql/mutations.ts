import { gql } from "@apollo/client";

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