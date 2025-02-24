import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification'; // ✅ Import Notification

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null); // ✅ State for notifications

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
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  // ✅ Show Notifications
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Show for 5 seconds
  };

  // ✅ Handle Login
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)); // Save to Local Storage
      blogService.setToken(user.token); // Set token for blog requests
      setUser(user);
      showNotification(`Welcome, ${user.name}!`, 'success'); // ✅ Success message
    } catch (error) {
      showNotification('Wrong username or password', 'error'); // ✅ Error message
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser'); // Clear Local Storage
    setUser(null);
    showNotification('Logged out successfully', 'success'); // ✅ Success message
  };

  // ✅ Handle Blog Creation
  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog)); // Update the blog list
      showNotification(`Added "${returnedBlog.title}" by ${returnedBlog.author}`, 'success'); // ✅ Success message
    } catch (error) {
      showNotification('Failed to add blog', 'error'); // ✅ Error message
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
      <BlogForm createBlog={addBlog} />

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
