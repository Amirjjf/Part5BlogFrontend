import { useState } from 'react';

const BlogForm = ({ createBlog, onCancel }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default BlogForm;
