"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Forward() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return <p>Please wait...</p>;
}
