import { useState } from 'react';

import PlayIcon from 'assets/images/play.svg';

function TrackEditorInfo({ handlePlayOrStop, isPlaying, save, trackName, setTrackName }) {
  const [editingTrackName, setEditingTrackName] = useState(trackName);
  const [editingName, setEditingName] = useState(false);

  const submitEdit = (e) => {
    e.preventDefault();
    setEditingName(false);
    setTrackName(editingTrackName);
  };

  const changeEditingTrackName = (e) => {
    setEditingTrackName(e.target.value);
  };

  return (
    <div className="track-editor__info">
      <div className="track-editor__info-inner">
        <div className="track-editor__info__name">
          {!editingName && <span onClick={() => {setEditingName(true)}}>{trackName}</span>}
          {editingName && (
            <form onSubmit={submitEdit}>
              <input type="text" placeholder="Track Name" onChange={changeEditingTrackName} />
            </form>
          )}
        </div>
        <button className="track-editor__save" onClick={save}>
          Save
        </button>
      </div>
      <button className="track-editor__play" onClick={handlePlayOrStop}>
        {!isPlaying && <img src={PlayIcon} alt="" />}
        {isPlaying && <div className="track-editor__play__stop" />}
      </button>
    </div>
  )
}

export default TrackEditorInfo;
