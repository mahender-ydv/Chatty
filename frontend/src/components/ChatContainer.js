import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "./Utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader />

      {/* Messages Container */}
      <div className="flex-grow-1 overflow-auto p-3">
        {isMessagesLoading ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading messages...</span>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            // <div
            //   key={msg._id}
            //   className={`d-flex mb-3 ${msg.senderId === authUser._id ? "justify-content-end" : "justify-content-start"}`}
            // >
            <div
              key={msg._id || `${msg.senderId}-${msg.createdAt}-${Math.random()}`}
              className={`d-flex mb-3 ${msg.senderId === authUser._id ? "justify-content-end" : "justify-content-start"}`}
            >
              <div>

                <div
                  className={`p-1 rounded ${msg.senderId === authUser._id ? "bg-primary text-white" : "bg-light text-dark"}`}
                  style={{ maxWidth: "300px" }}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Attachment"
                      className="img-fluid rounded mb-2"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                  {msg.text && (
                    <div className="d-inline-flex align-items-end gap-1 flex-wrap">
                      <span className="mb-0">{msg.text}</span>
                      <span
                        className={`${msg.senderId === authUser._id ? "text-white-50" : "text-muted"}`}
                        style={{ fontSize: "0.65rem", lineHeight: "1" }}
                      >
                        {formatMessageTime(msg.createdAt)}
                      </span>
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message Input always visible */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
