import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

const dims = { height: 125, width: 256, radius: 50 };
const cent = { x: dims.width / 2, y: dims.height / 2 - 5 };
const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.count);

const DonutChart = ({ className = "", data }) => {
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

        const handleMouseOver = (event, d) => {
            //
        };
        const handleMouseOut = (event, d) => {
            //
        };
        const handleMouseMove = (event, d) => {
            //
        };

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
            .innerRadius(dims.radius / 1.4);

        const colour = d3.scaleOrdinal(["orange", "#ffc26c", "#ffe0b5"]);

        const update = (data) => {
            const t = d3.transition().duration(500);

            colour.domain(data.map((d) => d.name));

            // join the data to paths
            paths.current = graph.current.selectAll("path").data(pie(data));
            paths.current
                .enter()
                .append("path")
                .attr("className", "arc")
                .attr("d", arcPath)
                .attr("fill", (d) => colour(d.data.name));

            // d3.select(tooltip.current)
            //     .append("div")
            //     .attr("className", "absolute invisible");

            // graph.current
            //     .selectAll("rect")
            //     .on("mouseover", handleMouseOver)
            //     .on("mouseout", handleMouseOut)
            //     .on("mousemove", handleMouseMove);
        };

        update(
            data.sort(function (a, b) {
                return b.count - a.count;
            })
        );
    });

    return (
        <div ref={canvas} className={className}>
            <div ref={tooltip} className="relative"></div>
        </div>
    );
};

export default DonutChart;
