import {useState} from 'react';
import Progress from './Progress';
import axios from 'axios';
const Fileupload = () => {
    const[file,setFile] = useState('');
    const[filename,setFilename] = useState('Choose File');
    const[uploadedFile,setUploadedFile] = useState({});
    const[uploadpercentage,setUploadPercentage] = useState(0);

    const onChange = (e) =>{
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
    }

    const onSubmit = async (e) => {
        
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        try{
            const res = await axios.post('/upload',formData,{
                headers: {
                    'Content-type' : 'multipart/form-data'
                },
                onUploadProgress : progressEvent =>{
                    setUploadPercentage(
            parseInt(
            Math.round((progressEvent.loaded*100) / progressEvent.total)
            ));

                   
            setTimeout(() => setUploadPercentage(0),10000);
                }

                
            });

            const {fileName , filePath} = res.data;
            setUploadedFile({fileName,filePath});
        }catch(err){
            if(err.response.status === 500){
                console.log('there was a problem with the server')
            }else{
                console.log(err.response.data.message);
            }
        }
    }

    return (
        <>
           <form onSubmit={onSubmit}>
           <div>
  <label htmlFor="formFileLg" className="form-label">{filename}</label>
  <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={onChange}/>
</div>
<div className="d-grid gap-2">
    <Progress percentage={uploadpercentage}/>
  <input className="btn btn-primary mt-4" type="submit" value="Upload"/>
  
</div>
            </form> 

            {uploadedFile && <div className="row mt-5 ">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedFile.fileName}</h3>
                    <img style={{width : "100%"}} src={uploadedFile.filePath} alt="" />
                </div>
                </div>}
        </>
    )
}

export default Fileupload
