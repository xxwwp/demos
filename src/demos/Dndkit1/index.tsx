import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
  DragOverlay,
  DragStartEvent,
  rectIntersection,
  MeasuringStrategy,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableItem } from "./components/SortableItem";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import cls from "./index.module.scss";

export default function DndKit1() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState<UniqueIdentifier[]>([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeIndex = items.indexOf(Number(activeId!));

  return (
    <DndContext
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      // modifiers={[restrictToVerticalAxis]}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
    >
      <SortableContext
        items={items}
        // strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 p-2 w-[116px]">
          {items.map((id) => (
            <SortableItem key={id} id={id} active={false} activeIndex={activeIndex} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay
        modifiers={[restrictToWindowEdges]}
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            className: {
              active: cls.active,
            },
          }),
        }}
      >
        {activeId !== null && ( //
          <SortableItem id={activeId} active activeIndex={activeIndex} />
        )}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active.id));
        const newIndex = items.indexOf(Number(over.id));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
