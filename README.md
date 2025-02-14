# The why

Updating my personal page always felt like a hassle, so I tried to make it easier.

This project turns `Markdown` files into a personal site with minimal effort. No manual HTML updates or overcomplicated CMS - just local `markdown` (straight from my Obsidian vault, but any source works), a script to fetch and process it, and the site builds itself using `Vue` and `unplugin-vue-markdown`. Clean, simple, and (I hope!) maintainable.

## Insights gained

I wanted the page to be fully responsive, supporting a minimum width of `320px` (though it can technically go a bit lower, I didn’t optimize for anything below that). At the same time, I aimed to meet `AA` accessibility standards by ensuring proper contrast, natural keyboard navigation, and screen reader-friendly properties from the start. Throughout this process, I picked up a few interesting insights:

### Non-native plugins added

Since my goal was to replicate the editing experience I have in Obsidian as closely as possible, I integrated some `markdown-it` plugins (which `unplugin-vue-markdown` relies on under the hood):

- `@mdit/plugin-attrs`: Enables custom attributes like `id`, `class`, and native HTML properties directly in markdown.
  ```md
  ## Heading {#custom-id .custom-class data-info="extra"}
  ```
- `@mdit/plugin-container`: Adds support for custom containers, which I primarily use for `<details>` elements to organize content like project descriptions.
  ```md
  ::: details Some title
  This would be hidden content inside a `<details>` tag.
  :::
  ```
- `@mdit/plugin-tasklist"`: Enables GitHub-style task lists using `- [ ]` syntax.
  ```md
  - [ ] Task example one
  - [x] Task example two
  ```

### CSS `clamp` property

This was a super handy reminder!
I’d played around with `clamp()` before, but this was the first time I really put it to work and it made responsiveness much easier. Instead of drowning in `@media` queries, I used `clamp()` to handle both font sizes and (most) of spacing dynamically, allowing the page adapt more _organically_ to different screen sizes and zoom levels.

### CSS `counter` property

I used the CSS `counter` property to automatically number the details cards, which gave a nice touch without needing extra markup or JavaScript. Instead of relying on the default markers, I removed them and used the counter to add a dynamic number in front of each summary. It’s a simple trick, but it really cleaned things up a bit.

### Form validation

I worked mostly with native HTML5 form validation, using properties like `minlength`, `pattern`, and pseudo-classes like `:invalid` and `:valid`. These helped handle the basic validation without needing extra JavaScript. The only time I used JavaScript was for `setCustomValidity()` when the input was empty, as the default validation wouldn’t trigger an error for that case. It was interesting to see how HTML5’s native form validation features continue to improve, making form validation a bit less tricky.

## Smarter, but Not Fuzzy: A (more) Practical Search Approach

Not a fuzzy search, just a slightly more flexible way to match skills by normalizing input and checking against skill names. Here’s the logic:

1. _Cleans up input_: Lowercases, removes non-alphabetic chars, numbers, and trims "js"/"ts" suffixes with regex. No weird edge cases allowed.
2. _Finds matches_: Uses `includes` to catch terms anywhere in the skill name.
3. _Trims the fat_: Prioritizes shorter matches and only keeps the shortest ones. This avoids searching for `react` and getting an overloaded list like `React/React Query/React Router`, ensuring the simplest match is returned first.
4. _Handles no matches_: If nothing fits, the input goes into a `noMatch` array.

For real fuzzy search, I could’ve used a library or implemented _Damerau-Levenshtein_ (or some other fancy algorithm), but for a simple project like this, keeping it lightweight and to the point just made more sense.
