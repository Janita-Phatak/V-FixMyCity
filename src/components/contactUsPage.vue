<template>
  <headerComponent></headerComponent>
  <div  class="text-lg font-medium text-center text-gray-500 border-b border-gray-200 pt-[54px] lg:pt-[64px] w-full fixed z-10 bg-gray-50 shadow">
    
    <h1>Contact Us</h1>
    <p>Welcome to our contact us page. If you have any questions or concerns, you can use the chat assistance bot below to get help.</p>
    
    <div id="bot">
    <div v-if="!conversationStarted">
      <p>Hello! I'm a web bot. How can I help you today?</p>
      <button @click="startConversation">Start conversation</button>
    </div>
    <div v-else>
      <p v-for="message in messages" :key="message.id">{{ message.text }}</p>
      <form @submit.prevent="sendMessage">
        <input v-model="message" type="text" placeholder="Type your message here..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</div>
</template>


<script>
import headerComponent from "./headerComponent.vue";

export default {
  name: "ContactUs",
  components: { headerComponent },
  
  data() {
    return {
      message: '',
      conversation: []
    }
  },
  methods: {
    // sendMessage() {
    //   this.conversation.push({
    //     sender: 'user',
    //     text: this.message
    //   })z
    //   this.message = ''

    //   // Send the message to the server and get a response
    //   fetch('/api/message', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       message: this.message
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(response => {
    //     this.conversation.push({
    //       sender: 'bot',
    //       text: response.text
    //     })
    //   })
    // },
  }
}


</script>

