"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // เก็บ Token ลง LocalStorage (ถ้า Backend ส่งมา)
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            alert("Login สำเร็จ!");
            // router.push("/dashboard"); // ถ้ามีหน้า Dashboard ให้เปิดบรรทัดนี้
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account? <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}