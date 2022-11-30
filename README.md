CIO Race condition test
=======================

To install:
- clone this repo
- run `npm install`

To repro:

This will run the test six times, since it doesn't happen every time.
```
TRACKING_SITE_ID=<SITE_ID> TRACKING_API_KEY=<API_KEY> node ./index.js 
```

To prevent the repro from happening, add the WAIT env flag:
```
WAIT=true TRACKING_SITE_ID=<SITE_ID> TRACKING_API_KEY=<API_KEY> node ./index.js 
```


