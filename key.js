curl -H "Content-Type: text/xml" -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnQiOiI1YmM2YmEwYy02NmVkLTNmYzctOTE4NC1jMjE5NDhjYjBhNWMiLCJhY2NvdW50SWQiOiI2MTNhNjk4OGJiYTZjNzAwNmE0YWFlZGEiLCJpc1hlYSI6ZmFsc2UsImlhdCI6MTcwNzA1OTAzNywiZXhwIjoxNzA3MTQ1NDM3LCJhdWQiOiI2MjEwMUYyOUJDMjA0MjRDOTU1Njg3M0IzMzE1NEVGMSIsImlzcyI6ImNvbS54cGFuZGl0LnBsdWdpbnMueHJheSIsInN1YiI6IjYyMTAxRjI5QkMyMDQyNEM5NTU2ODczQjMzMTU0RUYxIn0.tfdFtbmkKpey5rY8wYdLVZ_auS3HkVKtH8u7Svrshrk"  --data @"/Users/rusau/Documents/js_course/hw/lesson_5.1.2/test-results.xml" https://xray.cloud.getxray.app/api/v2/import/execution/junit?projectKey=CYP



curl -H "Content-Type: application/json" -X POST --data '{ "client_id": "62101F29BC20424C9556873B33154EF1","client_secret": "f25c5f3fa17e4d0372f068b694f88d5dbe75ccb96492da76bcb25625c1d570a2" }' https://xray.cloud.getxray.app/api/v1/authenticate


