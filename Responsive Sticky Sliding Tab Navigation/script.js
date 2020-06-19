class stickyNavigation {
    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;

        let self = this;

        $(".hero-tab").click(function() {
            self.onTabClick(event, $(this));
        });

        $(window).scroll(() => { this.onScroll(); });
        $(window).resize(() => { this.onResize(); });
    }

    onTabClick(event, element) {
        event.preventDefault();

        let scrollTop = $(element.attr("href")).offset().top - this.tabContainerHeight + 1;

        $("html, body").animate({ scrollTop : scrollTop }, 600);
    }

    onScroll() {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
    }

    onResize() {
        if(this.currentId) {
            this.setSliderCSS();
        }
    }

    checkTabContainerPosition() {
        let offset = $(".hero-tabs").offset().top + $(".hero-tabs").height() - this.tabContainerHeight;

        if($(window).scrollTop() > offset) {
            $(".hero-tabs-container").addClass("hero-tabs-container--top");
        } else {
            $(".hero-tabs-container").removeClass("hero-tabs-container--top");
        }
    }

    findCurrentTabSelector(element) {
        let newCurrentId;
        let newCurrentTab;
        let self = this;

        $(".hero-tab").each(function() {
            let id = $(this).attr("href");
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;

            if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });

        if(this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab; 

            this.setSliderCSS();
        }
    }

    setSliderCSS() {
        let width = 0;
        let left = 0;

        if(this.currentTab) {
            width = this.currentTab.css("width");
            left = this.currentTab.offset().left;
        }

        $(".hero-tab-slider").css("width", width);
        $(".hero-tab-slider").css("left", left);
    }
}

new stickyNavigation();