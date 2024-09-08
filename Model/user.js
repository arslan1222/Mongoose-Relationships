const mongoose = require("mongoose");
const {Schema} = mongoose;

const DB_Connection = "mongodb://127.0.0.1:27017/mdbrelationships";

async function main() {
    await mongoose.connect(DB_Connection);
}

main()
    .then(() => {
        console.log("Database Connected")})
    .catch((err) => {
        console.log(err);
    });

const userSchema = new Schema({
    username: String,
    addresses : [
        {
            location : String,
            city: String
        }
    ]
});

const User = mongoose.model("User", userSchema);

// One to few relation

const addUsers = async()=>{
    const user1 = User({
        username: "Arslan",
        addresses: [{
            _id: false, // We can set it to false
            location: "BB2 Baker Street",
            city: "Sialkot"
        }]
    });

    user1.addresses.push({location: "P20 Wallstreet", city: "Sialkot"});
    await user1.save();
}

addUsers();