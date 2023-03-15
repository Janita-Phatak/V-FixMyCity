<template>
  <headerWithSideDrawer currentTab="Posts"></headerWithSideDrawer>

  <div
    class="text-lg font-medium text-center text-gray-500 border-b border-gray-200 pt-[54px] lg:pt-[64px] w-full fixed z-10 bg-gray-50 shadow">
    <ul class="flex -mb-px items-center">
      <li class="mr-2 w-full">
        <button id="topPosts" @click="sortByLikes"
          class="inline-block p-4 pb-2 rounded-t-lg border-b-2 border-transparent">Top</button>
      </li>
      <li class="mr-2 w-full">
        <button id="latestPosts" @click="sortByTime"
          class="inline-block p-4 pb-2 rounded-t-lg border-b-2 border-transparent" aria-current="page">Latest</button>
      </li>
      <li class="mr-2 w-full">
        <button id="resolvedPosts" @click="filterResolved"
          class="inline-block p-4 pb-2 rounded-t-lg border-b-2 border-transparent">Resolved</button>
      </li>
      <li id="filterButton" class="w-full border-l-2 border-gray-300 mr-2 hover:bg-gray-200 ">
        <button @click="openUpdateStatusTab"
          class="inline-block p-4 pb-2 text-gray-600 hover:text-indigo-600 flex items-center m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 mr-1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filter</button>
      </li>
    </ul>
  </div>

  <div id="updateStatus" class="modal" style="z-index: 20;">
    <div id="filter1"
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 pb-0 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
          Filter
        </h5>
        <button @click="closeUpdateStatus" type="button"
          class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
          aria-label="Close">&times;</button>
      </div>

      <div class="modal-body relative p-4">
        <ul class="grid gap-2 w-full md:grid-cols-2">
          <li class="shadow">
            <button @click="filter1('area')"
              class="inline-flex justify-between items-center p-3 w-full text-gray-500 bg-gray-200 rounded-lg border border-gray-300 hover:bg-indigo-600 hover:text-gray-100 active:bg-indigo-500 cursor-pointer">
              <div class="block">
                <div class="w-full text-lg font-semibold flex">Area</div>
                <div class="w-full">issues reported in an area</div>
              </div>
              <svg aria-hidden="true" class="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </li>
          <li class="shadow">
            <button @click="filter1('postcode')"
              class="inline-flex justify-between items-center p-4 w-full text-gray-500 bg-gray-200 rounded-lg border border-gray-300  hover:bg-indigo-600 hover:text-gray-100 active:bg-indigo-500 cursor-pointer">
              <div class="block">
                <div class="w-full text-lg font-semibold flex">Pincode</div>
                <div class="w-full">filter by pincode</div>
              </div>
              <svg aria-hidden="true" class="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </li>
          <li class="shadow">
            <button @click="filter1('type')"
              class="inline-flex justify-between items-center p-3 w-full text-gray-500 bg-gray-200 rounded-lg border border-gray-300 hover:bg-indigo-600 hover:text-gray-100 active:bg-indigo-500 cursor-pointer">
              <div class="block">
                <div class="w-full text-lg font-semibold flex">Type</div>
                <div class="w-full">filter by issue type</div>
              </div>
              <svg aria-hidden="true" class="ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md self-center hidden">
        <button @click="closeUpdateStatus" type="button"
          class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
          Reset
        </button>
      </div>
    </div>

    <div id="filterByArea"
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current hidden">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
          Filter by Area
        </h5>
        <button @click="closeUpdateStatus" type="button"
          class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
          aria-label="Close">&times;</button>
      </div>

      <div class="modal-body relative p-4">
        <ul class="grid gap-2 w-full md:grid-cols-2">
          <li>
            <div class="mb-6">
              <label for="area" class="block mb-2 text-sm font-medium text-gray-900">Enter
                Area</label>
              <input type="text" id="area" v-model="area"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
          </li>
        </ul>
      </div>

      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md self-center">
        <button @click="area = ''; reset()" type="button"
          class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
          Reset
        </button>
        <button @click="filterByArea()" type="button"
          class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
          Show
        </button>
      </div>
    </div>

    <div id="filterByPostcode"
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current hidden">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
          Filter by Pincode
        </h5>
        <button @click="closeUpdateStatus" type="button"
          class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
          aria-label="Close">&times;</button>
      </div>

      <div class="modal-body relative p-4">
        <ul class="grid gap-2 w-full md:grid-cols-2">
          <li>
            <div class="mb-6">
              <label for="postcode" class="block mb-2 text-sm font-medium text-gray-900">Enter
                Pincode</label>
              <input type="text" id="postcode" v-model="postcode"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
          </li>
        </ul>
      </div>

      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md self-center">
        <button @click="postcode = ''; reset()" type="button"
          class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
          Reset
        </button>
        <button @click="filterByPostcode" type="button"
          class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
          Show
        </button>
      </div>
    </div>

    <div id="filterByType"
      class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current hidden">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
          Filter by Type
        </h5>
        <button @click="closeUpdateStatus" type="button"
          class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
          aria-label="Close">&times;</button>
      </div>

      <div class="modal-body relative p-4">
        <ul class="grid gap-2 w-full md:grid-cols-2">
          <li>
            <div class="mb-6">
              <label for="type" class="block mb-2 text-sm font-medium text-gray-900">Enter
                Type</label>
              <input type="text" id="type" v-model="type"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            </div>
          </li>
        </ul>
      </div>

      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md self-center">
        <button @click="type = ''; reset()" type="button"
          class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
          Reset
        </button>
        <button @click="filterByType()" type="button"
          class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
          Show
        </button>
      </div>

    </div>
  </div>

  <div id="noPosts" class="noPosts hidden">
    <h1 class="text-2xl">No Posts available</h1>
    <p class="mt-1 text-lg">
      <router-link :to="'/locate'" class="underline">click here</router-link> to report an issue
    </p>
  </div>

  <div id="blog" class="bg-gray-50 px-4 pt-28 pb-5 pb-[60px]">
    <div class="mx-auto container">
      <div tabindex="0" aria-label="Group of cards" class="focus:outline-none mt-2 lg:mt-4" v-for="item in posts"
        :key="item.postID">
        <div class="
            grid
            sm:grid-cols-1
            md:grid-cols-1
            lg:grid-cols-1
            xl:grid-cols-1
            gap-8
          ">
          <div tabindex="0" class="focus:outline-none shadow-lg rounded-lg" :aria-label="item.postID">
            <div @click="cardClicked(item.postID)" class="flex items-start px-4 py-6 w-full">
              <img v-if="item.profileImage" class="w-12 h-12 rounded-full object-cover mr-4 shadow aspect-square"
                :src="item.profileImage" alt="avatar" />
              <div v-else
                class="inline-flex overflow-hidden relative justify-center items-center w-12 h-auto rounded-full bg-gray-500 aspect-square mr-4 shadow"
                style="width: 48px;">
                <span class="font-medium text-gray-300">{{ item.firstName[0] + item.lastName[0] }}</span>
              </div>
              <div class="w-full">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold text-gray-900 -mt-1">
                    {{ item.firstName }}
                  </h2>
                  <small class="text-lg text-gray-700">{{
                    item.day + "/" + item.month + "/" + item.year
                  }}</small>
                </div>
                <p class="text-gray-700 text-base">
                  {{ item.area + " at " + item.time }}
                </p>
                <h1 tabindex="0" class="
                    focus:outline-none
                    text-lg text-gray-900
                    font-medium
                    tracking-wider
                    mt-3
                  ">
                  {{ item.type }}
                </h1>
                <p tabindex="0" class="
                    focus:outline-none
                    text-gray-700 text-lg
                    leading-8
                    pr-4
                    tracking-wide
                    mt-0
                    mb-2
                  ">
                  {{ item.description }}
                </p>
                <img role="img" :aria-label="'post' + item.postID" tabindex="0" class="
                    focus:outline-none
                    w-full
                    rounded-t-[15px]
                    aspect-[1/1]
                    object-cover
                  " :src="item.imageURL" :alt="'post' + item.postID" />
                <div class="
                    py-4
                    px-8
                    w-full
                    flex
                    justify-between
                    bg-indigo-600
                    rounded-b-[15px]
                  ">
                  <p tabindex="0" class="
                      focus:outline-none
                      text-sm text-white
                      font-semibold
                      tracking-wide
                    ">
                    {{ item.street_address }}
                  </p>
                </div>

                <div class="mt-4 flex items-center">
                  <button class="
                      flex
                      mr-2
                      text-gray-700 text-lg
                      mr-4
                      hover:text-pink-600
                      items-center
                    " @click.stop="like(item.postID)">
                    <svg v-if="item.likedBy.includes(email)" color="rgb(225 29 72)" fill="rgb(225 29 72)"
                      viewBox="0 0 24 24" class="w-7 h-7 mr-1" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg v-else fill="none" viewBox="0 0 24 24" class="w-7 h-7 mr-1" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span v-if="item.likedBy.length > 0" class="text-gray-700 text-base">{{
                      item.likedBy.length
                    }}</span>
                  </button>
                  <button class="
                      flex
                      mr-2
                      text-gray-700 text-lg
                      ml-2
                      hover:text-indigo-600
                    " @click.stop="cardClicked(item.postID)">
                    <svg fill="none" viewBox="0 0 24 24" class="w-7 h-7 mr-1" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <span v-if="item.commentIDs.length > 0" class="text-gray-700 text-base">{{
                      item.commentIDs.length
                    }}</span>
                  </button>
                </div>
              </div>
              <div class="h-5 w-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading">
      <div role="status"
        class="container p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 mx-auto my-4 w-full">
        <div class="flex items-center mt-4 space-x-3">
          <svg class="text-gray-300 w-14 h-14" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"></path>
          </svg>
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full w-32 mb-2"></div>
            <div class="w-48 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div class="h-2 bg-gray-300 rounded-full mb-2 ml-16"></div>
        <div class="grid grid-cols-3 gap-4 ml-16 mb-4">
          <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          <div class="h-2 bg-gray-300 rounded col-span-1"></div>
        </div>

        <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ml-16">
          <svg class="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor"
            viewBox="0 0 640 512">
            <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
      <div role="status" class="container p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 mx-auto">
        <div class="flex items-center mt-4 space-x-3">
          <svg class="text-gray-300 w-14 h-14" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"></path>
          </svg>
          <div>
            <div class="h-2.5 bg-gray-300 rounded-full w-32 mb-2"></div>
            <div class="w-48 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div class="h-2 bg-gray-300 rounded-full mb-2 ml-16"></div>
        <div class="grid grid-cols-3 gap-4 ml-16 mb-4">
          <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          <div class="h-2 bg-gray-300 rounded col-span-1"></div>
        </div>

        <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ml-16">
          <svg class="w-12 h-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor"
            viewBox="0 0 640 512">
            <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import headerWithSideDrawer from "./headerWithSideDrawer.vue";
import axios from "axios";
import { properties } from "./axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";
import { posts } from "@/components/postProblem/stores/postsData.js"
export default {
  name: "postsView",
  components: { headerWithSideDrawer },
  data() {
    return {
      posts: [],
      email: "",
      userName: "",
      postcode: "",
      area: "",
      type: "",
      cond: true,
      assignedPostcode: [],
      userType: "",
      isLoading: true,
    };
  },
  async mounted() {
    if (user.email.length > 0) {
      this.userName = user.firstName;
      this.email = user.email;
      this.userType = user.userType;
      this.assignedPostcode = user.assignedPostcode;
    } else {
      this.userName = localStorage.getItem("firstName");
      this.email = localStorage.getItem("email");
      this.userType = localStorage.getItem("userType");
      this.assignedPostcode = localStorage.getItem("assignedPostcode");
    }

    if (!this.userName || !this.email) {
      this.$router.push({ name: "loginPage" });
    }

    await this.loadData();

    // var myInterval = setInterval(() => {
    //   if (posts.sortedPosts[parseInt(posts.size) - 1].lastName.length > 0) {
    //     this.loadPosts();
    //     clearInterval(myInterval);
    //   }
    //   //when done clearInterval(myInterval)
    // }, 500);
  },

  methods: {
    async loadData() {
      this.isLoading = true;
      if (this.userType === "official" || this.userType === "worker") {
        await axios.get(properties.server + "/post/details/filter?email=" + this.email).then(
          (res) => {
            posts.posts = res.data;
            posts.sortedPosts = posts.posts;
            this.posts = posts.sortedPosts;
            this.sortByLikes();
          }
        )
      }
      else {
        await axios.get(properties.server + "/post/details/all").then(
          (res) => {
            posts.posts = res.data;
            posts.sortedPosts = posts.posts;
            this.posts = posts.sortedPosts;
            this.sortByLikes();
          }
        )
      }
      this.isLoading = false;
      // await axios.get(properties.server + "/post/posts").then(
      //   function (res) {
      //     let result = res.data;
      //     posts.size = result.length;
      //     result.forEach(async function (p) {
      //       await axios.get(properties.server + "/user/get?email=" + p.email).then(
      //         function (i) {
      //           let x = i.data;
      //           p.lastName = x.lastName;
      //         }
      //       )
      //     });
      //     posts.posts = result;
      //     posts.sortedPosts = posts.posts
      //   }
      // );
    },
    // loadPosts() {
    //   this.posts = posts.sortedPosts;
    //   this.sortByLikes();
    // },
    cardClicked(id) {
      console.log("Post ID : " + id);
      this.$router.push({ path: "/post/" + id });
    },
    openUpdateStatusTab() {
      var x = document.getElementById("updateStatus");
      // x.classList.toggle("hidden");
      x.style.display = "block";
    },
    closeUpdateStatus() {
      // this.status2 = this.status;
      var modal = document.getElementById("updateStatus");
      modal.style.display = "none";

      if (this.postcode === "" && this.area === "" && this.type === "") {
        document.getElementById("filterByPostcode").classList.add("hidden");
        document.getElementById("filterByArea").classList.add("hidden");
        document.getElementById("filterByType").classList.add("hidden");
        document.getElementById("filter1").classList.remove("hidden");
      }

      // When the user clicks anywhere outside of the modal, close it
      // window.onclick = function (event) {
      //   if (event.target == modal) {
      //     modal.style.display = "none";
      //   }
      // }
    },
    sortByLikes() {
      this.resetTabs();
      var element = document.getElementById("topPosts");
      element.classList.add("text-indigo-600");
      element.classList.add("border-indigo-600");

      this.posts = [];
      this.posts = posts.sortedPosts.sort((p1, p2) => {
        if (p1.likedBy.length > p2.likedBy.length) {
          return -1;
        }
        else if (p1.likedBy.length < p2.likedBy.length) {
          return 1;
        }
        else {
          return 0;
        }
      });
      this.posts = this.posts.filter(p => {
        return p.status !== "fixed"
      });
      this.noPostsMsgDisplay();
    },
    sortByTime() {
      this.resetTabs();
      var element = document.getElementById("latestPosts");
      element.classList.add("text-indigo-600");
      element.classList.add("border-indigo-600");

      this.posts = [];
      this.posts = posts.sortedPosts.forEach(p => p.date = new Date(p.year, p.month, p.day, p.hour, p.minute, p.second));
      this.posts = posts.sortedPosts.sort((p1, p2) => p2.date - p1.date);
      this.posts = this.posts.filter(p => {
        return p.status !== "fixed"
      });
      this.noPostsMsgDisplay();
    },
    filterResolved() {
      this.resetTabs();
      var element = document.getElementById("resolvedPosts");
      element.classList.add("text-indigo-600");
      element.classList.add("border-indigo-600");

      this.posts = posts.sortedPosts
      this.posts = this.posts.filter(p => {
        return p.status === "fixed"
      });
      this.noPostsMsgDisplay();
    },
    resetTabs() {
      var topPosts = document.getElementById("topPosts");
      topPosts.classList.remove("text-indigo-600");
      topPosts.classList.remove("border-indigo-600");
      topPosts.classList.add("border-transparent");

      var latestPosts = document.getElementById("latestPosts");
      latestPosts.classList.remove("text-indigo-600");
      latestPosts.classList.remove("border-indigo-600");
      latestPosts.classList.add("border-transparent");

      var resolvedPosts = document.getElementById("resolvedPosts");
      resolvedPosts.classList.remove("text-indigo-600");
      resolvedPosts.classList.remove("border-indigo-600");
      resolvedPosts.classList.add("border-transparent");
    },
    async like(pID) {
      if (!this.email) {
        window.alert("Please login");
      } else {
        if (this.posts.find(p => p.postID === pID).likedBy.includes(this.email)) {
          // thisExpression.
          const index = this.posts.find(p => p.postID === pID).likedBy.indexOf(this.email);
          if (index > -1) {
            // only splice array when item is found
            this.posts.forEach(p => {
              if (p.postID === pID) {
                p.likedBy.splice(index, 1)
              }
            });
          }
          await axios.put(
            properties.server + "/post/posts/unlike?postID=" + pID + "&email=" + this.email
          );
          await this.loadData().then(this.sortData());
        } else {
          this.posts.forEach(p => {
            if (p.postID === pID) {
              p.likedBy.push(this.email);
            }
          });
          await axios.put(
            properties.server + "/post/posts/like?postID=" + pID + "&email=" + this.email
          ).then(this.loadData().then(this.sortData()));
        }
      }
    },
    sortData() {
      if (this.postcode.length > 0) {
        this.filterByPostcode();
      }
      else if (this.area.length > 0) {
        this.filterByArea();
      }
      else if (this.type.length > 0) {
        this.filterByType();
      }
    },
    filter1(input) {
      var filter1 = document.getElementById("filter1");
      if (input === "postcode") {
        filter1.classList.add("hidden");
        document.getElementById("filterByPostcode").classList.remove("hidden");
      }
      else if (input === "area") {
        filter1.classList.add("hidden");
        document.getElementById("filterByArea").classList.remove("hidden");
      }
      else if (input === "type") {
        filter1.classList.add("hidden");
        document.getElementById("filterByType").classList.remove("hidden");
      }
    },
    filterByPostcode() {
      this.posts = posts.posts;
      this.posts = this.posts.filter(p => {
        return p.postcode === this.postcode
      });

      if (this.posts.length === 0) {
        window.alert("No Posts Found");
        this.posts = posts.posts;
      }
      else {
        posts.sortedPosts = this.posts;
        var modal = document.getElementById("updateStatus");
        modal.style.display = "none";
        this.sortByLikes();
      }
    },
    filterByArea() {
      this.area = this.area.trim();
      this.posts = posts.posts;
      this.posts = this.posts.filter(p => {
        return p.address.includes(this.area)
      });
      // if (this.posts.length === 0) {
      //   this.posts = posts.posts;
      //   const a = this.area.replace( /^\s+|\s+$/gm, '');
      //   this.posts = this.posts.filter(p => {
      //     return p.address.includes(a)
      //   });
      // }

      if (this.posts.length === 0) {
        this.posts = posts.posts;
        const a = this.area.charAt(0).toUpperCase() + this.area.toLowerCase().toString().slice(1);
        this.posts = this.posts.filter(p => {
          return p.address.includes(a)
        });
      }

      if (this.posts.length === 0) {
        this.posts = posts.posts;
        const a = this.area.toUpperCase();
        this.posts = this.posts.filter(p => {
          return p.address.includes(a)
        });
      }

      if (this.posts.length === 0) {
        this.posts = posts.posts;
        const a = this.area.toLowerCase();
        this.posts = this.posts.filter(p => {
          return p.address.includes(a)
        });
      }

      if (this.posts.length === 0) {
        window.alert("No Posts Found");
        this.posts = posts.posts;
      }
      else {
        posts.sortedPosts = this.posts;
        var modal = document.getElementById("updateStatus");
        modal.style.display = "none";
        this.sortByLikes();
      }

    },
    filterByType() {
      this.posts = posts.posts;
      this.posts = this.posts.filter(p => {
        return p.type.includes(this.type) || p.description.includes(this.type)
      });

      if (this.posts.length === 0) {
        this.posts = posts.posts;
        const a = this.type.charAt(0).toUpperCase() + this.type.toLowerCase().toString().slice(1);
        this.posts = this.posts.filter(p => {
          return p.type.includes(a) || p.description.includes(a)
        });
      }

      if (this.posts.length === 0) {
        this.posts = posts.posts;
        const a = this.type.toUpperCase();
        this.posts = this.posts.filter(p => {
          return p.type.includes(a) || p.description.includes(a)
        });
      }

      if (this.posts.length === 0) {
        this.posts = posts.posts;
        const a = this.type.toLowerCase();
        this.posts = this.posts.filter(p => {
          return p.type.includes(a) || p.description.includes(a)
        });
      }

      if (this.posts.length === 0) {
        window.alert("No Posts Found");
        this.posts = posts.posts;
      }
      else {
        posts.sortedPosts = this.posts;
        var modal = document.getElementById("updateStatus");
        modal.style.display = "none";
        this.sortByLikes();
      }

    },
    async reset() {
      this.posts = [];
      document.getElementById("filterByPostcode").classList.add("hidden");
      document.getElementById("filterByArea").classList.add("hidden");
      document.getElementById("filterByType").classList.add("hidden");
      document.getElementById("filter1").classList.remove("hidden");
      await this.loadData().then(
        posts.sortedPosts = posts.posts);
      this.sortByLikes();
    },
    noPostsMsgDisplay() {
      if (this.posts.length <= 0) {
        document.getElementById("noPosts").classList.remove("hidden");
      }
      else {
        document.getElementById("noPosts").classList.add("hidden");
      }
    }
  },
};
</script>

<style>
.modal {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
  z-index: 1
}

.modal-content {
  width: max-content;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.noPosts {
  width: max-content;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>