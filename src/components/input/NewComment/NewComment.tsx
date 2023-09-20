import { FormEvent, MutableRefObject, useRef, useState } from "react";
import s from "./NewComment.module.scss";

function NewComment({
  onAddComment,
}: {
  onAddComment: (commentData: {}) => void;
}) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const nameInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const commentInputRef: MutableRefObject<HTMLTextAreaElement | null> =
    useRef(null);

  function sendCommentHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredName = nameInputRef.current!.value;
    const enteredComment = commentInputRef.current!.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
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
  }

  return (
    <form className={s.form}>
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
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
