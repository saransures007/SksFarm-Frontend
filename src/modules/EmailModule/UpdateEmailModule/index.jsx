import NotFound from '@/components/NotFound';

import { sksLayout } from '@/layout';
import UpdateItem from '@/modules/sksPanelModule/UpdateItem';
import EmailForm from './componenets/EmailForm';

import PageLoader from '@/components/PageLoader';

import { sks } from '@/redux/farm/actions';
import { selectReadItem } from '@/redux/farm/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

export default function UpdateEmailModule({ config }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  useLayoutEffect(() => {
    dispatch(sks.read({ entity: config.entity, id }));
  }, [id]);

  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

  useLayoutEffect(() => {
    if (currentResult) {
      dispatch(sks.currentAction({ actionType: 'update', data: currentResult }));
    }
  }, [currentResult]);

  if (isLoading) {
    return (
      <sksLayout>
        <PageLoader />
      </sksLayout>
    );
  } else
    return (
      <sksLayout>
        {isSuccess ? (
          <UpdateItem config={config} UpdateForm={EmailForm} />
        ) : (
          <NotFound entity={config.entity} />
        )}
      </sksLayout>
    );
}
