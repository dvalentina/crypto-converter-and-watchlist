import styled from 'styled-components';

export const Skeleton = styled.div`
  height: ${({ theme }) => theme.fontSize.primary};
  width: 100%;

  background: linear-gradient(
    to right,
    rgba(200, 200, 200, 0.2) 8%,
    rgba(200, 200, 200, 0.3) 18%,
    rgba(200, 200, 200, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: wave-lines 2s infinite ease-out;

  @keyframes wave-lines {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;
