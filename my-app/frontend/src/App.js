import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostList from './PostList';
import { createPost, fetchPosts } from './api';
import './styles.css';

const App = () => {
  const handleCreatePost = async (postData) => {
    try {
      await createPost(postData);
      // Optionally, refetch the posts or update state
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };
  
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch posts when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        setError('Failed to fetch posts');
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Blog</h1>
      </header>
      <main>
        <p>This is my blog built with React.</p>
      </main>
    </div>
      <PostForm onSubmit={handleCreatePost} />
      <div>
      <div className="App">
      <PostList /> {/* Render the PostList component */}
    </div>
    </div>
    </div>
  );
};

export default App;
