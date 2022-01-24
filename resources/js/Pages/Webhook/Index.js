import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, InertiaLink } from "@inertiajs/inertia-react";

import Button from "@/Components/Button";

export default function Index(props) {
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Webhook 接收器" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <InertiaLink href={route("webhooks.create")}>
                                <Button className="ml-4">
                                    建立 Webhook 接收器
                                </Button>
                            </InertiaLink>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
