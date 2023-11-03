import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface ButtonProps {
  active?: string;
}

const FilterButton = styled.button.attrs<ButtonProps>((props) => ({
  active: props.active,
}))<ButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === 'true' &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface Option {
  label: string;
  value: string;
}

function Filter({
  filterField,
  options,
}: {
  filterField: string;
  options: Option[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterFieldValue =
    searchParams.get(filterField) || options.at(0)?.value;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={`${currentFilterFieldValue === option.value}`}
          disabled={currentFilterFieldValue === option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
