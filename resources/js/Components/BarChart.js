import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

const margin = { top: 0, right: 0, bottom: 0, left: 0 };
const graphWidth = 256 - margin.left - margin.right;
const graphHeight = 44 - margin.top - margin.bottom;
const data = Array.from({ length: 30 }, (_, i) => ({
    name: i,
    orders: getRandom(30),
}));

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

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

const BarChart = ({ className = "" }) => {
    const canvas = useRef(null);
    const svg = useRef(null);
    const graph = useRef(null);
    const xAxisGroup = useRef(null);
    const yAxisGroup = useRef(null);
    const rects = useRef(null);

    useEffect(() => {
        if (svg.current) return;

        const handleMouseOver = (event, d) => {
            let siblings = getSiblings(event.currentTarget);
            d3.selectAll(siblings).attr("fill-opacity", "0.4 ");
        };
        const handleMouseOut = (event, d) => {
            let siblings = getSiblings(event.currentTarget);
            d3.selectAll(siblings).attr("fill-opacity", "0");
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
            // add attrs to rects already in the DOM
            // rects.current
            //     .attr("width", x.bandwidth)
            //     .attr("fill", "orange")
            //     .attr("x", (d) => x(d.name))
            //     .transition(t)
            //     .attr("height", (d) => graphHeight - y(d.orders))
            //     .attr("y", (d) => y(d.orders));

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
                .attr("y", 1);

            // .append("rect")
            // .attr("width", x.bandwidth)
            // .attr("height", (d) => graphHeight - y(d.orders))
            // .attr("fill", "orange")
            // .attr("x", (d) => x(d.name))
            // .attr("y", (d) => graphHeight);

            xAxisGroup.current.call(xAxis);

            graph.current
                .selectAll("rect")
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut);

            // <rect class="highlight-rect" transform="translate(7.5, 1)" height="42" width="8" rx="10" ry="10" stroke="black" fill="#808080" fill-opacity="0.3" stroke-width="2" shape-rendering="auto" visibility="hidden"></rect>

            // <rect class="highlight-rect" transform="translate(79.5, 1)" height="42" width="8" rx="10" ry="10" stroke="black" fill="#808080" fill-opacity="0.3" stroke-width="2" shape-rendering="auto" visibility="hidden"></rect>
        };

        update(data);
    });

    return <div ref={canvas} className={className}></div>;
};

export default BarChart;
