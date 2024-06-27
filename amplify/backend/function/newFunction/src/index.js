

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { DynamoDB, SES } = require('aws-sdk')
const dynamodb = new DynamoDB.DocumentClient()

exports.handler = async (event) => {
  // if(event.triggerSource ==="PostConfirmation_ConfirmSignUp"){
  //   console
  // }
  console.log("Event isss >>>> ",event)
  try {
    await dynamodb.put({
      TableName :  `${process.env.TableName}-${process.env.ENV}`,
      Item :{
        id : "1234",
        email : event.request.userAttributes.email
      }
    }).promise()
    console.info(`Successfully executed put in Todo`)
    return event
  } catch (err) {
    console.error(err)
    throw err
  }

};
