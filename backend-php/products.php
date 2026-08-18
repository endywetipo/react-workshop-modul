<?php
require_once __DIR__ . '/config.php';

$products = readProducts($dataFile);
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    response($products);
}

if ($method === 'POST') {
    $body = requestBody();
    $product = [
        'id' => (int) (microtime(true) * 1000),
        'nama' => trim($body['nama'] ?? ''),
        'keterangan' => trim($body['keterangan'] ?? ''),
        'gambar' => trim($body['gambar'] ?? ''),
        'link' => trim($body['link'] ?? '')
    ];
    if ($product['nama'] === '') response(['message' => 'Nama produk wajib diisi'], 422);
    $products[] = $product;
    writeProducts($dataFile, $products);
    response($product, 201);
}

$id = (int) ($_GET['id'] ?? 0);
$index = array_search($id, array_column($products, 'id'), true);
if ($index === false) response(['message' => 'Produk tidak ditemukan'], 404);

if ($method === 'PUT') {
    $body = requestBody();
    $products[$index] = array_merge($products[$index], [
        'nama' => trim($body['nama'] ?? $products[$index]['nama']),
        'keterangan' => trim($body['keterangan'] ?? $products[$index]['keterangan']),
        'gambar' => trim($body['gambar'] ?? $products[$index]['gambar']),
        'link' => trim($body['link'] ?? $products[$index]['link'])
    ]);
    writeProducts($dataFile, $products);
    response($products[$index]);
}

if ($method === 'DELETE') {
    $removed = $products[$index];
    array_splice($products, $index, 1);
    writeProducts($dataFile, $products);
    response($removed);
}

response(['message' => 'Method tidak didukung'], 405);
