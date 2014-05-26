# How to write end-to-end UI automation tests that run in a browser

Author: Yong Guan<br/>
Date Created: May 25th, 2014<br/>
Last Modified: May 25th, 2014

## Overview

This article presents a way to write end-to-end UI automation tests that can be run in a browser directly, which will make the test development really easy.

The end-to-end UI automation tests is referred to the tests that drive the browser that is point to the Website under test.


## The Problem

### Traditional way of writing end-to-end tests is slow and painful.

[Selenium/WebDriver](http://docs.seleniumhq.org/) is a popular framework for writing the end-to-end tests, and companies are fond of it because it's track record. However, WebDriver introduces a layer between your tests and the browser that is accessing the site under test, which causes the following problems:

1. **Debug is tedious.** When the debugger hits a breakpoint in the test code, you can try to write a few expressions to evaluate the state of the UI, but you may get timeout easily after running a few expressions, and you have to rerun the test again to reach the same break point again. Moreover, you have to learn about the WebDriver API so that you know how to write the expression. One way to alleviate this problem is to open a separate browser tab and navigate to the same view, and then figure out the problem in the UI through browser's developer tool.
2. **Tests development speed is slow.** As mentioned above, it is tedious to debug, and when writing tests, we have to debug a lot to make the test running. This is true in the begining when we are try to figure out how to select elements. If you're using static type language (C# or Java)to write your tests, the problem gets even worst beccause you have to recompile the tests every time you make a change.
3. **It's hard to share common code between JavaScript unit tests and WebDriver tests.** You may be able to share the element selector string, but it's almost impossible to share code that follows the page object pattern, such as a class that represent a component that supports multiple methods.
4. **webdriver.js is not the ultimate savior.** Since the introduction of webdriver.js, there are multiple frameworks that allow you to write WebDriver tests in JavaScript that run in node. It simplifies JavaScript developers' lives, but it still suffers the above three items. This also applies to [CasperJS](http://casperjs.org/).


## The Proposed Solutions

### Solution for Same Domain

Write the end-to-end tests the same way as writing JavaScript unit tests.

* Choose a test framework such as mocha, jasmine, or qunit to write the tests.
* In the tests, use window.open to open a browser window that point to the site under test, and keep the window reference so that the tests can manipulate the popup window.
* Run the tests the same way as any other JavaScript unit tests.

This solution work perfectly if the test code and the site under test are in the same domain. Otherwise, there will be cross-domain problem, and you have to use the script injection technique mentioned below.

**Sequence Diagram**
<br/><img src="img/same-domain-test.png"></img>

### Solution for Cross Domain

This solution requires the same steps as the same-domain solution, but with the extra step to inject the test code to the site under test manually or through WebDriver so that the test code will be under the same domain as the site under test.

* Write the tests the same way as the same-domain solution.
* Host the test on a server.
* Open a browser that point to the site under test.
* Manually or automatically inject the test code to browser that point to the site under test.

**Sequence Diagram**
<br/><img src="img/cross-domain-test.png"></img>


## Examples

### For Same Domain

Here is the [demo](http://yguan.github.io/repos/browser-tests/same-domain/). Click on the demo link will load the page that contains mocha tests, which will run the tests that are hosted in the same domain as the site (fake-stie.html) under test. You can use "view page source" to see the code or from [github](https://github.com/yguan/browser-tests/tree/master/same-domain).

### For Cross Domain

**Manual Injection for jquery.com**

1. Go to [jquery.com](http://jquery.com/).
2. **Make sure popup is enabled for this site.**
3. Open the browser's developer tool's console.
4. Copy the JavaScript in this [file](http://yguan.github.io/repos/browser-tests/cross-domain/script-injector.js), and run it in the console.

**Manual Injection for ExtJS API site**

1. Go to [ExtJS API site](http://docs.sencha.com/extjs/4.2.2/).
2. **Make sure popup is enabled for this site.**
3. Open the browser's developer tool's console.
4. Copy the JavaScript in this [file](http://yguan.github.io/repos/browser-tests/cross-domain/script-injector.js), set window.runExtjsTests = true, and run it in the console.


**Automatic Injection with WebDriver**

See the github [repository](https://github.com/yguan/browser-tests) for details.
