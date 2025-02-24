import { useState } from 'react';

const Blog = ({ blog, likeBlog }) => {
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
        </div>
      )}
    </div>
  );
};

export default Blog;
