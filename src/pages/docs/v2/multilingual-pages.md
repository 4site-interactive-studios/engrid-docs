---
title: Multilingual Pages
description: How ENgrid detects the page language and translates its built-in UI strings and form fields, with built-in English and Spanish support.
---

## Overview

ENgrid detects the language of the current Engaging Networks page and uses it to translate the UI strings it generates (like the "Remember Me" checkbox or validation announcements) and, when you use the TranslateFields component, your form field labels and placeholders.

English (`en`) and Spanish (`es`) are supported out of the box. You can override any built-in string, or add support for more languages, with the `EngridI18n` global.

## Page Language Detection

`ENGrid.getPageLanguage()` returns the current page language as a 2-letter code: the first two characters of `pageJson.locale`, lowercased.

| `pageJson.locale` | `ENGrid.getPageLanguage()` |
| ----------------- | -------------------------- |
| `en_US` | `en` |
| `es_ES` | `es` |
| `es-MX` | `es` |
| (not set) | `en` |

```typescript
if (ENGrid.getPageLanguage() === "es") {
  // Spanish page logic
}
```

{% callout title="You should know!" %}
When `pageJson` or `pageJson.locale` is not available, the page language defaults to `en`.
{% /callout %}

## Built-in Translations

ENgrid ships a small dictionary for the UI strings it generates. When the page language is Spanish, these strings are used automatically — you don't need to configure anything.

| Key | English | Spanish |
| --- | ------- | ------- |
| `rememberMe.label` | Remember Me | Recuérdame |
| `rememberMe.clearLabel` | (clear autofill) | (borrar autocompletado) |
| `rememberMe.tooltip` | Check “{label}” to complete forms on this device faster... | Marque “{label}” para completar los formularios en este dispositivo más rápido... |
| `rememberMe.iframeTitle` | Remember Me iframe | iframe de Recuérdame |
| `translateFields.state` | State | Estado |
| `translateFields.stateGeneric` | Province / State | Provincia/Estado |
| `translateFields.stateRegion` | State/Region | Estado/Región |
| `translateFields.provinceTerritory` | Province / Territory | Provincia/Territorio |
| `translateFields.selectState` | Select State | Seleccione Estado |
| `translateFields.select` | Select | Seleccione |
| `translateFields.recipientTo` | To: | Para: |
| `a11y.errorSummary` | There are {count} errors: {messages}. | Hay {count} errores: {messages}. |
| `placeholders.firstName` | First Name | Nombre |
| `placeholders.lastName` | Last Name | Apellidos |
| `placeholders.emailAddress` | Email Address | Correo electrónico |
| `placeholders.phoneNumber` | Phone Number | Teléfono |
| `placeholders.phoneNumberOptional` | Phone Number (Optional) | Teléfono (opcional) |
| `placeholders.phoneNumber2Optional` | 000-000-0000 (Optional) | 000-000-0000 (opcional) |
| `placeholders.country` | Country | País |
| `placeholders.address1` | Street Address | Calle y número |
| `placeholders.address2` | Apt., Ste., Bldg. | Depto., Piso, Edif. |
| `placeholders.city` | City | Ciudad |
| `placeholders.region` | Region | Provincia/Estado |
| `placeholders.postcode` | ZIP Code | Código Postal |

Values in curly braces (like `{count}` or `{label}`) are placeholders that ENgrid fills in at runtime.

The `placeholders.*` keys drive the [input placeholders](/docs/v2/form-field-enhancements#input-placeholders) ENgrid adds when the `add-input-placeholders` body data attribute is enabled. Placeholders you set yourself with the `Placeholders` option always win — ENgrid never translates your custom strings.

## Customizing Strings with `EngridI18n`

Use the `window.EngridI18n` global to override any dictionary string or to add a new language. Your strings are merged over the defaults key-by-key, per language — you only need to provide the strings you want to change.

```javascript
window.EngridI18n = {
  es: {
    // Override a built-in Spanish string
    "rememberMe.label": "Acuérdate de mí",
  },
  fr: {
    // Add a new language
    "rememberMe.label": "Se souvenir de moi",
    "rememberMe.clearLabel": "(effacer le remplissage automatique)",
  },
};
```

Resolution order for every string: the current page language → English → the key itself. If a string is missing in the page language, the English default is used, so partial dictionaries are safe.

You can check whether a key is defined for the current page language (not counting the English fallback) with `ENGrid.hasI18nKey(key)`:

```typescript
ENGrid.hasI18nKey("translateFields.recipientTo"); // true on "es" pages, false on "fr" unless you add it
```

## Translating Form Fields by Page Language

When the TranslateFields component is enabled (`TranslateFields: true`, on by default), the page language is used as the **base translation layer** for supporter field labels and placeholders. It is applied on page load and again every time the country field changes.

Spanish pages get these field translations out of the box:

| Field | Spanish Label |
| ----- | ------------- |
| `supporter.firstName` | Nombre |
| `supporter.lastName` | Apellidos |
| `supporter.emailAddress` | Correo electrónico |
| `supporter.phoneNumber` | Teléfono |
| `supporter.address1` | Dirección |
| `supporter.address2` | Departamento/Piso |
| `supporter.postcode` | Código Postal |
| `supporter.city` | Ciudad |
| `supporter.region` | Provincia/Estado |
| `supporter.country` | País |

### How Language and Country Translations Combine

Country-based translations (like the built-in Brazilian Portuguese, German, French, and Dutch sets) still work and are layered **on top of** the page language:

1. Fields are reset to the labels from your Engaging Networks page builder.
2. The page language layer is applied.
3. The selected country layer is applied on top, winning per field.

If the selected country has no defined translations, the page language stays in place. For example, on a Spanish page, a donor who selects Brazil gets the Portuguese address labels, and any field not covered by the Portuguese set remains in Spanish.

State field labels and "Select…" placeholder options also follow the page language (for example, "Select State" becomes "Seleccione Estado" on Spanish pages), while state and province names themselves are not translated.

When a field's placeholder mirrors its label, the placeholder is translated along with the label. A placeholder with custom hint text of its own is left untouched, so you keep full control over format hints.

You can extend or replace the language layer with the existing `EngridTranslate` global, using the 2-letter language code as the key:

```javascript
window.EngridTranslate = {
  es: [
    { field: "supporter.firstName", translation: "Tu nombre" },
  ],
};
```

## Remember Me on Multilingual Pages

The Remember Me checkbox label, "(clear autofill)" link, and info tooltip automatically use the dictionary strings for the page language. If you set `rememberMeLabel` or `fieldClearLabel` in the component options, your values always win over the dictionary.

## Validation Error Announcements

The summary announced to screen readers when multiple validation errors are present ("There are X errors: …") also follows the page language ("Hay X errores: …" in Spanish).
