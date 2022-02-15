import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import { ModalConfirmButton, CancelButton } from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";

export default function DeleteModal({
    webhookReceiver,
    open,
    handleCloseModal,
}) {
    const {
        data,
        setData,
        delete: destroy,
        reset,
        processing,
    } = useForm({
        webhookReceiver: webhookReceiver.id,
    });

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

        destroy(route("webhooks.destroy", data));
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleCloseModal}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-sm text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="flex gap-2 items-center py-3 px-6 bg-emerald-600">
                                <Dialog.Title className="leading-6 text-xl font-medium text-white">
                                    刪除 Webhook 接收器：
                                    <p className="font-bold">
                                        {webhookReceiver.name}
                                    </p>
                                </Dialog.Title>
                            </div>
                            <div className="overflow-y-auto">
                                <form onSubmit={submit}>
                                    <div className="max-w-5xl mx-auto">
                                        <div className="flex flex-col gap-4 bg-white rounded p-6">
                                            刪除 Webhook
                                            接收器後，就無法再存取任何訊息。
                                        </div>
                                        <div className="flex py-2 px-4">
                                            <CancelButton
                                                processing={processing}
                                                className="ml-auto"
                                                onClick={handleCloseModal}
                                            >
                                                取消
                                            </CancelButton>
                                            <ModalConfirmButton
                                                processing={processing}
                                                className="ml-2"
                                            >
                                                刪除
                                            </ModalConfirmButton>
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
