

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
// const { v4: uuidv4 } = require('uuid')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {




    // const tableName = "YourTableName"; // replace with your table name
    const primaryKey = "id"; // replace with your primary key attribute name
    const primaryKeyValue = event.arguments.id; // value of the primary key to identify the item
    // const updateExpression = "set #nameKey = :nameValue, #emailKey = :emailValue"; // replace with your update expression
    const updateExpression = "set #nameKey = :nameValue"; // replace with your update expression
    const expressionAttributeNames = {
        "#nameKey": "name",
        // "#emailKey": "email",

    };
    const expressionAttributeValues = {
        ":nameValue": event.arguments.name,
        // ":emailValue":  event.arguments.email
    };


    const params = {
        TableName:`${process.env.TodoTable}-${process.env.ENV}`,
        Key: {
            [primaryKey]: primaryKeyValue
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW" // optional, returns the updated attributes
    };

    console.log("Params are>>>>", params)

    try {
        const result = await dynamoDB.update(params).promise();
        console.log("Update succeeded:", result);
        return {
            id: primaryKey,
            name:result.Attributes.name,
            // k:"mj"
        };
    } catch (error) {
        console.error("Update failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Update failed", error: error.message })
        };
    }





    // const { sessionId } = event.arguments

//     console.log("Event>>",event)
//   try {
//     const data = {
//         id: event.arguments.id,
//         name: event.arguments.name,
       
//       }
//       const params = {
//         TableName: `${process.env.TodoTable}-${process.env.ENV}`,
//         Item: data,
//       }
//      const newResp = await dynamoDB.put(params).promise()
//       console.info(`Successfully executed put in Todo`,newResp)


//     return event
//   } catch (error) {
//     console.log(error, 'Stripe Payment Error')
//     return {
//       success: false,
//     }
//   }
}

