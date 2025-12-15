import Link from 'next/link';

export default function UnloggedHeader() {
  return (
    <>
      <div className="flex flex-row py-5 max-h-21.25 text-center items-center w-full font-poppins">
        <nav className="cursor-pointer flex items-center justify-between flex-row w-full px-5 text-xl sm:text-2xl font-semibold">
          <Link href="/">
            <div className="hover:underline text-cyan-700">Log In</div>
          </Link>
          <Link href="/register">
            <div className="hover:underline text-cyan-700">Register</div>
          </Link>
        </nav>
      </div>
    </>
  );
}
