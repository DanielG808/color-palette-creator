import H1 from "@/components/H1";

export default function HomePageLink() {
  return (
    <a href="/">
      <H1 className="text-4xl md:text-5xl text-calm-5 dark:text-calm-2 hover:text-black dark:hover:text-white duration-200 cursor-pointer">
        Color Palette Creator
      </H1>
    </a>
  );
}
