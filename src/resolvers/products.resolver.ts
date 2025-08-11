import { gql } from 'apollo-server-express';
import { ProductService } from '../services/products.service';
import { ApiKeyService } from '../services/api-key.service';

// GraphQL typeDefs
export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    stock: Int!
    price: Float!
    clientId: ID!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getProductById(id: ID!): Product
  }
`;

// Resolvers
export const resolvers = {
  Query: {
    async getProductById(_: any, args: { id: string }, context: any) {
      const apiKey = context.apiKey;

      if (!apiKey) {
        throw new Error('Missing or invalid API key');
      }

      const product = await ProductService.getByIdAndClient(args.id, apiKey.clientId);

      if (!product) {
        throw new Error('Product not found for this client or does not exist');
      }
      
      return product;
    },
  },
};
