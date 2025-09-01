'use client';
import React, { createContext, useContext, useRef } from "react";

interface LoaderContextValue {
  /** Register a promise that must resolve before the global loader can hide */
  register: (promise: Promise<void>) => void;
  /** Signal that no more promises are expected (called automatically in PageLoader) */
  seal: () => void;
  /** Internal – used by PageLoader to wait for all registered promises */
  _waitForAll: () => Promise<void>;
}

const LoaderContext = createContext<LoaderContextValue | null>(null);

/**
 * Provider that stores promises until it is "sealed".
 * Once sealed, `waitForAll` resolves when every promise added so far settles.
 */
export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const promisesRef = useRef<Promise<void>[]>([]);
  const sealedRef = useRef(false);
  const waitPromiseRef = useRef<Promise<void> | null>(null);

  const register = (p: Promise<void>) => {
    if (sealedRef.current) return; // registration window closed
    promisesRef.current.push(p);
  };

  const seal = () => {
    if (sealedRef.current) return;
    sealedRef.current = true;
    if (!waitPromiseRef.current) {
      waitPromiseRef.current = Promise.allSettled(promisesRef.current).then(() => undefined);
    }
  };

  const _waitForAll = () => {
    seal();
    if (!waitPromiseRef.current) {
      waitPromiseRef.current = Promise.allSettled(promisesRef.current).then(() => undefined);
    }
    return waitPromiseRef.current;
  };

  return (
    <LoaderContext.Provider value={{ register, seal, _waitForAll }}>
      {children}
    </LoaderContext.Provider>
  );
};

/** Hook used by components to register a promise */
export const useRegisterLoaderPromise = () => {
  const ctx = useContext(LoaderContext);
  const register = ctx?.register ?? (() => {});
  return { registerLoaderPromise: register };
};

/** Hook used only inside PageLoader */
export const useLoaderController = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoaderController must be used inside LoaderProvider");
  }
  return {
    sealRegistrations: ctx.seal,
    waitForRegisteredPromises: ctx._waitForAll,
  };
};
