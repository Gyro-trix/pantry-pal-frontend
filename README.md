# The Pantry Pal App
The main focus of this app is to provide a basic inventory system that can be assigned to containers (such as freezers,cupboards,etc). 

## Frameworks used in this project
- Bootstrap (Layout and theme control)

## Current APIs in use in this project
The following APIs are in use:
- Datepicker (used to select an items expiry date)
- Jodit Rich Text Editor (used to create recipes to be stored)
- React Jodit (React wrapper to allow use of Jodit)
- Toastify (used for error messages, replacing alert)
- Meal Database free one random recipe
- Calorie Ninja for nutritional information, API key and API key type must be supplied in an .env file not included

### To DO (March 21-28)
- ~~Have nav bar update profile image as soon as set on User Setting page~~
- ~~Hide user drop down when no user is logged in~~
- ~~Moved User options for admin to dropdown~~
- ~~Cleanup registration page~~
- ~~Fix Edit Users UI~~
- Implement level 1 users, that are created by level 2 users (and also the Admin)
- ~~Change manage users page to have visible right left and top sides that show the background~~
- ~~Create friend invite system for messenger, add to user settings ~~ and show example added to Message center itself
- ~~Invites show in the notifications tab/page with accept to ~~ fix button formatting
- Pending invites
- ~~Change format of message center to have users the entire length with the messages and messege input box to the right~~
- ~~Have user selection on Message page show an avatar instead of a button~~
- ~~Change button location on storage to bottom~~
- Implement more toastify instances
- ~~Center image in places where it displays image to be added on edit storage and user settings~~
- Try and implement themes(dark and light) which changes react components based on local storage value
- Formatting for the random recipe API fetch(partially done, image and youtube link left) and add save recipe
- Clean up notifications page (add expired and ~~friend invites~~)
- ~~Move Manage User and Create User to dropdown in Admin's NavBar~~
- ~~Nutrition Symbol instead of _ in items~~ Added bootstrap icons (react-bootstrap-icons)



### Known issues
- Overly large images can trigger a local storage character limit in browser, can I check base 64 for size?
- ~~Fix background fill issue~~

### Wishlist
- Have admin see all storages/recipes, Level 2 users see only their own storages/recipes, level 1 only see storages of their "manager"