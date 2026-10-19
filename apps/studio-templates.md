# Studio templates

A **template** is a Studio [element](/apps/studio#elements) of type `template`: a fixed layout, stored as JSON, that JoAi renders into a PNG from your content. No AI is involved in the render, so the same content always gives the same image — ideal for recurring social posts (events, quotes, numbers, photo posts) that must look on-brand every time.

This page is the complete reference for building templates and turning them into posts. For Studio in general see [Studio](/apps/studio); for publishing see [Social Media](/apps/social).

## How it fits together

| Concept | What it is |
| --- | --- |
| **Template element** | The base layout: size, colour tokens, content fields, fonts, sample content and the node tree (`spec`) |
| **Variation** | A saved variant of the template — a post type or format. Stores a partial definition in `overrides` (for example another `size`, `root` or `sample`) and gets a rendered image right away |
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
| `sample` | no | Sample values keyed by field key. Used for previews and whenever a variation renders without explicit values |
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
| `text` | `text` (required), `maxLines`, `fit` | Text with placeholders. Renders nothing when the resolved text is empty |
| `image` | `src` (required) | An image from a URL or placeholder. Renders nothing when the image is missing or cannot be loaded |
| `credit` | `text` (required) | Photo credit text. Styled like text; it exists so JoAi can enforce credits (see [Photo credits](#photo-credits)) |

**`style`** is a subset of CSS that the renderer (Satori, flexbox only — no grid, no classes) supports. Values are strings or numbers (numbers are pixels) and may use placeholders. Allowed properties:

- Layout: `display`, `position`, `top`, `right`, `bottom`, `left`, `inset`, `flexDirection`, `flexWrap`, `flexGrow`, `flexShrink`, `flexBasis`, `flex`, `alignItems`, `alignSelf`, `alignContent`, `justifyContent`, `gap`, `rowGap`, `columnGap`
- Size: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `aspectRatio`, `overflow`
- Spacing: `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `padding`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- Background: `background`, `backgroundColor`, `backgroundImage`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat`, `backgroundClip`
- Border: `border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderWidth`, `borderStyle`, `borderColor`, `borderRadius`, `borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomRightRadius`, `borderBottomLeftRadius`
- Effects: `boxShadow`, `opacity`, `transform`, `transformOrigin`, `filter`, `objectFit`, `objectPosition`, `clipPath`, `mixBlendMode`
- Text: `color`, `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `lineHeight`, `letterSpacing`, `textAlign`, `textTransform`, `textDecoration`, `textShadow`, `whiteSpace`, `wordBreak`, `textOverflow`, `lineClamp`

Any other property is rejected when you save. Boxes are `display: flex` by default.

**`when`** shows a node only if a placeholder has a value:

- `{ "has": "photo" }` — render only when `photo` resolves
- `{ "missing": "photo" }` — render only when it does not
- Both keys together must both hold

For `image` fields, <span v-pre>`{{asset.*}}`</span> and `brand.logo`, “has a value” means the image actually loaded. Use `when` to hide optional lines and their labels instead of leaving gaps.

**`maxLines`** (text only) clamps the text to that many lines.

**`fit`** (text only) auto-sizes long text. It needs a numeric `style.fontSize` as the largest size:

```json
"fit": { "width": 936, "min": 56, "steps": [{ "over": 40, "fontSize": 84 }], "em": 0.6 }
```

| Key | Meaning |
| --- | --- |
| `width` | Available width in px (usually canvas width minus horizontal padding) |
| `min` | Smallest font size allowed |
| `steps` | Optional. Once the text is longer than `over` characters, start at `fontSize` instead |
| `em` | Optional average glyph width in em, for fonts much narrower or wider than the default estimate |

The renderer starts at the matching step (or `style.fontSize`), caps the size so the longest word fits `width`, then steps down until the text fits `maxLines`, never below `min`. Combine `fit` with `maxLines` for headlines. Use a no-break space inside numbers or short groups that must not wrap (for example `1 250`).

### Placeholders

Placeholders work in `text`, `src`, style values, token values and font `src`:

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
- **Variations** — a `mode` (`light`, default, or `dark`) set when creating or updating a variation; re-rendering the variation keeps that mode. `create_template_post_draft` takes the same `mode`. A variation with `mode: "dark"` renders dark without needing a project.

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

## Photo credits

If an `image` node's `src` uses a content field (a photo supplied per post, as opposed to <span v-pre>`{{brand.logo}}`</span>, <span v-pre>`{{asset.*}}`</span> or tokens), the template **must contain a `credit` node**; saving fails otherwise. Give it a credit field and guard it with `when`, as in the Photo starter.

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
    { "key": "photo", "type": "image", "label": "Photo" },
    { "key": "photoCredit", "type": "text", "label": "Photo credit", "maxLength": 60 }
  ],
  "sample": { "headline": "A short, concrete headline", "date": "Saturday, 18:00" },
  "root": {
    "type": "box",
    "style": { "width": "100%", "height": "100%", "position": "relative", "flexDirection": "column", "backgroundColor": "{{token.bg}}", "color": "{{token.fg}}" },
    "children": [
      { "type": "image", "src": "{{photo}}", "when": { "has": "photo" }, "style": { "width": "100%", "height": 810, "objectFit": "cover" } },
      { "type": "credit", "text": "Photo: {{photoCredit}}", "when": { "has": "photoCredit" }, "style": { "position": "absolute", "top": 762, "right": 24, "fontSize": 22, "color": "#FFFFFF", "backgroundColor": "{{token.scrim}}", "padding": "4px 10px" } },
      {
        "type": "box",
        "style": { "flexDirection": "column", "flexGrow": 1, "justifyContent": "flex-end", "padding": 72, "gap": 24 },
        "children": [
          { "type": "text", "text": "{{date}}", "when": { "has": "date" }, "style": { "fontSize": 36, "fontWeight": 700, "color": "{{token.accent}}" } },
          { "type": "text", "text": "{{headline}}", "maxLines": 3, "fit": { "width": 936, "min": 56, "steps": [{ "over": 40, "fontSize": 84 }] }, "style": { "fontSize": 104, "fontWeight": 800, "lineHeight": 1.05 } },
          { "type": "image", "src": "{{brand.logo}}", "when": { "has": "brand.logo" }, "style": { "height": 56, "objectFit": "contain", "alignSelf": "flex-start" } }
        ]
      }
    ]
  }
}
```

Content values for one post:

```json
{ "headline": "Summer opening hours start Monday", "date": "From 1 July", "photo": "https://example.com/photo.jpg", "photoCredit": "Jane Doe" }
```

Without `photo` the image and credit disappear and the text block fills the canvas. A Story variant of the same template only needs `{ "size": { "width": 1080, "height": 1920 } }` as overrides if the tree uses flex and percentages — keep the width at 1080 so pixel values like `fit.width` stay correct.

## Variations

A variation stores `overrides`: a partial definition with any of `size`, `tokens`, `fields`, `fonts`, `sample`, `root` (`version` is not allowed). Overrides replace **whole top-level keys** — an overridden `sample` replaces every sample value, an overridden `root` replaces the whole tree.

Use variations for post types and formats of one design: a square feed post, a 4:5 portrait, a 9:16 Story, a version without photo, or one saved post with its content in `sample`.

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

## Workflow for agents

Install **Studio** (element and project tools; element tools also come with **Sites**) and **Social Media** (post tools, including `create_template_post_draft`). Confirm with `tools/list`.

1. **Find or create the template.** `list_elements` → reuse a `template` element if one fits. Otherwise `create_element` with `type: "template"` and a full `spec`. Ask the team to check it in the test panel before using it for real posts.
2. **Fill in real content.** Collect the actual facts (title, date, place, numbers, photo URL, credit). Respect each field's `maxLength`; leave optional fields out instead of inventing them.
3. **Render and draft the post** — pick one:
   - **One step:** `create_template_post_draft` with `elementId`, `values`, `platform`, optional `format`, `body` and `mode`. It saves a new variation with `overrides: { sample: values }` and drafts the post from it. Uses the base layout and size; `mode` defaults to `light` (pass `dark` for a dark post).
   - **Specific layout or size:** `generate_element_variation` with `overrides` (for example `{ "size": { "width": 1080, "height": 1920 }, "sample": { … } }`), optional `label`, `aspectRatio` for AI elements and `mode` for templates, then check the variation image (`list_element_variations`) and `create_social_post` with `elementVariationId`.
   - **A project record:** `generate_element_variation` (the layout), then `create_project` with `template: { elementVariationId, mode, values }` → `studio_produce` → `studio_wait` with `targetStatus: "composed"` → `studio_export` → `create_social_post` with the export's id as `exportId`.
4. **Hand over for approval.** Share the post's `shareUrl` preview and the caption. The draft stays a draft until a person approves `schedule_social_post` (or schedules it in `/social`). Never schedule or publish without that approval.

Notes:

- `create_template_post_draft` values **replace** the sample values — include every field the image should show.
- Project renders use exactly `template.values`; samples are not used there, so empty values render as empty.
- A post from `elementVariationId` gets **every image of the variation** (primary first). Template variations hold one image, so use a fresh variation per post; re-rendering replaces the current image in place.
- Instagram needs JPEG: rendered PNGs are converted to JPEG automatically when attached (transparency becomes white).
- Images must be publicly reachable PNG, JPEG, GIF or SVG; WebP and images slower than 10 seconds are treated as missing.

## MCP tools

| Tool | Parameters | Notes |
| --- | --- | --- |
| `list_elements` | — | Team element library; find `template` elements and their ids |
| `create_element` | `name`, `type` (`character` · `environment` · `style` · `product` · `brand` · `template`), `description?`, `spec?`, `media?` | For templates `spec` is the full definition. `media` is a list of team media IDs from `media_upload`; image names become <span v-pre>`{{asset.<name>}}`</span> placeholders |
| `update_element` | `elementId`, `name?`, `type?`, `description?`, `spec?`, `media?` | For templates pass the **full** definition; it replaces the old one. `media` attaches team media IDs (adds to the element's existing media) |
| `delete_element` | `elementId` | |
| `list_element_variations` | `elementId` | Variations with labels, overrides and images |
| `generate_element_variation` | `elementId`, `overrides?`, `aspectRatio?`, `label?`, `mode?` | Templates render instantly; other types generate an AI image in the background. `aspectRatio` (`1:1` default, `16:9`, `9:16`, `4:3`, `3:4`) applies to AI elements; `mode` (`light` default, `dark`) applies to templates; `label` names the variation |
| `update_element_variation` | `elementId`, `variationId`, `label?`, `aspectRatio?`, `mode?`, `overrides?` | `{}` clears overrides. Does not re-render |
| `delete_element_variation` | `elementId`, `variationId` | |
| `create_template_post_draft` | `elementId`, `values`, `platform` (`instagram` · `x` · `facebook` · `linkedin`), `format?` (`feed` · `story`), `body?`, `mode?`, `team` | Render + draft in one step. `mode` is `light` (default) or `dark`. Never schedules |
| `create_project` | `name`, `brief?`, `outputPreset?`, `targetPlatforms?`, `selectedSkills?`, `template?` `{ elementVariationId, mode?, values? }` | With `template` the project is an image project rendered from that variation. `outputPreset` is `9:16 social`, `16:9 launch` or `1:1 square teaser` |
| `studio_produce` / `studio_wait` / `studio_export` | `projectId` (`studio_wait` also `targetStatus`, `timeoutSeconds?`) | Template projects go straight to `composed`; the export holds the PNG |
| `create_social_post` | `platform`, `team`, `format?`, `body?`, one of `media` · `exportId` · `elementVariationId`, `scheduledAt?` | Omit `scheduledAt` to keep a draft |
| `update_social_post` / `schedule_social_post` | see [Social Media](/apps/social#for-agents) | Scheduling needs approval |
| `media_upload` | `team`, `type` (`brand` · `reference` · `template` · `output`), `fileUrl` / `filePath` / `fileBase64`, … | Use the returned URL in image fields |

Live schemas: `tools/list`. Attach images to an element (for <span v-pre>`{{asset.*}}`</span>) with the element's `media` on the REST API or the `media` parameter of `create_element` / `update_element`.

## Designing good images

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
