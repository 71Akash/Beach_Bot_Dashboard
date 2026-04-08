// import { io } from "socket.io-client";
// // For development us amr ip 192.168.0.117:3000
// // For testing and production use ip 192.168.0.5 ip of bot latte panda
// const socket = io("https://192.168.0.117:3000", { 
//     transports: ["websocket", "polling"],
//     secure: true,
//     rejectUnauthorized: false,
// });

// export default socket;

// updates needed when connecting to real robot server, for now this is a mock socket that logs emitted events to the console. 
// This allows the dashboard to function without a backend during development and testing.
const socket = {
  on: () => {},
  off: () => {},
  emit: (event, payload) => {
    console.log(`[Mock Socket Emit] ${event}`, payload);
  },
};

export default socket;