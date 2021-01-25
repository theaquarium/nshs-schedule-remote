import React from 'react';

export function EndOfDayBanner({ isEndOfDay }: any) {
    return (
        <section className="hero is-medium is-bold is-dark">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {isEndOfDay
                            ? "You're all done for today!"
                            : 'No school today!'}
                    </h1>
                    <h2 className="subtitle">Have a great day!</h2>
                </div>
            </div>
        </section>
    );
}
