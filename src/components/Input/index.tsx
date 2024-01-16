import { StyledInput } from './Input.styled';

interface IInput {
  className?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  readOnly?: boolean;
  min?: string;
}

function Input({ ...attrs }: IInput) {
  return <StyledInput {...attrs} />;
}

export default Input;
