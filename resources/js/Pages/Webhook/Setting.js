import React, { useEffect, useState, useRef } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import { ConfirmButton } from "@/Components/Button";
import { Alert, SuccessAlert } from "@/Components/lib/Alert";
import TextEditor from "@/Components/TextEditor";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Setting({ webhookReceiver }) {
    const { data, setData, put, reset, processing, isDirty } = useForm({
        repeat: webhookReceiver.repeat,
    });
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

    const successUpdate = () => {
        setShowSuccessAlert(true);
        setTimeout(() => {
            setShowSuccessAlert(false);
        }, 1500);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("webhooks.update", { webhookReceiver: webhookReceiver.id }), {
            onSuccess: successUpdate,
        });
    };

    return (
        <div className="bg-white sm:rounded-lg">
            <div className="p-6 bg-white">
                <form onSubmit={submit}>
                    <div className="space-y-3">
                        <h1 className="text-xl">進階功能與設定</h1>

                        <Switch.Group
                            as="div"
                            className="flex items-center justify-between"
                        >
                            <span className="flex-grow flex flex-col">
                                <Switch.Label
                                    as="span"
                                    className="text-sm font-medium text-gray-900"
                                    passive
                                >
                                    重複發送訊息
                                </Switch.Label>
                                <Switch.Description
                                    as="span"
                                    className="text-sm text-gray-500"
                                >
                                    接收到訊息時將會每 5
                                    分鐘重複發送該訊息，直到關閉提醒為止。
                                </Switch.Description>
                            </span>
                            <Switch
                                checked={data.repeat}
                                onChange={(value) => {
                                    setData("repeat", value);
                                }}
                                className={classNames(
                                    data.repeat
                                        ? "bg-emerald-600"
                                        : "bg-gray-200",
                                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        data.repeat
                                            ? "translate-x-5"
                                            : "translate-x-0",
                                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                    )}
                                />
                            </Switch>
                        </Switch.Group>

                        <div className={`${!showSuccessAlert && "hidden"}`}>
                            <SuccessAlert>儲存成功。</SuccessAlert>
                        </div>
                        <div className="flex items-center">
                            <ConfirmButton
                                processing={processing || !isDirty}
                                className="ml-auto"
                            >
                                儲存
                            </ConfirmButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
