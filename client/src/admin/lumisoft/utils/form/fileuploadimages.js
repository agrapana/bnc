import React, { useState, createRef } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faAngleDoubleUp, faMobileAlt, faMapMarker, faEnvelope, faRoad, faUser, faTrashAlt, faTimes, faCheck, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faShippingFast, faChevronLeft, faListAlt, faMoneyBillWave, faSortNumericDown, faSortAlphaDown, faList, faBrush, faTags, faThLarge, faPlusCircle, faCloudUploadAlt, faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUserPlus, faAngleDoubleUp, faMobileAlt, faMapMarker, faEnvelope, faRoad, faUser, faTrashAlt, faTimes, faCheck, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faShippingFast, faChevronLeft, faListAlt, faMoneyBillWave, faSortNumericDown, faSortAlphaDown, faList, faBrush, faTags, faThLarge, faPlusCircle)


const FileUploadImages = (props) => {
    const [hover, hoverHandler] = useState(false);
    // const [highlight, highlightHandler] = useState(false);
    const fileInputRef = createRef();

    const onFilesAdded = (event) => {
        const files = event.target.files;
        const array = fileListToArray(files);
        props.onFilesAlreadyAdded(array, props.multifiles, props.uploadname);

        // if (props.disabled) return;
        // const files = event.target.files;
        // if (props.onFilesAdded) {
        //     const array = fileListToArray(files);
        //     props.onFilesAdded(array);
        // }
    }

    const onDragOver = (event) => {
        stopEvent(event);
        hoverHandler(true);
        // highlightHandler(true);
        // if (props.disabled) return;
    }

    const onDragLeave = (event) => {
        stopEvent(event);
        hoverHandler(false);
        // highlightHandler(false);
    }

    const onDrop = (event) => {
        stopEvent(event);
        // if (props.disabled) return;
        const files = event.dataTransfer.files;
        const array = fileListToArray(files);
        props.onFilesAlreadyAdded(array, props.multifiles, props.uploadname);
        hoverHandler(false);
        // highlightHandler(false);
    }

    const stopEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    const openFileDialog = () => {
        // if (props.disabled) return;
        fileInputRef.current.click();
    }

    return (

        <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            id="dropzone"
            className={hover ? "dropzone hover" : "dropzone"}
        // style={{ cursor: props.disabled ? "default" : "pointer" }}
        >
            <div className="message">
                <FontAwesomeIcon
                    icon={props.multifiles ? faCloudUploadAlt : faCloud}
                    className="icon agraicon"
                />
                <h3>{props.multifiles ? `Drop or choose files here to upload ${props.uploadname}` : `Drop or choose one file to upload ${props.uploadname}`}</h3>
                <input
                    ref={fileInputRef}
                    className="FileInput"
                    type="file"
                    multiple
                    onChange={onFilesAdded}
                />
            </div>
        </div>
    );

}

export default FileUploadImages;