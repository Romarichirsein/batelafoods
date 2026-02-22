<?php
// lws-mailer.php
// A simple SMTP bridge script to dispatch emails originating from the static Next.js frontend

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    // Handle CORS preflight
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read JSON payload from Next.js Form
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $type = $data['type'] ?? 'contact';
    $to = "contact@batelafoods.com"; // Change to destination
    $subject = "Nouvelle Notification - Batela Foods";

    $message = "Vous avez reçu un nouveau message depuis le site statique Batela:\n\n";
    foreach ($data as $key => $value) {
        $message .= ucfirst($key) . ": " . htmlspecialchars($value) . "\n";
    }

    $headers = "From: webmaster@batelafoods.com\r\n";
    $headers .= "Reply-To: no-reply@batelafoods.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Email envoyé avec succès par LWS PHP."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Échec de la fonction mail() LWS."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
?>
