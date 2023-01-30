# Aplikasi CRUD Sederhana dengan menggunakan Laravel dan ReactJS
Laravel-reactJS merupakan aplikasi sederhana yang dibuat untuk berlajar mengimplementasi aplikasi microservices, dimana pada aplikasi ini diterapkan pemisahan antara Frontend dan Backend, diaman Frontend pada aplikasi ini menggunakan reactjs versi 5.0.1 dan backend pada aplikasi ini menggunakan laravel 8.*.

# Penginstallan Aplikasi
1. Install semua paket yg dibutuhkan, seperi Node JS, Compposer, dan Xampp.
2. Buka folder tersebut pada terminal anda.

## Penginstallan React JS
1. ketik `npx create-react-app belajarreactlaravel`
1. ketik `npm install bootstrap@5.1.1 react-router-dom@5.2.0 axios@0.21.4 sweetalert2 jquery react-bootstrap bootstrap`

## Penginstallan Laravel
1. Masuk kedalam directory belajarreactlaravel.
2. ketik `composer create-project laravel/laravel:^8.0 backend`
3. ketik `composer require tymon/jwt-auth`
3. ketik `php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" `
3. ketik `php artisan jwt:secret`
