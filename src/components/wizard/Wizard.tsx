import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { WizardBlock } from './WizardBlock';
import { WizardFinal } from './WizardFinal';
import { WizardHome } from './WizardHome';
import { WizardMain } from './WizardMain';

export function Wizard() {
    const appState = useAppState();

    React.useEffect(() => {
        if (!appState.value.hasViewedSettings) {
            appState.setAppStateDirect({ hasViewedSettings: true });
        }
    }, [appState]);

    const [pageNum, setPageNum] = React.useState(0);

    let pageContent;
    let buttons;

    if (pageNum === 0) {
        pageContent = (
            <React.Fragment>
                <WizardHome />
            </React.Fragment>
        );

        buttons = (
            <React.Fragment>
                <button
                    type="button"
                    className="button is-link is-rounded is-medium is-fullwidth"
                    onClick={() => {
                        setPageNum(1);
                    }}
                >
                    Get Started
                </button>
            </React.Fragment>
        );
    } else if (pageNum === 1) {
        pageContent = (
            <React.Fragment>
                <WizardMain />
            </React.Fragment>
        );

        buttons = (
            <React.Fragment>
                <div className="level">
                    <div className="level-item">
                        <button
                            type="button"
                            className="button is-dark is-rounded is-medium is-fullwidth"
                            onClick={() => {
                                setPageNum(0);
                            }}
                        >
                            Back
                        </button>
                    </div>
                    <div className="level-item">
                        <button
                            type="button"
                            className="button is-link is-rounded is-medium is-fullwidth"
                            onClick={() => {
                                setPageNum(2);
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    } else if (pageNum >= 2 && pageNum <= 9) {
        let blockType = 'a';

        switch (pageNum) {
            case 2:
                blockType = 'a';
                break;
            case 3:
                blockType = 'b';
                break;
            case 4:
                blockType = 'c';
                break;
            case 5:
                blockType = 'd';
                break;
            case 6:
                blockType = 'e';
                break;
            case 7:
                blockType = 'f';
                break;
            case 8:
                blockType = 'g';
                break;
            case 9:
                blockType = 'community';
                break;
        }

        pageContent = (
            <React.Fragment>
                <WizardBlock key={blockType} blockType={blockType} />
            </React.Fragment>
        );

        buttons = (
            <React.Fragment>
                <div className="level">
                    <div className="level-item">
                        <button
                            type="button"
                            className="button is-dark is-rounded is-medium is-fullwidth"
                            onClick={() => {
                                setPageNum((state) => state - 1);
                            }}
                        >
                            Back
                        </button>
                    </div>
                    <div className="level-item">
                        <button
                            type="button"
                            className="button is-link is-rounded is-medium is-fullwidth"
                            onClick={() => {
                                setPageNum((state) => state + 1);
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    } else {
        pageContent = (
            <React.Fragment>
                <WizardFinal />
            </React.Fragment>
        );
    }

    return (
        <div className="container my-6">
            <div className="content mx-3 is-size-5">
                {pageContent}
                <br />
                <div className="level">
                    <div className="level-left">{buttons}</div>
                    <div className="level-right">
                        <Link
                            className="button is-dark is-rounded is-medium is-fullwidth"
                            to="/"
                        >
                            Exit Wizard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
