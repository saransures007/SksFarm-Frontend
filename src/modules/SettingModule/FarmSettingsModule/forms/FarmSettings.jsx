import { useDispatch, useSelector } from 'react-redux';
import { Input, Form, InputNumber } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { selectLangDirection } from '@/redux/translate/selectors';

const settings = [
  { settingKey: 'farm_name', label: 'Farm Name', valueType: 'string', required: true },
  { settingKey: 'farm_location', label: 'Location', valueType: 'string', required: true },
  { settingKey: 'date_of_establishment', label: 'Date of Establishment', valueType: 'date', required: true },
  { settingKey: 'expected_silage_per_day', label: 'Expected Silage Per Day (kg)', valueType: 'number', required: true },
  { settingKey: 'expected_feed_tmr_per_day', label: 'Expected TMR Feed Per Day (kg)', valueType: 'number', required: true },
  { settingKey: 'expected_feed_pellets_per_day', label: 'Expected Feed Pellets Per Day (kg)', valueType: 'number', required: true },
  { settingKey: 'expected_milk_per_day', label: 'Expected Milk Per Day (liters)', valueType: 'number', required: true },
  { settingKey: 'monthly_operational_cost', label: 'Monthly Operational Cost', valueType: 'number', required: false },
  { settingKey: 'expected_monthly_income', label: 'Expected Monthly Income', valueType: 'number', required: false },
  { settingKey: 'profit_margin', label: 'Profit Margin (%)', valueType: 'number', required: false },
  { settingKey: 'total_profit', label: 'Total Profit', valueType: 'number', required: false },
  { settingKey: 'loan_amount', label: 'Loan Amount', valueType: 'number', required: false },
  { settingKey: 'loan_paid', label: 'Loan Paid', valueType: 'number', required: false },
  { settingKey: 'loan_interest_rate', label: 'Loan Interest Rate (%)', valueType: 'number', required: false },
  { settingKey: 'monthly_loan_payment', label: 'Monthly Loan Payment', valueType: 'number', required: false },
  { settingKey: 'remarks', label: 'Remarks', valueType: 'string', required: false }
];

export default function FarmSettings() {
  const translate = useLanguage();
  const langDirection = useSelector(selectLangDirection);
  const numberInputProps = {
    min: 0,
    step: 1,
    style: { width: '100%' },
  };

  return (
    <div style={{ direction: langDirection }}>
      {settings.map(({ settingKey, label, valueType, required, disable }) => (
        <Form.Item
          key={settingKey}
          label={translate(label)}
          name={settingKey}
          rules={[{ required, message: `${translate(label)} is required` }]}
        >
          {valueType === 'date' ? (
            <Input type="date" style={{ width: '100%' }} />
          ) : valueType === 'string' ? (
            settingKey === 'remarks' ? (
              <Input.TextArea rows={3} />
            ) : (
              <Input />
            )
          ) : (
            <InputNumber {...numberInputProps} disabled ={disable} />
          )}
        </Form.Item>
      ))}
    </div>
  );
}
