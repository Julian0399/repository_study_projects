import app from "./app.js";
import { connectDB } from "./db.js";
// Connect to the database
connectDB();
// Start the server on port 3000
app.listen(3000)
console.log("Server is running on port",3000);