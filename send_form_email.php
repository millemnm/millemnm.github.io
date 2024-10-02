<?php
if (isset($_POST['email'])) {
    
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "info@firstspice.com";
    $email_subject = "First Spice Online Comments Form";

    function died($error) {
        echo "We are very sorry, but there were error(s) found with the form you submitted.<br /><br />";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }

    // validation expected data exists
    if (!isset($_POST['full_name']) ||
        !isset($_POST['company']) ||
        !isset($_POST['email']) ||
        !isset($_POST['phone']) ||
        !isset($_POST['comments'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');      
    }

    // Sanitize input data
    $full_name = htmlspecialchars(strip_tags(trim($_POST['full_name']))); // required
    $company = htmlspecialchars(strip_tags(trim($_POST['company']))); // required
    $email_from = htmlspecialchars(strip_tags(trim($_POST['email']))); // required
    $phone = htmlspecialchars(strip_tags(trim($_POST['phone']))); // required
    $comments = htmlspecialchars(strip_tags(trim($_POST['comments']))); // required

    // Validate email address
    if (!filter_var($email_from, FILTER_VALIDATE_EMAIL)) {
        died('The Email Address you entered does not appear to be valid.<br />');
    }

    // Validate names (letters, spaces, periods, dashes, and apostrophes only)
    $name_exp = "/^[A-Za-z .'-]+$/";
    if (!preg_match($name_exp, $full_name)) {
        died('The Full Name you entered does not appear to be valid.<br />');
    }
    if (!preg_match($name_exp, $company)) {
        died('The Company you entered does not appear to be valid.<br />');
    }

    // Create the email content
    $email_message = "Form details below.\n\n";
    $email_message .= "Full Name: " . $full_name . "\n";
    $email_message .= "Company: " . $company . "\n";
    $email_message .= "Email: " . $email_from . "\n";
    $email_message .= "Phone: " . $phone . "\n";
    $email_message .= "Comments: " . $comments . "\n";

    // Create email headers
    $headers = 'From: ' . $email_from . "\r\n" .
               'Reply-To: ' . $email_from . "\r\n" .
               'CC: ' . $email_from . "\r\n" . // Sends a copy to the user
               'X-Mailer: PHP/' . phpversion();

    // Send the email
    if (@mail($email_to, $email_subject, $email_message, $headers)) {
        echo "Thank you for contacting us. We will be in touch with you very soon.";
    } else {
        echo "There was an error sending the message. Please try again later.";
    }
}
?>