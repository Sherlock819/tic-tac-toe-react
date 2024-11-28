import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./NavBar";
import { SinglePlayer } from "./SinglePlayer";
import { MultiplayerLobby } from "./MultiplayerLobby";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
import {  WebSocketContext } from "../contexts/WebSocketContext";
import Auth from "./Auth";
import {  useContext } from "react";
import UserProfile from "./UserProfile";
import Loading from "../components/Loading";

export const MainComponent = () => {
    const {loading, isAuthenticated} = useContext(WebSocketContext);

    return (
            <Router>
                <div>
                    {loading ? <Loading /> : (
                        <>
                            <NavBar />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/SinglePlayer" element={isAuthenticated ? <SinglePlayer /> : <Auth />} />
                                <Route path="/Multiplayer" element={isAuthenticated ? <MultiplayerLobby /> : <Auth />} />
                                <Route path="/game/:gameId" element={isAuthenticated ? <GamePage /> : <Auth />} />
                                <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Auth />} />
                                <Route path="/*" element={<h2>Page Not Found</h2>} />
                            </Routes>
                        </>
                    )}
                </div>
            </Router>
    );
};
