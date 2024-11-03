import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Post = {
  id: number;
  username: string;
  timeAgo: string;
  title: string;
  content: string;
  avatar: string;
  comments: Comment[];
};

type Comment = {
  id: number;
  username: string;
  timeAgo: string;
  content: string;
  avatar: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    username: 'azeiopkdn',
    timeAgo: '1h',
    title: 'I am overwhelmed, I want to stop school, I feel like I am good at nothing.',
    content: 'I enrolled in 5 classes; after all my 5 classes midterm I only have one class that I am currently passing',
    avatar: '👴',
    comments: [],
  },
  // Add more posts here
];

const TalkingPlatformPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [commentContent, setCommentContent] = useState('');
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    document.documentElement.classList.toggle('dark', darkModePreference);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
    document.documentElement.classList.toggle('dark', newDarkModeState);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchQuery(''); // Reset search query when toggling
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePostSubmit = () => {
    if (newPost.title && newPost.content) {
      const newPostData: Post = {
        id: posts.length + 1,
        username: 'currentUser', // Replace with actual username
        timeAgo: 'Just now',
        title: newPost.title,
        content: newPost.content,
        avatar: '👤', // Replace with actual avatar
        comments: [],
      };
      setPosts([newPostData, ...posts]);
      setNewPost({ title: '', content: '' });
      setShowPostModal(false);
    }
  };

  const handleCommentSubmit = (postId: number) => {
    if (commentContent) {
      const newComment: Comment = {
        id: posts.find(post => post.id === postId)?.comments.length! + 1,
        username: 'currentUser', // Replace with actual username
        timeAgo: 'Just now',
        content: commentContent,
        avatar: '👤', // Replace with actual avatar
      };
      setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post));
      setCommentContent('');
      setActivePostId(null);
    }
  };
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
  setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
      <button onClick={toggleMenu}>
        <span className="text-2xl">☰</span> {/* Menu icon */}
      </button>

        <h1 className="text-xl font-semibold">Talking Platform</h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleSearch}>
            <span className="text-2xl">🔍</span> {/* Search icon */}
          </button>
          <button onClick={() => navigate('/user-settings')}>
            <span className="text-2xl">👤</span> {/* Profile icon */}
          </button>

        </div>
      </div>

      {/* Search Input Box */}
      {showSearch && (
        <div className="p-4 bg-gray-200 dark:bg-gray-700">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 rounded-md outline-none dark:text-gray-200"
          />
        </div>
      )}

      {showMenu && (
        <div className="absolute top-12 left-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg w-48 p-2 z-50">
          <button
            onClick={() => {
              navigate('/help');
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Ask for Help
          </button>
          <button
            onClick={() => {
              navigate('/personal-friend');
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Talk with my Friend
          </button>
        </div>
      )}


      {/* Posts Feed */}
      <div className="flex-grow p-4 space-y-6 overflow-y-auto">
        {posts
          .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            {/* User Info */}
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{post.avatar}</span>
              <span className="font-semibold">{post.username}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">{post.timeAgo}</span>
            </div>

            {/* Post Content */}
            <h2 className="font-bold text-lg mb-1">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{post.content}</p>

            {/* Interaction Buttons */}
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full">
                ❤️
              </button>
              <button
                className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full"
                onClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
              >
                💬
              </button>
            </div>

            {/* Comment Section */}
            {activePostId === post.id && (
              <div className="mt-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start mb-2">
                    <span className="text-xl mr-2">{comment.avatar}</span>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">{comment.username}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">{comment.timeAgo}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="flex-grow px-4 py-2 mr-4 bg-gray-200 dark:bg-gray-600 rounded-full outline-none"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full flex justify-between px-8 py-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 z-40">
        <button onClick={() => navigate('/main')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl">🏠</button>
        <button onClick={() => setShowPostModal(!showPostModal)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl">📝</button>
        <button onClick={toggleNotifications} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300         text-3xl">🔔</button>
        <button onClick={toggleDarkMode} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl">🌙</button>
      </div>

      {/* Notifications Box */}
      {showNotifications && (
        <div className="fixed top-16 right-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg w-80 p-4 z-50">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Notifications</h2>
          <ul className="space-y-3">
            <li className="text-gray-600 dark:text-gray-300">New comment on your post</li>
            <li className="text-gray-600 dark:text-gray-300">User liked your post</li>
            <li className="text-gray-600 dark:text-gray-300">New follower</li>
          </ul>
          <button
            onClick={toggleNotifications}
            className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 text-xl"
          >
            ✖️
          </button>
        </div>
      )}

      {/* Post Creation Modal */}
      {showPostModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Create a Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-2 mb-2 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded-md outline-none"
            />
            <textarea
              placeholder="Share your thoughts..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-2 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded-md outline-none"
              rows={3}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setShowPostModal(false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                Cancel
              </button>
              <button onClick={handlePostSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalkingPlatformPage;

