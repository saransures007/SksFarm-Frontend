import { useState, useEffect } from 'react';

import { Divider, Typography, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { sks } from '@/redux/farm/actions';

import { usesksContext } from '@/context/farm';
import { generate as uniqueId } from 'shortid';

import { selectCurrentItem } from '@/redux/farm/selectors';

import { useNavigate } from 'react-router-dom';
import useLanguage from '@/locale/useLanguage';

const { Title, Paragraph } = Typography;

export default function ReadItem({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const { sksContextAction } = usesksContext();
  const navigate = useNavigate();

  const { result: currentResult } = useSelector(selectCurrentItem);

  const { readPanel, updatePanel } = sksContextAction;

  const resetsks = {
    emailName: '',
    emailKey: '',
    emailSubject: '',
    emailBody: '',
    emailVariables: [],
    _id: '',
  };

  const [currentsks, setCurrentsks] = useState(selectedItem ?? resetsks);

  useEffect(() => {
    const controller = new AbortController();
    if (currentResult) {
      setCurrentsks(currentResult);
    }
    return () => controller.abort();
  }, [currentResult]);

  return (
    <>
      <PageHeader
        onBack={() => {
          readPanel.close();
          navigate(`/${entity.toLowerCase()}`);//navigate to previous page
        }}
        title={`${ENTITY_NAME} # ${currentsks?.emailName}`}
        ghost={false}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              readPanel.close();
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,

          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                sks.currentAction({
                  actionType: 'update',
                  data: currentsks,
                })
              );
              updatePanel.open();
              navigate(`/${entity.toLowerCase()}/update/${currentsks._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <div>
        <Title level={3}>{translate('Subject')}</Title>
        <Paragraph>{currentsks.emailSubject}</Paragraph>
        <Title level={3}>{translate('Body')}</Title>
        <div dangerouslySetInnerHTML={{ __html: currentsks.emailBody }} />
      </div>
    </>
  );
}
