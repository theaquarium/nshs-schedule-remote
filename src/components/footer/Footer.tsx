import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer mt-6">
            <div className="content has-text-centered">
                <p className="is-size-5">
                    <Link to="/help">Need Help?</Link>
                    <br />
                    <Link to="/privacypolicy">Privacy Policy</Link>
                </p>
                <p>
                    Made with ♥ by{' '}
                    <a href="https://github.com/theaquarium">Peter Vashevko</a>.
                    <br />
                    Check out the code on{' '}
                    <a href="https://github.com/theaquarium/nshs-schedule">
                        GitHub
                    </a>
                    .
                </p>

                <p>
                    This website is not affiliated with, endorsed by, or in any
                    way officially connected with Newton South High School or
                    the Newton Public Schools.
                </p>

                <p>
                    Having issues? Found a bug? Need support? Send me an email
                    at{' '}
                    <a href="mailto:peter@vashevko.com">peter@vashevko.com</a>{' '}
                    <br />
                    or message me on Discord at{' '}
                    <span className="is-family-monospace">aquarium#9352</span>.
                </p>
            </div>
        </footer>
    );
}
