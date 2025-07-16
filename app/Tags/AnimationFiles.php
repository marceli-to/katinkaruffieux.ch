<?php

namespace App\Tags;

use Statamic\Tags\Tags;

class AnimationFiles extends Tags
{
    public function index()
    {
        $directory = public_path('assets/animationen/autoplay');
        $files = [];
        
        if (is_dir($directory)) {
            $jsonFiles = glob($directory . '/*.json');
            
            foreach ($jsonFiles as $file) {
                $filename = basename($file);
                $files[] = '/assets/animationen/autoplay/' . $filename;
            }
        }
        
        return $files;
    }
}