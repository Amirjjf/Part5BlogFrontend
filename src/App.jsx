import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable'; // ✅ Import Togglable

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef(); // ✅ Reference to control Togglable component

  // ✅ Check Local Storage on Component Mount
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // ✅ Fetch Blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // ✅ Show Notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // ✅ Handle Login
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      showNotification(`Welcome, ${user.name}!`, 'success');
    } catch (error) {
      showNotification('Wrong username or password', 'error');
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    showNotification('Logged out successfully', 'success');
  };

  // ✅ Handle Blog Creation
  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      showNotification(`Added "${returnedBlog.title}" by ${returnedBlog.author}`, 'success');

      blogFormRef.current.toggleVisibility(); // ✅ Hide form after success
    } catch (error) {
      showNotification('Failed to add blog', 'error');
    }
  };

  // ✅ Conditional Rendering
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && <Notification message={notification.message} type={notification.type} />}
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  // ✅ Logged-in View
  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <h2>Create New Blog</h2>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} onCancel={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
