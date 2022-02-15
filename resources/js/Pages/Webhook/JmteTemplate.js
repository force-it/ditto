import React, { useEffect, useState } from "react";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import { ConfirmButton } from "@/Components/Button";
import { Alert } from "@/Components/lib/Alert";
import TextEditor from "@/Components/TextEditor";

export default function JmteTemplate({ webhookReceiver }) {
    const { data, setData, put, reset, processing, isDirty } = useForm({
        webhookReceiver: webhookReceiver.id,
        jmte: webhookReceiver.jmte,
    });

    const setText = (value) => {
        setData("jmte", value.trim());
    };

    const submit = (e) => {
        e.preventDefault();
        put(route("webhooks.update", data));
    };

    return (
        <div className="bg-white sm:rounded-lg">
            <div className="p-6 bg-white">
                <form onSubmit={submit}>
                    <div className="space-y-3">
                        <h1 className="text-xl">訊息模板</h1>

                        <Alert>模板語言可以自定義訊息內容的格式。</Alert>

                        <div className="rounded-xl overflow-hidden border">
                            <TextEditor
                                text={data.jmte}
                                setText={setText}
                            ></TextEditor>
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
