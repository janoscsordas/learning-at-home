@props(['employer', 'width' => 90])

<img src="{{ asset($employer->logo) }}" alt="CL" class="rounded select-none" width="{{ $width }}">
