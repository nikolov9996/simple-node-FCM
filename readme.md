
Request should look like this.

image is optional

curl --location 'https://{someDomain}/notification/sendToDevice' \
--header 'Content-Type: application/json' \
--data '{
    "body": "some body for request",
    "title": "test request 2",
    "deviceToken": "deviceToken alabala token",
    "image": "imageURL",
}'

needed firebase admin SDK json file

