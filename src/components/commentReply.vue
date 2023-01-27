<template>
  <div v-if="replyOn === false" class="
      flex
      items-start
      w-full
      bg-gray-300
      items-center
      px-4
      lg:px-6
      py-2.5
      shadow-lg
      focus:outline-none
    ">
    <a :href="'/user/' + email">
      <img v-if="profileImage" class="w-10 h-10 rounded-full object-cover mr-4 shadow" :src="profileImage"
        alt="avatar" />

      <div v-else
        class="inline-flex overflow-hidden relative justify-center items-center w-12 h-fit rounded-full bg-gray-500 aspect-square mr-4">
        <span class="font-medium text-gray-300">{{ firstName[0] + lastName[0] }}</span>
      </div>
    </a>

    <!-- <div
      class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 mr-4">
      <span class="font-medium text-gray-600 dark:text-gray-300">GS</span>
    </div> -->

    <div class="flex w-full overflow-auto">
      <div id="editableDiv" contenteditable type="text" class="
          rounded-l-lg
          bg-gray-50
          border
          text-gray-900
          focus:ring-blue-500 focus:border-blue-500
          block
          flex-1
          min-w-0
          w-full
          text-sm
          border-gray-300
          p-2.5
          pl-5
          min-h-[37px]
          editableDiv
        " placeholder="Add a comment..." oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''"></div>

      <label for="fileIp" class="right-[60px] absolute self-center hover:text-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 self-center mr-3 ml-1">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
        <input type="file" @change="previewImage" accept="image/*;capture=camera" id="fileIp"
          class="absolute w-0 h-0" />
      </label>

      <button class="
          inline-flex
          items-center
          px-3
          text-sm
          rounded-none rounded-r-lg
          border-0
          text-white
          bg-indigo-500
          focus:outline-none
          hover:bg-indigo-600
        " @click="addComment">
        Post
      </button>
    </div>
  </div>

  <div v-if="imgSrc.length > 0 && replyOn === false" class="w-full           
          shadow-lg
          py-4 h-auto z-10 absolute rounded-b-xl px-4 bg-gray-500/50">

    <button v-on:click="imgSrc = ''" class="absolute right-[20px] top-[20px] z-10">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-7 h-7 hover:text-red-100 bg-red-100 hover:bg-red-600 rounded-md">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <img class="
            relative
            w-auto
            mx-auto
            overflow-clip
            preview
            max-h-[40rem]
            h-auto
            object-contain
          " :src="imgSrc" />
  </div>

  <div v-if="replyOn === false" class="mb-2 px-5 py-2 mx-auto flex flex-col w-full relative bg-gray-100">
    <section class="
        relative
        flex
        items-center
        justify-center
        antialiased
        bg-white bg-gray-100
        min-w-screen
      ">
      <div class="container px-0 mx-auto sm:px-5">
        <div v-for="item in comments" :key="item.commentID" class="
            flex-col
            w-full
            py-2
            px-2
            mx-auto
            bg-white
            border-b-2 border-r-2 border-gray-200
            sm:px-4 sm:py-4
            md:px-4
            sm:rounded-lg sm:shadow-sm
            md:w-2/3
          ">
          <div class="flex flex-row">
            <a class="w-14" :href="'/user/' + item.email">
              <img v-if="item.profileImage.length > 0"
                class="w-12 h-12 border-2 border-gray-300 rounded-full object-cover" alt="Emily's avatar"
                :src="item.profileImage" />

              <div v-else
                class="inline-flex overflow-hidden relative justify-center items-center w-12 h-fit rounded-full bg-gray-500 aspect-square">
                <span class="font-medium text-gray-300">{{ item.firstName[0] + item.lastName[0] }}</span>
              </div>
            </a>
            <div class="flex-col mt-1 w-full">

              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1 px-4 font-bold leading-tight">
                  <a :href="'/user/' + item.email">
                    {{ item.firstName }}
                  </a>
                  <span :key="index" class="ml-2 text-xs font-normal text-gray-500 w-full">{{
                      timeSince(new Date(item.year, item.month - 1, item.day, item.hour, item.minute, item.second))
                  }}</span>

                  <div class="dropdown">
                    <button class="dropbtn                 
                    p-2
                    text-sm
                    font-medium
                    text-center text-gray-900
                    rounded-lg
                    hover:bg-gray-200
                    focus:ring-4 focus:outline-none focus:ring-gray-50"
                      style="background-color: transparent !important;">
                      <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                        </path>
                      </svg>
                    </button>
                    <div class="dropdown-content min-w-max right-[-20px] pt-1 pb-1">
                      <a href="#"
                        class="block py-1 px-4 hover:bg-gray-100 text-base text-gray-700 font-normal ">Save</a>
                      <div class="py-1">
                        <button v-if="email === item.email || userType === 'admin'"
                          v-on:click="deleteComment(item.commentID)" class="
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
                </div>
              </div>
              <p class="
                  flex-1
                  px-2
                  ml-2
                  text-sm
                  font-medium
                  leading-loose
                  text-gray-600
                  whitespace-pre-wrap
                  leading-normal
                ">
                {{ item.comment }}
              </p>
              <img v-if="item.imageURL.length > 0" role="img" :aria-label="'post' + item.postID" tabindex="0" class="
                    focus:outline-none
                    w-full
                    rounded-[15px]
                    aspect-[1/1]
                    object-cover
                    mt-2
                  " :src="item.imageURL" :alt="'post' + item.postID" />
              <button class="inline-flex items-center px-1 pt-2 ml-1 flex-column" v-on:click="reply(item.commentID)">
                <svg class="
                    w-5
                    h-5
                    ml-2
                    text-gray-600
                    cursor-pointer
                    fill-current
                    hover:text-gray-900
                  " viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                    fill-rule="nonzero" />
                </svg>
              </button>
              <button class="inline-flex items-center px-1 -ml-1 flex-column" @click.stop="commentLike(item.commentID)">
                <svg v-if="item.likedBy.includes(email)" :id="'commentLikeIcon' + item.commentID" class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>

                <svg v-else :id="'commentLikeIcon' + item.commentID" class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                  </path>
                </svg>
              </button>
              <div v-if="item.likedBy.length > 0" class="
                  text-gray-700 text-base
                  inline-flex
                  items-center
                  px-1
                  -ml-1
                  flex-column
                ">
                {{ item.likedBy.length }}
              </div>
            </div>
          </div>
          <hr v-if="item.replies.length > 0" class="my-1 ml-16 border-gray-200" />

          <!-- replies -->
          <div v-for="i in item.replies" :key="i.replyID" class="flex flex-row pt-1 md-10 ml-16">
            <a class="w-11" :href="'/user/' + i.email">
              <img v-if="i.profileImage.length > 0" class="w-10 h-10 border-2 border-gray-300 rounded-full object-cover"
                :src="i.profileImage" alt="avatar" />

              <div v-else
                class="inline-flex overflow-hidden relative justify-center items-center w-12 h-fit rounded-full bg-gray-500 aspect-square">
                <span class="font-medium text-gray-300">{{ i.firstName[0] + i.lastName[0] }}</span>
              </div>
            </a>
            <div class="flex-col mt-1 w-full">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1 px-4 font-bold leading-tight">
                  <a :href="'/user/' + i.email">
                    {{ i.firstName }}
                  </a>
                  <span :key="index" class="ml-2 text-xs font-normal text-gray-500 w-full">{{
                      timeSince(new Date(i.year, i.month - 1, i.day, i.hour, i.minute, i.second))
                  }}</span>

                  <div class="dropdown">
                    <button class="dropbtn                 
                    p-2
                    text-sm
                    font-medium
                    text-center text-gray-900
                    rounded-lg
                    hover:bg-gray-50
                    focus:ring-4 focus:outline-none focus:ring-gray-50">
                      <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                        </path>
                      </svg>
                    </button>
                    <div class="dropdown-content min-w-max right-[-20px] pt-1 pb-1">
                      <a href="#"
                        class="block py-1 px-4 hover:bg-gray-100 text-base text-gray-700 font-normal ">Save</a>
                      <div class="py-1">
                        <button v-if="email === i.email || userType === 'admin'"
                          v-on:click="deleteReply(item.commentID, i.replyID)" class="
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
                </div>
              </div>
              <div class="
                  flex-1
                  px-2
                  ml-2
                  text-sm
                  font-medium
                  leading-loose
                  text-gray-600
                  whitespace-pre-wrap
                  leading-normal
                ">
                {{ i.reply }}
              </div>
              <img v-if="i.imageURL.length > 0" role="img" class="
                    focus:outline-none
                    w-full
                    rounded-[15px]
                    aspect-[1/1]
                    object-cover
                    mt-2
                  " :src="i.imageURL" :alt="'reply' + item.commentID + '-' + i.replyID" />

              <button class="inline-flex items-center px-1 pt-2 ml-3.5 flex-column"
                @click.stop="replyLike(item.commentID, i.replyID)">
                <svg v-if="i.likedBy.includes(email)" :id="'replyLikeIcon' + item.commentID + '-' + i.replyID" class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>

                <svg v-else :id="'replyLikeIcon' + item.commentID + '-' + i.replyID" class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                  </path>
                </svg>
              </button>
              <div v-if="i.likedBy.length > 0" class="
                  text-gray-700 text-base
                  inline-flex
                  items-center
                  px-1
                  -ml-1
                  flex-column
                ">
                {{ i.likedBy.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Reply Block -->
  <div v-if="replyOn === true" class="
          flex
          items-center
          bg-gray-50
          px-7
          lg:px-6
          py-2.5
          w-full
          shadow-lg
          focus:outline-none
          border-y
          border-y-gray-400
        ">
    <button class="hover:text-gray-700" v-on:click="replyOn = false; imgSrc2 = ''">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
        <path
          d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
      </svg>
    </button>
    <p class="ml-6 text-lg">Reply</p>
  </div>

  <div class="
      flex
      items-start
      w-full
      bg-gray-300
      items-center
      px-4
      lg:px-6
      py-2.5
      shadow-lg
      focus:outline-none
    " v-if="replyOn === true">
    <a class="w-11" :href="'/user/' + email">
      <img v-if="profileImage" class="w-10 h-10 rounded-full object-cover mr-4 shadow" :src="profileImage"
        alt="avatar" />

      <div v-else
        class="inline-flex overflow-hidden relative justify-center items-center w-12 h-fit rounded-full bg-gray-500 aspect-square mr-4">
        <span class="font-medium text-gray-300">{{ firstName[0] + lastName[0] }}</span>
      </div>
    </a>

    <div class="flex w-full overflow-auto">
      <div id="editableDivReply" contenteditable type="text" class="
          rounded-l-lg
          bg-gray-50
          border
          text-gray-900
          focus:ring-blue-500 focus:border-blue-500
          block
          flex-1
          min-w-0
          w-full
          text-sm
          border-gray-300
          p-2.5
          pl-5
          min-h-[37px]
          editableDivReply
        " placeholder="Write your reply..." oninput="if(this.innerHTML.trim()==='<br>')this.innerHTML=''" />

      <label for="fileIp2" class="right-[60px] absolute self-center hover:text-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 self-center mr-3 ml-1">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
        </svg>
        <input type="file" @change="previewImage2" accept="image/*;capture=camera" id="fileIp2"
          class="absolute w-0 h-0" />
      </label>

      <button class="
          inline-flex
          items-center
          px-3
          text-sm
          rounded-none rounded-r-lg
          border-0
          text-white
          bg-indigo-500
          focus:outline-none
          hover:bg-indigo-600
        " @click="addReply">
        Post
      </button>
    </div>
  </div>

  <!-- Add Image -->
  <div v-if="imgSrc2.length && replyOn === true > 0" class="w-full           
          shadow-lg
          py-4 h-auto z-10 absolute rounded-b-xl px-4 bg-gray-500/50">

    <button v-on:click="imgSrc2 = ''" class="absolute right-[20px] top-[20px] z-10">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-7 h-7 hover:text-red-100 bg-red-100 hover:bg-red-600 rounded-md">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <img class="
            relative
            w-auto
            mx-auto
            overflow-clip
            preview
            max-h-[40rem]
            h-auto
            object-contain
          " :src="imgSrc2" />
  </div>

  <div v-if="replyOn === true" class="mb-2 px-5 py-2 mx-auto flex flex-col w-full relative bg-gray-100">
    <section class="
        relative
        flex
        items-center
        justify-center
        antialiased
        bg-white bg-gray-100
        min-w-screen
      ">
      <div class="container px-0 mx-auto sm:px-5">
        <div class="
            flex-col
            w-full
            py-2
            px-2
            mx-auto
            bg-white
            border-b-2 border-r-2 border-gray-200
            sm:px-4 sm:py-4
            md:px-4
            sm:rounded-lg sm:shadow-sm
            md:w-2/3
          ">
          <div class="flex flex-row">
            <a class="w-14" :href="'/user/' + comments[comments.findIndex(x => x.commentID === selectedCommentID)].email">
              <img v-if="comments[comments.findIndex(x => x.commentID === selectedCommentID)].profileImage.length > 0"
                class="w-12 h-12 border-2 border-gray-300 rounded-full object-cover" alt="Emily's avatar"
                :src="comments[comments.findIndex(x => x.commentID === selectedCommentID)].profileImage" />

              <div v-else
                class="inline-flex overflow-hidden relative justify-center items-center w-12 h-fit rounded-full bg-gray-500 aspect-square">
                <span class="font-medium text-gray-300">{{ comments[comments.findIndex(x => x.commentID ===
                    selectedCommentID)].firstName[0] + comments[comments.findIndex(x => x.commentID ===
                      selectedCommentID)].lastName[0]
                }}</span>
              </div>
            </a>
            <div class="flex-col mt-1 w-full">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1 px-4 font-bold leading-tight">
                  <a :href="'/user/' + comments[comments.findIndex(x => x.commentID === selectedCommentID)].email">
                    {{ comments[comments.findIndex(x => x.commentID === selectedCommentID)].firstName }}
                  </a>
                  <span :key="index" class="ml-2 text-xs font-normal text-gray-500 w-full">{{
                      timeSince(new Date(comments[comments.findIndex(x => x.commentID === selectedCommentID)].year,
                        comments[comments.findIndex(x => x.commentID === selectedCommentID)].month - 1,
                        comments[comments.findIndex(x => x.commentID === selectedCommentID)].day,
                        comments[comments.findIndex(x => x.commentID === selectedCommentID)].hour,
                        comments[comments.findIndex(x => x.commentID === selectedCommentID)].minute,
                        comments[comments.findIndex(x => x.commentID === selectedCommentID)].second))
                  }}</span>

                  <div class="dropdown">
                    <button class="dropbtn                 
                    p-2
                    text-sm
                    font-medium
                    text-center text-gray-900
                    rounded-lg
                    hover:bg-gray-50
                    focus:ring-4 focus:outline-none focus:ring-gray-50">
                      <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                        </path>
                      </svg>
                    </button>
                    <div class="dropdown-content min-w-max right-[-20px] pt-1 pb-1">
                      <a href="#"
                        class="block py-1 px-4 hover:bg-gray-100 text-base text-gray-700 font-normal ">Save</a>
                      <div class="py-1">
                        <button
                          v-if="email === comments[comments.findIndex(x => x.commentID === selectedCommentID)].email || userType === 'admin'"
                          v-on:click="deleteComment(selectedCommentID)" class="
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
                </div>
              </div>
              <p class="
                  flex-1
                  px-2
                  ml-2
                  text-sm
                  font-medium
                  leading-loose
                  text-gray-600
                  whitespace-pre-wrap
                  leading-normal
                ">
                {{ comments[comments.findIndex(x => x.commentID === selectedCommentID)].comment }}
              </p>
              <img v-if="comments[comments.findIndex(x => x.commentID === selectedCommentID)].imageURL.length > 0"
                role="img" class="
                    focus:outline-none
                    w-full
                    rounded-[15px]
                    aspect-[1/1]
                    object-cover
                    mt-2
                  " :src="comments[comments.findIndex(x => x.commentID === selectedCommentID)].imageURL"
                :alt="'post' + selectedCommentID" />
              <button class="inline-flex items-center px-1 pt-2 ml-3.5 flex-column"
                @click.stop="commentLike(comments[comments.findIndex(x => x.commentID === selectedCommentID)].commentID)">
                <svg v-if="comments[comments.findIndex(x => x.commentID === selectedCommentID)].likedBy.includes(email)"
                  :id="'commentLikeIcon' + comments[comments.findIndex(x => x.commentID === selectedCommentID)].commentID"
                  class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>

                <svg v-else
                  :id="'commentLikeIcon' + comments[comments.findIndex(x => x.commentID === selectedCommentID)].commentID"
                  class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                  </path>
                </svg>
              </button>
              <div v-if="comments[comments.findIndex(x => x.commentID === selectedCommentID)].likedBy.length > 0" class="
                  text-gray-700 text-base
                  inline-flex
                  items-center
                  px-1
                  -ml-1
                  flex-column
                ">
                {{ comments[comments.findIndex(x => x.commentID === selectedCommentID)].likedBy.length }}
              </div>
            </div>
          </div>
          <hr v-if="comments[comments.findIndex(x => x.commentID === selectedCommentID)].replies.length > 0"
            class="my-1 ml-16 border-gray-200" />

          <!-- replies -->
          <div v-for="i in comments[comments.findIndex(x => x.commentID === selectedCommentID)].replies"
            :key="i.replyID" class="flex flex-row pt-1 md-10 ml-16">
            <a class="w-11" :href="'/user/' + i.email">
              <img v-if="i.profileImage.length > 0" class="w-10 h-10 border-2 border-gray-300 rounded-full object-cover"
                :src="i.profileImage" alt="avatar" />

              <div v-else
                class="inline-flex overflow-hidden relative justify-center items-center w-12 h-fit rounded-full bg-gray-500 aspect-square">
                <span class="font-medium text-gray-300">{{ i.firstName[0] + i.lastName[0]
                }}</span>
              </div>
            </a>

            <div class="flex-col mt-1 w-full">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1 px-4 font-bold leading-tight">
                  <a :href="'/user/' + i.email">
                    {{ i.firstName }}
                  </a>
                  <span :key="index" class="ml-2 text-xs font-normal text-gray-500 w-full">{{
                      timeSince(new Date(i.year, i.month - 1, i.day, i.hour, i.minute, i.second))
                  }}</span>

                  <div class="dropdown">
                    <button class="dropbtn                 
                    p-2
                    text-sm
                    font-medium
                    text-center text-gray-900
                    rounded-lg
                    hover:bg-gray-50
                    focus:ring-4 focus:outline-none focus:ring-gray-50">
                      <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                        </path>
                      </svg>
                    </button>
                    <div class="dropdown-content min-w-max right-[-20px] pt-1 pb-1">
                      <a href="#"
                        class="block py-1 px-4 hover:bg-gray-100 text-base text-gray-700 font-normal ">Save</a>
                      <div class="py-1">
                        <button v-if="email === i.email || userType === 'admin'"
                          v-on:click="deleteReply(selectedCommentID, i.replyID)" class="
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
                </div>
              </div>

              <div class="
                  flex-1
                  px-2
                  ml-2
                  text-sm
                  font-medium
                  leading-loose
                  text-gray-600
                  whitespace-pre-wrap
                  leading-normal
                ">
                {{ i.reply }}
              </div>
              <img v-if="i.imageURL.length > 0" role="img" class="
                    focus:outline-none
                    w-full
                    rounded-[15px]
                    aspect-[1/1]
                    object-cover
                    mt-2
                  " :src="i.imageURL" :alt="'reply' + selectedCommentID + '-' + i.replyID" />
              <button class="inline-flex items-center px-1 pt-2 ml-3.5 flex-column"
                @click.stop="replyLike(comments[comments.findIndex(x => x.commentID === selectedCommentID)].commentID, i.replyID)">
                <svg v-if="i.likedBy.includes(email)"
                  :id="'replyLikeIcon' + comments[comments.findIndex(x => x.commentID === selectedCommentID)].commentID + '-' + i.replyID"
                  class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>

                <svg v-else
                  :id="'replyLikeIcon' + comments[comments.findIndex(x => x.commentID === selectedCommentID)].commentID + '-' + i.replyID"
                  class="
                    w-5
                    h-5
                    text-gray-600
                    cursor-pointer
                    hover:text-gray-700
                  " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                  </path>
                </svg>
              </button>
              <div v-if="i.likedBy.length > 0" class="
                  text-gray-700 text-base
                  inline-flex
                  items-center
                  px-1
                  -ml-1
                  flex-column
                ">
                {{ i.likedBy.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import { properties } from "./axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";
export default {
  name: "commentReply",
  components: {},
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      profileImage: "",
      comment: "",
      date: "",
      likedBy: [],
      comments: [],
      replyOn: false,
      selectedCommentID: null,
      replie: "",
      imgSrc: "",
      imgSrc2: "",
      imageData: "",
      picture: null,
      userDetails: [],
      index: 1,
      timer: null,
      userType: "",
    };
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
  },
  methods: {
    async loadData() {
      let result = await axios.get(
        properties.server + "/comment/reply/all?postID=" + this.$route.params.postID
      );
      this.comments = result.data;
      this.timer = setInterval(() => {
        this.reRender()
      }, 1000)
    },
    addComment() {
      if (!this.firstName) {
        window.alert("Please login");
        // this.$router.push({ name: "loginPage" });
      }

      var innerText = document.getElementById("editableDiv").innerHTML; // using innerText here because it preserves newline
      if (innerText.includes("&nbsp;")) {
        innerText = innerText.replaceAll("&nbsp;", ""); // get rid of &nbsp;
      }
      if (innerText.includes("<div><br></div>")) {
        innerText = innerText.replaceAll("<div><br></div>", "\n");
      }
      if (innerText.includes("</div><div>")) {
        innerText = innerText.replaceAll("</div><div>", "\n");
      }
      if (innerText.includes("<br>")) {
        innerText = innerText.replaceAll("<br>", "\n");
      }
      if (innerText[innerText.length - 1] === "\n") {
        innerText = innerText.slice(0, -1); // get rid of weird extra newline
      }
      if (innerText.includes("<br>")) {
        if (innerText.lastIndexOf("<br>") === innerText.length - 4) {
          innerText = innerText.slice(0, -4); // get rid of <br>
        }
      }
      if (innerText.includes("&lt;")) {
        innerText = innerText.replaceAll("&lt;", "");
        innerText = innerText.replaceAll("&gt;", "");
      }
      if (innerText.includes("<div>")) {
        innerText = innerText.replaceAll("<div>", "\n");
      }
      if (innerText.includes("</div>")) {
        innerText = innerText.replaceAll("</div>", "");
      }

      if (innerText.length <= 0 || innerText.trim() === "") {
        window.alert("Enter a Comment");
      } else {
        innerText.trim();

        this.comment = innerText.trim();

        let img = "";

        if (this.imgSrc.length > 0) {
          img = this.imgSrc;
        }

        var id = this.commentIDgenerator();
        var obj = {
          commentID: id,
          postID: this.$route.params.postID,
          email: this.email,
          imageURL: img,
          comment: this.comment,
          day: 0,
          month: 0,
          year: 0,
          hour: 0,
          minute: 0,
          second: 0,
          time: "Just Now",
          likedBy: [],
        };

        var currentdate = new Date();
        var obj2 = {
          commentID: id,
          postID: this.$route.params.postID,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          profileImage: "",
          imageURL: img,
          comment: this.comment,
          day: currentdate.getDate(),
          month: currentdate.getMonth() + 1,
          year: currentdate.getFullYear(),
          time: "Just Now",
          hour: currentdate.getHours(),
          minute: currentdate.getMinutes(),
          second: currentdate.getSeconds(),
          likedBy: [],
          replies: [],
          userType: ""
        };

        axios.post(properties.server + "/comment/create", obj).then(result => { console.log(result.data); this.loadData() });

        this.comments.push(obj2);
        document.getElementById("editableDiv").innerHTML = "";
        this.imgSrc = "";

      }
    },
    commentIDgenerator() {
      var ind = this.comments.length;
      var i = ind;
      if (ind > 0) {
        i = parseInt(this.comments[ind - 1].commentID);
        i++;
      }

      if (i < 10) {
        i = 10;
      }
      this.comments.forEach(function (x) {
        while (x.commentID === i.toString()) {
          i++;
        }
      });
      return i.toString();
    },
    commentLike(cID) {
      if (!this.email) {
        window.alert("Please login");
      } else {
        const likeIcon = document.getElementById("commentLikeIcon" + cID);
        const commentObj = this.comments.find(
          ({ commentID }) => commentID === cID
        );
        if (commentObj.likedBy.includes(this.email)) {
          const index = commentObj.likedBy.indexOf(this.email);
          if (index > -1) {
            // only splice array when item is found

            this.comments.forEach((element) => {
              if (element.commentID === cID) {
                element.likedBy.splice(index, 1); // 2nd parameter means remove one item only
              }
            });
            axios.put(properties.server + "/comment/unlike?postID=" + this.$route.params.postID + "&commentID=" + cID + "&email=" + this.email).then(this.loadData());
          }

          likeIcon.style.fill = "";
        } else {
          this.comments.forEach((element) => {
            if (element.commentID === cID) {
              element.likedBy.push(this.email);
            }
            axios.put(properties.server + "/comment/like?postID=" + this.$route.params.postID + "&commentID=" + cID + "&email=" + this.email).then(this.loadData());
          });

          likeIcon.style.fill = "rgb(55 65 81)"; //gray
        }
      }
    },
    replyLike(cID, rID) {
      if (!this.email) {
        window.alert("Please login");
      } else {
        const rlikeIcon = document.getElementById(
          "replyLikeIcon" + cID + "-" + rID
        );
        const commentObj = this.comments.find(
          ({ commentID }) => commentID === cID
        );

        const replyObj = commentObj.replies.find(
          ({ replyID }) => replyID === rID
        );
        if (replyObj.likedBy.includes(this.email)) {
          const index = replyObj.likedBy.indexOf(this.email);
          if (index > -1) {
            // only splice array when item is found

            axios.put(properties.server + "/reply/unlike?postID=" + this.$route.params.postID + "&commentID=" + cID + "&replyID=" + rID + "&email=" + this.email).then(this.loadData());

            this.comments.forEach((element) => {
              if (element.commentID === cID) {
                element.replies.forEach((i) => {
                  if (i.replyID === rID) {
                    i.likedBy.splice(index, 1); // 2nd parameter means remove one item only
                  }
                });
              }
            });
          }

          rlikeIcon.style.fill = "";
        } else {
          axios.put(properties.server + "/reply/like?postID=" + this.$route.params.postID + "&commentID=" + cID + "&replyID=" + rID + "&email=" + this.email).then(this.loadData());
          this.comments.forEach((element) => {
            if (element.commentID === cID) {
              element.replies.forEach((i) => {
                if (i.replyID === rID) {
                  i.likedBy.push(this.email);
                }
              });
            }
          });

          rlikeIcon.style.fill = "rgb(55 65 81)"; //gray
        }
      }
    },
    reply(commentID) {
      this.selectedCommentID = commentID;
      this.replyOn = true;
      this.imgSrc = '';
    },
    addReply() {
      if (!this.firstName) {
        window.alert("Please login");
        // this.$router.push({ name: "loginPage" });
      }
      else {
        var innerText = document.getElementById("editableDivReply").innerHTML; // using innerText here because it preserves newlines
        if (innerText.includes("&nbsp;")) {
          innerText = innerText.replaceAll("&nbsp;", ""); // get rid of &nbsp;
        }
        if (innerText.includes("<div><br></div>")) {
          innerText = innerText.replaceAll("<div><br></div>", "\n");
        }
        if (innerText.includes("</div><div>")) {
          innerText = innerText.replaceAll("</div><div>", "\n");
        }
        if (innerText.includes("<br>")) {
          innerText = innerText.replaceAll("<br>", "\n");
        }
        if (innerText[innerText.length - 1] === "\n") {
          innerText = innerText.slice(0, -1); // get rid of weird extra newline
        }
        if (innerText.includes("<br>")) {
          if (innerText.lastIndexOf("<br>") === innerText.length - 4) {
            innerText = innerText.slice(0, -4);
          }
        }
        if (innerText.includes("&lt;")) {
          innerText = innerText.replaceAll("&lt;", "");
          innerText = innerText.replaceAll("&gt;", "");
        }
        if (innerText.includes("<div>")) {
          innerText = innerText.replaceAll("<div>", "\n");
        }
        if (innerText.includes("</div>")) {
          innerText = innerText.replaceAll("</div>", "");
        }

        if (innerText.length <= 0 || innerText.trim() === "") {
          window.alert("Enter a Comment");
        } else {
          innerText.trim();
          this.replie = innerText.trim();

          let img = "";

          if (this.imgSrc2.length > 0) {
            img = this.imgSrc2;
          }

          var id = this.replyIDgenerator();
          var obj = {
            replyID: id,
            commentID: this.selectedCommentID,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            profileImage: "",
            imageURL: img,
            reply: this.replie,
            day: 3,
            month: 11,
            year: 2022,
            time: "Just Now",
            hour: 0,
            minute: 0,
            second: 0,
            likedBy: [],
            userType: ""
          };
          var currentdate = new Date();
          var obj2 = {
            replyID: id,
            commentID: this.selectedCommentID,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            profileImage: "",
            imageURL: img,
            reply: this.replie,
            day: currentdate.getDate(),
            month: currentdate.getMonth() + 1,
            year: currentdate.getFullYear(),
            time: "Just Now",
            hour: currentdate.getHours(),
            minute: currentdate.getMinutes(),
            second: currentdate.getSeconds(),
            likedBy: [],
            userType: ""
          };

          axios.post(properties.server + "/reply/create?postID=" + this.$route.params.postID, obj).then(result => { console.log(result.data); this.loadData() });

          this.comments[this.comments.findIndex(x => x.commentID === this.selectedCommentID)].replies.push(obj2);
          document.getElementById("editableDivReply").innerHTML = "";
          this.imgSrc2 = "";
        }
      }

    },
    replyIDgenerator() {
      var index = this.comments.findIndex(x => x.commentID === this.selectedCommentID)
      var ind = parseInt(this.comments[index].replies.length);
      var i = ind;
      if (ind > 0) {
        i = parseInt(this.comments[index].replies[ind - 1].replyID);
        i++;
      }

      if (i < 10) {
        i = 10;
      }

      this.comments[index].replies.forEach(function (x) {
        while (x.replyID === i.toString()) {
          i++;
        }
      });
      return i.toString();
    },
    deleteComment(cID) {
      var index;

      this.comments.forEach((element) => {
        if (element.commentID === cID) {
          index = this.comments.indexOf(element);
        }
      });

      if (index > -1) {
        // only splice array when item is found

        this.replyOn = false;
        this.selectedCommentID = null;

        this.comments.splice(index, 1);
        axios.delete(properties.server + "/comment/delete?postID=" + this.$route.params.postID + "&commentID=" + cID).then(this.loadData());

      }
    },
    deleteReply(cID, rID) {
      var index;

      this.comments.forEach((element) => {
        if (element.commentID === cID) {

          element.replies.forEach((i) => {
            if (i.replyID === rID) {
              index = element.replies.indexOf(i);
            }
          })
        }
      });

      if (index > -1) {
        // only splice array when item is found

        axios.delete(properties.server + "/reply/delete?postID=" + this.$route.params.postID + "&commentID=" + cID + "&replyID=" + rID).then(this.loadData());

        this.comments.forEach((element) => {
          if (element.commentID === cID) {
            element.replies.splice(index, 1);
          }
        });
      }
    },
    previewImage(event) {
      // this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];

      // var output = document.getElementById('myimage'), extraaa

      this.imgSrc = URL.createObjectURL(this.imageData);

      // fileName = event.target.files[0].name; extraaa
    },
    previewImage2(event) {
      // this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];

      // var output = document.getElementById('myimage'), extraaa

      this.imgSrc2 = URL.createObjectURL(this.imageData);

      // fileName = event.target.files[0].name; extraaa
    },
    timeSince(date) {
      if (typeof date !== 'object') {
        date = new Date(date);
      }

      var seconds = Math.floor((new Date() - date) / 1000);
      var intervalType;

      var interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = 'year';
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = 'month';
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = 'day';
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }

      return interval + ' ' + intervalType + ' ago';
      // var aDay = 24 * 60 * 60 * 1000;
      // console.log(timeSince(new Date(Date.now() - aDay)));
      // console.log(timeSince(new Date(Date.now() - aDay * 2)));
    },
    reRender() {
      this.index++
    }
    // onUpload() {
    //   this.progress = true;
    //   this.picture = null;
    //   const storageRef = fb
    //     .storage()
    //     .ref(user.email+"/" + `${this.imageData.name}`)
    //     .put(this.imageData);
    //   storageRef.on(
    //     `state_changed`,
    //     (snapshot) => {
    //       this.uploadValue =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     },
    //     (error) => {
    //       this.uploaded = false;
    //       const box = document.getElementById("myError");
    //       box.style.visibility = "visible";

    //       this.error = error.message;
    //       setTimeout(() => {
    //         const box = document.getElementById("myError");
    //         box.style.visibility = "hidden";
    //       }, 4000);
    //       console.log(error.message);
    //     },
    //     () => {
    //       this.uploadValue = 100;
    //       storageRef.snapshot.ref.getDownloadURL().then((url) => {
    //         this.picture = url;
    //         this.imageName = `${this.imageData.name}`;
    //         // console.log(this.picture);
    //         // localStorage.setItem("imgURL", this.picture);
    //         this.uploaded = true;
    //         // const box = document.getElementById("uploadPrompt");
    //         // box.style.visibility = "visible";
    //         setTimeout(() => {
    //           const box = document.getElementById("uploadPrompt");
    //           box.style.visibility = "hidden";
    //         }, 4000);
    //         data.setImageDetails(this.picture, this.imgSrc, this.imageName);
    //       });
    //     }
    //   );
    // },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
[contenteditable][placeholder]:empty:before {
  content: attr(placeholder);
  position: absolute;
  color: gray;
  background-color: transparent;
}

.dropbtn {
  cursor: pointer;
  background-color: transparent !important;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  background-color: transparent !important;
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
  /* color: black; */
  /* padding: 12px 16px; */
  text-decoration: none;
  display: block;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>