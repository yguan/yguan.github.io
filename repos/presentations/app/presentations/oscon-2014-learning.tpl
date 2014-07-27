<div class="reveal">

<div class="slides">
<section>
    <h1>OSCON 2014</h1>
    <h3>What I learned</h3>
    <p class="center">
        <small>By <a href="https://github.com/yguan" target="_blank">Yong Guan</a></small>
    </p>
</section>

<section>
    <h2>Overview</h2>
    <p>
        This presentation covers what I learned from <a href="http://www.oscon.com/oscon2014" target="_blank">OSCON 2014</a>.
    </p>
    <ul class="indent">
        <li><a href="#/2">Inspirational keynotes</a></li>
        <li><a href="#/6">Insightful sessions</a></li>
        <li><a href="#/13">Miscellaneous</a></li>
    </ul>
</section>

<section>
    <h2>Inspirational keynotes</h2>
</section>

<section>
    <h3>Building an API for the Planet</h3>
    <h4>With a New Approach to Satellites</h4>
    <p class="center pad-top">
        <iframe width="640" height="360" src="//www.youtube.com/embed/2vYwaBWlVyI" frameborder="0" allowfullscreen></iframe>
    </p>
    <p class="note">
        Sending 4-kilogram satellites to space, and a lot of them. Then use them to capture Earth images. The data is free for you to use through API.
    </p>
</section>

<section>
    <h3>Anticipating the Future</h3>
    <h4>An Introduction to Value Chain Mapping</h4>
    <p class="center pad-top">
        <iframe width="640" height="360" src="//www.youtube.com/embed/NnFeIt-uaEc" frameborder="0" allowfullscreen></iframe>
    </p>
    <p class="note">
        Extremely funny talk, but with a really insightful/usable idea on how to position your company's strategy to dominate future competition. Move before others move.
    </p>
</section>

<section>
    <h3>The Concert Programmer</h3>
    <p class="center pad-top">
        <iframe width="640" height="360" src="//www.youtube.com/embed/yY1FSsUV-8c" frameborder="0" allowfullscreen></iframe>
    </p>
    <p class="note">
        No need to practice music instruments anymore, but to study signal processing and music theories. The future may be programmed electronic music.
    </p>
</section>

<section>
    <h2>Insightful sessions</h2>
    <h4>No OSCON 2014 Video here because O'Reilly is not releasing the videos to the public</h4>
</section>

<section>
    <section>
        <h2>
            <a href="http://www.oscon.com/oscon2014/public/schedule/detail/34635" target="_blank">
                Move Fast and Ship Things
            </a>
        </h2>
        <h4>Andrei Alexandrescu (Facebook)</h4>
        <ul>
            <li>Risk taking culture</li>
            <li>Team building</li>
            <li>Collaboration Tool</li>
        </ul>
    </section>

    <section>
        <h3>Risk taking culture</h3>
        <p>The Story of HHVM</p>
        <ul>
            <li><a href="http://en.wikipedia.org/wiki/HipHop_for_PHP" target="_blank">HipHop</a> was released in 2010</li>
            <li>But three guys thought they could do better</li>
            <li>So they convinced the management to let them work on <a href="http://hhvm.com/" target="_blank">HHVM</a></li>
            <li>It took two years to make HHVM the achieve the same performance as HipHop</li>
            <li>It took another few months to make HHVM surpass HipHop</li>
            <li>Today, only HHVM remains</li>
        </ul>
        <p class="note">Here is <a href="http://www.wired.com/2013/06/facebook-hhvm-saga/all/" target="_blank">the story</a> behind HHVM.</p>
    </section>

    <section>
        <h3>Team building</h3>
        <p>Facebook Engineering Bootcamp</p>
        <ul>
            <li>All new hires have to go through an intensive six week program</li>
            <li>Learn about the code base</li>
            <li>Learn about the tools</li>
            <li>Choose a project</li>
            <li>Form habits that would scale up the organization</li>
            <li>Join a team at the end</li>
        </ul>
        <p class="note">Here is <a href="https://www.facebook.com/notes/facebook-engineering/facebook-engineering-bootcamp/177577963919" target="_blank">the story</a>.</p>
    </section>


    <section>
        <h3>Team building - Cont'</h3>
        <p>The fittest teams survive</p>
        <ul>
            <li>The company encourages people to change teams every 6/18 months</li>
            <li>After joining a team, there is one month trial period</li>
            <li>The side-effect: no crappy team</li>
        </ul>
    </section>

    <section>
        <h3>Collaboration Tool</h3>
        <p><a href="http://phabricator.org/" target="_blank">Phabricator</a> is used to facilitate collaboration. It supports</p>
        <ul>
            <li>reviewing and auditing code</li>
            <li>hosting Git/Hg/SVN repositories</li>
            <li>browsing repositories</li>
            <li>tracking bugs or "features"</li>
        </ul>
    </section>
</section>

<section>
    <section>
        <h2>
            <a href="http://www.oscon.com/oscon2014/public/schedule/detail/34451" target="_blank">
                Netflix API : Top 10 Lessons Learned
            </a>
        </h2>
        <h4>Daniel Jacobson (Netflix) | <a href="http://www.slideshare.net/danieljacobson/top-10-lessons-learned-from-the-netflix-api-oscon-2014" target="_blank">slides</a></h4>
        <p>The talks was only an overview, but it did get me to research more about Netflix's technology and processes.</p>
        <ul class="indent">
            <li>Netflix's API design is quite sophisticated</li>
            <li>The stack is primarily built with Java</li>
            <li>It uses Amazon Web Services extensively</li>
            <li>It does a good job to open source its technology</li>
        </ul>
    </section>

    <section>
        <h3>Netflix API case study</h3>
        <h4>with Daniel Jacobson</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/StCrm572aEs" frameborder="0" allowfullscreen></iframe>
        </p>
        <p class="note">
            It's quite a good talk about API design.
        </p>
    </section>

    <section>
        <h3>Netflix OSS Cloud</h3>
        <h4>by Carl Quinn</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/I3T_-dvX6i0" frameborder="0" allowfullscreen></iframe>
        </p>
        <p class="note">
            It's a really good overview of Netflix's OSS.
        </p>
    </section>

    <section>
        <h3>The evolution of Netflix's API</h3>
        <h4>A collection of Netflix's blog posts</h4>
        <ul>
            <li><a href="http://techblog.netflix.com/2012/07/embracing-differences-inside-netflix.html" target="_blank">Embracing the Differences : Inside the Netflix API Redesign</a></li>
            <li><a href="http://techblog.netflix.com/2013/01/optimizing-netflix-api.html" target="_blank">Optimizing the Netflix API</a></li>
            <li><a href="http://techblog.netflix.com/2013/08/deploying-netflix-api.html" target="_blank">Deploying the Netflix API</a></li>
            <li><a href="http://techblog.netflix.com/2013/11/preparing-netflix-api-for-deployment.html" target="_blank">Preparing the Netflix API for Deployment</a></li>
            <li><a href="http://techblog.netflix.com/2014/03/the-netflix-dynamic-scripting-platform.html" target="_blank">The Netflix Dynamic Scripting Platform</a></li>
            <li><a href="http://techblog.netflix.com/2014/06/building-netflix-playback-with-self.html" target="_blank">Building Netflix Playback with Self-Assembling Components</a></li>
            <li><a href="http://techblog.netflix.com/2014/06/optimizing-netflix-streaming-experience.html" target="_blank">Optimizing the Netflix Streaming Experience with Data Science</a></li>
        </ul>
    </section>

    <section>
        <h3>Engineering Velocity: Continuous Delivery at Netflix</h3>
        <h4>by Diane Marsh | <a href="http://www.slideshare.net/diannemarsh/saturn-2014">slides</a></h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/7oEvlcUMqpE" frameborder="0" allowfullscreen></iframe>
        </p>
        <p class="note">
            This gives you an insider view of Netflix's continuous delivery culture.
        </p>
    </section>
</section>

<section>
    <h2>
        <a href="http://www.oscon.com/oscon2014/public/schedule/detail/34192" target="_blank">
            Functional Thinking
        </a>
    </h2>
    <h4>Neal Ford (ThoughtWorks) | <a href="http://nealford.com/functionalthinking.html" target="_blank">site</a></h4>
    <p class="center pad-top">
        <iframe width="640" height="360" src="//www.youtube.com/embed/7aYS9PcAITQ" frameborder="0" allowfullscreen></iframe>
    </p>
    <p class="note">
        Functional programming makes coding a lot simpler, and it can eliminate a lot of design patterns used primarily by object-oriented programming. It's a higher level of abstraction, more productive, and no more thread programming.
    </p>
</section>


<section>
    <section>
        <h2><a href="http://www.oscon.com/oscon2014/public/schedule/detail/37736" target="_blank">Apache Spark: A Killer or Savior of Apache Hadoop?</a></h2>
        <h4>Roman Shaposhnik (Pivotal Inc.)</h4>
        <p>
            The session was a good overview of Spark and its differences from Hadoop, but <a href="http://spark-summit.org/2014/agenda">Spark Summit 2014</a> had better talks.
        </p>
    </section>

    <section>
        <h3>Spark's Role in the Big Data Ecosystem</h3>
        <h4>By Matei Zaharia</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/e-Ys-2uVxM0?list=PL-x35fyliRwiST9gF7Z8Nu3LgJDFRuwfr" frameborder="0" allowfullscreen></iframe>
        </p>
    </section>

    <section>
        <h3>Spark and the future of big data applications</h3>
        <h4>By Eric Baldeschwieler</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/c_i2waZvwOc?list=PL-x35fyliRwiST9gF7Z8Nu3LgJDFRuwfr" frameborder="0" allowfullscreen></iframe>
        </p>
    </section>

    <section>
        <h3>The Future of Spark</h3>
        <h4>By Patrick Wendell</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/2iXQnTVgHuw?list=PL-x35fyliRwjCR-gDhk1ekG4jh2ltgKSV" frameborder="0" allowfullscreen></iframe>
        </p>
    </section>

    <section>
        <h3>What's Next for BDAS?</h3>
        <h4>By Mike Franklin</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/90ZrS9hVm-w?list=PL-x35fyliRwiST9gF7Z8Nu3LgJDFRuwfr" frameborder="0" allowfullscreen></iframe>
        </p>
        <p class="note">
            This is a talk about <a href="https://amplab.cs.berkeley.edu/software/" target="_blank">Berkeley Data Analytics Stack</a>.
        </p>
    </section>

    <section>
        <h3>Databricks Application Spotlight - Typesafe</h3>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/a1eWu3AQ9yY?list=PL-x35fyliRwjCR-gDhk1ekG4jh2ltgKSV" frameborder="0" allowfullscreen></iframe>
        </p>
    </section>

</section>

<section>
    <section>
        <h2><a href="http://www.oscon.com/oscon2014/public/schedule/detail/35464" target="_blank">Real-time Engineering at Uber and the Evolution of an Event-Driven Architecture</a></h2>
        <h4>Jeff Wolski (Uber) | <a href="http://cdn.oreillystatic.com/en/assets/1/event/115/Real-time%20Engineering%20at%20Uber%20and%20the%20Evolution%20of%20an%20Event-Driven%20Architecture%20Presentation.pdf" target="_blank">slide</a></h4>
        <p>
            There are a few takeaways from this talk.
        </p>
        <ul class="indent">
            <li>Decouple services with event-driven architecture</li>
            <li>Services publish/subscribe to channels</li>
            <li>Events should be raw and contain all the information</li>
            <li>Apache Kafka is something to know about</li>
        </ul>
        <p class="note"><a href="http://java.dzone.com/articles/exploring-message-brokers" target="_blank">Here</a> is comparison of a few message brokers</p>
    </section>

    <section>
        <h3>Domain Event Driven Architecture</h3>
        <p class="center pad-top">
            <iframe src="//www.slideshare.net/slideshow/embed_code/3395407" width="599" height="487" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>
        </p>
        <p class="note">
            Check out the <a href="http://www.infoq.com/presentations/Domain-Event-Driven-Architecture" target="_blank">video</a> as well. It is really good.
        </p>
    </section>

    <section>
        <h3>SOA and Event Driven Architecture</h3>
        <p class="center pad-top">
            <iframe src="//www.slideshare.net/slideshow/embed_code/26839545" width="597" height="486" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>
        </p>
        <p class="note">
            Check out the <a href="http://vimeo.com/64505378" target="_blank">video</a> as well. Even though the video's quality is bad, but the talk is really good.
        </p>
    </section>

    <section>
        <h3>Enterprise Kafka: Kafka as a Service</h3>
        <h4>By Todd Palino and Clark Haskins</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/7dkSze52i-o" frameborder="0" allowfullscreen></iframe>
        </p>
    </section>

    <section>
        <h3>Kafka and Storm Stream Processing</h3>
        <h4>By Markus Blumrich</h4>
        <p class="center pad-top">
            <iframe width="640" height="360" src="//www.youtube.com/embed/0b7Ln_KYbjQ" frameborder="0" allowfullscreen></iframe>
        </p>
    </section>

    <section>
        <h3>Apache Kafka and Real-Time Data Integration</h3>
        <h4>By Jay Kreps</h4>
        <p class="center pad-top">
            <iframe width="640" height="480" src="//www.youtube.com/embed/aJuo_bLSW6s" frameborder="0" allowfullscreen></iframe>
        </p>
    </section>
</section>

<section>
    <h2><a href="http://www.oscon.com/oscon2014/public/schedule/detail/37724">High Performance Visualizations with Canvas</a></h2>
    <h4>By Ryan Richards (Fastly)</h4>
    <p class="center pad-top">
        <iframe src="//player.vimeo.com/video/96425319" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </p>
    <p class="note">
        The canvas charting library <a href="http://fastly.github.io/epoch/" target="_blank">epoch</a> looks really promising.
    </p>
</section>

<section>
    <h2>Miscellaneous</h2>
</section>

<section>
    <h3>A Conversation with a Sauce Labs engineer</h3>
    <ul>
        <li>Dedicated VM for browser instances</li>
        <li>VM images are ready to deploy</li>
        <li>VMs are thrown away after tests</li>
        <li>Minimal Windows Server for IE</li>
        <li>Aptium is used for mobile testing</li>
    </ul>
    <p class="note">
        More information can be found <a href="https://saucelabs.com/docs/sauce-vs-local" target="_blank">here</a>.
    </p>
</section>

<section>
    <h3>A list of sites to look at</h3>
    <ul>
        <li><a href="http://spf13.com/presentation/first-go-app" target="_blank">Getting Started With Go</a></li>
        <li><a href="https://www.data.gov/" target="_blank">U.S. Government’s Open Data</a></li>
        <li><a href="http://www.usability.gov/" target="_blank">U.S. Government's Usability Site</a></li>
        <li><a href="https://www.gov.uk/design-principles" target="_blank">UK Government Digital Service Design Principles</a></li>
        <li><a href="https://www.gov.uk/service-manual/digital-by-default" target="_blank">Digital by Default Service Standard</a></li>
        <li><a href="http://cdn.oreillystatic.com/news/graphics/prog_lang_poster.pdf" target="_blank">History of Programming Languages</a></li>
    </ul>
</section>

<section>
    <h3>Adoptable Tools/Frameworks</h3>
    <ul>
        <li><a href="http://phabricator.org/" target="_blank">Phabricator</a></li>
        <li><a href="http://webpack.github.io/" target="_blank">Webpack</a></li>
        <li><a href="https://code.facebook.com/projects/" target="_blank">Facebook Open Source</a></li>
        <li><a href="https://github.com/facebook/huxley" target="_blank">Huxley</a></li>
        <li><a href="http://netflix.github.io/" target="_blank">Netflix Open Source</a></li>
        <li><a href="https://spark.apache.org/" target="_blank">Apache Spark</a></li>
        <li><a href="http://kafka.apache.org/" target="_blank">Apache Kafka</a></li>
        <li><a href="http://mesos.apache.org/" target="_blank">Apache Mesos</a></li>
    </ul>
</section>

<section>
    <h1>Questions?</h1>
</section>

<section>
    <h1>The End</h1>
</section>

</div>

</div>