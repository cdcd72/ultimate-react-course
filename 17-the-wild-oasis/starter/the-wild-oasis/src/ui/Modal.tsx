import {
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';

import { useOutsideClick } from '../hooks/useOutsideClick';

interface ModalProps {
  ref?: React.MutableRefObject<Element | undefined>;
}

const StyledModal = styled.div.attrs<ModalProps>((props) => ({
  ref: props.ref,
}))<ModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalContextType = {
  openWindowName: string;
  openWindow: React.Dispatch<React.SetStateAction<string>>;
  closeWindow: () => void;
};

const ModalContext = createContext<ModalContextType>({
  openWindowName: '',
  openWindow: () => {},
  closeWindow: () => {},
});

function Modal({ children }: { children: ReactNode }) {
  const [openWindowName, setOpenWindowName] = useState('');
  const openWindow = setOpenWindowName;
  const closeWindow = () => setOpenWindowName('');
  return (
    <ModalContext.Provider
      value={{
        openWindowName,
        openWindow,
        closeWindow,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: ReactNode;
  opens: string;
}) {
  const { openWindow } = useContext(ModalContext);
  return cloneElement(children as ReactElement, {
    onClick: () => openWindow(opensWindowName),
  });
}

function Window({ children, name }: { children: ReactNode; name: string }) {
  const { openWindowName, closeWindow } = useContext(ModalContext);
  const ref = useOutsideClick(closeWindow);

  if (name !== openWindowName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={closeWindow}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children as ReactElement, {
            onCloseModal: closeWindow,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
