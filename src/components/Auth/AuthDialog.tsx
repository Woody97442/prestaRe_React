import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { IoCloseCircle } from "react-icons/io5";
function AuthDialog() {
  return (
    <dialog
      id="auth_modal"
      className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form
          method="dialog"
          className="flex float-end">
          <button
            type="submit"
            className="absolute right-2 top-3">
            <IoCloseCircle className="w-8 h-8" />
          </button>
        </form>
        <div
          role="tablist"
          className="tabs tabs-bordered">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Sign In"
            defaultChecked
          />
          <LoginForm />
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Sign Up"
          />
          <RegisterForm />
        </div>
      </div>
    </dialog>
  );
}

export default AuthDialog;
