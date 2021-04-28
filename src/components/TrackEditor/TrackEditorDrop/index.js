import { useDroppable, useDndMonitor, DndContext } from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { useState } from 'react';
import * as Tone from 'tone';
import TrackEditorSamples from './TrackEditorSamples';

function TrackEditorDrop({
  previewXOffset,
  setPreviewXOffset,
  selectedSamples,
  setSelectedSamples,
  trackTime,
  trackProgress,
  latestDropWidth,
  isPlaying,
}) {
  const [duration, setDuration] = useState(null);
  const [width, setWidth] = useState(null);

  const { setNodeRef } = useDroppable({
    id: 'droppable',
  });

  useDndMonitor({
    onDragStart({ active }) {
      const buffer = new Tone.Buffer(active?.data?.current?.audio, () => {
        setWidth(buffer.duration / trackTime * 100);
        setDuration(buffer.duration);
      });
    },
    onDragEnd() {
      setPreviewXOffset(null);
    },
    onDragMove(event) {
      const xOffset = event.delta.x - 400;
      const dropWidth = event?.over?.rect?.width || latestDropWidth || 0;
      const maxOffset = width ? dropWidth - (dropWidth / 100 * width) : dropWidth;
      if(event.over) {
        if(xOffset >= 0 && xOffset < maxOffset) {
          setPreviewXOffset(xOffset);
        }
      }
      else {
        setPreviewXOffset(null);
      }
    },
  });
  return (
    <div className="track-editor__drop-container">
      <div ref={setNodeRef} className="track-editor__drop">
        {!!trackProgress && trackProgress > 0 && isPlaying && (
          <div className="track-editor__progress" style={{ left: `${trackProgress}%` }} />
        )}
        {!previewXOffset && selectedSamples && selectedSamples.length === 0 && (
          <div className="track-editor__drop-placeholder">
            Drag & drop samples here
          </div>
        )}
        {!!previewXOffset && (
          <div className="track-editor__drop-preview" style={{ left: `${previewXOffset}px`, width: `${width}%` }}>
            {duration}s
          </div>
        )}
        <DndContext modifiers={[restrictToHorizontalAxis, restrictToParentElement]}>
          {selectedSamples && selectedSamples.length > 0 && (
            <TrackEditorSamples {...{ selectedSamples, setSelectedSamples, latestDropWidth, trackTime }} />
          )}
        </DndContext>
      </div>
    </div>
  )
}

export default TrackEditorDrop;
