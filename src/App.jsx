import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  // ✅ Handle Login
  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)); // Save to Local Storage
      blogService.setToken(user.token); // Set token for blog requests
      setUser(user);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser'); // Clear Local Storage
    setUser(null);
  };

  // ✅ Conditional Rendering
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  // ✅ Logged-in View
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
