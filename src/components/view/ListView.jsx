import React from 'react';
import ClockIcon from '../../assets/ClockIcon';
import HeartIcon from '../../assets/HeartIcon';
import KnifeForkIcon from '../../assets/KnifeForkIcon';
import LeafIcon from '../../assets/LeafIcon';
import StarIcon from '../../assets/StarIcon';
import msConverter from '../../utils/msConverter';

const ListView = ({ recipeData }) => {
<<<<<<< HEAD
	return (
		<div className='py-2 space-y-4'>
			{recipeData.map((item, index) => {
				const {
					imgUrl,
					title,
					tags,
					rating,
					prepTime,
					cookTime,
					recipeYield,
					ingredients,
					isFavourite,
				} = item;
				const stars = [];
				for (let i = 0; i < 5; i++) {
					stars.push(i < rating ? true : false);
				}
				return (
					<div
						key={index}
						className='flex items-center border-2 border-gray-300 rounded p-1 bg-gray-100 hover:border-green-accent cursor-pointer relative'
					>
						<img src={imgUrl} alt='' className='w-32 h-32 rounded' />
						<div className='flex flex-col ml-4 space-y-2'>
							<h1 className='text-xl font-bold text-green-accent'>
								{title}
							</h1>
							<div className='space-x-2'>
								<div className='flex space-x-1'>
									{stars.map((star, i) => {
										return (
											<StarIcon
												key={i}
												style={`w-4 h-4 stroke-transparent ${
													star
														? 'fill-orange-accent'
														: 'fill-gray-300 outline-none'
												}`}
											/>
										);
									})}
								</div>
							</div>
							<div className='flex items-center space-x-4 font-medium'>
								<div className='flex items-center space-x-1'>
									<ClockIcon style='w-6 h-6' />
									<span>{msConverter(300000)}</span>
								</div>
								<div className='flex items-center space-x-0.5'>
									<LeafIcon style='w-5 h-5 rotate-45' />
									<span>{ingredients.length}</span>
									<span>Ingredients</span>
								</div>
								<div className='flex items-center space-x-1'>
									<KnifeForkIcon style='w-5 h-5' />
									<span>Yield: </span>
									<span>{recipeYield}</span>
								</div>
							</div>
							<div className='gap-2 py-1 flex flex-wrap'>
								{tags.map((tag, i) => {
									return (
										<span
											// key={tag} tui thay de key = tag no bi report loi nen tui sua cho nay nhe
											key={i}
											className='border rounded-full py-0.5 px-3 border-green-variant'
										>
											{tag}
										</span>
									);
								})}
							</div>
						</div>
						{isFavourite && (
							<HeartIcon style='w-6 h-6 absolute fill-red-500 stroke-red-100 left-3 top-3' />
						)}
					</div>
				);
			})}
		</div>
	);
};
export default ListView;
=======
  return (
    <div className='space-y-4'>
      {recipeData.map((item, i) => {
        const { imgUrl, title, tags, rating, prepTime, cookTime, recipeYield, ingredients, isFavourite } = item
          const stars = []
        for (let i = 0; i < 5; i++) {
          stars.push(i < rating ? true : false)
        }
        return (
          <div key={i} className='flex items-center border-2 border-gray-300 rounded p-1 bg-gray-100 hover:border-green-accent cursor-pointer relative'>
            <img src={imgUrl} alt="" className='w-32 h-32 rounded' />
            <div className='flex flex-col ml-4 space-y-2'>
              <h1 className='text-xl font-bold text-green-accent'>{title}</h1>
              <div className='space-x-2'>
                <div className='flex space-x-1'>
                  {stars.map((star, i) => {
                    return <StarIcon key={i} style={`w-4 h-4 stroke-transparent ${star ? 'fill-orange-accent' : 'fill-gray-300 outline-none'}`} />
                  })}
                </div>
              </div>
              <div className='flex items-center space-x-4 font-medium'>
                <div className='flex items-center space-x-1'><ClockIcon style='w-6 h-6' /><span>{msConverter(300000)}</span></div>
                <div className='flex items-center space-x-0.5'><LeafIcon style='w-5 h-5 rotate-45' /><span>{ingredients.length}</span><span>Ingredients</span></div>
                <div className='flex items-center space-x-1'><KnifeForkIcon style='w-5 h-5' /><span>Yield: </span><span>{recipeYield}</span></div>
              </div>
              <div className='gap-2 py-1 flex flex-wrap'>
                {tags.map((tag) => {
                  return (
                    <span key={tag} className='border rounded-full py-0.5 px-3 border-green-variant text-green-accent font-semibold'>
                      {tag}
                    </span>)
                })}
              </div>
            </div>
            {isFavourite && <HeartIcon style='w-6 h-6 absolute fill-red-500 stroke-red-100 left-3 top-3' />}
          </div>
        )
      })}
    </div>
  )
}
export default ListView
>>>>>>> 79b4188b702d33111a45ca0bdf5ff5df4f5cb386
