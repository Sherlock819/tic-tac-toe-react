import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { SinglePlayer } from "./SinglePlayer";
import { MultiplayerLobby } from "./MultiplayerLobby";
import HomePage from "./HomePage";
import GamePage from "./GamePage"; // Import the new GamePage component
import { WebSocketProvider } from "../contexts/WebSocketContext";

export const MainComponent = () => {
    return (
        <WebSocketProvider>
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/SinglePlayer" element={<SinglePlayer />} />
                    <Route path="/Multiplayer" element={<MultiplayerLobby />} />
                    {/* <Route path="/Multiplayer" element={<Multiplayer />} /> */}
                    <Route path="/game/:gameId" element={<GamePage />} /> {/* Add this line */}
                    <Route path="/*" element={<h2>Page Not Found</h2>} />
                </Routes>
            </div>
        </Router>
        </WebSocketProvider>
    );
};
