import React, { 
    useState
    // useEffect 
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';

import FormField from '../../utils/form/formfield';
import FileUpload from '../../utils/form/fileupload';
import { update, generateData, isFormValid } from '../../utils/form/formactions';
import {
    addGallery,
    clearGallery,
    updateGallery,
    clearUpdateGallery
} from '../../../store/actions/gallery_action';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faAlignLeft, faFont, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake)


const GalleryTableScreen = (props) => {
    // const { getalldata } = useSelector(state => ({
    //     getalldata: state.user
    // }))
    const { dataselected, editformdatastatus } = props;
    const dispatch = useDispatch();
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');
    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            title: 'Title',
            value: editformdatastatus ? dataselected.name : '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter title'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        subname: {
            element: 'input',
            title: 'Description',
            value: editformdatastatus ? dataselected.subname : '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter description'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        // category: {
        //     element: 'select',
        //     title: 'Category',
        //     selectedValue: editformdatastatus ? dataselected.category.name.replace(/^\w/, c => c.toUpperCase()) : '',
        //     value: editformdatastatus ? dataselected.category._id : '',
        //     config: {
        //         name: 'categoryInput',
        //         options: [],
        //         placeholder: editformdatastatus ? dataselected.category.name.replace(/^\w/, c => c.toUpperCase()) : 'Choose category'
        //     },
        //     validation: {
        //         required: true
        //     },
        //     valid: editformdatastatus ? true : false,
        //     touched: editformdatastatus ? true : false,
        //     validationMessage: ''
        // },
        images: {
            title: 'Images',
            value: editformdatastatus ? dataselected.images : [],
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
    });
    const [imageToUpload, imageToUploadHandler] = useState({
        images: {
            value: []
        }
    });
    const [imageToDelete, imageToDeleteHandler] = useState({
        images: {
            value: []
        }
    });
    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'gallery');
        formErrorHandler(false)
        formdataHandler(newFormdata)
    }
    const previewFile = (files, multifiles, uploadname) => {
        formErrorHandler(false)
        const arrOfPromises = files.map((file, i) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    file.id = i;
                    file.url = e.target.result;
                    resolve(file);
                }
                reader.readAsDataURL(file);
            });

        });

        Promise.all(arrOfPromises).then(imagesToAdd => {
            let imagesToAddSort = imagesToAdd.sort((a, b) => {
                if (b.name > a.name)
                    return -1;
                if (b.name < a.name)
                    return 1;
                return 0;
            });

            if (editformdatastatus) {
                const newimageToUpload = { ...imageToUpload }
                const elementImageToUpload = {
                    ...newimageToUpload[uploadname]
                }
                for (let zxc = 0; zxc < imagesToAddSort.length; zxc++) {
                    elementImageToUpload.value.push(imagesToAddSort[zxc])
                }
                newimageToUpload[uploadname] = elementImageToUpload
                imageToUploadHandler(newimageToUpload);
            } else {
                var newFormdata = formdata;
                const temporaryFormdata = {
                    ...newFormdata
                }

                const newElement = {
                    ...temporaryFormdata[uploadname]
                }
                if (multifiles) {
                    for (let zxc = 0; zxc < imagesToAddSort.length; zxc++) {
                        newElement.value.push(imagesToAddSort[zxc])
                    }
                } else {
                    if (imagesToAddSort.length < 2) {
                        newElement.value = imagesToAddSort
                    } else {
                        formErrorHandler(true)
                        errorMessageHandler("Please upload one image only")
                    }
                }
                temporaryFormdata[uploadname] = newElement;
                formdataHandler(temporaryFormdata);
            }

        }).catch(err => console.log('err loading images', err));
    }
    const onRemove = (item, uploadname) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[uploadname]
        }
        if (editformdatastatus) {
            var newFormdata2 = imageToDelete;
            const temporaryFormdata2 = {
                ...newFormdata2
            }

            const newElement2 = {
                ...temporaryFormdata2[uploadname]
            }
            const updatedImages = newElement.value.filter(i => i.url !== item.url);
            newElement2.value.push(item.public_id);
            newElement.value = updatedImages;
            temporaryFormdata[uploadname] = newElement;
            temporaryFormdata2[uploadname] = newElement2;
            formdataHandler(temporaryFormdata);
            imageToDeleteHandler(temporaryFormdata2);
        } else {
            const updatedImages = newElement.value.filter(i => i.id !== item.id);
            newElement.value = updatedImages;
            temporaryFormdata[uploadname] = newElement;
            formdataHandler(temporaryFormdata);
        }
    }

    const showSoonToUpdateImages = (uploadname) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[uploadname]
        }

        if (newElement.value && newElement.value.length > 0) {
            return (
                <div className="showThumbnail">
                    {
                        newElement.value.map((item, i) => (
                            <div
                                key={i}
                                className="dropzoneImageWrapper"
                                onClick={() => onRemove(item, uploadname)}
                            >
                                <img src={item.url} alt="" />

                                <div className="dropzoneImageInner">
                                    {
                                        item.name ? <span>Name: {item.name}</span> : null
                                    }
                                    {
                                        item.size ? <span>Size: {item.size / 1000} Kb</span> : null
                                    }
                                    {
                                        item.type ? <span>Type: {item.type}</span> : null
                                    }
                                </div>


                            </div>
                        ))
                    }
                </div>
            )
        }
    }

    const showimagesWillbeRemove = (item, uploadname) => {
        var newFormdata = imageToUpload;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[uploadname]
        }

        const updatedImages = newElement.value.filter(i => i.id !== item.id);
        newElement.value = updatedImages;
        temporaryFormdata[uploadname] = newElement;
        imageToUploadHandler(temporaryFormdata);
    }

    const showimagesWillbeUpdate = (uploadname) => {
        var newFormdata = imageToUpload;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[uploadname]
        }
        if (newElement.value && newElement.value.length > 0) {
            return (
                <div className="showThumbnail">
                    {
                        newElement.value.map((item, i) => (
                            <div
                                key={i}
                                className="dropzoneImageWrapper"
                                onClick={() => showimagesWillbeRemove(item, uploadname)}
                            >
                                <img src={item.url} alt="" />

                                <div className="dropzoneImageInner">
                                    {
                                        item.name ? <span>Name: {item.name}</span> : null
                                    }
                                    {
                                        item.size ? <span>Size: {item.size / 1000} Kb</span> : null
                                    }
                                    {
                                        item.type ? <span>Type: {item.type}</span> : null
                                    }
                                </div>


                            </div>
                        ))
                    }
                </div>
            )

        }
    }

    const goBackToTable = () => {
        props.history.push('/admin/gallery');
    }

    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'gallery');
        let formIsValid = isFormValid(formdata, 'gallery');

        if (formIsValid) {
            dispatch(addGallery(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearGallery());
                    formSuccessHandler(true);
                    props.history.push('/admin/gallery');
                } else {
                    formErrorHandler(true);
                    props.loadingtableHandler(false);
                    errorMessageHandler(response.payload.message);
                }
            })
        } else {
            formErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('DATA INVALID, PLEASE RECHECK!');
        }
    }

    const submitEditData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit2 = generateData(formdata, 'galleryedit');
        let formIsValid2 = isFormValid(formdata, 'galleryedit');
        let datachange = 0;
        for (let key1 in dataselected) {
            if (key1 === "category") {
                if (dataselected[key1]._id.toString() === dataToSubmit2[key1].toString()) {
                    datachange = datachange + 1;
                }
            } else if (key1 === "images") {
                if (imageToUpload.images.value && imageToUpload.images.value.length > 0){

                } else {
                    if (dataselected[key1] === dataToSubmit2[key1]){
                        datachange = datachange + 1;
                    }
                }
            } else {
                if (dataselected[key1] === dataToSubmit2[key1]) {
                    datachange = datachange + 1;
                }
            }
        }
        if (datachange === 3) {
            formErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('CHANGE DATA BEFORE SUBMIT!');
        } else {
            const totaldataToSubmit = {
                ...dataToSubmit2,
                _id: dataselected._id,
            }
            if (formIsValid2) {
                totaldataToSubmit.imagesToRemove = imageToDelete.images.value;
                totaldataToSubmit.imagesToAdd = imageToUpload.images.value;
                dispatch(updateGallery(totaldataToSubmit)).then(response => {
                    if (response.payload.success) {
                        dispatch(clearUpdateGallery());
                        formSuccessHandler(true);
                        props.history.push('/admin/gallery');
                    } else {
                        formErrorHandler(true);
                        props.loadingtableHandler(false);
                        errorMessageHandler(response.payload.message);
                    }
                })
            } else {
                formErrorHandler(true);
                props.loadingtableHandler(false);
                errorMessageHandler('DATA INVALID, PLEASE RECHECK!');
            }
        }
    }
    return (
        <div className="cardBody formstyle">
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.name.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faFont}
                            className="icon agraicon"
                        />
                    </div>
                    <FormField
                        id={'name'}
                        formdata={formdata.name}
                        change={(element) => updateForm(element)}
                        myclass={'form-control'}
                    />
                </div>
            </div>
            <div className="row pb25">
                <label className="col-md-2 col-xs-12 colFormLabel">{formdata.subname.title}</label>
                <div className="col-md-10 col-xs-12">
                    <div className="iconPosition">
                        <FontAwesomeIcon
                            icon={faAlignLeft}
                            className="icon agraicon"
                        />
                    </div>
                    <FormField
                        id={'subname'}
                        formdata={formdata.subname}
                        change={(element) => updateForm(element)}
                        myclass={'form-control'}
                    />
                </div>
            </div>
            <div className="row pb25">
                <label className="col-md-12 col-xs-12 colFormLabel">{formdata.images.title}</label>
                <div className="col-md-12 col-xs-12">
                    <FileUpload
                        id={'fileupload'}
                        reset={formSuccess}
                        myclass={'form-control'}
                        onFilesAlreadyAdded={previewFile}
                        multifiles={true}
                        uploadname={'images'}
                    />
                    {
                        showSoonToUpdateImages('images')
                    }
                    {
                        editformdatastatus ? showimagesWillbeUpdate('images') : null
                    }
                </div>
            </div>
            <div className="row pb25">
                {
                    formError ?
                        <div className="errorSubmit">
                            {errorMessage}
                        </div>
                        : formSuccess ?
                            <div className="successSubmit">
                                ADD DATA SUCCESS, PLEASE WAIT!
                            </div>
                            : null
                }

                <div className="formSubmitButtonWithBack">
                    <div
                        className="formbackButton formsubmitButtonShadow buttonColor"
                        title=""
                        onClick={() => goBackToTable()}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className="icon agraicon w18px"
                        />
                    </div>
                    <div className="doubleButton">
                        <button
                            onClick={editformdatastatus ? (event) => submitEditData(event) : (event) => submitData(event)}
                            className="formsubmitButton formsubmitButtonShadow buttonColor"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryTableScreen;