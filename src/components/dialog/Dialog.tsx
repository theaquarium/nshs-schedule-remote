import React from 'react';

interface DialogStateType {
    isOpen: boolean;
    children?: JSX.Element;
}

interface DialogContextType {
    state: DialogStateType;
    open: (children: JSX.Element) => void;
    close: () => void;
}

const defaultState: DialogContextType = {
    state: {
        isOpen: false,
    },
    open: (children: JSX.Element) => {},
    close: () => {},
};

const DialogContext = React.createContext<DialogContextType>(defaultState);

export function Dialog(props: any) {
    const [state, setState] = React.useState<DialogStateType>(
        defaultState.state,
    );

    // Memoized just in case
    const open = React.useMemo(() => {
        return (children: JSX.Element) => {
            setState({
                isOpen: true,
                children: children,
            });
        };
    }, [setState]);

    const close = React.useMemo(() => {
        return () => {
            setState({
                isOpen: false,
            });
        };
    }, [setState]);

    const contextValue = {
        state,
        open,
        close,
    };

    React.useEffect(() => {
        if (state.isOpen) {
            document.documentElement.classList.add('is-clipped');
        } else {
            document.documentElement.classList.remove('is-clipped');
        }
    });

    React.useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        };
    });

    return (
        <DialogContext.Provider {...props} value={contextValue}>
            {props.children}
            <div className={`modal ${state.isOpen ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={close}></div>
                {state.children}
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={close}
                ></button>
            </div>
        </DialogContext.Provider>
    );
}

export function useDialog() {
    return React.useContext(DialogContext);
}
