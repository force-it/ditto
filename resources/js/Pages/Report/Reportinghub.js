import React, { useState, forwardRef } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import { MobileFullWidth } from "@/Components/lib/Container";
import Button, { ModalButton } from "@/Components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

export default function Reportinghub(props) {
    const [startDate, setStartDate] = useState(new Date());

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <ModalButton onClick={onClick} ref={ref}>
            2022年4月22日 至 5月19日
        </ModalButton>
        // <button className="example-custom-input" >
        //     {value}
        // </button>
    ));

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Reportinghub" />
            <MobileFullWidth>
                <div>
                    <DatePicker
                        selected={startDate}
                        showPreviousMonths
                        // onChange={(date) => setStartDate(date)}
                        customInput={<ExampleCustomInput />}
                        monthsShown={2}
                    />
                </div>
            </MobileFullWidth>
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
