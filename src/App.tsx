import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DailyTracker from './components/DailyTracker';
import ExerciseClasses from './components/ExerciseClasses';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import CalendarView from './components/CalendarView';
import BlogSection from './components/BlogSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExerciseDetail from './components/ExerciseDetail';
import ExerciseList from './components/ExerciseList';
import Login from './components/Login';
import Signup from './components/Signup';
import BlogPostDetail from './components/BlogPost';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading assets/data
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-FITZY-dark text-white">
          {!isLoaded ? (
            <div className="fixed inset-0 flex items-center justify-center bg-FITZY-dark">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-FITZY-teal/30 mb-4" />
                <div className="text-xl text-white">Loading...</div>
              </div>
            </div>
          ) : (
            <>
              <Navbar />
              <main>
                <Routes>
                  {/* Home Page */}
                  <Route path="/" element={
                    <>
                      <Hero />
                      <DailyTracker />
                      <ExerciseClasses />
                      <CalendarView />
                      <BlogSection />
                    </>
                  } />

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Exercise Routes */}
                  <Route path="/exercise/:id" element={<ExerciseDetail />} />
                  <Route path="/exercises/:category" element={<ExerciseList />} />
                  <Route path="/exercises/:category/:exerciseId" element={<ExerciseDetail />} />

                  {/* Blog Routes */}
                  <Route path="/blog" element={<BlogSection />} />
                  <Route path="/blog/:id" element={<BlogPostDetail />} />
                  <Route path="/blog/tag/:tag" element={<BlogSection />} />

                  {/* 404 Page */}
                  <Route path="*" element={
                    <div className="flex flex-col items-center justify-center h-[80vh]">
                      <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                      <p className="text-gray-300 mb-8">
                        The page you are looking for doesn't exist or has been moved.
                      </p>
                      <a href="/" className="bg-FITZY-teal hover:bg-FITZY-teal/80 text-white py-2 px-4 rounded">
                        Go Home
                      </a>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
