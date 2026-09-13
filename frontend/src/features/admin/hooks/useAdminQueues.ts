import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAdminQueues } from '../services/adminService';
import { setAdminQueues } from '../state/adminSlice';

export function useAdminQueues() {
  const dispatch = useAppDispatch();
  const queues = useAppSelector((state) => state.admin.queues);

  useEffect(() => {
    if (queues.length > 0) return;

    fetchAdminQueues().then((nextQueues) => {
      dispatch(setAdminQueues(nextQueues));
    });
  }, [dispatch, queues.length]);

  return { queues };
}
