require("./bootstrap");

import React from "react";
import { render } from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { AppProviders } from "./context";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(
            <AppProviders>
                <App {...props} />
            </AppProviders>,
            el
        );
    },
});

InertiaProgress.init({ color: "#4B5563" });
