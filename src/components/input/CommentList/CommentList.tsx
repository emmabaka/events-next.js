import s from "./CommentList.module.scss";
interface Comment {
  eventId: string
  name: string
  email: string
  text: string
  _id: string
}

function CommentList({items}:{items: Comment[]}) {
  return (
    <ul className={s.comments}>
      {items.map(({_id, text, name}) => (
        <li key={_id}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
