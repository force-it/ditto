import React, { useEffect, useState } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { CardButton } from "@/Components/Button";
import CopyTextToClipboardWrapper from "@/Components/CopyTextToClipboardWrapper";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Inertia } from "@inertiajs/inertia";
import { Alert } from "@/Components/lib/Alert";

export default function Show(props) {
    const { webhookReceiver } = usePage().props;
    const [errors, setErrors] = useState({});

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
                    webhookReceiver: webhookReceiver.data.id,
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
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={webhookReceiver.data.name}
        >
            <Head title={`${webhookReceiver.data.name} - Webhook 接收器`} />

            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white sm:rounded-lg">
                        <div className="p-6 bg-white">
                            <div>
                                <h1 className="text-xl">Webhook URL</h1>

                                <div className="mt-3">
                                    <Alert>
                                        將 JSON 資料發送到到這個 URL。
                                    </Alert>
                                </div>

                                <CopyTextToClipboardWrapper
                                    text={webhookReceiver.data.uri}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white sm:rounded-lg mt-5">
                        <div className="p-6 bg-white">
                            <form onSubmit={submit}>
                                <h1 className="text-xl">您目前連結的群組</h1>

                                <div className="flex items-center mt-3">
                                    <span>
                                        {webhookReceiver.data.chat.title}
                                    </span>

                                    <CardButton className="ml-auto">
                                        重新連結到其他群組
                                    </CardButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white sm:rounded-lg mt-5">
                        <div className="p-6 bg-white">
                            <div>
                                <h1 className="text-xl">BOT 資訊</h1>

                                <p className="mt-3">
                                    {webhookReceiver.data.bot.name}
                                </p>
                                <a
                                    className="font-medium text-emerald-800 hover:text-emerald-700"
                                    target="_blank"
                                    href={`https://t.me/${webhookReceiver.data.bot.username}`}
                                >
                                    @{webhookReceiver.data.bot.username}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
