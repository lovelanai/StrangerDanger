import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

export const UserContext = createContext({
  user: "",
  setUser: () => {},
  socket: undefined,
  connect: () => {},
  rooms: [],
  createNewRoom: Boolean,
  setcreateNewRoom: () => {},
  currentRoom: undefined,
  joinRoom: () => {},
  sendMessage: () => {},
});

const socket = io({ autoConnect: false });

const ContextUserProvider = (props) => {
  const [user, setUser] = useState("");
  const [createNewRoom, setcreateNewRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  // sets nickname for session
  useEffect(() => {
    socket.auth = { nickname: user };
  }, [user]);

  // connecting to socket on join chat button
  const connect = () => {
    if (socket.auth.nickname) {
      socket.connect();

      socket.on("welcome", (message) => {
        console.log(message);
      });

      socket.on("connect", () => {
        console.log("Connected");
      });
    }
  };

  const joinRoom = (roomName) => {
    if (currentRoom) {
      socket.emit("leave", currentRoom);
    }
    socket.emit("join", roomName);
    setCurrentRoom(roomName);
    // setMessages([]);
  };

  const sendMessage = (message) => {
    socket.emit("message", message, currentRoom);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        socket,
        connect,
        rooms,
        createNewRoom,
        setcreateNewRoom,
        currentRoom,
        joinRoom,
        sendMessage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default ContextUserProvider;
