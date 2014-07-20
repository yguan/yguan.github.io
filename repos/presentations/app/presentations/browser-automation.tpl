<div class="reveal">

<div class="slides">
<section>
    <h1>In-Browser Test Automation</h1>
    <h3>A Simpler Way to Write Browser Automation Tests</h3>
    <p class="center">
        <small>By <a href="https://github.com/yguan" target="_blank">Yong Guan</a></small>
    </p>
</section>

<section>
    <h2>Overview</h2>
    <p>
        This presentation shows audience a simpler way to write browser automation tests, specifically for browser-based functional tests. It will enable you to
    </p>
    <ul class="indent">
        <li class="fragment">choose any JavaScript test framework, such as Mocha, Jasmine, and QUnit</li>
        <li class="fragment">write your tests in JavaScript</li>
        <li class="fragment">run your tests in a browser</li>
        <li class="fragment">debug your tests in a browser</li>
        <li class="fragment">write your tests in a browser</li>
        <li class="fragment">and forget about WebDriver</li>
    </ul>
</section>

<section>
    <h2>The Basic Concept</h2>
    <ul>
        <li class="fragment">Write tests with a JavaScript test framework, such as Mocha, Jasmine, and QUnit</li>
        <li class="fragment">In the tests, open a window and keep the window reference</li>
        <li class="fragment">Through the window reference, use what's available to the window to manipulate the DOM</li>
    </ul>
</section>

<section>
    <h2>A Basic Example with Mocha</h2>
    <pre>
        <code class="javascript " data-trim contenteditable>
describe('jquery.com', function () {
    it('should type some text to the search box', function (done) {
        var win = window.open('http://jquery.com/');

        // The setTimeout can be replaced with a wait function
        setTimeout(function () {
            if (win.$) {
                var searchBox = win.$('.searchform :input');
                searchBox.val('css selector').click();
            }
        }, 5000);
    });
});
        </code>
    </pre>
    <ul>
        <li>Navigate to jquery.com</li>
        <li>Run the above code in the browser's console</li>
        <li>Make sure to enable popup</li>
    </ul>
</section>

<section>
    <h2>A Better Example with browser.js</h2>
    <pre>
        <code class="javascript " data-trim contenteditable>
describe('jquery.com', function () {
    it('should type some text to the search box', function (done) {
        var browser = window.browser.init();

        browser
            .openWindow('http://jquery.com/')
            .typeValue('.searchform :input', 'css selector');

        browser.end(done);
    });
});
        </code>
    </pre>
    <ul>
        <li>Navigate to jquery.com</li>
        <li>Copy and run <a href="https://github.com/yguan/browser-automation" target="_blank">browser.js</a> in the browser's console</li>
        <li>Run the above code in the browser's console</li>
    </ul>
    <p class="note">
        browser.js supports chaining of asynchronous operations and waiting for condition met.
    </p>
</section>

<section>
    <h2>Cross-Domain Issue</h2>
    <p class="pad-bottom">The previous two examples are required to be run through the browser's console so that the code is run in the same domain as jquery.com.</p>
    <p>To bypass the cross-domain problem, there are a few options:</p>
    <ol class="indent">
        <li>Manually inject the test code to a browser</li>
        <li>Use WebDriver to start a browser and then inject the test code</li>
        <li>Host the test code in the same domain as the site under test</li>
    </ol>
    <p class="note">
        You can find more information <a href="https://github.com/yguan/browser-tests" target="_blank">here.</a>
    </p>
</section>

<section>
    <h2>Hosting the test code</h2>
    <p class="pad-bottom">The best way to host the test code is to put it in the same domain as the site under test.</p>
    <p>Benefits:</p>
    <ul class="indent">
        <li>Minimal setup</li>
        <li>Flexible options for continuous integration</li>
        <li>Easier to write tests</li>
    </ul>
    <p class="note">
        You can find more information <a href="http://yguan.github.io/repos/writings/#test-automation?article=browser-tests" target="_blank">here.</a>
    </p>
</section>

<section>
    <h2>Open Multiple Browsers at once without Using WebDriver</h2>
    <ul>
        <li>If the use case is to open multiple browsers with a specific url, there is no need use WebDriver.</li>
        <li><a href="https://github.com/pwnall/node-open" target="_blank">node-open</a> will do the job with minimal installation and run time resources.</li>
        <li>After installing node-open, you can run the following code with node and see all three browsers open all at once.</li>
    </ul>
    <pre>
        <code class="javascript " data-trim contenteditable>
var open = require("open");
open("http://www.google.com", "chrome");
open("http://www.google.com", "firefox");
open("http://www.google.com", "iexplore");
        </code>
    </pre>
</section>

<section>
    <h2>Record UI Interactions</h2>
    <p class="pad-bottom"><a href="https://github.com/yguan/ui-recorder" target="_blank">ui-recorder</a> is a utility script that supports browser event capturing.</p>
    <ul class="indent">
        <li>Events from all nested iframes are captured</li>
        <li>Events to capture are customizable</li>
        <li>Generated code for captured events is customizable</li>
    </ul>
    <p class="note">
        The easiest way to use ui-recorder may be integrate it to your site when dev/debug mode is on. Then you can use it by typing command from the browser's console.
    </p>
</section>

<section>
    <h2>Convince Your Boss to Ditch WebDriver</h2>
    <table>
        <thead>
            <tr>
                <th></th>
                <th>In-Browser</th>
                <th>WebDriver</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>Run in browser</td>
            <td>Yes</td>
            <td>Impossible</td>
        <tr/>
            <tr>
                <td>Debug</td>
                <td>Easy</td>
                <td>Not straight forward</td>
            <tr/>
            <tr>
                <td>Runtime dependency</td>
                <td>Minimal</td>
                <td>A Lot (sever and drivers)</td>
            <tr/>
            <tr>
                <td>Complexity</td>
                <td>browser.js<br/>362 LOC with comments</td>
                <td>Lots of LOC<br/>(server and drivers)</td>
            <tr/>
        </tbody>
    </table>
    <p class="note">
        You can find more information <a href="http://yguan.github.io/repos/writings/#test-automation?article=browser-tests" target="_blank">here.</a>
    </p>
</section>

<section>
    <h2>Resources</h2>
    <ul>
        <li><a href="https://github.com/yguan/ui-recorder" target="_blank">ui-recorder</a></li>
        <li><a href="https://github.com/yguan/browser-automation" target="_blank">browser-automation</a></li>
        <li><a href="https://github.com/yguan/browser-tests" target="_blank">browser-tests</a></li>
        <li><a href="https://github.com/yguan/http-replay-server" target="_blank">http-replay-server</a></li>
        <li><a href="https://github.com/pwnall/node-open" target="_blank">node-open</a></li>
    </ul>
</section>

<section>
    <h1>The End</h1>
    <h3>By Yong Guan</h3>
</section>

</div>

</div>