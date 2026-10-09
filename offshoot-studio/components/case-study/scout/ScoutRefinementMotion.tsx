'use client';

import { CSS } from '@dnd-kit/utilities';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02Icon } from '@hugeicons/core-free-icons';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { useMemo, useState, type CSSProperties } from 'react';
import styles from './ScoutRefinementMotion.module.css';

type DashboardCard = {
  id: string;
  title: string;
  accent: 'blue' | 'green' | 'amber' | 'slate';
};

const INITIAL_CARDS: DashboardCard[] = [
  { id: 'fleet-efficiency', title: 'Fleet efficiency', accent: 'green' },
  { id: 'missed-savings', title: 'Missed savings', accent: 'amber' },
  { id: 'driver-alerts', title: 'Driver alerts', accent: 'blue' },
  { id: 'price-trends', title: 'Price trends', accent: 'slate' },
  { id: 'idling-costs', title: 'Idling costs', accent: 'amber' },
  { id: 'route-drift', title: 'Route drift', accent: 'blue' },
  { id: 'fuel-anomalies', title: 'Fuel anomalies', accent: 'green' },
  { id: 'station-variance', title: 'Station variance', accent: 'slate' },
];

type SortableCardProps = {
  card: DashboardCard;
  onDelete: (id: string) => void;
};

function SortableCard({ card, onDelete }: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.45 : 1,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={styles.card}
      data-accent={card.accent}
      data-featured={card.id === 'fleet-efficiency' ? 'true' : undefined}
      aria-label={`${card.title} card`}
      {...attributes}
      {...listeners}
    >
      <button
        type="button"
        className={styles.delete}
        onClick={() => onDelete(card.id)}
        onPointerDown={(event) => event.stopPropagation()}
        aria-label={`Delete ${card.title}`}
      >
        <HugeiconsIcon icon={Delete02Icon} size={12} strokeWidth={2} />
      </button>
      <div className={styles.cardBars} aria-hidden>
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

function OverlayCard({ card }: { card: DashboardCard }) {
  return (
    <article
      className={styles.card}
      data-accent={card.accent}
      data-featured={card.id === 'fleet-efficiency' ? 'true' : undefined}
      aria-hidden
    >
      <button type="button" className={styles.delete} tabIndex={-1}>
        <HugeiconsIcon icon={Delete02Icon} size={12} strokeWidth={2} />
      </button>
      <div className={styles.cardBars}>
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

export default function ScoutRefinementMotion() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeCard = useMemo(
    () => cards.find((card) => card.id === activeId) ?? null,
    [activeId, cards]
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    setCards((prev) => {
      const oldIndex = prev.findIndex((card) => card.id === active.id);
      const newIndex = prev.findIndex((card) => card.id === over.id);
      if (oldIndex < 0 || newIndex < 0) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  function handleDelete(id: string) {
    setCards((prev) => prev.filter((card) => card.id !== id));
  }

  return (
    <section className={styles.stage} aria-label="Interactive dashboard cards for reordering and deleting">
      <aside className={styles.sidebar}>
        <p className={styles.brand}>Refine pass</p>
        <p className={styles.hint}>Drag cards to reorder. Delete what does not earn space.</p>
      </aside>

      <div className={styles.workspace}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
            <div className={styles.cardList}>
              {cards.map((card) => (
                <SortableCard key={card.id} card={card} onDelete={handleDelete} />
              ))}
              {!cards.length && (
                <div className={styles.empty} role="status">
                  All cards removed
                </div>
              )}
            </div>
          </SortableContext>

          <DragOverlay>{activeCard ? <OverlayCard card={activeCard} /> : null}</DragOverlay>
        </DndContext>
      </div>
    </section>
  );
}
