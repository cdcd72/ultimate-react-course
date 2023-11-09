import { ReactElement, ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { styled, css, RuleSet } from 'styled-components';

const displays: { [key: string]: RuleSet<object> } = {
  grid: css`
    display: grid;
  `,
  none: css`
    display: none;
  `,
};

interface FormRowProps {
  display?: string;
}

const StyledFormRow = styled.div.attrs<FormRowProps>((props) => ({
  display: props.display,
}))<FormRowProps>`
  ${(props) => displays[props.display!]}
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

StyledFormRow.defaultProps = {
  display: 'grid',
};

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({
  label,
  children,
  error,
  display,
}: {
  label?: string;
  children: ReactNode;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  display?: string;
}) {
  return (
    <StyledFormRow display={display}>
      {label && (
        <Label htmlFor={(children as ReactElement)?.props.id}>{label}</Label>
      )}
      {children}
      {error && <Error>{`${error}`}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
