import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import ExportingIcon from '../../assets/ExportingIcon'
import RecipeDetails from '../../components/RecipeDetails'
import SearchBar from '../../components/SearchBar'
import useOuterClick from '../../hooks/useOuterClick'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import RecipeModal from '../../components/RecipeModal'
import { msToTime } from '../../utils/TimeUtil'
import { initialFilter } from '../recipe'

const RecipeExport = () => {
  const privateAxios = usePrivateAxios()
  const [chosenRecipe, setChosenRecipe] = useState()
  const [keyword, setKeyword] = useState('')
  const [recipes, setRecipes] = useState([])
  const [exportingIds, setExportingIds] = useState([])
  useEffect(() => {
    privateAxios.post(`/api/v1/user/recipes/filter?page=${0}&size=${100}`, {
      tags: initialFilter.tags,
      ingredients: initialFilter.ingredients,
      favorite: initialFilter.isFavourite,
      sortBy: initialFilter.sortingBy,
      direction: initialFilter.isAscending ? 'asc' : 'desc',
      title: keyword,
      privacyStatus: null
    })
      .then((response) => { setRecipes(response.data) })
      .catch((error) => console.log(error))
  }, [keyword]);
  const handleAddingToList = (e, id) => {
    e.stopPropagation();
    setExportingIds(prevList => {
      return prevList.includes(id) ?
        prevList.filter(prevId => prevId != id)
        : [...prevList, id]
    })
  }
  const exportChosenRecipes = () => {
    const ids = [...exportingIds]
    privateAxios.post('/api/v1/user/file/recipe/excel', ids, {
      responseType: 'blob',
    }).then(response => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'recipe.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
  }
  const exportAll = () => {
    privateAxios.get('/api/v1/user/file/recipe/excel', {
      responseType: 'blob',
    }).then(response => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'recipe.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
  }
  return (
    <section className='flex justify-center py-4'>
      <div className='border-gray-400 rounded max-w-8xl w-full space-y-6 bg-gray-50 p-8'>
        <h1 className='text-4xl font-semibold'>Choose your recipes to export</h1>
        <SearchBar keyword={keyword} setKeyword={setKeyword} />
        <div>
          <div className='flex gap-4 font-semibold text-2xl flex-col sm:flex-row '>
            <h1 className='underline underline-offset-4'>Exporting list:</h1>
            <div className='flex flex-wrap gap-2 text-green-accent'>
              {exportingIds.map(id =>
                <span key={id} onClick={() => setExportingIds(prevList => prevList.filter(prevId => prevId !== id))}
                  className='hover:line-through cursor-pointer'>{id}</span>
              )}
            </div>
            {exportingIds.length > 0
              ? <div>
                <button className='button-contained-square py-0 px-4' onClick={exportChosenRecipes}>
                  <span>Export</span>
                  <ExportingIcon style='w-6 h-6' />
                </button>
              </div>
              : <span className='text-gray-500'>(Empty)</span>}
          </div>
        </div>
        <section className='py-2 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-5'>
          {recipes.map(recipe => {
            const { recipe_id, images, title, tags, rating, prep_time, cook_time, recipe_yield, ingredients, is_favourite, unit } = recipe
            const recipeImage = images.length ? images[0].imageUrl : '/img/default-recipe.jpg'
            return (
              <div key={recipe_id}seach
                className='w-full h-68 flex flex-col border-2 border-gray-200 rounded p-2 space-y-1 bg-gray-100 hover:border-green-accent cursor-pointer relative'
                onClick={() => setChosenRecipe(recipe)}>
                <img src={recipeImage} alt="" className='w-full h-40 object-cover rounded' />
                <h1 className='text-xl font-bold text-green-accent truncate'>{title}</h1>
                <span className='text-normal font-bold truncate'>ID: {recipe_id}</span>
                <button className={`button-outlined-square py-0 ${exportingIds.includes(recipe_id) ? 'color-secondary' : ''}`} onClick={(e) => handleAddingToList(e, recipe_id)}>
                  {exportingIds.includes(recipe_id) ? 'Remove' : 'Add to list'}
                </button>
              </div>)
          })}
          <RecipeModal chosenRecipe={chosenRecipe} setChosenRecipe={setChosenRecipe} />
        </section>
        <div className='flex flex-col sm:flex-row py-2 items-center gap-4 pt-4 border-t-2 border-gray-300'>
          <h1 className='text-2xl font-semibold text-gray-600'>Export all recipes at 1 click:</h1>
          <button className='button-outlined-square w-40 color-secondary py-1'
            onClick={exportAll}>
            <span>Export all</span>
            <ExportingIcon style='w-8 h-8' />
          </button>
        </div>
      </div>
    </section>
  )
}
export default RecipeExport


