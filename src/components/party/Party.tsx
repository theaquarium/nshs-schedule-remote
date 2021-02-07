import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import './Party.scss';
import { PartyPlayer } from './PartyPlayer';

export function Party() {
    return (
        <div className="party-box">
            <div className="container my-3 px-3">
                <Link
                    to="/"
                    className="button is-link is-rounded is-medium mb-3"
                >
                    <span className="icon mr-1">
                        <IoArrowBack className="is-size-4" />
                    </span>
                    Leave the party
                </Link>
            </div>
            <PartyPlayer />
        </div>
    );
}
