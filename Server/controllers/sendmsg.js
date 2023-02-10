const accountid = process.env.TWILIO_ACCOUNT_SID;

const authtoken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountid, authtoken);

exports.sendmsg = async (req, res) => {
  try {
    let twilioNum = process.env.TWILIO_PHONE_NUMBER;

    const phone = req.body.phone;

    const text = req.body.text;

    await client.messages.create({
      body: text,
      from: twilioNum,
      to: phone
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured while sending the message",
      error: `${error.name}, ${error.message}, ${error.stack}`
    });
  }
};

// const fast2sms = require("fast-two-sms");
// const { getResponsesTag } = require("swagger-autogen/src/swagger-tags");

// exports.sendmsg = async (req, res) => {
//   try {
//     const phone = req.body.phone;

//     var options = {
//       authorization: process.env.FAST2SMS_AUTH,
//       message: "Testing Message",
//       numbers: [phone]
//     };

//     fast2sms
//       .sendMessage(options)
//       .then((response) => {
//         console.log(response);
//         res.status(200).json({ message: "Message Sent Successfully" });
//       })
//       .catch((err) => {
//         res.status(500).json({
//           message: "Some error occured while sending the message"
//         });
//       });
//   } catch (error) {
//     res.status(500).json({
//       message: "Some error occured while sending the message",
//       error: `${error.name}, ${error.message}, ${error.stack}`
//     });
//   }
// };
