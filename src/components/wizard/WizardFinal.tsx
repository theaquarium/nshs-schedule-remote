import React from 'react';
import { Link } from 'react-router-dom';

export function WizardFinal() {
    return (
        <div>
            <h1>All Done!</h1>
            <br />
            <p>You're all done for now!</p>
            <p>
                You can always manually set up the schedule in more detail and
                add Flex Block meetings on{' '}
                <Link to="/settings">the Settings page</Link>.
            </p>
        </div>
    );
}
