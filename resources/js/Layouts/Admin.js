import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";

const userNavigation = [
    { name: "離開管理員", href: route("dashboard") },
    { name: "登出", href: route("logout"), method: "post", as: "button" },
];

export default function Admin({ auth, header, children }) {
    return (
        <>
            <Navbar auth={auth} userNavigation={userNavigation} />
        </>
    );
}
