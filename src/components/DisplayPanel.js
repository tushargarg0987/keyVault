import { useState } from "react";
import Logins from "./DisplayComponents/Logins";
import PinnedScreen from "./DisplayComponents/Pinned";
import Generator from "./DisplayComponents/Generator";
import AddPassword from "./DisplayComponents/AddPassword";
import NotesPage from "./DisplayComponents/Notes";

function DisplayPanel({ tab, setTab, data, setData, setAuthenticated, setChanging }) {
    var passId = 0;
    const [addState, setAddState] = useState('none')
    const [defaultData, setDefaultData] = useState('something');
    const [isDeleting, setIsDeleting] = useState(null);
    const [isChanging, setIsChanging] = useState(false);

    function addPassHandler() {
        setDefaultData(null);
        setIsDeleting(null);
        setAddState('flex');
        setIsChanging(false)
    }

    function updateHandler(data) {
        setDefaultData(data)
        setIsDeleting(null);
        setAddState('flex');
        setIsChanging(false)
    }

    function deleteHandler(data) {
        // setDefaultData(null)
        setIsDeleting(data);
        setIsChanging(false)
        setAddState('flex');
    }

    return (
        <>
            <div className="display-panel">
                <div className="option-set">
                    <img className="option-icon" src="addIcon.png" alt="Add" onClick={addPassHandler} />
                    <img className="option-icon" style={{ marginRight: 30 }} src="settingIcon.png" alt="settings" onClick={() => { 
                        setIsChanging(true);
                        setAddState('flex');
                        setIsDeleting(true);
                    }} />
                </div>
                <div style={{ zIndex: 20,display: addState, justifyContent: 'left',flex: 1,width: '100%',height: '100vh'}}>
                    <AddPassword triggeringTab={tab} setAddState={setAddState} setData={setData} data={data} defaultData={defaultData} isDeleting={isDeleting} isChanging={isChanging} setAuthenticated={setAuthenticated} setChanging={setChanging} />
                </div>
                {data && tab === "Pinned" && <PinnedScreen data={data} passId={passId} setData={setData} setTab={setTab} updateHandler={updateHandler} deleteHandler={deleteHandler} />}
                {data && tab === "Login" && (data.logins).length === 0 && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%' }}><h1 className="no-data-head">No login data pinned</h1></div>}
                {data && tab === "Login" && (data.logins).length > 0 && <Logins data={data} passId={passId} setData={setData} setTab={setTab} updateHandler={updateHandler} deleteHandler={deleteHandler} />}
                {data && tab === "Generator" && <Generator />}
                {data && tab === "Secure Notes" && <NotesPage data={data} setData={setData} updateHandler={updateHandler} deleteHandler={deleteHandler} />}
            </div>
        </>
    )
}

export default DisplayPanel;