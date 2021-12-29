import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hhb3llbnBvIiwiYSI6ImNrd241bDFoODJpbncyb3FiOWl2dWh5M2oifQ.xCwkQjChmmpM8g_f6U64pw";

const Map = ({ className = "" }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-zh-v1",
            center: [105, 38],
            minZoom: 1,
            maxZoom: 4,
            zoom: 3,
            scrollZoom: false,
            dragRotate: false,
            dragPan: false,
            keyboard: false,
            doubleClickZoom: false,
            touchZoomRotate: false,
        });

        map.current.addControl(new mapboxgl.FullscreenControl());
    });

    // useEffect(() => {
    //     if (!map.current) return; // wait for map to initialize
    //     map.current.on("load", () => {
    //         map.current.addSource("china", {
    //             type: "geojson",
    //             data: "https://raw.githubusercontent.com/longwosion/geojson-map-china/master/china.json",
    //         });

    //         map.current.addLayer({
    //             id: "route",
    //             type: "line",
    //             source: "china",
    //             layout: {
    //                 "line-join": "round",
    //                 "line-cap": "round",
    //             },
    //             paint: {
    //                 "line-color": "blue",
    //                 "line-width": 2,
    //             },
    //         });
    //     });
    // });

    return (
        <div ref={mapContainer} className={className}>
            {" "}
        </div>
    );
};

export default Map;
