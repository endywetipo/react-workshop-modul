<?php
require_once __DIR__ . '/config.php';

$dataFile = __DIR__ . '/transactions.json';
if (!file_exists($dataFile)) file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT));
$transactions = readProducts($dataFile);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') response($transactions);
if ($method === 'POST') {
    $body = requestBody();
    if (!is_array($body['items'] ?? null) || count($body['items']) === 0) {
        response(['message' => 'Minimal satu item diperlukan'], 422);
    }
    $transaction = [
        'id' => (int) (microtime(true) * 1000),
        'pelanggan' => trim($body['pelanggan'] ?? 'Umum'),
        'items' => $body['items'],
        'total' => (float) ($body['total'] ?? 0),
        'bayar' => (float) ($body['bayar'] ?? 0),
        'kembalian' => (float) ($body['kembalian'] ?? 0),
        'tanggal' => $body['tanggal'] ?? date(DATE_ATOM)
    ];
    $transactions[] = $transaction;
    writeProducts($dataFile, $transactions);
    response($transaction, 201);
}
response(['message' => 'Method tidak didukung'], 405);
