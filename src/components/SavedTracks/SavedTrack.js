import { useState } from 'react';
import * as Tone from 'tone';
import SVG from 'react-inlinesvg';

import PlayIcon from 'assets/images/play.svg';

function SavedTracks({ track, trackTime }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    const samples = track.samples;
    Tone.start().then(async () => {
      for(let i = 0; i < samples.length; i++) {
        const buffer = await new Tone.Buffer(samples[i].audio);
        const player = await new Tone.Player(buffer).toDestination();
        player.sync().start(samples[i].secondsToStart);
      }
  
      let firstTime = null;
      Tone.Transport.position = 0;
      Tone.Transport.seconds = 0;
  
      Tone.Transport.scheduleRepeat((time) => {
        if(!firstTime) {
          firstTime = time;
        }
        const progress = (time - firstTime) / trackTime * 100;
        if(progress >= 100) {
          stop();
        }
      }, 0.1);
  
      
      Tone.Transport.start();
      setIsPlaying(true);
    });
  };

  const stop = () => {
    setIsPlaying(false);
    Tone.Transport.cancel();
    Tone.Transport.stop();
    Tone.Transport.seconds = 0;
    Tone.Transport.position = 0;
  };

  const handlePlayAndStop = () => {
    if(!isPlaying) {
      play();
    }
    else {
      stop();
    }
  };

  return (
    <div key={track.id} className="saved-tracks__list__item">
      <div className="saved-tracks__list__item__play" onClick={handlePlayAndStop}>
        {!isPlaying && <SVG src={PlayIcon} />}
        {isPlaying && <div className="saved-tracks__list__item__stop" />}
      </div>
      <div className="saved-tracks__list__item__name">{track.name}</div>
    </div>
  )
};

export default SavedTracks;