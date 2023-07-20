const dummyRecipes = [
  {
    recipe_id: 1,
    images: [
      { imageUrl: 'https://natashaskitchen.com/wp-content/uploads/2020/03/Pan-Seared-Steak-4.jpg', imageId: 1 },
      { imageUrl: 'https://cdn.tgdd.vn/Files/2021/07/29/1371693/steak-la-gi-cac-loai-steak-ngon-va-muc-do-chin-cua-steak-202107292117365026.jpg', imageId: 2 }],
    title: 'Pan Seared Steak',
    tags: [{ tagId: 1, tagName: 'breakfast' }, { tagId: 2, tagName: 'lunch' }, { tagId: 3, tagName: 'dinner' }],
    pre_time: 1000000,
    cook_time: 3000000,
    recipe_yield: 2,
    unit: 'disc',
    ingredients: [{ ingredientName: 'steak', ingredientId: 1, amount: '2.2 kg' }, { ingredientName: 'garlic', ingredientId: 2, amount: '3' }],
    rating: 5,
    is_favourite: true,
    description: 'This is the description of this recipe, this is the description of this recipe',
    steps: 'Step 1 \n Step 2 \n Step 3',
    privacyStatus: 'PRIVATE'
  }, 
  
{
  recipe_id: 2,
  images: [{ imageUrl: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Crispy-Fried-Chicken_EXPS_TOHJJ22_6445_DR%20_02_03_11b.jpg', imageId: 3 }],
  title: 'Crispy Fried Chicken',
  tags: [{ tagId: 4, tagName: 'dessert' }, { tagId: 5, tagName: 'appetizer' }, { tagId: 6, tagName: 'snack' }, { tagId: 7, tagName: 'drink' }],
  pre_time: 1000000,
  cook_time: 30000000,
  recipe_yield: 4,
  unit: 'bowl',
  ingredients: [{ ingredientName: 'chicken thighs', ingredientId: 3, amount: '4' }, { ingredientName: 'crispy powder', ingredientId: 4, amount: '1' }],
  rating: 3,
  is_favourite: false,
  description: 'This is the description of this recipe, this is the description of this recipe',
  steps: 'Step 1 \n Step 2 \n Step 3 \n Step 4 \n Step 5',
  privacyStatus: 'PUBLIC'
},
]

export default dummyRecipes