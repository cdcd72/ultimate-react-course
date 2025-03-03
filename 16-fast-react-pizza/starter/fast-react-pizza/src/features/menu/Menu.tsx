import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { LoaderData } from '../../utils/types';

function Menu() {
  const menu = useLoaderData() as LoaderData<typeof loader>;
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export const loader = async () => {
  return await getMenu();
};

export default Menu;
