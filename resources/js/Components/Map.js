import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as d3 from "d3";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hhb3llbnBvIiwiYSI6ImNrd241bDFoODJpbncyb3FiOWl2dWh5M2oifQ.xCwkQjChmmpM8g_f6U64pw";

const geojson = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                message: "Foo",
                iconSize: [60, 60],
            },
            geometry: {
                type: "Point",
                coordinates: [123.324462, 23.024695],
            },
        },
        {
            type: "Feature",
            properties: {
                message: "Bar",
                iconSize: [50, 50],
            },
            geometry: {
                type: "Point",
                coordinates: [123.21582, 25.971891],
            },
        },
        {
            type: "Feature",
            properties: {
                message: "Baz",
                iconSize: [40, 40],
            },
            geometry: {
                type: "Point",
                coordinates: [123.292236, 24.281518],
            },
        },
    ],
};

const Map = ({ className = "", handelLoaded = () => {} }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tooltip = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-zh-v1",
            center: [105, 38],
            // minZoom: 1,
            // maxZoom: 4,
            zoom: 3,
            scrollZoom: false,
            dragRotate: false,
            dragPan: false,
            keyboard: false,
            doubleClickZoom: false,
            touchZoomRotate: false,
        });

        map.current.on("load", () => {
            handelLoaded();

            for (const feature of geojson.features) {
                // Add a new Marker.
                // Add markers to the map.
                // Create a DOM element for each marker.
                const el = document.createElement("div");
                el.className = "anim-circle";

                const marker = new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(map.current)
                    .getElement();

                marker.addEventListener("mouseover", (event) => {
                    d3.select(tooltip.current.firstChild)
                        .attr(
                            "class",
                            "fixed px-5 py-5 bg-white rounded-md drop-shadow z-10"
                        )
                        .html(
                            `
                                <p class='text-gray-500 text-xs font-normal'>
                                    過去 30 分鐘內
                                </p>
                                <div class="mt-2">
                                    <p class='text-gray-500 text-xs font-medium'>
                                        使用者
                                    </p>
                                    <div class="flex mt-2">
                                        <span class='text-xs font-normal'>
                                            排名第 1 的台北
                                        </span>
                                        <span class='ml-10 text-xs font-black'>
                                            1
                                        </span>
                                    </div>
                                </div>
                            `
                        );
                });

                marker.addEventListener("mousemove", (event) => {
                    d3.select(tooltip.current.firstChild)
                        .style("left", event.clientX + 0 + "px")
                        .style("top", event.clientY + 30 + "px");
                });

                marker.addEventListener("mouseout", (event) => {
                    d3.select(tooltip.current.firstChild).attr(
                        "class",
                        "fixed invisible"
                    );
                });
            }
        });

        d3.select(tooltip.current)
            .append("div")
            .attr("class", "fixed invisible");
    });

    return (
        <div ref={mapContainer} className={className}>
            <div ref={tooltip}></div>
        </div>
    );
};

export default Map;
