import { useEffect, useState } from "react";
const { ipcRenderer } = window.require('electron');

function AddPassword({ triggeringTab, setAddState, setData, data, defaultData, isDeleting, isChanging, setAuthenticated, setChanging }) {
    const [isUpdatting, setIsUpdatting] = useState(false)
    const [title, setTitle] = useState('')
    const [urlState, setUrl] = useState('')
    const [password, setPassword] = useState('')
    const [desc, setDesc] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [eventHandler, setEventHandler] = useState(false)
    const [authPass, setAuthPass] = useState('')

    useEffect(() => {
        setAuthPass(JSON.parse(window.localStorage.getItem("pmauth")))
        const effectFunction = () => {
            if (defaultData === null) {
                setTitle('');
                setUrl('');
                setPassword('');
                setDesc('');
                setIsUpdatting(false)
            } else {
                // console.log(defaultData);
                if (defaultData.title) { setTitle(defaultData.title) }
                if (defaultData.url) { setUrl(defaultData.url) }
                if (defaultData.password) { setPassword(defaultData.password) }
                if (defaultData.desc) { setDesc(defaultData.desc) }
                setIsUpdatting(true)
            }
            if (!eventHandler) {
                ipcRenderer.on('updateMessage', (event, arg) => {
                    if (arg === 1) {
                        setIsUpdatting(true);
                    } else {
                        setAddState('none')
                    }
                })
                setEventHandler(true);
            }
        }
        effectFunction();
    }, [defaultData])


    function checkHandler(url) {
        setUrl(url);
        const check = data.logins.find((login) => {
            return login.url === url;
        })
        if (check) {
            ipcRenderer.send('updateMessage', "To be updated");
        } else {
            setIsUpdatting(false);
        }
    }

    function addNoteHandler() {
        var updateData = data;
        const newIndex = data.notesIndex + 1;
        const newNote = {
            title: title,
            desc: desc,
            id: newIndex
        }

        updateData.notes.push(newNote);
        updateData.notesIndex = newIndex
        setData.bind(this, updateData);
        const writeData = JSON.stringify(updateData);
        window.localStorage.setItem("pmdata", writeData)
        setAddState('none')
        setTitle('');
        setDesc('');
    }

    function showPassword(id) {
        document.getElementById(id).type = 'text'
    }

    function hidePassword(id) {
        document.getElementById(id).type = 'password'
    }

    function addHandler() {
        const updateData = data;
        const newLogin = {
            title: title,
            url: urlState,
            password: password,
            pinned: 'false'
        }
        updateData.logins.push(newLogin);
        setData.bind(this, updateData);
        const writeData = JSON.stringify(updateData);
        window.localStorage.setItem("pmdata", writeData)
        setAddState('none')
        setTitle('');
        setUrl('');
        setPassword('');
    }

    function updateHandler() {
        var updateData = data;
        for (let ele in updateData.logins) {
            if (updateData.logins[ele].url === urlState) {
                updateData.logins[ele].title = title;
                // updateData.logins[ele].url = urlState;
                updateData.logins[ele].password = password;
            }
        }
        setData.bind(this, updateData);
        const writeData = JSON.stringify(updateData);
        window.localStorage.setItem("pmdata", writeData)
        setAddState('none')
    }

    function deleteHandler() {
        var totalData = data;
        if (isDeleting.url) {
            const updateData = data.logins.filter((ele) => {
                return ele.url !== isDeleting.url;
            });
            totalData.logins = updateData;
        } else if (isDeleting.id) {
            const newNotes = data.notes.filter((ele) => {
                return ele.id !== isDeleting.id
            })
            totalData.notes = newNotes
        }
        setData.bind(this, totalData);
        const writeData = JSON.stringify(totalData);
        window.localStorage.setItem("pmdata", writeData)
        setAddState('none')
    }

    function updateNoteHandler() {
        var updateData = data;
        for (let ele in updateData.notes) {
            if (updateData.notes[ele].id === defaultData.id) {
                updateData.notes[ele].title = title;
                // updateData.logins[ele].url = urlState;
                updateData.notes[ele].desc = desc;
            }
        }
        setData.bind(this, updateData);
        const writeData = JSON.stringify(updateData);
        window.localStorage.setItem("pmdata", writeData)
        setAddState('none')
    }

    if (!isDeleting) {
        if (triggeringTab === "Secure Notes") {
            return (
                <div className="add-div" align='center'>
                    <h1>Add Note</h1>
                    <div className="add-box" style={{ width: '60%', height: '50%', backgroundColor: '#bababa', flexDirection: 'column', display: 'flex', justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                        {!isAuthenticating && <>
                            <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }} align='left' className="add-input-set">
                                <label>Title</label>
                                <input onChange={(e) => {
                                    setTitle(e.target.value)
                                }} value={title}></input>
                                <label>Description</label>
                                <textarea rows={4} onChange={(e) => { setDesc(e.target.value); }} value={desc}></textarea>
                            </div>
                            <div className="add-button-set">
                                <button onClick={() => {
                                    if (!isUpdatting) {
                                        setTitle('');
                                        setDesc('');
                                    }
                                    setAddState('none')
                                }} >Cancel</button>
                                <button onClick={() => {
                                    if (isUpdatting) {
                                        setIsAuthenticating(true)
                                    } else {
                                        addNoteHandler();
                                    }

                                }} >{!isUpdatting ? 'Add' : 'Update'}</button>
                            </div>
                        </>}
                        {isAuthenticating && <>
                            <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }} align='left' className="add-input-set">
                                <label>Password</label>
                                <input id="input-pass" type="password" onMouseOver={() => { showPassword('input-pass') }} onMouseOut={() => { hidePassword('input-pass') }}></input>
                                <p style={{ marginTop: '-2vh' }}>* Hover to see the password</p>
                            </div>
                            <div className="add-button-set">
                                <button onClick={() => {
                                    setIsAuthenticating(false)
                                    if (defaultData.title) { setTitle(defaultData.title) }
                                    if (defaultData.desc) { setDesc(defaultData.desc) }
                                }} >Cancel</button>
                                <button onClick={() => {
                                    if (document.getElementById('input-pass').value === authPass.password) {
                                        setIsAuthenticating(false)
                                        updateNoteHandler();
                                    } else {
                                        document.getElementById('input-pass').value = ''
                                        ipcRenderer.send('invalidPass', "To be updated");
                                    }
                                }} >Confirm</button>
                            </div>
                        </>}
                    </div>
                </div>
            )
        }

        return (
            <div className="add-div" align='center'>
                <h1>{!isUpdatting ? 'Add ' : 'Update '}Credentials</h1>
                <div className="add-box" style={{ width: '60%', height: '50%', backgroundColor: '#bababa', flexDirection: 'column', display: 'flex', justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                    {!isAuthenticating && <>
                        <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }} align='left' className="add-input-set">
                            <label>Title</label>
                            <input onChange={(e) => {
                                setTitle(e.target.value)
                            }} value={title}></input>
                            <label>Website URL</label>
                            {defaultData === null ? <input onChange={(e) => {
                                checkHandler(e.target.value)
                            }} value={urlState}></input> : <input onChange={(e) => {
                                checkHandler(e.target.value)
                            }} value={urlState} disabled="disabled"></input>}
                            <label>Password</label>
                            <input id="input-pass" onChange={(e) => {
                                setPassword(e.target.value)
                            }} value={password} type="password" onMouseOver={() => { showPassword('input-pass') }} onMouseOut={() => { hidePassword('input-pass') }}></input>
                            <p style={{ marginTop: '-2vh' }}>* Hover to see the password</p>
                        </div>
                        <div className="add-button-set">
                            <button onClick={() => {
                                if (!isUpdatting) {
                                    setTitle('');
                                    setUrl('');
                                    setPassword('');
                                }
                                setAddState('none')
                            }} >Cancel</button>
                            <button onClick={() => {
                                if (isUpdatting) {
                                    setIsAuthenticating(true)
                                } else {
                                    addHandler();
                                }
                            }} >{!isUpdatting ? 'Add' : 'Update'}</button>
                        </div>
                    </>}
                    {isAuthenticating && <>
                        <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }} align='left' className="add-input-set">
                            <label>Password</label>
                            <input id="input-pass" type="password" onMouseOver={() => { showPassword('input-pass') }} onMouseOut={() => { hidePassword('input-pass') }}></input>
                            <p style={{ marginTop: '-2vh' }}>* Hover to see the password</p>
                        </div>
                        <div className="add-button-set">
                            <button onClick={() => {
                                setIsAuthenticating(false)
                                if (defaultData.title) { setTitle(defaultData.title) }
                                if (defaultData.url) { setUrl(defaultData.url) }
                                if (defaultData.password) { setPassword(defaultData.password) }
                            }} >Cancel</button>
                            <button onClick={() => {
                                if (document.getElementById('input-pass').value === authPass.password) {
                                    setIsAuthenticating(false)
                                    updateHandler()
                                } else {
                                    document.getElementById('input-pass').value = ''
                                    ipcRenderer.send('invalidPass', "To be updated");
                                }
                            }} >Confirm</button>
                        </div>
                    </>}
                </div>
            </div>
        )
    }
    return (<>
        <div className="add-div" align='center'>
            <h1>{isChanging ? "Authenticate to change password":"Confirm Delete"}</h1>
            <div className="add-box" style={{ width: '60%', height: '50%', backgroundColor: '#bababa', flexDirection: 'column', display: 'flex', justifyContent: 'center', borderRadius: 5, alignItems: 'center' }}>
                <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }} align='left' className="add-input-set">
                    <label>Password</label>
                    <input id="input-pass" type="password" onMouseOver={() => { showPassword('input-pass') }} onMouseOut={() => { hidePassword('input-pass') }}></input>
                    <p style={{ marginTop: '-2vh' }}>* Hover to see the password</p>
                </div>
                <div className="add-button-set">
                    <button onClick={() => {
                        setAddState('none')
                        document.getElementById('input-pass').value = '';
                    }} >Cancel</button>
                    <button onClick={() => {
                        if (document.getElementById('input-pass').value === authPass.password) {
                            setIsAuthenticating(false)
                            document.getElementById('input-pass').value = ''
                            if (isChanging) {
                                setAuthenticated(false)
                                setChanging(true)
                            } else {
                                deleteHandler();
                            }
                        } else {
                            document.getElementById('input-pass').value = ''
                            ipcRenderer.send('invalidPass', "To be updated");
                        }
                    }} >Confirm</button>
                </div>
            </div>
        </div>
    </>)
}

export default AddPassword