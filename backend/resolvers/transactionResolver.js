import Transaction from "../models/transactionModel.js";

const transactionResolver = {
    Query: {
        transactions: async (_, _, context) => {
            try {
                if (!context.getUser()) {
                    throw new Error("Unauthorized");
                }
                const userId = await context.getUser()._id;

                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (error) {
                console.error("Error getting transactions : ", error);
                throw new Error("Error getting transactions");
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (error) {
                console.error("Error getting transaction : ", error);
                throw new Error("Error getting transaction");
            }
        },
        // TODO => ADD category statistics query
    },
    Mutation: {},
};

export default transactionResolver;
