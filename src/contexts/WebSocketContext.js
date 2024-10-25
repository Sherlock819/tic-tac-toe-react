// WebSocketContext.js
import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import eventEmitter from '../utilities/EventEmitter';
import { v4 as uuidv4 } from 'uuid';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const stompClientRef = useRef(null);
    const [gameId, setGameId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isMyTurn, setIsMyTurn] = useState(false);
    

    useEffect(() => {

        return () => {
            if(stompClientRef && stompClientRef.current)
                stompClientRef.current.deactivate(); // Clean up on unmount
        };
    }, []);

    const generateUniqueId = () => {
        return uuidv4(); // Generates a unique identifier like 'b8d75ff7-73eb-4b0f-8fbc-d6ec5b7c4c6f'
      };

    const subscribeToGameTopics = (gameId, stompClientRef) => {

         // Subscribe to the game start topic
         const gameStartTopic = `/topic/game/${gameId}/start`;
         console.log(`Subscribing to game start topic: ${gameStartTopic}`);
         stompClientRef.current.subscribe(gameStartTopic, (message) => {
             console.log(`Successfully subscribed to ${gameStartTopic}`);
             if (message.body) {
                 const parsedMessage = JSON.parse(message.body);
                 console.log("Game Start Message:", parsedMessage);
                 setIsConnected(true);
                 setIsReady(true);
                 // Handle the game start logic, such as setting the game state
             } else {
                 console.log("Received an empty Game Start message");
             }
         });
    
        // Subscribe to the general game topic (for moves, updates, etc.)
        const gameTopic = `/topic/game/${gameId}`;
        console.log(`Subscribing to game topic: ${gameTopic}`);
        stompClientRef.current.subscribe(gameTopic, (message) => {
            console.log(`Successfully subscribed to ${gameTopic}`);
            if (message.body) {
                const parsedMessage = JSON.parse(message.body);
                console.log("Game Update Message:", parsedMessage);
                setIsReady(true);
                setIsMyTurn(prev => !prev);
                // Handle game updates, such as moves or other game actions
                eventEmitter.emit('moveReceived', parsedMessage);
            } else {
                console.log("Received an empty Game Update message");
            }
        });
        // Add additional logging to check if messages are received but not processed
        console.log("Waiting for messages after subscription...");
    };
    
    const errorHandling = (stompClientRef) => {
        stompClientRef.current.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message'] + '\nAdditional details: ' + frame.body);
        };
    
        stompClientRef.current.onDisconnect = (frame) => {
            console.log('Disconnected from WebSocket : '+frame);
          };
    
          const reconnect = () => {
            console.warn('Reconnecting...');
            stompClientRef.current.activate(); // Re-activate the client
          };
          
          stompClientRef.current.onWebSocketClose = () => {
            setTimeout(reconnect, 5000); // Reconnect after 5 seconds
          };
    
    }

    
    const createGame = () => {
        let id = generateUniqueId();
        setGameId(id);
        const socket = new SockJS('http://localhost:7070/game');
        stompClientRef.current = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            });
        // console.log("Stomp Client Ref ", stompClientRef.current);

        stompClientRef.current.onConnect = () => {
            console.log('Connected to the WebSocket');
        
            // Subscribe to game creation messages
            stompClientRef.current.subscribe(`/topic/game-created/${id}`, (message) => {
                console.log('Subscribed to /topic/game-created');
                if (message.body) {
                    console.log("Got message with body: " + message.body);
                    setGameId(message.body); // Set the gameId here
                    setIsConnected(true);
                    setIsMyTurn(true);
                    // Now that gameId is set, subscribe to the other topics
                    
                } else {
                    console.log("Got empty message");
                }
            });
        
            subscribeToGameTopics(id, stompClientRef); // Pass the gameId to the function
            errorHandling(stompClientRef);

            stompClientRef.current.publish({
                destination: "/app/create-game", // Endpoint to send the message to
                body: id // The payload of the message, empty for creating a game
            });
        };

        stompClientRef.current.activate();
    }

    const joinGameContext = () => {
        console.log("Attempting to join game...");  // Initial log for function entry
        const socket = new SockJS('http://localhost:7070/game');
        
        stompClientRef.current = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    
        stompClientRef.current.onConnect = () => {
            console.log('Connected to the WebSocket');  // Log when connected
            
            // Publish a request to join the game
            console.log('Publishing join-game message for gameId:', gameId);
            stompClientRef.current.publish({
                destination: "/app/join-game", // Endpoint to send the message to
                body: gameId // The payload of the message
            });
    
            subscribeToGameTopics(gameId, stompClientRef);
        };
    
        errorHandling(stompClientRef);

        stompClientRef.current.activate();
    };
    

    const sendMoveContext = (index, player) => {
        console.log("Sending move: ", index, player);

        if (stompClientRef.current && stompClientRef.current.connected) {
            const move = JSON.stringify({ position: index, symbol: player, gameId: gameId });
            console.log("Sending move: ", move);  // Add this log
            stompClientRef.current.publish({
                destination: "/app/make-move", // Correct destination for sending moves
                body: move,
            });
            console.log("Move sent: ", move);
        }
    };


    return (
        <WebSocketContext.Provider value={{stompClientRef,
            createGame,
            gameId,
            sendMoveContext,
            joinGameContext,
            setGameId,
            isConnected,
            isReady,
            isMyTurn,
            setIsMyTurn}}>

            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    return useContext(WebSocketContext);
};
