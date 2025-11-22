


import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="d-flex" style={{ height: "100%", overflow: "hidden", background: "#f8f9fa" }}>
     
      <Sidebar />
      
      <div className="flex-grow-1 d-flex flex-column">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;
