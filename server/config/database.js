const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//database connect
exports.connect = () => {
mongoose.connect(
    process.env.MONGODB_URL,
    {
        dbName:"Kumbh_Connect",
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
).then(() => console.log("DB Connected Successfully"))
.catch( (error) => {
    console.log("DB Connection Failed");
    console.error(error);
    process.exit(1);
} )
};