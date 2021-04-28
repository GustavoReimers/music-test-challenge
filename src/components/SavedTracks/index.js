import SavedTrack from './SavedTrack';

function SavedTracks({ savedTracks, trackTime }) {
  return (
    <div className="saved-tracks">
      <div className="saved-tracks__title">
        Saved Tracks
      </div>
      {savedTracks.length === 0 && (
        <div className="saved-tracks__placeholder">
          You didn’t save any tracks, yet.
        </div>
      )}
      {savedTracks.length > 0 && (
        <div className="saved-tracks__list">
          {savedTracks.map(track => (
            <SavedTrack key={track.id} track={track} trackTime={trackTime} />
          ))}
        </div>
      )}
    </div>
  )
};

export default SavedTracks;
