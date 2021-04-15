var ErrorHelper = (function () {
    return {
        containsErrors: function (response) {
            if (!response || !response.responseText)
                return false;

            var errorValue = response.responseText;

            if (String(errorValue.failure) === "true"
                || Boolean(errorValue.failure)) {
                return true;
            }
            return false;
        },
        trace: function (msg) {
            var traceMessage = msg;
            if (msg.responseText) {
                traceMessage = msg.responseText.errorMessage;
            }
            console.log("[" + new Date().toLocaleTimeString()
                + "] " + traceMessage);
        }
    }
})();

var failureMessage = {
    responseText: {
        "failure": true,
        "errorMessage": "Message From failureMessage"
    }
};

var failureMessageString = {
    responseText: {
        "failure": "true",
        "errorMessage": "Message from failureMessageString"
    }
};

var successMessage = {
    responseText: {
        "failure": false
    }
};

if (ErrorHelper.containsErrors(failureMessage))
    ErrorHelper.trace(failureMessage);

if (ErrorHelper.containsErrors(failureMessageString))
    ErrorHelper.trace(failureMessageString);

if (!ErrorHelper.containsErrors(successMessage))
    ErrorHelper.trace("success");


