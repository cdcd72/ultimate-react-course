import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

interface ButtonProps {
  active?: string;
}

const PaginationButton = styled.button.attrs<ButtonProps>((props) => ({
  active: props.active,
}))<ButtonProps>`
  background-color: ${(props) =>
    props.active === 'true'
      ? ' var(--color-brand-600)'
      : 'var(--color-grey-50)'};
  color: ${(props) =>
    props.active === 'true' ? ' var(--color-brand-50)' : 'inherit'};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function prevPage() {
    const prevPage = currPage !== 1 ? currPage - 1 : 1;
    searchParams.set('page', `${prevPage}`);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const nextPage = currPage !== pageCount ? currPage + 1 : currPage;
    searchParams.set('page', `${nextPage}`);
    setSearchParams(searchParams);
  }

  // 不需分頁情況...
  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>{currPage !== pageCount ? currPage * PAGE_SIZE : count}</span> of{' '}
        <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={currPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
