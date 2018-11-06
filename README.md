# Retrieve-W3Schools
Retrieve contents from site w3schools.com

## W3Schools Tutorial Print.js
Execute this file with Chrome Dev Tools to retrieve contents of W3Schools(www.w3schools.com)

Here is steps to execute all the instructions inside this file
> 1. remove Line 79 and Line 76 inside W3.CSS
> 2. Copy all the css styles inside repalce.css into W3.CSS
> 3. Open [W3Schools Tutorial Print.js] with editor , set variable targetHeadIndex to index of Level1 header of navigation area.
> 4. For the memory consuming of chrome browser , we can not process all the pages at one time. set variable startPageIndex and endPageIndex which represent begin and end index of the current section.
> 5. Copy all the contents of [W3Schools Tutorial Print.js] into console of chrome browser and execute them.

## How to treat a page like [Reference Page](https://www.w3schools.com/jquery/jquery_ref_events.asp) which holds a deeper detail.

To make this issue run to retrieve all the contents ,there is need to retrieve all the titles(links) which is inside the table, and append all of them to navigation area

Here is steps to execute all the instructions inside this file

> 1. Select the first topic of a particular section
> 2. Open [W3Schools Tutorial Reference.js] with editor , set variable targetHeadIndex to index of Level1 header of navigation area.
> 3. For the memory consuming of chrome browser , we can not process all the pages at one time. set variable startPageIndex and endPageIndex which represent begin and end index of the current section.
> 4. Copy all the contents of [W3Schools Tutorial Reference.js] into console of chrome browser and execute them.

![Before](/img/Setting_for_Ref.png)

![After](/img/Result_of_Ref.png)
