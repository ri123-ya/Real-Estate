import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log("Current online users:", onlineUser);//debug
    console.log("Looking for receiverId:", receiverId);//debug
    const receiver = getUser(receiverId);

    if (!receiver) {
      console.error("Receiver not found for ID:", receiverId);
      return; // Stop execution if the receiver is not online
    }
    io.to(receiver.socketId).emit("getMessage", data);

    console.log("Receiver found:", receiver);//debug
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
}); 

io.listen("4000");