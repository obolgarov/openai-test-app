import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

interface CountdownProps {
  target: string;
}

export default function Countdown({ target }: CountdownProps) {
  const dateTarget = new Date(target);
  const now = useSignal(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      if (now.value > dateTarget) {
        clearInterval(timer);
      }
      now.value = new Date();
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  const secondsLeft = Math.floor(
    (dateTarget.getTime() - now.value.getTime()) / 1000,
  );

  console.log(timeFmt.format(secondsLeft, "seconds"));

  if (secondsLeft <= 0) {
    return <span>Time's up!</span>;
  }

  return <span>{timeFmt.format(secondsLeft, "seconds")}</span>;
}
