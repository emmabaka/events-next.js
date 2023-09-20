import { FormEvent, MutableRefObject, useRef, useState } from "react";
import s from "./NewComment.module.scss";

function NewComment({
  onAddComment,
}: {
  onAddComment: (commentData: {
    email: string;
    name: string;
    text: string;
  }) => void;
}) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const nameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const commentInputRef: MutableRefObject<HTMLTextAreaElement | null> =
    useRef(null);
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);

  function sendCommentHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredName = nameInputRef.current!.value;
    const enteredComment = commentInputRef.current!.value;

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !emailPattern.test(enteredEmail) ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });

    formRef.current!.reset();
  }

  return (
    <form className={s.form} onSubmit={sendCommentHandler} ref={formRef}>
      <div className={s.row}>
        <div className={s.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={s.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={s.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && (
        <p>Please enter a valid email address, name and comment!</p>
      )}
      <button className={s.submit}>Submit</button>
    </form>
  );
}

export default NewComment;
