import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'SksFarm'}
      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://www.sksFarmapp.com">www.sksFarmapp.com</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://github.com/SksFarm/SksFarm-sks-app">
              https://github.com/SksFarm/SksFarm-sks-app
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://www.sksFarmapp.com/contact-us/`);
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
