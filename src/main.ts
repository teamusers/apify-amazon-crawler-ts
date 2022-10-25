// main.js
import { CheerioCrawler, KeyValueStore, log } from 'crawlee';
import { router } from './routes.js';

// Grab our keyword from the input
const { keyword = 'iphone' } = (await KeyValueStore.getInput()) ?? {} as any;

const crawler = new CheerioCrawler({
    requestHandler: router,
});

// Add our initial requests
await crawler.addRequests([
    {
        // Turn the inputted keyword into a link we can make a request with
        url: `https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=${keyword}`,
        label: 'START',
        userData: {
            keyword,
        },
    },
]);

log.info('Starting the crawl.');
await crawler.run();
log.info('Crawl finished.');