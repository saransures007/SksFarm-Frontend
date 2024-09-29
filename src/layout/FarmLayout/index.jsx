import { sksContextProvider } from '@/context/farm';
import { selectLangDirection } from '@/redux/translate/selectors';

import { Layout } from 'antd';
import { useSelector } from 'react-redux';

const { Content } = Layout;

export default function sksLayout({ children }) {
  const langDirection=useSelector(selectLangDirection)

  return (
    <sksContextProvider>
      <Content
        className="whiteBox shadow layoutPadding"
        style={{
          margin: '30px auto',
          width: '100%',
          maxWidth: '1100px',
          minHeight: '600px',
          direction:langDirection
        }}
      >
        {children}
      </Content>
    </sksContextProvider>
  );
}
