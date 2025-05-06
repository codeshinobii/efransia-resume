<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove leading/trailing whitespace.
    $fullname = strip_tags(trim($_POST["fullname"]));
    $fullname = str_replace(array("\r","\n"),array(" "," "),$fullname); // Remove newlines from name
    $email_address = filter_var(trim($_POST["email_address"]), FILTER_SANITIZE_EMAIL);
    $message_content = trim($_POST["message"]); // Renamed to avoid conflict with $message variable for email body

    // Check that data was sent to the mailer.
    if ( empty($fullname) OR empty($message_content) OR !filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

    // Set the recipient email address.
    // FIXME: Update this to YOUR Gmail address!
    $recipient = "efraciaager2@gmail.com";

    // Set the email subject.
    $subject = "New contact from $fullname";

    // Build the email content.
    $email_body = "Full Name: $fullname\n";
    $email_body .= "Email: $email_address\n\n";
    $email_body .= "Message:\n$message_content\n";

    // Build the email headers.
    // It's important to set the From header to the sender's email address for better deliverability,
    // and Reply-To so you can reply directly to them.
    $headers = "From: $fullname <$email_address>\r\n";
    $headers .= "Reply-To: $email_address\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n"; // Specify content type

    // Send the email.
    if (mail($recipient, $subject, $email_body, $headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message. Please check server logs.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?> 