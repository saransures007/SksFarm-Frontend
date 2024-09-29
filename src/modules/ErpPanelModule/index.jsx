import { useLayoutEffect } from 'react';

import DataTable from './DataTable';

import Delete from './DeleteItem';

import { useDispatch } from 'react-redux';
import { sks } from '@/redux/farm/actions';

import { usesksContext } from '@/context/farm';

export default function sksPanel({ config, extra }) {
  const dispatch = useDispatch();
  const { state } = usesksContext();
  const { deleteModal } = state;

  const dispatcher = () => {
    dispatch(sks.resetState());
  };

  useLayoutEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <DataTable config={config} extra={extra} />
      <Delete config={config} isOpen={deleteModal.isOpen} />
    </>
  );
}
