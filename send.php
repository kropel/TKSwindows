<?php
header("Access-Control-Allow-Origin: *");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
    /* 
    =============================================
    Sendmail.php - send an email from a web form. Make sure this file is called sendmail.php
    when you upload it, otherwise the example form won't find the script and will error.
        
    NOTE: This script is heavily commented. Text after double slashes // is ignored by PHP
    =============================================
    */
    session_start();
    echo $_POST;
    $name = strip_tags($_POST['name']); 
    $email_from = strip_tags($_POST['email']);
    $message = strip_tags($_POST['message']);
    if(isset($_POST['phone'])){ $phone = strip_tags($_POST['phone']); }
    // Validate the email address entered by the user
    if(!filter_var($email_from, FILTER_VALIDATE_EMAIL)) {
        // Invalid email address
        die("The email address entered is invalid.");
    }
    // You only need to modify the following three lines of code to customise your form to mail script.
    $email_to = "krooopel@gmail.com";           // Specify the email address you want to send the mail to.
    $email_subject = $name." Feedback from website";   // Set the subject of your email.
    // Specify a page on your website to display a thankyou message when the mail is sent
    $thankyou_url = "http://tksbuilding.co.uk";
    $error_url = "http://tksbuilding.co.uk";                                           
    
    //Recaptcha
    
// require_once('recaptchalib.php');

// // Get a key from https://www.google.com/recaptcha/admin/create
// $publickey = "6LdPww0UAAAAAL9nkR5VDw3CBdpqLebRZWPX6FrQ";
// $privatekey = "6LdPww0UAAAAAEkMfztali8siIOddK5HkLSi2mW5";

// # the response from reCAPTCHA
// $resp = null;
// # the error code from reCAPTCHA, if any
// $error = null;

// # was there a reCAPTCHA response?
// if ($_POST["recaptcha_response_field"]) {
//         $resp = recaptcha_check_answer ($privatekey,
//                                         $_SERVER["REMOTE_ADDR"],
//                                         $_POST["recaptcha_challenge_field"],
//                                         $_POST["recaptcha_response_field"]);

//         if ($resp->is_valid) {
                
//         } else {
//                 # set the error code so that we can display it
//                  $_SESSION['thanks']= 0;
//         $_SESSION['error'] = 1;
//         $_SESSION['message'] = $resp->error;
//         header("Location: " . $error_url);
//         exit();
//         }
// }


//  end Recaptcha
   

    
    // The code below creates the email headers, so the email appears to be from the email address filled out in the previous form.
    // NOTE: The \r\n is the code to use a new line.
    $headers  = "From: " . $email_from . "\r\n";
    $headers .= "Reply-To: " . $email_from . "\r\n";    // (You can change the reply email address here if you want to.)
    
    // Now we can construct the email body which will contain the name and message entered by the user
    $message = "Name: ". $name  . "\r\n\r\nMessage: " . $message;
    if(isset($_POST['phone'])){
        $message .= "\r\n\r\nPhone: ".$phone;
    }
    
    // This is the important ini_set command which sets the sendmail_from address, without this the email won't send.
    ini_set("sendmail_from", $email_from);
    
    // Now we can send the mail we've constructed using the mail() function.
    // NOTE: You must use the "-f" parameter on Fasthosts' system, without this the email won't send.
    $sent = mail($email_to, $email_subject, $message, $headers, "-f" . $email_from);
    
    // If the mail() function above successfully sent the mail, $sent will be true.
    // if($sent) {
    //     $_SESSION['thanks']= 1;
    //     $_SESSION['error'] = 0;
    //     header("Location: " . $thankyou_url);
    //       // Redirect customer to thankyou page
    // } else {
    //     // The mail didn't send, display an error.
    //     $_SESSION['thanks']= 0;
    //     $_SESSION['error'] = 1;
    //     header("Location: " . $error_url);
        
    // }
        
?>