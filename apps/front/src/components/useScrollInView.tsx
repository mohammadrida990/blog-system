"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const useScrollInView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px 0px",
  });

  return { ref, isInView };
};
