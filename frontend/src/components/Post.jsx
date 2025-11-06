import PropTypes from "prop-types";
import { User } from "./User.jsx";
import { Link } from "react-router-dom";
import slug from "slug";
export function Post({ title, contents, author, id, fullPost = false }) {
  console.log({ author });
  return (
    <article>
           {" "}
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${id}/${slug(title)}`}>
                    <h3>{title}</h3>       {" "}
        </Link>
      )}
      {fullPost && <div>{contents}</div>}
      <em>
        {fullPost && <br />}
        Written by <User id={author.username} />
      </em>
         {" "}
    </article>
  );
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
};
