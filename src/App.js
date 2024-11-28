import { WebSocketProvider } from './contexts/WebSocketContext';
import './css/App.css';
import { MainComponent } from './pages/MainComponent';

function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <MainComponent></MainComponent>
      </WebSocketProvider>
      
    </div>
  );
}

export default App;
