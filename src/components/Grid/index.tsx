import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { BodyGrid, Container, FooterGrid, HeaderGrid } from './Grid.styled';

interface IGrid {
  children: React.ReactNode;
}

function Grid({ children }: IGrid) {
  return (
    <Container>
      <HeaderGrid>
        <Header />
      </HeaderGrid>
      <BodyGrid>{children}</BodyGrid>
      <FooterGrid>
        <Footer />
      </FooterGrid>
    </Container>
  );
}

export default Grid;
