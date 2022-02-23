import React from "react";
import { LoadedProvider } from "./loaded-context";
import { ScrollProvider } from "./scroll-context";

function AppProviders({ children }) {
    return (
        <ScrollProvider>
            <LoadedProvider>{children}</LoadedProvider>
        </ScrollProvider>
    );
}

export { AppProviders };
