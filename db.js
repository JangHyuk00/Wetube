import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

// save connection of mongoose as db
const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = error => console.log(`❌ Error on DB connection:${error}`);
// once is happening only once, open is open a connection to above function
db.once("open", handleOpen);
db.on("error", handleError);