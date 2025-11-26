import ModeToggle from "./mode-toggle";
import HomePageLink from "./home-page-link";

export default function Header() {
  return (
    <header className="flex justify-center items-center space-x-5">
      <HomePageLink />
      <ModeToggle />
    </header>
  );
}
