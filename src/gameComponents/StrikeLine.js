import React from "react";

export const StrikeLine = ({ combination }) => {
    const styles = {
        position: "absolute",
        backgroundColor: "red", // Color of the strike line
        zIndex: 10
    };

    // Determine the position and style of the strike based on the winning combination
    console.log(combination)
    const getStrikeStyle = () => {
        if (combination.length === 3) {
            if (combination[0] % 3 === 0 && combination[1] % 3 === 0 && combination[2] % 3 === 0) {
                // Vertical line
                return {
                    ...styles,
                    height: "100%",
                    width: "10px",
                    left: `${combination[0] % 3 * 110 + 50}px`, // Centered
                    top: "0"
                };
            } else if (combination[0] < 3) {
                // Horizontal line
                return {
                    ...styles,
                    width: "100%",
                    height: "10px",
                    top: `${Math.floor(combination[0] / 3) * 110 + 50}px`, // Centered
                    left: "0"
                };
            } else if (combination.includes(0) && combination.includes(8)) {
                // Diagonal from top-left to bottom-right
                return {
                    ...styles,
                    width: "150%",
                    height: "10px",
                    left: "0",
                    top: "0",
                    transform: "rotate(45deg)",
                    transformOrigin: "top left",
                };
            } else if (combination.includes(2) && combination.includes(6)) {
                // Diagonal from top-right to bottom-left
                return {
                    ...styles,
                    width: "150%",
                    height: "10px",
                    left: "0",
                    top: "0",
                    transform: "rotate(-45deg)",
                    transformOrigin: "top right",
                };
            }
        }
        return {};
    };

    return <div style={getStrikeStyle()} />;
};
