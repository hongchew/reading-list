# reading-list

This is a mini project to practice react, redux and express. 

It is a reading list that helps keep track of what books you are currently reading, intend to read and had completed reading. 

All data is persisted on browser's localStorage, which means that information will be gone if you clear browser data.

This project consist of 2 parts, `reading-list`, which is a react & redux frontend that runs on the browser, and `reading-list-services`, an express server to do mock API calls. 
## Quick Start

Run the following command on `/reading-list `

``` npm run start ```

The application will be available on `localhost:3000` and the mock server will be running on `localhost:3001`

Alternatively, you can run `npm run start-app` or  `npm run start-server` to run each seperately.


## Mock Server
The application comes with a express server on `/reading-list/reading-list-services`

As mentioned above, this express server is used to mock API calls and is not necessary for the running of the main app. The existence of this server is entirely for practice purpose and serve no practical purpose. (Unless you want to sync up multiple instances of the reading-list locally with the same comments)
