import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchServiceCategories } from '../services/customerService';
import { setServiceCategories } from '../state/customerSlice';

export function useCustomerServices() {
  const dispatch = useAppDispatch();
  const serviceCategories = useAppSelector((state) => state.customer.serviceCategories);

  useEffect(() => {
    if (serviceCategories.length > 0) return;

    fetchServiceCategories().then((categories) => {
      dispatch(setServiceCategories(categories));
    });
  }, [dispatch, serviceCategories.length]);

  return { serviceCategories };
}
