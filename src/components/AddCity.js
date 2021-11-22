import { CheckBox } from '@mui/icons-material';
import {
	Autocomplete,
	Button,
	CircularProgress,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	addNewCity,
	getCities,
	saveSelectedCity,
} from '../redux/cities/citiesActions';
import { getCountries } from '../redux/counties/countriesActions';
import './styles/AddCity.css';

function AddCity() {
	const dispatch = useDispatch();

	const countries = useSelector((state) => state.countries.countries);
	const getCountriesError = useSelector(
		(state) => state.countries.getCountriesError
	);

	const cities = useSelector((state) => state.cities.cities);
	const getCitiesError = useSelector((state) => state.cities.getCitiesError);

	const loadingCountries = countries?.length === 0;
	const loadingCities = cities?.length === 0;

	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [newCity, setNewCity] = useState('');

	const selectedCityLocalStorage = localStorage.getItem('selectedCity');

	useEffect(() => {
		if (!countries.length) {
			dispatch(getCountries());
		}
	}, [countries]);

	useEffect(() => {
		if (selectedCountry) {
			dispatch(getCities(selectedCountry));
		}
	}, [selectedCountry]);

	const handleClick = () => {
		if (selectedCity) {
			dispatch(saveSelectedCity(selectedCity));
		} else if (newCity) {
			dispatch(addNewCity(newCity));
		}
	};

	return (
		<div className="addCity__wrapper">
			{(getCountriesError && (
				<div className="addCity__error">
					Countries loading error: {getCountriesError}
				</div>
			)) ||
				(getCitiesError && (
					<div className="addCity__error">
						Cities loading error: {getCitiesError}
					</div>
				))}

			<div className="addCity__autocomplete-country">
				<Autocomplete
					onChange={(e, value) => setSelectedCountry(value?.name)}
					id="country-select"
					sx={{ width: 300 }}
					options={countries}
					loading={loadingCountries}
					isOptionEqualToValue={(country, value) => country.name === value.name}
					getOptionLabel={(country) => country.name}
					renderOption={(props, country) => (
						<Box
							component="li"
							sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
							{...props}
						>
							<img loading="lazy" width="20" src={country.flag} alt="" />
							{country.name}
						</Box>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Choose a country..."
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loadingCountries ? (
											<CircularProgress color="inherit" size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
						/>
					)}
				/>
			</div>

			<div className="addCity__autocomplete-city">
				{selectedCountry && (
					<Autocomplete
						onChange={(e, value) => {
							selectedCityLocalStorage
								? setNewCity(value)
								: setSelectedCity(value);
						}}
						id="city-select"
						sx={{ width: 300 }}
						options={cities}
						loading={loadingCities}
						isOptionEqualToValue={(city, value) => city === value}
						getOptionLabel={(city) => city}
						renderOption={(props, city) => (
							<Box
								component="li"
								sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
								{...props}
							>
								{city}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Choose a city..."
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loadingCities ? (
												<CircularProgress color="inherit" size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
				)}
			</div>

			{(selectedCity || newCity) && (
				<Link to="/" className="addCity__link link">
					<Button
						onClick={handleClick}
						variant="contained"
						endIcon={<CheckBox />}
					>
						Save city
					</Button>
				</Link>
			)}
		</div>
	);
}

export default AddCity;
