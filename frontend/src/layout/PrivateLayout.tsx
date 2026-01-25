import { Outlet, Navigate } from "react-router";
import { Navbar } from "../components/Navbar";

function PrivateLayout() {
  const accessToken = localStorage.getItem('accessToken');
  if(!accessToken) {
    return <Navigate to="/login" replace />
  }
  return (
    <div className="main">
      <Navbar />
      <Outlet />
    </div>
  )
}
export default PrivateLayout