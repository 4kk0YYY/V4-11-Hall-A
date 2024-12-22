import { useState } from 'react';
import CocktailFinder from './components/CocktailFinder';
import AboutPage from './components/AboutPage';
import Navigation from './components/Navigation';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pb-16"> {/* 添加底部 padding 为导航栏留出空间 */}
                {currentPage === 'home' ? (
                    <CocktailFinder />
                ) : (
                    <AboutPage />
                )}
            </main>
            <Navigation
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default App;