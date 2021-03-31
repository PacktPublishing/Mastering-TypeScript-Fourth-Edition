var failureMessage = {
    responseText: {
        "failure": true,
        "errorMessage": "Message From failureMessage"
    }
}

if (ErrorHelper.containsErrors(failureMessage))
    ErrorHelper.trace(failureMessage);

var failureMessageString = {
    responseText: {
        "failure": "true",
        "errorMessage": "Message from failureMessageString"
    }
}

if (ErrorHelper.containsErrors(failureMessageString))
    ErrorHelper.trace(failureMessageString);

var successMessage = {
    responseText: {
        "failure": false
    }
}

if (!ErrorHelper.containsErrors(successMessage))
    ErrorHelper.trace("success"); 