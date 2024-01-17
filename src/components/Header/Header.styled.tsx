'use client';

import { Turret_Road } from 'next/font/google';
import Link from 'next/link';
import styled from 'styled-components';

interface IStyledLink {
  $chosen: boolean;
  $side: 'right' | 'left';
}

const turretRoad = Turret_Road({
  weight: ['300', '500'],
  subsets: ['latin'],
});

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  font-family: ${turretRoad.style.fontFamily};
`;

export const Navigation = styled.div`
  width: min-content;
  position: relative;
`;

export const StyledLink = styled(Link)<IStyledLink>`
  position: absolute;
  font-size: 40px;
  text-decoration: none;
  text-transform: lowercase;
  color: black;
  font-weight: ${({ $chosen }) => ($chosen ? '500' : '300')};

  top: 1px;
  right: ${({ $side }) => ($side === 'left' ? 'calc(100% + 8px)' : 'unset')};
  left: ${({ $side }) => ($side === 'right' ? 'calc(100% + 8px)' : 'unset')};
`;

export const Divider = styled.div`
  border-left: 2px solid;
  border-right: 2px solid;
  height: 48px;
  border-image: ${({ theme }) => `${theme.gradient} 1`};
`;
