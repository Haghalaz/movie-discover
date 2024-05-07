export default function Header() {
  return (
    <header className="body-font w-full bg-[#1E1F28] text-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-6">
        <a href="/" className="header-Font transition-colors hover:text-[#8CD955]">
          TIPFLIX
        </a>

        <div className="ml-6 flex h-full items-center pl-6">
          <a
            href="/SurpriseMe"
            className="ease rounded bg-[#3E8C32] px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 hover:bg-[#8CD955] hover:shadow-md focus:outline-none active:bg-teal-600"
          >
            Me Surpreenda
          </a>
        </div>
      </div>
    </header>
  );
}
