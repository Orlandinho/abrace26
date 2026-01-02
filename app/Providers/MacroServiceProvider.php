<?php

namespace App\Providers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\ServiceProvider;

class MacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        RedirectResponse::macro('alertSuccess', function (string $message, string $type = 'success', string $title = 'Sucesso!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'success',
                'title' => $title
            ]);
        });

        RedirectResponse::macro('alertFailure', function (string $message, string $type = 'failure', string $title = 'Erro!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'failure',
                'title' => $title
            ]);
        });

        RedirectResponse::macro('alertWarning', function (string $message, string $type = 'attention', string $title = 'Atenção!') {
            return $this->with('alert', [
                'message' => $message,
                'type' => 'attention',
                'title' => $title
            ]);
        });
    }
}
