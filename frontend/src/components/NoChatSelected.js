import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center p-5 bg-light flex-grow-1">
      <div className="text-center" style={{ maxWidth: "400px" }}>
        {/* Icon Display */}
        <div className="d-flex justify-content-center mb-4">
          <div
            className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3"
            style={{ width: "64px", height: "64px", animation: "bounce 2s infinite" }}
          >
            <MessageSquare size={32} className="text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="fw-bold fs-4">Welcome to Chatty!</h2>
        <p className="text-muted">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>

      {/* Bounce animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-15px);
            }
            60% {
              transform: translateY(-8px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default NoChatSelected;
