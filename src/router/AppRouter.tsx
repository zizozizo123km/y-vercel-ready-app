import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home/Home';
import Profile from '../pages/profile/Profile';
import Watch from '../pages/watch/Watch';
import Marketplace from '../pages/marketplace/Marketplace';
import Groups from '../pages/groups/Groups';
import Gaming from '../pages/gaming/Gaming';
import Layout from '../layout/Layout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import Friends from '../pages/friends/Friends';
import Notifications from '../pages/notifications/Notifications';
import Messages from '../pages/messages/Messages';
import Settings from '../pages/settings/Settings';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Accessible without login, but redirects if logged in) */}
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes (Requires authentication) */}
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Catch-all route for 404 - optional, depending on project needs */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;