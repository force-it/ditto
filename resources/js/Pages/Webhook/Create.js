import React, { useEffect, useState } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import { Inertia } from "@inertiajs/inertia";

export default function Create(props) {
    const [botToken, setBotToken] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        return () => {
            // reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setBotToken(event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (window.tgWindow) {
            window.tgWindow.close();
            window.tgWindow = null;
        }
        window.tgWindow = window.open();

        axios
            .get(route("api.link"), {
                params: {
                    bot_token: botToken,
                },
            })
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
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    建立 Webhook 接收器
                </h2>
            }
        >
            <Head title="Webhook 接收器" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {/* <div className="grid grid-cols-6 gap-6"> */}
                                <div className="col-span-6">
                                    <Label value="通訊軟體" />

                                    <div className="flex items-center mt-2">
                                        <input
                                            id="channel"
                                            name="channel"
                                            type="radio"
                                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
                                            defaultChecked
                                        />
                                        <label
                                            htmlFor="channel"
                                            className="flex items-center ml-3"
                                        >
                                            <img
                                                className="w-12 h-12 rounded-full object-cover"
                                                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg"
                                                alt="Telegram Logo"
                                            />

                                            <div className="ml-4 leading-tight">
                                                <div>Telegram</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                {/* </div> */}
                                <div className="mt-4">
                                    <Label
                                        forInput="bot_token"
                                        value="Bot Token"
                                    />

                                    <Input
                                        type="text"
                                        name="bot_token"
                                        value={botToken}
                                        className="mt-1 block w-full"
                                        autoComplete="bot_token"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4">連結到群組</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
