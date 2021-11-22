import React from 'react';
import { useSelector } from 'react-redux';
import DynamicTime from './DynamicTime';
import './styles/Forecast.css';

function Forecast() {
	const forecast = useSelector((state) => state.forecast);

	return (
		<React.Fragment>
			<div className="home__main-forecast-head">
				<h2>{forecast.forecastData.name} Weather Forecast</h2>
			</div>
			<div className="home__main-forecast-body">
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-md-8 col-lg-6 col-xl-4">
							<div
								className="card"
								style={{ color: '#4B515D', borderRadius: '35px' }}
							>
								<div className="card-body p-4">
									<div className="d-flex">
										<h5 className="flex-grow-1" style={{ fontWeight: 'bold' }}>
											{forecast?.forecastData?.name}
										</h5>
										<div className="d-flex flex-column">
											<h6>{/* <DynamicTime /> */}</h6>
											<h6>
												min:{' '}
												{Math.round(forecast?.forecastData?.main?.temp_min)}°C
											</h6>
											<h6>
												max:{' '}
												{Math.round(forecast?.forecastData?.main?.temp_max)}°C
											</h6>
											<h6>
												feels like:{' '}
												{Math.round(forecast?.forecastData?.main?.feels_like)}°C
											</h6>
										</div>
									</div>

									<div className="d-flex flex-column text-center mt-5 mb-4">
										<h6
											className="display-4 mb-0 font-weight-bold"
											style={{ color: '#1C2331' }}
										>
											{Math.round(forecast?.forecastData?.main?.temp)}°C
										</h6>
										<span className="small" style={{ color: '#868B94' }}>
											{forecast?.weatherData[0]?.description}
										</span>
									</div>

									<div className="d-flex align-items-center">
										<div className="flex-grow-1" style={{ fontSize: '1rem' }}>
											<div>
												<i
													className="fas fa-wind fa-fw"
													style={{ color: '#868B94' }}
												></i>
												<span className="ms-1">
													{forecast?.forecastData?.wind?.speed} m/s
												</span>
											</div>
											<div>
												<i
													className="fas fa-tint fa-fw"
													style={{ color: '#868B94' }}
												></i>
												<span className="ms-1">
													{forecast?.forecastData?.main?.humidity}%
												</span>
											</div>
											<div>
												<i
													className="fas fa-sun fa-fw"
													style={{ color: '#868B94' }}
												></i>
												<span className="ms-1">
													{forecast?.forecastData?.main?.pressure} mm
												</span>
											</div>
										</div>
										<div>
											<img
												src={`https://openweathermap.org/img/wn/${forecast?.weatherData[0]?.icon}@2x.png`}
												width="100px"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Forecast;
