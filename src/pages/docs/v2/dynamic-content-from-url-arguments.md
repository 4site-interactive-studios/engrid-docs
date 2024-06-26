---
title: Dynamic Content based on URL arguments
description: Learn how use Dynamic Content based on URL arguments in ENgrid.
---

## Custom merge fields

You can create merge fields on the fly by any name you give them which in turn can be populated with URL arguments. These merge fields can have default fallback values that will be used if no URL argument is present or they can have no default fallback value in which case they will disappear if no URL argument is present.

`_ALL_` values for URL arguments used by these merge fields must be URL-encoded

- [Encode to URL-encoded format](https://www.urlencoder.org/)
- [Screenshot Example](https://share.cleanshot.com/PO83Qf)

You can also hide content with the `.hide-until-merged` class which will set it to invisible until after the merge has completed.

Example: Title

```
<h1 class="hide-until-merged">{engrid_data~[title]}</h1>

&engrid_data[title]=Give%20Today%21
```

Example: Inline Copy

```
<p>{engrid_data~[body-lead]~[Protect Our Oceans with a Monthly or One-Time Gift Today]}</p>

&engrid_data[body-lead]=Thanks%20for%20signing%20the%20XYZ%20petition%2C%20can%20you%20take%20one%20more%20step%20and%20do%20this%3F
```

Example: Image

```
<img data-src="{engrid_data~[background-image-url]~[https://via.placeholder.com/1280x720]}">

&engrid_data[background-image-url]=https%3A%2F%2Fexample.com%2Fmy-image.jpg
```

---

## Native merge fields

### Populating Form Fields with URL Arguments

Engaging Networks by default allows you to populate any managed form fields by specifying URL arguments with the target field and its value. The target field is case sensitive and can be found by inspecting the field and retrieving it's `name` For example this is the First Name field.

```javascript
<input id="en__field_supporter_firstName" type="text" 
class="en__field__input en__field__input--text" 
name="supporter.firstName" value="" placeholder="First Name">
```

You can populate the first name field by adding it to a URL

```javascript
example.com?supporter.firstName=John
```


And you can specify multiple fields


```javascript
example.com?supporter.firstName=Jane&supporter.lastName=Doe
```

{% callout title="You should know!" %}
Note that this system does not work with our "Pseudo" form fields which mirror the styles and format of Engaging Networks form fields, but they are not `_real_` form fields.
{% /callout %}
---
