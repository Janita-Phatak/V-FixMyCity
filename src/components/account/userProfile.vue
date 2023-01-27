<template>
    <headerComponent></headerComponent>
    <div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">

        <!--Main Col-->
        <div id="profile"
            class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white mx-6 lg:mx-0">

            <!-- style="background-image: url(profileImage)" -->
            <div class="p-4 md:p-12 text-center lg:text-left">
                <!-- Image for mobile view-->
                <img v-if="imgSrc" :src="imgSrc"
                    class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center object-cover" />

                <img v-else-if="profileImage" :src="profileImage"
                    class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center object-cover" />

                <div v-else
                    class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center mb-2">
                    <div
                        class="inline-flex overflow-hidden relative justify-center items-center w-48 h-auto rounded-full bg-gray-500 aspect-square mr-4 shadow">
                        <span class="font-medium text-gray-300 text-[5rem]">{{ firstName[0] + lastName[0] }}</span>
                    </div>
                </div>
                <div v-if="imgSrc === null" id="changeProfileImageButton" class="mt-4 mb-1.5 hidden lg:hidden">
                    <label for="fileIp"
                        class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg">
                        Change Profile Image
                        <input type="file" @change="previewImage" accept="image/*;capture=camera" id="fileIp" />
                    </label>
                </div>
                <div v-if="imgSrc !== null && picture === null" id="uploadProfileImageButton"
                    class="mt-4 mb-1.5 lg:hidden">
                    <button @click="uploadImage"
                        class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
                        Upload Image
                    </button>
                </div>
                <div v-if="imgSrc !== null && picture === null" id="resetImageButton" class="mt-1.5 mb-0 lg:hidden">
                    <button @click="resetImage"
                        class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                        Reset Image
                    </button>
                </div>
                <div v-if="picture" id="deleteImageButton" class="mt-4 mb-0 lg:hidden">
                    <button @click="deleteImage"
                        class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                        Delete Image
                    </button>
                </div>


                <h1 class="text-3xl font-bold mt-6 lg:mt-10 lg:pt-0">{{ firstName + " " + lastName }}</h1>
                <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-500 opacity-25"></div>

                <p v-if="userType === 'admin' || userType === 'official' || userType === 'worker'"
                    class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start"><svg
                        class="h-4 fill-current text-indigo-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path
                            d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg>{{ userType.charAt(0).toUpperCase() + userType.slice(1) }}</p>

                <button v-if="viewerUserType === 'admin'" @click="openModal"
                    class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg mt-2">Change User
                    Role</button>

                <div id="modal" class="modal" style="z-index: 20;">
                    <div
                        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 class="text-xl font-medium leading-normal text-gray-800"
                                id="exampleModalCenteredScrollableLabel">
                                Update User Role
                            </h5>
                            <button @click="closeModal" type="button"
                                class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
                                aria-label="Close">&times;</button>
                        </div>
                        <div class="modal-body relative p-4">
                            <div class="flex items-center mb-1.5">
                                <input id="red-radio" type="radio" value="admin" v-model.lazy="userType2"
                                    name="colored-radio"
                                    class="w-5 h-5 accent-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500">
                                <label for="red-radio" class="ml-3 text-lg font-medium text-gray-900">Admin</label>
                            </div>
                            <div class="flex items-center mb-1.5">
                                <input id="yellow-radio" type="radio" value="official" v-model.lazy="userType2"
                                    name="colored-radio"
                                    class="w-5 h-5 accent-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500">
                                <label for="yellow-radio"
                                    class="ml-3 text-lg font-medium text-gray-900">Official</label>
                            </div>
                            <div class="flex items-center mb-1.5">
                                <input id="green-radio" type="radio" value="general" v-model.lazy="userType2"
                                    name="colored-radio"
                                    class="w-5 h-5 accent-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500">
                                <label for="green-radio" class="ml-3 text-lg font-medium text-gray-900">General</label>
                            </div>
                        </div>

                        <div
                            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button @click="closeModal" type="button"
                                class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
                                Cancel
                            </button>
                            <button @click="changeUserType" type="button"
                                class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="(viewerUserType === 'admin' && userType === 'official')" class="relative inline-block">
                    <button @click="postcodeDropdown" id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch"
                        class="inline-flex items-center mt-2 py-2 px-4 font-bold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300"
                        type="button">Assigned Postcodes <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg></button>

                    <!-- Dropdown menu -->
                    <div id="dropdownSearch" class="hidden z-10 w-60 bg-white rounded shadow mx-auto lg:ml-0 absolute">
                        <div class="p-3">
                            <label for="input-group-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input v-model="searchQuery" type="text" id="input-group-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-10 p-2.5"
                                    placeholder="Search Postcode">
                            </div>
                        </div>
                        <ul class="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700"
                            aria-labelledby="dropdownSearchButton">
                            <li v-for="postcode in resultQuery" :key="postcode">
                                <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input :id="'checkbox-item-' + postcode" type="checkbox" :value="postcode"
                                        v-model="selectedPostcode"
                                        class="w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-indigo-500">
                                    <label :for="'checkbox-item-' + postcode"
                                        class="ml-4 w-full text-base font-medium text-gray-900 rounded w-auto">{{
                                                postcode
                                        }}</label>
                                </div>
                            </li>
                            <li v-if="(resultQuery.length === 0)">
                                <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                    <span :for="'checkbox-item-' + postcode"
                                        class="ml-4 w-full text-base font-medium text-gray-900 rounded w-auto">
                                        No Postcode Assigned
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <button v-if="viewerUserType === 'admin'" @click="updatePostcodes"
                            class="flex items-center p-3 font-bold text-indigo-600 bg-gray-50 border-t border-gray-200 justify-center w-full hover:bg-gray-100">
                            Add / Update Postcodes
                        </button>
                    </div>
                </div>

                <div v-else-if="userType === 'official'" class="relative inline-block">
                    <button @click="postcodeDropdown" id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch"
                        class="inline-flex items-center mt-2 py-2 px-4 font-bold text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300"
                        type="button">Assigned Postcodes <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg></button>

                    <!-- Dropdown menu -->
                    <div id="dropdownSearch" class="hidden z-10 w-60 bg-white rounded shadow mx-auto lg:ml-0 absolute">
                        <div class="p-3">
                            <label for="input-group-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input v-model="searchQuery" type="text" id="input-group-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-10 p-2.5"
                                    placeholder="Search Postcode">
                            </div>
                        </div>
                        <ul class="overflow-y-auto px-3 pb-3 h-48 text-sm text-gray-700"
                            aria-labelledby="dropdownSearchButton">
                            <li v-for="postcode in resultQuery" :key="postcode">
                                <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                    <input :id="'checkbox-item-' + postcode" type="checkbox" :value="postcode"
                                        v-model="selectedPostcode"
                                        class="w-4 h-4 text-indigo-600 bg-gray-100 rounded border-gray-300 focus:ring-indigo-500"
                                        disabled>
                                    <label :for="'checkbox-item-' + postcode"
                                        class="ml-4 w-full text-base font-medium text-gray-900 rounded w-auto">{{
                                                postcode
                                        }}</label>
                                </div>
                            </li>
                            <li v-if="(resultQuery.length === 0)">
                                <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                    <span :for="'checkbox-item-' + postcode"
                                        class="ml-4 w-full text-base font-medium text-gray-900 rounded w-auto">
                                        No Postcode Assigned
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>



                <!-- <div class="mx-auto w-fit lg:w-full">
                <button @click="myFunction" id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mt-4"
                    type="button">Dropdown radio <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg></button> -->

                <!-- Dropdown menu -->
                <!-- <div id="dropdownRadioBgHover"
                    class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow absolute">
                    <ul class="p-3 space-y-1 text-sm text-gray-700"
                        aria-labelledby="dropdownRadioBgHoverButton">
                        <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                <label for="default-radio-4"
                                    class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Default
                                    radio</label>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input checked id="default-radio-5" type="radio" value="" name="default-radio"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                <label for="default-radio-5"
                                    class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Checked
                                    state</label>
                            </div>
                        </li>
                        <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                                <label for="default-radio-6"
                                    class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Default
                                    radio</label>
                            </div>
                        </li>
                    </ul>
                </div>
                </div> -->


                <p class="pt-4 text-gray-600 text-base lg:text-lg flex items-center justify-center lg:justify-start">
                    <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                        </path>
                    </svg> {{ email }}
                </p>
                <div class="pb-8" id="editableField">
                    <p v-if="contactNo.length > 0"
                        class="pt-2 text-gray-600 text-base lg:text-lg flex items-center justify-center lg:justify-start">
                        <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                            </path>
                        </svg> {{ contactNo }}
                    </p>
                    <p v-else
                        class="pt-2 text-gray-600 text-base lg:text-lg flex items-center justify-center lg:justify-start">
                        <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                            </path>
                        </svg> Not Available
                    </p>
                    <p v-if="city.length > 0 && postcode.length > 0"
                        class="pt-2 text-gray-600 text-base lg:text-lg flex items-center justify-center lg:justify-start">
                        <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg> {{ city }}, Pincode - {{ postcode }}
                    </p>
                    <p v-else-if="city.length > 0 && postcode.length === 0"
                        class="pt-2 text-gray-600 text-base lg:text-lg flex items-center justify-center lg:justify-start">
                        <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg> {{ city }}, Pincode - Not Available
                    </p>
                    <p v-else-if="city.length === 0 && postcode.length > 0"
                        class="pt-2 text-gray-600 text-base lg:text-lg flex items-center justify-center lg:justify-start">
                        <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg> City - Not Available, Pincode - {{ postcode }}
                    </p>
                    <p v-else
                        class="pt-2 text-gray-600 text-base lg:text-lg flex items-center justify-center lg:justify-start">
                        <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg> Not Available
                    </p>
                </div>

                <div id="editingField" class="hidden">
                    <div class="relative pt-4">
                        <div
                            class="flex absolute inset-y-0 left-8 md:left-14 lg:left-0 items-center pl-3 pointer-events-none z-10 pt-2.5">
                            <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                </path>
                            </svg>
                        </div>
                        <input type="number" v-model.lazy="contactNo"
                            class="w-4/5 p-2 text-gray-600 text-base lg:text-lg border-b-2 border-gray-400 outline-none focus:border-indigo-600 pl-10"
                            placeholder="Phone No." />
                    </div>

                    <div class="relative pt-2">
                        <div
                            class="flex absolute inset-y-0 left-8 md:left-14 lg:left-0 items-center pl-3 pointer-events-none z-10">
                            <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <input type="text" v-model.lazy="city"
                            class="w-4/5 p-2 text-gray-600 text-base lg:text-lg border-b-2 border-gray-400 outline-none focus:border-indigo-600 pl-10"
                            placeholder="City" />
                    </div>
                    <div class="relative pt-2">
                        <!-- <div
                        class="flex absolute inset-y-0 left-8 md:left-14 lg:left-0 items-center pl-3 pointer-events-none z-10">
                        <svg class="h-5 text-indigo-700 pr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div> -->
                        <input type="number" v-model.lazy="postcode"
                            class="w-4/5 p-2 text-gray-600 text-base lg:text-lg border-b-2 border-gray-400 outline-none focus:border-indigo-600 pl-10"
                            placeholder="Pincode" />
                    </div>
                </div>
                <!-- <div class="pt-2">
                    <input type="text"
                        class="w-4/5 p-2 text-sm border-b-2 border-gray-400 outline-none opacity-50 focus:border-indigo-600"
                        placeholder="Subject" />
                </div> -->


                <!-- <div class="relative mb-6">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                    </div>
                    <input type="text" id="input-group-1"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com">
                </div> -->
                <!-- <p class="pt-8 text-sm">Totally optional short description about yourself, what you do and so on.</p> -->

                <div id="editProfileButton" @click="editProfile" class="mt-8 mb-1.5 hidden">
                    <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
                        Edit Profile
                    </button>
                </div>
                <div id="saveChangesButton" @click="saveChanges" class="mt-8 mb-1.5 hidden">
                    <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
                        Save Changes
                    </button>
                </div>
                <div id="cancelButton" @click="cancelChanges" class="mt-1.5 mb-8 hidden">
                    <button class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                        Cancel
                    </button>
                </div>
                <div id="changePasswordButton" @click="changePassword" class="mt-1.5 mb-8 hidden">
                    <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
                        Change Password
                    </button>
                </div>

            </div>
        </div>

        <!--Img Col-->
        <div class="w-full lg:w-2/5">
            <!-- Big profile image for side bar (desktop) -->
            <div class="inline-block">
                <img v-if="imgSrc" :src="imgSrc"
                    class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block object-cover mt-16">
                <img v-else-if="profileImage" :src="profileImage"
                    class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block object-cover mt-16">
                <!-- Image from: http://unsplash.com/photos/MP0IUfwrn0A -->

                <div v-else class="rounded-none shadow-2xl hidden lg:block text-center">
                    <div
                        class="inline-flex overflow-hidden relative justify-center items-center w-full h-auto bg-gray-500 aspect-square mr-4 shadow">
                        <span class="font-medium text-gray-300 text-[8rem]">{{ firstName[0] + lastName[0] }}</span>
                    </div>
                </div>
                <div v-if="imgSrc === null" id="changeProfileImageButton2" class="mt-4 mb-3 text-center hidden">
                    <label class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg">
                        Change Profile Image
                        <input type="file" @change="previewImage" accept="image/*;capture=camera" id="fileIp" />
                    </label>
                </div>
                <div v-if="imgSrc !== null && picture === null" id="uploadProfileImageButton"
                    class="mt-4 mb-0 text-center hidden lg:block">
                    <button @click="uploadImage"
                        class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
                        Upload Image
                    </button>
                </div>
                <div v-if="imgSrc !== null && picture === null" id="resetImageButton"
                    class="mt-1.5 text-center mb-1 hidden lg:block">
                    <button @click="resetImage"
                        class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                        Reset Image
                    </button>
                </div>
                <div v-if="picture" id="deleteImageButton" class="mt-4 mb-1 text-center hidden lg:block">
                    <button @click="deleteImage"
                        class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">
                        Delete Image
                    </button>
                </div>
            </div>
        </div>


        <!-- Pin to top right corner -->
        <!-- <div class="absolute top-0 right-0 h-12 w-18 p-4">
            <button class="js-change-theme focus:outline-none">🌙</button>
        </div> -->

        <div class="fixed z-10 w-full lg:w-max lg:mt-20vh lg:contents" style="margin-top: 74vh">
            <div class="container px-5 pt-5 pb-3 mx-auto flex flex-wrap flex-col hidden" id="uploadPrompt">
                <div class="
            w-auto
            bg-green-200
            border-x border-y border-green-900
            items-center
            py-2.5
            px-3
            text-lg
            font-medium
            text-green-900
            rounded-lg
            dark:bg-green-200
            text-center
            cursor-default
            mb-2
            lg:mx-auto
          ">
                    UPLOADED SUCCESSFULLY!
                </div>
            </div>
        </div>

        <div class="fixed z-10 w-full lg:w-max lg:mt-20vh lg:contents" style="margin-top: 74vh">
            <div v-show="error" id="myError" class="container px-5 pt-5 pb-3 mx-auto flex flex-wrap flex-col hidden">
                <div class="
            w-auto
            items-center
            py-2.5
            px-3
            text-lg
            font-medium
            rounded-lg
            text-center
            cursor-default
            mb-2
            bg-red-200
            border-x border-y border-red-900
            text-red-900
            bg-red-200
            lg:mx-auto
          ">
                    {{ error }}
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import headerComponent from "../headerComponent.vue";
import axios from "axios";
import { properties } from "../axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";
import { fb } from "../firebase";

// const people = [
//     'Wade Cooper',
//     'Arlene McCoy',
//     'Devon Webb',
//     'Tom Cook',
//     'Tanya Fox',
//     'Hellen Schmidt',
// ]
// const selectedPerson = ref(people[0])
// const query = ref('')

// const filteredPeople = computed(() =>
//     query.value === ''
//         ? people
//         : people.filter((person) => {
//             return person.toLowerCase().includes(query.value.toLowerCase())
//         })
// )

export default {
    name: "userProfile",
    components: { headerComponent },
    data() {
        return {
            email: "",
            firstName: "",
            lastName: "",
            userType: "",
            contactNo: "",
            city: "",
            postcode: "",
            uploadValue: 0,
            picture: null,
            imageData: null,
            imgSrc: null,
            profileImage: "",
            progress: false,
            uploaded: false,
            imageName: "",
            error: "",
            data: {},
            userType2: "",
            viewerEmail: "",
            viewerUserType: "",
            postcodes: [
                "400013",
                "400063",
                "400064",
                "400070",
                "400084",
                "400086"
            ],
            selectedPostcode: [],
            searchQuery: null,
        };
    },
    computed: {
        resultQuery() {
            if (this.searchQuery) {
                if (this.viewerUserType !== 'admin') {
                    // this.postcodes === this.selectedPostcode;
                    return this.selectedPostcode.filter((item) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.toLowerCase().includes(v))
                    })
                }
                else {
                    return this.postcodes.filter((item) => {
                        return this.searchQuery.toLowerCase().split(' ').every(v => item.toLowerCase().includes(v))
                    })
                }
            } else {
                if (this.viewerUserType !== 'admin') {
                    return this.selectedPostcode;
                }
                else {
                    return this.postcodes;
                }
            }
        }
    },
    async mounted() {
        this.loadData();

        if (user.email.length > 0) {
            this.viewerEmail = user.email;
        } else {
            this.viewerEmail = localStorage.getItem("email");
        }

        if (user.userType.length > 0) {
            this.viewerUserType = user.userType;
        } else {
            this.viewerUserType = localStorage.getItem("userType");
        }

        if (this.viewerEmail === this.$route.params.email || this.viewerUserType === 'admin') {
            document.getElementById("editProfileButton").classList.remove("hidden");
            document.getElementById("changePasswordButton").classList.remove("hidden");
        }
    },
    methods: {
        async loadData() {
            await axios.get(properties.server + "/user/get?email=" + this.$route.params.email).then((result) => {
                this.data = result.data;
                this.email = this.data.email;
                this.firstName = this.data.firstName;
                this.lastName = this.data.lastName;
                this.userType = this.data.userType;
                this.city = this.data.city;
                this.postcode = this.data.postcode;
                this.contactNo = this.data.contactNo;
                this.profileImage = this.data.profileImage;
                this.selectedPostcode = this.data.assignedPostcode;

                this.userType2 = this.userType;
            })
        },
        editProfile() {
            document.getElementById("editableField").classList.add("hidden");
            document.getElementById("editingField").classList.remove("hidden");
            document.getElementById("editProfileButton").classList.add("hidden");
            document.getElementById("changePasswordButton").classList.add("hidden");
            document.getElementById("saveChangesButton").classList.remove("hidden");
            document.getElementById("cancelButton").classList.remove("hidden");
            document.getElementById("changeProfileImageButton").classList.remove("hidden");
            document.getElementById("changeProfileImageButton2").classList.add("lg:block");

        },
        async saveChanges() {
            if (this.picture !== null) {
                this.profileImage = this.picture;
            }
            await axios.put(properties.server + "/user/update", {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: "",
                userType: this.userType,
                city: this.city,
                postcode: this.postcode,
                contactNo: this.contactNo,
                profileImage: this.profileImage,
                assignedPostcode: this.selectedPostcode
            }).then(
                () => {
                    this.loadData();
                    this.picture = null;
                    this.imageData = null;
                    this.imageName = "";
                    this.imgSrc = null;
                    this.progress = false;
                    this.uploaded = false;
                    document.getElementById("editableField").classList.remove("hidden");
                    document.getElementById("editingField").classList.add("hidden");
                    document.getElementById("editProfileButton").classList.remove("hidden");
                    document.getElementById("changePasswordButton").classList.remove("hidden");
                    document.getElementById("saveChangesButton").classList.add("hidden");
                    document.getElementById("cancelButton").classList.add("hidden");
                    document.getElementById("changeProfileImageButton").classList.add("hidden");
                    document.getElementById("changeProfileImageButton2").classList.remove("lg:block");

                    if (this.email === this.viewerEmail) {
                        user.storeUserInfo(
                            this.email,
                            this.firstName,
                            this.lastName,
                            this.userType,
                            this.city,
                            this.postcode,
                            this.contactNo,
                            this.profileImage,
                            this.selectedPostcode
                        );
                        localStorage.setItem("email", this.$route.params.email);
                        localStorage.setItem("firstName", this.firstName);
                        localStorage.setItem("lastName", this.lastName);
                        localStorage.setItem("userType", this.userType);
                        localStorage.setItem("city", this.city);
                        localStorage.setItem("postcode", this.postcode);
                        localStorage.setItem("contactNo", this.contactNo);
                        localStorage.setItem("profileImage", this.profileImage);
                        localStorage.setItem("assignedPostcode", this.selectedPostcode);
                    }

                }
            )

        },
        cancelChanges() {
            if (this.picture !== null) {
                this.deleteImage();
            }
            else {
                this.imageData = null;
                this.imageName = "";
                this.imgSrc = null;
            }
            this.email = this.data.email;
            this.firstName = this.data.firstName;
            this.lastName = this.data.lastName;
            this.userType = this.data.userType;
            this.city = this.data.city;
            this.postcode = this.data.postcode;
            this.contactNo = this.data.contactNo;
            this.profileImage = this.data.profileImage;
            document.getElementById("editableField").classList.remove("hidden");
            document.getElementById("editingField").classList.add("hidden");
            document.getElementById("editProfileButton").classList.remove("hidden");
            document.getElementById("changePasswordButton").classList.remove("hidden");
            document.getElementById("saveChangesButton").classList.add("hidden");
            document.getElementById("cancelButton").classList.add("hidden");
            document.getElementById("changeProfileImageButton").classList.add("hidden");
            document.getElementById("changeProfileImageButton2").classList.remove("lg:block");
        },
        previewImage(event) {
            this.uploadValue = 0;
            this.picture = null;
            this.imageData = event.target.files[0];
            this.imgSrc = URL.createObjectURL(this.imageData);
            // this.profileImage = URL.createObjectURL(this.imageData);
            // fileName = event.target.files[0].name;
        },
        resetImage() {
            this.imageData = null;
            this.imgSrc = null;
        },
        uploadImage() {
            this.progress = true;
            this.picture = null;
            const storageRef = fb
                .storage()
                .ref(this.$route.params.email + "/" + `${this.imageData.name}`)
                .put(this.imageData);
            storageRef.on(
                `state_changed`,
                (snapshot) => {
                    this.uploadValue =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    this.uploaded = false;

                    this.error = error.message;
                    document.getElementById("myError").classList.remove("hidden");
                    setTimeout(() => {
                        document.getElementById("myError").classList.add("hidden");
                    }, 4000);
                    console.log(error.message);
                },
                () => {
                    this.uploadValue = 100;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.picture = url;
                        this.imageName = `${this.imageData.name}`;
                        // console.log(this.picture);
                        // localStorage.setItem("imgURL", this.picture);
                        this.uploaded = true;
                        // const box = document.getElementById("uploadPrompt");
                        // box.style.visibility = "visible";
                        if (this.uploaded === true) {
                            document.getElementById("uploadPrompt").classList.remove("hidden");
                            setTimeout(() => {
                                document.getElementById("uploadPrompt").classList.add("hidden");
                            }, 4000);
                        }
                        // user.profileImage = this.picture;
                    });
                }
            );
        },
        deleteImage() {
            const storageRef = fb
                .storage()
                .ref(this.$route.params.email + "/" + this.imageName)
                .delete();
            storageRef
                .then(() => {
                    this.imgSrc = null;
                    this.picture = null;
                    this.imageName = "";
                    this.uploaded = false;
                    this.uploadValue = 0;
                    this.progress = false;
                    this.imageData = null;

                    this.error = "IMAGE DELETED";
                    document.getElementById("myError").classList.remove("hidden");
                    setTimeout(() => {
                        document.getElementById("myError").classList.add("hidden");
                    }, 4000);
                })
                .catch((error) => {
                    this.uploaded = false;

                    this.error = error.message;
                    document.getElementById("myError").classList.remove("hidden");

                    setTimeout(() => {
                        document.getElementById("myError").classList.add("hidden");
                    }, 4000);
                    console.log(error.message);
                });
        },
        changePassword() {
            this.$router.push({ name: "forgotPassword" });
        },
        openModal() {
            var x = document.getElementById("modal");
            // x.classList.toggle("hidden");
            x.style.display = "block";
        },
        closeModal() {
            this.userType2 = this.userType;
            var modal = document.getElementById("modal");
            modal.style.display = "none";
        },
        async changeUserType() {
            this.userType = this.userType2;
            if (this.email === this.viewerEmail) {
                this.viewerUserType = this.userType;
            }
            let response = await axios.put(
                properties.server + "/user/update/type?email=" +
                this.$route.params.email +
                "&userType=" +
                this.userType
            );
            if (response.status === 200) {
                localStorage.setItem("userType", this.userType);
                user.userType = this.userType;
                console.log("UserType Updated");
                var modal = document.getElementById("modal");
                modal.style.display = "none";
            } else {
                console.log("Error");
                // this.errorMsg = "Error : Request Failed";
                // this.errorAlert = true;
            }
        },
        postcodeDropdown() {
            document.getElementById("dropdownSearch").classList.toggle('hidden');
        },
        async updatePostcodes() {
            console.log(this.selectedPostcode);
            await axios.put(properties.server + "/user/assign/postcode?email=" + this.email,
                this.selectedPostcode
            ).then(
                () => {
                    if (this.email === this.viewerEmail) {
                        localStorage.setItem("assignedPostcode", this.selectedPostcode);
                        user.assignedPostcode = this.selectedPostcode;
                    }
                    this.loadData();
                }
            )
        },
    }
}
</script>

<style>
:root {
    --main-color: #4a76a8;
}

.bg-main-color {
    background-color: var(--main-color);
}

.text-main-color {
    color: var(--main-color);
}

.border-main-color {
    border-color: var(--main-color);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* this is for Firefox */
input[type=number] {
    /* -moz-appearance: textfield; */
}

#fileIp {
    position: absolute;
    width: 0;
    height: 0;
}
</style>