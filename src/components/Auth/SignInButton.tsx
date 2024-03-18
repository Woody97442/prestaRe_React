function SignInButton() {
  return (
    <>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("auth_modal") as HTMLDialogElement
          ).showModal()
        }>
        Sign In
      </button>
    </>
  );
}

export default SignInButton;
