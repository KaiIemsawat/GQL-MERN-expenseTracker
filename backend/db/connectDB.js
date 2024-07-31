import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `MONGODB connected : ${conn.connection.host}`.cyan.underline
        );
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
};