
2020-03-05:15:30 updated with better code documentation

[**CodeSandbox**](https://codesandbox.io/s/github/mcdevv/data-display-challenge)

[**Netlify**](https://peaceful-kepler-6d4a4f.netlify.com/)

## Next steps would be:

### Details page for each Pokemon
* I might use Gatsbyjs to take advantage of built-in features like pre-fetching and route-based code splitting for performance, image optimization across devices.

### State reflected in URL
* reflect filter selections as parameters in the URL
* people may like to bookmark and share search results
* bonus: describe filters in the document title tag (for bookmarks)

### CSS
* implement all CSS as Tailwind utility classes. I'm warming up to the [benefits](https://tailwindcss.com/docs/utility-first) of this approach.
  * for this exercise, using vanilla CSS 

### The table
* pagination - solves filters not in viewport when you scroll and larger data set
* columns
  * maybe add more fields that would benefit from comparison among Pokemon
* more colorful and fun
* "clear all filters" button
* responsive - TBD: technical data at work is most often viewed on full-size screens, so it may be worth the effort to constrain the eventual richness of the UI to accommodate small device screen sizes.
* "no results" message

### Data fetching
* axios if the data were dynamic
* GraphQL endpoint if the data were huge

### Performance
* check perf in case data grows
* react-table docs suggest useMemo which may be unnecessary optimization. Always test perf before optimizing to avoid making things unnecessarily worse by over-optimizing
  * react-table docs said to useMemo, so I did so for this exercise. todo: investigate further

### In-context help and tutorial/tour
* tooltips to answer predictable questions and common user questions
* ex: describe the fuzzy search on the first column
* ex: anything confusing in the data itself

### Check code clarity and naming conventions
* re-visit after a few days with fresh eyes

