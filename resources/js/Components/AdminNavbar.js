import React from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";

export default function AdminNavbar({ auth, userNavigation }) {
    return (
        <div className="bg-teal-500 px-4 shadow sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex lg:static xl:col-span-2">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="ml-3 text-2xl text-white/90 font-bold">
                            Zacian Admin
                        </span>
                    </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div className="flex items-center px-6 py-3 md:max-w-2xl md:mx-auto lg:mx-0 xl:px-0">
                        <div className="w-full">
                            <div className="relative">
                                <input
                                    id="search"
                                    name="search"
                                    className="peer block w-full bg-teal-600 border-none rounded-md py-2 pl-10 pr-3 text-white placeholder-white focus:placeholder-gray-500 focus:ring-white focus:bg-white focus:text-black"
                                    placeholder="Search"
                                    type="search"
                                />
                                <div className="text-white peer-focus:text-gray-400 pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <SearchIcon
                                        className="h-5 w-5 "
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end xl:col-span-4">
                    <a
                        href="#"
                        className="ml-5 flex-shrink-0 bg-teal-500 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </a>

                    <div className="flex-shrink-0 relative ml-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${auth.user.name}&color=7F9CF5&background=EBF4FF`}
                                    />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {userNavigation.map((item) => (
                                    <Dropdown.Link
                                        key={item.name}
                                        href={item.href}
                                        method={item.method}
                                        as={item.as}
                                    >
                                        {item.name}
                                    </Dropdown.Link>
                                ))}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
