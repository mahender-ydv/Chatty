import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, socket } = useAuthStore();
  const [isTyping, setIsTyping] = useState(false);

  const isOnline = selectedUser
    ? onlineUsers.includes(selectedUser._id)
    : false;

  useEffect(() => {
  if (!socket || !selectedUser) return;

  const handleTyping = ({ userId }) => {
    if (userId === selectedUser._id) setIsTyping(true);
  };

  const handleStopTyping = ({ userId }) => {
    if (userId === selectedUser._id) setIsTyping(false);
  };

  socket.on("typing", handleTyping);
  socket.on("stopTyping", handleStopTyping);

  return () => {
    socket.off("typing", handleTyping);
    socket.off("stopTyping", handleStopTyping);
  };
}, [socket, selectedUser?._id]);


  if (!selectedUser) return null;

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-light">
      <div className="d-flex align-items-center gap-2">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullName}
          className="rounded-circle border"
          style={{ width: "40px", height: "40px" }}
        />
        <div>
          <h6 className="mb-0">{selectedUser.fullName}</h6>
          <small className={isOnline ? "text-success" : "text-muted"}>
            {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
          </small>
        </div>
      </div>

      {/* Right: Close Button */}
      <button
        className="btn btn-sm btn-outline-secondary d-flex align-items-center"
        onClick={() => setSelectedUser(null)}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default ChatHeader;

