

## Next steps (with more time):

### Details page for each Pokemon
* I might use Gatsbyjs to take advantage of built-in features like pre-fetching and route-based code splitting for performance, image optimization across devices.

### State reflected in URL
* reflect filter selections as parameters in the URL
* people may like to bookmark and share search results

### CSS
* implement all CSS as Tailwind utility classes. I'm warming up to the [benefits](https://tailwindcss.com/docs/utility-first) of this approach.
  * for the challenge, I think vanilla CSS is more clear (pretending I'm working with a team that has not decided to use Tailwindcss)

### The table
* pagination - solves filters not in viewport when you scroll and larger data set
* columns
  * maybe add more fields that would benefit from comparison among Pokemon
* more colorful and fun
* clear all filters button
* responsive - TBD: technical data at work is most often viewed on full-size screens, so it may not make sense to constrain the eventual richness of the UI to accommodate all device screen sizes.
* no results message

### Data fetching
* axios if the data were dynamic
* GraphQL endpoint if the data were huge

### Performance
* check perf in case data grows
* react-table docs suggest useMemo which may be unnecessary optimization, always test perf before optimizing to avoid making things unnecessarily worse
  * react-table docs said to useMemo, so I did for this challenge. todo: investigate



