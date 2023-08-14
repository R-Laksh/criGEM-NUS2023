import { gql } from "@apollo/client";

export const GET_SPACE_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSpaceListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`