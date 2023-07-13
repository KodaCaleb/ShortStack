import './App.css';
import Home from './pages/Home';
import Video from './Video';

function App() {
  return (
    <div className="app">
      <Home />
      <div className='app_videos'>
        <Video />
        <Video />
        <Video />
        <Video />
      </div>

    </div>
  );
}

export default App;
