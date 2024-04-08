# The Pantry Pal App
The main focus of this app is to provide a basic inventory system that can be assigned to containers (such as freezers,cupboards,etc). Users can create accounts that then can populate different "storages" that represent inventories (Freezer,Fridge<Cupboard...).
There is also a message and notification system more geared towards a user environment where there are various levels of staff, such as Owner as Admin, Manager as a Level 2 account and Clerks as Level 1 Users.

PLEASE NOTE: Any areas that allow an image to be selected and saved can throw an error if the image is too big for the local storage of the users browser. This is known and is currently on the list of improvements to be made.

Level 1 Users can only view recipes, see notifications, use the messenger and adjust Item amounts in storages.
Level 2 Users can create, edit and delete storages along with their contents. Add recipes through a reich text editor or view random recipes. Plus everything else a level 1 can do.
Level 3 User also called Admin is created by default and as of now can only have this one level 3 account. The Admin account can create and edit other users along with what level 2 users can do.

## Steps To Use

1. Go to the Login page, https://gyro-trix.github.io/pantry-pal/#/login
   
![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/73f555bd-7148-45cb-9fe2-bc0cdb7b7086)

Here you can either go to the Register page that allows you to create a Level 2 User, or sign in with one of the following accounts created by default:
- Username & Password: Admin      Level 3 User, access to all functions
- Username & Password: Demo2      Level 2 User, cannot create or edit users
- Username & Password: Demo1      Level 1 User, only can adjust amounts in storages

Also please note the Icon in the upper right (to the left of user on Navbar if logged in) which is used to change from light and dark themes. 

2. Access or create a "storage"
   
![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/a014b151-cd11-40f9-a9b5-e3153ec4314b)

Now you can either create your own storage or access the demo storage shown on the home screen. Add Storage on the Navbar will bring the user to a page with inputs for the Name, Location and Type of storage. Please not that if the screen witdth is small enough the navbar selections will be move to the dropdown accessed by clicking on the user name on the rightmost side of the Navbar. After this you are redirected back to the above page where the newly created storage is shown with a Edit and Delete storage button

4. Edit the Storage information
   
![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/4648b294-c2d5-4241-89db-d9b3ab0cbaaa)

After selecting the Edit Storage button, the user is presented with the above page. Here you can change the Name, Type and Location of the Storage as well as a now being able to select an image to represent the storage. Making any changes on this page requires the user to click the Save Settings button at the bottom of the page or the changes will not apply.

4. Add Items to the Storage
   
![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/e4646a17-d817-44b3-bd51-0e8108586458)

When adding items to the storage, you first need to search for that item, which is done via the Calorie Ninja API. If the search returns with information on the item more inputs for Quantity, Size and Expiry with a disabled input for Name is shown below the search bar. This indicates the API has returned with nutritional information for what was searched. Since the API in use is free, it will only ever return either one entry or fail to find it. Selecting Add Item will add the item to the storage as long as all input fields (including expiry) have been filled, which will show on the page an item with a button to view nutrition information and a button to delete the entry. Once again the user must select Save Settings at the bottom of the page in order to apply changes (even with the item list).

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/809566df-d0e5-42bb-976b-48b37e8982d5)

If the search does not return any information then the Name input will now be editable and there will be a button, Add Nutrition Info, so the user can enter their own information if required.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/084fa6a0-3add-44c7-a405-304ac63a6b43)

The above image shows the UI to enter nutritional information when the search fails to find any information

5. Viewing Recipes

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/dd5d03ef-126e-4b07-b9b2-60b3d9399806)

On the Navbar there is a Recipe link that allows the user to view recipes that have been saved to Local Storage.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/190e1f73-93e4-4a28-9c81-647f8d5c2e4a)

Above is an example of a recipe added using the Add A Recipe link discussed next. There are Next, Previous, Edit and Delete buttons which are used to manage the saved recipes. Edit will load a page similiar to the next step with fields already populated with the recipe the user wishes to edit.

6. Creating your own recipe and saving it

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/a776364b-624c-4ad3-9d4a-8cbc8d987c9d)

On the Navbar there is a Add A Recipes link, remeber if the width is small enough this could be under the user drop down to the right of the Navbar instead.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/e2057578-cbfa-4329-9cc7-d78c42d3a81c)

The above page is used to enter a custom recipe. It has inouts for a Title, SubTitle, Description and the recipe contents itself. The content portion is the Jodit Rich Text Editor which allows the addition of pictures that will be saved to local storage as Base64.

7. Get a random recipe

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/cdcb1db3-227c-413d-bf06-d5267d32dfb9)

Recipe Centre in the Navbar witth bring up a blank Jodit Rich Text editor page.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/5c4dc1a7-38bf-48a0-9169-140ebaa63de6)

Now the user can click Get Random Recipe to populate the blank Jodit editor with a random recipe from the MealDB API. Also a Save Random Recipe button will now appear that will allow the user to save the shown recipe to Local Storage for viewing in the Recipe link in the previous step.  

8. Messege Center and Inviting another user

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/783fd63c-a148-4a83-b772-85d5ece3b67b)

Under the dropdown on the right most side of the Navbar is a Messages link that allows users to friend other user accounts and send messages between accounts.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/e4524276-17ad-4793-826a-6d402104db08)

Users may invite other users to their friends list which governs what how can send and recieve messages.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/3ac8d0ce-063e-4cfc-890f-513be810b783)

Entering a valid email that matches another users account and clicking invite will update the page to show a pending invite. In this case we user Demo2 wich is the "email" of the Demo2 demo account. Please note for any new users the email will have proper formatting as the registration system accounts for that.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/023cb6da-7361-4c52-b584-fa23faaed917)

On the other account under the Messages page (or in the notifications page) a request is shown that allows to be accepted or declined. Selecting the green check mark will accept the invite and then that user can send a message to the original account that invited them. Messages sent by the current user also have a X in the bottom right which allows the message to be deleted even before being seen by the other account.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/e72d7d33-558c-4e43-bee0-740346b8c360)

Back to the original account on the Message page there is now a button to the left with the username of the account that acceptted the invite. Note the red dot which signifies a new message is waiting. Clicking it will show the sent message or messages which have an S button in the bottom right. Clicking this will mark the message as seen and if all message are seen then the red dot will be removed. 

9. Updating User settings

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/b73daef3-eddd-4f7a-93eb-e7795cca75f2)

Under the User dropdown on the Navbar there is a link for Settings.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/912d0d49-93d0-4cbf-9028-ffb1f8ef4cb3)

Here the user can change their password, add a profile picture, change notification settings and there is an alternate area to invite users for the Message page from the previous step.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/baf1f263-6f41-4194-8801-afa9d768177b)

As with most sites, in order to update the users password you need to enter the current password and then the new password twice. Then clicking Update Password will apply the change.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/28d52ee4-a490-4ba3-9cbb-9cc03db1b187)

The user may also select a profile image that will be shown next to their name on the navbar and in the message system.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/7d0cb9bc-2332-4d59-a963-4cac27f471bc)

Once an image is selected the user must select save profile image to apply the image, which is reflected in the Navbar.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/966e2f32-a95e-4f20-b109-781f452be8e2)

The notification options allow the user to enable the generation of notifications based on stock amounts or the expiry date of items added to storages. These are user specific. You can also update the user accounts email here. Once again the User must click Update Settings to apply these changes.

10. Create and edit Users (requires being logged in as Admin)

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/5e34ccd4-bc87-4bb7-821d-bf3adcb734a2)

If logged in as the default Admin account there will be an option to both Manage and Create Users under the User dropdown. 

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/84a44c55-e4ba-473e-9283-f6812a33b00f)

(Level 3/Admin Only) Creating a user is very similiar to registering as a new user, however this is the only way to add level 1 users to the system aside from editing a current user. A Username, validly formatted email address, a user level and a password are required. When all inputs are filled clicking Save User will change the page to the Manage User page.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/031c9028-a3f5-4aef-ae31-2fa12ef6a344)

The Manage user page allows users to be editted or deleted. When editting a page similiar to the User Settings page in the above step is shown and functions in the same way.

11. Notifications

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/833fa899-5507-4acd-8aa2-3afb81ab2df8)

The notifications link in the Navbar shows generated notifications based off the settings set before in the User Setting page. A number that shows the amount of new notifications waiting is displayed as well.

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/0e0f3991-50ce-4c0a-8b5c-55b4ae66b207)

Notifications are broken down into four categories. Low inventory, which is based on the quantity setting from before. About to Expire and Expired are base on the day threshold set before. And finally the Message Invites shows the same as in the message page when there is a pending invite for the current user. The Refresh Notification button removes all item related notifications for the current user and regenerates them. This will cause dismissed notifications to be reset as well.

12. Adjust Iventory(Level 1 User only)

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/2282ed06-d748-4df8-b89e-f2a33ca6b438)

When logged in as a Level 1 account such as the demo profile Demo1, storages no longer are editable or have the option to be deleted. Instead the user can only adjust the amount of items already entered by a higher level user. 

![image](https://github.com/Gyro-trix/pantry-pal/assets/137181145/a8dedc9a-22e1-4d58-85cb-6546cde76381)

Each item can now only have the number of items changed. The other information is only readable.

## Project Coaching from:
- Get Coding, 

## Frameworks used in this project
- Bootstrap (Layout and theme control), https://www.getcoding.ca

## Current APIs in use in this project
The following APIs are in use:
- Datepicker (used to select an items expiry date), https://github.com/Hacker0x01/react-datepicker
- Jodit Rich Text Editor (used to create recipes to be stored), https://xdsoft.net/jodit/
- React Jodit (React wrapper to allow use of Jodit), https://xdsoft.net/jodit/
- Toastify (used for error messages, replacing alert), https://github.com/fkhadra/react-toastify#readme
- Meal Database free one random recipe, https://www.themealdb.com
- Calorie Ninja for nutritional information, API key and API key type must be supplied in an .env file not included, https://calorieninjas.com



