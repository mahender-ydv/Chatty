import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) {
    return (
      <aside className="d-flex flex-column border-end bg-white h-100" style={{ width: "280px" }}>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="d-flex flex-column border-end bg-white h-100" style={{ width: "280px" }}>
      {/* Header */}
      <div className="border-bottom p-3">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Users size={20} />
          <span className="fw-semibold">Contacts</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="onlineOnly"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          <label htmlFor="onlineOnly" className="form-check-label small">
            Show online only
          </label>
          <span className="text-muted small">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-grow-1 overflow-auto p-2">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`btn w-100 d-flex align-items-center text-start mb-2 ${
                isSelected ? "bg-primary text-white" : "btn-light text-dark"
              }`}
            >
              <div className="position-relative me-2">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="rounded-circle"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                {isOnline && (
                  <span
                    className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                    style={{ width: "12px", height: "12px" }}
                  />
                )}
              </div>

              <div className="d-none d-lg-block text-truncate">
                <div className="fw-medium text-truncate">{user.fullName}</div>
                <div className={`small ${isOnline ? "text-success" : "text-muted"}`}>
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4">No users available</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;


