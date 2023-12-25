import { useState, useEffect, useRef } from "react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useOnClickOutside } from "../lib/hooks";

export default function Bookmarks() {
  // also called local state
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // hooks for common use cases are available (show google results)

  // detect click outside of the bookmarks list with own solution, without ref
  // useEffect(() => {
  //   function handleClick(event: MouseEvent) {
  //     const target = event.target as HTMLElement;
  //     if (
  //       !target.closest(".bookmarks-popover") &&
  //       !target.closest(".bookmarks-btn")
  //     ) {
  //       setIsOpen(false);
  //     }
  //   }

  //   document.addEventListener("click", handleClick);

  //   return () => document.removeEventListener("click", handleClick);
  // }, []);

  // detect click outside of the bookmarks list with own solution, with ref
  // useEffect(() => {
  //   function handleClick(event: MouseEvent) {
  //     const target = event.target as HTMLElement;
  //     if (
  //       // use ref to check if the click is inside the popover
  //       !popoverRef.current?.contains(target) &&
  //       // use ref to check if the click is inside the button
  //       !buttonRef.current?.contains(target)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   }

  //   document.addEventListener("click", handleClick);

  //   return () => document.removeEventListener("click", handleClick);
  // }, []);

  // use hook
  useOnClickOutside([buttonRef, popoverRef], () => setIsOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
