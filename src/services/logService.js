import * as Sentry from '@sentry/browser';

function init(){
    //initalize sentry for error logging
    Sentry.init({dsn: "https://7936c98d0f7048ab99b3ea3201d8b55c@sentry.io/1473058"});
}

function log(error){
    Sentry.captureException(error);
}

export default{
    init : init,
    log: log
}