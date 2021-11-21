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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const fetch = require('node-fetch');

module.exports = async function organiseMaintainers() {
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
    for (const w of x.package.maintainers) {
      arr.push(w.username);
    }
  }

  const newArr = [...new Set(arr)];

  let maintainers = [];
  for (const z of newArr) {
    let obj = { username: '', packageNames: [] };
    obj.username = z;
    for (const y of packages) {
      if (y.package.maintainers.find(({ username }) => username === z)) {
        obj.packageNames.push(y.package.name);
        obj.packageNames.sort();
      }
    }
    maintainers.push(obj);
    maintainers.sort();

    function compare(a, b) {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    }

    maintainers.sort(compare);
  }
  return maintainers;
};
