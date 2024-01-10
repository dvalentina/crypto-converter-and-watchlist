import Link from 'next/link'

function Header() {
  return (
    <>
      <Link href="/converter">Converter</Link>
      <Link href="/watchlist">Watchlist</Link>
    </>
  );
}

export default Header;