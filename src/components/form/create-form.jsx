import React from "react";
import {Redirect} from "react-router";

class CreateForm {
    createInputHandlers = (inputValueState,setInputValueState,resetServErrorFunc) => {
        const handlers = {}
        Object.keys({...inputValueState}).map(item => {
                handlers[item] = (event) => {
                    setInputValueState({...inputValueState, [item]: event.target.value});
                    resetServErrorFunc(item)
                }
                return null
            }
        )
        return handlers
    }

    getRedirectComponent = (condition,url) =>
         condition ? <Redirect to={url}/> : null

}

export default CreateForm

