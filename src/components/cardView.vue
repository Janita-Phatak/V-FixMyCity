<template>
  <headerWithSideDrawer currentTab="Post" :backButton="true" />
  <section class="bg-gray-100 pb-[60px]" id="detailsBg" v-if="!isLoading">
    <div class="mt-[53px]">
      <!-- <div v-if="!isLoading"> -->
      <div class="
          bg-gray-50
          px-4
          lg:px-6
          py-2.5
          w-full
          shadow-lg
          focus:outline-none
          flex
          items-center
          w-full
        ">
        <a :href="'/user/' + post.email">
          <img v-if="pprofileImage !== null" class="w-12 h-12 rounded-full object-cover mr-4 shadow"
            :src="pprofileImage" alt="avatar" />
          <div v-else
            class="inline-flex overflow-hidden relative justify-center items-center w-12 h-auto rounded-full bg-gray-500 aspect-square mr-4 shadow"
            style="width: 48px;">
            <span class="font-medium text-gray-300">{{ pfirstName[0] + plastName[0] }}</span>
          </div>
        </a>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <div>
              <a :href="'/user/' + post.email">
                <h2 class="text-lg font-semibold text-gray-900 -mt-1">
                  {{ post.firstName }}
                </h2>
              </a>
              <small class="text-base text-gray-700">{{ date }}</small>
            </div>
            <div class="dropdown">
              <button class="dropbtn                 
                    p-2
                    text-sm
                    font-medium
                    text-center text-gray-900
                    bg-white
                    rounded-lg
                    hover:bg-gray-50
                    focus:ring-4 focus:outline-none focus:ring-gray-50">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                  </path>
                </svg>
              </button>
              <div class="dropdown-content min-w-max right-[-10px] pt-1 pb-1">
                <button v-if="userType === 'admin' || userType === 'official'" @click="openResolveTab"
                  class="block py-1 px-4 hover:bg-gray-100 text-base text-gray-700 font-normal ">Resolve</button>
                <a href="#" class="block py-1 px-4 hover:bg-gray-100 text-base text-gray-700 font-normal ">Save</a>
                <button class="block py-1 px-4 hover:bg-gray-100 text-base text-gray-700 font-normal ">Report</button>
                <div class="py-1">
                  <button v-if="userType === 'admin' || email === post.email" v-on:click="openDeletePostModal" class="
                          px-4
                          text-base text-red-500
                          hover:text-red-800 hover:bg-gray-100
                          font-normal
                        ">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div id="deletePostModal" class="modal" style="z-index: 20;">
              <div
                class="deletePostModal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div
                  class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <h5 class="text-xl font-medium leading-normal text-gray-800" >
                    Alert!
                  </h5>
                  <button @click="closeDeletePostModal" type="button"
                    class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
                    aria-label="Close">&times;</button>
                </div>
                <div class="modal-body relative p-4">
                  <div class="flex items-center mb-1.5">
                    <h5 class="text-xl font-medium leading-normal text-gray-800 mx-4" >
                    Are you sure you want to delete it?
                  </h5>
                  </div>
                </div>

                <div
                  class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button @click="closeDeletePostModal" type="button"
                    class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
                    Cancel
                  </button>
                  <button @click="deletePost" type="button"
                    class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                    Yes, delete
                  </button>
                </div>
              </div>
            </div>

            <div id="resolveIssue" class="modal" style="z-index: 20;">
              <div
                class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div>
                  <div
                    class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5 class="text-xl font-medium leading-normal text-gray-800"
                      id="exampleModalCenteredScrollableLabel">
                      Resolve Issue
                    </h5>
                    <button @click="closeResolveIssue" type="button"
                      class="btn-close box-content p-1 text-4xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline font-medium"
                      aria-label="Close">&times;</button>
                  </div>
                  <div class="modal-body relative px-4">


                    <div class="px-2">
                      <div class="
                flex
                absolute
                items-center
                pl-3
                mt-3
                pointer-events-none
              ">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor"
                          viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </div>
                      <input v-model="searchQuery" type="text" id="input-group-search" @input="checkWorker"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-base focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-12 p-2.5 lg:mt-6"
                        placeholder="Search Worker">
                    </div>

                    <div v-if="workers.length > 0" id="blog" class="bg-gray-50 px-2">
                      <div class="mx-auto container relative grid">

                        <div class="w-full py-2 px-0 bg-white border rounded-lg sm:p-8 absolute z-10">

                          <div class="flow-root overflow-y-auto max-h-[25vh]">
                            <ul role="list" class="divide-y divide-gray-200">

                              <li v-for="item in resultQuery" :key="item.email" @click="selectWorker(item.email)"
                                class="mx-2">
                                <input :id="item.email" type="radio" :value="item.email" v-model="selectedWorker2"
                                  class="sr-only hidden peer/selected">
                                <label :for="item.email"
                                  class="flex items-center space-x-4 py-3 my-1 sm:py-4 px-2 border-2 border-gray-300 rounded-lg peer-checked/selected:bg-indigo-200 peer-checked/selected:ring-indigo-600 peer-checked/selected:ring-2">
                                  <div class="flex-shrink-0">
                                    <img v-if="item.profileImage" class="w-12 h-12 rounded-full object-cover"
                                      :src="item.profileImage" alt="avatar">
                                    <div v-else
                                      class="inline-flex overflow-hidden relative justify-center items-center w-12 h-auto rounded-full bg-gray-500 aspect-square  shadow">
                                      <span class="font-medium text-gray-300">{{
                                        item.firstName[0] +
                                          item.lastName[0]
                                      }}</span>
                                    </div>
                                  </div>
                                  <div class="flex-1 min-w-0">
                                    <p class="text-lg font-semibold text-gray-900 truncate">
                                      {{ (item.firstName + " " + item.lastName) }}
                                    </p>
                                    <p class="text-lg text-gray-500 truncate">
                                      {{ item.email }}
                                    </p>
                                  </div>
                                  <span class="inline-flex items-center text-sm font-semibold px-2 py-2 text-gray-900">
                                    {{ item.userType[0].toUpperCase() + item.userType.slice(1) }}
                                  </span>
                                </label>
                              </li>
                              <div v-if="noWorker == true" class="flex item-center space-x-4">
                                <p class="text-lg mx-auto">No Worker found</p>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div>
                  <p v-if="post.assignedWorker" class="mx-5 text-lg">Worker assigned: {{ post.assignedWorker }}</p>
                  <p v-else class="mx-5 text-lg">Assigned worker: No worker assigned</p>

                  <p v-if="post.assignedOn" class="mx-5 text-lg">Assigned on: {{ post.assignedOn }}</p>
                  <p v-else class="mx-5 text-lg">Assigned on: - </p>

                  <div
                    class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md justify-center">
                    <button
                      v-if="selectedWorker2 === selectedWorker && selectedWorker && post.assignedWorker && unAssigningWorker === false"
                      @click="unassignWorker('reported')" type="button"
                      class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out">
                      Unassign
                    </button>
                    <div v-if="unAssigningWorker === true"
                      class="inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                      style="box-shadow: rgb(0 0 0 / 25%) 0px 10px 60px 0px">
                      <svg class=" inline mr-3 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300
              " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor" />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill" />
                      </svg>
                      Removing...
                    </div>
                    <button v-if="selectedWorker !== selectedWorker2 && selectedWorker2 && assigningWorker === false"
                      @click="assignWorker" type="button"
                      class="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                      Assign
                    </button>

                    <div v-if="assigningWorker === true" class="
                    inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out ml-1
            " style="box-shadow: rgb(0 0 0 / 25%) 0px 10px 60px 0px">
                      <svg class=" inline mr-3 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300
              " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor" />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill" />
                      </svg>
                      Assigning...
                    </div>

                    <button v-if="post.assignedWorker && selectedWorker && (markingAsResolved === false)"
                      @click="markAsResolved" type="button"
                      class="inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                      Mark as Resolved
                    </button>
                    <div v-if="markingAsResolved === true"
                      class="inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      style="box-shadow: rgb(0 0 0 / 25%) 0px 10px 60px 0px">
                      <svg class=" inline mr-3 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300
              " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor" />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill" />
                      </svg>
                      Processing...
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="relative shadow-lg bg-gray-600">
        <img class="
            relative
            bg-gray-50
            w-auto
            mx-auto
            overflow-clip
            preview
            max-h-[40rem]
            h-auto
            object-contain
          " :src="post.imageURL" />
      </div>

      <div class="
          flex
          items-center
          bg-gray-50
          px-7
          lg:px-6
          py-2.5
          w-full
          shadow-lg
          focus:outline-none
          justify-between
        ">
        <button class="flex hover:border-pink-600 items-center" @click.stop="like">
          <svg v-if="likedBy.includes(email)" color="rgb(225 29 72)" fill="rgb(225 29 72)" viewBox="0 0 24 24"
            class="w-7 h-7 mr-1" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg v-else fill="none" viewBox="0 0 24 24" class="w-7 h-7 mr-1" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span v-if="likedBy.length > 0" class="text-gray-700 text-base">{{
            likedBy.length
          }}</span>
        </button>

        <div class="items-center">
          <div v-if="status === 'open'" class="inline-flex items-center mr-2">
            <p class="mr-2">Status : Open</p>
            <div class="led-yellow"></div>
          </div>

          <div v-else-if="status === 'fixed'" class="inline-flex items-center mr-2">
            <p class="mr-2">Status : Fixed</p>
            <div class="led-green"></div>
          </div>

          <div v-else class="inline-flex items-center mr-2">
            <p class="mr-2">Status : Reported</p>
            <div class="led-red"></div>
          </div>
        </div>
      </div>

      <div class="mt-2 mb-2 px-5 py-2 mx-auto flex flex-col w-full relative">
        <h1 tabindex="0" class="
            focus:outline-none
            text-lg text-gray-900
            font-semibold
            tracking-wider
            mt-3
            relative
            title-font
            mb-0.5
            pl-2
          ">
          {{ post.type }}
        </h1>
        <div>
          <p tabindex="0" class="
              focus:outline-none
              text-gray-700 text-lg
              leading-8
              pr-4
              tracking-wide
              mt-0
              mb-4
              relative
              mb-2
              pl-2
            ">
            {{ post.description }}
          </p>

          <div class="flex items-start w-full mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mr-3 h-fit pt-[4px] stroke-gray-500" fill="none"
              viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p v-if="post.street_address && post.city">
                {{
                  post.street_address +
                    ", City: " +
                    post.city +
                    ", Postcode: " +
                    post.postcode
                }}
              </p>
              <p v-else-if="post.street_address && !post.city">
                {{ post.street_address + ", City: " + post.city }}
              </p>
              <p v-else-if="!post.street_address && post.city">
                {{ post.street_address + ", Postcode: " + post.postcode }}
              </p>
              <p v-else>
                {{ post.street_address }}
              </p>
              <p v-if="post.additionalDetails">
                {{ "Additional Details: " + post.additionalDetails }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
      <CommentReply />
    </div>
  </section>
  <div v-else class="mt-[53px]">
    <div role="status" class="p-4 border border-gray-300 rounded shadow animate-pulse md:p-6 mx-auto my-2 w-full">
      <div class="flex items-center mt-2 space-x-3">
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

      <div class="flex items-center justify-center h-64 mb-4 bg-gray-300 rounded mt-4">
        <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor"
          viewBox="0 0 640 512">
          <path
            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>

      <div class="mx-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full w-32 mb-2"></div>
          <div class="w-48 h-2 bg-gray-300 rounded-full"></div>
        </div>

        <div class="h-2 bg-gray-300 rounded-full my-2"></div>
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="h-2 bg-gray-300 rounded col-span-2"></div>
          <div class="h-2 bg-gray-300 rounded col-span-1"></div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-gray-300 rounded col-span-1"></div>
          <div class="h-2 bg-gray-300 rounded col-span-2"></div>
        </div>
        <div class="h-2 bg-gray-300 rounded-full my-2"></div>
        <div class="grid grid-cols-7 gap-4 mb-4">
          <div class="h-2 bg-gray-300 rounded col-span-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerWithSideDrawer from "./headerWithSideDrawer.vue";
import axios from "axios";
import { properties } from "./axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";
import CommentReply from "./commentReply.vue";
// import { thisExpression } from "@babel/types";

export default {
  name: "cardView",
  components: { headerWithSideDrawer, CommentReply },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      profileImage: "",
      userType: "",
      post: [],
      comment: "",
      date: "",
      likedBy: [],
      status: "",
      status2: "",
      pprofileImage: null,
      pfirstName: "",
      plastName: "",
      workers: [],
      searchQuery: null,
      selectedWorker: "",
      selectedWorker2: "",
      noWorker: false,
      noWorkerShow: false,
      isLoading: true,
      assigningWorker: false,
      unAssigningWorker: false,
      markingAsResolved: false
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.workers.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every(v => item.email.toLowerCase().includes(v));
        })
      }
      else {
        return this.workers;
      }
    }
  },
  beforeMount() {
    if (user.email.length > 0) {
      this.email = user.email;
    } else {
      this.email = localStorage.getItem("email");
    }
    if (user.firstName.length > 0) {
      this.firstName = user.firstName;
    } else {
      this.firstName = localStorage.getItem("firstName");
    }

    if (user.lastName.length > 0) {
      this.lastName = user.lastName;
    } else {
      this.lastName = localStorage.getItem("lastName");
    }

    if (user.profileImage.length > 0) {
      this.profileImage = user.profileImage;
    } else {
      this.profileImage = localStorage.getItem("profileImage");
    }

    if (user.userType.length > 0) {
      this.userType = user.userType;
    } else {
      this.userType = localStorage.getItem("userType");
    }
  },

  async mounted() {
    await this.loadData();

    if (this.userType === "admin" || this.userType === "official") {
      await this.loadWorkerData();
    }
  },

  methods: {
    async loadData() {
      await axios.get(
        properties.server + "/post/details/get?postID=" + this.$route.params.postID
      ).then((result) => {
        this.post = result.data;
        this.dateFormatter();
        this.status = this.post.status;
        this.status2 = this.status;
        this.likedBy = this.post.likedBy;
        this.pfirstName = this.post.firstName;
        this.plastName = this.post.lastName;
        this.selectedWorker = this.post.assignedWorker;
        this.selectedWorker2 = this.selectedWorker;
        if (this.post.profileImage.length > 0) {
          this.pprofileImage = this.post.profileImage;
        }
        else {
          this.pprofileImage = null;
        }
      }
      );
      this.isLoading = false;
    },
    async loadWorkerData() {
      await axios.get(properties.server + "/user/worker/filter/postcode?postcode=" + this.post.postcode).then(
        (res) => {
          this.workers = res.data;
        }
      )
    },
    myFunction() {
      var x = document.getElementById("dropdownDots");
      x.classList.toggle("hidden");
    },
    dateFormatter() {
      this.date =
        this.getOrdinalNum(this.post.day) +
        " " +
        this.getMonth(this.post.month) +
        " " +
        this.post.year;
    },
    getOrdinalNum(n) {
      return (
        n +
        (n > 0
          ? ["th", "st", "nd", "rd"][
          (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
          ]
          : "")
      );
    },
    getMonth(month) {
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months[month - 1];
    },
    async deletePost() {
      let response = await axios.delete(
        properties.server + "/post/delete?postID=" + this.$route.params.postID
      );
      if (response.status == 200) {
        this.$router.push({ name: "postsView" });
      } else {
        console.error("Error : Something went wrong while deleting the post");
      }
    },
    async like() {
      if (!this.email) {
        window.alert("Please login");
      } else {
        if (this.likedBy.includes(this.email)) {
          // thisExpression.
          const index = this.likedBy.indexOf(this.email);
          if (index > -1) {
            // only splice array when item is found
            this.likedBy.splice(index, 1);
          }
          await axios.put(
            properties.server + "/post/posts/unlike?postID=" + this.$route.params.postID + "&email=" + this.email
          );
          await this.loadData();
        } else {
          this.likedBy.push(this.email);
          await axios.put(
            properties.server + "/post/posts/like?postID=" + this.$route.params.postID + "&email=" + this.email
          ).then(this.loadData());
        }
      }
    },
    openResolveTab() {
      var x = document.getElementById("resolveIssue");
      // x.classList.toggle("hidden");
      x.style.display = "block";
    },
    closeResolveIssue() {
      this.selectedWorker2 = this.selectedWorker;
      var modal = document.getElementById("resolveIssue");
      modal.style.display = "none";
    },
    async saveStatusChanges() {
      this.status = this.status2;
      await axios.put(
        properties.server + "/post/posts/update/status?postID=" +
        this.post.postID +
        "&status=" +
        this.status
      ).then(
        (res) => {
          if (res.status === 200) {
            this.loadData();
            console.log("Status Updated");
          } else {
            console.log("Error");
          }
        }
      )
    },
    checkWorker() {
      if (this.searchQuery) {
        this.noWorkerShow = true;
      }
      else {
        this.noWorkerShow = false;
      }

      if (this.resultQuery.length <= 0) {
        this.noWorker = true;
      }
      else {
        this.noWorker = false
      }
    },
    selectWorker(email) {
      this.selectedWorker2 = email;
    },
    async assignWorker() {
      this.assigningWorker = true;
      await axios.put(properties.server + "/post/details/assign/worker?postID=" + this.$route.params.postID + "&email=" + this.selectedWorker2).then(
        (res) => {
          if (res.status === 200) {
            this.selectedWorker = this.selectedWorker2;
            if (this.status === "reported" || this.status === "fixed") {
              this.status2 = "open";
              this.loadWorkerData();
              this.saveStatusChanges();
            }
            else {
              this.status2 = this.status;
              this.loadWorkerData();
              this.loadData();
            }
          }
        }
      )
      this.assigningWorker = false;
    },
    async removeWorker(status) {
      await axios.delete(properties.server + "/post/details/unassign/worker?postID=" + this.$route.params.postID).then(
        (res) => {
          if (res.status === 200) {
            this.status2 = status;
            this.loadWorkerData();
            this.saveStatusChanges();
          }
        }
      );
    },
    async unassignWorker() {
      this.unAssigningWorker = true;
      await this.removeWorker("reported");
      this.selectedWorker2 = "";
      this.selectedWorker = "";
      this.unAssigningWorker = false;
    },
    async markAsResolved() {
      this.markingAsResolved = true;
      await this.removeWorker("fixed");
      this.markingAsResolved = false;
    },
    openDeletePostModal() {
      var x = document.getElementById("deletePostModal");
      x.style.display = "block";
    },
    closeDeletePostModal() {
      var modal = document.getElementById("deletePostModal");
      modal.style.display = "none";
    }
  },
};
</script>

<style scoped>
.dropbtn {
  cursor: pointer;
  background-color: transparent;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  /* min-width: 160px; */
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  text-decoration: none;
  display: block;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.container {
  background-size: cover;
  background: rgb(226, 226, 226);
  /* Old browsers */
  background: -moz-linear-gradient(top,
      rgba(226, 226, 226, 1) 0%,
      rgba(219, 219, 219, 1) 50%,
      rgba(209, 209, 209, 1) 51%,
      rgba(254, 254, 254, 1) 100%);
  /* FF3.6+ */
  background: -webkit-gradient(linear,
      left top,
      left bottom,
      color-stop(0%, rgba(226, 226, 226, 1)),
      color-stop(50%, rgba(219, 219, 219, 1)),
      color-stop(51%, rgba(209, 209, 209, 1)),
      color-stop(100%, rgba(254, 254, 254, 1)));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top,
      rgba(226, 226, 226, 1) 0%,
      rgba(219, 219, 219, 1) 50%,
      rgba(209, 209, 209, 1) 51%,
      rgba(254, 254, 254, 1) 100%);
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(top,
      rgba(226, 226, 226, 1) 0%,
      rgba(219, 219, 219, 1) 50%,
      rgba(209, 209, 209, 1) 51%,
      rgba(254, 254, 254, 1) 100%);
  /* Opera 11.10+ */
  background: -ms-linear-gradient(top,
      rgba(226, 226, 226, 1) 0%,
      rgba(219, 219, 219, 1) 50%,
      rgba(209, 209, 209, 1) 51%,
      rgba(254, 254, 254, 1) 100%);
  /* IE10+ */
  background: linear-gradient(to bottom,
      rgba(226, 226, 226, 1) 0%,
      rgba(219, 219, 219, 1) 50%,
      rgba(209, 209, 209, 1) 51%,
      rgba(254, 254, 254, 1) 100%);
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e2e2e2', endColorstr='#fefefe', GradientType=0);
  /* IE6-9 */
  padding: 20px;
}

.led-box {
  height: 30px;
  width: 25%;
  margin: 10px 0;
  float: left;
}

.led-box p {
  font-size: 12px;
  text-align: center;
  margin: 1em;
}

.led-red {
  margin: 0 auto;
  width: 15px;
  height: 15px;
  background-color: #f00;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
    rgba(255, 0, 0, 0.5) 0 2px 12px;
  -webkit-animation: blinkRed 0.5s infinite;
  -moz-animation: blinkRed 0.5s infinite;
  -ms-animation: blinkRed 0.5s infinite;
  -o-animation: blinkRed 0.5s infinite;
  animation: blinkRed 0.5s infinite;
}

@-webkit-keyframes blinkRed {
  from {
    background-color: #f00;
  }

  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }

  to {
    background-color: #f00;
  }
}

@-moz-keyframes blinkRed {
  from {
    background-color: #f00;
  }

  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }

  to {
    background-color: #f00;
  }
}

@-ms-keyframes blinkRed {
  from {
    background-color: #f00;
  }

  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }

  to {
    background-color: #f00;
  }
}

@-o-keyframes blinkRed {
  from {
    background-color: #f00;
  }

  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }

  to {
    background-color: #f00;
  }
}

@keyframes blinkRed {
  from {
    background-color: #f00;
  }

  50% {
    background-color: #a00;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px,
      rgba(255, 0, 0, 0.5) 0 2px 0;
  }

  to {
    background-color: #f00;
  }
}

.led-yellow {
  margin: 0 auto;
  width: 15px;
  height: 15px;
  background-color: #ff0;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px,
    #ff0 0 2px 12px;
  -webkit-animation: blinkYellow 1s infinite;
  -moz-animation: blinkYellow 1s infinite;
  -ms-animation: blinkYellow 1s infinite;
  -o-animation: blinkYellow 1s infinite;
  animation: blinkYellow 1s infinite;
}

@-webkit-keyframes blinkYellow {
  from {
    background-color: #ff0;
  }

  50% {
    background-color: #aa0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px,
      #ff0 0 2px 0;
  }

  to {
    background-color: #ff0;
  }
}

@-moz-keyframes blinkYellow {
  from {
    background-color: #ff0;
  }

  50% {
    background-color: #aa0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px,
      #ff0 0 2px 0;
  }

  to {
    background-color: #ff0;
  }
}

@-ms-keyframes blinkYellow {
  from {
    background-color: #ff0;
  }

  50% {
    background-color: #aa0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px,
      #ff0 0 2px 0;
  }

  to {
    background-color: #ff0;
  }
}

@-o-keyframes blinkYellow {
  from {
    background-color: #ff0;
  }

  50% {
    background-color: #aa0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px,
      #ff0 0 2px 0;
  }

  to {
    background-color: #ff0;
  }
}

@keyframes blinkYellow {
  from {
    background-color: #ff0;
  }

  50% {
    background-color: #aa0;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px,
      #ff0 0 2px 0;
  }

  to {
    background-color: #ff0;
  }
}

.led-green {
  margin: 0 auto;
  width: 15px;
  height: 15px;
  background-color: #abff00;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px,
    #89ff00 0 2px 12px;
}

.led-blue {
  margin: 0 auto;
  width: 15px;
  height: 15px;
  background-color: #24e0ff;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #006 0 -1px 9px,
    #3f8cff 0 2px 14px;
}

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
  width: 95vw;
  /* width: max-content; */
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  min-height: 60vh;
  justify-content: space-between;
  /* height: -webkit-fill-available; */
}
.deletePostModal-content {
  width: 60vw;
  /* width: max-content; */
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  min-height: 30vh;
  justify-content: space-between;
  /* height: -webkit-fill-available; */
}
</style>