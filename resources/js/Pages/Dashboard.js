import React, { useRef, useCallback, useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Map from "@/Components/Map";
import BarChart from "@/Components/BarChart";
import counterUp from "counterup2";

const navigation = [
    // { name: '服務項目', href: 'service' },
    { name: "聯繫我們", href: "/contact" },
];

export default function Dashboard(props) {
    const [loaded, setLoaded] = useState(false);
    const onLoaded = useCallback(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            Array.from(document.querySelectorAll(".countup")).forEach(
                (element) => {
                    counterUp(element, {
                        duration: 640,
                        delay: 32,
                    });
                }
            );
        }
    }, [loaded]);
    // useEffect(() => {
    //   return;
    //   fetch('http://ip-api.com/batch?lang=zh-CN', {
    //     method: 'POST', // or 'PUT'
    //     body: JSON.stringify([
    //       '122.96.33.54',
    //       '42.249.36.213',
    //       '223.104.161.168',
    //       '223.97.54.170'
    //     ]), // data can be `string` or {object}!
    //     headers: new Headers({
    //       'Content-Type': 'application/json'
    //     })
    //   }).then(res => res.json()).then(res => {
    //     console.log(res)
    //   })
    // })

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />

            <div className="pb-12">
                <div className="containe mx-auto">
                    <div className="relative h-screen min-h-screen bg-red-100 border-b border-gray-200">
                        <div className="absolute top-0 left-0 pt-[128px] px-8 z-10">
                            <div className="px-6 pt-6 h-[402px] w-[306px] bg-white/90  rounded-lg border border-gray-300 backdrop-opacity-10">
                                <div className="py-2">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        過去 30 分鐘的使用者
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900 countup">
                                        {loaded ? "71,897" : "-"}
                                    </dd>
                                </div>
                                <div className="py-2">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        每分鐘的使用者
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        <BarChart />
                                    </dd>
                                </div>
                                <div className="py-2">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        過去 30 分鐘的使用者
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900 countup">
                                        {loaded ? "1,297" : "-"}
                                    </dd>
                                </div>
                            </div>
                        </div>

                        <Map
                            className="absolute top-0 left-0 w-full min-h-[550px] h-1/2"
                            handelLoaded={onLoaded}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
