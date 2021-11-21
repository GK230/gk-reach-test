/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */
 
const fetch = require('node-fetch');

module.exports = async function countMajorVersionsAbove10() {
  const response = await fetch(
    'http://ambush-api.inyourarea.co.uk/ambush/intercept',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: 'https://api.npms.io/v2/search/suggestions?q=react',
        method: 'GET',
        return_payload: true,
      }),
    },
  );
  let packages = await response.json();
  packages = packages.content;

  let arr = [];

  for (const x of packages) {
    arr.push(x.package.version);
  }

  const newArr = [];
  for (let versions of arr) {
    versions = versions.slice(0, 2);
    versions = parseInt(versions);
    if (versions > 10) newArr.push(versions);
  }

  count = newArr.length;

  return count;
};
