import NotFound from '@/components/NotFound';
import { sksLayout } from '@/layout';
import ReadItem from './components/ReadItem';

import PageLoader from '@/components/PageLoader';
import { sks } from '@/redux/farm/actions';
import { selectReadItem } from '@/redux/farm/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

export default function ReadEmailModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useLayoutEffect(() => {
    dispatch(sks.read({ entity: config.entity, id }));
  }, [id]);

  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

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
          <ReadItem config={config} selectedItem={currentResult} />
        ) : (
          <NotFound entity={config.entity} />
        )}
      </sksLayout>
    );
}
