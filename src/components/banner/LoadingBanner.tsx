import React from 'react';

export function LoadingBanner({ isNow }: any) {
    return (
        <section className="hero is-medium is-bold is-dark">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Loading...</h1>
                </div>
            </div>
        </section>
    );
}
