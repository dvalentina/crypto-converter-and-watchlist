import { Kay_Pho_Du } from 'next/font/google';

const kayPhoDu = Kay_Pho_Du({
  weight: ['400'],
  subsets: ['latin'],
});

const theme = {
  gradient: 'linear-gradient(45deg, turquoise, mediumslateblue)',
  fontSize: {
    primary: '20px',
    error: '16px',
  },
  fontFamily: {
    primary: kayPhoDu.style.fontFamily,
  },
  colors: {
    error: 'lightcoral',
  },
};

export default theme;
