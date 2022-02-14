import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, InertiaLink, usePage } from "@inertiajs/inertia-react";
import Button, { ModalButton } from "@/Components/Button";
import CreateModal from "./CreateModal";
import StateBadge from "@/Components/StateBadge";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Index(props) {
    const { webhookReceivers } = usePage().props;
    let [open, setOpen] = useState(false);

    function closeModal() {
        setOpen(false);
    }

    function openModal() {
        setOpen(true);
    }

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
                            {webhookReceiver.name}
                        </InertiaLink>
                        <p className="text-sm text-gray-500 truncate">
                            以 {webhookReceiver.bot.name} 發布到{" "}
                            {webhookReceiver.chat.title}
                        </p>
                    </div>

                    <StateBadge active={webhookReceiver.malfunction} />
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
            <CreateModal
                open={open}
                handleCloseModal={closeModal}
            ></CreateModal>

            <Head title="Webhook 接收器" />

            <div className="max-w-7xl mx-auto py-5 sm:px-6 lg:px-8">
                <ModalButton onClick={openModal}>
                    建立 Webhook 接收器
                </ModalButton>

                <div className="pt-5">
                    <div className="bg-white sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {webhookReceiverItems}
                        </ul>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
