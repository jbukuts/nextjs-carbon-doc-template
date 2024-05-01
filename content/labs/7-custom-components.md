---
title: Custom Components
updated: 2024-03-06
timeToComplete: 10
level: Test
desc: Showcase of the various JSX components available and their use cases.
---

# Custom Components

In this document is a list of the custom components available for use within your MDX content.

All source code for these components can be found within `src/components/shortcodes`.

## Tokenization Applet

The `TokenizationApplet` is an interactive component that shows off the transformation from text to tokens. It is built off of `@xenova/transformers` package which in turn is built off of Hugging Face's `transformers` package in Python.

<TokenizationApplet />

## Callouts

Callouts follow the same styling as a `blockquote` element and can be found below:

All callouts have the same props available as under the hood they make use of the `BlockQuote` shortcode just with different colors applied.

| Prop       | Type        | Description                                                              | Optional |
| ---------- | ----------- | ------------------------------------------------------------------------ | -------- |
| `text`     | `string`    | Text within the callout. If specified will override the `children` prop. | yes      |
| `children` | `ReactNode` | Content with the callout. Allows for nested styling.                     | yes      |

Let's take a look at each of them in action with different props applied.

### QuizAlert

`QuizAlert` is the only callout with a default value for the `text` property. This default value is also already configured to be localized. For instance:

```md
<QuizAlert />
```

Results in:

<QuizAlert/>

### Warning

```md
<Warning text='Using the `text` prop with MD syntax will not **any** apply styling!'/>
```

<Warning text='Using the `text` prop with MD syntax will not **any** apply styling!'/>

### Danger

```md
<Danger>
However, using MD syntax as the `children` prop will style them properly.

You can nest **_styling_** all you want.
</Danger>
```

<Danger>
However, using MD syntax as the `children` prop will style them properly.

You can nest **_styling_** all you want.
</Danger>

### Persona

```md
<Persona>
**Heads up**: For this lab you will be acting as a System Administrator within an watsonx.data environment.
</Persona>
```

<Persona>
**Heads up**: For this lab you will be acting as a System Administrator within an watsonx.data environment.
</Persona>

### Generic

```md
<Callout>
generic callout
</Callout>
```

<Callout>
generic callout
</Callout>

### Blockquote

```md
> BlockQuote uses the standard blockquote selector `>` in Markdown. So nested styling is supported easily.
```

> BlockQuote uses the standard blockquote selector `>` in Markdown. So nested styling is supported easily.
