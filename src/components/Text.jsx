import TextReveal from "@/components/ui/text-reveal";

export function TextRevealDemo(props) {
  return (
    <div className="z-10 flex px-4 20 min-h-12 items-center justify-center rounded-lg  bg-white dark:bg-black ">
      <TextReveal text={props.text}/>
    </div>
  );
}
