const express = require('express');
const router = express.Router();
const Workflows = require('node-workflows');





// Workflows.start(function (ctx) {
//     // ACTION #0
//     console.log('Entering ACTION #0...');

//     // will be available in
//     // 'previousValue' property
//     // of the next action
//     ctx.nextValue = 'MK';

//     // result of the workflow
//     ctx.result = 23979;
// }, function (ctx) {
//     // ACTION #1
//     console.log('Entering ACTION #1...');

//     // run "async"
//     return new Promise(function (resolve, reject) {
//         try {
//             // ctx.previousValue == 'MK'
//             // ctx.result == 23979

//             setTimeout(function () {
//                 // a value for the execution
//                 ctx.value = 19861222;

//                 resolve('TM');  // will be available in
//                 // 'previousValue' property
//                 // of the next action
//             }, 5000);
//         }
//         catch (e) {
//             reject(e);
//         }
//     });
// }, {
//     // ACTION #2

//     // use an object
//     // with an 'execute()' method
//     // instead a function
//     execute: function (ctx) {
//         console.log('Entering ACTION #2...');

//         // ctx.previousValue == 'TM'
//         // ctx.result == 23979

//         // ctx.value == 19861222 (at first time)
//         // ctx.value == 1781 (at 2nd time)

//         ctx.result = 5979;  // set a result value
//         // for the workflow
//     }
// }, function (ctx) {
//     // ACTION #3
//     console.log('Entering ACTION #3...');

//     // ctx.previousValue == undefined
//     // ctx.result == 5979

//     if (1781 !== ctx.value) {
//         // ctx.value == 19861222

//         ctx.value = 1781;

//         // mark 'ACTION #2'
//         // as next action
//         ctx.goto(2);
//     }
// }).then(function (result) {
//     // finished with SUCCESS

//     console.log('SUCCESS: ' + result);  // 5979
//     // s. ctx.result
// }).catch(function (err) {
//     // finished with ERROR

//     console.log('ERROR: ' + err);
// });


let attached = false
let approvalHOD = true
let approvalFD = true
let reimburstment = false
let approvalPaymentTeam = false
let paymentInitiated = false




//Jump / skip
var workflow = Workflows.create(function (ctx) {
    // ACTION #0
    console.log("Attach your expense report")
    // skip one action ('ACTION #1') 

    if (!attached) {
        attached = true;
        ctx.repeat();
    }
    else {
        ctx.goto(1);  // goto 'ACTION #1'
    }

    // ctx.skip(1);  // alternate: ctx.skip()

}, function (ctx) {
    // ACTION #1
    console.log("Submit to HOD")
    // mark 'ACTION #0'
    // as next ...
    if (approvalHOD) {
        ctx.gotoNext()
        console.log("Approved by Head of the department")
    } else {
        console.log("Update the report and try again -HOD")
        // ctx.gotoFirst();
        ctx.finish();

    }




    // ... but directly skip
    // #0 to #2
    // ctx.skipWhile = function (ctxToCheck) {
    //     return ctxToCheck.index < 3;
    // };
}, function (ctx) {
    // ACTION #2

    console.log("Submitted to Financial Depertment")
    if (approvalFD) {
        console.log("Approved by FD, BINGO")
        // ctx.value = true;
        ctx.gotoNext()
        // ctx.repeat();
    }
    else {
        console.log("Request Change / Clarification -FD")
        ctx.finish();
        // ctx.goto(0);  // goto 'ACTION #1'
    }
}, function (ctx) {
    // ACTION #3
    if (!reimburstment) {
        ctx.gotoLast();  // goto last action ('ACTION #6')
        

    } else {
        console.log("Report passed on to Payment team")
    }

}, function (ctx) {
    // ACTION #4

    if (approvalPaymentTeam) {
        ctx.gotoNext()
    } else {
        console.log("Yet to be initiated")
        ctx.finish();
    }

    // ctx.value = 'PZ';

    // if we would reach here
    // we could finish
    // the execution by calling...

}, function (ctx) {
    // ACTION #5
    console.log("Payment initialted")
    ctx.finish();
    // if we would reach here
    // we could jump to a previous
    // action by calling...
    // ctx.goBack();  // goto to 'ACTION #4'
    // ctx.goBack(2);  // goto to 'ACTION #3'
}, function (ctx) {
    // ACTION #6
    console.log("Payment initialted with no reimburstment")
    ctx.finish();
    // ctx.value == undefined (because we never reached 'ACTION #4')
});

workflow.on('action.before', function (ctx) {
    console.log('ACTION #' + ctx.index);

    ctx.result = ctx.index;
});

workflow.start().then(function (result) {
    // success

    // result == 6
}).catch(function (err) {
    // ERROR!!!
});





// another workflow


// Workflows.start(function (ctx) {
//     // ACTION #0
//     console.log('ACTION #0...Creating Purchase Requisition ');

//     // will be available in
//     // 'previousValue' property
//     // of the next action
//     ctx.nextValue = 'PR was created';

//     // result of the workflow
//     ctx.result = 'PR Created';
// }, function (ctx) {
//     // ACTION #1
//     console.log('ACTION #1...Approval: Manager');
//     // ctx.finish();
//     // run "async"
//     return new Promise(function (resolve, reject) {
//         try {
//             // ctx.previousValue == 'MK'
//             // ctx.result == 23979

//             setTimeout(function () {
//                 // a value for the execution
//                 ctx.value = 19861222;

//                 resolve('Approved by Manager');  // will be available in
//                 // 'previousValue' property
//                 // of the next action
//             }, 5000);
//         }
//         catch (e) {
//             reject(e);
//         }
//     });
// },function (ctx) {
//     // ACTION #2
//     console.log(ctx.previousValue)

//     console.log('ACTION #2...Approval: Financial Team');
//     // ctx.finish();
//     // run "async"
//     return new Promise(function (resolve, reject) {
//         try {
//             // ctx.previousValue == 'MK'
//             // ctx.result == 23979

//             setTimeout(function () {
//                 // a value for the execution
//                 ctx.value = 19861222;

//                 resolve('Approved by Fianancial Team');  // will be available in
//                 // 'previousValue' property
//                 // of the next action
//             }, 5000);
//         }
//         catch (e) {
//             reject(e);
//         }
//     });
// }, {
//     // ACTION #2

//     // use an object
//     // with an 'execute()' method
//     // instead a function
//     execute: function (ctx) {
//         console.log(ctx.previousValue)

//         console.log('ACTION #3...Create: Purchase Order');
//         // console.log(ctx.result)
//         // ctx.value == 'Purchase Order Created'
//         // ctx.previousValue == 'TM'
//         // ctx.result == 23979

//         // ctx.value == 19861222 (at first time)
//         // ctx.value == 1781 (at 2nd time)

//         ctx.result = 'Purchase Order Created';  // set a result value
//         // for the workflow
//     }
// }, function (ctx) {
//     // ACTION #3
//     console.log(ctx.result)

//     console.log('ACTION #4...Inform Suppliers once ready');

//     // ctx.previousValue == undefined
//     // ctx.result == 5979
//     ctx.result == 'Suppliers Updated'
//     if ('Purchase Order Created' !== ctx.result) {
//         // ctx.value == 19861222

//         ctx.value = 1781;

//         // mark 'ACTION #2'
//         // as next action
//         ctx.goto(2);
//     } else {
//         ctx.result == 'Suppliers Updated'
//     }
// }, function (ctx) {
//     // ACTION #3
//     console.log(ctx.result)

//     console.log('ACTION #5...Approval: Suppliers');

//     return new Promise(function (resolve, reject) {
//         try {
//             // ctx.previousValue == 'MK'
//            ctx.result == 'Approved by Suppliers'

//             setTimeout(function () {
//                 // a value for the execution
//                 ctx.value = 19861222;
//                 ctx.result == 'Suppliers Approved'
//                 resolve('Suppliers Approved');  // will be available in
//                 // 'previousValue' property
//                 // of the next action
//             }, 5000);
//         }
//         catch (e) {
//             reject(e);
//         }
//     });
// }).then(function (result) {
//     console.log(result)

//     // finished with SUCCESS

//     console.log('SUCCESS: ' + result);  // 5979
//     // s. ctx.result
// }).catch(function (err) {
//     // finished with ERROR

//     console.log('ERROR: ' + err);
// });






module.exports = router;