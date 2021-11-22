import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { replaceSelectedCity } from '../redux/cities/citiesActions';

const ITEM_HEIGHT = 48;

function SelectCity() {
	const dispatch = useDispatch();
	const favoritesCities = useSelector((state) => state.cities.favoritesCities);
	const selectedCity = useSelector((state) => state.cities.selectedCity);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-label="more"
				id="long-button"
				aria-controls="long-menu"
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				variant="contained"
			>
				Select city
				<MoreVertIcon />
			</Button>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
					},
				}}
			>
				{favoritesCities?.map((city) => (
					<MenuItem
						key={city}
						selected={city === selectedCity}
						onClick={() => {
							handleClose();
							if (city !== selectedCity) {
								dispatch(replaceSelectedCity(city));
							}
						}}
					>
						{city}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}

export default SelectCity;
