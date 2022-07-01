import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/Components/Navbar";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useScroll } from "@/context/scroll-context";

const userNavigation = [
    { name: "退出「管理控制台」", href: route("dashboard") },
    { name: "登出", href: route("logout"), method: "post", as: "button" },
];

export default function Authenticated({ auth, header, children }) {
    const { ref } = useScroll();

    const [navigation, setNavigation] = useState([
        {
            name: "即時總覽",
            href: route("dashboard"),
            current: route().current("dashboard"),
        },
        {
            name: "數據匯報",
            href: route("reportinghub"),
            current: route().current("reportinghub"),
        },
        {
            name: "Webhook 接收器",
            href: route("webhooks"),
            current: route().current("webhooks"),
        },
    ]);

    return (
        <div className="bg-gray-100 flex flex-col h-full divide-y">
            <Navbar auth={auth} navigation={navigation} />

            {header && (
                <header>
                    <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8 text-sm">
                        {header}
                    </div>
                </header>
            )}
            <main
                ref={ref}
                className="relative h-full w-full overflow-hidden overflow-y-auto z-0"
            >
                {children}
            </main>
        </div>
    );
}
