<?php

namespace App\Http\Resources;

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
         return [
            'id' => $this->id,
            'user' => $this->user,
            'chat' => $this->chat,
            'token' => $this->token,
            'uri' => config('receiver.host') . '/api/webhook/' . $this->token,
            'malfunction' => $this->malfunction,
            'bot' => $this->bot,
            'dql' => $this->dql,
            'jmte' => $this->jmte,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
