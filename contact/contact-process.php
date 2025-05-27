<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$to = "oliinykroman@gmail.com";
		$subject = "Appointment for consultation";
		$message = "Name: " . $_POST["name"] . "\nPhone: " . $_POST["name"] . "\nEmail: " . $_POST["email"];
		$headers = "From: noreply@yourdomain.com";

		if (mail($to, $subject, $message, $headers)) {
			echo "success";
		} else {
			echo "error sending";
		}
	}
?>