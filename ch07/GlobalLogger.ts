class GlobalLogger {
    public static logGlobalsToConsole() {
        for (let email of CONTACT_EMAIL_ARRAY) {
            console.log(`found contact : ${email}`);
        }
    }
}

window.onload = () => {
    GlobalLogger.logGlobalsToConsole();
}

//
// Module declarations
//

var failureMessage = {
    responseText: {
        "failure": true,
        "errorMessage": "Message From failureMessage"
    }
};

if (ErrorHelper.containsErrors(failureMessage))
    ErrorHelper.trace(failureMessage);

var failureMessageString = {
    responseText: {
        "failure": "true",
        "errorMessage": "Message from failureMessageString"
    }
};

if (ErrorHelper.containsErrors(failureMessageString))
    ErrorHelper.trace(failureMessageString);

var successMessage = {
    responseText: {
        "failure": false
    }
};

if (!ErrorHelper.containsErrors(successMessage))
    ErrorHelper.trace("success");

