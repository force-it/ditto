<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\WebhookReceiver;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Http\Resources\WebhookReceiverResource;

class WebhookReceiverController extends Controller
{
    public function index(Request $request)
    {
        $webhookReceivers = WebhookReceiver::with(['bot'])->orderBy('created_at', 'desc')->paginate();

        return Inertia::render('Webhook/Index', [
            'webhookReceivers' => $webhookReceivers,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Webhook/Create');
    }

    public function show(Request $request, WebhookReceiver $webhookReceiver)
    {
        return Inertia::render('Webhook/Show', [
            'webhookReceiver' => $webhookReceiver,
        ]);
    }

    public function refresh(Request $request, WebhookReceiver $webhookReceiver)
    {
        return Inertia::render('Webhook/Show', [
            'webhookReceiver' => $webhookReceiver,
        ]);
    }

    public function update(Request $request, WebhookReceiver $webhookReceiver)
    {
        Validator::make($request->all(), [
            'jmte' => ['nullable', 'string'],
        ])->validateWithBag('updateWebhookReceiver');

        try {
            $webhookReceiver->forceFill([
                'jmte' => $request->jmte,
            ])->save();
        } catch (\Throwable $th) {
            throw $th;
            throw ValidationException::withMessages([
                'jmte' => '儲存失敗。',
            ])->errorBag('updateWebhookReceiver');
        }

        return back(303);
    }

    public function destroy(Request $request, WebhookReceiver $webhookReceiver)
    {
        $webhookReceiver->delete();

        return redirect()->route('webhooks');
    }
}
