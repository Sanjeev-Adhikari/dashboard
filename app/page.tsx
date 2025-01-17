"use client"; // This is crucial for using `useRouter` in Next.js 13

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userEmail, setEmail] = useState("");  // State for email input
  const [userPassword, setPassword] = useState("");  // State for password input
  const [error, setError] = useState("");  // State for error message
  const router = useRouter();  // Use router for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare login data
    const loginData = {
      userEmail,
      userPassword,
    };

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log(backendUrl);
      if (!backendUrl) {
        throw new Error(
          "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
        );
      }
      // Send POST request to the login API
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      // Check if the login was successful
      if (response.ok) {
        // Save the token to localStorage
        localStorage.setItem("token", data.token);

        // Redirect to the dashboard
        router.push("/dashboard");
      } else {
        // Show error if login failed
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle unexpected errors
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
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
              value={userEmail}
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
              value={userPassword}
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
