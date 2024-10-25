import React from "react";
import '../css/Multiplayer.css';
import { useWebSocketContext, WebSocketProvider } from "../contexts/WebSocketContext";
import { Multiplayer } from "./Multiplayer";
import GamePage from "./GamePage";

export const MultiplayerLobby = () => {
    return (
        <WebSocketProvider>
            <LobbyContent />
        </WebSocketProvider>
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
