import axios from 'axios';
import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/posts', {
        title,
        content,
      });
      console.log('Post created successfully:', response.data);
    } catch (err) {
      // Handle and display error
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Create Post</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreatePost;
