import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './App.css';
import Main from './components/Main';
import store from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Main />
			</div>
		</Provider>
	);
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;
