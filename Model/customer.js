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

// One to Many

const orderSchema = new Schema({
        item: String,
        price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
});

// These mongoose middlewares for delteion of customer 


// customerSchema.pre("findOneAndDelete", async()=>{
//     console.log("Pre Middleware");
    
// });

customerSchema.post("findOneAndDelete", async(customer)=>{
    if(customer.orders.length){
        let result = await Order.deleteMany({_id: {$in: customer.orders}});
        console.log(result);
    }
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

async function addCustomer(){
    
    let cust1 = new Customer({
        name: "Haider",
    });

    let order1 = await Order.findOne({item: "Laptop"});
    let order2 = await Order.findOne({item: "Mobile"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let result = await cust1.save();
    console.log(result);

    // await Customer.findByIdAndDelete("66daecadba5c88869e5f51a5");
}

// addCustomer();

/* Find Customer
async function findCustomer(){
    let result = await Customer.find({});  // use .populate("orders"); to see the object data
    console.log(result);      // console.log(result[0]); with populate
}
findCustomer();
*/

/* Delete by id
async function deleteCustomer(){
    let deleted = await Customer.findByIdAndDelete("give _id");
    console.log(deleted);
}
*/

// async function addOrders(){
//     let result = await Order.insertMany([
//         {item: "Laptop", price: 60000},
//         {item: "Mobile", price: 40000},
//         {item: "tab", price: 30000}
//     ])
//     console.log(result);
    
// }

// addOrders();

async function addCustomer(){
    let cust1 = await Customer(
        {
            name: "Ahmed",
        },
    );

    let order1 = await Order({
        item: "Mobile",
        price: 40000,
    });
    let order2 = await Order({
        item: "PC",
        price: 20000,
    });

    cust1.orders.push(order1);
    // cust1.orders.push(order2);

    await cust1.save();
    await order1.save();
    // await order2.save();

    console.log("Customer saved");

}
addCustomer();

async function delCustomer(){
    let deletedcust = await Customer.findByIdAndDelete("66dc0c04d92bb35f392ea9f8");
    console.log(deletedcust);
    
}

// delCustomer();