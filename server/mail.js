
const verificationCodes={};
const nodemailer=require('nodemailer');
async function sendEmail(receiverEmail, subject, variableValue) {
    try{
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"mdabbah670@gmail.com",
                pass:"efoa vwzc hrma vetg"
            }
        });
        
        const mailOptions={
            from:"mdabbah670@gmail.com",
            to:receiverEmail,
            subject:subject,
            html:variableValue
        };
        transporter.sendMail(mailOptions,function(err,info){
            if(err){
                console.log(err);
            }else{
                console.log("email send "+info.response);
            }
        })
    }catch(err){
        console.log(err);
    }

}

function generateFourDigitCode() {
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



module.exports={
    generateFourDigitCode,
    sendEmail,
    verificationCodes
}