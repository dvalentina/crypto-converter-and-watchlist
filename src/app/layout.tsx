import type { Metadata } from 'next';

import GlobalStyles from '@/components/GlobalStyles';
import Grid from '@/components/Grid';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import ThemeClient from '@/components/ThemeClient';

export const metadata: Metadata = {
  title: 'Crypto Converter and Watchlist',
  description: 'An application built with CryptoRank API',
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
          <ThemeClient>
            <GlobalStyles />
            <Grid>{children}</Grid>
          </ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
