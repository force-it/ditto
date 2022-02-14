import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function StateBadge({ active }) {
    return (
        <span
            className={classNames(
                !active ? "bg-emerald-400" : "bg-red-400",
                "inline-flex items-baseline px-2.5 py-1 rounded-full text-sm  bg-opacity-10 md:mt-2 lg:mt-0"
            )}
        >
            <span className="relative flex mr-1.5 w-2.5 h-2.5">
                <span
                    className={classNames(
                        !active ? "bg-emerald-400" : "bg-red-400",
                        "relative inline-flex w-2.5 h-2.5 rounded-full"
                    )}
                ></span>
            </span>
            <span>{!active ? "工作中" : "故障"}</span>
        </span>
    );
}
