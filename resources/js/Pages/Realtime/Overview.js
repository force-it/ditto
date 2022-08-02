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
import OverviewHeader from "./OverviewHeader";
import { useScroll } from "@/context/scroll-context";
import ReportCard from "./ReportCard";

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

export default function Overview(props) {
    const { scroll } = useScroll();
    const [activeUsers, setActiveUsers] = useState(ACTIVE_USERS);

    // useEffect(() => {
    //     let id = setInterval(() => {
    //         setActiveUsers((activeUsers) => {
    //             const clearActiveUsers = activeUsers.slice(1);
    //             clearActiveUsers.push({
    //                 name: Math.floor(Date.now() / 1000),
    //                 orders: getRandom(101),
    //             });
    //             return clearActiveUsers;
    //         });
    //     }, 1000);
    //     return () => {
    //         clearInterval(id);
    //     };
    // }, []);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <OverviewHeader isScroll={scroll.y > 0} />

            <Map className="w-full h-[529px]" />

            <MapCard
                userLogins={activeUsers}
                deviceCategories={DEVICE_CATEGORIES}
                total={TOTAL}
            />

            <div className="flex flex-wrap gap-5 px-8 pb-8">
                {DATASETS.map((dataset, index) => (
                    <ReportCard key={index} {...dataset} />
                ))}
            </div>
        </Authenticated>
    );
}

const DATASETS = [
    {
        metric: "地區",
        dimension: "使用者",
        rows: [
            {
                metricValue: "Shanghai",
                dimensionValue: 10,
            },
            {
                metricValue: "Tianjin",
                dimensionValue: 3,
            },
            {
                metricValue: "Shandong",
                dimensionValue: 1,
            },
            {
                metricValue: "Jilin",
                dimensionValue: 1,
            },
            {
                metricValue: "Xinjiang",
                dimensionValue: 1,
            },
            {
                metricValue: "Tibet",
                dimensionValue: 1,
            },
        ],
        total: 17,
    },
    {
        metric: "登入的網域",
        dimension: "使用者",
        rows: [
            {
                metricValue: "h5.og856.com",
                dimensionValue: 10,
            },
            {
                metricValue: "h5.og123.com",
                dimensionValue: 5,
            },
            {
                metricValue: "h5.og456.com",
                dimensionValue: 1,
            },
            {
                metricValue: "h5.og789.com",
                dimensionValue: 1,
            },
        ],
        total: 20,
    },
    {
        metric: "裝置類型",
        dimension: "使用者",
        rows: [
            {
                metricValue: "Mobile",
                dimensionValue: 10,
            },
            {
                metricValue: "Desktop",
                dimensionValue: 7,
            },
        ],
        total: 17,
    },
    {
        metric: "客戶端類型",
        dimension: "使用者",
        rows: [
            {
                metricValue: "PC",
                dimensionValue: 7,
            },
            {
                metricValue: "H5",
                dimensionValue: 4,
            },
            {
                metricValue: "Android",
                dimensionValue: 3,
            },
            {
                metricValue: "iOS",
                dimensionValue: 3,
            },
        ],
        total: 17,
    },
    {
        metric: "遊戲渠道",
        dimension: "使用者",
        rows: [
            {
                metricValue: "AG",
                dimensionValue: 5,
            },
            {
                metricValue: "CQ9系列",
                dimensionValue: 3,
            },
            {
                metricValue: "VR彩票",
                dimensionValue: 1,
            },
        ],
        total: 9,
    },
    {
        metric: "遊戲",
        dimension: "使用者",
        rows: [
            {
                metricValue: "AG - 真人",
                dimensionValue: 5,
            },
            {
                metricValue: "CQ9系列 - ",
                dimensionValue: 3,
            },
            {
                metricValue: "VR彩票 - ManBetX万博时时彩",
                dimensionValue: 1,
            },
        ],
        total: 9,
    },
];

const ACTIVE_USERS = Array.from({ length: 30 }, (_, i) => ({
    name: Math.floor(Date.now() / 1000) - i,
    orders: getRandom(101),
})).reverse();

const REALTIME = Array.from({ length: 30 }, (_, i) => ({
    dimensionCompoundValues: (i - 29) * -1,
    metricCompoundValues: getRandom(101),
}));

const DEVICE_CATEGORIES = [
    {
        name: "mobile",
        count: 10,
    },
    {
        name: "desktop",
        count: 5,
    },
];

const TOTAL = DEVICE_CATEGORIES.reduce(
    (sum, current) => sum + current.count,
    0
);
