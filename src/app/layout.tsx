import type { Metadata } from 'next';

import GlobalStyles from '@/components/GlobalStyles';
import Grid from '@/components/Grid';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';

export const metadata: Metadata = {
  title: 'CryptoRank Test Task',
  description: 'An application for a test assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Grid>{children}</Grid>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
