import React, {
    useState,
    useEffect,
    useRef,
} from 'react';
import {
    // useSelector,
    useDispatch
} from 'react-redux';

// import TextEditor from '../../utils/textarea';
import BackDrop from '../../views/layout/backdrop/tablebackdrop';
import FormField from '../../utils/form/formfield';
import FileUpload from '../../utils/form/fileupload';
import { update, validate, generateData, isFormValid } from '../../utils/form/formactions';
import { getProductcats, addProductcat, clearProductcat } from '../../../store/actions/productcat_action';
import { getProductbrands, addProductbrand, clearProductbrand } from '../../../store/actions/productbrand_action';
import {
    addProduct,
    clearProduct,
    updateProduct,
    clearUpdateProduct,
    updateAdditionalProduct,
    clearUpdateAdditionalProduct
} from '../../../store/actions/product_action';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faSortAlphaDown, faAlignLeft, faFont, faChevronLeft, faPlus, faCubes, faShareSquare, faCheck, faCross, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import {
    // faEnvelope, 
    // faListAlt, 
    faAddressCard
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faCross)


const ProductTableScreen = (props) => {
    const useOutsideAlerter = (ref) => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                searchpublishmodeHandler(false)
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
    //     userprops: state.user,
    // }))
    const { dataselected, editformdatastatus } = props;
    const dispatch = useDispatch();
    // const size = useWindowSize();
    const [formError, formErrorHandler] = useState(false);
    const [formSuccess, formSuccessHandler] = useState(false);
    const [additionalformError, additionalformErrorHandler] = useState(false);
    const [additionalformSuccess, additionalformSuccessHandler] = useState(false);
    const [additionalinfoError, additionalinfoErrorHandler] = useState(false);
    const [additionalinfoSuccess] = useState(false);
    const [errorMessage, errorMessageHandler] = useState('DATA INVALID, PLEASE RECHECK!');


    const [allcategory, alldataCategoryHandler] = useState([]);
    const [allbrand, alldataBrandHandler] = useState([]);

    const [addcategory, addcategoryHandler] = useState(false);
    const [addadditional, addadditionalHandler] = useState(false);
    const [dontblur, dontblurHandler] = useState(false);
    const [searchmode, searchmodeHandler] = useState(false);
    const [searchcategory, searchcategoryHandler] = useState("");
    const [searchresultCategory, searchresultCategoryHandler] = useState([]);


    const [addbrand, addbrandHandler] = useState(false);
    const [searchbrandmode, searchbrandmodeHandler] = useState(false);
    const [dontblurbrand, dontblurbrandHandler] = useState(false);
    const [searchbrand, searchbrandHandler] = useState("");
    const [searchresultBrand, searchresultBrandHandler] = useState([]);

    const [searchpublishmode, searchpublishmodeHandler] = useState(false);
    const [dontblurpublish, dontblurpublishHandler] = useState(false);

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

    // const [typedontblur, typedontblurHandler] = useState(false);
    // const [typesearchmode, typesearchmodeHandler] = useState(false);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// MAIN FORM DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // console.log(dataselected, "<<<<<<<<<<<<<<<<<<<data")
    const [formdata, formdataHandler] = useState({
        name: {
            element: 'input',
            title: 'Title',
            value: editformdatastatus ? dataselected.name : '',
            config: {
                name: 'nameInput',
                type: 'text',
                placeholder: 'Enter product name'
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
        // details: {
        //     element: 'input',
        //     title: 'Details',
        //     value: editformdatastatus ? dataselected.details : '',
        //     config: {
        //         name: 'nameInput',
        //         type: 'text',
        //         placeholder: 'Enter details'
        //     },
        //     validation: {
        //         required: false
        //     },
        //     valid: true,
        //     touched: true,
        //     validationMessage: ''
        // },
        brand: {
            element: 'select',
            title: 'Main Category',
            selectedValue: editformdatastatus ? dataselected.brand.name.replace(/^\w/, c => c.toUpperCase()) : '',
            value: editformdatastatus ? dataselected.brand._id : '',
            config: {
                name: 'brandInput',
                options: [],
                placeholder: editformdatastatus ? dataselected.brand.name.replace(/^\w/, c => c.toUpperCase()) : 'Choose brand'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        category: {
            element: 'select',
            title: 'Category',
            selectedValue: [],
            value: [],
            config: {
                name: 'categoryarrayInput',
                options: [],
                placeholder: editformdatastatus ? dataselected.category[0].name.replace(/^\w/, c => c.toUpperCase()) : 'Choose Category'
            },
            validation: {
                required: true
            },
            valid: editformdatastatus ? true : false,
            touched: editformdatastatus ? true : false,
            validationMessage: ''
        },
        images: {
            title: 'Images',
            value: editformdatastatus ? dataselected.images : [],
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
        publish: {
            element: 'select',
            title: 'Publish',
            selectedValue: editformdatastatus ? dataselected.publish ? "YES" : "NO" : "NO",
            value: editformdatastatus ? dataselected.publish : false,
            config: {
                name: 'publishInput',
                options: [
                    { value: true, name: 'YES' },
                    { value: false, name: 'NO' },
                ],
                placeholder: editformdatastatus ? dataselected.publish ? "YES" : "NO" : "NO"
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        },
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// MAIN FORM DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD BRAND
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [formaddbrand, formaddbrandHandler] = useState({
        name: {
            element: 'input',
            title: 'Brand',
            value: '',
            config: {
                name: 'brandsInput',
                type: 'text',
                placeholder: 'Enter Brand'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD BRAND
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [formaddcategory, formaddcategoryHandler] = useState({
        name: {
            element: 'input',
            title: 'New Category',
            value: '',
            config: {
                name: 'newcategoriesInput',
                type: 'text',
                placeholder: 'Enter New Category'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    });
    const [temporarydatacategory, temporarydatacategoryHandler] = useState({
        category: {
            element: 'select',
            title: 'Category',
            selectedValue: '',
            value: "",
            config: {
                name: 'categoriesInput',
                options: [],
                placeholder: 'Choose Category'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD ADDITIONAL
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [formadditional, formadditionalHandler] = useState({
        additional: {
            title: 'Additional',
            value: editformdatastatus ? dataselected.additional : [],
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
    })
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD ADDITIONAL
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD ADDITIONAL DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [formaddinfo, formaddinfoHandler] = useState({
        info: {
            element: 'input',
            title: 'Information',
            value: '',
            config: {
                name: 'additionalinfoInput',
                type: 'text',
                placeholder: 'Enter information'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        subinfo: {
            element: 'input',
            title: 'Subinfo',
            value: '',
            config: {
                name: 'additionalsubinfoInput',
                type: 'text',
                placeholder: 'Enter sub information'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        link: {
            element: 'input',
            title: 'Link',
            value: '',
            config: {
                name: 'additionallinkInput',
                type: 'text',
                placeholder: 'Enter link website only'
            },
            validation: {
                required: false
            },
            valid: true,
            touched: true,
            validationMessage: ''
        }
        // type: {
        //     element: 'select',
        //     title: 'Type',
        //     selectedValue: '',
        //     value: '',
        //     config: {
        //         name: 'typeInput',
        //         options: [
        //             { value: 'button', name: 'BUTTON' },
        //             { value: 'information', name: 'INFORMATION' }
        //         ],
        //         placeholder: 'Choose type'
        //     },
        //     validation: {
        //         required: true
        //     },
        //     valid: false,
        //     touched: false,
        //     validationMessage: ''
        // },
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FORM DATA ADD ADDITIONAL DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADDITIONAL PLUS BUTTON
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const AddAdditionalFunctionHandler = () => {
        var newFormdata = { ...formaddinfo };

        for (let key in newFormdata) {
            if (key === 'link') {
                newFormdata[key].valid = true;
                newFormdata[key].touched = true;
            } else {
                newFormdata[key].valid = false;
                newFormdata[key].touched = false;
            }
            newFormdata[key].value = '';
            newFormdata[key].validationMessage = '';
        }
        formaddinfoHandler(newFormdata);
        addadditionalHandler(true);
        formErrorHandler(false);
    }
    const AddCategoryBackdrop = () => {
        addcategoryHandler(true);
        formErrorHandler(false);
        additionalformErrorHandler(false);
    }

    const AddBrandBackdrop = () => {
        addbrandHandler(true);
        formErrorHandler(false);
        additionalformErrorHandler(false);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADDITIONAL PLUS BUTTON
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// BACKDROP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const backdropClickHandler = () => {
        document.body.style.overflow = 'overlay';
        var newFormdata = formaddcategory;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['name']
        }

        newElement.value = "";
        newElement.valid = false;
        newElement.touched = false;

        temporaryFormdata['name'] = newElement;

        formaddcategoryHandler(temporaryFormdata);
        addcategoryHandler(false);
        additionalformErrorHandler(false);
        addbrandHandler(false);
    }

    const additionalClickHandler = () => {
        document.body.style.overflow = 'overlay';
        addadditionalHandler(false);
        additionalinfoErrorHandler(false);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// BACKDROP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    // useEffect(() => {
    //     let mounted = true;
    //     async function editformInputData() {
    //         if (mounted && props.editformdatastatus === true) {
    //             var newFormdata = formdata;
    //             for (let key in newFormdata) {
    //                 newFormdata[key].value = dataselected[key];
    //                 newFormdata[key].valid = true;
    //                 newFormdata[key].touched = true;
    //                 newFormdata[key].validationMessage = '';
    //                 // if (key === 'images') {
    //                 //     newFormdata[key].value = [];
    //                 //     newFormdata[key].valid = true;
    //                 // } else {
    //                 //     newFormdata[key].value = '';
    //                 //     newFormdata[key].valid = false;
    //                 // }
    //                 // newFormdata[key].touched = false;
    //                 // newFormdata[key].validationMessage = '';
    //             }
    //             formdataHandler(newFormdata);
    //         }
    //     }
    //     editformInputData();
    //     return () => {
    //         mounted = false;
    //     }
    // }, [props.editformdatastatus, dataselected, formdata])
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FETCHING DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                let allcategories = await dispatch(getProductcats(), { signal: abortController.signal });
                let allbrands = await dispatch(getProductbrands(), { signal: abortController.signal });
                if (mounted) {
                    let totalcategories = allcategories.payload.productcats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    let totalbrands = allbrands.payload.productbrands.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    if (editformdatastatus) {
                        let currentcategories = dataselected.category;
                        var newFormdata = formdata;
                        const temporaryFormdata = {
                            ...newFormdata
                        }

                        const newElement = {
                            ...temporaryFormdata['category']
                        }

                        for (let i = 0; i < currentcategories.length; i++) {
                            newElement.selectedValue.push(currentcategories[i].name);
                            newElement.value.push(currentcategories[i]._id)
                        }
                        temporaryFormdata['category'] = newElement;
                        formdataHandler(temporaryFormdata);
                    }
                    alldataCategoryHandler(totalcategories);
                    alldataBrandHandler(totalbrands);
                    searchresultCategoryHandler(totalcategories);
                    searchresultBrandHandler(totalbrands);
                }
            } catch (error) {

            }
        }
        getAllData();
        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getProductcats());
    // }, [dispatch])
    // useEffect(() => {
    //     if (getalldata.getProductcat && getalldata.getProductcat.success) {
    //         let totaldata = getalldata.getProductcat.productcats.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    //         alldataHandler(totaldata);
    //         searchresultHandler(totaldata);
    //     }
    // }, [getalldata])
    useEffect(() => {
        if (allcategory) {
            const results = allcategory.filter(result =>
                result.name.toLowerCase().includes(searchcategory.toLowerCase())
            );
            searchresultCategoryHandler(results);
        }

    }, [allcategory, searchcategory]);
    useEffect(() => {
        if (allbrand) {
            const results = allbrand.filter(result =>
                result.name.toLowerCase().includes(searchbrand.toLowerCase())
            );
            searchresultBrandHandler(results);
        }

    }, [allbrand, searchbrand]);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// FETCHING DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    // console.log(formdata, "<<<<<<<<<S<S<S<S<S<S< formdata")

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// INPUT FORM DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'product');
        formErrorHandler(false);
        formdataHandler(newFormdata);
    }
    const additionalUpdateFormBrand = (element) => {
        const newFormdata = update(element, formaddbrand, 'additionalproductbrand');
        additionalformErrorHandler(false);
        formaddbrandHandler(newFormdata);
    }
    const additionalUpdateFormCategory = (element) => {
        const newFormdata = update(element, formaddcategory, 'additionalproductcat');
        additionalformErrorHandler(false);
        formaddcategoryHandler(newFormdata);
    }
    const additionalinfoUpdateForm = (element) => {
        const newFormdata = update(element, formaddinfo, 'additionalinfo');
        additionalinfoErrorHandler(false);
        formaddinfoHandler(newFormdata);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// INPUT FORM DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        searchcategoryHandler("");
        searchmodeHandler(false)
    }
    const handleChange = (event) => {
        searchcategoryHandler(event.target.value);
    }
    const addCategoryToProduct = (data, whichdata) => {
        var newFormdata = temporarydatacategory;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        temporarydatacategoryHandler(temporaryFormdata);
        formErrorHandler(false);
        // if (whichdata === 'category') {
        searchcategoryHandler("");
        searchmodeHandler(false);
        dontblurHandler(false);
        // } else if (whichdata === 'brand') {
        //     searchbrandHandler("");
        //     searchbrandmodeHandler(false);
        //     dontblurbrandHandler(false);
        // }
    }
    const selecteditemCategory = (data) => {
        temporarydatacategoryHandler(data)
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// BRAND
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const searchFormBrand = () => {
        searchbrandmodeHandler(true)
    }
    const onMouseEnterBrand = () => {
        dontblurbrandHandler(true)
    }
    const onMouseLeaveBrand = () => {
        dontblurbrandHandler(false)
    }
    const brandhideprofilemenu = () => {
        searchbrandHandler("");
        searchbrandmodeHandler(false)
    }
    const brandhandleChange = (event) => {
        searchbrandHandler(event.target.value);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// BRAND
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// BRAND && CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const selectedItem = (data, whichdata) => {
        var newFormdata = formdata;
        var newFormDataCategory = temporarydatacategory;

        const temporaryFormdata = {
            ...newFormdata
        }

        const temporaryFormdataCategory = {
            ...newFormDataCategory
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        const newElementCategory = {
            ...temporaryFormdataCategory[whichdata]
        }


        if (whichdata === 'category') {
            if (newElement.value.includes(data._id)) {
                newElementCategory.value = '';
                newElementCategory.selectedValue = '';
                temporaryFormdataCategory[whichdata] = newElementCategory;
                temporarydatacategoryHandler(temporaryFormdataCategory);
                formErrorHandler(true);
                errorMessageHandler("Category exist");
                searchcategoryHandler("");
                searchmodeHandler(false);
                dontblurHandler(false);
            } else {
                newElement.value.push(data._id);
                newElementCategory.value = '';

                newElement.selectedValue.push(data.name.replace(/^\w/, c => c.toUpperCase()));
                newElementCategory.selectedValue = '';

                let validData = validate(newElement, newFormdata);
                newElement.valid = validData[0];
                newElement.validationMessage = validData[1];

                temporaryFormdata[whichdata] = newElement;
                temporaryFormdataCategory[whichdata] = newElementCategory;

                formdataHandler(temporaryFormdata);
                temporarydatacategoryHandler(temporaryFormdataCategory);

                searchcategoryHandler("");
                searchmodeHandler(false);
                dontblurHandler(false);
            }

        } else if (whichdata === 'brand') {
            newElement.value = data._id;
            newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
            let validData = validate(newElement, newFormdata);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
            temporaryFormdata[whichdata] = newElement;
            formdataHandler(temporaryFormdata);
            formErrorHandler(false);
            searchbrandHandler("");
            searchbrandmodeHandler(false);
            dontblurbrandHandler(false);
        }

    }
    // const selectedItemBrand = (data, whichdata) => {
    //     var newFormdata = formdata;
    //     const temporaryFormdata = {
    //         ...newFormdata
    //     }

    //     const newElement = {
    //         ...temporaryFormdata[whichdata]
    //     }

    //     newElement.value = data._id;
    //     newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
    //     let validData = validate(newElement, newFormdata);
    //     newElement.valid = validData[0];
    //     newElement.validationMessage = validData[1];
    //     temporaryFormdata[whichdata] = newElement;
    //     formdataHandler(temporaryFormdata);
    //     searchbrandHandler("");
    //     formErrorHandler(false);
    //     searchbrandmodeHandler(false);
    //     dontblurbrandHandler(false);
    // }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// BRAND && CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// PUBLISH
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const searchFormPublish = () => {
        searchpublishmodeHandler(true)
    }
    const onMouseEnterPublish = () => {
        dontblurpublishHandler(true)
    }
    const onMouseLeavePublish = () => {
        dontblurpublishHandler(false)
    }
    const hidepublishmenu = () => {
        searchpublishmodeHandler(false)
    }
    const chooseTrueFalse = (type, whichdata) => {
        let list = [];

        if (type && type.length > 0) {
            type.forEach((item) => {
                list.push(item)
            });
        }

        return list.map((item, i) => (
            <li
                key={i}
                onClick={() => selectedItemPublish(item, whichdata)}
                className="listgroupitem"
            >
                <span className="memberHeaderLink">
                    {item.name.replace(/^\w/, c => c.toUpperCase())}
                </span>

            </li>
        ))
    }
    const selectedItemPublish = (data, whichdata) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata[whichdata]
        }

        newElement.value = data.value;
        newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
        let validData = validate(newElement, newFormdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        temporaryFormdata[whichdata] = newElement;
        formdataHandler(temporaryFormdata);
        formErrorHandler(false);
        searchpublishmodeHandler(false);
        dontblurpublishHandler(false);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// PUBLISH
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////// ADDITIONAL TYPE
    // const typeForm = () => {
    //     typesearchmodeHandler(true)
    // }
    // const onTypeMouseEnter = () => {
    //     typedontblurHandler(true)
    // }
    // const onTypeMouseLeave = () => {
    //     typedontblurHandler(false)
    // }
    // const hideadditionaltypemenu = () => {
    //     typesearchmodeHandler(false)
    // }
    // const selectedadditionalItem = (data, whichdata) => {
    //     var newFormdata = formaddinfo;
    //     const temporaryFormdata = {
    //         ...newFormdata
    //     }

    //     const newElement = {
    //         ...temporaryFormdata[whichdata]
    //     }

    //     newElement.value = data.value;
    //     newElement.selectedValue = data.name.replace(/^\w/, c => c.toUpperCase());
    //     let validData = validate(newElement, newFormdata);
    //     newElement.valid = validData[0];
    //     newElement.validationMessage = validData[1];
    //     temporaryFormdata[whichdata] = newElement;
    //     formaddinfoHandler(temporaryFormdata);
    //     additionalinfoErrorHandler(false);
    //     typesearchmodeHandler(false);
    //     typedontblurHandler(false);
    // }
    ////////////////////////////////////////////////// ADDITIONAL TYPE

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SHOW THE DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const showLinks = (type, whichdata, whichfunction) => {
        let list = [];

        if (type && type.length > 0) {
            type.forEach((item) => {
                list.push(item)
            });
        }

        return list.map((item, i) => (
            <li
                key={i}
                onClick={() => whichfunction(item, whichdata)}
                className="listgroupitem"
            >
                <span className="memberHeaderLink">
                    {item.name.replace(/^\w/, c => c.toUpperCase())}
                </span>

            </li>
        ))
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

    const showAdditionalInfo = () => {
        if (formadditional.additional.value && formadditional.additional.value.length > 0) {
            return (
                <div className="row pb25">
                    {
                        formadditional.additional.value.map((data, index) => (
                            <div className="col-md-12 col-xs-12 p0 pb15" key={index}>
                                <label className="col-md-12 col-xs-12 colFormLabel">

                                    <div className="deleteButtonWrapper">
                                        {data.info}
                                        <div
                                            className="deleteButton buttonColor"
                                            title=""
                                            onClick={() => deleteAdditional(data, formadditional.additional.value[index])}
                                            style={{
                                                marginLeft: '10px'
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                </label>
                                <div className="col-md-5 col-xs-12" key={index}>
                                    <input
                                        disabled
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        className="form-control noicon"
                                        type="text"
                                        value={data.subinfo}
                                    />
                                </div>
                                <div className="col-md-7 col-xs-12">
                                    <input
                                        disabled
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        className="form-control noicon"
                                        type="text"
                                        value={data.link}
                                    />
                                </div>
                            </div>

                        ))
                    }

                </div>
            )
        }
    }

    const addAdditionalData = (data) => (
        <div className="actionTitle">
            <div className="actionTitleText">{data}</div>
        </div>
    )
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SHOW THE DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADD NEW ADDITIONAL DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const submitAdditionalInfo = (event) => {
        event.preventDefault();

        let additionalToSubmit = generateData(formaddinfo, 'formaddinfo');
        let additionalIsValid = isFormValid(formaddinfo, 'formaddinfo');
        if (additionalIsValid) {
            // console.log(additionalToSubmit, "<<<<<<<<<<<additionalToSubmit<<<<<<<")
            var newFormdata = formadditional;
            const temporaryFormdata = {
                ...newFormdata
            }

            const newElement = {
                ...temporaryFormdata['additional']
            }
            newElement.value.push(additionalToSubmit);
            temporaryFormdata['additional'] = newElement;
            formadditionalHandler(temporaryFormdata)
            addadditionalHandler(false);
        } else {
            additionalinfoErrorHandler(true);
            errorMessageHandler('PLEASE COMPLETE FORM!');
            // console.log(errorMessage, "<<<<<<<<<")
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADD NEW ADDITIONAL DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADD NEW BRAND
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const submitAdditionalBrand = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let brandToSubmit = generateData(formaddbrand, 'addbrand');
        let brandIsValid = isFormValid(formaddbrand, 'addbrand');
        let exist = false;
        for (let key in allbrand) {
            if (brandToSubmit.name === allbrand[key].name) {
                exist = true
            }
        }

        if (brandIsValid) {
            if (exist) {
                additionalformErrorHandler(true);
                props.loadingtableHandler(false);
                errorMessageHandler('BRAND EXIST!');
            } else {
                dispatch(addProductbrand(brandToSubmit)).then(response => {
                    if (response.payload.success) {
                        dispatch(clearProductbrand());
                        additionalformSuccessHandler(true);
                        props.history.push('/admin/product/addnew');
                    } else {
                        additionalformErrorHandler(true);
                        props.loadingtableHandler(false);
                        errorMessageHandler(response.payload.message);
                    }
                })
            }

        } else {
            additionalformErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('PLEASE INSERT DATA!');
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADD NEW BRAND
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADD NEW CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const submitAdditionalCategory = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let categoryToSubmit = generateData(formaddcategory, 'addcategory');
        let categoryIsValid = isFormValid(formaddcategory, 'addcategory');
        let exist = false;
        for (let key in allcategory) {
            if (categoryToSubmit.name === allcategory[key].name) {
                exist = true
            }
        }

        if (categoryIsValid) {
            if (exist) {
                additionalformErrorHandler(true);
                props.loadingtableHandler(false);
                errorMessageHandler('CATEGORY EXIST!');
            } else {
                dispatch(addProductcat(categoryToSubmit)).then(response => {
                    if (response.payload.success) {
                        dispatch(clearProductcat());
                        additionalformSuccessHandler(true);
                        props.history.push('/admin/product/addnew');
                    } else {
                        additionalformErrorHandler(true);
                        props.loadingtableHandler(false);
                        errorMessageHandler(response.payload.message);
                    }
                })
            }

        } else {
            additionalformErrorHandler(true);
            props.loadingtableHandler(false);
            errorMessageHandler('PLEASE INSERT DATA!');
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// ADD NEW CATEGORY
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SUBMIT THE DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const submitData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit = generateData(formdata, 'product');
        let formIsValid = isFormValid(formdata, 'product');

        if (formIsValid) {
            dispatch(addProduct(dataToSubmit)).then(response => {
                if (response.payload.success) {
                    dispatch(clearProduct());
                    formSuccessHandler(true);
                    props.history.push('/admin/product');
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
            // errorMessageHandler(portfolioprops)
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SUBMIT THE DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SUBMIT ADDITIONAL DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const submitAdditionalData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit3 = generateData(formadditional, 'submitadditionaldata');
        let formIsValid3 = isFormValid(formadditional, 'submitadditionaldata');

        if (formIsValid3) {
            dispatch(updateAdditionalProduct(dataToSubmit3, dataselected._id)).then(response => {
                if (response.payload.success) {
                    dispatch(clearUpdateAdditionalProduct());
                    additionalformSuccessHandler(true);
                    formSuccessHandler(true);
                    props.history.push('/admin/product');
                } else {
                    additionalinfoErrorHandler(true);
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SUBMIT ADDITIONAL DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SUBMIT THE EDIT DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const submitEditData = (event) => {
        event.preventDefault();
        props.loadingtableHandler(true);

        let dataToSubmit2 = generateData(formdata, 'productedit');
        let formIsValid2 = isFormValid(formdata, 'productedit');
        let datachange = 0;
        for (let key1 in dataselected) {
            if (key1 === "category") {
                if (dataselected[key1].length === dataToSubmit2[key1].length) {
                    datachange = datachange + 1;
                }
            } else if (key1 === "images") {
                if (imageToUpload.images.value && imageToUpload.images.value.length > 0) {
                    datachange = datachange + 0;
                } else {
                    if (dataselected[key1] === dataToSubmit2[key1]) {
                        datachange = datachange + 1;
                    }
                }
            } else {
                if (dataselected[key1] === dataToSubmit2[key1]) {
                    datachange = datachange + 1;
                }
            }
        }

        if (datachange === 5) {
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
                dispatch(updateProduct(totaldataToSubmit)).then(response => {
                    if (response.payload.success) {
                        dispatch(clearUpdateProduct());
                        formSuccessHandler(true);
                        props.history.push('/admin/product');
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////// SUBMIT THE EDIT DATA
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const showInformation = () => {
    //     let theinformation = formdata.additional.value.filter((item) => {
    //         return item.type === 'information'
    //     })
    //     if (theinformation && theinformation.length > 0) {
    //         return (
    //             <div className="row pb25">
    //                 <label className="col-md-12 col-xs-12 colFormLabel">Information</label>
    //                 {
    //                     theinformation.map((data, index) => (
    //                         <div className="col-md-12 col-xs-12 p0">
    //                             <label className="col-md-2 col-xs-12 colFormLabel">{data.info}</label>
    //                             <div className="col-md-10 col-xs-12" key={index}>
    //                                 <input
    //                                     disabled
    //                                     autoCapitalize="none"
    //                                     autoComplete="off"
    //                                     autoCorrect="off"
    //                                     className="form-control"
    //                                     type="text"
    //                                     value={data.subinfo}
    //                                 />
    //                             </div>

    //                         </div>

    //                     ))
    //                 }

    //             </div>
    //         )
    //     }
    // }

    // const showButton = () => {
    //     let thebutton = formdata.additional.value.filter((item) => {
    //         return item.type === 'button'
    //     })
    //     if (thebutton && thebutton.length > 0) {
    //         return (
    //             <div className="row pb25">
    //                 <label className="col-md-12 col-xs-12 colFormLabel">Button</label>
    //                 {
    //                     thebutton.map((data, index) => (
    //                         <div className="col-md-12 col-xs-12" key={index}>
    //                             <input
    //                                 disabled
    //                                 autoCapitalize="none"
    //                                 autoComplete="off"
    //                                 autoCorrect="off"
    //                                 className="form-control"
    //                                 type="text"
    //                                 value={data.info}
    //                             />
    //                         </div>
    //                     ))
    //                 }

    //             </div>
    //         )
    //     }
    // }
    const goBackToTable = () => {
        props.history.push('/admin/product');
    }

    const deleteAdditional = (data, number) => {
        var newFormdata = formadditional;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['additional']
        }

        const updateValue = newElement.value.filter(a => a !== number);

        if (updateValue.length < 1) {
            newElement.value = [];
            newElement.valid = false;
            temporaryFormdata['additional'] = newElement;
            formadditionalHandler(temporaryFormdata);
        } else {
            newElement.value = updateValue;
            temporaryFormdata['additional'] = newElement;
            formadditionalHandler(temporaryFormdata);
        }

    }

    const deleteCategory = (data, number) => {
        var newFormdata = formdata;
        const temporaryFormdata = {
            ...newFormdata
        }

        const newElement = {
            ...temporaryFormdata['category']
        }

        const updateselectedValue = newElement.selectedValue.filter(i => i !== data);
        const updateValue = newElement.value.filter(a => a !== number);

        if (updateValue.length < 1 && updateselectedValue < 1) {
            newElement.selectedValue = [];
            newElement.value = [];
            newElement.valid = false;
            temporaryFormdata['category'] = newElement;
            formdataHandler(temporaryFormdata);
        } else {
            newElement.selectedValue = updateselectedValue;
            newElement.value = updateValue;
            temporaryFormdata['category'] = newElement;
            formdataHandler(temporaryFormdata);
        }

    }

    return (
        <div>
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
                        <label className="col-md-2 col-xs-12 colFormLabel">{formdata.description.title}</label>
                        <div className="col-md-10 col-xs-12">
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
                    {/* <div className="row pb25">
                        <label className="col-md-2 col-xs-12 colFormLabel">{formdata.description.title}</label>
                        <div className="col-md-10 col-xs-12">
                            <div className="texteditorcss">
                                <TextEditor 
                                    formdata={formdata}
                                />
                            </div>
                        </div>
                    </div> */}

                    <div className="row pb25">
                        <label className="col-md-2 col-xs-12 colFormLabel">{formdata.brand.title}</label>
                        <div className="col-md-9 col-xs-9 paddingRight">
                            <div className="iconPosition">
                                <FontAwesomeIcon
                                    icon={faSortAlphaDown}
                                    className="icon agraicon"
                                />
                            </div>
                            {
                                searchbrandmode ?
                                    <div>
                                        <div
                                            onBlur={dontblurbrand ? null : brandhideprofilemenu}
                                            tabIndex={0}
                                        >
                                            <input
                                                autoCapitalize="none"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                className="tableSearch"
                                                type="text"
                                                name={formdata.brand.title}
                                                placeholder={formdata.brand.title}
                                                title={formdata.brand.config.placeholder}
                                                value={searchbrand}
                                                onChange={(event) => brandhandleChange(event)}
                                                autoFocus={true}
                                            />

                                        </div>
                                        <ul
                                            className="dropdownmenu listgroup profilemenu"
                                            onMouseEnter={onMouseEnterBrand}
                                            onMouseLeave={onMouseLeaveBrand}
                                        >
                                            {showLinks(searchresultBrand, 'brand', selectedItem)}
                                        </ul>
                                    </div>


                                    :
                                    <FormField
                                        id={'brand'}
                                        formdata={formdata.brand}
                                        options={allbrand}
                                        change={searchFormBrand}
                                        myclass={`${allbrand && allbrand.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                    />
                            }


                        </div>
                        <div className="col-md-1 col-xs-3">
                            {
                                props.addMainCategory ?
                                    <div className="categoryButtonWrapper">
                                        <div
                                            className="categoryButton buttonColor"
                                            title=""
                                            onClick={() => AddBrandBackdrop()}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                    : null
                            }

                        </div>
                    </div>
                    <div className={!editformdatastatus && formdata.category.value.length > 0 ? "row pb10" : "row pb25"}>
                        <label className="col-md-2 col-xs-12 colFormLabel">{formdata.category.title}</label>
                        <div className="col-md-9 col-xs-8 paddingRight">
                            <div className="iconPosition">
                                <FontAwesomeIcon
                                    icon={faSortAlphaDown}
                                    className="icon agraicon"
                                />
                            </div>
                            {
                                searchmode ?
                                    <div>
                                        <div
                                            onBlur={dontblur ? null : hideprofilemenu}
                                            tabIndex={0}
                                        >
                                            <input
                                                autoCapitalize="none"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                className="tableSearch"
                                                type="text"
                                                name={temporarydatacategory.category.title}
                                                placeholder={temporarydatacategory.category.title}
                                                title={temporarydatacategory.category.config.placeholder}
                                                value={searchcategory}
                                                onChange={(event) => handleChange(event)}
                                                autoFocus={true}
                                            />

                                        </div>
                                        <ul
                                            className="dropdownmenu listgroup profilemenu"
                                            onMouseEnter={onMouseEnter}
                                            onMouseLeave={onMouseLeave}
                                        >
                                            {showLinks(searchresultCategory, 'category', addCategoryToProduct)}
                                        </ul>
                                    </div>
                                    :
                                    <FormField
                                        id={'category'}
                                        formdata={temporarydatacategory.category}
                                        options={allcategory}
                                        change={searchForm}
                                        myclass={`${allcategory && allcategory.length > 0 ? "inputbutton form-control" : "inputbutton form-control disabled"}`}
                                    />
                            }


                        </div>
                        <div className="col-md-1 col-xs-4">
                            <div className="categoryButtonWrapper">
                                <div
                                    className={temporarydatacategory.category.value ? "categoryButton buttonColor" : "categoryButton buttonColor disabled"}
                                    title=""
                                    onClick={() => selectedItem(temporarydatacategory.category.value, "category")}
                                    style={props.isMobile ? { marginRight: '13px' } : null}
                                >
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="icon agraicon w18px"
                                    />
                                </div>
                                {
                                    props.addCategory ?
                                        <div
                                            className="categoryButton buttonColor"
                                            title=""
                                            onClick={() => AddCategoryBackdrop()}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    {
                        formdata.category && formdata.category.value.length > 0 ?
                            <div className="row pb25">
                                <div className="col-md-2 col-xs-12"></div>
                                <div className="col-md-9 col-xs-12">
                                    Choosen :
                            {props.isMobile ? <br /> : null}
                                    {
                                        formdata.category && formdata.category.value.length > 0 ?
                                            formdata.category.selectedValue.map((item, index) => (
                                                <div
                                                    className="col-md-12 col-xs-12"
                                                    style={{ padding: 0 }}
                                                    key={index}
                                                >
                                                    <div className="deleteButtonWrapper">
                                                        <span style={{ marginRight: '5px' }}>{index + 1}. {item},</span>
                                                        <div
                                                            className="deleteButton buttonColor"
                                                            title=""
                                                            onClick={() => deleteCategory(item, formdata.category.value[index])}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTimes}
                                                                className="icon agraicon w18px"
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            ))
                                            : null
                                    }
                                </div>
                            </div>
                            : null
                    }

                    <div className="row pb25">
                        <label className="col-md-2 col-xs-12 colFormLabel">{formdata.publish.title}</label>
                        <div className="col-md-9 col-xs-9 paddingRight">
                            <div className="iconPosition">
                                <FontAwesomeIcon
                                    icon={faSortAlphaDown}
                                    className="icon agraicon"
                                />
                            </div>
                            {
                                searchpublishmode ?
                                    <div ref={wrapperRef}>
                                        <div
                                            onBlur={dontblurpublish ? null : hidepublishmenu}
                                            tabIndex={0}
                                        >
                                            <input
                                                disabled
                                                autoCapitalize="none"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                className="tableSearch"
                                                type="text"
                                                name={formdata.publish.title}
                                                placeholder={formdata.publish.title}
                                                title={formdata.publish.config.placeholder}
                                                value={formdata.publish.value ? "YES" : "NO"}
                                            // onChange={(event) => handleChange(event)}
                                            // autoFocus={true}
                                            />

                                        </div>
                                        <ul
                                            className="dropdownmenu listgroup profilemenu"
                                            onMouseEnter={onMouseEnterPublish}
                                            onMouseLeave={onMouseLeavePublish}
                                        >
                                            {chooseTrueFalse(formdata.publish.config.options, 'publish')}
                                        </ul>
                                    </div>


                                    :
                                    <FormField
                                        id={'publish'}
                                        formdata={formdata.publish}
                                        options={formdata.publish.config.options}
                                        change={searchFormPublish}
                                        myclass="inputbutton form-control"
                                    />
                            }
                        </div>
                    </div>
                    <hr />
                    {
                        editformdatastatus && props.postadditionaldata ?
                            <div className="row pb15 pt10">
                                <label className="col-md-2 col-xs-10 colFormLabel">Additional data</label>
                                <div className="col-md-10 col-xs-2">
                                    <div className="categoryButtonWrapper" style={{
                                        top: '3px'
                                    }}>
                                        <div
                                            className="categoryButton buttonColor"
                                            title=""
                                            onClick={() => AddAdditionalFunctionHandler()}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    {
                        editformdatastatus && props.postadditionaldata ?
                            showAdditionalInfo()
                            : null
                    }
                    {/* {
                        showInformation()
                    }
                    {
                        showButton()
                    } */}
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
                            {
                                editformdatastatus && props.postadditionaldata ?
                                    <div
                                        className="doubleButton"
                                        style={{
                                            marginRight: '20px'
                                        }}
                                    >
                                        <button
                                            onClick={editformdatastatus ? (event) => submitAdditionalData(event) : null}
                                            className="formsubmitButton formsubmitButtonShadow buttonColor"
                                        >
                                            Additional
                                        </button>
                                    </div>
                                    : null
                            }

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
            {
                addbrand &&
                <BackDrop click={backdropClickHandler} />
            }
            {
                addcategory &&
                <BackDrop click={backdropClickHandler} />
            }
            {
                addadditional &&
                <BackDrop click={additionalClickHandler} />
            }

            {/******************************************************************
            **************************** BRAND 
            ********************************************************************/}
            <div className={addbrand ? "rightSideOption open" : "rightSideOption"}>
                {
                    addbrand ?
                        addAdditionalData("Add Brand")
                        : null

                }
                {
                    addbrand ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: "5px"
                                    }}
                                >{formaddbrand.name.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'name'}
                                        formdata={formaddbrand.name}
                                        change={(element) => additionalUpdateFormBrand(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addbrand ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitAdditionalBrand(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Brand
                                        </button>
                                    </div>
                                </div>
                                {
                                    additionalformError ?
                                        <div className="errorAddCategory">
                                            {errorMessage}
                                        </div>
                                        : additionalformSuccess ?
                                            <div className="successAddCategory">
                                                ADD SUCCESS, PLEASE WAIT!
                                            </div>
                                            : null
                                }
                            </div>
                        </div>
                        : null
                }
            </div>
            {/******************************************************************
            **************************** CATEGORY 
            ********************************************************************/}
            <div className={addcategory ? "rightSideOption open" : "rightSideOption"}>
                {
                    addcategory ?
                        addAdditionalData("Add Category")
                        : null

                }
                {
                    addcategory ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: "5px"
                                    }}
                                >{formaddcategory.name.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faCubes}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'name'}
                                        formdata={formaddcategory.name}
                                        change={(element) => additionalUpdateFormCategory(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                }
                {
                    addcategory ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitAdditionalCategory(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Category
                                        </button>
                                    </div>
                                </div>
                                {
                                    additionalformError ?
                                        <div className="errorAddCategory">
                                            {errorMessage}
                                        </div>
                                        : additionalformSuccess ?
                                            <div className="successAddCategory">
                                                ADD SUCCESS, PLEASE WAIT!
                                            </div>
                                            : null
                                }
                            </div>
                        </div>
                        : null
                }
            </div>
            <div className={addadditional ? "rightSideOption open" : "rightSideOption"}>
                {
                    addadditional ?
                        addAdditionalData("Add Additional Information")
                        : null

                }
                {
                    addadditional ?
                        <div className="additionalformstyle pb20">
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: "5px"
                                    }}
                                >{formaddinfo.info.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faFont}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'info'}
                                        formdata={formaddinfo.info}
                                        change={(element) => additionalinfoUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: "5px"
                                    }}
                                >{formaddinfo.subinfo.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faAlignLeft}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'subinfo'}
                                        formdata={formaddinfo.subinfo}
                                        change={(element) => additionalinfoUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: "5px"
                                    }}
                                >{formaddinfo.link.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faShareSquare}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    <FormField
                                        id={'link'}
                                        formdata={formaddinfo.link}
                                        change={(element) => additionalinfoUpdateForm(element)}
                                        myclass={'form-control'}
                                    />
                                </div>
                            </div>
                            {/* <div className="row" style={{
                                padding: "0 15px 25px 15px"
                            }}>
                                <label
                                    className="col-md-12 col-xs-12 colFormLabel"
                                    style={{
                                        paddingBottom: 0
                                    }}
                                >{formaddinfo.type.title}</label>
                                <div className="col-md-12 col-xs-12">
                                    <div className="iconPosition">
                                        <FontAwesomeIcon
                                            icon={faSortAlphaDown}
                                            className="icon agraicon"
                                        />
                                    </div>
                                    {
                                        typesearchmode ?
                                            <div ref={wrapperRef}>
                                                <div
                                                    onBlur={typedontblur ? null : hideadditionaltypemenu}
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        disabled
                                                        autoCapitalize="none"
                                                        autoComplete="off"
                                                        autoCorrect="off"
                                                        className="tableSearch"
                                                        type="text"
                                                        name={formaddinfo.type.title}
                                                        placeholder={formaddinfo.type.title}
                                                        title={formaddinfo.type.config.placeholder}
                                                        value={formaddinfo.type.value}
                                                    // onChange={(event) => handleChange(event)}
                                                    // autoFocus={true}
                                                    />

                                                </div>
                                                <ul
                                                    className="dropdownmenu listgroup additionalmenudropdown"
                                                    onMouseEnter={onTypeMouseEnter}
                                                    onMouseLeave={onTypeMouseLeave}
                                                >
                                                    {showLinks(formaddinfo.type.config.options, 'type', selectedadditionalItem)}
                                                </ul>
                                            </div>
                                            :
                                            <FormField
                                                id={'type'}
                                                formdata={formaddinfo.type}
                                                options={formaddinfo.type.config.options}
                                                change={typeForm}
                                                myclass="inputbutton form-control"
                                            />
                                    }
                                </div>
                            </div> */}
                        </div>
                        : null
                }
                {
                    addadditional ?
                        <div className="additionalformstyle">
                            <div className="row" style={{
                                padding: "0 15px"
                            }}>
                                <div className="col-md-12">
                                    <div className="formSubmitButtonWithBack">
                                        <button
                                            onClick={(event) => submitAdditionalInfo(event)}
                                            className="formbackButton formsubmitButtonShadow buttonColor"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="icon agraicon w18px"
                                            />
                                            &nbsp;Additional Info
                                        </button>
                                    </div>
                                </div>
                                {
                                    additionalinfoError ?
                                        <div className="errorAddCategory">
                                            {errorMessage}
                                        </div>
                                        : additionalinfoSuccess ?
                                            <div className="successAddCategory">
                                                ADD SUCCESS, PLEASE WAIT!
                                            </div>
                                            : null
                                }
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>
    );
};

export default ProductTableScreen;