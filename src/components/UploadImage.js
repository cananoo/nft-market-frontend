import React,{useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css'

function UploadImage({address}){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }  
};

    const handleUpload = async (event) => {
        event.preventDefault();
        if(fileInputRef.current.files.length === 0){
            alert("Please select a file"); 
            return;
        }
        const formData = new FormData();
        formData.append("file",fileInputRef.current.files[0]);
        formData.append("title",title);
        formData.append("description",description);
       formData.append('address',address);
        try{
          const response =  await axios.post("http://localhost:3000/upload",formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                },
            });
            console.log("File Uploaded Successfully",response.data);
            navigate("/success");
        }catch(error){
            console.log('Error uploading file',error);
        }
    };

 return (
        <div className="upload-container">
            <h1>Upload Image to IPFS and Mint NFT</h1>
            <form className="upload-form" onSubmit={handleUpload}>
                <input
                type="text"
                id="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

                <label htmlFor="description">Description</label>
                <textarea
                id="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="file">Image *</label>
                <input
                type="file"
                id="file"
                ref={fileInputRef}
                required
                />

                <div className="buttons">
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    <button type="submit" 
                    className="upload-button"
                    >Upload</button>
                </div>
            </form>
        </div>
    );
}

export default UploadImage;



          

