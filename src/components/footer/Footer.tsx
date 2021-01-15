import React from 'react';

export function Footer() {
    return (
        <footer className="footer mt-6">
            <div className="content has-text-centered">
                <p>
                    Made with ♥ by{' '}
                    <a href="https://github.com/theaquarium">Peter Vashevko</a>.
                    <br />
                    Check out the code on{' '}
                    <a href="https://github.com/theaquarium/nshs-schedule">
                        GitHub
                    </a>
                    .
                    <br />
                    <br />
                    Having issues? Found a bug? Need support? Send me an email
                    at{' '}
                    <a href="mailto:peter@vashevko.com">
                        peter@vashevko.com
                    </a>{' '}
                    <br />
                    or message me on Discord at{' '}
                    <span className="is-family-monospace">aquarium#9352</span>.
                </p>
            </div>
        </footer>
    );
}
