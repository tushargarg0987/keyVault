import { useEffect, useState } from "react";

const { openExternal } = window.require('electron').shell

function PinnedScreen({ data, passId, setData, updateHandler,deleteHandler }) {
    const [pinning, setPinning] = useState(true)
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        setFlag(0)
    },[pinning,data])
    function showPass(ele) {
        document.getElementById(ele).type = 'text'
    }

    function hidePass(ele) {
        document.getElementById(ele).type = 'password'
    }

    function copyPass(ele) {
        console.log("Copied");
        var copyText = document.getElementById(ele);
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
    }

    function pinPass(url) {
        var updateData = data;
        for (let ele in updateData.logins) {
            if (updateData.logins[ele].url === url) {
                updateData.logins[ele].pinned = "true";
            }
        }
        setData.bind(this, updateData);
        if (pinning) {
            setPinning(false);
        } else {
            setPinning(true);
        }
        const writeData = JSON.stringify(updateData);
        window.localStorage.setItem("pmdata", writeData)
    }

    function unpinPass(url) {
        var updateData = data;
        for (let ele in updateData.logins) {
            if (updateData.logins[ele].url === url) {
                updateData.logins[ele].pinned = "false";
            }
        }
        setData.bind(this, updateData);
        if (pinning) {
            setPinning(false);
        } else {
            setPinning(true);
        }
        const writeData = JSON.stringify(updateData);
        window.localStorage.setItem("pmdata", writeData)
    }
    return (
        <>
            <div style={flag === 1 ? { display: 'flex', justifyContent: 'left', width: '100%', flexDirection: 'column', overflowY: 'scroll', height: '100%' } : { display: 'none' }}>{data.logins.map((login) => {
                if (login.pinned === "true") {
                    if (flag === 0) {
                        setFlag(1)
                    }
                    passId++
                    return (
                        <div key={login.url} className="login-item" align='center' >
                            <div style={{ width: '30%' }}>
                                <img className="title-icon" src={`https://www.google.com/s2/favicons?domain=${login.url}&sz=64`}></img>
                                <h2>{login.title}</h2>
                            </div>
                            {login.url.includes('http') ? <h3 onClick={() => { openExternal(login.url) }} title={`Redirect to ${login.url}`}>{login.url}</h3> : <h3 title={`Redirect to ${login.url}`} onClick={() => { openExternal(`http:\\\\${login.url}`) }}>{login.url}</h3>}
                            <div style={{justifyContent: 'flex-end'}}>
                                <input type="password" value={login.password} id={passId} disabled="disabled" />
                                <div className="pass-icons">
                                    <img className="pass-icons-img" title="Show password" src="eye.png" onMouseOut={hidePass.bind(this, passId)} onMouseOver={showPass.bind(this, passId)}></img>
                                    <img className="pass-icons-img" src="copy.png" title="Copy to Clipboard" onClick={copyPass.bind(this, passId)}></img>
                                    {login.pinned === "true" ? <img className="pass-icons-img" src="unpin.png" title="Unpin" onClick={() => unpinPass(login.url)}></img> : <img className="pass-icons-img" title="Pin" src="pin.png" onClick={() => pinPass(login.url)}></img>}
                                    <img className="pass-icons-img" src="delete.png" title="Delete" onClick={() => {
                                        deleteHandler({ url: login.url })
                                        if (pinning) {
                                            setPinning(false);
                                        } else {
                                            setPinning(true);
                                        }
                                    }}></img>
                                    <img className="pass-icons-img" src="edit.png" title="Edit" onClick={updateHandler.bind(this,login)}></img>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}</div>
            <div style={flag === 0 ? { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%' }: {display: 'none'}}><h1 className="no-data-head">No login data pinned</h1></div>
        </>
    )
}

export default PinnedScreen