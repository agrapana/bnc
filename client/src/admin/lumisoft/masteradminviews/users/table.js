import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';

import FormField from '../../utils/form/formfield';
import FileUpload from '../../utils/form/fileupload';
import { update, generateData, isFormValid } from '../../utils/form/formactions';
import {
    addUser,
    clearAddUser,
    updateAdminUser,
    clearUpdateAdminUser
} from '../../../store/actions/user_action';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSortAlphaDown, faAlignLeft, faFont, faChevronLeft, faEnvelope, faPhone, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faAlignLeft)


const MasterAdminTable = (props) => {
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
    const useOutsideAlerter2 = (ref) => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                searchmodeHandler2(false)
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
    const wrapperRef2 = useRef(null);
    useOutsideAlerter(wrapperRef);
    useOutsideAlerter2(wrapperRef2);
    const { userprops } = useSelector(state => ({
        userprops: state.user
    }))
    const { dataselected, editformdatastatus } = props;
    const [temporarydataselected] = useState(dataselected);
    const dispatch = useDispatch();
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');
    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            title: 'Name',
            value: editformdatastatus ? temporarydataselected.name : '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter name'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        email: {
            element: 'input',
            title: 'Email',
            value: editformdatastatus ? temporarydataselected.email : '',
            config: {
                name: 'emailInput',
                type: 'email',
                placeholder: 'Enter email'
            },
            validation: {
                required: true,
                email: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        phone: {
            element: 'input',
            title: 'Phone',
            value: editformdatastatus ? temporarydataselected.phone : '',
            config: {
                name: 'phoneInput',
                type: 'text',
                placeholder: 'Enter phone number'
            },
            validation: {
                required: true,
                phone: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        password: {
            element: 'input',
            title: 'Password',
            value: editformdatastatus ? temporarydataselected.password : '',
            config: {
                name: 'passwordInput',
                type: 'password',
                placeholder: 'Enter password'
            },
            validation: {
                required: true,
                strong: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        confirmPassword: {
            element: 'input',
            title: 'Confirm Password',
            value: editformdatastatus ? temporarydataselected.password : '',
            config: {
                name: 'confirmPasswordInput',
                type: 'password',
                placeholder: 'Confirm password'
            },
            validation: {
                required: true,
                confirm: 'password'
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        images: {
            title: 'KTP',
            value: editformdatastatus ? temporarydataselected.images : [],
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
    });

    const [adminformdata, adminformdataHandler] = useState({
        isauth: {
            element: 'select',
            title: 'Authenticating',
            selectedValue: dataselected.isAuth ? "YES" : "NO",
            value: dataselected.isAuth ? true : false,
            config: {
                name: 'isauthInput',
                options: [
                    { value: true, name: 'YES' },
                    { value: false, name: 'NO' },
                ],
                placeholder: dataselected.isAuth ? "YES" : "NO"
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        isactive: {
            element: 'select',
            title: 'Activing',
            selectedValue: dataselected.isActive ? "YES" : "NO",
            value: dataselected.isActive ? true : false,
            config: {
                name: 'isactiveInput',
                options: [
                    { value: true, name: 'YES' },
                    { value: false, name: 'NO' },
                ],
                placeholder: dataselected.isActive ? "YES" : "NO"
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
    });
    const [dontblur, dontblurHandler] = useState(false);
    const [dontblur2, dontblurHandler2] = useState(false);
    const [searchmode, searchmodeHandler] = useState(false);
    const [searchmode2, searchmodeHandler2] = useState(false);
    const [imageToDelete, imageToDeleteHandler] = useState({
        images: {
            value: []
        }
    });
    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'adminuser');
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
                var newFormdata = formdata;
                const temporaryFormdata = {
                    ...newFormdata
                }

                const newElement = {
                    ...temporaryFormdata[uploadname]
                }
                if (imagesToAddSort.length < 2) {
                    newElement.value = imagesToAddSort
                } else {
                    formErrorHandler(true)
                    errorMessageHandler("Please upload one image only")
                }
                temporaryFormdata[uploadname] = newElement;
                formdataHandler(temporaryFormdata);
            } else {
                var newFormdata2 = formdata;
                const temporaryFormdata2 = {
                    ...newFormdata2
                }

                const newElement2 = {
                    ...temporaryFormdata2[uploadname]
                }
                if (multifiles) {
                    for (let zxc = 0; zxc < imagesToAddSort.length; zxc++) {
                        newElement2.value.push(imagesToAddSort[zxc])
                    }
                } else {
                    if (imagesToAddSort.length < 2) {
                        newElement2.value = imagesToAddSort
                    } else {
                        formErrorHandler(true)
                        errorMessageHandler("Please upload one image only")
                    }
                }
                temporaryFormdata2[uploadname] = newElement2;
                formdataHandler(temporaryFormdata2);
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

    const goBackToTable = () => {
        props.history.push('/admin/master/user');
    }

    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'adminuser');
        let formIsValid = isFormValid(formdata, 'adminuser');

        if (formIsValid) {
            dispatch(addUser(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearAddUser());
                    formSuccessHandler(true);
                    props.history.push('/admin/master/user');
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

        let dataToSubmit2 = generateData(formdata, 'adminuseredit');
        let formIsValid2 = isFormValid(formdata, 'adminuseredit');
        let admindataToSubmit2 = generateData(adminformdata, 'adminaccessedit');
        let datachange = 0;
        let differentpassword = false;
        for (let key1 in temporarydataselected) {
            if (key1 === "category") {
                if (temporarydataselected[key1]._id.toString() === dataToSubmit2[key1].toString()) {
                    datachange = datachange + 1;
                }
            } else if (key1 === "password") {
                if (temporarydataselected[key1] === dataToSubmit2[key1]) {
                    datachange = datachange + 1;
                    differentpassword = false;
                }
                if (temporarydataselected[key1] !== dataToSubmit2[key1]) {
                    differentpassword = true;
                }
            } else {
                if (temporarydataselected[key1] === dataToSubmit2[key1]) {
                    datachange = datachange + 1;
                }
            }
        }

        if (datachange === 5 && userprops.masteradmin === 0) {
            formErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('CHANGE DATA BEFORE SUBMIT!');
        } else {
            const totaldataToSubmit = {
                ...dataToSubmit2,
                _id: temporarydataselected._id,
                differentpassword,
                isauth: admindataToSubmit2.isauth ? "yes" : "no",
                isactive: admindataToSubmit2.isactive ? "yes" : "no",
            }
            if (formIsValid2) {
                totaldataToSubmit.imagesToRemove = imageToDelete.images.value;
                dispatch(updateAdminUser(totaldataToSubmit)).then(response => {
                    if (response.payload.success) {
                        dispatch(clearUpdateAdminUser());
                        formSuccessHandler(true);
                        props.history.push('/admin/master/user');
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

    const searchForm = () => {
        searchmodeHandler(true)
    }

    const searchForm2 = () => {
        searchmodeHandler2(true)
    }

    const onMouseEnter = () => {
        dontblurHandler(true)
    }
    const onMouseLeave = () => {
        dontblurHandler(false)
    }

    const onMouseEnter2 = () => {
        dontblurHandler2(true)
    }
    const onMouseLeave2 = () => {
        dontblurHandler2(false)
    }

    const hideprofilemenu = () => {
        searchmodeHandler(false)
    }

    const hideprofilemenu2 = () => {
        searchmodeHandler2(false)
    }

    const selectedItem = (data, whichdata) => {
        var newFormdata = adminformdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }
        newElement.value = data.value;
        newElement.selectedValue = data.name;
        temporaryFormdata[whichdata] = newElement;
        adminformdataHandler(temporaryFormdata);
        formErrorHandler(false);
        if (whichdata === 'isauth') {
            searchmodeHandler(false);
            dontblurHandler(false);
        }
        if (whichdata === 'isactive') {
            searchmodeHandler2(false);
            dontblurHandler2(false);
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

    return (
        <div className="card">
            <div className="cardTitle verticalCenter">
                <span>{props.pageTitle}</span>
            </div>
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
                    <label className="col-md-2 col-xs-12 colFormLabel">{formdata.email.title}</label>
                    <div className="col-md-10 col-xs-12">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'email'}
                            formdata={formdata.email}
                            change={(element) => updateForm(element)}
                            myclass={'form-control'}
                        />
                    </div>
                </div>
                <div className="row pb25">
                    <label className="col-md-2 col-xs-12 colFormLabel">{formdata.phone.title}</label>
                    <div className="col-md-10 col-xs-12">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'phone'}
                            formdata={formdata.phone}
                            change={(element) => updateForm(element)}
                            myclass={'form-control'}
                        />
                    </div>
                </div>
                <div className="row pb25">
                    <label className="col-md-2 col-xs-12 colFormLabel">{formdata.password.title}</label>
                    <div className="col-md-10 col-xs-12">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faLock}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'password'}
                            formdata={formdata.password}
                            change={(element) => updateForm(element)}
                            myclass={'form-control'}
                        />
                    </div>
                </div>
                <div className="row pb25">
                    <label className="col-md-2 col-xs-12 colFormLabel">{formdata.confirmPassword.title}</label>
                    <div className="col-md-10 col-xs-12">
                        <div className="iconPosition">
                            <FontAwesomeIcon
                                icon={faShieldAlt}
                                className="icon agraicon"
                            />
                        </div>
                        <FormField
                            id={'confirmPassword'}
                            formdata={formdata.confirmPassword}
                            change={(element) => updateForm(element)}
                            myclass={!formdata.password.value ? 'form-control disabled' : editformdatastatus && formdata.password.value === temporarydataselected.password ? 'form-control disabled' : 'form-control'}
                        />
                    </div>
                </div>
                {
                    editformdatastatus && userprops.userData && userprops.userData.masteradmin > 0 ?
                        <div className="row pb25">
                            <label className="col-md-2 col-xs-12 colFormLabel">{adminformdata.isauth.title}</label>
                            <div className="col-md-10 col-xs-12">
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
                                                    name={adminformdata.isauth.title}
                                                    placeholder={adminformdata.isauth.title}
                                                    title={adminformdata.isauth.config.placeholder}
                                                    value={adminformdata.isauth.value ? "YES" : "NO"}
                                                    // onChange={(event) => handleChange(event)}
                                                    // autoFocus={false}
                                                />

                                            </div>
                                            <ul
                                                className="dropdownmenu listgroup profilemenu"
                                                onMouseEnter={onMouseEnter}
                                                onMouseLeave={onMouseLeave}
                                            >
                                                {showLinks(adminformdata.isauth.config.options, 'isauth')}
                                            </ul>
                                        </div>
                                        :
                                        <FormField
                                            id={'isauth'}
                                            formdata={adminformdata.isauth}
                                            options={adminformdata.isauth.config.options}
                                            change={searchForm}
                                            myclass="inputbutton form-control"
                                        />
                                }

                            </div>
                        </div>
                        : null
                }
                {
                    editformdatastatus && userprops.userData && userprops.userData.masteradmin > 0 ?
                        <div className="row pb25">
                            <label className="col-md-2 col-xs-12 colFormLabel">{adminformdata.isactive.title}</label>
                            <div className="col-md-10 col-xs-12">
                                <div className="iconPosition">
                                    <FontAwesomeIcon
                                        icon={faSortAlphaDown}
                                        className="icon agraicon"
                                    />
                                </div>
                                {
                                    searchmode2 ?
                                        <div ref={wrapperRef2}>
                                            <div
                                                onBlur={dontblur2 ? null : hideprofilemenu2}
                                                tabIndex={0}
                                            >
                                                <input
                                                    disabled
                                                    autoCapitalize="none"
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    className="tableSearch"
                                                    type="text"
                                                    name={adminformdata.isactive.title}
                                                    placeholder={adminformdata.isactive.title}
                                                    title={adminformdata.isactive.placeholder}
                                                    value={adminformdata.isactive.value ? "YES" : "NO"}
                                                    // onChange={(event) => handleChange(event)}
                                                    autoFocus={false}
                                                />

                                            </div>
                                            <ul
                                                className="dropdownmenu listgroup profilemenu"
                                                onMouseEnter={onMouseEnter2}
                                                onMouseLeave={onMouseLeave2}
                                            >
                                                {showLinks(adminformdata.isactive.config.options, 'isactive')}
                                            </ul>
                                        </div>
                                        :
                                        <FormField
                                            id={'isactive'}
                                            formdata={adminformdata.isactive}
                                            options={adminformdata.isactive.config.options}
                                            change={searchForm2}
                                            myclass="inputbutton form-control"
                                        />
                                }

                            </div>
                        </div>
                        : null
                }
                <div className="row pb25">
                    <label className="col-md-12 col-xs-12 colFormLabel">{formdata.images.title}</label>
                    <div className="col-md-12 col-xs-12">
                        <FileUpload
                            id={'fileupload'}
                            reset={formSuccess}
                            myclass={'form-control'}
                            onFilesAlreadyAdded={previewFile}
                            multifiles={false}
                            uploadname={'images'}
                        />
                        {
                            showSoonToUpdateImages('images')
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
        </div>

    );
};

export default MasterAdminTable;