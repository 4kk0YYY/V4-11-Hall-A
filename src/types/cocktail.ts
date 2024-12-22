import type { Cocktail, Ingredient } from '../types'
import cocktailsJson from './cocktails.json'

// 确保导入的数据符合类型定义
const cocktailsData = (cocktailsJson as unknown) as Cocktail[]

// 加载所有配方
export const loadCocktails = (): Cocktail[] => {
    return cocktailsData
}

// 根据ID获取配方
export const getCocktail = (id: number): Cocktail | undefined => {
    return cocktailsData.find((c: Cocktail) => c.id === id)
}

// 根据原料筛选配方
export const getCocktailsByIngredient = (ingredient: string): Cocktail[] => {
    return cocktailsData.filter((cocktail: Cocktail) =>
        cocktail.ingredients.some((i: Ingredient) => i.name === ingredient)
    )
}

// 根据难度筛选配方
export const getCocktailsByDifficulty = (difficulty: "Easy" | "Medium" | "Hard"): Cocktail[] => {
    return cocktailsData.filter((cocktail: Cocktail) => cocktail.difficulty === difficulty)
}

// 根据分类筛选配方
export const getCocktailsByCategory = (category: string): Cocktail[] => {
    return cocktailsData.filter((cocktail: Cocktail) => cocktail.category === category)
}

// 搜索配方
export const searchCocktails = (query: string): Cocktail[] => {
    const lowerQuery = query.toLowerCase()
    return cocktailsData.filter((cocktail: Cocktail) =>
        cocktail.name.toLowerCase().includes(lowerQuery) ||
        cocktail.ingredients.some((i: Ingredient) =>
            i.name.toLowerCase().includes(lowerQuery)
        )
    )
}