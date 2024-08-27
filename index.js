const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes/route");
const dotenv = require("dotenv");
const cors = require("cors")
const http = require("http");
const { Server } = require("socket.io");
const Chat = require("./model/chat");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully")) // eslint-disable-line no-console
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Handle WebSocket connections
io.on("connection",(socket)=>{
  console.log("a user connected");
    // Handle sending a message
  socket.on("sendMessage", async(data) => {
    const {videoId,name,message} = data
    const chat = new Chat({
      videoId,
      name,
      message,
    })
    await chat.save()
       // Broadcast the message to other clients
   io.emit("receiveMessage", data);
  })
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    });

})



app.use("/api", routes);

// key difference here is that server.listen will handle both HTTP requests and WebSocket connections, whereas app.listen would only handle the HTTP part.
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); // eslint-disable-line no-console
module.exports = app; // eslint-disable-line no-unused-vars
