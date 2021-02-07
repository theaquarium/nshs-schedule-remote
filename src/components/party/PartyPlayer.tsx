import React, { ChangeEvent } from 'react';
import { IoCaretBack, IoCaretForward } from 'react-icons/io5';

import './PartyPlayer.scss';
import { PartyPlayerCircles } from './PartyPlayerCircles';
import { TrackList } from './TrackList';

const rotationAmounts = [4.5, 10, 15.75, 22];

export function PartyPlayer() {
    const player = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [activeTrack, setActiveTrack] = React.useState(-1);
    const [highlightedTrack, setHighlightedTrack] = React.useState(-1);
    const [activeDisc, setActiveDisc] = React.useState(0);

    const endListener = () => {
        if (player.current !== null) {
            player.current.src = '';
            setIsPlaying(false);
            setActiveTrack(-1);
            setHighlightedTrack(-1);
        }
    };

    const pauseListener = () => {
        if (player.current !== null) {
            player.current.pause();
            endListener();
        }
    };

    const discListener = (trackNum: number) => {
        if (player.current !== null) {
            if (activeTrack === trackNum) {
                pauseListener();
                return;
            }

            player.current.src = `${process.env.PUBLIC_URL}/tracks/${TrackList[activeDisc]?.[trackNum].url}`;
            player.current.currentTime = 0;
            player.current.play();

            setIsPlaying(true);
            setActiveTrack(trackNum);
            setHighlightedTrack(trackNum);
        }
    };

    const mouseEnterListener = (trackNum: number) => {
        setHighlightedTrack(trackNum);
    };

    const mouseLeaveListener = () => {
        if (activeTrack !== -1) {
            setHighlightedTrack(activeTrack);
        } else {
            setHighlightedTrack(-1);
        }
    };

    const flipDiscNext = () => {
        pauseListener();
        setTimeout(() => {
            setActiveDisc((activeDisc + 1) % 4);
        }, 250);
    };

    const flipDiscLast = () => {
        pauseListener();
        setTimeout(() => {
            const newNum = activeDisc - 1;
            setActiveDisc(newNum === 0 ? 3 : newNum);
        }, 250);
    };

    const gainNode = React.useRef<GainNode>();

    React.useEffect(() => {
        if (player.current !== null) {
            // @ts-ignore: Nonstandard
            const AudioContext =
                // @ts-ignore: Nonstandard
                window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            gainNode.current = audioContext.createGain();

            gainNode.current.connect(audioContext.destination);

            const mediaSource = audioContext.createMediaElementSource(
                player.current,
            );
            mediaSource.connect(gainNode.current);
        }
    }, []);

    const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;

        const value = target.value;
        const volumeNum = parseFloat(value);

        if (gainNode.current && !isNaN(volumeNum)) {
            gainNode.current.gain.value = volumeNum;
        }
    };

    return (
        <React.Fragment>
            <audio ref={player} onEnded={endListener} onPause={endListener} />
            <div className="party-player">
                <div className="party-player_bottom">
                    <div className="party-player_bottom-line" />
                    <div className="party-player_bottom-line" />
                    <div className="party-player_bottom-line" />
                    <div className="party-player_bottom-line" />
                </div>

                <PartyPlayerCircles
                    discNum={0}
                    isPlaying={isPlaying}
                    activeTrack={activeTrack}
                    discListener={discListener}
                    mouseEnterListener={mouseEnterListener}
                    mouseLeaveListener={mouseLeaveListener}
                    endListener={endListener}
                    highlightedTrack={highlightedTrack}
                    activeDisc={activeDisc}
                    pauseListener={pauseListener}
                />
                <PartyPlayerCircles
                    discNum={1}
                    isPlaying={isPlaying}
                    activeTrack={activeTrack}
                    discListener={discListener}
                    mouseEnterListener={mouseEnterListener}
                    mouseLeaveListener={mouseLeaveListener}
                    endListener={endListener}
                    highlightedTrack={highlightedTrack}
                    activeDisc={activeDisc}
                    pauseListener={pauseListener}
                />
                <PartyPlayerCircles
                    discNum={2}
                    isPlaying={isPlaying}
                    activeTrack={activeTrack}
                    discListener={discListener}
                    mouseEnterListener={mouseEnterListener}
                    mouseLeaveListener={mouseLeaveListener}
                    endListener={endListener}
                    highlightedTrack={highlightedTrack}
                    activeDisc={activeDisc}
                    pauseListener={pauseListener}
                />
                <PartyPlayerCircles
                    discNum={3}
                    isPlaying={isPlaying}
                    activeTrack={activeTrack}
                    discListener={discListener}
                    mouseEnterListener={mouseEnterListener}
                    mouseLeaveListener={mouseLeaveListener}
                    endListener={endListener}
                    highlightedTrack={highlightedTrack}
                    activeDisc={activeDisc}
                    pauseListener={pauseListener}
                />

                <div
                    className="party-player_stylus"
                    style={{
                        transform: `rotate(${
                            activeTrack !== -1
                                ? rotationAmounts[activeTrack]
                                : -8
                        }deg)`,
                    }}
                >
                    <div className="party-player_stylus-arm" />
                    <div className="party-player_stylus-bend" />
                    <div className="party-player_stylus-pivot" />
                    <div className="party-player_stylus-needle" />
                </div>
                <div className="party-player_stop">
                    <div
                        className="party-player_stop-button"
                        onClick={pauseListener}
                    >
                        <div className="party-player_stop-icon" />
                    </div>
                </div>
                <div className="party-player_flip-disc1">
                    <div
                        className="party-player_flip-button"
                        onClick={flipDiscLast}
                    >
                        <span className="icon">
                            <IoCaretBack />
                        </span>
                    </div>
                </div>
                <div className="party-player_flip-disc2">
                    <div
                        className="party-player_flip-button"
                        onClick={flipDiscNext}
                    >
                        <span className="icon">
                            <IoCaretForward />
                        </span>
                    </div>
                </div>
                <div className="party-player_volume">
                    <input
                        type="range"
                        id="volume"
                        className="party-player_volume-range"
                        min="0"
                        max="1"
                        defaultValue="1"
                        onChange={onVolumeChange}
                        list="gain-vals"
                        step="0.01"
                        autoComplete="off"
                        title="Volume"
                    />
                    <datalist id="gain-vals">
                        <option value="0" label="min" />
                        <option value="1" label="max" />
                    </datalist>
                    <div className="VolumeBox-icon">&#128266;</div>
                </div>
            </div>
        </React.Fragment>
    );
}
