"use client"

import FormHeading from "@/components/auth/FormHeading"
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // Handle successful login (e.g., store token, redirect)
      window.localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  }
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <FormHeading>Login to your account</FormHeading>
      <input className="border rounded-l my-1 p-0.5" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border rounded-l my-1 p-0.5" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="border rounded-l my-1 cursor-pointer" type="submit">Login</button>
      <Link href="/register" className="text-blue-500 mt-2">Don't have an account? Register</Link>
    </form>
  )
}
export default page