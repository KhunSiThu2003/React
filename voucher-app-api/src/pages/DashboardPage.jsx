import React from "react";
import Container from "../components/Container";
import ModuleBtn from "../components/ModuleBtn";
import {
  HiCircleStack,
  HiComputerDesktop,
  HiDocumentDuplicate,
} from "react-icons/hi2";

const DashboardPage = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="h-48">
            <ModuleBtn
              name={"Product Module"}
              icon={<HiCircleStack className="size-8" />}
              url={"/dashboard/product"}
            />
          </div>
          <div className="h-48">
            <ModuleBtn
              name={"Sale Module"}
              icon={<HiComputerDesktop className="size-8" />}
              url={"/dashboard/sale"}
            />
          </div>
          <div className="h-48">
            <ModuleBtn
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className="size-8" />}
              url={"/dashboard/voucher"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
