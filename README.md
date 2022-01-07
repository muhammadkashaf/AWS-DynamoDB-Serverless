"AWS-DynamoDB-Serverless" 

..................................................

Service Information

service: my-app

stage: dev

region: us-east-1

stack: my-app-dev

resources: 18

api keys:
  None
  
endpoints:
  
  POST - https://h93jwe5g3b.execute-api.us-east-1.amazonaws.com/dev/users
  
  GET - https://h93jwe5g3b.execute-api.us-east-1.amazonaws.com/dev/users/{id}
  
functions:
  createUser: my-app-dev-createUser
  getUser: my-app-dev-getUser
  
  
layers:
  None
