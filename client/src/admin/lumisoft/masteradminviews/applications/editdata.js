import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';
import moment from 'moment';
import FormField from '../../utils/form/formfield';
import FileUpload from '../../utils/form/fileuploadimages';
import FileUploadSingle from '../../utils/form/fileuploadsingle';
import FileUploadSingleToLocal from '../../utils/form/fileuploadsingletolocal';
import { update, generateData, isFormValid } from '../../utils/form/formactions';
import {
    updateApplication,
    clearUpdateApplication,
    addApplicationIcon,
    clearApplicationIcon,
    addApplicationImages,
    addApplicationApk,
    clearApplicationApk,
    clearApplicationImages,
    updateApplicationImages,
    clearUpdateApplicationImages,
    publishApplication,
    clearPublishApplication,
    unpublishApplication,
    clearUnpublishApplication,
    downloadApplication
    // updateAdminUser,
    // clearUpdateAdminUser
} from '../../../store/actions/application_action';
import { useWindowSize } from '../../../widget/windowsize';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSortAlphaDown, faAlignLeft, faFont, faChevronLeft, faSortNumericDown, faImage, faFile, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faAlignLeft)


const MasterEditApplicationTable = (props) => {
    // console.log(props, "<<<<<<<<<<<props <<<<< !!!!!!!!!!!!!!!!")
    const size = useWindowSize();
    const isMobile = size.width <= 767.98;
    const useOutsideAlerter = (ref) => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                searchmodeHandler(false)
            }
        }

        useEffect(() => {
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    // const { userprops } = useSelector(state => ({
    //     userprops: state.user
    // }));
    const { dataselected, editformdatastatus } = props;
    const [temporarydataselected] = useState(dataselected);
    const [temporarydatahistory] = useState(dataselected && dataselected.history.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()));
    // console.log(temporarydatahistory, "<<<<<<<<hstirosrsdsrjshd")
    const dispatch = useDispatch();

    /////////////////////////////////////////////////// FORM DEFAULT ERROR AND MESSAGE HANDLER
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');
    /////////////////////////////////////////////////// FORM DEFAULT ERROR AND MESSAGE HANDLER

    /////////////////////////////////////////////////// ICON ERROR AND MESSAGE HANDLER
    const [formIconError, formIconErrorHandler] = useState(false);
    const [formIconSuccess, formIconSuccessHandler] = useState(false);
    const [iconErrorMessage, iconErrorMessageHandler] = useState('TRY AGAIN!!');
    /////////////////////////////////////////////////// ICON ERROR AND MESSAGE HANDLER

    /////////////////////////////////////////////////// APK DEFAULT ERROR AND MESSAGE HANDLER
    const [appformError, appformErrorHandler] = useState(false);
    const [appformSuccess, appformSuccessHandler] = useState(false);
    const [apperrorMessage, apperrorMessageHandler] = useState('DATA INVALID!');
    /////////////////////////////////////////////////// APK DEFAULT ERROR AND MESSAGE HANDLER

    /////////////////////////////////////////////////// APK DEFAULT ERROR AND MESSAGE HANDLER
    const [imagesformError, imagesformErrorHandler] = useState(false);
    const [imagesformSuccess, imagesformSuccessHandler] = useState(false);
    const [imageserrorMessage, imageserrorMessageHandler] = useState('DATA INVALID!');
    /////////////////////////////////////////////////// APK DEFAULT ERROR AND MESSAGE HANDLER

    /////////////////////////////////////////////////// APK DEFAULT ERROR AND MESSAGE HANDLER
    const [completeformError, completeformErrorHandler] = useState(false);
    const [completeformSuccess, completeformSuccessHandler] = useState(false);
    const [completeerrorMessage, completeerrorMessageHandler] = useState('COMPLETE ALL DATA!');
    /////////////////////////////////////////////////// APK DEFAULT ERROR AND MESSAGE HANDLER

    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            title: 'Name',
            value: editformdatastatus ? temporarydataselected.name : '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter application name'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        description: {
            element: 'input',
            title: 'Description',
            value: editformdatastatus ? dataselected.description : '',
            config: {
                name: 'descriptionInput',
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
        private: {
            element: 'select',
            title: 'Private',
            selectedValue: dataselected && dataselected.private ? "YES" : "NO",
            value: dataselected && dataselected.private ? true : false,
            config: {
                name: 'privateInput',
                options: [
                    { value: true, name: 'YES' },
                    { value: false, name: 'NO' },
                ],
                placeholder: dataselected && dataselected.private ? "YES" : "NO"
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        pin: {
            element: 'input',
            title: 'Pin',
            value: editformdatastatus ? temporarydataselected.pin : '',
            config: {
                name: 'pinInput',
                type: 'text',
                placeholder: 'Enter 6 number pin',
                maxLength: '6'
            },
            validation: {
                required: false,
                number: true
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
    });
    const [formdataicon, formdataiconHandler] = useState({
        icons: {
            title: 'Icon',
            value: temporarydataselected && temporarydataselected.icons,
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
    })
    // const [formdataapk, formdataapkHandler] = useState({
    //     histories: {
    //         title: 'App details',
    //         value: {},
    //         validation: {
    //             required: true
    //         },
    //         valid: false,
    //         touched: false,
    //         validationMessage: ''
    //     },
    // })
    const [formdataimages, formdataimagesHandler] = useState({
        images: {
            title: 'Images',
            value: temporarydataselected && temporarydataselected.imagesexist ? temporarydataselected.images : [],
            validation: {
                required: true
            },
            valid: temporarydataselected && temporarydataselected.imagesexist ? true : false,
            touched: temporarydataselected && temporarydataselected.imagesexist ? true : false,
            validationMessage: ''
        }
    })
    const [appdetailform, appdetailformHandler] = useState({
        version: {
            element: 'input',
            title: 'Version',
            value: '',
            config: {
                name: 'versionInput',
                type: 'text',
                placeholder: 'e.g : 1.1.1',
                maxLength: '5'
            },
            validation: {
                required: true,
                version: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        patchnote: {
            element: 'textarea',
            title: 'Patch note',
            value: '',
            config: {
                name: 'patchnoteInput',
                type: 'text',
                placeholder: 'Application patch note'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        apkfile: {
            element: 'inputname',
            title: 'Apk file',
            value: [],
            config: {
                name: 'apkfileInput',
                type: 'text',
                placeholder: 'APK file name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
    });
    const [dontblur, dontblurHandler] = useState(false);
    const [searchmode, searchmodeHandler] = useState(false);
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
        const newFormdata = update(element, formdata, 'application');
        formErrorHandler(false);
        formdataHandler(newFormdata);
    }
    const updateAppdetailsForm = (element) => {
        const newFormdata = update(element, appdetailform, 'applicationdetailform');
        appformErrorHandler(false);
        appdetailformHandler(newFormdata);
    }
    const searchForm = () => {
        searchmodeHandler(true)
    }
    const onMouseEnter = () => {
        dontblurHandler(true)
    }
    const onMouseLeave = () => {
        dontblurHandler(false)
    }
    const hideprofilemenu = () => {
        searchmodeHandler(false)
    }
    // console.log(imageToDelete, "<<<<<<<<<<<<<<<image to delete")
    // console.log(imageToUpload, "<<<<<<<<<<iamge to upload")
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
            // console.log(imagesToAddSort, "<<<<<<<<<<<<images to add sort")
            if (temporarydataselected.imagesexist) {
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
                var newFormdata = formdataimages;
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
                        imagesformErrorHandler(true)
                        imageserrorMessageHandler("Please upload one image only")
                    }
                }
                newElement.valid = true;
                newElement.touched = true;
                temporaryFormdata[uploadname] = newElement;
                formdataimagesHandler(temporaryFormdata);
            }

        }).catch(err => console.log('err loading images', err));
    }
    const previewFileSingle = (files, uploadname) => {
        formIconErrorHandler(false)
        const arrOfPromises = files.map((file, i) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                const img = new Image();
                reader.onload = (e) => {
                    img.src = e.target.result;
                    img.onload = function () {
                        file.id = i;
                        file.url = e.target.result;
                        file.width = img.width;
                        file.height = img.height;
                        resolve(file);
                    }
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

            let pass = false;
            imagesToAddSort.forEach((item, index) => {
                if (item.width === 512 && item.height === 512) {
                    pass = true;
                }
            })
            if (pass) {
                var newFormdata = formdataicon;
                const temporaryFormdata = {
                    ...newFormdata
                }

                const newElement = {
                    ...temporaryFormdata[uploadname]
                }
                if (imagesToAddSort.length < 2) {
                    newElement.value = imagesToAddSort
                    newElement.valid = true
                    newElement.touched = true
                } else {
                    formIconErrorHandler(true)
                    iconErrorMessageHandler("ONLY ONE IMAGE!")
                }
                temporaryFormdata[uploadname] = newElement;
                formdataiconHandler(temporaryFormdata);
            } else {
                formIconErrorHandler(true)
                iconErrorMessageHandler("512 x 512 !!")
            }

        }).catch(err => console.log('err loading images', err));
    }
    const previewFileSingleToLocal = (files, uploadname) => {
        appformErrorHandler(false)
        const arrOfPromises = files.map((file, i) => {
            return new Promise((resolve, reject) => {
                const name = file.name;
                const lastDot = name.lastIndexOf('.');
                const fileName = name.substring(0, lastDot);
                const ext = name.substring(lastDot + 1);

                const reader = new FileReader();
                reader.onload = (e) => {
                    file.id = i;
                    file.url = e.target.result;
                    file.filename = fileName;
                    file.extension = ext;
                    resolve(file);
                }
                reader.readAsDataURL(file);
            });

        });
        Promise.all(arrOfPromises).then(imagesToAdd => {
            if (imagesToAdd.length < 2) {
                if (imagesToAdd[0].extension === "apk") {
                    var newFormdata = appdetailform;
                    const temporaryFormdata = {
                        ...newFormdata
                    }

                    const newElement = {
                        ...temporaryFormdata['apkfile']
                    }
                    newElement.value = imagesToAdd
                    newElement.valid = true
                    newElement.touched = true
                    temporaryFormdata['apkfile'] = newElement;
                    appdetailformHandler(temporaryFormdata);
                } else {
                    appformErrorHandler(true)
                    apperrorMessageHandler("Please upload .apk file")
                }
            } else {
                appformErrorHandler(true)
                apperrorMessageHandler("Please upload 1 apk file")
            }

        }).catch(err => console.log('wrong file type', err));
    }

    const onRemove = (item) => {
        var newFormdata = formdataimages;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['images']
        }
        if (editformdatastatus) {
            var newFormdata2 = imageToDelete;
            const temporaryFormdata2 = {
                ...newFormdata2
            }

            const newElement2 = {
                ...temporaryFormdata2['images']
            }
            const updatedImages = newElement.value.filter(i => i.url !== item.url);
            newElement2.value.push(item.public_id);
            newElement.value = updatedImages;
            temporaryFormdata['images'] = newElement;
            temporaryFormdata2['images'] = newElement2;
            formdataimagesHandler(temporaryFormdata);
            imageToDeleteHandler(temporaryFormdata2);
        } else {
            const updatedImages = newElement.value.filter(i => i.id !== item.id);
            newElement.value = updatedImages;
            temporaryFormdata['images'] = newElement;
            formdataimagesHandler(temporaryFormdata);
        }
    }

    const imagetoupdateOnRemove = (item, uploadname) => {
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

    const goBackToTable = () => {
        props.history.push('/admin/master/application');
    }

    const selectedItem = (data, whichdata) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }
        newElement.value = data.value;
        newElement.selectedValue = data.name;
        temporaryFormdata[whichdata] = newElement;
        formdataHandler(temporaryFormdata);
        formErrorHandler(false);
        if (whichdata === 'private') {
            searchmodeHandler(false);
            dontblurHandler(false);
        }
    }

    const showLinks = (type, whichdata) => {
        let list = [];

        if (type && type.length > 0) {
            type.forEach((item) => {
                list.push(item)
            });
        }

        return list.map((item, i) => (
            <li
                key={i}
                onClick={() => selectedItem(item, whichdata)}
                className="listgroupitem"
            >
                <span className="memberHeaderLink">
                    {item.name.replace(/^\w/, c => c.toUpperCase())}
                </span>

            </li>
        ))
    }

    const submitAppDetail = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(appdetailform, 'applicationdetailform');
        let formIsValid = isFormValid(appdetailform, 'applicationdetailform');
        // console.log(dataToSubmit, "<<<<<<<<app datatosubmit 123")
        if (formIsValid) {
            // console.log(dataToSubmit, "<<<<<<<<app datatosubmit")
            // var appFormdata = { ...appdetailform };
            // var apkfiles = {};
            // for (let key in appFormdata) {
            //     if (key === 'apkfile') {
            //         appFormdata[key].value = [];
            //         appFormdata[key].valid = false;
            //     } else {
            //         appFormdata[key].value = '';
            //         appFormdata[key].valid = false;
            //     }
            //     appFormdata[key].touched = false;
            //     appFormdata[key].validationMessage = '';
            // }

            // var newFormdata = formdataapk;
            // const temporaryFormdata = {
            //     ...newFormdata
            // }
            // const newElement = {
            //     ...temporaryFormdata['histories']
            // }
            // console.log(dataToSubmit.apkfile[0], "<<<<<<<<data to submit 1")
            // dataToSubmit.apkfile.forEach((item, index) => {
            //     apkfiles = {
            //         extension: item.extension,
            //         filename: item.filename,
            //         id: item.id,
            //         lastModified: item.lastModified,
            //         name: item.name,
            //         size: item.size,
            //         url: item.url,
            //         patchnote: dataToSubmit.patchnote,
            //         version: dataToSubmit.version
            //     }
            // })
            // newElement.value = apkfiles;
            // newElement.valid = true;
            // newElement.touched = true;
            // temporaryFormdata['histories'] = newElement;
            // appdetailformHandler(appFormdata);
            // formdataapkHandler(temporaryFormdata);

            let totalDataToSubmit = {
                _id: props.dataselected._id,
                patchnote: dataToSubmit.patchnote,
                version: dataToSubmit.version,
                appname: dataToSubmit.apkfile[0].name,
                extension: dataToSubmit.apkfile[0].extension,
                filename: dataToSubmit.apkfile[0].filename,
                lastModified: dataToSubmit.apkfile[0].lastModified,
                size: dataToSubmit.apkfile[0].size,
                url: dataToSubmit.apkfile[0].url
            }
            dispatch(addApplicationApk(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearApplicationApk());
                    appformSuccessHandler(true);
                    props.history.push('/admin/master/application/');
                } else {
                    appformErrorHandler(true);
                    props.loadingtableHandler(false);
                    apperrorMessageHandler(response.payload.message);
                }
            })
            // appformSuccessHandler(true);
            // setTimeout(() => {
            //     appformSuccessHandler(false);
            // }, 1000);
        } else {
            appformErrorHandler(true);
            props.loadingtableHandler(false);
            apperrorMessageHandler('COMPLETE FORM!');
        }
    }

    // const submitData = (event) => {
    //     event.preventDefault();
    //     props.loadingtableHandler(true);

    //     let dataToSubmit = generateData(formdata, 'application');
    //     let formIsValid = isFormValid(formdata, 'application');

    //     let totalDataToSubmit = {
    //         name: dataToSubmit.name,
    //         description: dataToSubmit.description,
    //         private: dataToSubmit.private,
    //         pin: dataToSubmit.pin,
    //         images: dataToSubmit.images,
    //         appname: dataToSubmit.histories.name,
    //         extension: dataToSubmit.histories.extension,
    //         filename: dataToSubmit.histories.filename,
    //         lastModified: dataToSubmit.histories.lastModified,
    //         patchnote: dataToSubmit.histories.patchnote,
    //         size: dataToSubmit.histories.size,
    //         version: dataToSubmit.histories.version,
    //         icontitle: dataToSubmit.icon.public_id,
    //         iconurl: dataToSubmit.icon.url,
    //         url: dataToSubmit.histories.url
    //     }
    //     if (formIsValid) {
    //         console.log(totalDataToSubmit, "<<<<<<<<<data to submit")
    //         dispatch(addApplication(totalDataToSubmit)).then(response => {
    //             if (response.payload.success) {
    //                 dispatch(clearApplication());
    //                 formSuccessHandler(true);
    //                 props.history.push('/admin/master/application/');
    //             } else {
    //                 formErrorHandler(true);
    //                 props.loadingtableHandler(false);
    //                 errorMessageHandler(response.payload.message);
    //             }
    //         })
    //     } else {
    //         formErrorHandler(true);
    //         props.loadingtableHandler(false);
    //         errorMessageHandler('DATA INVALID, PLEASE RECHECK!');
    //     }
    // }

    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'application');
        let formIsValid = isFormValid(formdata, 'application');

        let datachange = 0;
        for (let key1 in dataselected) {
            if (dataselected[key1] === dataToSubmit[key1]) {
                datachange = datachange + 1;
            }
        }
        // console.log(datachange, "<<<<<<<<<<<change change")
        if (datachange === 4) {
            formErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('CHANGE DATA!');
        } else {
            let totalDataToSubmit = {
                _id: props.dataselected._id,
                name: dataToSubmit.name,
                description: dataToSubmit.description,
                private: dataToSubmit.private,
                pin: dataToSubmit.private ? dataToSubmit.pin : ""
            }
            // console.log(dataToSubmit, "<<<<<<<<<< data to submit")
            // console.log(totalDataToSubmit, "<<<<<<<<<totalDataToSubmit")
            if (formIsValid) {
                // console.log(totalDataToSubmit, "<<<<<<<<<data to submit")
                dispatch(updateApplication(totalDataToSubmit)).then(response => {
                    if (response.payload.success) {
                        dispatch(clearUpdateApplication());
                        formSuccessHandler(true);
                        props.history.push('/admin/master/application/');
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
    // console.log(formdata, "<!<!<!<!<!<!<!<!<!<! formdata")
    const submitIcon = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdataicon, 'formdataicon');
        let formIsValid = isFormValid(formdataicon, 'formdataicon');

        let totalDataToSubmit = {
            ...dataToSubmit,
            _id: props.dataselected._id
        }
        // console.log(dataToSubmit, "<<<<<<<<<<<<<<<<< icon con con dataToSubmit")
        // console.log(formIsValid, "<<<<<<<<<<<<<<<<< icon con con formIsValid")
        if (formIsValid) {
            dispatch(addApplicationIcon(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearApplicationIcon());
                    formIconSuccessHandler(true);
                    props.history.push('/admin/master/application/');
                } else {
                    formIconErrorHandler(true);
                    props.loadingtableHandler(false);
                    iconErrorMessageHandler(response.payload.message);
                }
            })
        } else {
            formIconErrorHandler(true);
            props.loadingtableHandler(false);
            iconErrorMessageHandler('TRY AGAIN!');
        }
    }
    const submitImages = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdataimages, 'formdataimages');
        let formIsValid = isFormValid(formdataimages, 'formdataimages');

        let totalDataToSubmit = {
            ...dataToSubmit,
            _id: props.dataselected._id
        }

        if (formIsValid) {
            dispatch(addApplicationImages(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearApplicationImages());
                    imagesformSuccessHandler(true);
                    props.history.push('/admin/master/application/');
                } else {
                    imagesformErrorHandler(true);
                    props.loadingtableHandler(false);
                    imageserrorMessageHandler(response.payload.message);
                }
            })
        } else {
            imagesformErrorHandler(true);
            props.loadingtableHandler(false);
            imageserrorMessageHandler('TRY AGAIN!')
        }
    }

    const submitEditImages = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdataimages, 'formdataimages');
        let formIsValid = isFormValid(formdataimages, 'formdataimages');

        let totalDataToSubmit = {
            ...dataToSubmit,
            imagesToRemove: imageToDelete.images.value,
            imagesToAdd: imageToUpload.images.value,
            _id: props.dataselected._id
        }

        if (formIsValid) {
            dispatch(updateApplicationImages(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateApplicationImages());
                    imagesformSuccessHandler(true);
                    props.history.push('/admin/master/application/');
                } else {
                    imagesformErrorHandler(true);
                    props.loadingtableHandler(false);
                    imageserrorMessageHandler(response.payload.message);
                }
            })
        } else {
            imagesformErrorHandler(true);
            props.loadingtableHandler(false);
            imageserrorMessageHandler('TRY AGAIN!')
        }
    }

    const submitComplete = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let totalDataToSubmit = {
            _id: props.dataselected._id
        }

        if (temporarydataselected.imagesexist && temporarydataselected.appsexist && temporarydataselected.iconsexist && !temporarydataselected.publish) {
            dispatch(publishApplication(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearPublishApplication());
                    completeformSuccessHandler(true);
                    props.history.push('/admin/master/application/');
                } else {
                    completeformErrorHandler(true);
                    props.loadingtableHandler(false);
                    completeerrorMessageHandler(response.payload.message);
                }
            })
        } else {
            completeformErrorHandler(true);
            props.loadingtableHandler(false);
            completeerrorMessageHandler('COMPLETE ALL DATA!');
        }
    }

    const submitUnpublish = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let totalDataToSubmit = {
            _id: props.dataselected._id
        }


        if (temporarydataselected.publish) {
            dispatch(unpublishApplication(totalDataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUnpublishApplication());
                    completeformSuccessHandler(true);
                    props.history.push('/admin/master/application/');
                } else {
                    completeformErrorHandler(true);
                    props.loadingtableHandler(false);
                    completeerrorMessageHandler(response.payload.message);
                }
            })
        } else {
            completeformErrorHandler(true);
            props.loadingtableHandler(false);
            completeerrorMessageHandler('TRY AGAIN!');
        }
    }

    const download = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        if (temporarydataselected) {
            dispatch(downloadApplication(temporarydataselected.history[0].url[0].public_id)).then(response => {
                // console.log(response, "<<<<<<<<<<response")
                if (response.payload) {
                    ////////////////// DIBAWAH INI JALAN JUGA ///////////////////
                    // const url = window.URL.createObjectURL(new Blob([response.payload]));
                    // // console.log(url, "<<<<<<url rulrlrulrurlu")
                    // const link = document.createElement('a');
                    // link.href = url;
                    // const fileName = `${temporarydataselected.history[0].url[0].public_id}.apk`
                    // link.setAttribute('download', fileName);
                    // document.body.appendChild(link);
                    // link.click();
                    // link.remove();
                    // props.history.push('/admin/master/application/');
                    /////////////////////////////////////////////////////////////
                    const fileName = `${temporarydataselected.history[0].url[0].public_id}.apk`
                    const newblob = new Blob([response.payload], {
                        type: 'application/octet-stream'
                    })
                    const link = document.createElement('a');
                    link.download = fileName;
                    if (window.webkitURL != null) {
                        link.href = window.webkitURL.createObjectURL(newblob);
                    } else {
                        link.href = window.URL.createObjectURL(newblob);
                        link.onclick = document.body.removeChild(event.target);
                        link.style.display = "none";
                        document.body.appendChild(link)
                    }
                    link.click();
                    link.remove();
                    props.history.push('/admin/master/application/');
                }

            })
        }



    }

    return (
        <div>
            <div className="card">
                <div className="cardTitle verticalCenter">
                    <span>{props.pageTitle}</span>
                </div>
                <div className="cardBody formstyle">
                    <div className="row pb25" id="dropzoneforiconposition">
                        <div
                            className={editformdatastatus ? "col-md-8 col-xs-12 p0 mb15" : "col-md-12 col-xs-12 p0 mb15"}
                            style={isMobile ? { minHeight: '370px' } : editformdatastatus ? { minHeight: '280px', borderRight: "1px solid rgba(150,150,150,0.9)" } : { minHeight: '280px' }}>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.name.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
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
                                        myclass={'form-control disabled'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.description.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faAlignLeft}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'description'}
                                        formdata={formdata.description}
                                        change={(element) => updateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 pb25">
                                <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.private.title}</label>
                                <div className="col-md-10 col-xs-12 p0">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faSortAlphaDown}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    {
                                        searchmode ?
                                            <div ref={wrapperRef}>
                                                <div
                                                    onBlur={dontblur ? null : hideprofilemenu}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        disabled
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formdata.private.title}
                                                        placeholder={formdata.private.title}
                                                        title={formdata.private.config.placeholder}
                                                        value={formdata.private.value ? "YES" : "NO"}
                                                    // onChange={(event) => handleChange(event)}
                                                    // autoFocus={false}
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup profilemenu"
                                                    onMouseEnter={onMouseEnter}
                                                    onMouseLeave={onMouseLeave}
                                                >
                                                    {showLinks(formdata.private.config.options, 'private')}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'private'}
                                                formdata={formdata.private}
                                                options={formdata.private.config.options}
                                                change={searchForm}
                                                myclass="inputbutton form-control"
                                            />
                                    }

                                </div>
                            </div>
                            {
                                formdata.private.value ?
                                    <div className="col-md-12 col-xs-12 pb25">
                                        <label className="col-md-2 col-xs-12 colFormLabel p0">{formdata.pin.title}</label>
                                        <div className="col-md-10 col-xs-12 p0">
                                            <div className="iconPosition">
                                                <FontAwesomeIcon
                                                    icon={faSortNumericDown}
                                                    className="icon agraicon"
                                                />
                                            </div>
                                            <FormField
                                                id={'pin'}
                                                formdata={formdata.pin}
                                                change={(element) => updateForm(element)}
                                                myclass={'form-control'}
                                            />
                                        </div>
                                    </div>
                                    : null
                            }
                            <div className="formSubmitButtonWithBack">
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
                                <div className="doubleButton">
                                    <button
                                        onClick={(event) => submitData(event)}
                                        className="formsubmitButton formsubmitButtonShadow buttonColor"
                                    >
                                        Save Data
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-md-4 col-xs-12 mb15" id="dropzoneforicon"
                            style={isMobile ? { minHeight: '270px' } : editformdatastatus ? { minHeight: '280px' } : { minHeight: '280px' }}>
                            <div
                                className="dropzone"
                            >
                                <div className="message">
                                    {
                                        formdataicon.icons.value && formdataicon.icons.value.length > 0 ?
                                            <img src={formdataicon.icons.value && formdataicon.icons.value.length > 0 ? formdataicon.icons.value[0].url : ""} alt="" />
                                            :
                                            <FontAwesomeIcon
                                                icon={faImage}
                                                className="icon agraicon"
                                            />
                                    }
                                </div>
                            </div>
                            <label className="colFormLabel">{formdataicon.icons.title} {isMobile ? <br /> : null}(<strong>512 x 512, 32bit PNG</strong>)</label>
                            {
                                formIconError && isMobile ?
                                    <div className="errorSubmit">
                                        {iconErrorMessage}
                                    </div>
                                    : formIconSuccess && isMobile ?
                                        <div className="successSubmit">
                                            Processing...
                                            </div>
                                        : null
                            }
                            <div className="formSubmitButtonWithBack">
                                {
                                    formIconError && !isMobile ?
                                        <div className="errorSubmit">
                                            {iconErrorMessage}
                                        </div>
                                        : formIconSuccess && !isMobile ?
                                            <div className="successSubmit">
                                                Processing...
                                            </div>
                                            : null
                                }
                                <FileUploadSingle
                                    id={'fileuploadsingle'}
                                    reset={formSuccess}
                                    myclass={'form-control'}
                                    onFilesAlreadyAdded={previewFileSingle}
                                    uploadname={'icons'}
                                    formdata={formdataicon}
                                />
                                <div className="doubleButton">
                                    <button
                                        onClick={(event) => submitIcon(event)}
                                        className="formsubmitButton formsubmitButtonShadow buttonColor"
                                    >
                                        Save Icon
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row pb40 pt15" id="dropzoneforiconposition2" style={{ minHeight: '350px' }}>
                        <div className="col-md-8 col-xs-12" style={isMobile ? { paddingBottom: '25px' } : {
                            borderRight: "1px solid rgba(150,150,150,0.9)"
                        }}>
                            <label className="colFormLabel">App details</label>
                            <div className={isMobile ? null : "flexflex pt15 pb25"} style={isMobile ? { display: 'block', paddingTop: '15px', paddingBottom: '25px' } : null}>
                                <div className="col-md-5 col-xs-12 pl0" style={isMobile ? { marginBottom: '25px' } : null}>
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faBarcode}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'version'}
                                        formdata={appdetailform.version}
                                        change={(element) => updateAppdetailsForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                                <div className="col-md-5 col-xs-12 pl0 pr0" style={isMobile ? { marginBottom: '25px' } : null}>
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFile}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'apkfile'}
                                        formdata={appdetailform.apkfile}
                                        change={(element) => updateAppdetailsForm(element)}
                                        myclass={'form-control disabled'}
                                    />
                                </div>
                                <FileUploadSingleToLocal
                                    id={'fileuploadsingletolocal'}
                                    reset={appformSuccess}
                                    myclass={'form-control'}
                                    onFilesAlreadyAdded={previewFileSingleToLocal}
                                    appformErrorHandler={appformErrorHandler}
                                    uploadname={'histories'}
                                />
                            </div>
                            <div className="col-md-12 col-xs-12 p0 pb25">
                                <FormField
                                    id={'patchnote'}
                                    formdata={appdetailform.patchnote}
                                    change={(element) => updateAppdetailsForm(element)}
                                    myclass={'form-control'}
                                />
                            </div>
                            <div className="col-md-12 col-xs-12" style={{
                                paddingTop: '25px',
                                paddingRight: '0px',
                                paddingBottom: '0px',
                                paddingLeft: '0px'
                            }}>
                                {
                                    appformError ?
                                        <div className="errorSubmit">
                                            {apperrorMessage}
                                        </div>
                                        : appformSuccess ?
                                            <div className="successSubmit">
                                                Add success!
                                            </div>
                                            : null
                                }
                                <div className="formSubmitButtonWithBack">
                                    <div className="doubleButton">
                                        <button
                                            onClick={(event) => submitAppDetail(event)}
                                            className="formsubmitButton formsubmitButtonShadow buttonColor"
                                        >
                                            Register app
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* {
                                showSoonToUpdateImages('images')
                            }
                            {
                                editformdatastatus ? showimagesWillbeUpdate('images') : null
                            } */}

                        </div>
                        <div className="col-md-4 col-xs-12">
                            {
                                temporarydataselected && temporarydataselected.history && temporarydataselected.history[0] ?
                                    <div>
                                        <label className="col-md-12 col-xs-12 colFormLabel p0">name: <strong>{temporarydataselected.history[0].filename}</strong></label>
                                        <label className="col-md-12 col-xs-12 colFormLabel p0">version: <strong>{temporarydataselected.history[0].version}</strong></label>
                                        <label className="col-md-12 col-xs-12 colFormLabel p0">size: <strong>{Math.round(temporarydataselected.history[0].size / 1000000)} mb</strong></label>
                                        <label className="col-md-12 col-xs-12 colFormLabel p0">lastupdate: <strong>{moment(temporarydataselected.history[0].lastModified, "x").format('DD MMM YYYY')}</strong></label>
                                        <div className="doubleButton">
                                            <button
                                                onClick={(event) => download(event)}
                                                className="formsubmitButton formsubmitButtonShadow buttonColor"
                                            >
                                                Download
                                        </button>
                                        </div>
                                        <label className="col-md-12 col-xs-12 colFormLabel p0">patchnote: <strong>{temporarydataselected.history[0].patchnote}</strong></label>
                                    </div>
                                    : null
                            /* {
                                formdata.histories.valid ?
                                    <div>
                                        <label className="col-md-12 col-xs-12 colFormLabel p0">name: <strong>{formdata.histories.value.name}</strong></label>
                                        <label className="col-md-12 col-xs-12 colFormLabel p0">version: <strong>{formdata.histories.value.version}</strong></label>
                                    </div>
                                    : null
                            } */}
                        </div>
                    </div>
                    <div className="row pb25" id="dropzoneforiconposition3">
                        <label className="col-md-12 col-xs-12 colFormLabel">{formdataimages.images.title} {isMobile ? <br /> : null}(<strong>768 x 1440, 24bit PNG - no alpha</strong>)</label>
                        <div className="col-md-12 col-xs-12">
                            <FileUpload
                                id={'fileupload'}
                                reset={imagesformSuccess}
                                myclass={'form-control'}
                                onFilesAlreadyAdded={previewFile}
                                multifiles={true}
                                uploadname={'images'}
                            />
                            {
                                formdataimages.images.value && formdataimages.images.value.length > 0 ?
                                    <div className="imageContainer">
                                        {
                                            formdataimages.images.value && formdataimages.images.value.length > 0 ?
                                                formdataimages.images.value.map((item, index) => (
                                                    <div
                                                        className="col-md-2 col-xs-6"
                                                        key={index}
                                                        onClick={() => onRemove(item)}
                                                    >
                                                        <img src={item.url} alt={`image` + index} />
                                                    </div>
                                                ))
                                                : null
                                        }
                                        {
                                            imageToUpload.images.value && imageToUpload.images.value.length > 0 ?
                                                imageToUpload.images.value.map((upload, uploadindex) => (
                                                    <div
                                                        className="col-md-2 col-xs-6"
                                                        key={uploadindex}
                                                        onClick={() => imagetoupdateOnRemove(upload, 'images')}
                                                    >
                                                        <img src={upload.url} alt={`image` + uploadindex} />
                                                    </div>
                                                ))
                                                : null
                                        }
                                    </div>
                                    : null
                            }


                            {/* {
                                showSoonToUpdateImages('images')
                            }
                            {
                                editformdatastatus ? showimagesWillbeUpdate('images') : null
                            } */}
                            {
                                imagesformError ?
                                    <div className="errorSubmit">
                                        {imageserrorMessage}
                                    </div>
                                    : imagesformSuccess ?
                                        <div className="successSubmit">
                                            PROCESSING...
                                    </div>
                                        : null
                            }
                            <div className="doubleButton">
                                <button
                                    onClick={temporarydataselected && temporarydataselected.imagesexist ? (event) => submitEditImages(event) : (event) => submitImages(event)}
                                    className="formsubmitButton formsubmitButtonShadow buttonColor"
                                >
                                    Save Images
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row pb25">
                        {
                            completeformError ?
                                <div className="errorSubmit">
                                    {completeerrorMessage}
                                </div>
                                : completeformSuccess ?
                                    <div className="successSubmit">
                                        PUBLISHING...
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
                                    onClick={temporarydataselected && temporarydataselected.imagesexist && temporarydataselected.appsexist && temporarydataselected.iconsexist ? temporarydataselected.publish ? (event) => submitUnpublish(event) : (event) => submitComplete(event) : null}
                                    className={temporarydataselected && temporarydataselected.imagesexist && temporarydataselected.appsexist && temporarydataselected.iconsexist ? "formsubmitButton formsubmitButtonShadow buttonColor" : "formsubmitButton formsubmitButtonShadow buttonColor disabled"}
                                >
                                    {temporarydataselected && temporarydataselected.publish ? "Unpublish" : "Publish"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterEditApplicationTable;