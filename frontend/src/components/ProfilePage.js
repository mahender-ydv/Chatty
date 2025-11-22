import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="container-fluid p-0" style={{ height: "100vh", paddingTop: "5rem", background: "#f8f9fa" }}>
      <div className="d-flex justify-content-center align-items-start pt-4 px-3">
        <div className="card shadow-sm rounded-3 w-100" style={{ maxWidth: "700px" }}>
          <div className="card-body p-4">
            
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="h4 fw-semibold">Profile</h1>
              <p className="text-muted mb-0">Your profile information</p>
            </div>

            {/* Avatar Section */}
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="position-relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="rounded-circle border border-3"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <label
                  htmlFor="avatar-upload"
                  className={`position-absolute bottom-0 end-0 bg-dark rounded-circle p-2 text-white cursor-pointer ${isUpdatingProfile ? "disabled" : ""}`}
                  style={{ cursor: isUpdatingProfile ? "not-allowed" : "pointer" }}
                >
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="d-none"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <small className="text-muted mt-2">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </small>
            </div>

            {/* User Info */}
            <div className="mb-4">
              <div className="mb-3">
                <label className="form-label text-muted d-flex align-items-center gap-2">
                  <User className="me-1" /> Full Name
                </label>
                <input type="text" className="form-control" value={authUser?.fullName} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted d-flex align-items-center gap-2">
                  <Mail className="me-1" /> Email Address
                </label>
                <input type="text" className="form-control" value={authUser?.email} disabled />
              </div>
            </div>

            {/* Account Info */}
            <div className="card bg-light mb-0">
              <div className="card-body">
                <h6 className="fw-medium mb-3">Account Information</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Member Since</span>
                    <span>{authUser.createdAt?.split("T")[0]}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Account Status</span>
                    <span className="text-success">Active</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
