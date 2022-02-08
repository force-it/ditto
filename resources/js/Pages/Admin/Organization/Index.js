import React from "react";
import Admin from "@/Layouts/Admin";
import { Head, Link, InertiaLink, usePage } from "@inertiajs/inertia-react";

import Button from "@/Components/Button";

export default function Index(props) {
    return (
        <Admin auth={props.auth} errors={props.errors}>
            <Head title="管理員" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            組織管理
                        </div>
                    </div>
                </div>
            </div>
        </Admin>
    );
}
