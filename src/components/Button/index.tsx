import { StyledButton } from './Button.styled';

interface IButton {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

function Button({ children, ...attrs }: IButton) {
  return <StyledButton {...attrs}>{children}</StyledButton>;
}

export default Button;
