'use client';

import { usePathname } from 'next/navigation';

import { Container, Divider, Navigation, StyledLink } from './Header.styled';

function Header() {
  const pathname = usePathname();

  return (
    <Container>
      <Navigation>
        <StyledLink
          href='/converter'
          $chosen={pathname === '/converter'}
          $side='left'
        >
          Converter
        </StyledLink>
        <Divider />
        <StyledLink
          href='/watchlist'
          $chosen={pathname === '/watchlist'}
          $side='right'
        >
          Watchlist
        </StyledLink>
      </Navigation>
    </Container>
  );
}

export default Header;
