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
        const newSocket = io("http://localhost:4000");

        newSocket.on("connect", () => {
            console.log("✅ Connected to socket server:", newSocket.id);
            setSocket(newSocket);

            // Emit "newUser" only when socket is fully ready
            if (currentUser) {
                newSocket.emit("newUser", currentUser.id);
                console.log("📢 Emitted newUser:", currentUser.id);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [currentUser]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
