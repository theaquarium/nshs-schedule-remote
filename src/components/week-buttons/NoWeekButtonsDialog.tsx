import React from 'react';

export function NoWeekButtonsDialog() {
    return (
        <div className="modal-content">
            <div className="card">
                <div className="card-content">
                    <h4 className="title is-4">
                        Wondering where the Week 1 and Week 2 tabs are?
                    </h4>
                    <p>
                        As we're getting toward the end of the year, the
                        schedule doesn't really follow the Week 1 and Week 2
                        format anymore, so nshs.site will just show you the
                        schedule week by week. If you want to see the entire
                        schedule in detail for the rest of the year,{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://docs.google.com/document/d/1Rt85EV7ieZZ0DXxYh5IXMzzWHOMsIyiOih0PjZwNtB0/edit?usp=sharing"
                        >
                            click here
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
