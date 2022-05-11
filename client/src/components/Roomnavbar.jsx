import "./Roomnavbar.css";
import { useUser } from "../context/ContextUser";

function Roomnavbar() {
  const { newRoom, joinRoom, rooms, currentRoom, joinAvalibleRoom } = useUser();

  return (
    <div className="Room-nav-container">
      <div className="containerRooms">
        <h2>Chatrooms</h2>
        {rooms.map((room, index) => (
          <div key={index}>
            <button
              className="roomsButtons"
              disabled={currentRoom === room}
              value={room || ""}
              onClick={joinAvalibleRoom}
            >
              {room}
            </button>
          </div>
        ))}
        <button onClick={newRoom} className="newRoom">
          Skapa nytt rum
        </button>
      </div>
    </div>
  );
}

export default Roomnavbar;
