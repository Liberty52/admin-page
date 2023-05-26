import DeliveryFeeInfoSection from "./DeliveryFeeInfoSection";

export default function Delivery() {
    return (
        <div style={{
            width: "80%",
            margin: "0 auto"
        }}>
            <h2>배송비 관리</h2>
            <DeliveryFeeInfoSection />
        </div>
    );
}