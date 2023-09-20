import s from "./CommentList.module.scss";
interface Comment {
  id: string
  name: string
  email: string
  text: string
}

function CommentList({items}:{items: Comment[]}) {
  return (
    <ul className={s.comments}>
      {items.map(({id, text, name}) => (
        <li key={id}>
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
