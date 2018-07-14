<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Folklore\GraphQL\Support\Type as BaseType;
use GraphQL;

class CommonType extends BaseType
{
    protected $attributes = [
        'name' => 'CommonType',
        'description' => 'A type for common table'
    ];

    public function fields()
    {
        return [
            'id'=>['type'=>Type::int()],
            'manufacturer_part_number'=>['type'=>Type::string()],
            'manufacturer'=>['type'=>Type::string()],
            'part_number'=>['type'=>Type::string()],
        ];
    }
}
