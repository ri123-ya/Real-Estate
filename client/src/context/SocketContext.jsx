// import { createContext, useContext, useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { AuthContext } from "./AuthContext";

// export const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//     const { currentUser } = useContext(AuthContext);
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         setSocket(io("http://localhost:4000"));
//     }, []);

//     useEffect(() => {
//         currentUser && socket?.emit("newUser", currentUser.id);
//     }, [currentUser, socket]);

//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Skip the socket connection if no currentUser exists
        if (!currentUser) return;

        // Create socket only if it doesn't exist
        if (!socket) {
            const newSocket = io("https://estate-deployed-s448.onrender.com", {
                transports: ["websocket"], // Prefer WebSocket for stable connection
            });

            newSocket.on("connect", () => {
                console.log("✅ Connected to socket server:", newSocket.id);
                setSocket(newSocket);

                // Emit "newUser" only when socket is fully ready
                newSocket.emit("newUser", currentUser.id);
                console.log("📢 Emitted newUser:", currentUser.id);
            });

            // Cleanup: Disconnect socket when component unmounts or user changes
            return () => {
                newSocket.disconnect();
            };
        } else {
            // If socket exists, just emit "newUser"
            socket.emit("newUser", currentUser.id);
            console.log("📢 Re-emitted newUser:", currentUser.id);
        }
    }, [currentUser]); // Re-run only when currentUser changes

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
