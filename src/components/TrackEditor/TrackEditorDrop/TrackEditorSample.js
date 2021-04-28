import { useDraggable, useDndMonitor } from '@dnd-kit/core';

function TrackEditorSample({ sample, updateSample }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${sample.id}`,
    data: {
      id: sample.id,
      audio: sample.audio,
      title: sample.title,
      leftOffset: sample.leftOffset
    }
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: 'grab',
        zIndex: 10
      }
    : undefined;

  useDndMonitor({
    onDragEnd(event) {
      const xOffset = event.delta.x;
      const updatedLeftOffset =
        (event?.active?.data?.current?.leftOffset || 0) + xOffset;
      if (updatedLeftOffset < 0) {
        updateSample(event?.active?.data?.current, 0);
      } else {
        updateSample(event?.active?.data?.current, updatedLeftOffset);
      }
    }
  });

  return (
    <div
      className='track-editor__drop-item'
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        left: `${sample.leftOffset}px`,
        width: `${sample.width}%`,
        backgroundColor: sample.color,
        ...style
      }}
    >
      {sample.title}
    </div>
  );
}

export default TrackEditorSample;
