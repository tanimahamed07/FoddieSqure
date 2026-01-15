import LoginContent from "@/component/auth/LoginContent";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginContent></LoginContent>
    </Suspense>
  );
};

export default LoginPage;
