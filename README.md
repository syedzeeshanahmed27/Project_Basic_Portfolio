To set up and run the application for the website, follow these instructions:

Clone the Repository:
Clone the repository to your local machine using Git:

bash
Copy code
git clone https://github.com/your-username/your-repository.git
Install Dependencies:
Navigate into the project directory and install the necessary dependencies using npm:

bash
Copy code
cd your-project-directory
npm install
Set Up Environment Variables:
Create a .env file in the root directory of the project and add the following environment variables:

makefile
Copy code
PORT=3000
Adjust the port number if needed.

Run the Application:
Start the application by running the following command:

bash
Copy code
npm start
Access the Website:
Open your web browser and navigate to http://localhost:3000 (or the port you specified) to view the website.


Database Setup:
Ensure you have sqlite3 npm package installed and running.
Create a database named OurDatabase.db.
Create a collection/table named contact.


Database Schema:
The contact collection has the following schema:
name: String, required
email: String, required
message: String, required
Rationale
name: To store the name of the person providing feedback.
email: To store the email address of the person providing feedback.
message: To store the feedback message.

Submit the Contact Form:
Fill out the contact form on the website and submit it. You should see a thank you message with the submitted form data.

View the Projects and Services Pages:
Navigate to the "Projects" and "Services" pages to view the content.

Stop the Application:
To stop the application, press Ctrl + C in the terminal where the application is running.



This concludes the setup and running instructions for the website. If you encounter any issues, refer to the troubleshooting section of this README or reach out for assistance.
