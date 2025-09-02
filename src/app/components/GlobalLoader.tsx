"use client";
import { motion, AnimatePresence } from "framer-motion";
import useGlobalLoader from "../hooks/useGlobalLoader";
import React from "react";

interface GlobalLoaderProps {
  children: React.ReactNode;
}

/**
 * GlobalLoader
 * ------------
 * Wrap your page with this component to automatically render a full-screen
 * loading overlay whenever the page (route) isn't ready yet. Readiness is
 * determined by the `useGlobalLoader` hook.
 */
const GlobalLoader = ({ children }: GlobalLoaderProps) => {
  const isLoading = useGlobalLoader();

  return (
    <>
      <AnimatePresence>{
        isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#140079",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            {/* Simple triangle or spinner */}
            <div className="loader-triangle" />
            <style jsx>{`
              .loader-triangle {
                width: 0;
                height: 0;
                border-left: 25px solid transparent;
                border-right: 25px solid transparent;
                border-bottom: 40px solid #fff;
                animation: pulse 1s infinite ease-in-out;
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.15); opacity: 0.7; }
              }
            `}</style>
          </motion.div>
        )
      }</AnimatePresence>
      {children}
    </>
  );
};

export default GlobalLoader;

