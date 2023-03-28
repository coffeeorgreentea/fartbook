const nav = [
  { name: "Home", href: "#" },
  { name: "Fart Generation", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Careers", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white/80">
      <div className="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {nav.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 Fartbook.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
