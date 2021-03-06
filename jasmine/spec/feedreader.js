/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it("url defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).toBeGreaterThan(0);
          expect(feed.url).toContain("http");
        });
      });

      /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("name defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).toBeGreaterThan(0);
        });
      });
    });

    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", function() {
      /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
      it("menu hidden by default", function() {
        let getBody = document.querySelector("body");

        expect(getBody.classList.contains("menu-hidden")).toBe(true);
      });

      /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

      // My original solution using an eventListener. Your thoughts on this?

      // it('menu toggle', function () {
      //   let getBody = document.querySelector("body");
      //   let getMenuIcon = document.querySelector(".menu-icon-link");
      //   let checkClick = false;
      //
      //   getMenuIcon.addEventListener('click', function() {
      //     if(checkClick == false) {
      //       checkClick = true;
      //   } else {
      //     checkClick = false;
      //   }
      // })
      //
      // if (checkClick == true) {
      //   expect(getBody.classList.contains('menu-hidden')).not.toBe(true);
      // }
      // if (checkClick == false) {
      //   expect(getBody.classList.contains('menu-hidden')).toBe(true);
      // }
      // });

      it("menu toggle", function() {
        let getBody = document.querySelector("body");
        let getMenuIcon = document.querySelector(".menu-icon-link");
        let checkClick = false;

        getMenuIcon.dispatchEvent(new Event("click"));
        expect(getBody.classList.contains("menu-hidden")).not.toBe(true);

        getMenuIcon.dispatchEvent(new Event("click"));
        expect(getBody.classList.contains("menu-hidden")).toBe(true);
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it("feed container not empty", function(done) {
        let feedContainer = document.querySelector(".feed");
        let entries = feedContainer.querySelectorAll(".entry");

        expect(entries.length).not.toBe(0);
        done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    // This suite contains a nested suite which loads new feeds and checks if the
    // new entries are different from the ones loaded by default.

    describe("New Feed Selection", function() {
      let feeds = "";

      /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      // This afterEach in order to reset to default feed
      afterEach(function() {
        loadFeed(0);
      });

      it("function", function(done) {
        feeds = document.querySelector(".feed").querySelector("a").innerHTML;
        expect(feeds).toBeDefined();
        done();
      });

      describe("load next feeds", function() {
        let newFeeds = "";

        beforeEach(function(done) {
          loadFeed(1, function() {
            done();
          });
        });

        it("new feed loaded", function(done) {
          newFeeds = document.querySelector(".feed").querySelector("a")
            .innerHTML;
          expect(feeds).not.toEqual(newFeeds);
          done();
        });
      });
    });
  })()
);
