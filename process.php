<?php

    $to = "punithbs10@gmail.com";
    $from = $_REQUEST['email'];
    $name = $_REQUEST['name'];
    $headers = "From: $from";
    $subject = "Portfolio Contact Form - Message from " . $name;

    $fields = array();
    $fields{"name"} = "name";
    $fields{"email"} = "email";
    $fields{"phone"} = "phone";
    $fields{"message"} = "message";

    

    $body = "You have received a new message from your portfolio website:\r\n\r\n"; 

    foreach($fields as $a => $b){$body .= $b." : ".$_REQUEST[$a]."\r\n"; }

    $body .= "\r\n\r\nThis message was sent from your portfolio contact form.";

    $send = mail($to, $subject, $body, $headers);

    if($send) {
        echo "success";
    } else {
        echo "error";
    }
?>