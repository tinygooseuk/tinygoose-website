let TGCommon = 
{
    /****************************************************************************/
    /*      Return Joe's age, in years */
    /****************************************************************************/
    GetJoesAge: function()
    {
        let diff = new Date() - new Date("1990/08/20");
        return Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
    },

    /****************************************************************************/
    /*      Load another page into the content pane */
    /****************************************************************************/
    GoTo: function(where)
    {
        let content = $("#page");
        content.addClass("hidden");
    
        $.ajax(
        {
            url: where,
            type: "GET",
            cache: false,
            success: function(html) 
            {
                content.empty();
                content.html(html);
                content.removeClass("hidden");
            }
        });
        
        //TODO: fire UA
    },

    /****************************************************************************/
    /*      Tracking */
    /****************************************************************************/
    FireAnalytics: function(uaCode)
    {
        // Fire analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
        ga('create', uaCode, 'auto');
        ga('send', 'pageview');    
    },

    /****************************************************************************/
    /*      Write the nav into the page */
    /****************************************************************************/
    SetupNav: function()
    {
        // Setup nav
        let navHTML = 
        `
            <a id="banner-link" href="/">
                <span id="banner-logo"></div>
            </a>
            
            <ul id="nav-links" />                                                       
        `;
        
        let nav = $("nav");
        nav.empty();
        nav.html($(navHTML));

        const links = 
        [
            { title: "Home",        tag: "",        url: "/about.html" },
            { title: "Games",       tag: "games",   url: "/games.html" },
            { title: "Assets",      tag: "assets",  url: "/assets.html" },
            { title: "Contact Us",  tag: "contact", url: "/contact.html" }, 
        ];

        links.forEach(link => 
        {
            let liEl = $('<li class="nav-item"></li>');
            
            let linkEl = $('<a class="nav-link" href="#' + link.tag + '"></a>');
            linkEl.text(link.title);

            $(linkEl).on('click', () => TGCommon.GoTo(link.url));
            liEl.append(linkEl);        
        
            liEl.appendTo("#nav-links");
        });
        $('<br/>').appendTo("#nav-links");
    }
};


/****************************************************************************/
/*      On Page Load */
/****************************************************************************/
$(() => 
{
    TGCommon.SetupNav();
    TGCommon.FireAnalytics('UA-86306734-3');
});
