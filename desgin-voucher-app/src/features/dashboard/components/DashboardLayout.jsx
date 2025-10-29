// DashboardLayout.jsx
import { Suspense, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useCookie from "react-use-cookie";
import useUserStore from "../../../stores/useUserStore";
import Header from "./Header";
import PageLoading from "../../../components/PageLoading";

const DashboardLayout = () => {
  const [token] = useCookie("my_token");
  const [userCookie] = useCookie("user");
  const { user, setUser } = useUserStore();

  useEffect(() => {
    setUser(JSON.parse(userCookie));
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6">
        <Header />
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </div>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
    </main>
  );
};

export default DashboardLayout;