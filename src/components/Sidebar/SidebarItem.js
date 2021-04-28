import { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import cx from 'classnames';
import * as Tone from 'tone';
import SVG from 'react-inlinesvg';

import PlayIcon from 'assets/images/play.svg';

function SidebarItem({ sample }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${sample.id}`,
    data: {
      id: sample.id,
      audio: sample.audio,
      title: sample.title,
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    cursor: 'grab',
    zIndex: 10,
  } : undefined;

  const className = cx('sidebar__item', {
    'sidebar__item--dragging': isDragging,
  });

  const playSample = () => {
    if(player) {
      setIsPlaying(true);
      player.start();
    }
  };

  const stopSample = () => {
    if(player) {
      setIsPlaying(false);
      player.stop();
    }
  };
  
  const handlePlayAndStop = () => {
    if(!isPlaying) {
      playSample();
    }
    else {
      stopSample();
    }
  };

  useEffect(() => {
    if(window.AudioBuffer) {
      const buffer = new Tone.Buffer(sample.audio, () => {
        const player = new Tone.Player(buffer).toDestination();
        player.onstop = () => {
          setIsPlaying(false);
        };
        setPlayer(player);
      });
    }
  }, []);

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={className}>
      <div className="sidebar__item__play" onClick={handlePlayAndStop}>
        {!isPlaying && <SVG src={PlayIcon} />}
        {isPlaying && <div className="sidebar__item__stop" />}
      </div>
      <span>
        {sample.title}
      </span>
    </div>
  )
}

export default SidebarItem;
