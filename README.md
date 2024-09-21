# Asr Digitals Store

![Asr Digitals Store Logo](https://asr-digitals-store.netlify.app/static/media/logo-light.692375527eadc8078c5a.png =250x)  

## Website URL

Visit the live demo: [Asr Digitals Store](https://asr-digitals-store.netlify.app/)

## Project Overview

Asr Digitals Store is an e-commerce website for selling a variety of daily electronic products such as smartphones, laptops, desktops, and so on... The website provides the typical experience of navigating and filtering products and managing the personal cart, favorites, and purchases.

### Technologies Used
- **Frontend**: React, JavaScript, HTML
- **Styling**: CSS
- **State Management**: Redux
- **Routing**: React Router
- **Backend**: Firebase

## Pages
- **Home**: Home Page of Website showing a selection of products, FAQ, store branches, as well as sections that redirect to other important pages of the site.
- **Shop**: List of available products according to categories and filters.
- **Product**: Overview of a product's information and reviews.
- **Cart**: Overview of items added to the cart.

- **Favorites**:  Overview of items added to the favorites.
-  **Purchases**:  Overview of the user's purchases.
- **Profile**:  The user's profile information to view and edit.

- **Checkout**: Payment processing page.
- **About Us**: Information about the store and its mission.
- **Contact**: How users can get in touch with support.
- **Offers**: Showcase of the store's current offers and promotions.

- **Admin**: Admin dashboard to manage the store's products, offers, users, and purchases.
- **Log in**: Log in to an existing account.
- **Register**: Creating a new account.

## Features
- User-friendly interface for seamless shopping.
- Responsive design for mobile and desktop users.
- User authentication and profile management.
- Review system to share your thoughts about products.

## How to Install and Run the Project Locally

If you wish to run Asr Digitals Store on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Omar-Walid-MD/Asr-Digitals-Store.git
2.  Navigate into the project directory:
     ```bash
    cd asr-digitals-store 
3. Install dependencies:
    
     ```bash
     npm install 
4. Start the development server:
    
     ```bash
     npm start 
5.   Open your browser and visit `http://localhost:3000` to see the project in action.

6. Set up a Firebase project

7. Create a Realtime Database.

8. Import the sample data (found in ./src/db/db-firebase.json) to the Firebase Realtime Database.

9. Add Email/Password User Authentication to the Firebase Project.

10. Create an .env file in the root directory with the following properties:
	```
	REACT_APP_FIREBASE_API_KEY=value
	REACT_APP_FIREBASE_AUTH_DOMAIN=value
	REACT_APP_FIREBASE_DATABASE_URL=value
	REACT_APP_FIREBASE_PROJECT_ID=value
	REACT_APP_FIREBASE_STORAGE_BUCKET=value
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID=value
	REACT_APP_FIREBASE_APP_ID=value