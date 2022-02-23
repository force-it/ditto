import React, {
    useRef,
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Map from "@/Components/Map";
import BarChart from "@/Components/BarChart";
import DonutChart from "@/Components/DonutChart";
import { borderWidth } from "tailwindcss/defaultTheme";
import { forEach } from "lodash";
import * as d3 from "d3";
import { useLoaded } from "@/context/loaded-context";
import counterUp from "counterup2";

export default function MapCard({ data, devices, userCount }) {
    const { loaded } = useLoaded();
    const dountRef = useRef(null);

    useEffect(() => {
        if (loaded) {
            Array.from(document.querySelectorAll(".countup")).forEach(
                (element) => {
                    counterUp(element, {
                        duration: 640,
                        delay: 32,
                    });
                }
            );
        }
        return () => {};
    }, [loaded]);

    return (
        <div className="absolute top-0 left-0 pt-[107px] px-8 z-10">
            <div className="px-6 pt-6 h-[402px] w-[306px] bg-white/90  rounded-lg border border-gray-300 backdrop-opacity-10">
                <div className="py-2">
                    <dt className="text-xs font-medium text-gray-500 truncate">
                        過去 30 分鐘的使用者
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 countup">
                        {loaded
                            ? new Intl.NumberFormat().format(userCount)
                            : "0"}
                    </dd>
                </div>
                <div className="py-2">
                    <dt className="text-xs font-medium text-gray-500 truncate">
                        每分鐘的使用者
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        <BarChart data={data} />
                    </dd>
                </div>
                <div className="py-2">
                    <dt className="text-xs font-medium text-gray-500 truncate">
                        過去 30 分鐘的使用者
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        <DonutChart data={devices} dountRef={dountRef} />
                    </dd>
                </div>
            </div>
        </div>
    );
}
