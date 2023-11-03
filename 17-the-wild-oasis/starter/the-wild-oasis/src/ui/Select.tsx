import styled from 'styled-components';

interface SelectProps {
  type?: string;
}

const StyledSelect = styled.select.attrs<SelectProps>((props) => ({
  type: props.type,
}))<SelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface Option {
  label: string;
  value: string;
}

function Select({
  options,
  value,
  type,
  onChange,
}: {
  options: Option[];
  value: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <StyledSelect value={value} type={type} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
