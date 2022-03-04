import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './projectPages/SignUpPage';
import LoginPage from './projectPages/LoginPage';
import CreateNewPostPage from './projectPages/CreateNewPostPage';
import SinglePostPage from './projectPages/SinglePostPage';
import EditPostPage from './projectPages/EditPostPage';
import LandingPage from './projectPages/LandingPage';
import MyPostsPage from './projectPages/MyPostsPage';
import ExplorePage from './projectPages/ExplorePage';
import MyAccountPage from './projectPages/MyAccountPage';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create" element={<CreateNewPostPage />} />
            <Route path="/blogpost/edit/:id" element={<EditPostPage />} />
            <Route path="/blogpost:id" element={<SinglePostPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/myposts" element={<MyPostsPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
        </Routes>
    </Router>
  );
}

export default App;
