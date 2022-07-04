import "./App.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
const App = () => {
    const [menu,setMenu] = useState([
        {
            route : "/alphabet",
            title: "Learn The Alphabet"
        },
        {
            route : "/numbers",
            title : "Learn the Numbers"
        }
    ])
    return <div className="home">
        <h1>Welcome to Neuron Stimuli</h1>
        <nav>
            <ul style={{listStyleType : 'none'}}>
                {menu.map((m,i)=><li><Link className="menu_link" key={i} to={m.route}>{m.title}</Link></li>)}
            </ul>
        </nav>
    </div>
}

export default App