import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  return (
    <div className="container-fluid p-0" style={{ paddingTop: "5rem", minHeight: "100vh", background: "#f8f9fa" }}>
      <div className="d-flex justify-content-center px-3">
        <div className="w-100" style={{ maxWidth: "700px" }}>
          
          {/* Header */}
          <div className="mb-4">
            <h2 className="h4 fw-semibold">Chat Preview</h2>
            <p className="text-muted">This is how your chat interface will look.</p>
          </div>

          {/* Preview Section */}
          <div className="card shadow-sm rounded-3 overflow-hidden">
            <div className="bg-light p-3">

              {/* Mock Chat UI */}
              <div className="card rounded-3 shadow-sm overflow-hidden">
                
                {/* Chat Header */}
                <div className="d-flex align-items-center gap-3 p-3 border-bottom bg-white">
                  <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold" style={{ width: "32px", height: "32px" }}>
                    J
                  </div>
                  <div>
                    <h6 className="mb-0">John Doe</h6>
                    <small className="text-success">Online</small>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-3 bg-white" style={{ minHeight: "200px", maxHeight: "200px", overflowY: "auto" }}>
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`d-flex mb-3 ${message.isSent ? "justify-content-end" : "justify-content-start"}`}
                    >
                      <div className={`p-2 rounded-3 shadow-sm ${message.isSent ? "bg-primary text-white" : "bg-light text-dark"}`} style={{ maxWidth: "80%" }}>
                        <p className="mb-1 small">{message.content}</p>
                        <p className={`text-end small ${message.isSent ? "text-white-50" : "text-muted"}`}>12:00 PM</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-top bg-white">
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary btn-sm d-flex align-items-center justify-content-center">
                      <Send size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
