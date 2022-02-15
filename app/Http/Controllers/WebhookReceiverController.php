<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\WebhookReceiver;
use App\Http\Resources\WebhookReceiver as ResourcesWebhookReceiver;

class WebhookReceiverController extends Controller
{
    public function index(Request $request)
    {
        $webhookReceivers = WebhookReceiver::with(['bot', 'user'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Webhook/Index', [
            'webhookReceivers' => ResourcesWebhookReceiver::collection($webhookReceivers),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Webhook/Create');
    }

    public function show(Request $request, $webhookReceiverId)
    {
        if (!$webhookReceiver = WebhookReceiver::find($webhookReceiverId)) {
            return redirect()->intended(config('app.url'));
        }

        return Inertia::render('Webhook/Show', [
            'webhookReceiver' => new ResourcesWebhookReceiver($webhookReceiver),
        ]);
    }

    public function destroy(Request $request, WebhookReceiver $webhookReceiver)
    {
        $webhookReceiver->delete();

        return redirect()->route('webhooks');
    }
}
