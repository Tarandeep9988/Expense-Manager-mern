"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      // Redirect to dashboard
      router.replace("/dashboard");
    } else {
      // Redirect to login
      router.replace("/login");
    }
  }, [router]);
  return (
    <div>
      Checking authentication...
    </div>
  );
}
