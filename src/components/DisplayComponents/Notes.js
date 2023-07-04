function NotesPage({ data, setData, updateHandler, deleteHandler }) {

    return (
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', overflowX: 'hidden', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', overflowX: 'hidden', justifyContent: 'flex-start',width: '100%' }}>
                {data.notes.map((ele) => {
                    return (
                        <div className="note-div" key={ele.id}>
                            <h3>{ele.title}
                                <div>
                                    <img src="delete.png" onClick={() => {
                                        deleteHandler({id: ele.id})
                                    }} title="Delete"></img>
                                    <img src="edit.png" onClick={updateHandler.bind(this, ele)} title="Edit"></img>
                                </div>
                            </h3>
                            <h5>{ele.desc}</h5>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NotesPage