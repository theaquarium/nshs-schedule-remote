import React from 'react';
import { TrackList, DiscNames } from './TrackList';

import './PartyPlayerCircles.scss';

export function PartyPlayerCircles({
    discNum,
    isPlaying,
    activeTrack,
    discListener,
    mouseEnterListener,
    mouseLeaveListener,
    endListener,
    highlightedTrack,
    activeDisc,
    pauseListener,
}: {
    discNum: number;
    isPlaying: boolean;
    activeTrack: number;
    discListener: (discNum: number) => void;
    mouseEnterListener: (discNum: number) => void;
    mouseLeaveListener: () => void;
    endListener: () => void;
    highlightedTrack: number;
    activeDisc: number;
    pauseListener: () => void;
}) {
    return (
        <div
            className={`party-player_circles party-player_circles${discNum} ${
                isPlaying && activeDisc === discNum ? 'is-spinning' : ''
            } ${
                activeDisc === discNum
                    ? 'party-player__is-on'
                    : 'party-player__is-off'
            }`}
        >
            <div className="party-player_outer-disc"></div>
            <div
                className={
                    'party-player_disc0 party-player_disc ' +
                    (activeTrack === 0 ? 'is-active' : '')
                }
                onClick={discListener.bind(discListener, 0)}
                onMouseEnter={mouseEnterListener.bind(mouseEnterListener, 0)}
                onMouseLeave={mouseLeaveListener.bind(mouseLeaveListener, 0)}
            />
            <div
                className={
                    'party-player_disc1 party-player_disc ' +
                    (activeTrack === 1 ? 'is-active' : '')
                }
                onClick={discListener.bind(discListener, 1)}
                onMouseEnter={mouseEnterListener.bind(mouseEnterListener, 1)}
                onMouseLeave={mouseLeaveListener.bind(mouseLeaveListener, 1)}
            />
            <div
                className={
                    'party-player_disc2 party-player_disc ' +
                    (activeTrack === 2 ? 'is-active' : '')
                }
                onClick={discListener.bind(discListener, 2)}
                onMouseEnter={mouseEnterListener.bind(mouseEnterListener, 2)}
                onMouseLeave={mouseLeaveListener.bind(mouseLeaveListener, 2)}
            />
            <div
                className={
                    'party-player_disc3 party-player_disc ' +
                    (activeTrack === 3 ? 'is-active' : '')
                }
                onClick={discListener.bind(discListener, 3)}
                onMouseEnter={mouseEnterListener.bind(mouseEnterListener, 3)}
                onMouseLeave={mouseLeaveListener.bind(mouseLeaveListener, 3)}
            />
            <div
                className="party-player_label"
                style={{
                    cursor: isPlaying ? 'pointer' : 'auto',
                }}
                onClick={pauseListener}
            >
                <div className="party-player_label-title party-player_label-text">
                    {highlightedTrack !== -1 ? (
                        <span>
                            {TrackList[discNum][highlightedTrack].title}
                        </span>
                    ) : (
                        <span>
                            Disc {discNum + 1}
                            <br />
                            {DiscNames[discNum]}
                        </span>
                    )}
                </div>
                <div className="party-player_label-artist party-player_label-text">
                    {highlightedTrack !== -1 ? (
                        <span>
                            {TrackList[discNum][highlightedTrack].artist}
                        </span>
                    ) : (
                        <span>
                            No Track
                            <br />
                            Selected
                        </span>
                    )}
                </div>
            </div>
            <div className="party-player_hole" />
        </div>
    );
}
