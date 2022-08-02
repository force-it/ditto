import React, { useState, forwardRef } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { MobileFullWidth } from "@/Components/lib/Container";
import Button, { ModalButton } from "@/Components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchIcon } from "@heroicons/react/solid";
import { CheckIcon, ThumbUpIcon, UserIcon } from "@heroicons/react/solid";

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

export default function Reportinghub(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <ModalButton onClick={onClick} ref={ref}>
            2022年4月22日 至 5月12日
        </ModalButton>
        // <button className="example-custom-input" >
        //     {value}
        // </button>
    ));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setOpen(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Reportinghub" />
            <MobileFullWidth>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div className="flex items-center py-3 md:max-w-2xl md:mx-auto lg:mx-0 xl:px-0">
                        <div className="w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        id="search"
                                        name="search"
                                        className="peer block w-full bg-white border-none rounded-md py-2 pl-10 pr-3 placeholder-gray-500 text-black"
                                        placeholder="搜尋使用者"
                                        type="search"
                                    />
                                    <div className="text-gray-400 pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <SearchIcon
                                            className="h-5 w-5 "
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* <div>
                    <DatePicker
                        selected={startDate}
                        showPreviousMonths
                        // onChange={(date) => setStartDate(date)}
                        customInput={<ExampleCustomInput />}
                        monthsShown={2}
                    />
                </div> */}

                {loading && (
                    <div className="h-72 flex items-center justify-center">
                        <div className="windows8">
                            <div className="wBall" id="wBall_1">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_2">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_3">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_4">
                                <div className="wInnerBall"></div>
                            </div>
                            <div className="wBall" id="wBall_5">
                                <div className="wInnerBall"></div>
                            </div>
                        </div>
                    </div>
                )}

                {open && (
                    <>
                        <Stat />

                        <Feed />
                    </>
                )}
            </MobileFullWidth>
        </Authenticated>
    );
}

function Stat() {
    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                    >
                        <dt className="text-lg font-medium text-gray-900 truncate">
                            {item.name}
                        </dt>
                        <dd className="mt-4 text-lg font-semibold text-gray-900">
                            {item.stat}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

const stats = [
    { name: "使用者名稱", stat: "mxceshi4" },
    { name: "OnePlus7Pro", stat: "辽宁省沈阳市" },
    { name: "地區", stat: "中國" },
    { name: "應用程式版本", stat: "2.65" },
    { name: "近期登入網址", stat: "https://mx2quit" },
    { name: "IP", stat: "223.167.194.93" },
    { name: "群組", stat: "高端区-老客优质VIP1星" },
    { name: "餘額", stat: "743.15" },
    { name: "最後上線時間", stat: "2020-04-23 02:59:14" },
];

function Feed() {
    return (
        <div className="mt-5 px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {timeline.map((event, eventIdx) => (
                        <li key={event.id}>
                            <div className="relative pb-8">
                                {eventIdx !== timeline.length - 1 ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span
                                            className={classNames(
                                                event.iconBackground,
                                                "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                            )}
                                        >
                                            <event.icon
                                                className="h-5 w-5 text-white"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {event.content}{" "}
                                                <a
                                                    href={event.href}
                                                    className="font-medium text-gray-900"
                                                >
                                                    {event.target}
                                                </a>
                                            </p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                            <time dateTime={event.datetime}>
                                                {event.datetime}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const timeline = [
    {
        id: 1,
        content: "首次登入",
        target: "https://mx2quit",
        href: "#",
        date: "Sep 20",
        datetime: "2020-09-20 02:59:14",
        icon: UserIcon,
        iconBackground: "bg-gray-400",
    },
    {
        id: 2,
        content: "開啟",
        target: "AG - 真人",
        href: "#",
        date: "Sep 22",
        datetime: "2020-09-22 02:59:14",
        icon: ThumbUpIcon,
        iconBackground: "bg-blue-500",
    },
    {
        id: 3,
        content: "儲值成功",
        target: "銀行轉帳",
        href: "#",
        date: "Sep 28",
        datetime: "2020-09-28 02:59:14",
        icon: CheckIcon,
        iconBackground: "bg-green-500",
    },
    {
        id: 4,
        content: "開啟",
        target: "VR彩票 - ManBetX万博时时彩",
        href: "#",
        date: "Sep 30",
        datetime: "2020-09-30 02:59:14",
        icon: ThumbUpIcon,
        iconBackground: "bg-blue-500",
    },
    {
        id: 5,
        content: "儲值成功",
        target: "銀行轉帳",
        href: "#",
        date: "Oct 4",
        datetime: "2020-10-04 02:59:14",
        icon: CheckIcon,
        iconBackground: "bg-green-500",
    },
].reverse();

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
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
