import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const useWebSocket = () => {
    const stompClientRef = useRef(null);
    const moveCallbackRef = useRef(null);

    useEffect(() => {
        // Create SockJS WebSocket connection
        const socket = new SockJS("http://localhost:8080/game");
        stompClientRef.current = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            clientId: "your-client-id", // Optional: specify a client ID if needed
            debug: (msg) => { console.log(msg); }, // Enable debug logging
        });

        stompClientRef.current.onConnect = (frame) => {
            console.log("Connected: ", frame);
            console.log("Client ID: ", stompClientRef.current.clientId);
        
            // Subscribe to the game topic where moves are broadcasted
            stompClientRef.current.subscribe("/topic/moves", (message) => {
                console.log("Message received: ", message.body);  // Debug log
                const { index, player } = JSON.parse(message.body);
                if (moveCallbackRef.current) {
                    moveCallbackRef.current(index, player);
                }
            });
            console.log("Subscribed to /topic/moves");
        };
        
        

        stompClientRef.current.onStompError = (frame) => {
            console.error("STOMP error: ", frame.headers["message"]);
        };

        stompClientRef.current.activate();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate(); // Cleanup
            }
        };
    }, []);

    const sendMove = (index, player) => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            const move = JSON.stringify({ index, player });
            console.log("Sending move: ", move);  // Add this log
            stompClientRef.current.publish({
                destination: "/app/move", // Correct destination for sending moves
                body: move,
            });
            console.log("Move sent: ", move);
        }
    };

    const onMoveReceived = (callback) => {
        moveCallbackRef.current = callback;
    };

    return { sendMove, onMoveReceived };
};

export default useWebSocket;
