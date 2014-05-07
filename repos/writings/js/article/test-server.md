# How to create a test server to mock a Web server

Author: Yong Guan<br/>
Date Created: May 4th, 2014

## Overview

This article proposes a way to mock the Web server so that the client-side code can be tested with a server as close as the real Web server without the slowness of the actual Web server.

The client-side code discussed here will the JavaScript running in a browser.


## The Problems

### Automated user acceptance tests implemented with Selenium are slow.

Automated tests written with Selenium to drive a browser to test the application is slow because the tests trigger the whole stacks to be executed, which usually involves making http requests, calling database, and executing business and domain layer codes.

### Client-side code unit testing involves a lot of mockings and usually lacks of coverage from the integration perspective.

Well-structure client-side code may be easy to test with mocks, but mocks are usually not managed well. As more tests are ceated, mocks become messy, and changing of mocks can be time-consuming if the people are not the ones that implemneted the mocks.

Even if mocking for unit tests is not a problem, mocking for integration tests is still a nightmare, because so many ajax calls have to be mocked so that the application can reach to the state that can be tested.

**Test Server Architecture Diagram**
<br/><img src="img/test-server.png"></img>


## The Proposed Solution

### Solution

Create a test server that can handle all the requests made by the client-side code, and configure the client-side code to call the test server instead of the actual Web server.

The test server acts similar to a cache server of the actual server and has the following capabilities:

1. It stores each http request it receives in a database and use the request as the primary key of a record.
2. For each request it receives, it will search the database for the response data. If the request doesn't exist, it will make a request to the actual server, and store the reponse data from the actual server to the database with request as a key.
3. It returns the response data to a request after it finds the data in the database or receives the data from the actual server.
4. It supports automatic update of response data by making http request to the Web server with the requests stored in the test server's database, and it will creates a report to show the differences of response data between the data in the database and from the test server.
5. It provides API to insert and update response data for a request.
6. It provides API to clear all data.

### Sequence Diagrams

Here are two sequence diagrams that depict the interactions between components for different scenarios.

**A Workflow for Response Data Is Not Found in The Test Server's Database**
<br/><img src="img/workflow-cache-missed.png"></img><br/>

**A Workflow for Response Data Is Found in The Test Server's Database**
<br/><img src="img/workflow-cache-hit.png"></img>

### Benefits

1. It makes the user acceptance tests run a lot faster. After the database has stored the reponse data, A response from the test sever will be really fast because it will be just a lookup in the database to get the correct response data.
2. It indirectly test the actual server when the test server update its response data by sendings requests to the actual server.
3. It eliminates the need to write mocks when writing integration tests for client-side code.
4. It can implement certain randomized behaviors to mimic sever overload or failure situations.


## The Implementation

**Set up the test server that can handle http requests and interact with database.**

**Create the test server's database.**

**Capture client-side code's http requests and the actual server's responses, and store them in the test sever's database.**

**Enable the test server to update all stored requests' response data by sending requests to the actual Web server.**

**Enable the test server to create report that show the differences of responses data.**


## Conclusion
