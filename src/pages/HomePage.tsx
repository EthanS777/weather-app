import '../App.css'

type Props = {
    darkMode: boolean;
}

export default function HomePage({darkMode}: Props) {
    return (
        <>
       <div className="homeTopRow">
       <div className="homeIntro"
       style={{
        backgroundColor: `${darkMode ? "rgba(205, 205, 205, 0.7)" : "rgba(155, 155, 155, 0.7)"}`,
        border: `${darkMode ? "2px solid white" : "2px solid black"}`
        }}>
        <h2>Background</h2>
        <p>Hi there, welcome to my weather app! After graduating from RIT, I decided to embark on this personal project. I've always been a weather nerd 
            and enjoy utilizing weather apps, but I'm always hunting for improvements that could enhance the experience, thus came the decision to build my own. 
            I've thoroughly enjoyed working on this project! <br /> <br /> Built with React & TypeScript.
        </p>
       </div>
       <div className="homeWelcome"
       style={{
        backgroundColor: `${darkMode ? "rgba(205, 205, 205, 0.7)" : "rgba(155, 155, 155, 0.7)"}`,
        border: `${darkMode ? "2px solid white" : "2px solid black"}`
       }}>
        <h1>WeatherRoom</h1>
        <p>Est. 2026</p>
       </div>
       </div>
       </>
    )
}