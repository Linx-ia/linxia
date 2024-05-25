"use client";

import { useState } from "react";
import Link from "next/link";

import { Avatar, Popover } from "@linxia/ui";

export default function UserDropdown({
  user = {},
}: {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="relative inline-block pt-1.5">
      <Popover
        content={
          <div className="flex w-full flex-col space-y-px rounded-md bg-white p-3 sm:w-56">
            <Link
              href="/"
              className="p-2"
              onClick={() => setOpenPopover(false)}
            >
              {user.name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {user.name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">{user.email}</p>
            </Link>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="group relative"
        >
          <Avatar
            user={user}
            className="h-9 w-9 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10"
          />
        </button>
      </Popover>
    </div>
  );
}
