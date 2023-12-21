---
title: Optimizing Form Fields with ENgrid and Page Builder
description: A guide to populating and customizing form fields in Engaging Networks with ENgrid and Page Builder. Learn to use URL arguments for field values, understand live variables, and adapt payment types for a seamless user experience in multiple countries

---

## Populating Form Fields with URL Arguments 

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


## Live Variables
### Submit Button Gift Amount and Gift Frequency

You can add these to the submit button label

* `$AMOUNT` - Will add the amount with the currency symbol (e.g., $50). If the amount has a decimal value, it will show (e.g., $25.15). If that decimal value is ".00" it will trim it (e.g., $25)
* `$FREQUENCY` - Will show the currency recurring frequency value (e.g., "Donate $25 Monthly", "Donate $100 Annually") and displays nothing for one-time gifts (e.g., "Donate $50).

----


## Give By Selector Example
#### Code Example for Card, Paypal, and Check 

```html
<!-- Custom Radio Buttons using the same markup as Engaging Networks -->
<div class="en__component en__component--formblock give-by-select">
<div class="en__field en__field--radio en__field--000000 en__field--giveBySelect en__mandatory pseudo-en-field">
<div class="en__field__element en__field__element--radio">
<div class="en__field__item card"><input checked="checked" class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect0" name="transaction.giveBySelect" type="radio" value="Card" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect0">Card</label></div>

<div class="en__field__item paypal"><input class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect1" name="transaction.giveBySelect" type="radio" value="Paypal" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect1">PayPal</label></div>

<div class="en__field__item check"><input class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelect2" name="transaction.giveBySelect" type="radio" value="Check" /> <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelect2">Check</label></div>
</div>
</div>
</div>
```
[https://pastebin.com/raw/PKkAgjfD](https://pastebin.com/raw/PKkAgjfD)


---


## Payment Type Field Values 
### Case Insensitive

| Payment Method | Variants                                      |
| -------------- | --------------------------------------------- |
| `amex`         | 'amex', 'american express', 'americanexpress', 'amx', 'ax' |
| `visa`         | 'visa', 'vi'                                  |
| `mastercard`   | 'mastercard', 'master card', 'mc'             |
| `discover`     | 'discover', 'di'                              |
| `check`        | 'ach'                                         |
| `paypal`       | 'paypal'                                      |


### PayPal Billing Agreement 
{% callout title="Example Text " %}
PayPal Billing Agreement: By submitting this form, you agree to allow Organization Name to take funds from your account on a recurring basis.

{% /callout %}


---

## Processing Fee / Tip Jar Checkbox 

The Processing Fee Checkbox is a Pseudo EN field. Meaning it matches EN's field markup so that it gets styled the same, but it is not an Engaging Networks field. It only looks like one. We then use the interaction with that field to determine.


```html
<!-- Custom Checkbox using the same markup as Engaging Networks --><!-- The value of the checbox is usd as a % to calculate the processing fee -->
<div class="en__field en__field--checkbox en__field--000000 en__field--processing_fees pseudo-en-field">
	<!--<label class="en__field__label en__field__label==positionabove">Processing Fees</label>-->
	<div class="en__field__element en__field__element--checkbox">
		<div class="en__field__item">
			<input class="en__field__input en__field__input--checkbox" data-processing-fee-fixed-amount-added=".30" data-processing-fee-percent-added="2.9" id="en__field_supporter_processing_fees" name="supporter.processing_fees" type="checkbox" value="Y"><label class="en__field__label en__field__label--item" for="en__field_supporter_processing_fees">I'd like to cover all transaction fees so that 100% of my donation goes to the Rainforest Action Network!</label>
		</div>
	</div>
</div>

```

Processing Fee Checkbox Code Block: [https://pastebin.com/raw/7n4k0kPM](https://pastebin.com/raw/7n4k0kPM)

```javascript
 data-processing-fee-percent-added="2.9"
 ```
* Multiplies the Gift Amount by this percent.

```javascript
data-processing-fee-fixed-amount-added=".30"
```
 * After calculating the gift amount with `"data-processing-fee-percent-added"` this amount in cents is added to the total.

 ---


## Internationalized Form Addresses 


### Engaging Networks Component Configuration 

| Engaging Networks Field Name | Label           | Type and Details | Visibility | Required |
|------------------------------|-----------------|------------------|------------|----------|
| Address 1                    | Address         | Text - Empty     | Y          | Y        |
| City                         | City            | Text - Empty     | Y          | N     |
| State                        | Province/State  | Text - Empty     | Y          | N     |
| Zip                          | Zip/Postal Code | Text - Empty     | Y          | Y        |
| Country                      | Country         | Select - Country | Y          | Y        |


### [United Kingdom (en-GB)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=en-GB) 

| Engaging Networks Field Name | Label            | Type and Details                 | Visibility | Required |
|------------------------------|------------------|----------------------------------|------------|----------|
| Address 1                    | Address          | Text - Empty                     | Y          | Y        |
| City                         | City             | Text - Empty                     | Y          | N     |
| State                        | State/Region     | Text - Empty                     | Y          | N        |
| Zip                          | Postal Code      | Text - Empty                     | Y          | Y        |
| Country                      | Country          | Select - Country - "United Kingdom" | Y      | Y        |


### [France (fr-FR)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=fr-FR)  

| Engaging Networks Field Name | Label            | Type and Details             | Visibility | Required |
|------------------------------|------------------|------------------------------|------------|----------|
| Address 1                    | Adresse          | Text - Empty                 | Y          | Y        |
| Zip                          | Code Postal      | Text - Empty                 | Y          | Y        |
| City                         | Ville            | Text - Empty                 | Y          | Y        |
| State                        | Région           | -N/A-                        | N       | N     |
| Country                      | Country          | Select - Country - "France"  | Y          | Y        |

### [Germany (de-DE)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=de-DE) 

| Engaging Networks Field Name | Label               | Type and Details           | Visibility | Required |
|------------------------------|---------------------|----------------------------|------------|----------|
| Address 1                    | Straße, Hausnummer  | Text - Empty               | Y          | Y        |
| Zip                          | Postleitzahl        | Text - Empty               | Y          | Y        |
| City                         | Ort                 | Text - Empty               | Y          | Y        |
| State                        | Bundesland          | -N/A-                      | N       | N     |
| Country                      | Land                | Select - Country - "Deutschland" | Y   | Y        |



### [South Africa (en-ZA)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=en-ZA) 

| Engaging Networks Field Name | Label   | Type and Details                  | Visibility | Required |
|------------------------------|---------|-----------------------------------|------------|----------|
| Address 1                    | Address | Text - Empty                      | Y          | Y        |
| City                         | City    | Text - Empty                      | Y          | Y        |
| State                        | State   | Text - Empty                      | Y          | Y        |
| Zip                          | Zip     | Text - Empty                      | Y          | Y        |
| Country                      | Country | Select - Country - "South Africa" | Y          | Y        |


### [Canada (en-CA)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=en-CA) 

| Engaging Networks Field Name | Label           | Type and Details               | Visibility | Required |
|------------------------------|-----------------|--------------------------------|------------|----------|
| Address 1                    | Address         | Text - Empty                   | Y          | Y        |
| City                         | City            | Text - Empty                   | Y          | Y        |
| State                        | Province/State  | Text - Empty                   | Y          | Y        |
| Zip                          | Postal Code     | Text - Empty                   | Y          | Y        |
| Country                      | Country         | Select - Country - "Canada"    | Y          | Y        |


### [Netherlands (en-NL)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=nl-NL) 

| Engaging Networks Field Name | Label      | Type and Details                 | Visibility | Required |
|------------------------------|------------|----------------------------------|------------|----------|
| Address 1                    | Adres      | Text - Empty                     | Y          | Y        |
| City                         | Woonplaats | Text - Empty                     | Y          | Y        |
| State                        | Provincie  | Text - Empty                     | Y          | Y        |
| Zip                          | Postcode   | Text - Empty                     | Y          | Y        |
| Country                      | Country    | Select - Country - "Netherlands" | Y          | Y        |


### [Australia (en-AU)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=en-AU) 
| Engaging Networks Field Name | Label                | Type and Details                        | Visibility | Required |
|------------------------------|----------------------|-----------------------------------------|------------|----------|
| Address 1                    | Address              | Text - Empty                            | Y          | Y        |
| City                         | City                 | Text - Empty                            | Y          | Y        |
| State                        | Province/State       | Select - Australian States - "Select Province/State" | Y | Y |
| Zip                          | Zip Code             | Text - Empty                            | Y          | Y        |
| Country                      | Country              | Select - Country - "Australia"          | Y          | Y        |



### [United States (en-US)](https://action.ifaw.org/page/41764/action/1?mode=DEMO&locale=en-US)

| Engaging Networks Field Name | Label   | Type and Details                | Visibility | Required |
|------------------------------|---------|---------------------------------|------------|----------|
| Address 1                    | Address | Text - Empty                    | Y          | Y        |
| City                         | City    | Text - Empty                    | Y          | Y        |
| State                        | State   | Select - US States - "Select State" | Y     | Y        |
| Zip                          | Zip     | Text - Empty                    | Y          | Y        |
| Country                      | Country | Select - Country - "United States" | Y      | Y        |




### All Others Countries 

| Engaging Networks Field Name | Label           | Type and Details       | Visibility | Required |
|------------------------------|-----------------|------------------------|------------|----------|
| Address 1                    | Address         | Text - Empty           | Y          | Y        |
| City                         | City            | Text - Empty           | Y          | N     |
| State                        | Province/State  | Text - Empty           | Y          | N     |
| Zip                          | Zip/Postal Code | Text - Empty           | Y          | Y        |
| Country                      | Country         | Select - Country - "United States" | Y  | Y    |
