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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */

const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
  // TODO
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
    arr.push(x.package.date);
  }

  var orderedDates = arr.sort(function (a, b) {
    return Date.parse(a) - Date.parse(b);
  });

  for (const y of packages) {
    if (y.package.date === orderedDates[0]) {
      name = y.package.name;
    }
  }

  return name;
};
