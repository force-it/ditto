import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

const dims = { height: 125, width: 256, radius: 50 };
const cent = { x: dims.width / 2, y: dims.height / 2 };
const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.count);

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

const DonutChart = ({ className = "", data, dountRef: graph }) => {
    const canvas = useRef(null);
    const svg = useRef(null);
    // const graph = dountRef;
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

        const colour = d3.scaleOrdinal(["#b27300", "#FFA500", "#ffc04c"]);

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

        update(
            data.sort(function (a, b) {
                return b.count - a.count;
            })
        );
    }, []);

    return (
        <div ref={canvas} className={className}>
            <div ref={tooltip} className="relative"></div>
        </div>
    );
};

export default DonutChart;
