import { getUserName } from './userSlice';
import { useAppSelector } from '../../hooks/default';

function Username() {
  const username = useAppSelector(getUserName);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
