import { useState } from "react";

import CommentList from "../CommentList/CommentList";
import NewComment from "../NewComment/NewComment";
import s from "./Comments.module.scss";

function Comments({eventId} : {eventId: string}) {

  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {}) {
    // send data to API
  }

  return (
    <section className={s.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
}

export default Comments;
