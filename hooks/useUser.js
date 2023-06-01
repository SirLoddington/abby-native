import { useQuery } from 'react-query';
import { getUser } from '../services';

export default function useUser() {
  const { data } = useQuery('user', getUser);

  return data?.data?.user;
}
