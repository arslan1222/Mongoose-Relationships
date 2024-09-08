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
    name: String,
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// Post 1
/*
async function addPost(){
    let user1 = await User({
        name: "Arslan",
        email: "arslan@gmail.com"
    });

    let post1 = await Post({
        content: "Beautiful Mosque",
        likes: 4589,
    });

    post1.user = user1;

    let user01 = await user1.save();
    let post01 = await post1.save();

    console.log(user01);
    console.log(post01); 
}

addPost();
*/

async function addPost(){
    let user = await User.findOne({name: "Arslan"});

    let post3 = await Post({
        content: "Karachi",
        likes: 4539,
    });

    post3.user = user;

    let post03 = await post3.save();

    console.log(post03);
    
}

// addPost();

async function getData(){
    let getdata = await Post.findOne({}).populate("user"); // Here I have used the populate
    console.log(getdata);
    
}
getData();