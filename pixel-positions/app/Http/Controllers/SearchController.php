<?php

namespace App\Http\Controllers;

use App\Models\Job;

class SearchController extends Controller
{
    public function __invoke()
    {
        $jobs = Job::where('title', 'LIKE', '%'.request('q').'%')->with('employer', 'tags')->get();

        return view('results', ['jobs' => $jobs]);
    }
}
