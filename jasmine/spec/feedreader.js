$(function () {

    describe('RSS Feeds', function () {
        //make sure all RSS feeds are defined
        //and it has objects
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        //looping through all the feeds and making sure all the links are defined and present
        it('loops through allfeeds', function () {
            allFeeds.forEach(function (obj) {
                expect(obj.url).toBeDefined();
                expect(obj.url.length).toBeGreaterThan(0);
            })
        })
        
        //looping through the feeds and make sure names are present.
        it('name defined in feeds', function () {
            allFeeds.forEach(function (obj) {
                expect(obj.name).toBeDefined();
                expect(obj.name.constructor).toBe(String);
            })
        })
    });


    describe('The menu', function () {
        //cheking whether the menu is hidden by defualt or not
        const menu = document.querySelector('.menu-hidden');
        const clickableMenu = document.querySelector('.menu-icon-link');
        it('menu hidden', function () {

            expect(menu.classList.contains('menu-hidden')).toBe(true);
        })

        //cheking the visibility of menu upon user clicking the menu button
        it('visibility of menu', function () {

            var simulateClick = function (elem) {
                // Create our event (with options)
                var evt = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                // If cancelled, don't dispatch our event
                var canceled = !elem.dispatchEvent(evt);
            };


            simulateClick(clickableMenu);

            expect($('body').hasClass('menu-hidden')).toBe(false);

            simulateClick(clickableMenu);

            expect($('body').hasClass('menu-hidden')).toBe(true);


        });
    });

    describe('Initial Entries', function () {


        //cheking whether the loading the feed is complete or not
        beforeEach(function(done) {
            loadFeed(0, function () {
                done();
            })
        });

        //once feed is loaded check whether the entries exist or not and have values
        it('load Feed', function () {
            const entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function () {

        //cheking whether the feeds are in correct places or not
        var firstfeed, secondFeed;
        beforeEach(function (done) {
            loadFeed(1, function () {

                firstfeed = document.querySelector('.feed').innerHTML;

                loadFeed(0, function () {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                })
            })
        });

        //making sure all the feeds are not same
        it('changing content', function () {
            expect(firstfeed).not.toBe(secondFeed);
        });

    });

})();