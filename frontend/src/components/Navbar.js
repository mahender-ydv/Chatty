import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-center rounded bg-primary bg-opacity-10 p-2 me-2">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <span className="fw-bold">Chatty</span>
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-center gap-2">
            <li className="nav-item">
              <Link to="/settings" className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                <Settings size={16} />
                <span className="d-none d-sm-inline">Settings</span>
              </Link>
            </li>

            {authUser && (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                    <User size={16} />
                    <span className="d-none d-sm-inline">Profile</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-sm btn-danger d-flex align-items-center gap-1" onClick={logout}>
                    <LogOut size={16} />
                    <span className="d-none d-sm-inline">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
