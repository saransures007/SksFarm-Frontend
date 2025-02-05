import { Space, Layout, Divider, Typography } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';
import { selectLangDirection } from '@/redux/translate/selectors';
import logo from '@/style/images/SKNlogo.png';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SideContent() {
  const translate = useLanguage();
  const langDirection = useSelector(selectLangDirection);

  return (
    <Content
      style={{
        padding: '150px 30px 30px',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%' }}>
        <img
          src={logo}
          alt="SKNFarm"
          style={{ margin: '0 auto 40px', display: 'block' }}
          height={200}
          width={200}
        />
        <div className="space40"></div>
        <Title level={3}>Welcome to SKNFarm</Title>

        <div className="space20"></div>
        <Text>
          At SKNFarm, we are committed to delivering fresh, high-quality milk straight from our healthy and well-cared-for cows. Our farm is built on values of care, quality, and sustainability.
        </Text>

        <div className="space20"></div>
        <Title level={4}>Why Choose Us?</Title>
        <ul className="list-checked" style={{ paddingRight: 0 }}>
          <li className={`list-checked-item ${langDirection === "rtl" ? "list-checked-item-right" : "list-checked-item-left"}`}>
            <Space direction="vertical">
              <Text strong>Fresh & Pure</Text>
              <Text>Milk delivered straight from our farm to your door.</Text>
            </Space>
          </li>
          <li className={`list-checked-item ${langDirection === "rtl" ? "list-checked-item-right" : "list-checked-item-left"}`}>
            <Space direction="vertical">
              <Text strong>Healthy Cows</Text>
              <Text>We prioritize the well-being of our cows with ethical farming practices.</Text>
            </Space>
          </li>
          <li className={`list-checked-item ${langDirection === "rtl" ? "list-checked-item-right" : "list-checked-item-left"}`}>
            <Space direction="vertical">
              <Text strong>Sustainable Farming</Text>
              <Text>We use eco-friendly methods to ensure a better future for our farm and the environment.</Text>
            </Space>
          </li>
        </ul>
        <Divider />
        <Text>
          We are dedicated to offering only the best, fresh milk with a focus on quality and care. Trust SKNFarm for all your milk needs and enjoy the natural goodness in every drop.
        </Text>

      </div>
    </Content>
  );
}
