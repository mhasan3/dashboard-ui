<div class="navbar bg-gray-900 text-white px-4 p-6 mb-6">
<div class="flex flex-row container mx-auto">
    <div class="basis-1/4 md:basis-1/3">
        <div class="relative">
            <a class="text-xl flex items-center" href="/dashboard">
                <img src="tigerbrokers.svg" alt="logo" class="sm:h-10 h-12" />
            </a>
        </div>
    </div>
    <div class="basis-1/2 md:basis-1/3">
        <div class="hidden md:flex ml-8 space-x-6">
            <a href="/dashboard" class="hover:text-white/80">Home</a>
            <a href="/help" class="hover:text-white/80">Help</a>
            <a href="/download" class="hover:text-white/80">Download</a>
            <a href="/community" class="hover:text-white/80">Community</a>
        </div>
    </div>
    <div class="basis-1/4 md:basis-1/3">
            <div class="flex gap-2 justify-end">
                <div class="indicator">
                    <a class="btn btn-warning btn-sm rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black"
                            href="/account">
                        My account
                    </a>
                </div>
                <button
                  class="btn btn-ghost btn-sm rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                  on:click={() => window.location.href = '/logout'}
                >
                    Log Out
                </button>
            </div>
    </div>
</div>
</div>