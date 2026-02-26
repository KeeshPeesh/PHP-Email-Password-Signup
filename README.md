# PHP-Email-Password-Signup
This is a simple PHP script that allows users to sign up with their email and password. The script validates the email and password, checks for existing users, and stores the user information in a JSON file.
## Features
- User registration with email and password
- Email validation
- Password validation (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number)
- Checks for existing users
- Stores user information in a text file
## Usage
1. Clone the repository or download the files.
2. Make sure you have a web server with PHP installed (e.g., XAMPP, WAMP, MAMP).
3. Place the files in the web server's root directory (e.g., `htdocs` for XAMPP).
4. Open a web browser and navigate to `http://localhost/signup.php`.
5. Fill in the email and password fields and click the "Sign Up" button.
6. If the registration is successful, you will see a success message. If there are any errors, they will be displayed on the page.
## Note
- This script is for demonstration purposes only and should not be used in production environments without proper security measures (e.g., password hashing, secure database storage, etc.).
- Always ensure that user data is handled securely and that sensitive information is protected.
## Author
- KeeshPeesh 