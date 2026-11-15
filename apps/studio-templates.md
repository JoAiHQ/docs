# Studio templates

A **template** is a Studio [element](/apps/studio#elements) of type `template`: a fixed layout, stored as JSON, that JoAi renders into a PNG from your content. No AI is involved in the render, so the same content always gives the same image — ideal for recurring social posts (events, quotes, numbers, photo posts) that must look on-brand every time.

This page is the complete reference for building templates and turning them into posts. For Studio in general see [Studio](/apps/studio); for publishing see [Social Media](/apps/social).

## How it fits together

| Concept | What it is |
| --- | --- |
| **Template element** | The base layout: size, colour tokens, content fields, fonts, sample content and the node tree (`spec`) |
| **Variation** | A saved, reusable variant of the template — a post type or format. Stores a partial definition in `overrides` (for example another `size` or `root`) and gets a rendered image right away. Content values are supplied when rendering a project, not stored on the variation |
| **Content values** | The text, numbers and image URLs filled into the template's fields for one post |
| **Project** | Optional. A Studio image project pinned to one template variation, with `mode` (light / dark) and `values`; producing it renders the still, exporting it creates an **export** |
| **Export** | The rendered still(s) of a project, with a permanent share page. Usable as a Social Media source (`exportId`) |
| **Social post** | A draft in the Social Media queue. Built from a variation (`elementVariationId`) or an export (`exportId`); JoAi copies the images onto the post |

Rendering is free of AI image credits. AI image generation (for the other element types) and **Regenerate definition with AI** use your plan's allowances.

## Template definition

The definition is the element's `spec`:

```json
{
  "version": 1,
  "size": { "width": 1080, "height": 1350 },
  "tokens": { "light": { … }, "dark": { … } },
  "fields": [ … ],
  "fonts": [ … ],
  "sample": { … },
  "root": { … }
}
```

| Key | Required | Rules |
| --- | --- | --- |
| `version` | yes | Always `1` |
| `size` | yes | `{ "width", "height" }` in pixels, integers from 64 to 4096. This is the output size |
| `tokens` | no | Design tokens per mode: `{ "light": { "name": "value" }, "dark": { … } }`. Values are strings (max 512 chars) and may contain placeholders such as <span v-pre>`{{brand.accent}}`</span> |
| `fields` | no | Up to 30 content fields (see [Fields](#fields)) |
| `fonts` | no | Up to 8 custom font files (see [Fonts](#fonts)) |
| `sample` | no | Sample values keyed by field key. Used for previews and as defaults when a render omits a value; explicit values always win |
| `root` | yes, to render | The root node of the layout tree (see [Nodes](#nodes)) |

Limits: at most **200 nodes** and **12 levels** of nesting.

### Fields

Each field declares one piece of content the caller fills in:

| Key | Rules |
| --- | --- |
| `key` | Required. Starts with a letter, then letters, digits or `_` (max 64). Referenced as <span v-pre>`{{key}}`</span> |
| `type` | Required. One of `text`, `richText`, `number`, `boolean`, `url`, `image`, `media`, `list`, `object`, `reference` |
| `label` | Optional display label (max 128). Without it the key is humanised (`photoCredit` → “Photo credit”) |
| `required` | Optional boolean |
| `maxLength` | Optional, 1–2000. Max characters for text values (default 2000) |
| `credit` | Optional boolean. Set `false` on an image field when images using it never need a credit node (for example a logo). Defaults to requiring a credit for content photos |

How values are validated when you render with explicit values:

| Type | Accepted value |
| --- | --- |
| `text`, `richText` | String up to `maxLength` |
| `number` | Number |
| `boolean` | `true` / `false` |
| `url` | Valid URL (max 2048) |
| `image`, `media`, `reference` | String (max 2048): a public image URL, or the **name of an image attached to the template element** (JoAi swaps in its URL) |
| `list`, `object` | Array / object. A list prints as comma-separated text; an object prints nothing |

In the Studio test form, `text`, `richText`, `number`, `boolean`, `url`, `image` and `media` fields get inputs; `list`, `object` and `reference` keep their sample values.

### Nodes

Every node has a `type`, an optional `style` and an optional `when`.

| Type | Extra keys | Renders |
| --- | --- | --- |
| `box` | `children` (array of nodes) | A flex container. Only boxes can have children |
| `text` | `text` (required), `maxLines`, `fit`, `wrap` | Text with placeholders. Renders nothing when the resolved text is empty |
| `image` | `src` (required), `grade` | An image from a URL or placeholder, optionally graded server-side. Renders nothing when the image is missing or cannot be loaded |
| `path` | `d` (required), `viewBox` (required), `stroke`, `strokeWidth`, `strokeDasharray`, `fill` | An inline SVG path for lines, routes and dividers |
| `credit` | `text` (required) | Photo credit text. Styled like text; it exists so JoAi can enforce credits (see [Photo credits](#photo-credits)) |

**`style`** is a subset of CSS that the renderer (Satori, flexbox only — no grid, no classes) supports. Values are strings or numbers (numbers are pixels) and may use placeholders. Allowed properties:

- Layout: `display`, `position`, `top`, `right`, `bottom`, `left`, `inset`, `flexDirection`, `flexWrap`, `flexGrow`, `flexShrink`, `flexBasis`, `flex`, `alignItems`, `alignSelf`, `alignContent`, `justifyContent`, `gap`, `rowGap`, `columnGap`
- Size: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `aspectRatio`, `overflow`
- Spacing: `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- Background: `background`, `backgroundColor`, `backgroundImage`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat`, `backgroundClip`
- Border: `border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderWidth`, `borderStyle`, `borderColor`, `borderRadius`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomRightRadius`, `borderBottomLeftRadius`
- Effects: `boxShadow`, `opacity`, `transform`, `transformOrigin`, `filter`, `objectFit`, `objectPosition`, `clipPath`. `filter` supports basic CSS filters for simple effects; for photo grading use `grade` instead. Blend modes such as `mixBlendMode` are not supported
- Text: `color`, `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `lineHeight`, `letterSpacing`, `textAlign`, `textTransform`, `textDecoration`, `textShadow`, `whiteSpace`, `wordBreak`, `textOverflow`, `lineClamp`

Any other property is rejected when you save. Boxes are `display: flex` by default.

**`when`** shows a node only if a placeholder has a value:

- `{ "has": "photo" }` — render only when `photo` resolves
- `{ "missing": "photo" }` — render only when it does not
- Both keys together must both hold

For `image` fields, <span v-pre>`{{asset.*}}`</span> and `brand.logo`, “has a value” means the image actually loaded. Use `when` to hide optional lines and their labels instead of leaving gaps.

**`maxLines`** (text only) clamps text without `fit` to that many lines. With `fit`, the size shrinks until the wrapped text fits instead.

**`fit`** (text only) auto-sizes long text. The starting size is `style.fontSize` — a number, a numeric string such as `"92"` or `"92px"`, or a token such as <span v-pre>`"{{token.headlineSize}}"`</span> — or the matching step:

```json
"fit": { "width": 936, "min": 56, "steps": [{ "over": 40, "fontSize": 84 }] }
```

| Key | Meaning |
| --- | --- |
| `width` | Available width in px (usually canvas width minus horizontal padding) |
| `min` | Smallest font size allowed |
| `steps` | Optional. Once the text is longer than `over` characters, start at `fontSize` instead |
| `em` | Optional override for the average glyph width in em. The renderer measures the real loaded font by default and falls back to an estimate when no loaded font matches |

The renderer resolves placeholders first, then measures the effective text style. `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `letterSpacing` and `textTransform` are inherited from parent boxes; the node's own style wins. It greedily wraps words into lines of `fit.width` per paragraph — an explicit `\n` starts a new paragraph, and every paragraph counts as at least one line — and steps down until the wrapped line count fits `maxLines`, never below `min`. A word that is wider than the box stays alone on its line. Fitted text nodes also default to `flexShrink: 0`, so a tight flex column cannot squeeze the headline. Use a no-break space inside numbers or short groups that must not wrap (for example `1 250`). To render explicit `\n` breaks, also set `whiteSpace: "pre-line"`.

**`wrap: "balance"`** (text only) evens out a short multi-line headline. It is opt-in, and a headline that already fits on one line is left exactly as it is, so centered text is not shifted or clipped:

```json
{ "type": "text", "text": "{{headline}}", "maxLines": 2, "fit": { "width": 936, "min": 56 }, "wrap": "balance", "style": { "fontSize": 104, "textAlign": "center" } }
```

The renderer inserts balanced breaks at the final font size and sets `whiteSpace: "pre-line"`. Lines have no trailing spaces and center correctly. Balance needs a numeric `fit.width` or `style.width`; without one it does nothing.

**`grade`** (image only) grades a photo on the server before it goes into Satori:

```json
{ "type": "image", "src": "{{photo}}", "grade": { "brightness": 1.05, "contrast": 1.1, "saturate": 0.9, "grayscale": 0, "tint": "{{token.accent}}", "tintOpacity": 0.2 }, "style": { "objectPosition": "{{photoFocus}}" } }
```

| Key | Default | Meaning |
| --- | --- | --- |
| `brightness` | `1` | Multiplier; `1.05` is slightly brighter |
| `contrast` | `1` | Multiplier around mid-grey |
| `saturate` | `1` | Colour saturation multiplier; `0.9` is slightly muted |
| `grayscale` | `0` | `0`–`1`; `1` is fully grayscale |
| `tint` | none | Colour tint, usually a token or brand colour |
| `tintOpacity` | `1` | `0`–`1` strength of the tint |

All grade values may use placeholders. Grading is applied with sharp and the result is a PNG. If grading fails, the original image is used; WebP/AVIF that cannot be converted are treated as missing. `objectPosition` is a normal style value and may come from a field; an empty value falls back to `50% 50%`.

**`path`** draws an inline SVG path for routes, lines and dividers. Required `d` and `viewBox`; optional `stroke`, `strokeWidth`, `strokeDasharray` and `fill`. Placeholders work in every prop. Use the normal `style` for size and position:

```json
{ "type": "path", "d": "M0 0 H936", "viewBox": "0 0 936 4", "stroke": "{{token.accent}}", "strokeWidth": 2, "strokeDasharray": "2 10", "fill": "none", "style": { "width": 936, "height": 4 } }
```

Keep the path in a `viewBox` that matches its intended aspect ratio, then set `width`/`height` in the style. Paths are SVG, so they stay crisp at any size.

### Renderer limits

- Flexbox only: no CSS grid, classes, pseudo-elements or external stylesheets. Layouts are boxes plus `position: absolute` where needed.
- Text wraps automatically. Use `whiteSpace: "pre-line"` when you want explicit `\n` breaks in a normal text node (`wrap: "balance"` sets it for you).
- No CSS `text-wrap`; use `wrap: "balance"`.
- No blend modes: `mixBlendMode` and similar properties are rejected when saving. CSS `filter` works for simple effects; use `grade` for photos so the result is baked into the image.
- Fonts must be TTF, OTF or WOFF and declared in `fonts` (or one of the bundled families). WOFF2 is skipped.
- Satori falls back glyph-by-glyph across all loaded fonts. If no loaded font has a glyph, it may render a fallback or a missing-glyph box, so attach a font that covers unusual symbols.
- Output is PNG (Social converts it to JPEG when Instagram needs it).

### Placeholders

Placeholders work in `text`, `src`, path props, `grade` values, style values, token values and font `src`:

| Placeholder | Resolves to |
| --- | --- |
| <span v-pre>`{{fieldKey}}`</span> | The content value of that field |
| <span v-pre>`{{mode}}`</span> | `light` or `dark` |
| <span v-pre>`{{token.name}}`</span> | The token `name` for the current mode |
| <span v-pre>`{{brand.background}}`</span> · <span v-pre>`{{brand.foreground}}`</span> · <span v-pre>`{{brand.label}}`</span> · <span v-pre>`{{brand.accent}}`</span> | Team brand colours (see [Branding](#branding)) |
| <span v-pre>`{{brand.logo}}`</span> | The team brand logo URL |
| <span v-pre>`{{asset.name}}`</span> | URL of the image (or font) named `name` attached to the template element |

Placeholders nest and resolve inside out, for example <span v-pre>`{{asset.background-{{mode}}}}`</span> picks `background-light` or `background-dark`. Unknown placeholders resolve to empty text.

## Branding

Templates should take colours from the team brand instead of hard-coding them. Set the brand under **Team settings → Branding**: **Background**, **Foreground**, **Label** and **Accent**. The logo comes from the team's branding (the team logo while no branding has been saved).

When a team has not set a colour, JoAi fills in a neutral default so brand-based templates stay legible:

| Placeholder | Default |
| --- | --- |
| `brand.background` | `#FFFFFF` |
| `brand.foreground` | `#18181B` |
| `brand.label` | `#71717A` |
| `brand.accent` | `#71717A` |
| `brand.logo` | none — hide logo nodes with `"when": { "has": "brand.logo" }` |

Route every colour through `tokens` and reference them with <span v-pre>`{{token.*}}`</span> in styles. Then light and dark mode, and any team's brand, work without touching the tree.

## Light and dark mode

Every render runs in `light` or `dark` mode (default `light`). The mode picks which `tokens` set applies and fills <span v-pre>`{{mode}}`</span>. The starters use the brand colours as set for light and swap background and foreground for dark:

```json
"tokens": {
  "light": { "bg": "{{brand.background}}", "fg": "{{brand.foreground}}", "label": "{{brand.label}}", "accent": "{{brand.accent}}" },
  "dark":  { "bg": "{{brand.foreground}}", "fg": "{{brand.background}}", "label": "{{brand.label}}", "accent": "{{brand.accent}}" }
}
```

Where the mode applies:

- **Studio test panel** — toggle **Light** / **Dark**
- **Projects** — `template.mode` (`light` or `dark`)
- **Variations** — a `mode` (`light`, default, or `dark`) set when creating or updating a variation; re-rendering the variation keeps that mode. A project pinned to the variation uses the project's `mode`. A variation with `mode: "dark"` renders dark without needing a project.

## Fonts

Two families are bundled: **Montserrat** (the default) and **Mona Sans**, each in weights **400, 700 and 800**, normal style. Emoji render as Twemoji.

Custom fonts are declared in `fonts` and used via `style.fontFamily`:

```json
"fonts": [{ "family": "Brand Sans", "src": "https://…/BrandSans-Bold.ttf", "weight": 700, "style": "normal" }]
```

| Key | Rules |
| --- | --- |
| `family` | Required, max 64. The name you use in `fontFamily` |
| `src` | Required. URL of a **TTF, OTF or WOFF** file (not WOFF2), or a placeholder like <span v-pre>`{{asset.brand-font}}`</span> |
| `weight` | Optional `100`–`900` in steps of 100 (default 400) |
| `style` | Optional `normal` / `italic` |

Every `fontFamily` in the tree must be bundled or declared, otherwise saving fails. A declared font that cannot be downloaded (or takes longer than 10 seconds) is skipped and the text falls back to Montserrat. In the app, upload the font file to the team media library first, then pick it under the template definition's font list.

### Glyphs and uppercase

Satori falls back glyph-by-glyph across every loaded font. If none of them has a character, it may draw a fallback or a missing-glyph box, so load a family that covers unusual symbols (for example a mono font for `●`). The fit measurement follows the same fallback order.

With `textTransform: "uppercase"`, the renderer replaces `ß` with `ẞ` (U+1E9E) and uppercases the text when a loaded font has that glyph; otherwise Satori's uppercase result is `SS`. Most bundled and Latin brand fonts have `ẞ`.

## Starters

New template elements can start from a neutral starter (**Start from** in the create dialog). All use 1080 × 1080, brand tokens for light/dark and the team logo when present:

| Starter | Fields | Layout |
| --- | --- | --- |
| **Event** | `title` (required, 60), `date` (required, 40), `location` (60) | Logo, accent date, large auto-fitted title (max 3 lines), optional location — bottom-aligned |
| **Quote** | `quote` (required, 220), `author` (60) | Large accent quotation mark, auto-fitted quote (max 6 lines), optional author — centred |
| **Stat** | `value` (required, 12), `label` (required, 90) | Logo, one huge accent number (1 line), label (max 3 lines) — centred |
| **Photo** | `photo` (image, required), `caption` (90), `credit` (60) | Full-bleed photo, caption block and credit on brand-coloured labels |
| **Blank** | none | Empty definition to fill yourself |

Starters are a starting point — change size, fields and tree to fit the post type.

## Images

Image nodes accept PNG, JPEG, GIF, SVG, WebP and AVIF. WebP and AVIF are converted to PNG automatically with sharp before Satori sees them; other formats, or an image that takes longer than 10 seconds, are treated as missing. Use images at least as large as the canvas (for example 1080 × 1350) with `objectFit: "cover"`, and avoid upscaled or heavily compressed sources. For photo grading and per-photo focus, use `grade` and a field-driven `objectPosition` as shown under [Nodes](#nodes).

## Photo credits

If an `image` node's `src` uses a content field (a photo supplied per post, as opposed to <span v-pre>`{{brand.logo}}`</span>, <span v-pre>`{{asset.*}}`</span> or tokens), the template **must contain a `credit` node**; saving fails otherwise. Give it a credit field and guard it with `when`, as in the Photo starter.

A brand or logo image field can opt out of the credit requirement with `"credit": false`:

```json
{ "key": "logo", "type": "image", "credit": false }
```

An image that only uses `credit: false` fields (typically the team's own logo or asset) needs no credit node. As soon as the image references a content field without the opt-out, a credit node is required.

Rule for third-party photos (anything you did not create or own): credit the source **on the image** (credit field) **and in the post caption**. Leave the credit empty only for the team's own photos.

## Worked example

A 4:5 announcement post with an optional photo, credit, accent date, auto-fitted headline and logo:

```json
{
  "version": 1,
  "size": { "width": 1080, "height": 1350 },
  "tokens": {
    "light": { "bg": "{{brand.background}}", "fg": "{{brand.foreground}}", "accent": "{{brand.accent}}", "scrim": "rgba(0,0,0,0.55)" },
    "dark": { "bg": "{{brand.foreground}}", "fg": "{{brand.background}}", "accent": "{{brand.accent}}", "scrim": "rgba(0,0,0,0.7)" }
  },
  "fields": [
    { "key": "headline", "type": "text", "label": "Headline", "required": true, "maxLength": 70 },
    { "key": "date", "type": "text", "label": "Date", "maxLength": 40 },
    { "key": "photoFocus", "type": "text", "label": "Photo focus (for example 50% 30%)", "maxLength": 32 },
    { "key": "photo", "type": "image", "label": "Photo" },
    { "key": "photoCredit", "type": "text", "label": "Photo credit", "maxLength": 60 }
  ],
  "sample": { "headline": "A short, concrete headline", "date": "Saturday, 18:00", "photoFocus": "50% 35%" },
  "root": {
    "type": "box",
    "style": { "width": "100%", "height": "100%", "position": "relative", "flexDirection": "column", "backgroundColor": "{{token.bg}}", "color": "{{token.fg}}" },
    "children": [
      { "type": "image", "src": "{{photo}}", "when": { "has": "photo" }, "grade": { "brightness": 1.03, "contrast": 1.08, "saturate": 1.05, "tint": "{{brand.accent}}", "tintOpacity": 0.1 }, "style": { "width": "100%", "height": 810, "objectFit": "cover", "objectPosition": "{{photoFocus}}" } },
      { "type": "credit", "text": "Photo: {{photoCredit}}", "when": { "has": "photoCredit" }, "style": { "position": "absolute", "top": 762, "right": 24, "fontSize": 22, "color": "#FFFFFF", "backgroundColor": "{{token.scrim}}", "padding": "4px 10px" } },
      {
        "type": "box",
        "style": { "flexDirection": "column", "flexGrow": 1, "justifyContent": "flex-end", "padding": 72, "gap": 24 },
        "children": [
          { "type": "text", "text": "{{date}}", "when": { "has": "date" }, "style": { "fontSize": 36, "fontWeight": 700, "color": "{{token.accent}}" } },
          { "type": "path", "d": "M0 0 H936", "viewBox": "0 0 936 4", "stroke": "{{token.accent}}", "strokeWidth": 2, "strokeDasharray": "2 10", "fill": "none", "style": { "width": 936, "height": 4 } },
          { "type": "text", "text": "{{headline}}", "maxLines": 3, "fit": { "width": 936, "min": 56, "steps": [{ "over": 40, "fontSize": 84 }] }, "wrap": "balance", "style": { "fontSize": 104, "fontWeight": 800, "lineHeight": 1.05 } },
          { "type": "image", "src": "{{brand.logo}}", "when": { "has": "brand.logo" }, "style": { "height": 56, "objectFit": "contain", "alignSelf": "flex-start" } }
        ]
      }
    ]
  }
}
```

Content values for one post:

```json
{ "headline": "Summer opening hours start Monday", "date": "From 1 July", "photoFocus": "50% 25%", "photo": "https://example.com/photo.jpg", "photoCredit": "Jane Doe" }
```

The photo is graded once and focused per post with `photoFocus`; the headline uses real-font fit plus balance, and the path draws a dashed divider. The credit is required because `photo` is a content image. A brand logo image (<span v-pre>`{{brand.logo}}`</span> or a field with `"credit": false`) needs no credit. Without `photo` the image and credit disappear and the text block fills the canvas. A Story variant of the same template only needs `{ "size": { "width": 1080, "height": 1920 } }` as overrides if the tree uses flex and percentages — keep the width at 1080 so pixel values like `fit.width` stay correct.

## Variations

A variation stores `overrides`: a partial definition with any of `size`, `tokens`, `fields`, `fonts`, `sample`, `root` (`version` is not allowed). Overrides replace **whole top-level keys** — an overridden `sample` replaces every sample value, an overridden `root` replaces the whole tree.

Variations are reusable design presets, not event records. Content values belong to the **project** that renders the variation, so one Event template can have a Feed variation and a Story variation and render many different events through them.

Use variations for post types and formats of one design: a square feed post, a 4:5 portrait, a 9:16 Story, or a version without photo.

- Creating a variation renders its image immediately (with the merged `sample` as content, in the variation's `mode`, default `light`) and makes it the primary image.
- Editing a variation's overrides does not re-render it; **Regenerate** (or a new variation) does. Re-rendering a template variation **replaces** its previous image, so a variation always holds exactly one current image.
- `aspectRatio` has no effect on templates — the output size is `size`.

## Testing and previewing

In the app: **Studio → Elements →** your template.

1. **Template definition** — edit fields (key, type, label, max length, sample, required), add fonts, or edit the JSON directly, then **Save definition**. Validation errors (unknown style property, missing credit, unknown font, too many nodes) show when saving.
2. **Regenerate definition with AI** drafts a definition from the element description or a reference image (uses 1 message). Review it before saving.
3. **Test template** — pick **Base template** or a variation, fill in test content (image fields accept an upload or one of the element's images), toggle **Light** / **Dark**. The preview re-renders as you type and does not save anything.
4. **New template variation** — optional label and overrides JSON, then **Render**.
5. From a variation, **Schedule to Social** opens the Social Media composer with that image.

Over the REST API the same preview is `POST /teams/{team}/elements/{element}/render` or `…/variations/{variation}/render` with `{ "values": { … }, "mode": "light" | "dark" }`; it returns `{ imageBase64, mimeType }` and validates `values` against the fields. There is no MCP preview tool — render a variation and look at its image instead.

### Local render

Run the gen app on its port (`cd apps/gen && npm run dev`, default 3011) and the API with `APP_ENV=local`. `TemplateGateway` then posts to `http://localhost:3011/image/template`; both services must share the same `GEN_TOKEN`. From the API repo, render a template directly:

```php
$element = App\Domain\Project\Models\Element::where('type', 'template')->first();
$result = app(App\Domain\Project\Actions\RenderElementTemplateAction::class)
    ->execute($element, null, ['headline' => 'A real headline'], App\Domain\Project\TemplateMode::Light);
// $result['imageBase64'], $result['mimeType']
```

To preview a raw definition without saving an element, POST `{ "spec": …, "values": { … }, "mode": "light" }` to the gen route with `Authorization: Bearer <GEN_TOKEN>`. Stress-test each template once with the longest realistic value for every field (use its `maxLength`) before saving it.

## Workflow for agents

Install **Studio** (element and project tools; element tools also come with **Sites**) and **Social Media** (post tools). Confirm with `tools/list`.

1. **Find or create the template.** `list_elements` → reuse a `template` element if one fits. Otherwise `create_element` with `type: "template"` and a full `spec`. Ask the team to check it in the test panel before using it for real posts.
2. **Fill in real content.** Collect the actual facts (title, date, place, numbers, photo URL, credit). Respect each field's `maxLength`; leave optional fields out instead of inventing them.
3. **Render, export, and draft the post.**
   - **Pick the variation.** Use an existing Feed or Story variation. If you need a different layout or size, create it first with `generate_element_variation` and `overrides` (for example `{ "size": { "width": 1080, "height": 1920 } }`).
   - **Render a project.** `create_project` with `template: { elementVariationId, mode, values }`, where `values` are the event facts.
   - **Produce and export.** `studio_produce` → `studio_wait` with `targetStatus: "composed"` → `studio_export`. The export is the rendered artifact.
   - **Draft the post.** `create_social_post` with the export's `uuid` as `exportId`, plus `platform`, optional `format` and `body`.
4. **Hand over for approval.** Share the post's `shareUrl` preview and the caption. The draft stays a draft until a person approves scheduling it (via `create_social_post` / `update_social_post` with `scheduledAt`, or in `/social`). Never schedule or publish without that approval.

Notes:

- Project renders use `template.values`, with the definition's `sample` values as defaults for fields you leave out; explicit values win.
- A post from `elementVariationId` gets **every image of the variation** (primary first). Template variations hold one image; treat it as a design preview. For a specific event, render a project and use its export instead.
- Instagram needs JPEG: rendered PNGs are converted to JPEG automatically when attached (transparency becomes white).
- Images must be publicly reachable PNG, JPEG, GIF or SVG; WebP and AVIF are converted to PNG automatically. Images slower than 10 seconds are treated as missing.

## MCP tools

| Tool | Parameters | Notes |
| --- | --- | --- |
| `list_elements` | `team?` | Team element library; find `template` elements and their ids. `team` defaults to the connected agent's team |
| `create_element` | `name`, `type` (`character` · `environment` · `style` · `product` · `brand` · `template`), `description?`, `spec?`, `media?`, `team?` | For templates `spec` is the full definition. `media` is a list of team media IDs from `media_upload`; image names become <span v-pre>`{{asset.<name>}}`</span> placeholders |
| `update_element` | `elementId`, `name?`, `type?`, `description?`, `spec?`, `media?`, `team?` | For templates pass the **full** definition; it replaces the old one. `media` attaches team media IDs (adds to the element's existing media) |
| `delete_element` | `elementId`, `team?` | |
| `list_element_variations` | `elementId`, `team?` | Variations with labels, overrides and images |
| `generate_element_variation` | `elementId`, `overrides?`, `aspectRatio?`, `label?`, `mode?`, `team?` | Templates render instantly; other types generate an AI image in the background. `overrides` changes the design (size, root). `aspectRatio` (`1:1` default, `16:9`, `9:16`, `4:3`, `3:4`) applies to AI elements; `mode` (`light` default, `dark`) applies to templates; `label` names the variation |
| `update_element_variation` | `elementId`, `variationId`, `label?`, `aspectRatio?`, `mode?`, `overrides?`, `team?` | `{}` clears overrides. Does not re-render |
| `delete_element_variation` | `elementId`, `variationId`, `team?` | |
| `create_project` | `name`, `brief?`, `outputPreset?`, `targetPlatforms?`, `selectedSkills?`, `template?` `{ elementVariationId, mode?, values? }` | With `template` the project is an image project rendered from that variation. `outputPreset` is `9:16 social`, `16:9 launch` or `1:1 square teaser` |
| `studio_produce` / `studio_wait` / `studio_export` | `projectId` (`studio_wait` also `targetStatus`, `timeoutSeconds?`) | Template projects go straight to `composed`; the export holds the PNG |
| `create_social_post` | `platform`, `team`, `format?`, `body?`, one of `media` · `exportId` · `elementVariationId`, `draft?`, `scheduledAt?` | Omit `scheduledAt` and leave `draft` unset/true to keep a draft; `draft: false` schedules immediately. For a template render, pass the export `uuid` from `studio_export` as `exportId` |
| `update_social_post` | `socialPostId`, `body?`, `format?`, `media?`, `scheduledAt?`, `team` | Add `scheduledAt` to schedule it; scheduling needs approval |
| `media_upload` | `team`, `type` (`brand` · `reference` · `template` · `output`), `fileUrl` / `filePath` / `fileBase64`, … | Use the returned URL in image fields |

Template specs created through MCP can use `wrap: "balance"` on text, `grade` on images, `path` nodes (`d` plus `viewBox`) and `fields[].credit: false` for logo-only image fields.

All element tools accept an optional `team` slug; omit it to use the connected agent's team. Live schemas: `tools/list`. Attach images to an element (for <span v-pre>`{{asset.*}}`</span>) with the element's `media` on the REST API or the `media` parameter of `create_element` / `update_element`.

## Designing good images

**Brand, not skeleton.** Build each team's design language from its real brand sources: the website CSS colours, real font files, logo, real photos and signature motifs. Avoid reusing one generic skeleton across teams. Pick the formats that fit the business — event, result, product, service, team intro, offer — and keep templates generic through fields and tokens. Never bake text into images or hardcode per-post positions.

**Hierarchy.** One message per image. One dominant element (headline or number), one supporting line, logo small. Size steps should be clear — for example 104 / 36 / 22 px on a 1080 canvas rather than 48 / 40 / 36.

**Text length.** Write for the field, not the other way round: give every text field a `maxLength`, every headline `maxLines` plus `fit`, and keep captions out of the image. If the content does not fit, shorten it — do not shrink everything until it fits.

**Contrast in both modes.** Test light and dark, with and without photo, with the team brand and with the neutral defaults. Text on photos needs a scrim or a solid label behind it. Check that `brand.accent` is readable on both backgrounds.

**Spacing and alignment.** Generous padding (64–96 px on 1080 wide), one alignment axis, consistent `gap`. Use `position: absolute` only for overlays such as credits and logos.

**Real content only.** Never publish sample text, `Lorem ipsum`, `TBD`, invented dates, prices or quotes, or empty labels. Hide optional parts with `when` instead.

**Photos.** Use sharp photos at least as large as the canvas, `objectFit: "cover"`, and credit third-party photos on the image and in the caption.

**Sizes per platform** (recommended — JoAi does not enforce canvas sizes):

| Platform / format | Size |
| --- | --- |
| Instagram feed — portrait | 1080 × 1350 (4:5) |
| Instagram feed — square | 1080 × 1080 (1:1) |
| Instagram Story | 1080 × 1920 (9:16) — keep text away from the top and bottom ~250 px |
| Facebook / LinkedIn / X | 1080 × 1350 or 1080 × 1080; 1200 × 675 (16:9) for link-style landscape posts |

Instagram Shorts (Reels) need an MP4 video, so templates cannot be used for them.

## Writing the caption

- Open with the key fact or hook in the first line; that is what shows before “more”.
- Answer what, when, where and what to do next; the image and caption must agree.
- Write in the team's voice and the audience's language; keep it short.
- Add a clear call to action and only a few relevant hashtags.
- Credit third-party photos (for example “Photo: Name”).
- Stay within limits: X 280 characters, Instagram 2200, Facebook and LinkedIn 3000.
- Don't invent facts or use placeholders; if something is unknown, ask before drafting.

## Related

- [Studio](/apps/studio)
- [Social Media](/apps/social)
- [Teams](/teams) — branding
- [Workspace](/apps/files) — media library and font files
- [MCP](/protocols/mcp)
