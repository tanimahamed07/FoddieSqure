"use client";
import React, { useState } from "react";
import Link from "next/link";
import Container from "@/component/shared/Container";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation"; // useRouter এখান থেকে হবে
import { signIn } from "next-auth/react"; // signIn ইম্পোর্ট করতে হবে
import Swal from "sweetalert2";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => { 
    setIsLoading(true);
    const { email, password } = data; 

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result?.error) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        // router.push(result?.url || callbackUrl);
      } else {
        Swal.fire("Error", "Invalid email or password", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-100 py-12 px-4">
      {/* Background Blurs */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <Container>
        <div className="relative z-10 w-full max-w-md mx-auto">
          <div className="bg-base-100/80 backdrop-blur-xl border border-base-300 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl">
            
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
                  <span className="text-white font-bold text-2xl italic">R</span>
                </div>
              </Link>
              <h1 className="text-3xl font-extrabold text-neutral tracking-tight">
                Welcome <span className="text-primary italic">Back</span>
              </h1>
              <p className="text-neutral/50 text-sm mt-2 font-medium">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-neutral/70">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`input input-bordered w-full rounded-2xl bg-base-200/50 focus:input-primary transition-all ${errors.email ? "input-error" : ""}`}
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
                  })}
                />
                {errors.email && <span className="text-error text-xs mt-1 px-1">{errors.email.message as string}</span>}
              </div>

              <div className="form-control w-full">
                <div className="flex justify-between items-center">
                  <label className="label font-semibold text-neutral/70">Password</label>
                  <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot?</Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`input input-bordered w-full rounded-2xl bg-base-200/50 focus:input-primary transition-all ${errors.password ? "input-error" : ""}`}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                />
                {errors.password && <span className="text-error text-xs mt-1 px-1">{errors.password.message as string}</span>}
              </div>

              <div className="flex items-center gap-2 px-1">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded-md" id="remember" />
                <label htmlFor="remember" className="text-sm text-neutral/60 cursor-pointer">Remember me</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full rounded-2xl shadow-lg shadow-primary/20 text-white mt-4 h-14 normal-case text-lg"
              >
                {isLoading ? <span className="loading loading-spinner"></span> : "Sign In"}
              </button>

              <div className="divider text-xs text-neutral/30 font-bold uppercase py-2">Or continue with</div>

              <button 
                type="button" 
                onClick={() => signIn('google', { callbackUrl })}
                className="btn btn-outline border-base-300 w-full rounded-2xl hover:bg-base-200 hover:text-neutral normal-case"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-2" alt="Google" />
                Login with Google
              </button>
            </form>

            <p className="text-center mt-8 text-sm text-neutral/60 font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;