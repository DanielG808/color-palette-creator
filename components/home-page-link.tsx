import H1 from "@/components/H1";

export default function HomePageLink() {
  return (
    <a href="/">
      <H1 className="hover:text-black dark:hover:text-white duration-200 cursor-pointer">
        Color Palette Creator
      </H1>
    </a>
  );
}
