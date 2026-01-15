"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import Container from "@/component/shared/Container";
import GoogleButton from "@/component/auth/GoogleButto";

interface RegisterFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone, // ডাটাবেসে এই নামে সেভ হবে
        }),
      });

      const result = await res.json();
      if (res.ok) {
        const loginRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (loginRes?.ok) {
          Swal.fire("Success", "Account created and logged in!", "success");
          router.push("/");
          router.refresh();
        }
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Registration failed", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-100 py-16 px-4">
      {/* Background */}
      <div className="absolute top-[-5%] right-[-5%] w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>

      <Container>
        <div className="relative z-10 w-full max-w-xl mx-auto">
          <div className="bg-base-100/80 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 mb-4 group"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
                  <span className="text-white font-bold text-2xl italic">
                    R
                  </span>
                </div>
              </Link>
              <h1 className="text-3xl font-extrabold text-neutral tracking-tight">
                Create <span className="text-primary italic">Account</span>
              </h1>
              <p className="text-neutral/50 text-sm mt-2 font-medium italic underline underline-offset-4 decoration-secondary/30">
                Join our community of food lovers
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label font-bold text-neutral/70 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`input input-bordered w-full rounded-2xl bg-base-200/50 focus:input-primary transition-all ${
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", { required: "Full name is required" })}
                  />
                  {errors.name && (
                    <span className="text-error text-[10px] mt-1 px-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-control">
                  <label className="label font-bold text-neutral/70 text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    className={`input input-bordered w-full rounded-2xl bg-base-200/50 focus:input-primary transition-all ${
                      errors.phone ? "input-error" : ""
                    }`}
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phone && (
                    <span className="text-error text-[10px] mt-1 px-1">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label font-bold text-neutral/70 text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`input input-bordered w-full rounded-2xl bg-base-200/50 focus:input-primary transition-all ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-error text-[10px] mt-1 px-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Password */}
                <div className="form-control">
                  <label className="label font-bold text-neutral/70 text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`input input-bordered w-full rounded-2xl bg-base-200/50 focus:input-primary transition-all ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                  />
                  {errors.password && (
                    <span className="text-error text-[10px] mt-1 px-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                  <label className="label font-bold text-neutral/70 text-sm">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`input input-bordered w-full rounded-2xl bg-base-200/50 focus:input-primary transition-all ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-error text-[10px] mt-1 px-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full rounded-2xl shadow-lg shadow-primary/20 text-white mt-4 h-14 normal-case text-lg font-bold"
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create My Account"
                )}
              </button>
            </form>
            <GoogleButton></GoogleButton>

            {/* Footer */}
            <p className="text-center mt-8 text-sm text-neutral/60 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterContent;
