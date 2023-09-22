import { FormEvent, MutableRefObject, useRef, useContext } from "react";
import NotificationContext from "@/store/notification-context";
import s from "./NewsletterRegister.module.scss";

function NewsletterRegister() {
  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;

    notificationCtx.showNotification({
      title: "Singing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(enteredEmail)) {
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.message || "Something went wrong!");
            });
          }
        })
        .then((data) => {
          notificationCtx.showNotification({
            title: "Success!",
            message: "Successfully registered for newsletter",
            status: "success",
          });
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: "Error!",
            message: error.message || "Something went wrong!",
            status: "error",
          });
        });
      formRef.current!.reset();
    } else {
      notificationCtx.showNotification({
        title: "Error!",
        message: "Please, enter a correct email",
        status: "error",
      });
    }
  }

  return (
    <section className={s.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler} ref={formRef}>
        <div className={s.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegister;
