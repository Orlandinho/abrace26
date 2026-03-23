<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('configuracoes', '/configuracoes/conta');

    Route::get('configuracoes/conta', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('configuracoes/conta', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('configuracoes/conta', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('configuracoes/senha', [PasswordController::class, 'edit'])->name('user-password.edit');

    Route::put('configuracoes/senha', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('user-password.update');

    Route::get('configuracoes/tema', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    /*Route::get('configuracoes/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');*/
});
