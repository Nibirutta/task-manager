import LoginForm from "../features/LoginForm/LoginForm";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Task Manager | Login";
  }, []);

  return (
    <div className="w-full flex content-center justify-center py-60 ">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
