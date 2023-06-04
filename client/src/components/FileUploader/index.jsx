import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react';
import '../../index.css';
import "./fileuploader.css";

const FileUploader = () => {
    const fileRef = useRef(null);
    const containerRef = useRef(null);

    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState('');
    const [fileData, setFileData] = useState('');

    const openFileDialog = (e) => {
        e.preventDefault();
        fileRef.current.click();
    }

    const dragEnter = (e) => {
        e.preventDefault();
        containerRef.current.classList.add('border-active');
    }

    const dragLeave = (e) => {
        e.preventDefault();
        containerRef.current.classList.remove('border-active');
    }

    const drop = (e) => {
        e.preventDefault();
        containerRef.current.classList.remove('border-active');

        setFileData(e.dataTransfer.files[0]);
    }

    const change = (e) => {
        e.preventDefault();

        setFileData(e.target.files[0]);
    }

    const uploadFile = (e) => {
        e.preventDefault();

        const validTypes = ['png', 'jpg', 'jpeg', 'gif'];

        if(fileData === ''){
            showMessage("Please select a file.", "danger")
            return;
        }

        if(!validTypes.includes(fileData.type.split('/')[1])){
            showMessage(`File is not valid. Only ${validTypes.join(', ')} are allowed.`, 'danger');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileData);

        const url = 'http://localhost:8000/file';
        fetch(url, {
            method: 'POST',
            body: formData
        }).then((res) => {
            if(res.ok){
                showMessage('File uploaded!', 'success');

                fileRef.current.value = "";
                setFileData('');
            }else{
                res.text().then((text) => {
                    showMessage(text, 'danger');
                });
            }
        }).then((success) => {
            if(success){
                showMessage('File uploaded!', 'success');
            }
        }).catch((error) => {
            showMessage(error, 'danger');
        });

    }

    const showMessage = (msg, type) => {
        setError(msg);
        setErrorType(type);

        setTimeout(() => {
            setError('');
            setErrorType('');
        }, 3000);
    }

    return (
        <div className="container-file-uploader" >
            <div className="wrapper">
                <div className="border" ref={containerRef} onClick={openFileDialog} onDragEnter={dragEnter} onDragOver={dragEnter} onDragLeave={dragLeave} onDrop={drop}>
                    <FontAwesomeIcon icon={faUpload} className='icon' />
                    <p className="text"><span className="link">Upload a file</span> or drag and drop PNG, JPG, JPEG, GIF up to 10 MB.</p>
                    <p className={`text file-text ${fileData === '' ? 'd-none' : ''}`}>{fileData.name}</p>
                    <p className={`text ${errorType === 'danger' ? 'error-text' : 'success-text'} ${error === '' ? 'd-none' : ''}`}>{error}</p>
                </div>
                <div className="btn-wrapper">
                    <button type="button" className="btn" onClick={uploadFile}>
                        <FontAwesomeIcon icon={faUpload} />
                    </button>
                </div>
                <input type="file" name="file" className="d-none" ref={fileRef} onChange={change}/>
            </div>
        </div>
    );
}

export default FileUploader;