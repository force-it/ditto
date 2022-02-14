import React from "react";

export default function Label({ forInput, value, className, children }) {
    return (
        <label
            htmlFor={forInput}
            className={`block font-bold text-sm text-gray-700 ` + className}
        >
            {value ? value : { children }}
        </label>
    );
}
