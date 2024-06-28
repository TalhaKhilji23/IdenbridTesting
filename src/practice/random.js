/* Amplify Params - DO NOT EDIT
 ENV
 SES_EMAIL
Amplify Params - DO NOT EDIT */

const { SES } = require('aws-sdk')
const ses = new SES()

const sendEmail = async (emailData) => {
  let emailParams = {
    Destination: {
      ToAddresses: [emailData.to],
    },
    Message: {
      Body: {
        Text: {
          Data: emailData.body,
        },
      },
      Subject: {
        Data: emailData.subject,
      },
    },
    Source: emailData.from,
  }
  try {
    await ses.sendEmail(emailParams).promise()
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

exports.handler = async (event) => {
  const firstName = event.Records[0].dynamodb.NewImage.firstName.S
  const lastName = event.Records[0].dynamodb.NewImage.lastName.S
  const email = event.Records[0].dynamodb.NewImage.email.S
  const message = event.Records[0].dynamodb.NewImage.message.S

  let adminEmailBody = {
    from: process.env.SES_EMAIL,
    to: process.env.SES_EMAIL,
    body: `
    Dear Admin,

    You have received a new contact form submission with the following details:
    
    First Name: ${firstName}
    Last Name: ${lastName}
    Email: ${email}
    Message: ${message}
    
    Please review the query and take appropriate action.
    
    Thank you for your attention.
    `,
    subject: 'New Contact Form Submission',
  }

  let userEmailBody = {
    from: process.env.SES_EMAIL,
    to: email,
    body: ` Dear ${firstName} ${lastName},

    Thank you very much for your inquiry to Nihongo Talker.

    We are working hard to examine the details of your inquiry and provide you with an appropriate response.
    Our staff will reply to you within 2-3 days, so we hope you will be patient.

    If you have any questions or concerns, please feel free to contact us at any time.
    Thank you for your continued support.

    Inquiry details

    First Name: ${firstName}
    Last Name: ${lastName}
    Email: ${email}
    Message: ${message}
    
    
    Nihono Talker.
    `,
    subject: 'Thank you for contacting us.',
  }

  try {
    await Promise.all([sendEmail(adminEmailBody), sendEmail(userEmailBody)])
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to send emails'),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Successfully send the email'),
  }
}