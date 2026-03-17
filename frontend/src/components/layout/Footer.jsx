export default function Footer() {
  return (
    <footer className="border-t border-border-light dark:border-border-dark mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
          AutoVault &mdash; India&apos;s Automobile Specifications &amp; Comparison Portal
        </p>
        <p>KTU S4 DBMS Micro Project &middot; PCCST402</p>
        <p className="mt-1">
          Team: Aravind Lal, Aaromal V, Abhishek H, Alen Sajan, Madhav S, Sreeram S Nair
        </p>
        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} AutoVault. MIT License.
        </p>
      </div>
    </footer>
  );
}
