import { Kay_Pho_Du } from 'next/font/google';

const kayPhoDu = Kay_Pho_Du({
  weight: ['400'],
  subsets: ['latin'],
});

const theme = {
  gradient: 'linear-gradient(45deg, turquoise, mediumslateblue)',
  fontSize: {
    primary: '20px',
  },
  fontFamily: {
    primary: kayPhoDu.style.fontFamily,
  },
};

export default theme;
