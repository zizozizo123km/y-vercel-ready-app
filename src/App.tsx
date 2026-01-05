import React, { useState } from 'react';
import './App.css'; // Assume you have some basic styling here

// --- Components ---

interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

interface Post {
  id: number;
  user: User;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  user: User;
  text: string;
  timestamp: string;
}

// Dummy Data
const currentUser: User = {
  id: 1,
  name: "محمد الأحمد",
  avatarUrl: 'https://via.placeholder.com/150/0000FF/808080?text=MA',
};

const dummyUsers: User[] = [
  currentUser,
  { id: 2, name: "فاطمة الزهراء", avatarUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=FZ' },
  { id: 3, name: "علي الخالد", avatarUrl: 'https://via.placeholder.com/150/00FF00/000000?text=AK' },
];

const initialPosts: Post[] = [
  {
    id: 101,
    user: dummyUsers[1],
    timestamp: "منذ 5 دقائق",
    content: "يا له من يوم جميل! الشمس ساطعة والقهوة مثالية. أتمنى لكم يوماً سعيداً جميعاً. #صباح_الخير",
    likes: 15,
    comments: [
      { id: 1, user: dummyUsers[0], text: "بالتأكيد! صباح النور.", timestamp: "منذ 4 دقائق" }
    ]
  },
  {
    id: 102,
    user: dummyUsers[2],
    timestamp: "منذ ساعة",
    content: "لقد انتهيت للتو من مشروع برمجي جديد. أرسلوا لي آراءكم!",
    imageUrl: 'https://via.placeholder.com/600x400?text=Coding+Project',
    likes: 42,
    comments: [
      { id: 2, user: dummyUsers[1], text: "مدهش! تهانينا.", timestamp: "منذ 30 دقيقة" },
      { id: 3, user: dummyUsers[0], text: "سألقي نظرة عليه قريباً.", timestamp: "منذ 10 دقائق" }
    ]
  }
];

// Helper components
const Avatar: React.FC<{ user: User; size?: string }> = ({ user, size = '40px' }) => (
  <img
    src={user.avatarUrl}
    alt={user.name}
    style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
    className="avatar"
  />
);

// --- Navbar (شريط التنقل) ---
const Navbar: React.FC = () => (
  <header className="navbar">
    <div className="navbar-left">
      <h1 className="logo">facebook</h1>
    </div>
    <div className="navbar-center">
      {/* Navigation Icons (Home, Watch, Marketplace, etc.) */}
      <div className="nav-icon active" title="الرئيسية"><i className="fas fa-home"></i></div>
      <div className="nav-icon" title="الفيديوهات"><i className="fas fa-tv"></i></div>
      <div className="nav-icon" title="المجموعات"><i className="fas fa-users"></i></div>
    </div>
    <div className="navbar-right">
      <div className="nav-profile">
        <Avatar user={currentUser} size="30px" />
        <span>{currentUser.name.split(' ')[0]}</span>
      </div>
      <div className="nav-icon" title="القائمة"><i className="fas fa-th"></i></div>
      <div className="nav-icon" title="المحادثات"><i className="fas fa-comment-dots"></i></div>
      <div className="nav-icon" title="الإشعارات"><i className="fas fa-bell"></i></div>
    </div>
  </header>
);

// --- Sidebar (الشريط الجانبي) ---
const Sidebar: React.FC = () => (
  <aside className="sidebar left-sidebar">
    <div className="sidebar-item profile-item">
      <Avatar user={currentUser} size="30px" />
      <span>{currentUser.name}</span>
    </div>
    <div className="sidebar-item"><i className="fas fa-user-friends"></i><span>الأصدقاء</span></div>
    <div className="sidebar-item"><i className="fas fa-store"></i><span>المتجر</span></div>
    <div className="sidebar-item"><i className="fas fa-users"></i><span>المجموعات</span></div>
    <div className="sidebar-item"><i className="fas fa-clock"></i><span>الذكريات</span></div>
    <div className="sidebar-item"><i className="fas fa-bookmark"></i><span>المحفوظات</span></div>
    <hr />
    <h4>اختصاراتك</h4>
    <div className="sidebar-item"><i className="fas fa-dumbbell"></i><span>نادي اللياقة</span></div>
  </aside>
);

const RightSidebar: React.FC = () => (
    <aside className="sidebar right-sidebar">
        <h4>جهات الاتصال</h4>
        <div className="contact-list">
            {dummyUsers.slice(1).map(user => (
                <div key={user.id} className="contact-item">
                    <Avatar user={user} size="30px" />
                    <span>{user.name}</span>
                    <span className="online-dot"></span>
                </div>
            ))}
        </div>
        <hr />
        <h4>المناسبات</h4>
        <div className="sidebar-item"><i className="fas fa-birthday-cake"></i><span>اليوم عيد ميلاد!</span></div>
    </aside>
);


// --- Post Creation (إنشاء منشور) ---
const PostCreator: React.FC<{ onPostCreated: (post: Post) => void }> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      user: currentUser,
      timestamp: "الآن",
      content: content.trim(),
      likes: 0,
      comments: []
    };

    onPostCreated(newPost);
    setContent('');
  };

  return (
    <div className="post-creator card">
      <div className="creator-header">
        <Avatar user={currentUser} />
        <textarea
          placeholder={`بماذا تفكر يا ${currentUser.name.split(' ')[0]}؟`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <hr />
      <div className="creator-footer">
        <button className="creator-button" onClick={handleSubmit} disabled={!content.trim()}>
          <i className="fas fa-pen"></i> نشر
        </button>
        <button className="creator-button photo">
          <i className="fas fa-images"></i> صورة / فيديو
        </button>
      </div>
    </div>
  );
};

// --- Post Component (المنشور) ---

interface PostFooterProps {
    post: Post;
    onLikeToggle: (postId: number) => void;
    onCommentSubmit: (postId: number, text: string) => void;
}

const PostFooter: React.FC<PostFooterProps> = ({ post, onLikeToggle, onCommentSubmit }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleLike = () => {
        setIsLiked(!isLiked);
        onLikeToggle(post.id);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onCommentSubmit(post.id, commentText);
            setCommentText('');
        }
    };

    return (
        <div className="post-footer">
            <div className="post-stats">
                {post.likes > 0 && <span><i className="fas fa-thumbs-up like-icon"></i> {post.likes}</span>}
                <span>{post.comments.length} تعليق</span>
            </div>

            <div className="post-actions">
                <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                    <i className={isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i> إعجاب
                </button>
                <button className="action-btn">
                    <i className="far fa-comment-alt"></i> تعليق
                </button>
                <button className="action-btn">
                    <i className="fas fa-share"></i> مشاركة
                </button>
            </div>

            <div className="post-comments-section">
                {post.comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <Avatar user={comment.user} size="28px" />
                        <div className="comment-body">
                            <strong>{comment.user.name}</strong>
                            <p>{comment.text}</p>
                            <small>{comment.timestamp}</small>
                        </div>
                    </div>
                ))}

                <form className="comment-input-form" onSubmit={handleCommentSubmit}>
                    <Avatar user={currentUser} size="28px" />
                    <input
                        type="text"
                        placeholder="اكتب تعليقاً..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button type="submit" style={{ display: 'none' }} />
                </form>
            </div>
        </div>
    );
};

const PostItem: React.FC<{ post: Post; updatePost: (updatedPost: Post) => void }> = ({ post, updatePost }) => {

    const handleLikeToggle = (postId: number) => {
        const isLiked = post.user.id === currentUser.id && post.likes === post.likes + 1; // Simplistic check
        const newLikes = isLiked ? post.likes - 1 : post.likes + 1;
        updatePost({ ...post, likes: newLikes });
    };

    const handleCommentSubmit = (postId: number, text: string) => {
        const newComment: Comment = {
            id: Date.now(),
            user: currentUser,
            text,
            timestamp: "الآن"
        };
        updatePost({
            ...post,
            comments: [...post.comments, newComment]
        });
    };

  return (
    <div className="post-item card">
      <div className="post-header">
        <Avatar user={post.user} />
        <div className="post-info">
          <strong>{post.user.name}</strong>
          <small>{post.timestamp} · <i className="fas fa-globe-asia"></i></small>
        </div>
        <i className="fas fa-ellipsis-h post-menu-icon"></i>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="post-image" />}
      </div>
      <PostFooter post={post} onLikeToggle={handleLikeToggle} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

// --- Main App (التطبيق الرئيسي) ---
const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  return (
    <div className="app-container rtl">
      <Navbar />
      <main className="main-content">
        <Sidebar />
        <div className="feed-container">
          {/* Stories Placeholder */}
          <div className="stories-bar card">
            <h2>القصص</h2>
            <p>مكان لعرض قصص الأصدقاء...</p>
          </div>

          <PostCreator onPostCreated={addPost} />

          <div className="feed">
            {posts.map(post => (
              <PostItem key={post.id} post={post} updatePost={updatePost} />
            ))}
          </div>
        </div>
        <RightSidebar />
      </main>
    </div>
  );
};

export default App;

// Note: In a real project, the corresponding 'App.css' would contain styles for a responsive Facebook clone layout, 
// using flexbox/grid for the main layout, RTL adjustments, and styling for the card components. 
// We are only generating the React code here.