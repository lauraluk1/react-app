// src/api/api.js
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL;

export const fetchPosts = async () => {
  try {
    const response = await axios.get('/routes/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Function to create a new post
export const createPost = async (post) => {
  try {
    const response = await fetch(`/routes/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error; // Propagate error to be handled by the caller
  }
};
