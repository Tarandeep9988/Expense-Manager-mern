"use client"

import FormHeading from "@/components/auth/FormHeading"
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();


  }
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <FormHeading>Create your account</FormHeading>
      <input className="border rounded-l my-1 p-0.5" placeholder="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border rounded-l my-1 p-0.5" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border rounded-l my-1 p-0.5" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="border rounded-l my-1 cursor-pointer" type="submit">Register</button>
      <Link href="/login" className="text-blue-500 mt-2">Already have an account? Login</Link>
    </form>
  )
}

export default page