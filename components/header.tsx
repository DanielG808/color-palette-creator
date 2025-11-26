import ModeToggle from "./mode-toggle";
import HomePageLink from "./home-page-link";

export default function Header() {
  return (
    <header className="flex justify-center items-start md:items-center space-x-5 pb-10 md:pb-0">
      <HomePageLink />
      <ModeToggle />
    </header>
  );
}
