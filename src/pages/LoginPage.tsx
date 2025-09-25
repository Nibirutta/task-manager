import LoginForm from "../features/LoginForm/LoginForm";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.title = "Task Manager | Login";
  }, []);

  return (
    <div className="w-full flex content-center justify-center py-60 bg-[var(--loginPage-bg-color)] ">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
