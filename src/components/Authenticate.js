import { useEffect, useState } from "react"
const { ipcRenderer } = window.require('electron');

function Authenticate({ setAuthenticated, changing }) {
    const [signedUp, setSignedUp] = useState(false)
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [color, setColor] = useState('black');
    const [authPass, setAuthPass] = useState();
    const [visible, setVisible] = useState('hidden')

    useEffect(() => {
        if (window.localStorage.getItem("pmauth")) {
            setSignedUp(true);
            setAuthPass(JSON.parse(window.localStorage.getItem("pmauth")));
        }
    }, [])

    function login() {
        if (password === authPass.password) {
            setAuthenticated(true)
        } else {
            ipcRenderer.send('invalidPass', "To be updated");
            setPassword('')
        }
    }

    function createUser() {
        if (color === 'green') {
            const userData = {
                name: name,
                password: password
            }
            console.log(userData);
            const writeData = JSON.stringify(userData);
            window.localStorage.setItem("pmauth", writeData)
            setAuthenticated(true)
        } else {
            setVisible('visible')
        }
    }

    function confirmPasswordCheck(pass) {
        const checkWith = pass ? pass : password;
        const e = document.getElementById('conf-pass').value
        if (e === checkWith) {
            setColor('green')
        } else if (checkWith.includes(e)) {
            setColor('black')
        } else {
            setColor('red')
        }
    }

    if (!signedUp || !!changing) {
        return (
            <div className="signup-back">
                <div className="signup-container">
                    <h1>{!changing ? "Welcome to PManager" : "Change Password"}</h1>
                    <div className="signup-container-dark">
                        <div className="signup-input-set">
                            <label>Name</label>
                            <input onChange={(e) => {
                                setName(e.target.value)
                            }}></input>
                            <label>Password</label>
                            <input type="password" onChange={(e) => {
                                setPassword(e.target.value)
                                confirmPasswordCheck(e.target.value);
                            }}></input>
                            <label style={{ color: color }}>Confirm Password</label>
                            <input id="conf-pass" type="password" style={color === 'black' ? { backgroundColor: 'white' } : color === 'green' ? { background: '#c0ffc0' } : { backgroundColor: '#ff9999' }} onChange={() => {
                                confirmPasswordCheck();
                            }}></input>
                            <p style={{ marginTop: '-20px', visibility: visible }}>Password and Confirm Password does not match</p>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                                <button style={{ fontSize: 18, padding: '10px 50px', width: 'max-content', backgroundColor: '#4D4D4D', color: 'white', borderRadius: 10, marginTop: 20, cursor: 'pointer' }} onClick={createUser}>{!changing ? "Create" : "Change"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="signup-back">
            <div className="signup-container">
            {authPass ? <h1>Welcome back {authPass.name}</h1> : <h1>Welcome back</h1>}
                <div className="signup-container-dark">
                    
                    {/* {authPass && <h1>{authPass.password}</h1>} */}
                    <div className="signup-input-set">
                        {/* <label>Name</label>
                    <input></input> */}
                        <label>Password</label>
                        <input type="password" onKeyDown={(e) => {
                            // console.log(e.key);
                            if (e.key === 'Enter') {
                                login()
                            }
                        }} onChange={(e) => {
                            setPassword(e.target.value)
                        }} value={password}></input>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                            <button style={{ fontSize: 18, padding: '10px 50px', width: 'max-content', backgroundColor: '#4D4D4D', color: 'white', borderRadius: 10, marginTop: 20, cursor: 'pointer' }} onClick={login}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authenticate