import { useEffect, useState } from "react";
import CommentList from "../CommentList/CommentList";
import NewComment from "../NewComment/NewComment";
import s from "./Comments.module.scss";

function Comments({ eventId }: { eventId: string }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log(showComments);

    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((res) => res.json())
        .then((data) => setComments(data.comments));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
  }) {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={s.comments}>
      <button className={s.submit} onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
