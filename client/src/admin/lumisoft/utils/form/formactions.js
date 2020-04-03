export const validate = (element, formdata = []) => {
    let error = [true, ''];

    if (element.validation.email) {
        //eslint-disable-next-line
        const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = expression.test(String(element.value).toLowerCase());
        const message = `${!valid ? 'Enter valid email' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.version) {
        //eslint-disable-next-line
        const expression = /^([0-9]{1,1}).([0-9]{1,1}).([0-9]{1,1})$/;
        const valid = expression.test(String(element.value).toLowerCase());
        const message = `${!valid ? 'Enter valid version' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.phone) {
        const expression = /^(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+$/;
        const valid = expression.test(String(element.value).toLowerCase());
        const message = `${!valid ? 'Enter valid phone number' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.price) {
        const expression = /^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/;
        const valid = expression.test(String(element.value).toLowerCase());
        const message = `${!valid ? 'Enter valid price' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.number) {
        const expression = /^[0-9]*$/;
        const valid = expression.test(String(element.value).toLowerCase());
        const message = `${!valid ? 'Enter number only' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.strong) {
        const expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,30}$/;
        const valid = expression.test(element.value);
        const message = `${!valid ? '1 uppercase, 1 number and min 6 letters' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Password not match' : ''}`
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        if (Array.isArray(element.value)) {
            const valid = element.value.length > 0;
            const message = `${!valid ? 'This field is required' : ''}`
            error = !valid ? [valid, message] : error;
        } else {
            const valid = element.value.trim() !== ''
            const message = `${!valid ? 'This field is required' : ''}`
            error = !valid ? [valid, message] : error;
        }

    }

    return error;
}

//==================================================================
// USED BY :
// 1. LOGIN
// 2. PRODUCT FORM
// 3. PROFILE FORM
// 4. PROFILE ADDRESS FORM
// 5. CHECKOUT FORM
// 6. ADDRESS FORM
// 7. INVOICE FORM
// 8. INVOICE FORM EDIT
// 9. CUSTOMER FORM
// 10. CUSTOMER FORM EDIT
// 11. REKENING FORM
// 12. TERM FORM
// 13. DRIVER FORM
// 14. VEHICLE FORM
//==================================================================
export const update = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;
    // console.log(element, "testest")
    // if(element.blur){
    //     let validData = validate(newElement, formdata);
    //     newElement.valid = validData[0];
    //     newElement.validationMessage = validData[1];

    // }
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    // newElement.touched = element.blur;
    newElement.touched = true;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

//==================================================================
// USED BY :
// 1. LOGIN
// 2. PRODUCT FORM
// 3. PROFILE FORM
// 4. PROFILE ADDRESS FORM
// 5. CHECKOUT FORM
// 6. ADDRESS FORM
// 7. INVOICE FORM
// 8. CUSTOMER FORM
// 9. CUSTOMER FORM EDIT
// 10. REKENING FORM
// 11. TERM FORM
// 12. DELIVERY FORM
// 13. DELIVERY FORM EDIT
// 14. VEHICLE FORM
//==================================================================
export const generateData = (formdata, formName) => {
    let dataToSubmit = {};

    if (
        formName === 'addinvoice' ||
        formName === 'delivery' ||
        formName === 'editdelivery' ||
        formName === 'customer' ||
        formName === 'editcustomer' ||
        formName === 'rekening' ||
        formName === 'termofpayments' ||
        formName === 'driver' ||
        formName === 'vehicle' ||
        formName === 'deliverynumber'
    ) {
        for (let key in formdata) {
            if (key !== '_id') {
                dataToSubmit[key] = formdata[key].value;
            }
        }
    } else if (formName === 'revisiquotation') {
        for (let key in formdata) {
            if (key !== '_id') {
                if (key !== 'title') {
                    if (key !== 'picname') {
                        if (key !== 'picphone') {
                            if (key !== 'picphone') {
                                if (key !== 'customer') {
                                    dataToSubmit[key] = formdata[key].value;
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        for (let key in formdata) {
            if (key !== 'confirmPassword') {
                dataToSubmit[key] = formdata[key].value;
            }
        }
    }


    return dataToSubmit;
}

//==================================================================
// USED BY :
// 1. LOGIN
// 2. PRODUCT FORM
// 3. PROFILE FORM
// 4. PROFILE ADDRESS FORM
// 5. CHECKOUT FORM
// 6. ADDRESS FORM
// 7. INVOICE FORM
// 8. INVOICE FORM EDIT
// 9. CUSTOMER FORM
// 10. CUSTOMER FORM EDIT
// 11. REKENING FORM
// 12. TERM FORM
// 13. DELIVERY FORM
// 14. DELIVERY FORM EDIT
// 15. DRIVER FORM
// 16. VEHICLE FORM
//==================================================================
export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for (let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid;
    }

    return formIsValid;
}

//==================================================================
// USED BY :
// 1. PRODUCT FORM
// 2. CUSTOMER FORM
// 3. CUSTOMER FORM EDIT
// 4. DRIVER FORM
// 5. VEHICLE FORM
// 6. CHECKOUT FORM
//==================================================================
export const resetFields = (formdata, formName) => {
    const newFormdata = { ...formdata };

    for (let key in newFormdata) {
        if (key !== '_id') {
            if (key !== 'address2') {
                if (key === 'images') {
                    newFormdata[key].value = [];
                    newFormdata[key].valid = true;
                } else {
                    newFormdata[key].value = '';
                    newFormdata[key].valid = false;
                }
                newFormdata[key].touched = false;
                newFormdata[key].validationMessage = '';
            }
        }
    }

    return newFormdata;
}

//==================================================================
// USED BY :
// 1. INVOICE FORM
// 2. INVOICE FORM EDIT
// 3. DELIVERY FORM
// 4. DELIVERY FORM EDIT
//==================================================================
export const resetAdditional = (formdata, formName) => {
    const newFormdata = { ...formdata };

    if (formName === 'product') {
        for (let key in newFormdata) {
            newFormdata[key].value = 'Choose Product';
            newFormdata[key].valid = false;
            newFormdata[key].touched = false;
            newFormdata[key].validationMessage = '';
        }
    } else {
        for (let key in newFormdata) {
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].touched = false;
            newFormdata[key].validationMessage = '';
        }
    }

    return newFormdata;
}

//==================================================================
// USED BY :
// 1. INVOICE FORM
// 2. INVOICE FORM EDIT
// 3. DELIVERY FORM
// 4. DELIVERY FORM EDIT
//==================================================================
export const resetProducts = (formdata, formName) => {
    const newFormdata = { ...formdata };
    if (formName === 'products') {
        newFormdata[formName].value = [];
        newFormdata[formName].valid = false;
        newFormdata[formName].touched = false;
        newFormdata[formName].validationMessage = '';
    }
    return newFormdata;
}

export const resetAdditionalOptions = (formdata, formName) => {
    const newFormdata = { ...formdata };


    newFormdata[formName].config.options = [];
    newFormdata[formName].value = '';
    newFormdata[formName].valid = false;
    newFormdata[formName].touched = false;
    newFormdata[formName].validationMessage = '';


    return newFormdata;
}

//==================================================================
// USED BY :
// 1. PRODUCT FORM
//==================================================================
export const resetAddressFields = (formdata, formName) => {
    const newFormdata = { ...formdata };

    for (let key in newFormdata) {
        if (key === 'company' || key === 'country' || key === 'address2' || key === 'statedivition') {
            newFormdata[key].value = "";
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else {
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }
    }

    return newFormdata;
}

//==================================================================
// USED BY :
// 1. INVOICE FORM
// 2. INVOICE FORM EDIT
//==================================================================
export const formAddProduct = (formdata, formName) => {
    let dataToSubmit = {};

    dataToSubmit = formdata;

    return dataToSubmit;
}

//==================================================================
// USED BY :
// 1. PRODUCT FORM
// 2. INVOICE FORM
// 3. CUSTOMER FORM
// 4. CUSTOMER FORM EDIT
// 5. DELIVERY FORM
// 6. DELIVERY FORM EDIT
//==================================================================
export const populateOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    const newFormdata = { ...formdata };

    if (field === 'upline') {
        arrayData.forEach(item => {
            if (item.isConfirm !== false) {
                newArray.push({ key: item._id, name: `${item.name} (${item.code}_${item.role.name})` });
            }
        });
    } else if (field === 'products') {
        arrayData.forEach(item => {
            newArray.push({ _id: item._id, name: `${item.productId} (${item.categories})`, price: item.price, categories: `${item.categories}`, quantity: item.quantity });
        });
        // newArray.sort((a, b) => b.name - a.name);
    } else {
        arrayData.forEach(item => {
            newArray.push({ key: item._id, name: item.name });
        });
    }

    newFormdata[field].config.options = newArray;
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. CHECKOUT FORM
//==================================================================
export const provinceCheckoutOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    let newFormdata = { ...formdata };

    arrayData.forEach(item => {
        newArray.push({ key: item.province_id, name: item.province });
    });

    newFormdata[field].config.options = newArray;
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. PROFILE FORM
//==================================================================
export const cityCheckoutOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    let newFormdata = { ...formdata };

    arrayData.forEach(item => {
        newArray.push({
            key: item.city_id,
            name: item.city_name,
            provinceid: item.province_id,
            provincename: item.province,
            type: item.type,
            postalcode: item.postal_code
        });
    });

    newFormdata[field].config.options = newArray;
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. PROFILE FORM
//==================================================================
export const subdistrictCheckoutOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    let newFormdata = { ...formdata };

    arrayData.forEach(item => {
        newArray.push({
            key: item.subdistrict_id,
            name: item.subdistrict_name
        });
    });

    newFormdata[field].config.options = newArray;
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. CHECKOUT FORM
//==================================================================
export const courierCheckoutOptionFields = (additional, arrayData = [], field) => {
    const newArray = [];
    let newAdditional = { ...additional };

    arrayData.forEach(item => {
        newArray.push({
            name: item.service,
            description: item.description,
            costs: item.cost
        });
    });

    newAdditional[field].config.options = newArray;
    return newAdditional;
}

//==================================================================
// USED BY :
// 1. PROFILE FORM
//==================================================================
export const provinceOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    let newFormdata = { ...formdata };

    arrayData.forEach(item => {
        newArray.push({ key: item.province_id, name: item.province });
    });

    newFormdata = newArray;
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. PROFILE FORM
//==================================================================
export const cityOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    let newFormdata = { ...formdata };

    arrayData.forEach(item => {
        newArray.push({
            key: item.city_id,
            name: item.city_name,
            provinceid: item.province_id,
            provincename: item.province,
            type: item.type,
            postalcode: item.postal_code
        });
    });

    newFormdata = newArray;
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. PROFILE FORM
//==================================================================
export const subdistrictOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    let newFormdata = { ...formdata };

    arrayData.forEach(item => {
        newArray.push({
            key: item.subdistrict_id,
            name: item.subdistrict_name
        });
    });

    newFormdata = newArray;
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. PRODUCT FORM
// 2. CARD
// 3. CART TABLE
// 4. CHECKOUT FORM
// 5. INVOICE TABLE
// 6. INVOICE FORM
//==================================================================
export const convertToRupiah = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.toString().length; i++) if (i % 3 === 0) rupiah += angkarev.toString().substr(i, 3) + ',';
    return rupiah.split('', rupiah.length - 1).reverse().join('');
}

//==================================================================
// USED BY :
// 1. PROFILE FORM
// 2. PROFILE ADDRESS FORM
// 3. CHECKOUT FORM
// 4. INVOICE FORM
// 5. INVOICE FORM EDIT
// 6. REKENING FORM
// 7. TERM FORM
// 8. DRIVER FORM
// 9. VEHICLE FORM
//==================================================================
export const populateFields = (formdata, fields, formName) => {
    const newFormdata = { ...formdata };

    if (formName === 'datedelivery') {
        for (let key in newFormdata) {
            if (key === 'datedelivery') {
                newFormdata[key].value = fields;
                newFormdata[key].valid = true;
                newFormdata[key].touched = true;
                newFormdata[key].validationMessage = '';
            }
        }
    } else {
        for (let key in formdata) {
            newFormdata[key].value = fields[key];
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }
    }


    return newFormdata;
}

//==================================================================
// USED BY :
// 1. CHECKOUT FORM
//==================================================================

export const updatecheckbox = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    const target = element.event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    newElement.value = value;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

//==================================================================
// USED BY :
// 1. INVOICE FORM EDIT (Sudah digantikan)
//==================================================================
// export const invoiceEditFormAdd = (formdata, selected, customer, termofpayment, rekening) => {
//     const newFormdata = { ...formdata };

//     for (let key in newFormdata) {
//         if (key === customer) {
//             newFormdata[key].value = selected.customer;
//             newFormdata[key].valid = true;
//             newFormdata[key].touched = true;
//             newFormdata[key].validationMessage = '';
//         }
//         if (key === termofpayment) {
//             newFormdata[key].value = selected.termofpayment;
//             newFormdata[key].valid = true;
//             newFormdata[key].touched = true;
//             newFormdata[key].validationMessage = '';
//         }
//         if (key === rekening) {
//             newFormdata[key].value = selected.rekening;
//             newFormdata[key].valid = true;
//             newFormdata[key].touched = true;
//             newFormdata[key].validationMessage = '';
//         }
//     }
//     return newFormdata;
// }

//==================================================================
// USED BY :
// 1. CUSTOMER FORM EDIT
//==================================================================
export const editFormAdd = (formdata, selected, formName = []) => {
    const newFormdata = { ...formdata };
    for (let key in newFormdata) {
        if (formName === "quotationProducts" && key === 'products') {
            if (selected.process) {
                newFormdata[key].value = [];
                newFormdata[key].valid = false;
                newFormdata[key].touched = false;
                newFormdata[key].validationMessage = '';
            } else {
                newFormdata[key].value = selected[key];
                newFormdata[key].valid = true;
                newFormdata[key].touched = true;
                newFormdata[key].validationMessage = '';
            }
        } else if (formName === "quotationProducts" && key === 'customer') {
            let customerdata = {
                _id: selected.customer._id,
                name: selected.customer.name,
                address: selected.customer.address,
                details: selected.customer.details,
                province: selected.customer.province,
                city: selected.customer.city,
                subdistrict: selected.customer.subdistrict,
                postcode: selected.customer.postcode,
                email: selected.customer.email,
                phone: selected.customer.phone,
                customerid: selected.customer.customerid,
                provincename: selected.customer.provincename,
                cityname: selected.customer.cityname,
                subdistrictname: selected.customer.subdistrictname,
            };
            newFormdata[key].value = customerdata;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (formName === "quotationProducts" && key === 'termofpayment') {
            if (selected.process) {
                newFormdata[key].value = '';
                newFormdata[key].valid = false;
                newFormdata[key].touched = false;
                newFormdata[key].validationMessage = '';
            } else {
                let termdata = {
                    _id: selected.termofpayment._id,
                    name: selected.termofpayment.name
                };
                newFormdata[key].value = termdata;
                newFormdata[key].valid = true;
                newFormdata[key].touched = true;
                newFormdata[key].validationMessage = '';
            }

        } else if (formName === "quotationProducts" && key === 'date') {
            if (selected.process) {
                newFormdata[key].value = '';
                newFormdata[key].valid = false;
                newFormdata[key].touched = false;
                newFormdata[key].validationMessage = '';
            } else {
                newFormdata[key].value = selected[key];
                newFormdata[key].valid = true;
                newFormdata[key].touched = true;
                newFormdata[key].validationMessage = '';
            }

        } else if (typeof selected[key] === 'object') {
            newFormdata[key].value = selected[key]._id;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'password' || key === 'confirmPassword') {
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].touched = false;
            newFormdata[key].validationMessage = '';
        } else {
            newFormdata[key].value = selected[key];
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }
    }
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. DELIVERY FORM EDIT
//==================================================================
export const deliveryEditFormAdd = (formdata, selected, numbername, customer, driver, carnumber) => {
    const newFormdata = { ...formdata };

    for (let key in newFormdata) {
        if (key === numbername) {
            newFormdata[key].value = selected.numbername;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }
        if (key === customer) {
            newFormdata[key].value = selected.customer;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }
        if (key === driver) {
            newFormdata[key].value = selected.driver;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }
        if (key === carnumber) {
            newFormdata[key].value = selected.carnumber;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }
    }
    return newFormdata;
}

//==================================================================
// USED BY :
// 1. EDIT PRODUCT FORM
//==================================================================
export const productEditFormAdd = (formdata, selected) => {
    const newFormdata = { ...formdata };

    for (let key in newFormdata) {
        if (key === 'category') {
            newFormdata[key].value = selected.category._id;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'color') {
            newFormdata[key].value = selected.color._id;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'brand') {
            newFormdata[key].value = selected.brand._id;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'sku') {
            newFormdata[key].value = selected.sku;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'name') {
            newFormdata[key].value = selected.name;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'description') {
            newFormdata[key].value = selected.description;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'price') {
            newFormdata[key].value = selected.price;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'shipping') {
            newFormdata[key].value = selected.shipping;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'available') {
            newFormdata[key].value = selected.available;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'publish') {
            newFormdata[key].value = selected.publish;
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        } else if (key === 'images') {
            newFormdata[key].valid = true;
            newFormdata[key].touched = true;
            newFormdata[key].validationMessage = '';
        }

    }
    return newFormdata;
}