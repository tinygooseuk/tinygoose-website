function getJoesAge() {
    let diff = new Date() - new Date("1990/08/20");

    return Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
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
      // Fire analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-86306734-3', 'auto');
    ga('send', 'pageview');    
});
