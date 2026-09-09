import { writeFileSync } from "node:fs"

const siteBasePath = "/digital-banking/"

const fallbackHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ucb_officewebsite</title>
    <script>
      var base = ${JSON.stringify(siteBasePath)};
      var path = location.pathname;
      if (path.indexOf(base) === 0) {
        path = "/" + path.slice(base.length);
      }
      location.replace(base + "#" + path + location.search + location.hash);
    </script>
  </head>
  <body></body>
</html>
`

writeFileSync("dist/404.html", fallbackHtml)
