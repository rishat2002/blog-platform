import React from "react";

class InputErrors {

    servErrorMessage = (message) => {
        if (message === undefined) {
            return null;
        }
        if (Array.isArray(message)) {
            let formatMess = message[0]
            formatMess = formatMess.charAt(0).toUpperCase() + formatMess.slice(1);
            return <div className="error form__error">{formatMess}</div>;
        }
        const formatMess = message[0].charAt(0).toUpperCase() + message.slice(1);
        return <div className="error form__error">{formatMess}</div>;
    };

    inputValueError = (errorName,message,useFormError) =>
        useFormError[errorName] && <div className="error form__error">{message}</div>

}

export default InputErrors