import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonAvatar, IonTextarea, IonItem, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonCol, IonRow, IonGrid } from '@ionic/react';
import { searchOutline, chatbubbleEllipsesOutline, home, peopleOutline, flagOutline, videocamOutline, notificationsOutline, menuOutline, thumbsUpOutline, heartOutline, sendOutline, shareOutline, ellipsisHorizontal, happyOutline, cameraOutline, micOutline, imageOutline, locationOutline, personAddOutline } from 'ionicons/icons';
import './FeedPage.css';

// Mock data for stories
const stories = [
    { id: 1, user: 'Your Story', avatar: 'https://via.placeholder.com/150/0000FF/808080?text=You', background: 'https://via.placeholder.com/300/A0A0A0/FFFFFF?text=Create+Story', isUser: true },
    { id: 2, user: 'Jessica A.', avatar: 'https://i.pravatar.cc/150?img=1', background: 'https://via.placeholder.com/300/FFA500/FFFFFF?text=Story+2' },
    { id: 3, user: 'Michael K.', avatar: 'https://i.pravatar.cc/150?img=2', background: 'https://via.placeholder.com/300/800080/FFFFFF?text=Story+3' },
    { id: 4, user: 'Sarah L.', avatar: 'https://i.pravatar.cc/150?img=3', background: 'https://via.placeholder.com/300/008080/FFFFFF?text=Story+4' },
    { id: 5, user: 'David W.', avatar: 'https://i.pravatar.cc/150?img=4', background: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Story+5' },
];

// Mock data for posts
const posts = [
    {
        id: 1,
        user: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/150?img=5',
        time: '5m ago',
        text: 'Just had an amazing time hiking today! The view from the top was breathtaking. ⛰️ #hiking #nature #adventure',
        image: 'https://via.placeholder.com/600x400/4682B4/FFFFFF?text=Hiking+View',
        likes: 125,
        comments: 32,
        shares: 10,
        reactionSummary: '👍 120, ❤️ 5',
    },
    {
        id: 2,
        user: 'Tech Enthusiast',
        avatar: 'https://i.pravatar.cc/150?img=6',
        time: '2h ago',
        text: 'New gadget unboxing coming soon! Stay tuned! 🚀',
        image: null,
        likes: 55,
        comments: 15,
        shares: 3,
        reactionSummary: '👍 50, 😮 5',
    },
    {
        id: 3,
        user: 'Food Lover',
        avatar: 'https://i.pravatar.cc/150?img=7',
        time: '6h ago',
        text: 'Best pasta I\'ve ever made! Recipe in the comments if anyone is interested. 🍝😋',
        image: 'https://via.placeholder.com/600x400/DAA520/FFFFFF?text=Delicious+Pasta',
        likes: 210,
        comments: 78,
        shares: 25,
        reactionSummary: '👍 150, ❤️ 60',
    },
];

// Reusable components

const StoryItem: React.FC<typeof stories[0]> = ({ user, avatar, background, isUser }) => (
    <div className={`story-item ${isUser ? 'user-story' : ''}`} style={{ backgroundImage: `url(${background})` }}>
        <div className="story-overlay">
            {isUser ? (
                <div className="add-story-icon-container">
                    <IonIcon icon={cameraOutline} className="add-story-icon" />
                </div>
            ) : (
                <IonAvatar className="story-avatar">
                    <img src={avatar} alt={`${user}'s avatar`} />
                </IonAvatar>
            )}
            <p className="story-user-name">{user}</p>
        </div>
    </div>
);

const PostHeader: React.FC<{ user: string; avatar: string; time: string }> = ({ user, avatar, time }) => (
    <div className="post-header ion-padding-horizontal">
        <div className="post-user-info">
            <IonAvatar className="post-avatar">
                <img src={avatar} alt={`${user}'s avatar`} />
            </IonAvatar>
            <div className="post-user-details">
                <IonCardTitle className="post-username">{user}</IonCardTitle>
                <IonCardSubtitle className="post-time">{time}</IonCardSubtitle>
            </div>
        </div>
        <IonButton fill="clear" color="medium" size="small">
            <IonIcon icon={ellipsisHorizontal} />
        </IonButton>
    </div>
);

const PostReactions: React.FC<{ reactionSummary: string; likes: number; comments: number; shares: number }> = ({ reactionSummary, likes, comments, shares }) => (
    <div className="post-reactions ion-padding-horizontal">
        <div className="reaction-summary">
            <div className="reaction-icons">
                {reactionSummary.split(', ').map((reaction, index) => {
                    const [icon, count] = reaction.split(' ');
                    const IconComponent = icon === '👍' ? thumbsUpOutline : icon === '❤️' ? heartOutline : null;
                    return IconComponent && (
                        <span key={index} className={`reaction-icon-chip ${icon === '👍' ? 'blue' : 'red'}`}>
                            <IonIcon icon={IconComponent} />
                        </span>
                    );
                })}
            </div>
            <p className="reaction-count">{likes.toLocaleString()}</p>
        </div>
        <div className="post-interactions">
            <p>{comments.toLocaleString()} Comments</p>
            <p>{shares.toLocaleString()} Shares</p>
        </div>
    </div>
);

const PostActions: React.FC = () => (
    <div className="post-actions">
        <IonRow className="ion-align-items-center">
            <IonCol size="4" className="action-col">
                <IonButton fill="clear" expand="block" color="medium">
                    <IonIcon slot="start" icon={thumbsUpOutline} />
                    <IonLabel>Like</IonLabel>
                </IonButton>
            </IonCol>
            <IonCol size="4" className="action-col">
                <IonButton fill="clear" expand="block" color="medium">
                    <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
                    <IonLabel>Comment</IonLabel>
                </IonButton>
            </IonCol>
            <IonCol size="4" className="action-col">
                <IonButton fill="clear" expand="block" color="medium">
                    <IonIcon slot="start" icon={shareOutline} />
                    <IonLabel>Share</IonLabel>
                </IonButton>
            </IonCol>
        </IonRow>
    </div>
);

const FeedPost: React.FC<typeof posts[0]> = (post) => (
    <IonCard className="feed-post ion-no-margin">
        <PostHeader user={post.user} avatar={post.avatar} time={post.time} />

        <IonCardContent className="post-content">
            <p>{post.text}</p>
        </IonCardContent>

        {post.image && (
            <div className="post-media">
                <img src={post.image} alt="Post media" />
            </div>
        )}

        <PostReactions 
            reactionSummary={post.reactionSummary} 
            likes={post.likes} 
            comments={post.comments} 
            shares={post.shares} 
        />
        
        <div className="divider" />
        
        <PostActions />
    </IonCard>
);

const CreatePostBar: React.FC = () => (
    <div className="create-post-bar ion-padding-horizontal">
        <IonRow className="ion-align-items-center ion-padding-vertical">
            <IonCol size="auto">
                <IonAvatar className="my-avatar">
                    <img src="https://via.placeholder.com/150/0000FF/808080?text=You" alt="My Avatar" />
                </IonAvatar>
            </IonCol>
            <IonCol>
                <IonItem lines="none" className="post-input-item">
                    <IonLabel position="stacked">What's on your mind?</IonLabel>
                    <IonTextarea placeholder="What's on your mind?" className="post-input"></IonTextarea>
                </IonItem>
            </IonCol>
        </IonRow>
        <div className="divider" />
        <IonRow className="post-options-row">
            <IonCol size="4">
                <IonButton fill="clear" expand="block" color="danger">
                    <IonIcon slot="start" icon={videocamOutline} />
                    Live
                </IonButton>
            </IonCol>
            <IonCol size="4">
                <IonButton fill="clear" expand="block" color="success">
                    <IonIcon slot="start" icon={imageOutline} />
                    Photo
                </IonButton>
            </IonCol>
            <IonCol size="4">
                <IonButton fill="clear" expand="block" color="warning">
                    <IonIcon slot="start" icon={personAddOutline} />
                    Room
                </IonButton>
            </IonCol>
        </IonRow>
    </div>
);

const StoriesSection: React.FC = () => (
    <div className="stories-section ion-padding-vertical">
        <div className="stories-container">
            {stories.map(story => (
                <StoryItem key={story.id} {...story} />
            ))}
        </div>
        <div className="divider" />
    </div>
);

const Tabs: React.FC = () => (
    <IonToolbar className="main-tabs-toolbar">
        <IonGrid className="ion-no-padding">
            <IonRow className="ion-align-items-center">
                <IonCol className="tab-col active">
                    <IonButton fill="clear" color="primary" expand="block">
                        <IonIcon icon={home} />
                    </IonButton>
                </IonCol>
                <IonCol className="tab-col">
                    <IonButton fill="clear" color="medium" expand="block">
                        <IonIcon icon={peopleOutline} />
                    </IonButton>
                </IonCol>
                <IonCol className="tab-col">
                    <IonButton fill="clear" color="medium" expand="block">
                        <IonIcon icon={flagOutline} />
                    </IonButton>
                </IonCol>
                <IonCol className="tab-col">
                    <IonButton fill="clear" color="medium" expand="block">
                        <IonIcon icon={videocamOutline} />
                    </IonButton>
                </IonCol>
                <IonCol className="tab-col">
                    <IonButton fill="clear" color="medium" expand="block">
                        <IonIcon icon={notificationsOutline} />
                    </IonButton>
                </IonCol>
                <IonCol className="tab-col">
                    <IonButton fill="clear" color="medium" expand="block">
                        <IonIcon icon={menuOutline} />
                    </IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    </IonToolbar>
);

const FeedPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="light" className="feed-header">
                    <IonTitle slot="start" className="facebook-title">facebook</IonTitle>
                    <IonButton slot="end" fill="clear" color="dark">
                        <IonIcon icon={searchOutline} />
                    </IonButton>
                    <IonButton slot="end" fill="clear" color="dark">
                        <IonIcon icon={chatbubbleEllipsesOutline} />
                        <IonChip color="danger" className="notification-badge">
                            9+
                        </IonChip>
                    </IonButton>
                </IonToolbar>
                <Tabs />
            </IonHeader>
            <IonContent fullscreen className="ion-padding-vertical feed-content-background">
                
                {/* Create Post Section */}
                <CreatePostBar />
                <div className="main-divider" />

                {/* Stories Section */}
                <StoriesSection />
                <div className="main-divider" />

                {/* Feed Posts */}
                {posts.map(post => (
                    <React.Fragment key={post.id}>
                        <FeedPost {...post} />
                        <div className="main-divider" />
                    </React.Fragment>
                ))}

                <div className="end-of-feed-message ion-text-center ion-padding">
                    <p>No more posts to show right now.</p>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default FeedPage;