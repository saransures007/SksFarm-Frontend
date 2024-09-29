import { sks } from '@/redux/farm/actions';

import { useSelector, useDispatch } from 'react-redux';

import { selectMailItem } from '@/redux/farm/selectors';

export default function useMail({ entity }) {
  const { isLoading } = useSelector(selectMailItem);
  const dispatch = useDispatch();

  const send = (id) => {
    const jsonData = { id };
    dispatch(sks.mail({ entity, jsonData }));
  };

  return { send, isLoading };
}
