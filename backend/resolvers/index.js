import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./useResolver.js";
import transactionResolver from "./transactionResolver.js";

const mergeResolvers = mergeResolvers([userResolver, transactionResolver]);

export default mergeResolvers;
