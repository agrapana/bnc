import React from 'react';
import { Link } from 'react-router-dom';

const MyButton = (props) => {

    const buttons = () => {
        let template = '';

        switch (props.name) {
            case "login":
                template = 
                    <button 
                        className={props.classname} 
                        type={props.type}
                    >
                        {props.title}
                    </button>
                break;
            case "default":
                template = <Link
                    className="linkDefault"
                    type={props.type}
                    to={props.linkTo}
                    style={props.addStyles}
                >
                    {props.title}
                </Link>
                break;
            case "button":
                template = <Link
                    className="agrapanaBtn agrapanaBtnPrimary lh3"
                    type={props.type}
                    to={props.linkTo}
                    style={props.addStyles}
                >
                    {props.title}
                </Link>
                break;
            case "newbutton":
                template =
                    <button 
                        className={props.classname} 
                        type={props.type}
                        onClick={() => {
                            props.runAction();
                        }}
                    >
                        {props.title}
                    </button>
                break;
            case "disabled":
                template =
                    <button 
                        className={props.classname} 
                        type={props.type}
                        disabled
                    >
                        {props.title}
                    </button>
                break;
            case "eventbutton":
                template =
                    <button 
                        className={props.classname} 
                        type={props.type}
                        onClick={(event) => props.runAction(event)}
                    >
                        {props.title}
                    </button>
                break;
            default:
                template = '';
        }
        return template;
    }

    return (
        <div className="myButton">
            {buttons()}
        </div>
    );
};

export default MyButton;