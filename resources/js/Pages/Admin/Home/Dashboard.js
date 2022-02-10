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
            <div className="h-full max-w-7xl mx-auto pt-5">{children}</div>
        </div>
    );
}

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const cards = [
    {
        name: "使用者",
        features: [
            {
                name: "新增使用者",
            },
            {
                name: "刪除使用者",
            },
            {
                name: "更新使用者的名稱或電子郵件地址",
            },
            {
                name: "建立備用電子郵件地址 (電子郵件別名)",
            },
        ],
    },
    {
        name: "組織",
        features: [
            {
                name: "產生邀請碼",
            },
            {
                name: "停用組織",
            },
        ],
    },
    {
        name: "快訊",
        text: "您沒有任何未解決的快訊",
        features: [
            {
                name: "管理規則",
            },
        ],
    },
    {
        name: "帳單",
        features: [
            {
                name: "管理訂閱",
            },
            {
                name: "付款帳戶",
            },
            {
                name: "取得更多服務",
            },
        ],
    },
];

export default function Index(props) {
    return (
        <Admin auth={props.auth} errors={props.errors}>
            <Head title="管理員" />

            <Container>
                <div className="divide-y divide-gray-200 h-full">
                    <div className="py-5 sm:py-6">
                        <h1 className="text-2xl">
                            {capitalizeFirstLetter(props.auth.user.name)}
                        </h1>
                        <span className="text-gray-500">
                            歡迎使用 Zacian 管理控制台
                        </span>
                    </div>
                    <div className="py-5 sm:py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {cards.map((item, index) => (
                                <div key={item.name}>
                                    <div className="border">
                                        <div className="p-6 font-bold">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="py-6 px-4 min-h-[300px]">
                                            {item.text && (
                                                <div className="py-6 px-2 font-semibold text-sm">
                                                    <p>{item.text}</p>
                                                </div>
                                            )}
                                            {item.features?.map((feature) => (
                                                <button className="w-full group rounded-md py-2 px-2 flex items-center text-sm font-medium text-teal-600 hover:bg-teal-50">
                                                    {feature.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Admin>
    );
}
