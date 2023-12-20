---
title: ENGrid Page Builder Componants & Features
description: Quidem magni aut exercitationem maxime rerum eos.

---



# Native Custom Ask String / Swap Lists

This is documentation about managing the ask string swap list in Engaging Networks and is not specific to ENgrid, but it comes up often enough that we have a step-by-step guide. Here is how to update One-time or Monthly giving amounts on a page that uses a Form Component with a Swap List.



1. Edit the Form Component with the “Donation Amount” field 
![screenshot](https://cln.sh/xQVrHW62)
( [screenshot](https://cln.sh/xQVrHW62) )
2. If linked, unlink the Form Component from the Component Library. Otherwise, your change will impact every page ( [screenshot](https://cln.sh/7RxGjNSJ) )
3. If you plan to use these same giving amounts across multiple pages, save the form component back to the component library with an appropriate name that includes the amounts ( [screenshot](https://cln.sh/hdVVVhyn) )
4. Now click the Dependencies icon ( [screenshot](https://cln.sh/xzySrCx3) ); if you try to edit the “Donations Amounts” field directly, it will only change the amounts for one-time as that’s the default giving frequency for the page in my screenshots.
5. You will see two entries in the pop-up, one configured for one-time giving and another for monthly. Click the pencil (edit) icon on your desired option ( [screenshot](https://cln.sh/jr1hVC5V) )
6. Here is where you manage the “Swap List” which is the pre-defined giving amounts that appear when the corresponding giving frequency is selected. Click the pencil icon next to the associated Swap List ( [screenshot](https://cln.sh/HChLSdLj) )
7. In the pop-up, click the pencil icon next to the Monthly Swap List ( [screenshot](https://cln.sh/x6LMD9nq) ). Yes, this is redundant to the last step, but it’s how EN works.
8. In there, you can edit the pre-defined giving amounts that show up when Monthly is selected. You can edit, add, and remove giving options.
9. IMPORTANT: When changing the label, ensure the value is updated as well. Otherwise, you could have a gift amount that says one thing but is actually another when it goes to transact. The value should only ever be the RAW numeric value and never include the $ sign or USD ( [screenshot](https://cln.sh/bx5S20Gf) ). When you add a new option and enter a label, EN will populate the value exactly as the label, which does include the $, and you need to go in and remove it before saving.
10. **IMPORTANT**: The last option should always be “Other” with a value of “other” ( [screenshot](https://cln.sh/BFZSlWJr) )
11. **IMPORTANT**: The default amount for the One-time Swap List doesn’t matter. That’s because EN persists in the amount that is first selected when you switch giving frequencies. Because this page starts with monthly giving as the default frequency, that value (e.g. $10) will be selected on page load. And then, when you switch to One-time, it will keep $10 selected or any other user-made selection or entry. ( [recording](https://cln.sh/HrqSd22t) )
12. Now that your change is made, you need to:
13. Save the swap list, and close the pop-up ( [screenshot](https://cln.sh/lZ7Nlg5k) )
14. Save the alternative content, and close the pop-up ( [screenshot](https://cln.sh/vlRWNxKb) )
15. Save the field update ( [screenshot](https://cln.sh/m7d36hVP) )
16. Save the dependency configuration, and close the pop-up ( [screenshot](https://cln.sh/SGn8zdQS) )
17. Save the page ( [screenshot](https://cln.sh/wyp1wnY8) )
18. If you edited a form component that is saved to the Library, you should see your changes instantly on the page you were editing. Other pages using the same Library Form Component could take up to 1hr for the changes to propagate to them.