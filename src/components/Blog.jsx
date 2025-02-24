import { useState } from 'react';
import PropTypes from 'prop-types';  // ✅ Import PropTypes

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showDeleteButton = user && blog.user && user.username === blog.user.username;

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>
      {visible && (
        <div>
          <div>URL: {blog.url}</div>
          <div>Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button></div>
          <div>User: {blog.user?.name || 'Anonymous'}</div>
          {showDeleteButton && <button onClick={() => deleteBlog(blog)} style={{ color: 'red' }}>Delete</button>}
        </div>
      )}
    </div>
  );
};

// ✅ Define PropTypes
Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired
};

export default Blog;
