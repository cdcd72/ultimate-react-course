import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { ICabin } from '../../models/ICabin';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';
import { ICreateUpdateCabin } from '../../models/ICreateUpdateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: ICabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: cabinId,
    name,
    description,
    image_url,
    regularPrice,
    discount,
    maxCapacity,
  } = cabin;

  function handleDuplicateCabin() {
    const duplicatedCabin: ICreateUpdateCabin = {
      name: `Copy of ${name}`,
      description,
      image_url,
      regularPrice,
      discount,
      maxCapacity,
    };
    createCabin({ cabin: duplicatedCabin });
  }

  return (
    <Table.Row>
      <Img src={image_url} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button disabled={isCreating} onClick={() => handleDuplicateCabin()}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit-cabin-form">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-cabin-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="delete-cabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
