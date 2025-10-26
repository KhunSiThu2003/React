import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import VoucherList from "../components/VoucherList";
import Container from "../components/Container";

const VoucherPage = () => {
  return (
    <section>
      <Container>
        <Breadcrumb currentPageTitle={"Voucher Module"} />
        <VoucherList />
      </Container>
    </section>
  );
};

export default VoucherPage;
