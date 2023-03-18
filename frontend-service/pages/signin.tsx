import { useAuth } from "@hooks/useAuth";
import { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";

const SignIn: NextPage = () => {
  const { login } = useAuth();
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      !!localStorage.getItem("username") &&
      !!localStorage.getItem("password")
    ) {
      setRememberMe(true);
      setUsername(localStorage.getItem("username") ?? "");
      setPassword(localStorage.getItem("password") ?? "");
    }
  }, []);

  const onLogin = async () => {
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    }
    await login(username, password);
  };

  return (
    <div className="h-screen w-screen bg-blue-dark">
      <div className="absolute left-1/2 top-1/2 w-full max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white px-8 py-4 sm:p-8 md:max-w-[600px] md:p-10">
        <section className="font-bold text-blue">
          <h3 className="text-xl sm:text-3xl">IPMS</h3>
          <h6 className="text-xs md:text-2xl">
            Integrated Pest Management System
          </h6>
        </section>
        <section className="mt-4 text-xs font-semibold sm:mt-6 sm:text-sm md:text-base">
          <div className="w-full">
            <div className="mb-1.5 flex items-center gap-x-2">
              <img src="/icons/person.svg" />
              <p>Username</p>
            </div>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-[#1E1E1E] py-2 px-4 font-normal"
              placeholder="username"
            />
          </div>
          <div className="my-4 w-full">
            <div className="mb-1.5 flex items-center gap-x-2">
              <img src="/icons/password.svg" />
              <p>Password</p>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-lg border border-[#1E1E1E] py-2 px-4 font-normal"
              placeholder="password"
            />
          </div>
          <div className="flex w-full flex-row justify-between gap-4 md:flex-col">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-x-2 font-normal hover:cursor-pointer"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded border border-[#111111]">
                {rememberMe ? <p>&#10003;</p> : <p></p>}
              </div>
              <p>Ingat Saya?</p>
            </div>
            <div
              onClick={onLogin}
              className="cursor-pointer rounded-2xl bg-blue py-2 px-4 text-center text-white md:w-full"
            >
              Log In
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default SignIn;
