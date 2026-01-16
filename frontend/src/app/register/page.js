"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordCon: "",
        email: "",
        first_name: "",
        last_name: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ฟังก์ชันคอยรับค่าจาก input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ฟังก์ชันส่งข้อมูลไป Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // เช็คเบื้องต้น
        if (formData.password !== formData.passwordCon) {
            setError("รหัสผ่านยืนยันไม่ตรงกัน");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "สมัครสมาชิกไม่สำเร็จ");
            }

            alert("สมัครสมาชิกเรียบร้อย! กรุณาเข้าสู่ระบบ");
            router.push("/login"); // ส่งไปหน้า Login
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h1>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input name="first_name" placeholder="First Name" onChange={handleChange} className="input-field" required />
                        <input name="last_name" placeholder="Last Name" onChange={handleChange} className="input-field" required />
                    </div>
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input-field" required />
                    <input name="username" placeholder="Username" onChange={handleChange} className="input-field" required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input-field" required />
                    <input name="passwordCon" type="password" placeholder="Confirm Password" onChange={handleChange} className="input-field" required />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>

            {/* Tailwind Utility for cleaner code */}
            <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          border-color: #000;
          ring: 1px #000;
        }
      `}</style>
        </div>
    );
}