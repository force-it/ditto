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
        if (sibling.nodeType === 1 && sibling !== e) {
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

            d3.selectAll(siblings).attr("fill", "#FFD98C");
        };
        const handleMouseOut = (event, d) => {
            let siblings = getSiblings(event.currentTarget);

            d3.selectAll(siblings).attr("fill", "orange");
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

        yAxisGroup.current = graph.current.append("g");

        const y = d3.scaleLinear().range([graphHeight, 0]);

        const x = d3
            .scaleBand()
            .range([0, graphWidth])
            .paddingInner(0.2)
            .paddingOuter(0.2);

        // create & call axes
        const xAxis = d3.axisBottom(x);
        const yAxis = d3
            .axisLeft(y)
            .ticks(3)
            .tickFormat((d) => d + " orders");

        const update = (data) => {
            const t = d3.transition().duration(500);

            // join the data to circs
            rects.current = graph.current
                .selectAll("rect")
                .data(data)
                .enter()
                .append("rect");

            // remove unwanted rects
            rects.current.exit().remove();

            const maximumY = d3.max(data, (d) => d.orders) || 1;

            // update the domains
            y.domain([-(maximumY * 0.02), maximumY]);
            x.domain(data.map((item) => item.name));

            // add attrs to rects already in the DOM
            rects.current
                .attr("width", x.bandwidth)
                .attr("height", (d) => 0)
                .attr("fill", "orange")
                .attr("x", (d) => x(d.name))
                .attr("y", (d) => graphHeight)
                .transition(t)
                .attr("height", (d) => graphHeight - y(d.orders))
                .attr("y", (d) => y(d.orders));

            xAxisGroup.current.call(xAxis);

            graph.current.selectAll("rect").on("mouseover", handleMouseOver);
            graph.current.selectAll("rect").on("mouseout", handleMouseOut);
        };

        update(data);
    });

    return <div ref={canvas} className={className}></div>;
};

export default BarChart;
