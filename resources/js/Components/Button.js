import React from "react";

export default function Button({
    type = "submit",
    className = "",
    processing,
    children,
}) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}

export function ModalButton({
    type = "submit",
    className = "",
    processing,
    onClick,
    children,
}) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 text-emerald-600 border border-transparent rounded-md font-bold text-sm uppercase tracking-widest hover:bg-emerald-100 transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function ConfirmButton({
    type = "submit",
    className = "",
    processing,
    onClick,
    children,
}) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-sm text-white uppercase active:bg-emerald-600 tracking-widest transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
