'use strict';
// Twilio Credentials 
var accountSid = 'Place your Twilio Account SID';
var authToken = 'Place Your Auth Token';
var fromNumber = 'Place Your Number Registered on Twillio';
const twilioA = require('twilio')(accountSid, authToken);

module.exports.postprocess = (event,context,callback) => {
 console.log('Running event');
     // Send an SMS message to the number provided in the event data.
    // End the lambda function when the send function completes.
    SendSMS('+17789534545', 'Photo Successfully Uploaded', 
                function (status) { context.done(null, status); });  

  // event.Records.forEach((record) => {
  //   const filename = record.s3.object.key;
  //   const filesize = record.s3.object.size;
  //   console.log(`New .png object has been created: ${filename} (${filesize} bytes)`);
  // });
};

function SendSMS(to, body, completedCallback) {
    
    // The SMS message to send
    var message = {
        To: to, 
        From: fromNumber,
        Body: body,
    };
    var messageString = "Message Sent"
    
    twilioA.messages.create(message, (err, data) => {
    if (err) {
      const errRes = {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: err.status,
        body: JSON.stringify({
          message: err.message,
          error: err
        }),
      };
      return completedCallback(null, errRes);
    }
  });
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Sent message!',
        data: data
      }),
    };

    callback(null, response);
};
