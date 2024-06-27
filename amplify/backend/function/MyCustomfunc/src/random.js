const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const tableName = "YourTableName"; // replace with your table name
    const primaryKey = "PrimaryKey"; // replace with your primary key attribute name
    const primaryKeyValue = event.primaryKeyValue; // value of the primary key to identify the item
    const updateExpression = "set #attrName = :attrValue"; // replace with your update expression
    const expressionAttributeNames = {
        "#attrName": "name" // replace with the attribute name you want to update
    };
    const expressionAttributeValues = {
        ":attrValue": event.arguments.name // replace with the new value for the attribute
    };

    const params = {
        TableName: tableName,
        Key: {
            [primaryKey]: primaryKeyValue
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW" // optional, returns the updated attributes
    };

    try {
        const result = await dynamoDB.update(params).promise();
        console.log("Update succeeded:", result);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Update succeeded", result: result.Attributes })
        };
    } catch (error) {
        console.error("Update failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Update failed", error: error.message })
        };
    }
};