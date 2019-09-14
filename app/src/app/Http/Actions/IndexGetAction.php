<?php

namespace App\Http\Actions;

use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Contracts\View\View;

/**
 * @package App\Http\Actions
 */
class IndexGetAction
{
    /**
     * @var ViewFactory
     */
    private $viewFactory;

    /**
     * @param ViewFactory $viewFactory
     */
    public function __construct(ViewFactory $viewFactory)
    {
        $this->viewFactory = $viewFactory;
    }

    /**
     * @return View
     */
    public function __invoke(): View
    {
        return $this->viewFactory->make('app.index');
    }
}
