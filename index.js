// import express from "express"
// import dotenv from "dotenv"
// import morgan from "morgan"
// import connect from "./config/db.js"

// // configure env
// dotenv.config()
// //database config
// // Call the connect function to establish the MongoDB connection
// connect().then(() => {
//     // Any additional code that depends on the database connection can go here
// }).catch((err) => {
//     // Handle connection errors here, if needed
//     console.error("Failed to connect to MongoDB:", err);
// });
// //rest object
// const app = express()
// //middleware
// app.use(express.json())
// app.use(morgan('dev'))
// //rest api
// app.get('/', (req, res) => {
//     res.send({
//         message: "hello "
//     });
// });
// const PORT = process.env.PORT || 8000;

// app.listen(PORT, () => {
//     console.log(`server running on ${PORT}`);
// })






