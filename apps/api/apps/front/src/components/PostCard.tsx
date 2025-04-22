"use client";
import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useScrollInView } from "./useScrollInView";
import { motion } from "framer-motion";

type Props = Partial<Post>;

const PostCard = ({ id, title, thumbnail, content, createdAt }: Props) => {
  const { ref, isInView } = useScrollInView();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="
        bg-accent rounded-lg flex flex-col text-primary outline-2
        outline-primary shadow-md hover:shadow-primary hover:shadow-lg 
        hover:scale-102 transition-all duration-300 mx-8 md:mx-0
      "
    >
      <div className="h-60 overflow-hidden relative object-contain rounded-t-lg bg-white">
        <Image
          src={thumbnail ?? "/assets/no-image.png"}
          alt={title || ""}
          fill
          priority
          sizes="50vh"
        />
      </div>

      <div className="flex flex-col p-6 flex-grow min-h-[300px] justify-between">
        <h3 className="h-1/4 text-lg text-center font-bold break-words line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-center">
          {new Date(createdAt ?? "").toLocaleString()}
        </p>

        <div className="font-light">
          <p className="break-words">{content?.slice(0, 100)}...</p>
        </div>

        <Link
          className="text-primary font-bold underline block text-right"
          href={`/blog/${id}`}
        >
          Read more
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard;
