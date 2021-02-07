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
                    <br />
                    <Link to="/party">Dance Party</Link>
                </p>
                <p>
                    Made with ♥ by{' '}
                    <a
                        href="https://github.com/theaquarium"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Peter Vashevko
                    </a>
                    .
                    <br />
                    Check out the code on{' '}
                    <a
                        href="https://github.com/theaquarium/nshs-schedule"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
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
                    <a
                        href="mailto:peter@vashevko.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        peter@vashevko.com
                    </a>{' '}
                    <br />
                    or{' '}
                    <a href="https://discord.gg/KXxZt2BPUF">
                        join the Discord server
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
}
