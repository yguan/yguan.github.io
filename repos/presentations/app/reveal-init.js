define(function () {
        window.require = null;
//        window.exports = null;
//        window.module = null;

        // Full list of configuration options available here:
        // https://github.com/hakimel/reveal.js#configuration
        Reveal.initialize({
            controls: true,
            progress: true,
            history: true,
            center: true,

            theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
            transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

            // Optional libraries used to extend on reveal.js
            dependencies: [
                { src: 'lib/js/classList.js', condition: function () {
                    return !document.body.classList;
                } },
//                { src: 'plugin/markdown/marked.js', condition: function () {
//                    return !!document.querySelector('[data-markdown]');
//                } },
//                { src: 'plugin/markdown/markdown.js', condition: function () {
//                    return !!document.querySelector('[data-markdown]');
//                } },
                { src: 'plugin/highlight/highlight.js', async: true, callback: function () {
                    $('pre code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                } },
                { src: 'plugin/zoom-js/zoom.js', async: true, condition: function () {
                    return !!document.body.classList;
                } },
                { src: 'plugin/notes/notes.js', async: true, condition: function () {
                    return !!document.body.classList;
                } }
            ]
        });
    }
);

