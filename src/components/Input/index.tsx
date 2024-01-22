import { Container, ErrorText, StyledInput } from './Input.styled';

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
  errorText?: string;
}

function Input({ errorText, ...attrs }: IInput) {
  return (
    <Container>
      {errorText ? <ErrorText>{errorText}</ErrorText> : null}
      <StyledInput $error={!!errorText} {...attrs} />
    </Container>
  );
}

export default Input;
