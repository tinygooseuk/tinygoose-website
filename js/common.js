function getYear() {
    return new Date().getFullYear();
}

function getJoesAge() {
    let diff = new Date() - new Date("1990/08/20");

    return Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
}

function getArgString() {
    return window.location.href.indexOf('?') != -1 ? window.location.href.split('?')[1] : "";
}
function getArgs() {
    let argList = getArgString().split("&");

    var obj = {};
    argList.forEach(function(arg) { obj[arg.split('=')[0]] = arg.split('=')[1]; });
    return obj;
}
function go(page) {
    let content = $("#page");
    content.addClass("hidden");

    $.ajax( {
        url: page,
        type: "GET",
        cache: false,
        success: function(html) {
            content.empty();
            content.html(html);
            content.removeClass("hidden");
        }
    });   
}

$(() => {
    // Setup nav
    let navRoot = `<!-- NAV -->
        <nav>
            <a id="banner-link" href="/">
                <span id="banner-logo"></div>
            </a>
            
            <ul id="nav-links" />                                                    
        </nav>`;
    $("#wrapper").prepend($(navRoot));

    const links = [
        { title: "Home", url: "/about.html" },
        { title: "Games", url: "/games.html" },
        { title: "Assets", url: "/assets.html" },
        { title: "Contact Us", url: "/contact.html" }, 
    ];

    links.forEach(link => {
        let liEl = $('<li class="nav-item"></li>');
        
        let linkEl = $('<a class="nav-link" href="#"></a>');
        linkEl.text(link.title);

        $(linkEl).on('click', ()=>{
            go(link.url);         
        });
        liEl.append(linkEl);        
       
        liEl.appendTo("#nav-links");
    });
    $('<br/>').appendTo("#nav-links");

    // Fire analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-86306734-3', 'auto');
    ga('send', 'pageview');    
});
