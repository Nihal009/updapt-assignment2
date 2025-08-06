import React from 'react';
import "../css/BulkUpload.css"
const BulkUpload = () => {
    return (
        <>
        <div className='bulkupload-overlay'>
        <div className='bulkupload-popup' onClick={(e) => e.stopPropagation()}>
            <div className="bulk-upload-form-container">
            <div className="popup-upload-form">
                <div className='upload-form-heading'>
                    <h1>Upload File</h1>
                    <p>upload a file for data entry</p>
                </div>
            </div>

            </div>

        </div>
        </div>
           </>
        
    );
};

export default BulkUpload;