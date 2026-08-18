<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataFile = __DIR__ . '/products.json';

function readProducts(string $file): array {
    if (!file_exists($file)) {
        return [];
    }
    $contents = file_get_contents($file);
    return json_decode($contents ?: '[]', true) ?: [];
}

function writeProducts(string $file, array $products): void {
    file_put_contents($file, json_encode(array_values($products), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function requestBody(): array {
    $body = json_decode(file_get_contents('php://input'), true);
    return is_array($body) ? $body : [];
}

function response($payload, int $status = 200): void {
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}
