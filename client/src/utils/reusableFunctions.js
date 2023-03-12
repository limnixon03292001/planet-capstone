import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function closeModal(setIsOpen) {
    setIsOpen(false)
}

export function openModal(setIsOpen) {
    setIsOpen(true)
}

export const checkStatusPill = (status, styles) => {
    if(status === "Approved") {
        return (
            <span className={`text-green-700 bg-green-500/30 ${styles}`}>{status}</span>
        )
    } else if (status === "Rejected") {
        return (
            <span className={`text-red-700 bg-red-500/30 ${styles}`}>{status}</span>
        )
    } else if (status === "Pending") {
        return (
            <span className={`text-blue-700 bg-blue-500/30 ${styles}`}>{status}</span>
        )
    }  
};

export function SortIcon({ className }) {
    return (
      <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path></svg>
    )
  }
  
export function SortUpIcon({ className }) {
    return (
        <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg>
    )
}
  
export function SortDownIcon({ className }) {
    return (
        <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>
    )
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}


const people = [
    { id: 1, name: 'Users' },
    { id: 2, name: 'Admin' }
  ];
  
export const FilterLinks = () => {
    const [selected, setSelected] = useState(people[0])
  
    return (
        <div className="ml-auto w-40 h-full">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-200
                 bg-white py-3 pl-3 pr-10 text-left focus:outline-none
                  focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                    className="w-6 h-6" aria-hidden={true}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
  
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
                        <Link to={`${person?.name === 'Users' ? '/admin/' : '/admin/admin-accounts'}`} key={personIdx}>
                            <Listbox.Option
   
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                            }
                            value={person}
                            >
                            {({ selected }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {person.name}
                                </span>
                                {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                                    stroke="currentColor" className="w-5 h-5" aria-hidden={true}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
  
                                    </span>
                                ) : null}
                                </>
                            )}
                            </Listbox.Option>
                        </Link>
                    ))}
                    </Listbox.Options>
                </Transition>
                </div>
            </Listbox>
        </div>
    )
}