import { ToastMessageContext } from "@/App";
import { useContext, useEffect } from "react";

function ToastMessage() {
  const { toastMessage, setToastMessage } = useContext(ToastMessageContext);

  useEffect(() => {
    if (toastMessage.length) {
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
    }
  }, [toastMessage]);

  return (
    <>
      {toastMessage.length ? (
        <div className="toast">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ToastMessage;
