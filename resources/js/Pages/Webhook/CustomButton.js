import React, { useEffect, useState } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import { ConfirmButton } from "@/Components/Button";
import { Alert, SuccessAlert } from "@/Components/lib/Alert";
import TextEditor from "@/Components/TextEditor";
import Label from "@/Components/Label";
import Input from "@/Components/Input";

export default function CustomButton({ webhookReceiver }) {
    const { data, setData, put, reset, processing, isDirty } = useForm({
        button_name: webhookReceiver.buttons.name,
        button_url: webhookReceiver.buttons.url,
        button_replace_before: webhookReceiver.buttons.replace?.before,
        button_replace_after: webhookReceiver.buttons.replace?.after,
    });
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

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
                        <h1 className="text-xl">自定義按鈕</h1>
                        <Alert>可以在模板訊息中加入自定義按鈕</Alert>

                        <div>
                            <Label forInput="button_name" value="按鈕名稱" />

                            <Input
                                type="text"
                                name="button_name"
                                value={data.button_name}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                        </div>
                        <div>
                            <Label forInput="button_url" value="按鈕連結" />

                            <Input
                                type="text"
                                name="button_url"
                                value={data.button_url}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <p className="mt-1 text-sm text-gray-600">
                                可填入{" "}
                                <span className="bg-red-50 px-1 text-red-600">
                                    {"${alertURL}"}
                                </span>
                            </p>
                        </div>
                        <div>
                            <Label value="文字替換" />

                            <Input
                                type="text"
                                name="button_replace_before"
                                value={data.button_replace_before}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <Input
                                type="text"
                                name="button_replace_after"
                                value={data.button_replace_after}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                            <p className="mt-1 text-sm text-gray-600">
                                將上方文字替換為下方文字
                            </p>
                        </div>

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
