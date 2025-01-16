"use client"  // This is crucial for using `useRouter` in Next.js 13

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const data = {
  email: "sanjeev@gmail.com",
  password: "hero",
  token: "564897"
};

const Page = () => {
  const [email, setEmail] = useState("");  // State for email input
  const [password, setPassword] = useState("");  // State for password input
  const [error, setError] = useState("");
  const router = useRouter();  // State for error message
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    

    // Simulate login by comparing form inputs with the predefined data
    if (email === data.email && password === data.password) {
      // Redirect to dashboard if login is successful
      localStorage.setItem("token", data.token)
      router.push("/dashboard")
    } else {
      setError("Invalid email or password.");  // Set error if credentials are incorrect
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Super Biryani</h2>
        
        <form onSubmit={handleSubmit}>  {/* Attach handleSubmit to form submission */}
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Track email input
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Track password input
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
