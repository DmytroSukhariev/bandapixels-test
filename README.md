# Bandapixels test task
Simple auth application built with NodeJs, Express and TypeScript

# Installation 
```bash
git clone https://github.com/DmytroSukhariev/bandapixels-test.git
cd bandapixels-test
npm i
```
Rename default.sample.json to dafault.json in config/ folder. \
Specify application port and token expiration in mins (if needed), add your mongoDB url, generate salt and jwtSecret. \

# Run
```bash
npm start
```

# Endpoints:

### /signup
Request body shood be 
```json
{
   "id": "<ukrainian phone number or email>",
   "password": "<password>"
}
```
Response will be 
```json
{
   "token": "<token>"
}
```

### /signin 
Will wor only if user allredy registrated \
Request body shood be 
```json
{
   "id": "<ukrainian phone number or email>",
   "password": "<password>"
}
```
Response will be 
```json
{
   "token": "<token>"
}
```

### /logout
Will invalidate given token \
Request body shood be 
```json
{
   "token": "<token>"
}
```
Response status will be 200

### /logout?all=true
Will invalidate all existing tokens \
Request body shood be 
```json
{
   "token": "<token>"
}
```
Response status will be 200


### /info
Request body shood be 
```json
{
   "token": "<token>" 
}
```
Response will be 
```json
{

   "id": "<ukrainian phone number or email>",
   "id_type": "<'email' or 'number'>
}
```

### /latency
Will wor only if user allredy registrated \
Request body shood be 
```json
{
   "token": "<token>" 
}
```
Response will be 
```json
{
   "latency": "<latency to specifyed in config host>"
}
```

## License
[MIT](https://choosealicense.com/licenses/mit/)