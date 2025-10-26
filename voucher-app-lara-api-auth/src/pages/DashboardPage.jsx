import React from "react";
import Container from "../components/Container";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiComputerDesktop,
  HiDocumentDuplicate,
  HiUserCircle,
  HiClock,
} from "react-icons/hi2";
import Logout from "../components/Logout";

const DashboardPage = () => {
  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container className="py-8">

        {/* Module Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModuleBtn
              name={"Product Module"}
              icon={<HiCircleStack className="size-8" />}
              url={"/dashboard/product"}
              description="Manage your products"
            />
            <ModuleBtn
              name={"Sale Module"}
              icon={<HiComputerDesktop className="size-8" />}
              url={"/dashboard/sale"}
              description="Track sales and revenue"
            />
            <ModuleBtn
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className="size-8" />}
              url={"/dashboard/voucher"}
              description="Create and manage vouchers"
            />
            <ModuleBtn
              name={"User Profile"}
              icon={<HiUserCircle className="size-8" />}
              url={"/dashboard/user-profile"}
              description="Update your profile"
            />
          </div>
        </div>

        {/* Logout Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <HiClock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Session Management</p>
                <p className="text-sm text-gray-600">Secure logout when you're done</p>
              </div>
            </div>
            <Logout />
          </div>
        </div>
        
      </Container>
    </section>
  );
};

export default DashboardPage;
