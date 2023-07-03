function Sidebar({ tab, setTab }) {
    // console.log(tab);
    function clickHandler(data) {
        setTab(data);
    }
    return (
        <div className="side-bar">
            <h1 style={{ color: 'white',fontSize: '1.8vw' }}>keyVault</h1>
            <hr style={{width: '80%',border: '2px solid white',borderRadius: 3,marginBottom: '10%'}} />
            <div className="side-tile" style={tab === "Pinned" ? { backgroundColor: 'white' } : {}} onClick={()=>clickHandler("Pinned")}>
                <img src="pin-black.png"></img>
                <h4>Pinned</h4>
            </div>
            <div className="side-tile" style={tab === "Login" ? { backgroundColor: 'white' } : {}} onClick={() => clickHandler("Login")}>
                <img src="lock.png"></img>
                <h4>Logins</h4>
            </div>
            <div className="side-tile" style={tab === "Secure Notes" ? { backgroundColor: 'white' } : {}} onClick={()=>clickHandler("Secure Notes")}>
                <img src="notes.png"></img>
                <h4>Secure Notes</h4>
            </div>
            <div className="side-tile" style={tab === "Generator" ? { backgroundColor: 'white' } : {}} onClick={()=>clickHandler("Generator")} >
                <img src="key.png"></img>
                <h4>Generator</h4>
            </div>
        </div>
    )
}

export default Sidebar
