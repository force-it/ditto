import React, { useRef, useState, useEffect } from "react";
import Button from "@/Components/Button";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useFloating, offset } from "@floating-ui/react-dom";

const setClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

export default function CopyTextToClipboardWrapper({ className = "", text }) {
    const arrowRef = useRef(null);
    const { x, y, reference, floating, strategy } = useFloating({
        placement: "bottom",
        middleware: [offset(6)],
    });
    const [showTooltip, setShowTooltip] = React.useState(false);

    const copyToClipboard = () => {
        setClipboard(text);
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 1500);
    };

    return (
        <>
            <button
                ref={reference}
                onClick={copyToClipboard}
                className={
                    `inline-flex w-full items-center mt-5 p-4 bg-gray-800 text-gray-100 rounded-lg hover:underline ` +
                    className
                }
            >
                {text}
            </button>

            <div
                className={`${!showTooltip && "invisible"}`}
                ref={floating}
                style={{
                    position: strategy,
                    top: y ?? "",
                    left: x ?? "",
                }}
            >
                <div className="flex items-center p-2 rounded-md bg-gray-900 text-white">
                    <CheckCircleIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                    />
                    <span className="ml-3 text-sm">已複製到剪貼簿！</span>
                </div>
            </div>
        </>
    );
}
