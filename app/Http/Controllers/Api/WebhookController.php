<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Notifications\TestTg;
use App\Models\WebhookReceiver;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Blade;
use App\Notifications\WebhookReceived;
use Symfony\Component\Process\Process;
use App\Exceptions\TokenInvokeException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Notification;

class WebhookController extends Controller
{
    public function receive(Request $request, $token)
    {
        if (!$webhookReceiver = WebhookReceiver::whereToken($token)->first()) {
            throw new TokenInvokeException();
        }
        
        $content = $this->parseMessage($request->all(), $webhookReceiver->jmte);
        $buttonUrl = $this->trim($this->parseMessage($request->all(), data_get($webhookReceiver, 'buttons.url', '')));
        if ($this->validationUrl($buttonUrl)) {
            $buttonUrl = '';
        }

        try {
            Notification::route('telegram', data_get($webhookReceiver, 'chat.id'))
                ->notify(new WebhookReceived($webhookReceiver, $content, $buttonUrl));
            if ($webhookReceiver->malfunction) {
                $webhookReceiver->malfunction = null;
                $webhookReceiver->save();
            }
        } catch (\Throwable $th) {
            $webhookReceiver->malfunction = $th->getMessage();
            $webhookReceiver->save();
            Log::info('Webhook Receive Error', $request->all(), $th->getMessage());
        }

        return response()->json([
            'ok' => true,
            'result' => true,
            'description' => 'OK'
        ]);
    }

    protected function parseMessage($importProperties, $importTemplate)
    {
        $properties = tmpfile();
        fwrite($properties, yaml_emit($importProperties));

        $template = tmpfile();
        fwrite($template, $importTemplate);

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

        return $result;
    }

    protected function validationUrl($url)
    {
        $validator= Validator::make(['url' => $url], [
                'url' => ['nullable', 'url'],
        ]);
        if ($validator->fails()) {
            // $validator->errors()->first('url');
            // 存進 alerts 中
        }

        return $validator->fails();
    }

    protected function trim($string)
    {
        return trim(preg_replace('/\s\s+/', ' ', $string));
    }
}
