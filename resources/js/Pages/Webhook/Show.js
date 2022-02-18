import React, { useEffect, useState } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { CardButton, ConfirmButton, ModalButton } from "@/Components/Button";
import CopyTextToClipboardWrapper from "@/Components/CopyTextToClipboardWrapper";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Inertia } from "@inertiajs/inertia";
import { Alert, ErrorAlert } from "@/Components/lib/Alert";
import StateBadge from "@/Components/StateBadge";
import DeleteModal from "./DeleteModal";
import JmteTemplate from "./JmteTemplate";

export default function Show({ webhookReceiver, auth }) {
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);

    function closeModal() {
        setOpen(false);
    }

    function openModal() {
        setOpen(true);
    }

    const submit = (e) => {
        e.preventDefault();

        if (window.tgWindow) {
            window.tgWindow.close();
            window.tgWindow = null;
        }
        window.tgWindow = window.open();

        axios
            .get(
                route("api.link.relink", {
                    webhookReceiver: webhookReceiver.id,
                })
            )
            .then(link)
            .catch((err) => {
                window.tgWindow.close();
                setErrors(
                    _.mapValues(err.response.data.errors, (o) => o.join())
                );
            });
    };

    const link = (res) => {
        setErrors({});
        window.tgWindow.location.href = res.data.url;

        Echo.private(`webhook.receiver.${res.data.token}`).listen(
            "TelegramConnected",
            (e) => {
                window.tgWindow.close();

                Inertia.get(
                    route("webhooks.show", {
                        webhookReceiver: e.id,
                    })
                );
            }
        );
    };

    return (
        <Authenticated auth={auth}>
            <Head title={`${webhookReceiver.name} - Webhook 接收器`} />

            <DeleteModal
                open={open}
                handleCloseModal={closeModal}
                webhookReceiver={webhookReceiver}
            ></DeleteModal>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex items-center py-6">
                    <h1 className="text-2xl font-bold">
                        {webhookReceiver.name}
                    </h1>
                    <div className="ml-3">
                        <StateBadge active={webhookReceiver.malfunction} />
                    </div>
                    <ModalButton className="ml-auto" onClick={openModal}>
                        刪除 Webhook 接收器
                    </ModalButton>
                </div>

                <div className="mt-5 space-y-4">
                    {webhookReceiver.malfunction && (
                        <ErrorAlert>{webhookReceiver.malfunction}</ErrorAlert>
                    )}

                    <div className="bg-white sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <div className="space-y-3">
                                <h1 className="text-xl">Webhook URL</h1>

                                <Alert>將 JSON 資料發送到到這個 URL。</Alert>

                                <CopyTextToClipboardWrapper
                                    text={webhookReceiver.url}
                                />
                            </div>
                        </div>
                    </div>

                    <JmteTemplate webhookReceiver={webhookReceiver} />

                    <div className="bg-white sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <form onSubmit={submit}>
                                <h1 className="text-xl">您目前連結的群組</h1>

                                <div className="flex items-center mt-3">
                                    <span>{webhookReceiver.chat.title}</span>

                                    <ModalButton className="ml-auto">
                                        重新連結到其他群組
                                    </ModalButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <div>
                                <h1 className="text-xl">BOT 資訊</h1>

                                <p className="mt-3">
                                    {webhookReceiver.bot.name}
                                </p>
                                <a
                                    className="font-medium text-emerald-800 hover:text-emerald-700"
                                    target="_blank"
                                    href={`https://t.me/${webhookReceiver.bot.username}`}
                                >
                                    @{webhookReceiver.bot.username}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
