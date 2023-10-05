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
        { title: "Home", url: "/" },
        { title: "Games", url: "/games.html" },
        { title: "Assets", url: "/assets.html" },
        { title: "Contact Us", url: "/contact.html" }, 
    ];

    links.forEach(link => {
        let linkEl = $('<a class="nav-link"></a>');
        linkEl.attr("href", link.url);
        linkEl.text(link.title);
        
        let liEl = $('<li class="nav-item"></li>');
        linkEl.appendTo(liEl);
       
        liEl.appendTo("#nav-links");
    });
    $('<br/>').appendTo("#nav-links");

    // Add footer
    let footer = `
        <div id="footer">
            <!-- FOOTER -->
            <div style="clear:both"></div>
                
            <hr />

            &copy;2016-${getYear()} TinyGoose Ltd. All rights reserved.
            <br />
            TinyGoose Limited is a company registered in England & Wales with company number 10285773.
        </div>
    `;
    $(footer).appendTo("#content");

    // Fire analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-86306734-3', 'auto');
    ga('send', 'pageview');    
});
