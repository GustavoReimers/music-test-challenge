import TrackEditorSample from './TrackEditorSample';

function TrackEditorSamples({
  selectedSamples,
  setSelectedSamples,
  latestDropWidth,
  trackTime
}) {
  const updateSample = (sample, leftOffset) => {
    const updatedSamples = selectedSamples.map(smp => {
      if (smp.id === sample.id) {
        const leftOffsetPercent = (leftOffset / latestDropWidth) * 100;
        const secondsToStart = (leftOffsetPercent * trackTime) / 100;
        return {
          ...smp,
          leftOffset,
          secondsToStart
        };
      }
      return smp;
    });
    setSelectedSamples(updatedSamples);
  };
  return (
    <div className='track-editor__samples'>
      {selectedSamples.map(sample => (
        <TrackEditorSample
          key={sample.id}
          sample={sample}
          updateSample={(sample, leftOffset) =>
            updateSample(sample, leftOffset)
          }
        />
      ))}
    </div>
  );
}

export default TrackEditorSamples;
