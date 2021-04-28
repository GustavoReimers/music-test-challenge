import React, { useEffect, useReducer, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import * as Tone from "tone";
import { SAVED_TRACKS_STORAGE_KEY } from "config";

import { Header, Sidebar } from "components";
import { getRandomColor } from "utils";
import Main from "./Main";
import { appReducer, initialState } from "appReducer";

export const AppContext = React.createContext();

function App() {
  const [previewXOffset, setPreviewXOffset] = useState(null);
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [latestDropWidth, setLatestDropWidth] = useState(0);
  const [savedTracks, setSavedTracks] = useState([]);

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Track time in seconds
  const trackTime = 30;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const dropZoneWidth = over?.rect?.width || 0;
    setLatestDropWidth(dropZoneWidth);
    if (active?.data?.current?.audio && over) {
      const buffer = new Tone.Buffer(active?.data?.current?.audio, () => {
        const player = new Tone.Player(buffer).toDestination();
        const leftOffsetPercent = (previewXOffset / dropZoneWidth) * 100;
        const secondsToStart = (leftOffsetPercent * trackTime) / 100;
        setSelectedSamples([
          ...selectedSamples,
          {
            id: Date.now(),
            player,
            leftOffset: previewXOffset,
            duration: buffer.duration,
            width: (buffer.duration / trackTime) * 100,
            title: active?.data?.current?.title,
            color: getRandomColor(),
            audio: active?.data?.current?.audio,
            secondsToStart,
          },
        ]);
      });
    }
  };

  const activationConstraint = {
    distance: { x: 1, y: 1 },
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const storageSavedTracks = localStorage.getItem(SAVED_TRACKS_STORAGE_KEY);
    if (storageSavedTracks) {
      setSavedTracks(JSON.parse(storageSavedTracks));
    }
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="app">
          <Header />
          <Sidebar />
          <div className="main-container">
            <Main
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
          </div>
        </div>
      </AppContext.Provider>
    </DndContext>
  );
}

export default App;
