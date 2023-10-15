let TGCommon = 
{
    /****************************************************************************/
    /*      Nav links - used to populate the navbar and to route users */
    /****************************************************************************/
    NavigationLinks:
    [
        { title: "Home",        tag: "",            href: "/",         url: "/about.html" },
        { title: "Games",       tag: "#games",      href: "/games",   url: "/games.html" },
        { title: "Assets",      tag: "#assets",     href: "/assets",  url: "/assets.html" },
        { title: "Contact Us",  tag: "#contact",    href: "/contact", url: "/contact.html" }, 
    ],

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
            //cache: false,
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

        this.NavigationLinks.forEach(link => 
        {
            let liEl = $('<li class="nav-item"></li>');
            
            let linkEl = $('<a class="nav-link" href="' + link.href + '"></a>');
            linkEl.text(link.title);

            $(linkEl).on('click', () => { TGCommon.GoTo(link.url); return false; });
            liEl.append(linkEl);        
        
            liEl.appendTo("#nav-links");
        });
        $('<br/>').appendTo("#nav-links");
    },

    /****************************************************************************/
    /*      Route the user to the right page */
    /****************************************************************************/
    HandleRouting: function()
    {
        const url = new URL(window.location);
        const target = TGCommon.NavigationLinks.find(l => l.tag == url.hash);
    
        if (target === undefined || target.url === undefined)
        {
            TGCommon.GoTo("404.html");
        }
        else
        {
            TGCommon.GoTo(target.url);
        }
    }
};


/****************************************************************************/
/*      On Page Load */
/****************************************************************************/
$(() => 
{
    // Setup navigation
    TGCommon.SetupNav();

    // Replace copyright year
    $("#year").text(new Date().getFullYear());

    // Work out where to go based on url
    TGCommon.HandleRouting();

    // GA call
    TGCommon.FireAnalytics('UA-86306734-3');
});
