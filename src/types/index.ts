// 教程类型
export type Tutorial = {
    platform: "bilibili" | "xiaohongshu";
    url: string;
    title: string;
    author?: string;
}

// 配料类型
export type Ingredient = {
    name: string;
    amount: string;
}

// 鸡尾酒类型
export type Cocktail = {
    id: number;
    name: string;
    englishName: string;
    ingredients: Ingredient[];
    method: string;
    glass: string;
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description?: string;
    garnish?: string;
    tutorials: Tutorial[];
}

// 收藏状态类型
export type FavoritesState = {
    items: Array<{
        id: number;
        addedAt: number;
    }>;
}

export type Spirit =
    | "金酒"
    | "伏特加"
    | "白朗姆"
    | "黑朗姆"
    | "龙舌兰"
    | "波本威士忌"
    | "苏格兰威士忌"
    | "黑麦威士忌"
    | "白兰地";

type Category = {
    title: string;
    items: Spirit[];
}

export type Categories = {
    [K in "Spirits" | "Liqueurs" | string]: Category;
}


// 分类数据
export const CATEGORIES = {
    "Spirits": {
        title: "基础烈酒",
        items: [
            "金酒",
            "伏特加",
            "白朗姆",
            "黑朗姆",
            "龙舌兰",
            "波本威士忌",
            "苏格兰威士忌",
            "黑麦威士忌",
            "白兰地"
        ]
    },
    "Liqueurs": {
        title: "利口酒",
        items: [
            "君度橙酒",
            "百利甜酒",
            "金巴利",
            "卡鲁瓦",
            "杏仁利口酒",
            "橙皮酒",
            "味美思"
        ]
    },
    "Syrups": {
        title: "糖浆",
        items: [
            "糖浆",
            "柑橘糖浆",
            "菠萝糖浆",
            "石榴糖浆",
            "薄荷糖浆"
        ]
    },
    "Mixers": {
        title: "调和材料",
        items: [
            "可乐",
            "雪碧",
            "通宁水",
            "椰汁",
            "姜汁汽水",
            "苏打水",
            "西柚汽水",
            "柠檬汁",
            "青柠汁",
            "菠萝汁",
            "番茄汁",
            "橙汁"
        ]
    },
    "Garnish": {
        title: "装饰物",
        items: [
            "薄荷叶",
            "柠檬片",
            "青柠片",
            "橙片",
            "盐边",
            "糖边",
            "苦精",
            "生姜",
            "橙皮",
            "蛋白",
            "冰块"
        ]
    }
} as const;