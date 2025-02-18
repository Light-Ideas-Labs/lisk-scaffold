import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Fragment } from "react";
import Image from "next/image";

import { SwitchTheme } from "./SwitchTheme";


export default function Header() {
    
    return (
        <Disclosure as="nav" className="bg-prosperity">
            {({ open }) => (
                <>
                    <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                <Image
                                         className="block h-8 w-auto sm:block lg:block"
                                        src="/LiskLogo-Blue.png"
                                        width="1453"
                                        height="400"
                                        alt="Lisk Logo"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    <a href="/" className="inline-flex items-center pt-1 text-sm font-medium text-gray-900">Home</a>
                                    <a href="/todo" className="inline-flex items-center pt-1 text-sm font-medium text-gray-900">Todo</a>
                                    {/* Dropdown menu for Tokens */}
                                    <Menu as="div" className="relative inline-flex">
                                        <Menu.Button className="inline-flex items-center pt-1 text-sm font-medium text-gray-900">
                                            Tokens
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a href="#" className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}>
                                                                Analytics
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    {/* Additional menu items can be added here */}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    <a href="#" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">NFTs</a>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <ConnectButton
                                        showBalance={{
                                            smallScreen: true,
                                            largeScreen: true,
                                        }}
                                    />
                                    <SwitchTheme />
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2 pb-4">
                            <Disclosure.Button as="a" href="#" className="block  py-2 pl-3 pr-4 text-base font-medium text-black">Home</Disclosure.Button>
                            <Disclosure.Button as="a" href="#" className="block py-2 pl-3 pr-4 text-base font-medium text-black">Tokens</Disclosure.Button>
                            <Disclosure.Button as="a" href="/todo" className="block py-2 pl-3 pr-4 text-base font-medium text-black">Todo</Disclosure.Button>
                            <Disclosure.Button as="a" href="/jokes" className="block py-2 pl-3 pr-4 text-base font-medium text-black">Jokes</Disclosure.Button>
                            <Disclosure.Button as="a" href="#" className="block py-2 pl-3 pr-4 text-base font-medium text-black">NFTs</Disclosure.Button>
                            {/* Add here your custom menu elements */}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
