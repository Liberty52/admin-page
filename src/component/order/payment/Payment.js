import CardPaymentInfoTable from "./CardPaymentInfoTable";
import VBankPaymentInfoTable from "./VBankPaymentInfoTable";

export default function Payment() {

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
            </div>
            <h2>신용카드 관리</h2>
            <CardPaymentInfoTable />
            <h2>가상계좌 관리</h2>
            <VBankPaymentInfoTable />
        </div>
    );
}
