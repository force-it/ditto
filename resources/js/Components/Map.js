import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as d3 from "d3";
import * as Papa from "papaparse";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hhb3llbnBvIiwiYSI6ImNrd241bDFoODJpbncyb3FiOWl2dWh5M2oifQ.xCwkQjChmmpM8g_f6U64pw";

function getRandom(x) {
    return Math.floor(Math.random() * x);
}

const Map = ({ className = "", handelLoaded = () => {} }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tooltip = useRef(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchWorldcities() {
            let response = await fetch("./worldcities.csv");
            response = await response.text();
            setData(Papa.parse(response).data);
        }
        fetchWorldcities();
    }, []);

    useEffect(() => {
        if (data.length <= 0) return;
        if (map.current) return;
        const _feature = Array.from({ length: 30 }, (_, i) => {
            let index;
            do {
                index = getRandom(data.length);
            } while (data[index][5] !== "CN");

            console.log(data[index][5]);

            return {
                type: "Feature",
                properties: {
                    name: data[index][1],
                    iconSize: [60, 60],
                },
                geometry: {
                    type: "Point",
                    coordinates: [data[index][3], data[index][2]],
                },
            };
        });

        const geojson = {
            type: "FeatureCollection",
            features: _feature,
        };

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
                    event.currentTarget.classList.add("z-10");

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
                                            排名第 n 的${feature.properties.name}
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
                    event.currentTarget.classList.remove("z-10");

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
    }, [data]);

    return (
        <div ref={mapContainer} className={className}>
            <div ref={tooltip}></div>
        </div>
    );
};

export default Map;
