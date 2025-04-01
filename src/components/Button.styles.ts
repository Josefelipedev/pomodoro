import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: 'primary' | 'secondary' | 'danger' | 'success';
}
const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  //background-color: #000;
  //color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  // ${({ variant }) => `background-color: ${buttonVariants[variant]};`}
`;
