import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import { NavBar } from "./NavBar"
import { SinglePlayer } from "./SinglePlayer"
import { Multiplayer } from "./Multiplayer"
import HomePage from "./HomePage"

export const MainComponent = () => {
    return(
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/SinglePlayer" element={<SinglePlayer />}/>
                    <Route path="/Multiplayer" element={<Multiplayer />}/>
                    <Route path="/*" element={<h2>Page Not Found</h2>}/>
                </Routes>
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="floating-circle circle-3"></div>
                <div className="floating-circle circle-4"></div>
                <div className="floating-circle circle-5"></div>

            </div>
        </Router>
    )
}