import {gql} from 'apollo-server-express';

//get 1 animal by id animal(id: ID!); Animal"

export default gql`
   extend type Query {
     animals: [Animal],
     animal(id: ID!); Animal
   }
   
   type Animal {
      id: ID
      animalName: String,
      species: Species,
   }
   
   extend type Mutation {
    addAnimal(
      animalName: String!,
      species: ID!
    ): Animal,
    modifyAnimal(
      id: ID!,
      animalName: String,
      species: ID
    ): Animal
   }
`;