import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function getDaysFacts(props) {
  let day = props.day; // year-month-day e.g. 2022-01-11
  let diningHall = props.diningHall;
  let meal = props.meal.toUpperCase(); // breakfast, brunch, lunch, dinner
  let url = `https://michigan-dining-api.tendiesti.me/v1/menus?date=${day}&diningHall=${diningHall}%20Dining%20Hall&meal=${meal}`;

}

function LoadFacts(props) {
  return (
    <button className="loadButton" onClick={() => this.props.onClick()}>
      "hi"
    </button>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
