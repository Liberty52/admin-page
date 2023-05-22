import CanceledOrdersTable from "./CanceledOrdersTable";
import CancelTypeRadio from "./CancelTypeRadio";
import CancelModal from "./CancelModal";
import { Button } from "@mui/material";
import { useState } from "react";

export default function CanceledOrders() {
  const [page, setPage] = useState(1); // 현재 페이지
  const [cancelType, setCancelType] = useState("CANCELED");
  const [checkedOrderId, setCheckedOrderId] = useState([]);
  const [modal, showModal] = useState(false);

  return (
    <div>
      {modal && (
        <CancelModal
          orderId={checkedOrderId[0]} // 일단 처음 체크한 오더 아이디만 가능
          closeModal={() => {
            showModal(false);
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CancelTypeRadio
          onChange={(value) => {
            setCancelType(value);
            setPage(1);
          }}
          sx={{
            marginBottom: 3,
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            if (window.confirm("주문 취소 승인하시겠습니까?")) {
              showModal(true);
              alert("(복수 선택) 미구현 된 기능입니다.");
            }
          }}
        >
          주문 취소 승인
        </Button>
      </div>
      <CanceledOrdersTable
        page={page}
        setPage={setPage}
        cancelType={cancelType}
        checkedOrderId={checkedOrderId}
        setCheckedOrderId={setCheckedOrderId}
        showModal={showModal}
      />
    </div>
  );
}
