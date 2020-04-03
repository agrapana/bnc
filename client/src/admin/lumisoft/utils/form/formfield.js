import React from 'react';

const Formfield = ({ formdata, change, id, myclass, selectedOption, options }) => {
    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className="errorLabel">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value || ''}
                            // onBlur={(event) => change({ event, id, blur: true })}
                            // onKeyUp={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                            className={myclass}
                        />
                        {showError()}
                    </div>
                )
                break;
            case ('select'):
                formTemplate = (
                    <div className="formBlock">
                        <div
                            id={id}
                            onClick={() => change(options, id)}
                            className={myclass}
                        >
                            {
                                formdata.selectedValue ? formdata.selectedValue : formdata.config.placeholder
                            }
                        </div>
                        {showError()}
                    </div>
                )
                break;
            case ('checkbox'):
                formTemplate = (
                    <div className="customControl customCheckbox">
                        <input
                            {...formdata.config}
                            name={id}
                            checked={formdata.value}
                            onChange={(event) => change({ event, id })}
                            className={myclass}
                        />
                        <svg className="check" width="13" height="13" viewBox="0 0 24 24">
                            <path fill="#ffffff" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                        </svg>
                        <label className="customControlLabel">
                            <span>{formdata.label}</span>
                        </label>

                    </div>
                )
                break;
            case ('radio'):
                formTemplate = (
                    <div className="customControl customRadio">
                        <input
                            {...formdata.config}
                            checked={selectedOption === formdata.value}
                            onChange={(event) => change(event)}
                            className={myclass}
                            value={formdata.value}
                        />
                        <svg className="check" width="7" height="7" viewBox="0 0 7 7">
                            <circle className="radioDot" cx="3.5" cy="3.5" r="3.5" fill="#fff" />
                        </svg>
                        <label className="customControlLabel">
                            <span>{formdata.label}</span>
                        </label>

                    </div>

                )
                break;

            case ('textarea'):
                formTemplate = (
                    <div className="formBlock">
                        <textarea
                            {...formdata.config}
                            value={formdata.value}
                            // onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                            className={myclass}
                        />
                        {showError()}
                    </div>
                )
                break;
            case ('inputname'):
                formTemplate = (
                    <div className="formBlock">
                        <input
                            {...formdata.config}
                            value={formdata.value[0] ? formdata.value[0].name : ''}
                            // onBlur={(event) => change({ event, id, blur: true })}
                            // onKeyUp={(event) => change({ event, id, blur: true })}
                            // onChange={(event) => change({ event, id })}
                            className={myclass}
                            disabled={true}
                        />
                        {showError()}
                    </div>
                )
                break;
            default:
                return formTemplate = null;
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default Formfield;