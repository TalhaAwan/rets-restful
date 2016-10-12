# rets-restful

A nodejs code to connect to RETS (Real Estate Transaction Standard) servers restfully and search the records.

## Usage
1. Clone
2. Move to the directory and `npm install`
3. Provide the rets username, password, login URL, and query(search) URL in config.json
4. Complete the query URL in index.js file according to the requirements of your provider (SearchType, Class, Query, Limit, Count etc)
5. Run `node index`
