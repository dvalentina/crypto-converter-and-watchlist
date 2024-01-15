import Header from '../Header';

import {
  Body,
  BodyGrid,
  Container,
  FooterGrid,
  HeaderGrid,
} from './Grid.styled';

interface IGrid {
  children: React.ReactNode;
}

function Grid({ children }: IGrid) {
  return (
    <Container>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <BodyGrid>
        <Body>{children}</Body>
      </BodyGrid>
      <FooterGrid></FooterGrid>
    </Container>
  );
}

export default Grid;
