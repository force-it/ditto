<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\WebhookReceiver;
use App\Http\Controllers\Controller;
use App\Notifications\WebhookReceived;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Notification;

class WebhookController extends Controller
{
    public function receive(Request $request, $token)
    {
        if (!$webhookReceiver = WebhookReceiver::whereToken($token)->first()) {
            return response()->json([
                'ok' => true,
                'result' => false,
                'description' => '無效 Token'
            ]);
        }

        $properties = tmpfile();
        fwrite($properties, yaml_emit($request->all()));

        $template = tmpfile();
        fwrite($template, $webhookReceiver->jmte);

        $process = new Process([
            'java',
            '-Dfile.encoding=UTF8',
            '-jar',
            storage_path('jmte.jar'),
            stream_get_meta_data($template)['uri'],
            stream_get_meta_data($properties)['uri'],
            'UTF-8'
        ]);
        $process->run();
        $result = $process->getOutput();

        fclose($template);
        fclose($properties);

        try {
            Notification::route('telegram', data_get($webhookReceiver, 'chat.id'))
                ->notify(new WebhookReceived($result, $webhookReceiver));
            if ($webhookReceiver->malfunction) {
                $webhookReceiver->malfunction = null;
                $webhookReceiver->save();
            }
        } catch (\Throwable $th) {
            $webhookReceiver->malfunction = $th->getMessage();
            $webhookReceiver->save();

            Notification::route('telegram', data_get($webhookReceiver, 'chat.id'))
                ->notify(new WebhookReceived($properties, $webhookReceiver));
        }

        return response()->json([
            'ok' => true,
            'result' => true,
            'description' => 'OK'
        ]);
    }
}
