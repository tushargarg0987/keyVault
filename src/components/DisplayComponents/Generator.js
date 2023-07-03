import { useState } from "react";

function Generator() {
    const [type, setType] = useState('1');
    const [length, setLength] = useState(0);
    const [resultState, setResultState] = useState('hidden')
    const [generated, setGenerated] = useState('');
    const [generated2, setGenerated2] = useState('');
    const [generated3, setGenerated3] = useState('');
    const [generated4, setGenerated4] = useState('');
    const [generated5, setGenerated5] = useState('');

    function copyPass(ele) {
        console.log("Copied");
        var copyText = document.getElementById(ele);
        copyText.select();
        navigator.clipboard.writeText(copyText.value);
    }

    function generateHandler() {
        setGenerated(generateString());
        setGenerated2(generateString());
        setGenerated3(generateString());
        setGenerated4(generateString());
        setGenerated5(generateString());
        setResultState('visible')
    }

    
    function generateString() {
        var characters;
        switch (type) {
            case '1':
                characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#0123456789$%^&';
                break;
            case '2':
                characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                break;
            case '3':
                characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                break;
            case '4':
                characters = '0123456789';
                break;
            default:
                characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                break;
        }
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters[(Math.floor(Math.random() * charactersLength))];
        }

        return result;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '80%', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {/* <h1>{type}</h1> */}
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{marginLeft: 8}}>Character Type</label>
                <select id="type-select" onInput={() => {
                    setType(document.getElementById("type-select").value)
                    // console.log(type);
                }}>
                    <option value={1}>All Characters</option>
                    <option value={2}>Alphanumeric</option>
                    <option value={3}>Alphabets only</option>
                    <option value={4}>Nubers only</option>
                </select>
                </div>
                {/* {generateString(1,6)} */}
                <div style={{display: 'flex', flexDirection: 'column',marginLeft: '2vw'}}>
                <label style={{marginLeft: 8}}>Length</label>
                <input type="number" id="quantity" onInput={(e) => { setLength(e.target.value); }} placeholder="Enter length"></input>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <button style={{ fontSize: 25, padding: '10px 50px', width: 'max-content', backgroundColor: '#4D4D4D', color: 'white', borderRadius: 10, marginTop: 20 , cursor: 'pointer'}} onClick={() => {
                    generateHandler();
                }}>Generate</button>
            </div>
            {/* <h1>{ generated}</h1> */}
            <div style={{visibility: resultState}} className="output-set">
                <div>
                    <input id="generated-string" value={generated} style={{ fontSize: 25, padding: 10, width: '28vw', borderRadius: 10 }} disabled="disabled"></input>
                    <img src="copy.png" style={{ position: 'absolute', marginLeft: 10, marginTop: 10, width: 30, cursor: 'pointer' }} onClick={() => {
                        copyPass('generated-string');
                    }}></img>
                </div>
                <div>
                    <input id="generated-string2" value={generated2} style={{ fontSize: 25, padding: 10, width: '28vw', borderRadius: 10 }} disabled="disabled"></input>
                    <img src="copy.png" style={{ position: 'absolute', marginLeft: 10, marginTop: 10, width: 30, cursor: 'pointer' }} onClick={() => {
                        copyPass('generated-string2');
                    }}></img>
                </div>
                <div>
                    <input id="generated-string3" value={generated3} style={{ fontSize: 25, padding: 10, width: '28vw', borderRadius: 10 }} disabled="disabled"></input>
                    <img src="copy.png" style={{ position: 'absolute', marginLeft: 10, marginTop: 10, width: 30, cursor: 'pointer' }} onClick={() => {
                        copyPass('generated-string3');
                    }}></img>
                </div>
                <div>
                    <input id="generated-string4" value={generated4} style={{ fontSize: 25, padding: 10, width: '28vw', borderRadius: 10 }} disabled="disabled"></input>
                    <img src="copy.png" style={{ position: 'absolute', marginLeft: 10, marginTop: 10, width: 30, cursor: 'pointer' }} onClick={() => {
                        copyPass('generated-string4');
                    }}></img>
                </div>
                <div>
                    <input id="generated-string5" value={generated5} style={{ fontSize: 25, padding: 10, width: '28vw', borderRadius: 10 }} disabled="disabled"></input>
                    <img src="copy.png" style={{ position: 'absolute', marginLeft: 10, marginTop: 10, width: 30, cursor: 'pointer' }} onClick={() => {
                        copyPass('generated-string5');
                    }}></img>
                </div>
            </div>
        </div>
    )
}

export default Generator;