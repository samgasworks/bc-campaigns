<script lang="ts">
	import '../app.css';
</script>

<div class="flex h-full flex-col">
	<nav class="flex-shrink-0 shadow-sm border-b border-gray-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-20 justify-between">
				<div class="flex w-full justify-between">
					<div class="flex flex-shrink-0 items-center">
						<img class="h-16 w-auto" src="/bc-logo.png" alt="Your Company">
					</div>
					<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
						<!-- Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
						<a href="/" class="border-blue-500 text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 font-medium" aria-current="page">
							Campaigns
						</a>
						<a href="/settings" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 font-medium">
							Settings
						</a>
					</div>
					<div></div>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:items-center">
					<!-- Profile dropdown -->
					<div class="relative ml-3">
						<div>
							<button type="button" class="relative flex max-w-xs items-center rounded-full bg-white text-sm text-gray-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
							<span class="absolute -inset-1.5"></span>
							<span class="sr-only">Open user menu</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							</button>
						</div>
			
						<!--
							Dropdown menu, show/hide based on menu state.
			
							Entering: "transition ease-out duration-200"
							From: "transform opacity-0 scale-95"
							To: "transform opacity-100 scale-100"
							Leaving: "transition ease-in duration-75"
							From: "transform opacity-100 scale-100"
							To: "transform opacity-0 scale-95"
						-->
						<div class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
							<!-- Active: "bg-gray-100", Not Active: "" -->
							<a href="/account" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">
								Account
							</a>
							<button class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">
								Sign out
							</button>
						</div>
					</div>
				</div>
				<div class="-mr-2 flex items-center sm:hidden">
					<!-- Mobile menu button -->
					<button type="button" class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" aria-controls="mobile-menu" aria-expanded="false">
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<!-- Menu open: "hidden", Menu closed: "block" -->
					<svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
					<!-- Menu open: "block", Menu closed: "hidden" -->
					<svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					</button>
				</div>
			</div>
		</div>
	</nav>
  
	<div class="py-10 flex-1 bg-sky-50/50">
	  <main>
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<slot />
		</div>
	  </main>
	</div>
  </div>
