"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "@/lib/auth-client";
import "react-toastify/dist/ReactToastify.css";

function RedirectToastListener() {
  const searchParams = useSearchParams();
  const lastParamRef = useRef<string>("");
  const lastTimeRef = useRef<number>(0);
  const socialToastShownRef = useRef<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    // 1. Check if social login just completed via sessionStorage or auth_success searchParam
    const hasSocialPending =
      typeof window !== "undefined" &&
      sessionStorage.getItem("social_login_pending") === "true";
    const hasAuthSuccessParam = searchParams.get("auth_success") === "true";

    if ((hasSocialPending && session?.user) || hasAuthSuccessParam) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("social_login_pending");
        const url = new URL(window.location.href);
        url.searchParams.delete("auth_success");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
      }

      if (!socialToastShownRef.current) {
        socialToastShownRef.current = true;
        toast.success("সফলভাবে সাইন ইন হয়েছে!", {
          toastId: "social-auth-success",
        });
      }
      return;
    }

    socialToastShownRef.current = false;

    // 2. Check if already logged in redirect triggered
    const isAlreadyLoggedIn =
      searchParams.get("already_logged_in") === "true" ||
      searchParams.get("auth_error") === "already_logged_in";

    if (!isAlreadyLoggedIn) return;

    const currentParam = searchParams.toString();
    const now = Date.now();

    if (lastParamRef.current === currentParam && now - lastTimeRef.current < 200) {
      return;
    }

    lastParamRef.current = currentParam;
    lastTimeRef.current = now;

    toast.info("আপনি ইতিমধ্যে সাইন ইন করেছেন।");

    // Clean up query param from URL without triggering navigation
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("already_logged_in");
      url.searchParams.delete("auth_error");
      url.searchParams.delete("t");
      window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
    }
  }, [searchParams, session]);

  return null;
}

export default function ToastProvider() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Suspense fallback={null}>
        <RedirectToastListener />
      </Suspense>
    </>
  );
}
