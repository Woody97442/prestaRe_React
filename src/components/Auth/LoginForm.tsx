import { FaKey } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";

import { GoAlert } from "react-icons/go";
import { login } from "../../tools/Api";
import { useCookies } from "react-cookie";
import { useContext, useState } from "react";
import { ToastMessageContext } from "../../App";
function LoginForm() {
  const [isError, setisError] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const { setToastMessage } = useContext(ToastMessageContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      const { ok, token, statusMessage } = await login(email, password);
      if (ok) {
        setCookie("token", token);
        const authModal = document.getElementById(
          "auth_modal"
        ) as HTMLDialogElement;
        setToastMessage(statusMessage);
        authModal.close();
      } else {
        setisError(true);
        setErrorMessage(statusMessage);
        setTimeout(() => {
          setisError(false);
        }, 3000);
      }
    } catch (error) {
      setisError(true);
      setTimeout(() => {
        setisError(false);
      }, 3000);
    }
  };

  return (
    <div
      role="tabpanel"
      className="tab-content p-10">
      <h3 className=" text-center mb-4 font-bold text-lg">Sign In</h3>
      <form
        onSubmit={handleSubmit}
        className="space-y-3">
        <label className="input input-bordered flex items-center gap-2">
          <MdAlternateEmail className="w-4 h-4 opacity-70" />
          <input
            name="email"
            type="text"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaKey className="w-4 h-4 opacity-70" />
          <input
            name="password"
            type="password"
            className="grow"
            placeholder="password"
          />
        </label>

        {isError && (
          <div
            role="alert"
            className="alert alert-error">
            <GoAlert className="w-8 h-8 opacity-70" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary justify-center w-full">
          Login
          <FaSignInAlt className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
