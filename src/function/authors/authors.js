const uuid = require("uuid/v4");
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async function (event) {
  console.log(event);

  switch (event.field) {
    case 'createAuthors':
        return await createAuthor(event.arguments.input)
    case 'getAuthors':
        return await getAuthor(event.arguments.id)
    case 'updateAuthors':
        return await updateAuthor(event.arguments.input)
    case 'deleteAuthors':
        return await deleteAuthor(event.arguments.input.id)
    default:
      throw new Error(
        'Invalid Request'
      )
  }
};


const createAuthor = async (data) => {
  const result = await createItem(data);
  return result;
}

const createItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "AuthorsTable",
      Item: {
        id: uuid(),
        author: data.author,
        checked: false
      }
    };
  
     client.put(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(params.Item)
      }
    })
  })
}


const getAuthor = async (data) => {
  const result = await getItem(data);
  return result;
}

const getItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "AuthorsTable", 
      Key: {
        id: data,
      }
    };
  
    client.get(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(data.Item)
      }
    })
  })
}


// <---- User Update ------>


const updateAuthor = async (data) => {
  const result = await UpdateItem(data);
  return result;
}

const UpdateItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "AuthorsTable", 
      Key: {
        id: data.id,
      },
      UpdateExpression: 'set #t = :t',
      ExpressionAttributeNames:{
        '#t': 'author'
      },
      ExpressionAttributeValues: {
        ':t' : data.author,
      },
      ReturnValues:"UPDATED_NEW"
    };
  
    client.update(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(data.Attributes)
      }
    })
  })
}


// <---- User Delete ------>


const deleteAuthor = async (data) => {
  const result = await deleteItem(data);
  return result;
}

const deleteItem = (data) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: "AuthorsTable", 
      Key: {
        id: data,
      }
    };
  
    client.delete(params, (error, data) => {
      if(error) {
        reject(error)
      }else {
        resolve(data.Item)
      }
    })
  })
}
