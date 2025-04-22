import { SessionUser } from "@/lib/session";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import ThemeToggle from "./ThemeSwitcher";

type Props = {
  user: SessionUser;
};
const Profile = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="outline-2 outline-primary">
          <AvatarImage src={user.avatar} />

          <AvatarFallback>
            <UserIcon className="w-8 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="bg-gray-100">
        <div className="flex items-center justify-center gap-3 font-bold text-2xl text-black">
          <UserIcon className="w-7 h-7" />
          <p className="capitalize">{user.name}</p>
        </div>

        <div
          className="
            *:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 text-black
          [&>*:hover]:bg-foreground [&>*:hover]:text-white *:transition *:rounded-md
            "
        >
          <a href="/routeApi/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4 justify-self-end" />
            <span className="col-span-4">Sign out</span>
          </a>

          <Link href="/user/posts">
            <ListBulletIcon className="w-4 justify-self-end" />
            <span className="col-span-4">My posts</span>
          </Link>

          <Link href="/user/create-post">
            <PencilSquareIcon className="w-4 justify-self-end" />
            <span className="col-span-4">Create new post</span>
          </Link>
        </div>

        <hr className="bg-black" />

        <div className="text-right mt-6">
          <ThemeToggle showOutline={false} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
