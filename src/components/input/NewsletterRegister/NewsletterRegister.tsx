import { FormEvent, MutableRefObject, useRef } from "react";
import s from "./NewsletterRegister.module.scss";

function NewsletterRegister() {
  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);

  function registrationHandler(event: FormEvent) {
    event.preventDefault();
    console.log(event);
    const enteredEmail = emailInputRef.current!.value;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(enteredEmail)) {
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      formRef.current!.reset();
    } else {
      alert("Invalid email");
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
