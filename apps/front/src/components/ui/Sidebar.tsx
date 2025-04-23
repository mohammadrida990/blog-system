"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { XCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import ThemeToggle from "../ThemeSwitcher";
import { SessionUser } from "@/lib/session";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
  user?: SessionUser;
}>;
const SideBar = (props: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setShow(false));
  return (
    <>
      <button
        className={props.triggerClassName}
        onClick={() => setShow((prev) => !prev)}
      >
        {props.triggerIcon}
      </button>

      <div
        ref={ref}
        className={cn(
          "fixed top-0 right-0 w-80 h-full flex flex-col bg-stone-200 justify-between shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": show,
            "translate-x-full": !show,
          }
        )}
      >
        <div>
          <div className="flex justify-between mt-3 mr-3 items-center">
            <div className="ml-3">
              <ThemeToggle showOutline={false} />
            </div>

            <XCircleIcon
              className="w-10 h-10 dark:text-slate-900"
              onClick={() => setShow(false)}
            />
          </div>

          <div className="flex gap-3 mt-8 text-center justify-center items-center">
            {props.user?.name && (
              <p className="capitalize font-bold text-4xl text-primary dark:text-slate-900">
                {props?.user?.name}
              </p>
            )}
            <span className="text-4xl dark:text-slate-900">Blog</span>
          </div>
        </div>

        <div className="text-center flex flex-col gap-6 dark:text-slate-900">
          <Link
            href="/user/posts"
            className="hover:text-sky-600 hover:dark:text-slate-600"
            onClick={() => setShow(false)}
          >
            My posts
          </Link>

          <Link
            href="/user/create-post"
            onClick={() => setShow(false)}
            className="hover:text-sky-600 hover:dark:text-slate-600"
          >
            Create post
          </Link>

          {props.user?.name ? (
            <a href="/routeApi/auth/signout">
              <span>Sign out</span>
            </a>
          ) : (
            <>
              <Link
                href="/auth/signin"
                onClick={() => setShow(false)}
                className="hover:text-sky-600 hover:dark:text-slate-600"
              >
                SignIn
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setShow(false)}
                className="hover:text-sky-600 hover:dark:text-slate-600"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <div />
      </div>
    </>
  );
};

export default SideBar;
