import Image from 'next/image';

import { StyledButton } from './IconButton.styled';

interface IButton {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  src: string;
  alt: string;
  dataTestId?: string;
}

function IconButton({ src, alt, dataTestId, ...attrs }: IButton) {
  return (
    <StyledButton data-testid={dataTestId} {...attrs}>
      <Image src={src} alt={alt} width={32} height={32} />
    </StyledButton>
  );
}

export default IconButton;
