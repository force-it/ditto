import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, InertiaLink, usePage } from "@inertiajs/inertia-react";

import Button, { ModalButton } from "@/Components/Button";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Index(props) {
    const { webhookReceivers } = usePage().props;

    const webhookReceiverItems = webhookReceivers.data.map(
        (webhookReceiver) => (
            <li key={webhookReceiver.id}>
                <div className="flex items-center space-x-4 px-4 py-4 sm:px-6">
                    <div className="flex-shrink-0">
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <InertiaLink
                            className="text-sm font-bold text-emerald-600 truncate"
                            href={route("webhooks.show", {
                                webhookReceiver: webhookReceiver.id,
                            })}
                            preserveState
                        >
                            以 {webhookReceiver.bot.name} 發布到{" "}
                            {webhookReceiver.chat.title}
                        </InertiaLink>
                        <p className="text-sm text-gray-500 truncate">
                            {webhookReceiver.user.name} on{" "}
                            {webhookReceiver.created_at}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <span
                                className={classNames(
                                    !webhookReceiver.malfunction
                                        ? "bg-green-400"
                                        : "bg-red-400",
                                    "inline-flex items-baseline px-2.5 py-1 rounded-full text-sm  bg-opacity-10 md:mt-2 lg:mt-0"
                                )}
                            >
                                <span className="relative flex mr-1.5 w-2.5 h-2.5">
                                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-400"></span>
                                </span>
                                <span>
                                    {!webhookReceiver.malfunction
                                        ? "工作中"
                                        : "故障"}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        )
    );
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<span>Webhook 接收器</span>}
        >
            <Head title="Webhook 接收器" />

            <div className="max-w-7xl mx-auto pt-5 sm:px-6 lg:px-8">
                <InertiaLink href={route("webhooks.create")}>
                    <ModalButton>建立 Webhook 接收器</ModalButton>
                </InertiaLink>

                <div className="py-5 sm:py-6">
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {webhookReceiverItems}
                        </ul>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
