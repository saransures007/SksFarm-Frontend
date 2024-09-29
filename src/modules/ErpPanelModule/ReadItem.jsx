import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, Row, Col, Descriptions, Statistic, Tag } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { sks } from '@/redux/farm/actions';

import { generate as uniqueId } from 'shortid';

import { selectCurrentItem } from '@/redux/farm/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney, useDate } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';
import { tagColor } from '@/utils/statusTagColor';

const Item = ({ item, currentsks }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {moneyFormatter({ amount: item.price, currency_code: currentsks.currency })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {moneyFormatter({ amount: item.total, currency_code: currentsks.currency })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadItem({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moneyFormatter } = useMoney();
  const { send, isLoading: mailInProgress } = useMail({ entity });

  const { result: currentResult } = useSelector(selectCurrentItem);

  const resetsks = {
    status: '',
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  };

  const [itemslist, setItemsList] = useState([]);
  const [currentsks, setCurrentsks] = useState(selectedItem ?? resetsks);
  const [client, setClient] = useState({});

  useEffect(() => {
    if (currentResult) {
      const { items, invoice, ...others } = currentResult;

      if (items) {
        setItemsList(items);
        setCurrentsks(currentResult);
      } else if (invoice.items) {
        setItemsList(invoice.items);
        setCurrentsks({ ...invoice.items, ...others, ...invoice });
      }
    }
    return () => {
      setItemsList([]);
      setCurrentsks(resetsks);
    };
  }, [currentResult]);

  useEffect(() => {
    if (currentsks?.client) {
      setClient(currentsks.client[currentsks.client.type]);
    }
  }, [currentsks]);

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={`${ENTITY_NAME} # ${currentsks.number}/${currentsks.year || ''}`}
        ghost={false}
        tags={[
          <Tag color={tagColor(currentsks.status)?.color} key="status">
            {currentsks.status && translate(currentsks.status)}
          </Tag>,
          currentsks.paymentStatus && (
            <Tag color={tagColor(currentsks.paymentStatus)?.color} key="paymentStatus">
              {currentsks.paymentStatus && translate(currentsks.paymentStatus)}
            </Tag>
          ),
        ]}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentsks._id}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            loading={mailInProgress}
            onClick={() => {
              send(currentsks._id);
            }}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(sks.convert({ entity, id: currentsks._id }));
            }}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            {translate('Convert to Invoice')}
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
      >
        <Row>
          <Statistic title="Status" value={currentsks.status} />
          <Statistic
            title={translate('SubTotal')}
            value={moneyFormatter({
              amount: currentsks.subTotal,
              currency_code: currentsks.currency,
            })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Total')}
            value={moneyFormatter({ amount: currentsks.total, currency_code: currentsks.currency })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Paid')}
            value={moneyFormatter({
              amount: currentsks.credit,
              currency_code: currentsks.currency,
            })}
            style={{
              margin: '0 32px',
            }}
          />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`Client : ${currentsks.client.name}`}>
        <Descriptions.Item label={translate('Address')}>{client.address}</Descriptions.Item>
        <Descriptions.Item label={translate('email')}>{client.email}</Descriptions.Item>
        <Descriptions.Item label={translate('Phone')}>{client.phone}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>{translate('Product')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Price')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Quantity')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Total')}</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {itemslist.map((item) => (
        <Item key={item._id} item={item} currentsks={currentsks}></Item>
      ))}
      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>{translate('Sub Total')} :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>
              {moneyFormatter({ amount: currentsks.subTotal, currency_code: currentsks.currency })}
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {translate('Tax Total')} ({currentsks.taxRate} %) :
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {moneyFormatter({ amount: currentsks.taxTotal, currency_code: currentsks.currency })}
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{translate('Total')} :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {moneyFormatter({ amount: currentsks.total, currency_code: currentsks.currency })}
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}
