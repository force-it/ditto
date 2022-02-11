import React, { useEffect, useState } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Inertia } from "@inertiajs/inertia";

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
            header="webhookReceiver.data.uri"
        >
            <Head title="Webhook 接收器" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>
                                <h1 className="text-xl">Webhook URL</h1>
                                <p className="mt-6">
                                    發送你的 JSON payloads 到這個 URL。
                                </p>

                                <Label
                                    className="mt-6"
                                    forInput="bot_token"
                                    value="您的 Webhook URL"
                                />

                                <Input
                                    type="text"
                                    name="uri"
                                    value={webhookReceiver.data.uri}
                                    className="mt-1 block w-full"
                                    handleChange={() => {}}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-10">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>
                                <h1 className="text-xl">您目前連結的群組</h1>

                                <p className="mt-6">
                                    {webhookReceiver.data.chat.title}
                                </p>

                                <div className="flex mt-4">
                                    <form onSubmit={submit}>
                                        <Button>重新連結到其他群組</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-10">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div>
                                <h1 className="text-xl">BOT 資訊</h1>

                                <p className="mt-6">
                                    {webhookReceiver.data.bot.name}
                                </p>
                                <a
                                    className="font-medium text-gray-800 hover:text-gray-700"
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
