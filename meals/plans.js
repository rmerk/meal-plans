// Meal Plans Data
// This file is the single source of truth for all meal plans
// Add new plans here, and they'll automatically appear on the index page

const mealPlans = [
  {
    file: 'week1/index.html',
    title: 'Week 1 Meals',
    subtitle: '205 → 180 lbs',
    category: 'meals',
    color: 'emerald',
    features: [
      'High protein, Asian-inspired',
      'Batch prep focused',
      '~2 lbs/week loss'
    ],
    proteins: ['chicken', 'beef'],
    cookingSteps: [
      { title: 'Prep Carbs', description: 'Start the rice (2 cups dry) and cook soba noodles. Rinse noodles with cold water & oil.' },
      { title: 'Vegetables & Aromatics', description: 'Chop everything at once. Mince ~30 cloves garlic, grate ginger. Chop broccoli, cabbage, carrots, onions, bok choy.' },
      { title: 'Mix Sauces', description: 'Make all 4 sauces in separate jars/bowls so they are ready to dump in pan.' },
      { title: 'Cook & Assemble', description: 'Cook one meal at a time. Portion immediately into containers. Note: Keep salad components separate.' },
      { title: 'Cool & Store', description: 'Let hot meals cool 30-45 mins before lidding to prevent sogginess.' }
    ],
    recipes: [
      {
        id: 1,
        name: 'Gochugaru Beef & Broccoli Bowl',
        servings: 4,
        mealType: 'lunch',
        color: 'red',
        ingredients: [
          '1.25 lbs 93/7 lean ground beef',
          '8 cups broccoli florets',
          '4 cups cooked brown rice',
          'Sauce:',
          '6 tbsp soy sauce',
          '4-8 tsp gochugaru (to taste)',
          '4 tsp honey, 4 tsp sesame oil',
          '8 cloves garlic, 4 tsp ginger'
        ],
        instructions: [
          'Steam broccoli until tender-crisp.',
          'Whisk sauce ingredients together.',
          'Brown beef in a large skillet; drain fat.',
          'Add sauce to beef, thicken for 2 mins.',
          'Toss in broccoli to coat.',
          'Portion over rice. Garnish with green onions.'
        ]
      },
      {
        id: 2,
        name: 'Vietnamese-Style Chicken Salad',
        servings: 3,
        mealType: 'lunch',
        color: 'orange',
        ingredients: [
          '1.125 lbs chicken breast (cooked/shredded)',
          '6 cups cabbage, 3 cups carrots',
          '1.5 cups cucumber, cilantro, mint',
          'Dressing:',
          'Juice of 3 limes, 3 tbsp olive oil',
          '3 tsp sesame oil, 3 tsp honey',
          '3 tsp soy sauce, 3 cloves garlic'
        ],
        instructions: [
          'Combine cabbage, carrots, herbs for base.',
          'Whisk dressing ingredients.',
          'Storage: Keep salad base, chicken, and dressing in 3 separate containers per meal.',
          'Mix just before eating to keep crisp.'
        ]
      },
      {
        id: 3,
        name: 'Classic Beef & Broccoli Stir-Fry',
        servings: 4,
        mealType: 'dinner',
        color: 'blue',
        ingredients: [
          '1.5 lbs flank steak (thinly sliced)',
          '12 cups broccoli, 4 onions',
          '4 tsp cornstarch + 4 tbsp soy sauce (marinade)',
          'Sauce:',
          '1/4 cup broth, 8 tbsp soy sauce',
          '4 tsp sesame oil, 4 tsp honey',
          '8 cloves garlic, 4 tsp ginger'
        ],
        instructions: [
          'Marinate beef in cornstarch/soy (10 min).',
          'Sear beef in batches on high heat. Remove.',
          'Stir-fry veggies. Add water to steam (2 min).',
          'Return beef and add sauce. Cook until thick.',
          'Serve over brown rice.'
        ]
      },
      {
        id: 4,
        name: 'Pork & Soba Noodle Stir-Fry',
        servings: 3,
        mealType: 'dinner',
        color: 'purple',
        ingredients: [
          '1.125 lbs pork loin (thinly sliced)',
          '6 oz dry soba noodles',
          '12-15 baby bok choy, 3 peppers',
          'Sauce:',
          '9 tbsp soy sauce, 3 tbsp rice vinegar',
          '3 tsp sesame oil, 3 tsp honey',
          '6 cloves garlic, 3 tsp ginger'
        ],
        instructions: [
          'Cook soba noodles, rinse cold.',
          'Stir-fry pork until cooked. Remove.',
          'Stir-fry veggies (bok choy/peppers).',
          'Add pork, noodles, and sauce back in.',
          'Toss until hot and combined.'
        ]
      }
    ]
  },
  {
    file: 'week1-breakfast.html',
    title: 'Week 1 Breakfasts',
    subtitle: 'Morning Fuel',
    category: 'breakfast',
    color: 'amber',
    features: [
      '30-40g protein per meal',
      'Ready in 10 minutes',
      'No batch prep needed'
    ],
    proteins: ['eggs', 'yogurt', 'protein powder']
  },
  {
    file: 'week2-meals.html',
    title: 'Week 2 Meals',
    subtitle: 'New Flavors',
    category: 'meals',
    color: 'blue',
    features: [
      '4 Asian-inspired recipes',
      '2-3 hours prep time',
      '14 total meals'
    ],
    proteins: ['chicken', 'pork', 'tofu'],
    cookingSteps: [
      { title: 'Prep Carbs', description: 'Cook 7 cups of dry brown rice. This is your base for all 14 meals. Let it cool.' },
      { title: 'Prep Tofu', description: 'Press, cube, and toss tofu with cornstarch. Pan-fry, bake, or air-fry until crispy. Set aside.' },
      { title: 'Veggies & Aromatics', description: 'Mince all garlic/ginger. Slice all green onions, peppers, etc. Blanch all green beans.' },
      { title: 'Mix Sauces', description: 'Make all 4 sauces in separate, labeled jars so they are ready to go.' },
      { title: 'Cook & Assemble', description: 'Work one recipe at a time. Cook the protein, add veggies and sauce. Portion over 1 cup of rice per container.' },
      { title: 'Cool & Store', description: 'Let all hot meals cool 30-45 mins before lidding. Stack and refrigerate.' }
    ],
    recipes: [
      {
        id: 1,
        name: 'Spicy Turkey "Bibimbap" Bowl',
        servings: 4,
        mealType: 'lunch',
        color: 'red',
        ingredients: [
          '1.25 lbs ground turkey',
          '4 cups cooked brown rice',
          '6 oz fresh spinach',
          '2 cups shredded carrots',
          '2 cups bean sprouts',
          '4 eggs (for serving)',
          'Turkey Sauce:',
          '3 tbsp gochujang, 2 tbsp soy',
          '1 tbsp sesame oil, 1 tbsp honey'
        ],
        instructions: [
          'Cook turkey, drain fat. Add sauce, simmer 3-4 min.',
          'Wipe pan. Sauté spinach with garlic/soy. Remove.',
          'Sauté carrots/sprouts with garlic/soy.',
          'Portion: 1 cup rice, 1/4 turkey, 1/4 spinach, 1/4 carrots/sprouts.',
          'Top with a fresh fried egg when you reheat.'
        ]
      },
      {
        id: 2,
        name: 'Ginger-Garlic Ground Chicken',
        servings: 3,
        mealType: 'lunch',
        color: 'orange',
        ingredients: [
          '1.125 lbs ground chicken',
          '3 cups cooked brown rice',
          '1/4 cup minced ginger',
          '6 cloves garlic, minced',
          '4 green onions, sliced',
          '1 can water chestnuts, chopped',
          '1/4 cup soy sauce, 1 tbsp rice vinegar'
        ],
        instructions: [
          'Sauté ginger, garlic, and green onion whites (1-2 min).',
          'Add ground chicken and cook through.',
          'Stir in soy sauce, vinegar, water chestnuts, and half of the green onion tops. Cook 2 min.',
          'Portion over rice. Garnish with fresh greens.'
        ]
      },
      {
        id: 3,
        name: 'Spicy-Sweet Crispy Tofu',
        servings: 4,
        mealType: 'dinner',
        color: 'green',
        ingredients: [
          '28 oz extra-firm tofu (pressed)',
          '2 tbsp cornstarch',
          '2 bell peppers, 1 large onion',
          '1.5 cups snap peas',
          '4 cups cooked brown rice',
          'Sauce:',
          '1/3 cup soy, 3 tbsp honey',
          '1 tbsp sriracha, 1 tbsp rice vinegar'
        ],
        instructions: [
          'Cube tofu, toss with cornstarch. Pan-fry until crispy. Set aside.',
          'Stir-fry peppers and onion (4-5 min).',
          'Add snap peas, cook 2 min.',
          'Add tofu and sauce. Toss 1-2 min.',
          'Portion over rice.'
        ]
      },
      {
        id: 4,
        name: 'Ground Pork & Green Bean',
        servings: 3,
        mealType: 'dinner',
        color: 'purple',
        ingredients: [
          '1.125 lbs ground pork',
          '1.5 lbs green beans, trimmed',
          '3 cups cooked brown rice',
          '4 cloves garlic, 2 tsp ginger',
          'Sauce:',
          '3 tbsp soy, 2 tbsp dark soy',
          '1 tbsp sesame oil, 1 tsp honey'
        ],
        instructions: [
          'Blanch green beans 3-4 min. Rinse cold.',
          'Brown pork in a hot wok.',
          'Add garlic and ginger, cook 1 min.',
          'Add beans and sauce. Toss 2-3 min.',
          'Portion over rice.'
        ]
      }
    ]
  },
  {
    file: 'week2-breakfast.html',
    title: 'Week 2 Breakfasts',
    subtitle: 'New Morning Options',
    category: 'breakfast',
    color: 'orange',
    features: [
      '30-40g protein per meal',
      'Ready in 10 minutes',
      '4 new flavor profiles'
    ],
    proteins: ['eggs', 'cottage cheese', 'turkey']
  },
  {
    file: 'week3-meals.html',
    title: 'Week 3 Meals',
    subtitle: 'Shrimp, Curry & Mapo',
    category: 'meals',
    color: 'purple',
    features: [
      'Green curry & teriyaki',
      '2-3 hours prep time',
      '14 total meals'
    ],
    proteins: ['shrimp', 'tofu', 'pork'],
    cookingSteps: [
      { title: 'Prep Carbs', description: 'Cook 7 cups of dry white rice. This is your base for all 14 meals. Let it cool.' },
      { title: 'Prep Proteins', description: 'Devein shrimp and pat dry. Cube chicken breast. Cube beef for mapo. Portion cod fillets.' },
      { title: 'Veggies & Aromatics', description: 'Chop broccoli florets. Mince garlic and ginger. Chop green onions, dice bell peppers and onions.' },
      { title: 'Mix Sauces', description: 'Make all 4 sauces in separate, labeled jars (curry sauce, mapo sauce, sesame-ginger glaze, stir-fry sauce).' },
      { title: 'Cook & Assemble', description: 'Cook one recipe at a time. Start with seafood (shortest cook time), then chicken, then beef. Portion over 1 cup rice.' },
      { title: 'Cool & Store', description: 'Let all hot meals cool 30-45 mins before lidding. Refrigerate immediately after cooling.' }
    ],
    recipes: [
      {
        id: 1,
        name: 'Thai Green Curry with Chicken',
        servings: 4,
        mealType: 'lunch',
        color: 'green',
        ingredients: [
          '2 lbs chicken thighs, cubed',
          '2 bell peppers, 1 large onion',
          '1.5 cups snap peas',
          '4 tbsp green curry paste',
          '2 cans Light Coconut Milk',
          '1 tbsp soy sauce, 1 lime',
          '4 cups cooked brown rice'
        ],
        instructions: [
          'Sauté peppers/onions. Add curry paste, cook 1 min.',
          'Add chicken, brown slightly.',
          'Add coconut milk and soy. Simmer 15-20 min.',
          'Stir in snap peas and lime juice. Cook 2 min.',
          'Portion over 1 cup rice each.'
        ]
      },
      {
        id: 2,
        name: 'Szechuan-Style "Mapo" Beef',
        servings: 3,
        mealType: 'lunch',
        color: 'red',
        ingredients: [
          '1.125 lbs lean ground beef',
          '1 block (14 oz) soft tofu, cubed',
          '3 green onions',
          '4 cloves garlic, 2 tsp ginger',
          '2 tbsp gochujang, 1 tbsp chili garlic',
          '3 tbsp soy sauce, 1/2 cup broth',
          '1 tsp cornstarch (slurry)',
          '3 cups cooked brown rice'
        ],
        instructions: [
          'Sauté garlic, ginger, onion whites.',
          'Add beef and brown.',
          'Stir in gochujang, chili garlic, soy, and broth. Simmer.',
          'Thicken with cornstarch slurry.',
          'Gently fold in soft tofu and onion greens.',
          'Portion over 1 cup rice each.'
        ]
      },
      {
        id: 3,
        name: 'Shrimp & Asparagus Teriyaki',
        servings: 4,
        mealType: 'dinner',
        color: 'blue',
        ingredients: [
          '1.5 lbs large shrimp',
          '2 bunches asparagus, cut',
          '8 oz mushrooms, sliced',
          '4 cups cooked brown rice',
          'Sauce:',
          '1/2 cup soy, 1/4 cup water, 2 tbsp honey',
          '1 tbsp rice vinegar, ginger, garlic',
          '1 tbsp cornstarch'
        ],
        instructions: [
          'Whisk all sauce ingredients in a bowl.',
          'Stir-fry asparagus and mushrooms (5-7 min).',
          'Add shrimp, cook 2-4 min until pink.',
          'Pour in sauce, stir 1-2 min until thick.',
          'Portion over 1 cup rice each.'
        ]
      },
      {
        id: 4,
        name: 'Gingery Tofu & Bok Choy',
        servings: 3,
        mealType: 'dinner',
        color: 'purple',
        ingredients: [
          '21 oz extra-firm tofu, cubed',
          '9-10 baby bok choy, halved',
          '6 oz shiitake mushrooms',
          '3 cups cooked brown rice',
          'Sauce:',
          '1/4 cup soy, 1/4 cup broth',
          '2 tbsp ginger, 4 cloves garlic',
          '1 tsp sesame oil, 1 tbsp cornstarch'
        ],
        instructions: [
          'Whisk all sauce ingredients in a bowl.',
          'Sauté ginger, garlic, mushrooms, and bok choy stems (3-4 min).',
          'Add bok choy leaves and tofu, stir 1-2 min.',
          'Add sauce, stir gently until thick.',
          'Portion over 1 cup rice each.'
        ]
      }
    ]
  },
  {
    file: 'week3-breakfast.html',
    title: 'Week 3 Breakfasts',
    subtitle: 'High-Protein Variety',
    category: 'breakfast',
    color: 'red',
    features: [
      '~400-450 calories per meal',
      'Ready in 10 minutes',
      'Savory oats & smoothie options'
    ],
    proteins: ['eggs', 'chicken sausage', 'protein powder']
  }
]
