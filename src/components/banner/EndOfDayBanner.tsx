import React from 'react';

export function EndOfDayBanner({ isWeekend }: any) {
    return (
        <section className="hero is-medium is-bold is-dark">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        {isWeekend
                            ? "You're all done for the week!"
                            : "You're all done for today!"}
                    </h1>
                    <h2 className="subtitle">
                        {isWeekend
                            ? 'Have a great weekend!'
                            : 'Have a great day!'}
                    </h2>
                </div>
            </div>
        </section>
    );
}
