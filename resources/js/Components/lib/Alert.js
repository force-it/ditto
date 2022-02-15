import React from "react";
import {
    InformationCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/solid";

export function Alert({ children }) {
    return (
        <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon
                        className="h-5 w-5 text-blue-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm ">{children}</p>
                </div>
            </div>
        </div>
    );
}

export function SuccessAlert({ children }) {
    return (
        <div className="rounded-md bg-emerald-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon
                        className="h-5 w-5 text-emerald-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm ">{children}</p>
                </div>
            </div>
        </div>
    );
}

export function ErrorAlert({ children }) {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm ">{children}</p>
                </div>
            </div>
        </div>
    );
}
