import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import BarChart from "@/Components/BarChart";

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

export default function ReportCard(props) {
    return (
        <div className="flex-1 px-6 py-6 h-[402px] min-w-[300px] max-w-[400px] bg-white/90 rounded-lg border border-gray-300 backdrop-opacity-10">
            <Table {...props} />
        </div>
    );
}

function Table(props) {
    if (props.rows.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col h-full tracking-tight">
            <div className="py-2">
                <div className="text-sm text-gray-900">{`${props.dimension} 劃分依據：${props.metric}`}</div>
            </div>

            <div className="flex">
                <p className="font-semibold self-start pr-2">#1</p>
                <div className="flex-1 flex flex-col">
                    <div>{props.rows[0].metricValue}</div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="block flex-1 w-10"></div>
                            <p className="text-lg font-semibold text-gray-900">
                                {props.rows[0].dimensionValue}
                            </p>
                            <p className="text-gray-600 text-xs">
                                {Math.round(
                                    (props.rows[0].dimensionValue /
                                        props.total) *
                                        1000
                                ) / 10}
                                %
                            </p>
                        </div>
                        <div className="w-44">
                            <BarChart data={DATA()}></BarChart>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <div className="flex text-xs font-medium text-gray-500 py-1.5">
                    <span>{props.metric}</span>
                    <span className="ml-auto">{props.dimension}</span>
                </div>

                <div className="bg-gray-300 h-px" />

                {props.rows.map((row, index) => (
                    <Row key={index} total={props.total} {...row} />
                ))}
            </div>
            <div className="mt-auto">
                <div className="flex justify-end">
                    <div className="text-sm">
                        1-{props.rows.length}/{props.rows.length}
                    </div>
                    <div className="flex-shrink-0 ml-2">
                        <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-shrink-0 ml-2 cursor-pointer">
                        <ChevronRightIcon className="h-5 w-5 text-gray-900" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Row(props) {
    return (
        <>
            <div className="tracking-normal flex text-xs font-semibold text-gray-900 py-1.5">
                <span>{props.metricValue}</span>
                <span className="ml-auto">{props.dimensionValue}</span>
            </div>

            <div>
                <div className="w-full bg-gray-200 h-px"></div>
                <div
                    className="bg-emerald-500 h-0.5 -mt-0.5"
                    style={{
                        width: `${(props.dimensionValue / props.total) * 100}%`,
                    }}
                ></div>
            </div>
        </>
    );
}

const DATA = () =>
    Array.from({ length: 30 }, (_, i) => ({
        name: (i - 29) * -1,
        orders: getRandom(5),
    }));
