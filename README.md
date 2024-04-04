# The Pantry Pal App
The main focus of this app is to provide a basic inventory system that can be assigned to containers (such as freezers,cupboards,etc). Users can create accounts that then can populate different "storages" that represent inventories (Freezer,Fridge<Cupboard...).
There is also a message and notification system more geared towards a user environment where there are various levels of staff, such as Owner as Admin, Manager as a Level 2 account and Clerks as Level 1 Users.

Level 1 Users can only view recipes, see notifications, use the messenger and adjust Item amounts in storages.
Level 2 Users can create, edit and delete storages along with their contents. Add recipes through a reich text editor or view random recipes. Plus everything else a level 1 can do.
Level 3 User also called Admin is created by default and as of now can only have this one level 3 account. The Admin account can create and edit other users along with what level 2 users can do.

## Steps To Use

1. Go to the Login page, https://gyro-trix.github.io/pantry-pal/#/login

Here you can either go to the Register page that allows you to create a Level 2 User, or sign in with one of the following accounts created by default:
- Username & Password: Admin      Level 3 User, access to all functions
- Username & Password: Demo2      Level 2 User, cannot create or edit users
- Username & Password: Demo1      Level 1 User, only can adjust amounts in storages

Also please note the Icon in the upper right (to the left of user on Navbar if logged in) which is used to change from light and dark themes. 

2. Access or create a "storage"

Now you can either create your own storage or access the demo storage shown on the home screen

3. Edit the Storage information

4. Add Items to the Storage

5. Viewing Recipes

6. Creating your own recipe and saving it

7. Get a random recipe

8. Messege Center and Inviting another user

9. Updating User settings

10. Create and edit Users (requires being logged in as Admin)

11. Adjust Iventory(Level 1 User only)
 


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

## Left to do
- Readme for project
- links to API



