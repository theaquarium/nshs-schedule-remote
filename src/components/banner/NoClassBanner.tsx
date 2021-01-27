import React from 'react';

export function NoClassBanner({ block, isNow, nextClassStart }: any) {
    return (
        <section className="hero is-medium is-bold is-dark">
            <div className="hero-head">
                <div className="pl-4 pt-3">
                    <h3 className="subtitle is-3 is-italic">
                        {isNow ? 'Now' : 'Coming Up'}
                    </h3>
                </div>
            </div>
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {block.name}
                        <span className="is-italic">&nbsp;(No Class)</span>
                    </h1>
                    {nextClassStart ? (
                        <h2 className="subtitle">
                            {block.startTime}-{block.endTime}
                            <span className="is-italic">
                                &nbsp;({block.length})
                            </span>
                            <br />
                            <br />
                            Your next class starts at {nextClassStart}.
                        </h2>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
