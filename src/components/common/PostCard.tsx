import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, Typography, IconButton, Box, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { styled } from '@mui/system';

// --- Styled Components ---

const StyledCard = styled(Card)({
  marginBottom: '20px',
  borderRadius: '8px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
  backgroundColor: '#ffffff',
});

const PostHeaderTypography = styled(Typography)({
  fontWeight: 600,
  fontSize: '0.9rem',
});

const PostTimeTypography = styled(Typography)({
  fontSize: '0.75rem',
  color: '#65676b',
});

const PostContentTypography = styled(Typography)({
  fontSize: '0.9rem',
  marginBottom: '10px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

const PostMediaContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '500px', // Example max height
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f0f2f5',
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '8px 12px',
  borderRadius: '6px',
  color: '#65676b',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  '& svg': {
    fontSize: '1.25rem',
    marginRight: '4px',
  },
}));

const ActionsBar = styled(CardActions)({
  padding: '0 12px 8px 12px',
  borderTop: '1px solid #f0f2f5',
  marginTop: '8px',
});

const ReactionStats = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 12px',
  marginBottom: '8px',
  fontSize: '0.8rem',
  color: '#65676b',
});

// --- Types ---

interface Post {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  content: string;
  mediaUrl?: string; // Optional URL for image/video
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: Post;
}

// --- Component ---

const PostCard: React.FC<PostCardProps> = ({ post }) => {

  const renderMedia = () => {
    if (!post.mediaUrl) return null;
    // Basic rendering assuming it's an image
    return (
      <PostMediaContainer>
        <img src={post.mediaUrl} alt="Post media" />
      </PostMediaContainer>
    );
  };

  return (
    <StyledCard>
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar src={post.author.avatarUrl} alt={post.author.name} />
        }
        action={
          <IconButton aria-label="settings" size="small">
            <MoreVertIcon />
          </IconButton>
        }
        title={<PostHeaderTypography>{post.author.name}</PostHeaderTypography>}
        subheader={<PostTimeTypography>{post.timestamp} · 🌍</PostTimeTypography>}
        sx={{ paddingBottom: '12px' }}
      />

      {/* Content */}
      <CardContent sx={{ paddingTop: 0, paddingBottom: 0, paddingX: '12px' }}>
        <PostContentTypography>
          {post.content}
        </PostContentTypography>
      </CardContent>

      {/* Media */}
      {renderMedia()}

      {/* Stats (Likes/Comments/Shares Count) */}
      <ReactionStats>
        <Box display="flex" alignItems="center">
          {/* Simple Like Icon display */}
          <Typography component="span" sx={{ fontSize: 'inherit', marginLeft: '4px' }}>
            {post.likes > 0 && `❤️ ${post.likes}`}
          </Typography>
        </Box>
        <Box>
          <Typography component="span" sx={{ fontSize: 'inherit', marginRight: '8px' }}>
            {post.comments} Comments
          </Typography>
          <Typography component="span" sx={{ fontSize: 'inherit' }}>
            {post.shares} Shares
          </Typography>
        </Box>
      </ReactionStats>

      {/* Actions (Like, Comment, Share Buttons) */}
      <ActionsBar>
        <Grid container justifyContent="space-around">
          <Grid item xs={4} display="flex" justifyContent="center">
            <ActionButton disableRipple>
              <ThumbUpIcon />
              <Typography variant="caption" component="span" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>Like</Typography>
            </ActionButton>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center">
            <ActionButton disableRipple>
              <ChatBubbleOutlineIcon />
              <Typography variant="caption" component="span" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>Comment</Typography>
            </ActionButton>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="center">
            <ActionButton disableRipple>
              <ShareOutlinedIcon />
              <Typography variant="caption" component="span" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>Share</Typography>
            </ActionButton>
          </Grid>
        </Grid>
      </ActionsBar>
    </StyledCard>
  );
};

export default PostCard;