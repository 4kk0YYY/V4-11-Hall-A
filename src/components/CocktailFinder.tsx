import { type FC, useState, useEffect, useMemo } from 'react'
import type { Cocktail, FavoritesState } from '../types'
import { CATEGORIES } from '../types'
import { loadCocktails } from '../data/cocktails'
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

type CategoryKey = keyof typeof CATEGORIES;

const CocktailFinder: FC = () => {
    const [cocktails, setCocktails] = useState<Array<Cocktail>>([])
    const [activeCategory, setActiveCategory] = useState<keyof typeof CATEGORIES>("Spirits");
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [favorites, setFavorites] = useState<FavoritesState>({ items: [] })
    const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    // 加载配方数据
    useEffect(() => {
        const data = loadCocktails()
        setCocktails(data)
    }, [])

    // 加载收藏数据
    useEffect(() => {
        const savedFavorites = localStorage.getItem('cocktailFavorites')
        if (savedFavorites) {
            try {
                const parsed = JSON.parse(savedFavorites)
                const validFavorites: FavoritesState = {
                    items: parsed.items.map((item: any) => ({
                        id: Number(item.id),
                        addedAt: Number(item.addedAt)
                    }))
                }
                setFavorites(validFavorites)
            } catch (error) {
                console.error('Error parsing favorites:', error)
            }
        }
    }, [])

    // 保存收藏
    const saveFavorites = (newFavorites: FavoritesState): void => {
        localStorage.setItem('cocktailFavorites', JSON.stringify(newFavorites))
        setFavorites(newFavorites)
    }

    // 切换收藏状态
    const toggleFavorite = (cocktailId: number): void => {
        const newFavorites: FavoritesState = {
            items: favorites.items.some(item => item.id === cocktailId)
                ? favorites.items.filter(item => item.id !== cocktailId)
                : [...favorites.items, { id: cocktailId, addedAt: Date.now() }]
        }
        saveFavorites(newFavorites)
    }

    // 检查是否已收藏
    const isFavorited = (cocktailId: number): boolean => {
        return favorites.items.some(item => item.id === cocktailId)
    }

    // 匹配配方
    // 修改 matchedCocktails 部分代码
    const matchedCocktails = useMemo(() => {
        // 先处理收藏夹的情况
        if (showOnlyFavorites) {
            return cocktails
                .filter(cocktail => isFavorited(cocktail.id))
        }

        // 如果没有选择任何原料，返回空数组
        if (selectedIngredients.length === 0) {
            return []
        }

        // 如果选择了原料，进行匹配
        return cocktails
            .filter(cocktail =>
                selectedIngredients.every(ingredient =>
                    cocktail.ingredients.some(i =>
                        i.name.toLowerCase().includes(ingredient.toLowerCase())
                    )
                )
            )
    }, [cocktails, selectedIngredients, favorites.items, showOnlyFavorites])

    // 切换原料选择
    const toggleIngredient = (ingredient: string): void => {
        setSelectedIngredients((prev: Array<string>) =>
            prev.includes(ingredient)
                ? prev.filter((item: string): boolean => item !== ingredient)
                : [...prev, ingredient]
        )
    }

    // 更新过滤逻辑
const filteredItems = useMemo(() => {
    const currentCategory = CATEGORIES[activeCategory];
    if (!searchTerm) {
        return currentCategory.items;
    }
    const searchLower = searchTerm.toLowerCase();
    return currentCategory.items.filter((item) => 
        item.toLowerCase().includes(searchLower)
    ) as string[];
}, [searchTerm, activeCategory]);

    // 添加分类按钮渲染函数
    const renderCategoryButtons = () => {
        return (Object.keys(CATEGORIES) as CategoryKey[]).map((key) => (
            <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1 rounded-full transition-all transform hover:scale-105 ${
                    activeCategory === key
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
                {CATEGORIES[key].title}
            </button>
        ))
    }

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    return (
        <div className="w-full max-w-4xl mx-auto dark:bg-gray-900 transition-colors duration-200">
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? '🌞' : '🌙'}
                </button>
            </div>

            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">
                    Time to mix drinks and change lives.
                </h1>
            </div>

            <Card className="w-full backdrop-blur-sm bg-white/80 shadow-xl mb-4">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Cocktail Recipe Finder</span>
                        <button
                            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                            className={`p-2 rounded-lg transition-colors ${showOnlyFavorites ? 'bg-red-100 text-red-600 shadow-md' : 'bg-gray-100'
                                }`}
                        >
                            {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
                        </button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* 搜索框 */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search ingredients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* 分类标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {renderCategoryButtons()}
                    </div>

                    {/* 原料标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {filteredItems.map((ingredient: string) => (
                            <button
                                key={ingredient}
                                onClick={() => toggleIngredient(ingredient)}
                                className={`px-3 py-1 rounded-full transition-all transform hover:scale-105 ${
                                    selectedIngredients.includes(ingredient)
                                        ? "bg-green-500 text-white shadow-md"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {ingredient}
                            </button>
                        ))}
                    </div>

                    {/* 已选择的原料 */}
                    {selectedIngredients.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Selected Ingredients:</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedIngredients.map((ingredient) => (
                                    <span
                                        key={ingredient}
                                        className="px-3 py-1 bg-green-100 rounded-full flex items-center shadow-sm"
                                    >
                                        {ingredient}
                                        <button
                                            onClick={() => toggleIngredient(ingredient)}
                                            className="ml-2 text-gray-500 hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 匹配的鸡尾酒列表 */}
            <div className="space-y-4">
                {matchedCocktails.map((cocktail) => (
                    <Card key={cocktail.id} className="backdrop-blur-sm bg-white/90 shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <div>
                                    <span className="text-xl">{cocktail.name}</span>
                                    <span className="text-sm text-gray-500 ml-2">
                                        {cocktail.englishName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => toggleFavorite(cocktail.id)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        {isFavorited(cocktail.id) ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* 配料 */}
                                <div>
                                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {cocktail.ingredients.map(({ name, amount }, index) => (
                                            <span
                                                key={`${name}-${index}`}
                                                className={`px-3 py-1 rounded-full ${selectedIngredients.includes(name)
                                                        ? "bg-green-100 shadow-sm"
                                                        : "bg-gray-100"
                                                    }`}
                                            >
                                                {name} ({amount})
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 描述 */}
                                {cocktail.description && (
                                    <p className="text-gray-600">{cocktail.description}</p>
                                )}

                                {/* 制作方法 */}
                                <div>
                                    <h4 className="font-semibold mb-2">Instructions:</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <pre className="whitespace-pre-wrap font-sans">
                                            {cocktail.method}
                                        </pre>
                                    </div>
                                </div>

                                {/* 装饰 */}
                                {cocktail.garnish && (
                                    <div>
                                        <h4 className="font-semibold mb-2">Garnish:</h4>
                                        <p>{cocktail.garnish}</p>
                                    </div>
                                )}

                                {/* 杯型和难度 */}
                                <div className="flex items-center gap-4">
                                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                                        {cocktail.glass}
                                    </span>
                                    <span className={`px-2 py-1 rounded shadow-sm ${cocktail.difficulty === "Easy"
                                            ? "bg-green-100 text-green-800"
                                            : cocktail.difficulty === "Medium"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                        }`}>
                                        {cocktail.difficulty}
                                    </span>
                                </div>

                                {/* 教程链接 */}
                                {cocktail.tutorials && cocktail.tutorials.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-2">Video Tutorials:</h4>
                                        <div className="space-y-2">
                                            {cocktail.tutorials.map((tutorial, index) => (
                                                <a
                                                    key={`${tutorial.url}-${index}`}
                                                    href={tutorial.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                                                >
                                                    <span className={`text-lg ${tutorial.platform === "bilibili"
                                                            ? "text-pink-500"
                                                            : "text-red-500"
                                                        }`}>
                                                        {tutorial.platform === "bilibili" ? "📺" : "📱"}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="font-medium group-hover:text-blue-500 transition-colors">
                                                            {tutorial.title}
                                                        </div>
                                                        {tutorial.author && (
                                                            <div className="text-sm text-gray-500">
                                                                by {tutorial.author}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                                                        ↗️
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default CocktailFinder