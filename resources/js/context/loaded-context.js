import React, { useContext, useMemo, useCallback, useState } from "react";

const LoadedContext = React.createContext();
LoadedContext.displayName = "LoadedContext";

function LoadedProvider(props) {
    const [loaded, setLoaded] = useState(false);

    const setLoadedCallback = useCallback(() => {
        setLoaded(true);
    }, []);

    const value = useMemo(
        () => ({
            loaded: loaded,
            setLoaded: setLoadedCallback,
        }),
        [loaded, setLoadedCallback]
    );

    return <LoadedContext.Provider value={value} {...props} />;
}

function useLoaded() {
    const context = useContext(LoadedContext);
    if (context === undefined) {
        throw new Error(`useLoaded must be used within a LoadedProvider`);
    }
    return context;
}

export { LoadedProvider, useLoaded };
