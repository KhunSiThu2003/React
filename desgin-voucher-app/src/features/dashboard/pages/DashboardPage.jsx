// DashboardPage.jsx
import Container from "../../../components/Container";
import ModuleButton from "../components/ModuleButton";
import LogoutButton from "../../../components/LogoutButton";
import { LuDatabaseBackup, LuMonitor, LuFiles, LuUsers } from "react-icons/lu";

const DashboardPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <Container>
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome to Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your products, sales, vouchers, and user profiles from one centralized location
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ModuleButton
            name={"Product Module"}
            description={"Manage your product inventory"}
            icon={<LuDatabaseBackup className="size-12" />}
            url={"/dashboard/products"}
            color="from-blue-500 to-blue-600"
          />
          <ModuleButton
            name={"Sale Module"}
            description={"Track and manage sales"}
            icon={<LuMonitor className="size-12" />}
            url={"/dashboard/sale"}
            color="from-green-500 to-green-600"
          />
          <ModuleButton
            name={"Voucher Module"}
            description={"Create and manage vouchers"}
            icon={<LuFiles className="size-12" />}
            url={"/dashboard/vouchers"}
            color="from-purple-500 to-purple-600"
          />
          <ModuleButton
            name={"User Profile"}
            description={"Manage your account settings"}
            icon={<LuUsers className="size-12" />}
            url={"/dashboard/user-profile"}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Footer Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-gray-700 font-medium">
                Need help with anything?
              </p>
              <p className="text-gray-500 text-sm">
                Contact our support team for assistance
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-gray-600 text-sm">If you finish your job, just</p>
              <LogoutButton />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;