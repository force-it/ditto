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
import counterUp from "counterup2";
import { borderWidth } from "tailwindcss/defaultTheme";
import { forEach } from "lodash";
import * as d3 from "d3";
import MapCard from "./MapCard";
import Header from "./Header";
import { useScroll } from "@/context/scroll-context";

const navigation = [
    // { name: '服務項目', href: 'service' },
    { name: "聯繫我們", href: "/contact" },
];

const data = Array.from({ length: 30 }, (_, i) => ({
    name: (i - 29) * -1,
    orders: getRandom(101),
}));

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

export default function Overview(props) {
    const { scroll } = useScroll();
    const userCount = useMemo(() => {
        return data.reduce((preValue, currentValue) => {
            return { orders: preValue.orders + currentValue.orders };
        }).orders;
    }, [data]);
    const devices = useMemo(() => {
        const mobile = Math.floor(Math.random() * userCount);
        const desktop = Math.floor(Math.random() * (userCount - mobile));
        const table = userCount - mobile - desktop;

        const mobilePercent = Math.round((mobile / userCount) * 1000) / 10;
        const desktopPercent = Math.round((desktop / userCount) * 1000) / 10;
        const tablePercent =
            Math.round((100 - mobilePercent - desktopPercent) * 10) / 10;

        return [
            {
                name: "mobile",
                count: mobile,
                percent: mobilePercent,
            },
            {
                name: "desktop",
                count: desktop,
                percent: desktopPercent,
            },
            {
                name: "table",
                count: table,
                percent: tablePercent,
            },
        ].sort(function (a, b) {
            return a.count - b.count;
        });
    }, [userCount]);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <div className="bg-[#cacdcf]">
                <Header isScroll={scroll.y > 0} />

                <MapCard data={data} devices={devices} userCount={userCount} />
                <Map className="w-full h-[529px]" />
            </div>
        </Authenticated>
    );
}
