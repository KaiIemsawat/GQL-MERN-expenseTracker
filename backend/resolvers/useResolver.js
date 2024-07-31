import bcrypt from "bcryptjs";

import { users } from "../dummyData/data.js";
import User from "../models/userModel.js";

const userResolver = {
    Mutation: {
        signUp: async (_, { input }, context) => {
            try {
                const { username, name, password, gender } = input;

                if (!username || !name || !password || !gender) {
                    throw new Error("All fields are required");
                }

                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already exists");
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const boyProfilePlaceholder = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePlaceholder = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture:
                        gender === "male"
                            ? boyProfilePlaceholder
                            : girlProfilePlaceholder,
                });

                await newUser.save();
                await context.login(newUser);
                return newUser;
            } catch (error) {
                console.error("Error in signup : ", error);
                throw new Error(error.message || "Internal server error");
            }
        },

        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                const { user } = await context.authenticate("graphql-local", {
                    username,
                    password,
                });

                await context.login(user);

                return user;
            } catch (error) {
                console.error("Error in login : ", error);
                throw new Error(error.message || "Internal server error");
            }
        },
    },
    Query: {
        users: (_, _, { req, res }) => {
            return users;
        },
        user: (_, { userId }) => {
            return users.find((user) => user._id === userId);
        },
    },
};

export default userResolver;
