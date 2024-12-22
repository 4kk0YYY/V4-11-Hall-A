import { Button } from "./ui/button";
import { Info, Home } from "lucide-react";

type PageType = 'home' | 'about';

interface NavigationProps {
    currentPage: PageType;
    onPageChange: (page: PageType) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
            <div className="max-w-4xl mx-auto px-4 py-2 flex justify-center space-x-4">
                <Button
                    variant={currentPage === 'home' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange('home')}
                    className="flex items-center space-x-2"
                >
                    <Home className="w-4 h-4" />
                    <span>主页</span>
                </Button>
                <Button
                    variant={currentPage === 'about' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange('about')}
                    className="flex items-center space-x-2"
                >
                    <Info className="w-4 h-4" />
                    <span>关于</span>
                </Button>
            </div>
        </div>
    );
};

export default Navigation;