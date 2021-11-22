import React, { useState } from 'react';

function DynamicTime() {
	let time = new Date().toLocaleTimeString('en-US', {
		hour12: false,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});

	const [currentTime, setCurrentTime] = useState(time);

	const renderTime = () => {
		time = new Date().toLocaleTimeString('en-US', {
			hour12: false,
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
		});
		setCurrentTime(time);
	};

	setInterval(renderTime, 1000);

	return (
		<div className="dynamicTime">
			<h4>{currentTime}</h4>
		</div>
	);
}

export default DynamicTime;
