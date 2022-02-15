<?php

namespace App\Http\Resources;

use Illuminate\Support\Str;
use Illuminate\Http\Resources\Json\JsonResource;

class WebhookReceiver extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $malfunction = $this->malfunction;
        if (Str::contains($this->malfunction, 'message must be non-empty')) {
            $malfunction = '請設定訊息模板。';
        }
        // message must be non-empty
         return [
            'id' => $this->id,
            'user' => $this->user,
            'chat' => $this->chat,
            'name' => $this->name,
            'token' => $this->token,
            'uri' => config('receiver.host') . '/api/webhooks/' . $this->token,
            'malfunction' => $malfunction,
            'bot' => $this->bot,
            'dql' => $this->dql,
            'jmte' => !empty($this->jmte) ? $this->jmte : "",
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
