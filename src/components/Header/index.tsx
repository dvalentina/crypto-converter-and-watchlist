'use client';

import { usePathname } from 'next/navigation';

import { Container, Divider, StyledLink } from './Header.styled';

function Header() {
  const pathname = usePathname();

  return (
    <Container>
      <StyledLink href='/converter' chosen={pathname === '/converter'}>
        Converter
      </StyledLink>
      <Divider />
      <StyledLink href='/watchlist' chosen={pathname === '/watchlist'}>
        Watchlist
      </StyledLink>
    </Container>
  );
}

export default Header;
