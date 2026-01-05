import axios from 'axios';
import { UserProfile, UserSearch, FriendsList, MutualFriends } from '../types/user';

const API_BASE_URL = 'http://localhost:3000/api/users'; // Adjust based on your actual backend URL

/**
 * Fetches the profile details for a specific user ID.
 * @param userId - The ID of the user to fetch the profile for.
 * @returns A promise that resolves to the UserProfile object.
 */
export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const response = await axios.get<UserProfile>(`${API_BASE_URL}/${userId}/profile`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile for ID ${userId}:`, error);
    // You might want to throw a custom error or handle it based on your application's error strategy
    throw new Error('Failed to fetch user profile.');
  }
};

/**
 * Searches for users based on a query string (e.g., name, email).
 * @param query - The search string.
 * @returns A promise that resolves to an array of UserSearch results.
 */
export const searchUsers = async (query: string): Promise<UserSearch[]> => {
  try {
    const response = await axios.get<UserSearch[]>(`${API_BASE_URL}/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching users with query "${query}":`, error);
    throw new Error('Failed to perform user search.');
  }
};

/**
 * Fetches the list of friends for a specific user.
 * @param userId - The ID of the user whose friends list is requested.
 * @returns A promise that resolves to an array of FriendsList items.
 */
export const getFriendsList = async (userId: string): Promise<FriendsList[]> => {
  try {
    const response = await axios.get<FriendsList[]>(`${API_BASE_URL}/${userId}/friends`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching friends list for user ID ${userId}:`, error);
    throw new Error('Failed to fetch friends list.');
  }
};

/**
 * Fetches the list of mutual friends between the current user and another specified user.
 * Assumes the current user ID is handled via authentication/context, or passed explicitly if required by the backend.
 * For simplicity here, we assume the backend identifies the current user via headers (e.g., Authorization header).
 * @param targetUserId - The ID of the other user to check mutual friends with.
 * @returns A promise that resolves to an array of MutualFriends results.
 */
export const getMutualFriends = async (targetUserId: string): Promise<MutualFriends[]> => {
  try {
    // In a real application, you'd likely include an Authorization header here.
    const response = await axios.get<MutualFriends[]>(`${API_BASE_URL}/mutual-friends/${targetUserId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching mutual friends with user ID ${targetUserId}:`, error);
    throw new Error('Failed to fetch mutual friends.');
  }
};

/**
 * Sends a friend request to a target user.
 * @param targetUserId - The ID of the user to send the request to.
 * @returns A promise that resolves upon successful request submission.
 */
export const sendFriendRequest = async (targetUserId: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/friends/request/${targetUserId}`);
  } catch (error) {
    console.error(`Error sending friend request to user ID ${targetUserId}:`, error);
    throw new Error('Failed to send friend request.');
  }
};

/**
 * Accepts a pending friend request from a specific user.
 * @param requestId - The ID of the friend request or the ID of the user who sent the request.
 * @returns A promise that resolves upon successful acceptance.
 */
export const acceptFriendRequest = async (requestingUserId: string): Promise<void> => {
    try {
        // Assuming the backend endpoint accepts the ID of the user whose request is being accepted
        await axios.post(`${API_BASE_URL}/friends/accept/${requestingUserId}`);
    } catch (error) {
        console.error(`Error accepting friend request from user ID ${requestingUserId}:`, error);
        throw new Error('Failed to accept friend request.');
    }
};

/**
 * Unfriends a user.
 * @param friendId - The ID of the user to unfriend.
 * @returns A promise that resolves upon successful unfriending.
 */
export const unfriendUser = async (friendId: string): Promise<void> => {
  try {
    // Using DELETE for resource modification (relationship removal)
    await axios.delete(`${API_BASE_URL}/friends/${friendId}`);
  } catch (error) {
    console.error(`Error unfriending user ID ${friendId}:`, error);
    throw new Error('Failed to unfriend user.');
  }
};

// Note: Ensure that `src/types/user.ts` defines UserProfile, UserSearch, FriendsList, and MutualFriends interfaces
// for proper type checking.