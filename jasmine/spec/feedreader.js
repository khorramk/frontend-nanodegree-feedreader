$(function () {

    describe('RSS Feeds', function () {

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });



        it('loops through allfeeds', function () {
            allFeeds.forEach(function (obj) {
                expect(obj.url).toBeDefined();
                expect(obj.url.length).toBeGreaterThan(0);
            })
        })


        it('name defined in feeds', function () {
            allFeeds.forEach(function (obj) {
                expect(obj.name).toBeDefined();
                expect(obj.name.constructor).toBe(String);
            })
        })
    });


    describe('The menu', function () {



        const menu = document.querySelector('.menu-hidden');
        const clickableMenu = document.querySelector('.menu-icon-link');
        it('menu hidden', function () {

            expect(menu.classList.contains('menu-hidden')).toBe(true);
        })

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


            expect(menu.classList.contains('menu-hidden')).toBe(false);


            simulateClick(clickableMenu);


            expect(menu.classList.contains('menu-hidden')).toBe(true);




        });
    });
    describe('Initial Entries', function () {




        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            })
        });
        it('load Feed', function () {
            const entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function () {

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

        it('changing content', function () {
            expect(firstfeed).not.toBe(secondFeed);
        });

    });

})();