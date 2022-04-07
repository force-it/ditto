import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

const dims = { height: 125, width: 256, radius: 50 };
const cent = { x: dims.width / 2, y: dims.height / 2 };
const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.count);

const colors = ["#059669", "#10b981", "#34d399"];

function getSiblings(e, d) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (
            sibling.nodeType === 1 &&
            sibling !== e &&
            sibling.getAttribute("className") === "outside-arc-" + d.data.name
        ) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
}

const handleMouseOver = (event, d) => {
    let siblings = getSiblings(event.currentTarget, d);
    d3.selectAll(siblings).attr("fill-opacity", "0.4");
};
const handleMouseOut = (event, d) => {
    let siblings = getSiblings(event.currentTarget, d);
    d3.selectAll(siblings).attr("fill-opacity", "0");
};
const handleMouseMove = (event, d) => {
    console.log(3);
};

function add(accumulator, current) {
    return accumulator + current.count;
}

const DonutChart = ({ className = "", deviceCategories = [], total = 0 }) => {
    const canvas = useRef(null);
    const svg = useRef(null);
    const graph = useRef(null);
    const xAxisGroup = useRef(null);
    const yAxisGroup = useRef(null);
    const rects = useRef(null);
    const paths = useRef(null);
    const tooltip = useRef(null);

    useEffect(() => {
        if (svg.current) return;

        svg.current = d3
            .select(canvas.current)
            .append("svg")
            .attr("width", 256)
            .attr("height", 125);

        graph.current = svg.current
            .append("g")
            .attr("transform", "translate(" + cent.x + "," + cent.y + ")");

        const arcPath = d3
            .arc()
            .outerRadius(dims.radius)
            .innerRadius(dims.radius / 1.35);

        const outsideArcPath = d3
            .arc()
            .outerRadius(dims.radius + 10)
            .innerRadius((dims.radius + 10) / 1.35);

        const colour = d3.scaleOrdinal(colors);

        const update = (data) => {
            const t = d3.transition().duration(500);

            colour.domain(data.map((d) => d.name));

            // join the data to paths
            paths.current = graph.current.selectAll("path").data(pie(data));

            paths.current
                .enter()
                .append("path")
                .attr("className", (d) => "outside-arc-" + d.data.name)
                .attr("d", outsideArcPath)
                .attr("fill", (d) => colour(d.data.name))
                .attr("fill-opacity", "0");

            paths.current
                .enter()
                .append("path")
                .attr("className", "arc")
                .attr("d", arcPath)
                .attr("fill", (d) => colour(d.data.name));

            graph.current
                .selectAll("path")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);
            // .on("mousemove", handleMouseMove);

            // d3.select(tooltip.current)
            //     .append("div")
            //     .attr("className", "absolute invisible");

            // graph.current
            //     .selectAll("path")
            //     .on("mouseover", handleMouseOver)
            //     .on("mouseout", handleMouseOut);
            // .on("mousemove", handleMouseMove);
        };

        update(deviceCategories);
    }, []);

    return (
        <>
            <div ref={canvas} className={className}>
                <div ref={tooltip} className="relative"></div>
            </div>
            <div className="flex justify-around">
                {deviceCategories.map((deviceCategory, i) => (
                    <div
                        key={deviceCategory.name}
                        className="w-1/3 h-[54px] cursor-default"
                        onMouseEnter={() => {
                            graph.current
                                .select(
                                    "[className=" +
                                        "outside-arc-" +
                                        deviceCategory.name +
                                        "]"
                                )
                                .attr("fill-opacity", "0.4");
                        }}
                        onMouseLeave={() => {
                            graph.current
                                .select(
                                    "[className=" +
                                        "outside-arc-" +
                                        deviceCategory.name +
                                        "]"
                                )
                                .attr("fill-opacity", "0");
                        }}
                    >
                        <div className="flex pb-1 pt-2 px-2 rounded-md hover:bg-gray-100">
                            <div
                                className="h-[6px] w-[6px] rounded-full text-center align-middle"
                                style={{
                                    backgroundColor: colors[i],
                                    lineHight: "6px",
                                    margin: "5px 5px 0 0",
                                }}
                            ></div>

                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">
                                    {deviceCategory.name.toUpperCase()}
                                </span>
                                <span className="text-lg">
                                    {Math.round(
                                        (deviceCategory.count / total) * 1000
                                    ) / 10}
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DonutChart;
