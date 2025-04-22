import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";
import Profile from "./Profile";
import ThemeToggle from "./ThemeSwitcher";
import SideBar from "./ui/Sidebar";
import { Bars3Icon } from "@heroicons/react/16/solid";

const Navbar = async () => {
  const session = await getSession();

  return (
    <nav className="flex flex-row items-center justify-between h-[80px] container mx-auto w-full">
      <div className="text-left hover:text-sky-600 dark:hover:text-gray-200">
        <h1 className="text-4xl font-bold p-2 leading-snug">
          <Link href="/">Blog</Link>
        </h1>
      </div>

      <div className="flex gap-6 text-lg font-bold">
        <div className="hidden md:flex gap-6 ">
          <Link
            href="/user/posts"
            className="hover:text-sky-600 dark:hover:text-gray-200"
          >
            My posts
          </Link>

          <Link
            href="/user/create-post"
            className="hover:text-sky-600 dark:hover:text-gray-200"
          >
            Create post
          </Link>

          {session && session.user ? (
            <>
              <Profile user={session.user} />
              <ThemeToggle />
            </>
          ) : (
            <div className="flex gap-6">
              <Link
                href="/auth/signin"
                className="hover:text-sky-600 dark:hover:text-gray-200"
              >
                SignIn
              </Link>

              <Link
                href="/auth/signup"
                className="hover:text-sky-600 dark:hover:text-gray-200"
              >
                Signup
              </Link>

              <ThemeToggle />
            </div>
          )}
        </div>

        <div className="md:hidden">
          <SideBar
            triggerIcon={<Bars3Icon className="w-10 h-10" />}
            triggerClassName="absolute top-5 right-3"
            user={session?.user}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
