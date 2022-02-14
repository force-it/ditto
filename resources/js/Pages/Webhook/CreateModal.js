import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import { ConfirmButton } from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";

export default function CreateModal({ open, handleCloseModal }) {
    const { data, setData, reset } = useForm({
        bot_token: "",
        name: "",
    });

    const [errors, setErrors] = useState({});

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
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
                params: data,
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
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleCloseModal}
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="flex flex-col fixed inset-0 bg-gray-100 overflow-hidden transform transition-all">
                            <div className="flex gap-2 shadow-md items-center py-3 px-4 sm:px-6 lg:px-8 bg-emerald-600">
                                <button
                                    type="button"
                                    className="h-12 w-12 rounded-full active:bg-emerald-700"
                                    onClick={handleCloseModal}
                                >
                                    <XIcon
                                        className="mx-auto text-white h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                                <Dialog.Title className="text-lg font-medium text-white">
                                    建立 Webhook 接收器
                                </Dialog.Title>
                            </div>
                            <div className="overflow-y-auto py-5 px-4 sm:px-6 lg:px-8">
                                <form onSubmit={submit}>
                                    <div className="max-w-5xl mx-auto">
                                        <div className="flex flex-col gap-4 bg-white rounded px-4 py-5 sm:px-6">
                                            <div>
                                                <Label
                                                    forInput="name"
                                                    value="Webhook 接收器名稱"
                                                />

                                                <Input
                                                    type="text"
                                                    name="name"
                                                    value={data.name}
                                                    className="mt-1 block w-full"
                                                    isFocused={true}
                                                    handleChange={
                                                        onHandleChange
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <Label value="要使用的通訊軟體" />

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
                                            <div>
                                                <Label
                                                    forInput="bot_token"
                                                    value="Bot Token"
                                                />

                                                <Input
                                                    type="text"
                                                    name="bot_token"
                                                    value={data.bot_token}
                                                    className="mt-1 block w-full"
                                                    handleChange={
                                                        onHandleChange
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex mt-5">
                                            <ConfirmButton className="ml-auto">
                                                連結到群組
                                            </ConfirmButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
