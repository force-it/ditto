import React, {
    useRef,
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header({ isScroll = false }) {
    return (
        <header className="fixed left-0 right-0 z-20">
            <div
                className={classNames(
                    isScroll && "bg-white border-b",
                    "mx-auto p-4 sm:px-6 lg:px-8"
                )}
            >
                <h1 className="text-2xl">即時總覽</h1>
            </div>
        </header>
    );
}
