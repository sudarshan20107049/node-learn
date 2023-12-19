import { connect } from "mongoose";

const connectDb = async () => {
    try {
        await connect(process.env.DB_URI)
        console.log("Connection Successfully Established")

    } catch (error) {
        console.log(`while error on Dbconnection : ${error.message}`)
    }
};
export default connectDb