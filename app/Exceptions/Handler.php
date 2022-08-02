<?php

namespace App\Exceptions;

use Throwable;
use App\Exceptions\NotCommandException;
use App\Exceptions\TokenInvokeException;
use App\Exceptions\SomethingWrongException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        TokenInvokeException::class,
        NotCommandException::class,
        SomethingWrongException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (TokenInvokeException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'ok' => true,
                    'result' => false,
                    'description' => '無效 Token'
                ]);
            }
        });

        $this->renderable(function (NotCommandException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json('OK');
            }
        });

        $this->renderable(function (SomethingWrongException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json($e->getMessage());
            }
        });
    }
}
