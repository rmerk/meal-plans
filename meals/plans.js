// Meal Plans Data
// This file is the single source of truth for all meal plans
// Add new plans here, and they'll automatically appear on the index page

const mealPlans = [
    {
        file: "week1-meals.html",
        title: "Week 1 Meals",
        subtitle: "205 → 180 lbs",
        category: "meals",
        color: "emerald",
        features: [
            "High protein, Asian-inspired",
            "Batch prep focused",
            "~2 lbs/week loss"
        ],
        proteins: ["chicken", "beef"],
        cookingSteps: [
            { title: "Prep Carbs", description: "Start the rice (2 cups dry) and cook soba noodles. Rinse noodles with cold water & oil." },
            { title: "Vegetables & Aromatics", description: "Chop everything at once. Mince ~30 cloves garlic, grate ginger. Chop broccoli, cabbage, carrots, onions, bok choy." },
            { title: "Mix Sauces", description: "Make all 4 sauces in separate jars/bowls so they are ready to dump in pan." },
            { title: "Cook & Assemble", description: "Cook one meal at a time. Portion immediately into containers. Note: Keep salad components separate." },
            { title: "Cool & Store", description: "Let hot meals cool 30-45 mins before lidding to prevent sogginess." }
        ]
    },
    {
        file: "week1-breakfast.html",
        title: "Week 1 Breakfasts",
        subtitle: "Morning Fuel",
        category: "breakfast",
        color: "amber",
        features: [
            "30-40g protein per meal",
            "Ready in 10 minutes",
            "No batch prep needed"
        ],
        proteins: ["eggs", "yogurt", "protein powder"]
    },
    {
        file: "week2-meals.html",
        title: "Week 2 Meals",
        subtitle: "New Flavors",
        category: "meals",
        color: "blue",
        features: [
            "4 Asian-inspired recipes",
            "2-3 hours prep time",
            "14 total meals"
        ],
        proteins: ["chicken", "pork", "tofu"],
        cookingSteps: [
            { title: "Prep Carbs", description: "Cook 7 cups of dry brown rice. This is your base for all 14 meals. Let it cool." },
            { title: "Prep Tofu", description: "Press, cube, and toss tofu with cornstarch. Pan-fry, bake, or air-fry until crispy. Set aside." },
            { title: "Veggies & Aromatics", description: "Mince all garlic/ginger. Slice all green onions, peppers, etc. Blanch all green beans." },
            { title: "Mix Sauces", description: "Make all 4 sauces in separate, labeled jars so they are ready to go." },
            { title: "Cook & Assemble", description: "Work one recipe at a time. Cook the protein, add veggies and sauce. Portion over 1 cup of rice per container." },
            { title: "Cool & Store", description: "Let all hot meals cool 30-45 mins before lidding. Stack and refrigerate." }
        ]
    },
    {
        file: "week2-breakfast.html",
        title: "Week 2 Breakfasts",
        subtitle: "New Morning Options",
        category: "breakfast",
        color: "orange",
        features: [
            "30-40g protein per meal",
            "Ready in 10 minutes",
            "4 new flavor profiles"
        ],
        proteins: ["eggs", "cottage cheese", "turkey"]
    },
    {
        file: "week3-meals.html",
        title: "Week 3 Meals",
        subtitle: "Shrimp, Curry & Mapo",
        category: "meals",
        color: "purple",
        features: [
            "Green curry & teriyaki",
            "2-3 hours prep time",
            "14 total meals"
        ],
        proteins: ["shrimp", "tofu", "pork"],
        cookingSteps: [
            { title: "Prep Carbs", description: "Cook 7 cups of dry white rice. This is your base for all 14 meals. Let it cool." },
            { title: "Prep Proteins", description: "Devein shrimp and pat dry. Cube chicken breast. Cube beef for mapo. Portion cod fillets." },
            { title: "Veggies & Aromatics", description: "Chop broccoli florets. Mince garlic and ginger. Chop green onions, dice bell peppers and onions." },
            { title: "Mix Sauces", description: "Make all 4 sauces in separate, labeled jars (curry sauce, mapo sauce, sesame-ginger glaze, stir-fry sauce)." },
            { title: "Cook & Assemble", description: "Cook one recipe at a time. Start with seafood (shortest cook time), then chicken, then beef. Portion over 1 cup rice." },
            { title: "Cool & Store", description: "Let all hot meals cool 30-45 mins before lidding. Refrigerate immediately after cooling." }
        ]
    },
    {
        file: "week3-breakfast.html",
        title: "Week 3 Breakfasts",
        subtitle: "High-Protein Variety",
        category: "breakfast",
        color: "red",
        features: [
            "~400-450 calories per meal",
            "Ready in 10 minutes",
            "Savory oats & smoothie options"
        ],
        proteins: ["eggs", "chicken sausage", "protein powder"]
    }
];
