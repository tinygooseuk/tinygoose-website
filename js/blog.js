function getPageNumber() {
    let pageString = getArgs()["p"];
    
    return pageString ? parseInt(pageString) : 1;
}

function createPost(num, post) {
    let converter = new showdown.Converter();
    let contentHtml = converter.makeHtml(post.content);

    return $(`<!-- Post -->
        <div class="post" data-postid="${num}">
            <h1>${post.title}</h1>
            <span class="author"><h2>by ${post.author} on ${post.posted.toLocaleDateString("en-GB")}</h2></span>`
            
            +

            (post.image ? 
                `<a href="${post.link}">
                    <br /><br />
                    <img class="post-image" src="${post.image}" />
                </a>` : '<br />')

            +

            `<div>
                ${contentHtml}
            </div>
        </div>`);
}

function getBlogRoot() {
    if (window.location.href.indexOf("localhost") == -1) {
        return '//raw.githubusercontent.com/tinygooseuk/tinygooseuk.github.io/master/blog.yaml';
    } else {
        return 'blog.yaml';
    }
}

function createSingleBlogPost(postId) {
    $.get(getBlogRoot(), yaml => {
        let posts = YAML.parse(yaml);
        let postIndex = posts.length - postId;

        createPost(postIndex, posts[postIndex]).prependTo("#content");
    });
}

function createBlog(numPosts, startPage) {
    $.get(getBlogRoot(), yaml => {
        let posts = YAML.parse(yaml);
        let totalPages = Math.ceil(posts.length / numPosts);

        // End
        let pg = getPageNumber();

        if (pg > 1) {
            $(`<div style="float:left"><a href="?p=${pg - 1}">Newer</a></div>`).prependTo("#content");
        }
        if (pg < totalPages) {
            $(`<div style="float:right"><a href="?p=${pg + 1}">Older</a></div>`).prependTo("#content");
        }
        $(`<hr style="clear: both" />`).prependTo("#content");

        for (var i = (startPage + 1) * numPosts - 1; i >= startPage * numPosts; i--) {
            if (!posts[i]) continue;

            createPost(posts.length-i, posts[i]).prependTo("#content");

            $(`<hr style="clear: both" />`).prependTo("#content");
        }

        // Remove top hr
        $("#content").children()[0].remove();

        // Add click events
        $(".post").click(function() {
            var id = $(this).data("postid");        
            window.location = "/blog-post.html?post=" + id;
        });
    });
}