import Link from "next/link";

const NavLinks = () => {
  return (
    <nav className="flex gap-8 items-center">
      {/* will be a list of links in future implementation with logic to show some optionally*/}
      <Link className="text-sm text-light-slate-10" href="#">
        Insights Hub
      </Link>
    </nav>
  );
};

export default NavLinks;
