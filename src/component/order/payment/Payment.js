import CardPaymentInfoTable from './CardPaymentInfoTable';
import VBankPaymentInfoTable from './VBankPaymentInfoTable';

export default function Payment() {
  return (
    <div
      style={{
        width: '80%',
        margin: '0 auto',
      }}
    >
      <CardPaymentInfoTable />
      <VBankPaymentInfoTable />
    </div>
  );
}
