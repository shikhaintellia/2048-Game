// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import GameController from "./GameController.js";
import "./Styles.css";
// import Styles from "./style/Styles.css"
// import Header from "./CommonComponents/Header.js";
// import Footer from "./CommonComponents/Footer.js"

export default function App() {
  return (
    <>
  {/* <Header/> */}
    <div className="App">
      <GameController />
    </div>
    {/* <Footer /> */}
    </>
  );
}

