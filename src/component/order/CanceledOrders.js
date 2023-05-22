import CanceledOrdersTable from "./CanceledOrdersTable";
import CancelTypeRadio from "./CancelTypeRadio";
import { useState } from "react";

export default function CanceledOrders() {
  const [page, setPage] = useState(1); // 현재 페이지
  const [cancelType, setCancelType] = useState("CANCELED");

  return (
    <div>
      <CancelTypeRadio
        onChange={(value) => {
          setCancelType(value);
          setPage(1);
        }}
        sx={{
          marginBottom: 3,
        }}
      />
      <CanceledOrdersTable
        page={page}
        setPage={setPage}
        cancelType={cancelType}
      />
    </div>
  );
}
