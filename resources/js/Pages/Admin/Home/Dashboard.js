import React from "react";
import Admin from "@/Layouts/Admin";
import { Head, Link, InertiaLink, usePage } from "@inertiajs/inertia-react";

import Button from "@/Components/Button";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Container({ children }) {
    return (
        <div className="h-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto pt-5">{children}</div>
        </div>
    );
}

export default function Index(props) {
    return (
        <Admin auth={props.auth} errors={props.errors}>
            <Head title="管理員" />

            <Container>
                <div className=" overflow-hidden divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-2xl">
                            {capitalizeFirstLetter(props.auth.user.name)}
                        </h1>
                        <span className="text-gray-500">
                            歡迎使用 Zacian 管理控制台
                        </span>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        {/* Content goes here */}
                    </div>
                    <div className="px-4 py-4 sm:px-6">
                        {/* Content goes here */}
                        {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
                    </div>
                </div>
            </Container>
        </Admin>
    );
}
