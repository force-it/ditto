import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const graphWidth = 256 - margin.left - margin.right;
const graphHeight = 44 - margin.top - margin.bottom;

function getSiblings(e) {
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
            sibling.getAttribute("className") === "highlight-rect"
        ) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
}

const BarChart = ({ className = "", data }) => {
    const canvas = useRef(null);
    const svg = useRef(null);
    const graph = useRef(null);
    const xAxisGroup = useRef(null);
    const yAxisGroup = useRef(null);
    const rects = useRef(null);
    const tooltip = useRef(null);

    useEffect(() => {
        if (svg.current) return;

        const handleMouseOver = (event, d) => {
            // document.documentElement.requestFullscreen();
            let siblings = getSiblings(event.currentTarget);
            d3.selectAll(siblings).attr("fill-opacity", "0.5 ");

            d3.select(tooltip.current.firstChild).attr(
                "class",
                "absolute px-5 py-5 w-32 bg-white rounded-md drop-shadow"
            );
        };
        const handleMouseOut = (event, d) => {
            let siblings = getSiblings(event.currentTarget);
            d3.selectAll(siblings).attr("fill-opacity", "0");

            d3.select(tooltip.current.firstChild).attr(
                "class",
                "absolute invisible"
            );
        };
        const handleMouseMove = (event, d) => {
            d3.select(tooltip.current.firstChild)
                .html(
                    `
                    <p class='text-gray-500 text-xs font-normal'>
                        ${d.name} 分鐘前
                    </p>
                    <div class="flex mt-3">
                        <span class='text-xs font-normal'>
                            使用者
                        </span>
                        <span class='ml-auto text-xs font-black'>
                            ${d.orders}
                        </span>
                    </div>
                `
                )
                .style("left", d3.pointer(event)[0] + 10 + "px")
                .style("top", d3.pointer(event)[1] - 15 + "px");
        };

        svg.current = d3
            .select(canvas.current)
            .append("svg")
            .attr("width", 256)
            .attr("height", 44);

        graph.current = svg.current
            .append("g")
            .attr("width", graphWidth)
            .attr("height", graphHeight);

        // create axes groups
        xAxisGroup.current = graph.current
            .append("g")
            .attr("transform", `translate(0, ${graphHeight})`);

        xAxisGroup.current
            .selectAll("text")
            .attr("fill", "orange")
            .attr("transform", "rotate(-40)")
            .attr("text-anchor", "end");

        const y = d3.scaleLinear().range([graphHeight, 0]);

        const x = d3
            .scaleBand()
            .range([0, graphWidth])
            .paddingInner(0.2)
            .paddingOuter(0.2);
        const highlightX = d3
            .scaleBand()
            .range([0, graphWidth])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        // create & call axes
        const xAxis = d3.axisBottom(x);

        const update = (data) => {
            const t = d3.transition().duration(500);

            // join the data to circs
            rects.current = graph.current.selectAll("rect").data(data);

            // remove unwanted rects
            rects.current.exit().remove();

            const maximumY = d3.max(data, (d) => d.orders) || 1;
            const deviation = -(maximumY * 0.02);

            // update the domains
            y.domain([deviation, maximumY]);
            x.domain(data.map((item) => item.name));
            highlightX.domain(data.map((item) => item.name));

            // append the enter selection to the DOM
            rects.current
                .enter()
                .append("rect")
                .attr("width", x.bandwidth)
                .attr("height", graphHeight)
                .attr("fill", "orange")
                .attr("x", (d) => x(d.name))
                .attr("y", 0)
                .transition(t)
                .attr("height", (d) => graphHeight - y(d.orders))
                .attr("y", (d) => y(d.orders));

            rects.current
                .enter()
                .append("rect")
                .attr("className", "highlight-rect")
                .attr("width", highlightX.bandwidth)
                .attr("height", graphHeight)
                .attr("fill", "#fff")
                .attr("fill-opacity", 0)
                .attr("x", (d) => highlightX(d.name))
                .attr("y", 0);

            xAxisGroup.current.call(xAxis);

            d3.select(tooltip.current)
                .append("div")
                .attr("className", "absolute invisible");

            graph.current
                .selectAll("rect")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .on("mousemove", handleMouseMove);
        };

        update(data);
    });

    return (
        <div ref={canvas} className={className}>
            <div ref={tooltip} className="relative"></div>
        </div>
    );
};

export default BarChart;
