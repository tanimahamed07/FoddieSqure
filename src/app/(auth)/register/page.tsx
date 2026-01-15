import RegisterContent from "@/component/auth/RegisterContent";
import { Suspense } from "react";

const RegisterPage: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RegisterContent></RegisterContent>
    </Suspense>
  );
};

export default RegisterPage;
