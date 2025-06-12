const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: {
    origin: "http://localhost:3000", // your React app's URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const emailToSocketIdMap = new Map();
const socketToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.on("room:join", (data) => {
    const { email, room } = data;

    // Map email to socket ID
    emailToSocketIdMap.set(email, socket.id);
    socketToEmailMap.set(socket.id, email);

    // Join the room
    socket.join(room);

    // Notify other users in the room about the new user
    socket.to(room).emit("user:joined", { email, id: socket.id });

    // Send confirmation to the joining user
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });
  socket.on("peer:nego:needed",({to, offer}) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });
  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});