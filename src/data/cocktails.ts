import type { Cocktail, Ingredient } from '../types'
import cocktailsData from './cocktails.json'

// 确保类型正确
const cocktails = (cocktailsData as Cocktail[]).map(cocktail => ({
    ...cocktail,
    // 确保 difficulty 是正确的枚举值
    difficulty: cocktail.difficulty as "Easy" | "Medium" | "Hard"
}))

export const loadCocktails = (): Cocktail[] => {
    return cocktails
}

export const getCocktail = (id: number): Cocktail | undefined => {
    return cocktails.find((c: Cocktail) => c.id === id)
}

export const getCocktailsByIngredient = (ingredient: string): Cocktail[] => {
    return cocktails.filter((cocktail: Cocktail) =>
        cocktail.ingredients.some((i: Ingredient) => i.name === ingredient)
    )
}

export const getCocktailsByDifficulty = (difficulty: "Easy" | "Medium" | "Hard"): Cocktail[] => {
    return cocktails.filter((cocktail: Cocktail) => cocktail.difficulty === difficulty)
}

export const getCocktailsByCategory = (category: string): Cocktail[] => {
    return cocktails.filter((cocktail: Cocktail) => cocktail.category === category)
}

export const searchCocktails = (query: string): Cocktail[] => {
    const lowerQuery = query.toLowerCase()
    return cocktails.filter((cocktail: Cocktail) =>
        cocktail.name.toLowerCase().includes(lowerQuery) ||
        cocktail.ingredients.some((i: Ingredient) =>
            i.name.toLowerCase().includes(lowerQuery)
        )
    )
}