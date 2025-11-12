import DarkModeToggle from "./dark-mode-toggle";
import HomePageLink from "./home-page-link";

export default function Header() {
  return (
    <header className="flex justify-center">
      <HomePageLink />
      <DarkModeToggle />
    </header>
  );
}
