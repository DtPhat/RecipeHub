import { Button, Carousel, Modal } from 'flowbite-react';
import React from 'react';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { msToTime } from '../../../utils/TimeUtil';

const AdminRecipeDetailModal = ({
	chosenRecipe,
	onClose,
	action,
}) => {
	const { isDarkMode } = useThemeContext();

	function handleRemove() {
		if (action) {
			action('remove', chosenRecipe);
		}
	}
	function handleVerify() {
		if (action) {
			action('verify', chosenRecipe);
		}
	}

	return (
		chosenRecipe && (
			<Modal
				dismissible
				show={chosenRecipe}
				onClose={onClose}
				size='7xl'
				className={isDarkMode ? 'dark' : ''}
			>
				<Modal.Header>
					<span>Recipe's Detail</span>
				</Modal.Header>
				<Modal.Body className='no-scrollbar'>
					<div className='flex gap-4 flex-col h-[70vh] z-50 overflow-auto no-scrollbar dark:text-white'>
						<div className='flex gap-5 h-3/5 flex-col md:flex-row'>
							<div className='md:h-full md:w-2/5'>
								<Carousel slide={false}>
									{chosenRecipe.images.map((img) => (
										<div key={img.imageId} className='flex h-full items-center justify-center bg-gray-200 dark:bg-gray-700 dark:text-white'>
											<img
												
												alt='recipe image'
												src={img.imageUrl}
												className='object-cover h-[100%]'
											/>
										</div>
									))}
								</Carousel>
							</div>
							<div className='admin-content md:w-3/5 w-full'>
								<p className='font-bold'>
									ID:{' '}
									<span className='font-normal'>
										{chosenRecipe.recipe_id}
									</span>
								</p>
								<p className='font-bold'>
									By User:{' '}
									<span className='font-normal'>
										{chosenRecipe.user_id}
									</span>
								</p>
								<p className='font-bold'>
									Recipe Name:{' '}
									<span className='font-normal'>
										{chosenRecipe.title}
									</span>
								</p>
								<p className='font-bold'>
									Prep time:{' '}
									<span className='font-normal'>
										{msToTime(chosenRecipe.pre_time)}
									</span>
								</p>
								<p className='font-bold'>
									Cook time:{' '}
									<span className='font-normal'>
										{msToTime(chosenRecipe.cook_time)}
									</span>
								</p>
								<p className='font-bold'>
									Ingredients:{' '}
									<ol className='font-normal'>
										{chosenRecipe.ingredients.map((ingredient, i) => (
											<li key={i}>
												{ingredient.ingredientName}
											</li>
										))}
									</ol>
								</p>
								<p className='font-bold'>
									Yield:{' '}
									<span className='font-normal'>
										{chosenRecipe.recipe_yield}
									</span>
								</p>
								<p className='font-bold'>
									Unit:{' '}
									<span className='font-normal'>
										{chosenRecipe.unit}
									</span>{' '}
								</p>
								<p className='font-bold'>
									Rating:{' '}
									<span className='font-normal'>
										{chosenRecipe.rating}
									</span>
								</p>
								<div className='gap-2 flex flex-wrap content-center'>
									<span className='text-center font-bold'>Tag: </span>
									{chosenRecipe.tags.map((tag, i) => (
										<span
											key={tag.tagId}
											className='border rounded-full py-0.5 px-3 my-1 inline-block border-green-variant'
										>
											{tag.tagName}
										</span>
									))}
								</div>

								<p className='font-bold'>
									Privacy status:{' '}
									<span className='font-normal'>
										{chosenRecipe.privacyStatus}
									</span>
								</p>
								<p className='font-bold'>
									Favorite:{' '}
									<span className='font-normal'>
										{chosenRecipe.is_favourite}
									</span>
								</p>
							</div>
						</div>

						<div className='gap-3 flex xs:flex-col md:flex-row md:divide-x-2 h-full  xs:divide-y-2 md:divide-y-0'>
							<div className='md:w-1/3 w-full'>
								<span className='font-bold'>Description: </span>
								{chosenRecipe.description}
							</div>
							<div className='md:w-2/3 w-full'>
								<span className='font-bold'>Cooking steps: </span>
								<ol>
									{chosenRecipe.steps
										.split('\n')
										.map(
											(step, i) => step && <li key={i} className='list-decimal capitalize font-semibold ml-8 pl-4 text-lg break-words py-1'>{step}</li>
										)}
								</ol>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className='flex-row-reverse gap-4 '>
					<Button
						className='xs:w-1/2 sm:w-1/6'
						color='failure'
						size='sm'
						outline
						onClick={handleRemove}
					>
						Remove
					</Button>
					{chosenRecipe.verified ? (
						<Button
							className='xs:w-1/2 sm:w-1/6'
							color='failure'
							size='sm'
							outline
							onClick={handleVerify}
						>
							Un-verified
						</Button>
					) : (
						<Button
							className='xs:w-1/2 sm:w-1/6'
							color='success'
							size='sm'
							outline
							onClick={handleVerify}
						>
							Verified
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		)
	);
};

export default AdminRecipeDetailModal;
