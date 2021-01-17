import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { useMenuContext } from './SidebarMenu';

export function SidebarLink({
    linkedId,
    children,
}: {
    linkedId: string;
    children: any;
}) {
    const { activeElement, addElement, removeElement } = useMenuContext();

    React.useEffect(() => {
        const targetId = linkedId;
        if (targetId === undefined) return;

        const target = document.getElementById(targetId);
        if (target === null) return;

        addElement(target);

        return () => {
            removeElement(target);
        };
    }, [linkedId, addElement, removeElement]);

    return (
        <HashLink
            to={'#' + linkedId}
            children={children}
            smooth
            className={activeElement === linkedId ? 'is-active' : ''}
        />
    );
}
