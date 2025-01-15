import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";

export function SortableItem(props: { id: UniqueIdentifier; active: boolean; activeIndex: number }) {
  const { over, index, attributes, listeners, setNodeRef, transform, transition, isSorting, isDragging } = useSortable({
    id: props.id,
    animateLayoutChanges: () => true,
  });

  const style = {
    transform: isSorting ? undefined : CSS.Transform.toString(transform),
    transition,
    opacity: props.active ? "0.7" : undefined,
  };

  return (
    <div className={classNames(isDragging && "bg-black")}>
      <div //
        ref={setNodeRef}
        style={{ ...style }}
        {...attributes}
        {...listeners}
        className={classNames(
          "w-[100px] h-[100px] text-yellow-50 grid place-content-center border border-solid border-white relative",
          // props.activeIndex === index && "bg-red-400"
          !isDragging && "bg-red-400"
        )}
      >
        <span onClick={() => console.log("runrunrun")}>
          {props.id}
          {String(isDragging)}
        </span>

        <div
          className={classNames(
            "absolute w-[80%] h-[2px] bg-yellow-400 left-[50%] translate-x-[-50%]",
            over?.id === props.id
              ? index > props.activeIndex
                ? "bottom-[-8px]" // after
                : "top-[-8px]" // before
              : "hidden"
          )}
        ></div>

        {/* {over?.id === props.id //
        ? index > props.activeIndex
          ? "after"
          : "before"
        : undefined} */}
      </div>
    </div>
  );
}
