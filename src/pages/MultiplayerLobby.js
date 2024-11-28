import React from "react";
import '../css/Multiplayer.css';
import { useWebSocketContext } from "../contexts/WebSocketContext";
import { Multiplayer } from "./Multiplayer";
import GamePage from "./GamePage";

export const MultiplayerLobby = () => {
    return (
            <LobbyContent />
    );
};

const LobbyContent = () => {
    const { isConnected } = useWebSocketContext();
    
    if(isConnected)
    {
        return (
            <GamePage />
        );
    }
    else
    {
        return (
            <Multiplayer />
        );
    }
};
