import React from 'react';

const SwitchButton = ({ customFunc, isOn }) => {
	const handleSwitchToggle = () => {
		if (customFunc) {
			customFunc();
		}
	};

	return (
		<>
			<label
				htmlFor='switch-btn'
				className={
					isOn ? 'switch-btn-label bg-green-400' : 'switch-btn-label'
				}
			>
				<input
					type='checkbox'
					id='switch-btn'
					checked={isOn}
					onChange={handleSwitchToggle}
					className='hidden'
				/>
				<span
					className={
						isOn ? 'switch-slider translate-x-full' : 'switch-slider '
					}
				/>
			</label>
		</>
	);
};

export default SwitchButton;
