import { useEffect } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectUpdatedItem } from '@/redux/crud/selectors';

import useLanguage from '@/locale/useLanguage';

import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function UpdateForm({ config, formElements, withUpload = false }) {
  console.log("calling editi", formElements)
  let { entity } = config;
  const translate = useLanguage();
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const { state, crudContextAction } = useCrudContext();

  /////

  const { panel, collapsedBox, readBox } = crudContextAction;

  const showCurrentRecord = () => {
    readBox.open();
  };

  /////
  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    const id = current._id;

    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }
    // const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
    //   acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
    //   return acc;
    // }, {});
    dispatch(crud.update({ entity, id, jsonData: fieldsValue, withUpload }));
  };
  // useEffect(() => {
  //   console.log("error", current)
  //   if (current) {
  //     let newValues = { ...current };
  //     if (newValues.birthday) {
  //       newValues = {
  //         ...newValues,
  //         birthday: dayjs(newValues['birthday']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  //       };
  //     }
  //     if (newValues.date) {
  //       newValues = {
  //         ...newValues,
  //         date: dayjs(newValues['date']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  //       };
  //     }
  //     if (newValues.expiredDate) {
  //       newValues = {
  //         ...newValues,
  //         expiredDate: dayjs(newValues['expiredDate']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  //       };
  //     }
  //     if (newValues.created) {
  //       newValues = {
  //         ...newValues,
  //         created: dayjs(newValues['created']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  //       };
  //     }
  //     if (newValues.updated) {
  //       newValues = {
  //         ...newValues,
  //         updated: dayjs(newValues['updated']).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  //       };
  //     }
  //     if (newValues.createdAt) {
  //       newValues = {
  //         ...newValues,
  //         createdAt: dayjs(newValues['createdAt']),
  //       };
  //     }
  //     if (newValues.expiredDate) {
  //       newValues = {
  //         ...newValues,
  //         entryDate: dayjs(newValues['entryDate']),
  //       };
  //     }
  //     console.log("newValues",newValues)
  //     form.resetFields();
  //     form.setFieldsValue(newValues);
  //   }
  // }, [current]);

  useEffect(() => {
  console.log("error", current);
  if (current) {
    let newValues = { ...current };

    // Remove createdAt field
    delete newValues.createdAt;

    // Function to safely format dates
    const formatDate = (dateString) => {
      const date = dayjs(dateString);
      return date.isValid() ? date.format('YYYY-MM-DDTHH:mm:ss.SSSZ') : dateString;
    };

    if (newValues.birthday) {
      newValues.birthday = formatDate(newValues.birthday);
    }
    if (newValues.date) {
      newValues.date = formatDate(newValues.date);
    }
    if (newValues.expiredDate) {
      newValues.expiredDate = formatDate(newValues.expiredDate);
    }
    if (newValues.created) {
      newValues.created = formatDate(newValues.created);
    }
    if (newValues.updated) {
      newValues.updated = formatDate(newValues.updated);
    }
    if (newValues.entryDate) {
      newValues.entryDate = dayjs(newValues.entryDate);
    }
    if (newValues.birthDate) {
      newValues.birthDate = dayjs(newValues.birthDate);
    }
    if (newValues.breedingStartDate) {
      newValues.breedingStartDate = dayjs(newValues.breedingStartDate);
    }
    
      if (newValues.breedingEndDate) {
      newValues.breedingEndDate = dayjs(newValues.breedingEndDate);
    }

    if (newValues.date) {
      newValues.date = dayjs(newValues.date);
    }
    if (newValues.nextCheckupDate) {
      newValues.nextCheckupDate = dayjs(newValues.nextCheckupDate);
    }

    
    
    

    console.log("newValues after removing createdAt", newValues);
    form.resetFields();
    form.setFieldsValue(newValues);
  }
}, [current]);

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'update' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  const { isEditBoxOpen } = state;

  const show = isEditBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {formElements}
          <Form.Item
            style={{
              display: 'inline-block',
              paddingRight: '5px',
            }}
          >
            <Button type="primary" htmlType="submit">
              {translate('Save')}
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              paddingLeft: '5px',
            }}
          >
            <Button onClick={showCurrentRecord}>{translate('Cancel')}</Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}
