import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ navigation }) {
    return (
        <div className="flex w-14 md:w-64 flex-col fixed bottom-0 top-[70px]">
            <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
                <div className="flex-grow flex flex-col">
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                                )}
                            >
                                <item.icon
                                    className={classNames(
                                        item.current
                                            ? "text-gray-500"
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
