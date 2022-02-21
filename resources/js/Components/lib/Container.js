import React from "react";
import {
    InformationCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/solid";

export function MobileFullWidth({ children }) {
    return (
        <div className="max-w-7xl mx-auto py-5 sm:px-6 lg:px-8">{children}</div>
    );
}

export function ConstrainedPaddedContent({ children }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    );
}
