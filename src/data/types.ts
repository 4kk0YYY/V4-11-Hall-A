export interface Ingredient {
    name: string;
    amount: string;
    unit: string;
}

export interface Tutorial {
    platform: string;
    url: string;
}

export interface Cocktail {
    id: string;
    name: string;
    englishName: string;
    ingredients: Ingredient[];
    instructions: string;
    glassware: string;
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
    garnish: string;
    tutorials: Tutorial[];
    createdAt: string;
}

export interface FavoritesState {
    items: string[]; // cocktail ids
}