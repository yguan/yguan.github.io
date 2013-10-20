<div class="content book">
    <div class="description">This is a list of books that can make your life a lot better if you do learn from them.</div>
    {{ for(var category in it) { }}
        <div class="book-category">
            <h4>{{=it[category].name}}</h4>
                {{~it[category].books :value:index}}
                    <a href="{{=value.link}}" target="_blank">
                        <img class="thumbnail" src="img/books/{{=value.thumbnail}}" />
                    </a>
                {{~}}
        </div>
    {{ } }}
</div>
