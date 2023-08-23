import React, {useState, useRef} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function DragDropFile({extensions = [], handleFiles}) {
    const extensionRegex = new RegExp(extensions.join("|")); // this regex match only the files name that have the right extensions
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);
    
    window.addEventListener("dragover",function(e){
        e.preventDefault();
    },false);
    
    window.addEventListener("drop",function(e){
        e.preventDefault();
    },false);

    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        // if the user enter the zone while draggin files then we active the dragActive
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        // if instead we release the files in the zone then we disabled the dragActive
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    
    // triggers when the files are dropped
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        // we filter only the files object to check whenever there have a supported extension
        const fileslist = [...e.dataTransfer.files].filter((file)=>extensionRegex.test(file.name));
        if (fileslist.length > 0) {
            handleFiles(fileslist); // we send the files array to the parent component
        }
    };
    
    // triggers when files are selected with click
    const handleChange = function(e) {
        e.preventDefault();
        // we filter only the files object to check whenever there have a supported extension
        const fileslist = [...e.target.files].filter((file)=>extensionRegex.test(file.name));
        if (fileslist.length > 0) {
            handleFiles(fileslist); // we send the files array to the parent component
        }
    };
    
    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };
    
    return (
        <form className="h24 w-full max-w-full text-center relative" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
            <input className="hidden" ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                <label htmlFor="input-file-upload" className={`${dragActive ? "bg-white" : "" } h-full flex flex-col justify-center items-center border-2 rounded-2xl border-dashed border-slate-400 bg-slate-300`}>
                    <div className="flex flex-col items-center justify-center">
                        <CloudUploadIcon fontSize="large"/>
                        <p>Drag and drop your file here or</p>
                        <button className="cursor-pointer p-1 bg-transparent font-serif font-bold border-0 hover:underline" onClick={onButtonClick}>Upload a file</button>
                    </div> 
                </label>
            { dragActive && <div className="absolute w-full h-full rounded-2xl top-0 right-0 bottom-0" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
        </form>
    );
};
