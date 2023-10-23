import { useSelector } from 'react-redux';

import { User } from '../../models/user';

function Username() {
  const username = useSelector(({ user }: { user: User }) => user.name);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
