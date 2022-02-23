import React, { useContext, useMemo, useRef } from "react";
import { useScroll as useScrollBase } from "react-use";

const ScrollContext = React.createContext();
ScrollContext.displayName = "ScrollContext";

function ScrollProvider(props) {
    const ref = useRef(null);
    const scroll = useScrollBase(ref);

    const value = useMemo(
        () => ({
            ref: ref,
            scroll: scroll,
        }),
        [scroll]
    );

    return <ScrollContext.Provider value={value} {...props} />;
}

function useScroll(elementRef) {
    const context = useContext(ScrollContext);
    if (context === undefined) {
        throw new Error(`useScroll must be used within a ScrollProvider`);
    }
    return context;
}

export { ScrollProvider, useScroll };
