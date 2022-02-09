import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ navigation }) {
    return (
        <div className="flex flex-col w-14 md:w-64">
            <div className="pt-5 flex flex-col flex-grow overflow-y-auto">
                <div className="flex-grow flex flex-col">
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        item.current
                                            ? "text-blue-500"
                                            : "text-gray-400 group-hover:text-gray-500",
                                        "mr-3 flex-shrink-0 h-6 w-6"
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="hidden md:inline-block">
                                    {item.name}
                                </span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
