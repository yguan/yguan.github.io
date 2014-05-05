# How to create a test server to mock a Web server

Date Created: May 4th, 2014

## Overview

This article proposes a way to mock the Web server so that the client-side code can be tested with a server as close as the real Web server without the slowness of the actual Web server.

The client-side code discussed here will the JavaScript running in a browser.


## The Problems

**Automated user acceptance tests implemented with Selenium are slow.**

Automated tests written with Selenium to drive a browser to test the application is slow because the tests trigger the whole stacks to be executed, which usually involves making http requests, calling database, and executing business and domain layer codes.

**Client-side code unit testing involves a lot of mockings and usually lacks of coverage from the integration perspective.**

Well-structure client-side code may be easy to test with mocks, but mocks are usually not managed well. As more tests are ceated, mocks become messy, and changing of mocks can be time-consuming if the people are not the ones that implemneted the mocks.

Even if mocking for unit tests is not a problem, mocking for integration tests is still a nightmare, because so many ajax calls have to be mocked so that the application can reach to the state that can be tested.

**Test Server Architecture Diagram**
<br/><img src="img/test-server.png"></img>

## The Proposed Solution

**Solution**

Create a test server that can handle all the requests made by the client-side code, and set the client-side code to use the test server instead of the actual Web server.

The test server has the following capabilities:

1. It stores all the requests maded by the tests in a database.
2. It stores the response data to each of the request in a database.
3. It returns the correct response data to requests made by client-side code.
4. It gets the response data from the actual Web sever periodically by making http request to the Web server with the requests stored in the test server's database, and it will creates a report to show the differences of response data between the data in the database and from the test server.

**Benefits**

1. It makes the user acceptance tests run a lot faster.
 1. A response from the test sever will be really fast because it will be just a lookup in the database to get the correct response data.
2. When the test server update its response data by sendings requests to the actual server, it will also indirectly test the actual server.
3. It eliminates the need to write mocks when writing integration tests for client-side code.

## The Implementation

**Set up the test server that can handle http requests and interact with database.**

**Create the test server's database.**

**Capture client-side code's http requests and server's responses, and store them in the test sever's database.**

**Enable the test server to update all stored requests' response data by sending requests to the actual Web server.**

**Enable the test server to create report that show the differences of responses data.**

## Conclusion
