import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchWorkerJobRequests } from '../services/workerService';
import { setWorkerJobRequests } from '../state/workerSlice';

export function useWorkerJobs() {
  const dispatch = useAppDispatch();
  const jobRequests = useAppSelector((state) => state.worker.jobRequests);

  useEffect(() => {
    if (jobRequests.length > 0) return;

    fetchWorkerJobRequests().then((requests) => {
      dispatch(setWorkerJobRequests(requests));
    });
  }, [dispatch, jobRequests.length]);

  return { jobRequests };
}
