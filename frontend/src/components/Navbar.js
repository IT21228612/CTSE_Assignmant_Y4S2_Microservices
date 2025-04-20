'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaUserCircle } from 'react-icons/fa'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const token = localStorage.getItem('token')
  const firstName = localStorage.getItem('firstName')
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('firstName')
    localStorage.removeItem('username')
    window.location.href = '/login'
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src="/HS_logo.png" alt="HomeStock Logo" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Nav */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-8 lg:items-center">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
              Inventory
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </PopoverButton>
            <PopoverPanel className="absolute z-10 mt-3 w-40 bg-white rounded-md shadow-lg ring-1 ring-gray-900/5">
              <div className="p-2">
                <Link to="/inventory_reports" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Reports
                </Link>
                <Link to="/inventory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Inventory
                </Link>
              </div>
            </PopoverPanel>
          </Popover>

          {token && (
            <span className="text-sm font-semibold text-gray-900">Welcome, {firstName}</span>
          )}

          {token ? (
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                <FaUserCircle className="h-5 w-5" />
                {username}
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </PopoverButton>
              <PopoverPanel className="absolute right-0 z-10 mt-3 w-40 bg-white rounded-md shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </PopoverPanel>
            </Popover>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-gray-900">
                Login
              </Link>
              <Link to="/register" className="text-sm font-semibold text-gray-900">
                Register
              </Link>
            </>
          )}
        </PopoverGroup>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full max-w-sm bg-white p-6 overflow-y-auto shadow-lg ring-1 ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img className="h-10 w-auto" src="/HS_logo.png" alt="HomeStock Logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root divide-y divide-gray-200">
            <div className="space-y-2 pb-6">
              <Disclosure>
                <DisclosureButton className="flex w-full justify-between rounded-lg py-2 px-4 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  Inventory
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </DisclosureButton>
                <DisclosurePanel className="space-y-1 pl-4">
                  <Link to="/inventory_reports" className="block py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Reports
                  </Link>
                  <Link to="/inventory" className="block py-2 text-sm text-gray-700 hover:bg-gray-50">
                    My Inventory
                  </Link>
                </DisclosurePanel>
              </Disclosure>
            </div>

            <div className="py-6">
              {token && (
                <>
                  <div className="text-sm text-gray-700 px-4 mb-2">Welcome, {firstName}</div>
                  <Link to="/profile" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </>
              )}

              {!token && (
                <>
                  <Link to="/login" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50">
                    Login
                  </Link>
                  <Link to="/register" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-50">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
