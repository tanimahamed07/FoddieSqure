import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleButton = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  console.log(callbackUrl);
  const handleSignIn = () => {
    signIn("google", {
      callbackUrl: callbackUrl,
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className="btn btn-outline border-base-300 w-full rounded-2xl hover:bg-base-200 hover:text-neutral normal-case"
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.6 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.5c-.54 2.9-2.18 5.36-4.65 7.04l7.19 5.59C43.93 37.36 46.1 31.47 46.1 24.5z"
        />
        <path
          fill="#FBBC05"
          d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.14 15.91-5.82l-7.19-5.59c-2 1.35-4.56 2.14-8.72 2.14-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.6 48 24 48z"
        />
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleButton;
