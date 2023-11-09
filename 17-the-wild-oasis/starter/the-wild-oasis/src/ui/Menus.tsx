import { ReactNode, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface Position {
  x: number;
  y: number;
}

interface ListProps {
  position: Position;
  ref?: React.MutableRefObject<Element | undefined>;
}

const StyledList = styled.ul.attrs<ListProps>((props) => ({
  position: props.position,
}))<ListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenusContextType = {
  openListId: string;
  listPosition: Position;
  setListPosition: React.Dispatch<React.SetStateAction<Position>>;
  openList: React.Dispatch<React.SetStateAction<string>>;
  closeList: () => void;
};

const MenusContext = createContext<MenusContextType>({
  openListId: '',
  listPosition: { x: 0, y: 0 },
  setListPosition: () => {},
  openList: () => {},
  closeList: () => {},
});

function Menus({ children }: { children: ReactNode }) {
  const [openListId, setOpenListId] = useState('');
  const [listPosition, setListPosition] = useState({ x: 0, y: 0 });
  const openList = setOpenListId;
  const closeList = () => setOpenListId('');
  return (
    <MenusContext.Provider
      value={{ openListId, listPosition, setListPosition, openList, closeList }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const { openListId, setListPosition, openList, closeList } =
    useContext(MenusContext);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const rect = event.target.closest('button').getBoundingClientRect();
    setListPosition({
      x: window.innerWidth - rect.width - rect.x, // 視窗內寬 - 點選按鈕寬度 - 點選按鈕的 x 位置
      y: rect.y + rect.height + 8, // 點選按鈕的 y 位置 + 點選按鈕高度 + 補償
    });
    openListId === '' || openListId !== id ? openList(id) : closeList();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }: { children: ReactNode; id: string }) {
  const { openListId, listPosition, closeList } = useContext(MenusContext);
  const ref = useOutsideClick(closeList, false);

  if (openListId !== id) return null;

  return createPortal(
    <StyledList position={listPosition} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { closeList } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    closeList();
  }
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
