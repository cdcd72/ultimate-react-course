import styled, { RuleSet, css } from 'styled-components';

const variations: { [key: string]: RuleSet<object> } = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const sizes: { [key: string]: RuleSet<object> } = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

interface ButtonProps {
  variation?: string;
  size?: string;
}

const Button = styled.button.attrs<ButtonProps>((props) => ({
  variation: props.variation,
  size: props.size,
}))<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) => variations[props.variation!]}
  ${(props) => sizes[props.size!]}
`;

Button.defaultProps = {
  variation: 'primary',
  size: 'medium',
};

export default Button;
