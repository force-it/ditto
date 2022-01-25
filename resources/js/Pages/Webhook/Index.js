import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, InertiaLink, usePage } from "@inertiajs/inertia-react";

import Button from "@/Components/Button";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Index(props) {
    const { webhookReceivers } = usePage().props;

    const webhookReceiverItems = webhookReceivers.data.map(
        (webhookReceiver) => (
            <li key={webhookReceiver.id} className="py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://ui-avatars.com/api/?name=TG&color=7F9CF5&background=EBF4FF"
                            alt=""
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            以 {webhookReceiver.bot.name} 發布到{" "}
                            {webhookReceiver.chat.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {webhookReceiver.user.name} on{" "}
                            {webhookReceiver.created_at}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <div
                                className={classNames(
                                    !webhookReceiver.malfunction
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800",
                                    "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                                )}
                            >
                                <span>
                                    {!webhookReceiver.malfunction
                                        ? "工作中"
                                        : "故障"}
                                </span>
                            </div>
                        </div>
                        <InertiaLink
                            href={route("webhooks.show", {
                                webhookReceiver: webhookReceiver.id,
                            })}
                            active={route("webhooks.show", {
                                webhookReceiver: webhookReceiver.id,
                            })}
                            preserveState
                        >
                            <Button type="button" className="ml-4">
                                編輯
                            </Button>
                        </InertiaLink>
                    </div>
                </div>
            </li>
        )
    );
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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-10">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-xl">配置</h1>

                            <div className="mt-6 text-gray-500">
                                <div className="flow-root mt-6">
                                    <ul className="-my-5 divide-y divide-gray-200">
                                        {webhookReceiverItems}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
