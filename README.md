# Retrieve-W3Schools
Retrieve contents from site w3schools.com

## W3Schools Tutorial Print.js
Execute this file with Chrome Dev Tools to retrieve contents of W3Schools(www.w3schools.com)

Here is steps to execute all the instructions inside this file
> 1. remove Line 79 and Line 76 inside W3.CSS
![CSS Deleting](/img/CSS_Deleting.png)
> 2. Copy all the css styles inside repalce.css into W3.CSS and save
![CSS Copying.png](/img/CSS_Copying.png)
![CSS Saving.png](/img/CSS_Saving.png)
> 3. Open [W3Schools Tutorial Print.js] with editor , set variable targetHeadIndex which represent index of category at navigation area.
> 4. For chrome is horrible memory consuming monster, we can not process all the pages at one time. set variable startPageIndex and endPageIndex which represent begin and end index of the current category.
![Set Variable.png](/img/Set_Variable.png)
> 5. Copy all the contents of [W3Schools Tutorial Print.js] into console of chrome browser and execute them.
![Before execution.png](/img/Before_execution.png)

After execution
![After execution.png](/img/After_execution.png)

## How to treat a page like [Reference Page](https://www.w3schools.com/jquery/jquery_ref_events.asp) which holds a further detail.

To make this issue run to retrieve all the contents ,there is need to retrieve all the titles(links) which is inside the table, and append all of them to navigation area

Here is steps to execute all the instructions inside this file

> 1. Select the first topic of a particular section
> 2. Open [W3Schools Tutorial Reference.js] with editor , set variable targetHeadIndex which represent index of category at navigation area.
> 3. For chrome is horrible memory consuming monster, we can not process all the pages at one time. set variable startPageIndex and endPageIndex which represent begin and end index of the current category.
> 4. Copy all the contents of [W3Schools Tutorial Reference.js] into console of chrome browser and execute them.

*Before
![Before](/img/Setting_for_Ref.png)

*After
![After](/img/Result_of_Ref.png)

Well, the consequent step after you made partials of pdf files of a particular topic will be , 
1. [merge](https://combinepdf.com/) them into one pdf. 
2. [add page number](https://www.ilovepdf.com/add_pdf_page_number) for the file.