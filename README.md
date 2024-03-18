# The Pantry Pal App
The main focus of this app is to provide a basic inventory system that can be assigned to containers (such as freezers,cupboards,etc). 

## Current APIs in use in this project
The following APIs are in use:
- Bootstrap (Layout and theme control)
- Datepicker (used to select an items expiry date)
- Jodit Rish Text Editor (used to create recipes to be stored)
- React Jodit (React wrapper to allow use of Jodit)
- Toastify (used for error messages, replacing alert)

### To DO (March 21-28)
- ~~Clean up add item form~~
- Add create demo functions for ease of display and testing, demo of storage, items, recipes, user and others
- ~~Add clear search option~~
- ~~Add way to enter own nutritional info when API returns none~~
- ~~Add seperate title, sub-title and description inputs for recipes~~
- ~~Add react-avatar~~
- Try and implement themes(dark and light) which changes react components based on local storage value
- Add ability to save a user profile picture in base 64 on local storage
- Add a default image to storage cards
- Background picture
- Formatting for the random recipe API fetch
- Clean up notifications page
- Organize NavBar into categories
- Fix background fill issue
- Implement level 1 users, that are created by level 2 users (and also the Admin)
- Have admin see all storages/recipes, Level 2 users see only their own storages/recipes

### Known issues
- Overly large images in recipes can trigger a local storage character limit in browser