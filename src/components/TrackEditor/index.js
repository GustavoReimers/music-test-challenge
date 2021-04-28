import { useContext, useState } from "react";
import * as Tone from "tone";

import { SAVED_TRACKS_STORAGE_KEY } from "config";

import TrackEditorInfo from "./TrackEditorInfo";
import TrackEditorDrop from "./TrackEditorDrop";

import { AppContext } from "containers/App";

function TrackEditor({
  previewXOffset,
  setPreviewXOffset,
  selectedSamples,
  setSelectedSamples,
  trackTime,
  latestDropWidth,
  savedTracks,
  setSavedTracks,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackName, setTrackName] = useState("Track Name");
  const { state, dispatch } = useContext(AppContext);

  const play = () => {
    Tone.start().then(() => {
      for (let i = 0; i < selectedSamples.length; i++) {
        selectedSamples[i].player
          .sync()
          .start(selectedSamples[i].secondsToStart);
      }

      let firstTime = null;
      Tone.Transport.position = 0;
      Tone.Transport.seconds = 0;

      Tone.Transport.scheduleRepeat((time) => {
        if (!firstTime) {
          firstTime = time;
        }
        const progress = ((time - firstTime) / trackTime) * 100;
        setTrackProgress(progress);
        if (progress >= 100) {
          stop();
        }
      }, 0.1);

      Tone.Transport.start();
      setIsPlaying(true);
      dispatch({
        type: "setIsPlaying",
        payload: true,
      });
    });
  };

  const stop = () => {
    setIsPlaying(false);
    setTrackProgress(0);
    Tone.Transport.cancel();
    Tone.Transport.stop();
    Tone.Transport.seconds = 0;
    Tone.Transport.position = 0;
    for (let i = 0; i < selectedSamples.length; i++) {
      selectedSamples[i].player.unsync();
    }
    dispatch({
      type: "setIsPlaying",
      payload: false,
    });
  };

  const save = () => {
    let samplesToSave = selectedSamples.map((sample) => ({
      id: sample.id,
      audio: sample.audio,
      leftOffset: sample.leftOffset,
      duration: sample.duration,
      width: sample.width,
      title: sample.title,
      color: sample.color,
      secondsToStart: sample.secondsToStart,
    }));
    const trackToSave = {
      id: Date.now(),
      name: trackName,
      samples: samplesToSave,
    };
    const newSavedTracks = [...savedTracks, trackToSave];
    localStorage.setItem(
      SAVED_TRACKS_STORAGE_KEY,
      JSON.stringify(newSavedTracks)
    );
    setTrackName("Track Name");
    setSavedTracks(newSavedTracks);
  };

  const handlePlayOrStop = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return (
    <div className="track-editor">
      <TrackEditorInfo
        {...{
          trackName,
          setTrackName,
          isPlaying,
          handlePlayOrStop,
          save,
        }}
      />
      <TrackEditorDrop
        {...{
          isPlaying,
          previewXOffset,
          setPreviewXOffset,
          selectedSamples,
          setSelectedSamples,
          trackTime,
          trackProgress,
          latestDropWidth,
        }}
      />
    </div>
  );
}

export default TrackEditor;
