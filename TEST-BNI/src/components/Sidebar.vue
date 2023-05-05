<template>
    <div class="d-flex align-items-start justify-content-center py-4" style="position: sticky; top: 0;">
        <div
            class="nav flex-column nav-pills me-3"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
        >
            <img src="@/assets/img/logo.png" class="mb-3"/> 
            <button
                class="nav-link"
                :class="{active: $route.path === '/'}"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                @click.prevent="$router.push(`/`)"
            >
                Home
            </button>
            <button
                class="nav-link"
                :class="{active: $route.path === '/adduser'}"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
                @click.prevent="$router.push(`/adduser`)"
            >
                Add User
            </button>
        </div>
    </div>
</template>

