import {
  TrackEditor,
  SavedTracks,
} from 'components';

function Main({
  previewXOffset,
  setPreviewXOffset,
  selectedSamples,
  setSelectedSamples,
  trackTime,
  latestDropWidth,
  savedTracks,
  setSavedTracks,
}) {
  return (
    <div className="main">
      <TrackEditor
        {...{
          previewXOffset,
          setPreviewXOffset,
          selectedSamples,
          setSelectedSamples,
          trackTime,
          latestDropWidth,
          savedTracks,
          setSavedTracks,
        }}
      />
      <SavedTracks {...{ savedTracks, trackTime }} />
    </div>
  )
}

export default Main;
