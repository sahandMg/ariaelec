<?php

namespace App\GraphQL\Query;

use Folklore\GraphQL\Support\Query;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use GraphQL;
use Illuminate\Support\Facades\DB;

class CommonQuery extends Query
{
    protected $attributes = [
        'name' => 'CommonQuery',
        'description' => 'A query'
    ];

    public function type()
    {
        return Type::listOf(GraphQL::type('CommonType'));
    }

    public function args()
    {
        return [
            'manufacturer_part_number'=>['type'=>Type::string()]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $info)
    {
        $name = $args['manufacturer_part_number'];
        return DB::table('commons')->where('manufacturer_part_number','like',"%$name%")->get();

    }
}
