<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = $input['name'] ?? 'Non fourni';
    $email = $input['email'] ?? 'Non fourni';
    $subject = $input['subject'] ?? 'Contact Batela Foods';
    $message = $input['message'] ?? 'Pas de contenu';

    $to = "contact@batelafoods.com";
    $email_subject = "Nouveau Message Batela Foods: $subject";

    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Sujet: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: webmaster@batelafoods.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($to, $email_subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => "Email envoyé avec succès"]);
    }
    else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi de l'email"]);
    }
}
else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée"]);
}
?>
