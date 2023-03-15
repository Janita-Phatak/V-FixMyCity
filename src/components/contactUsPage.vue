<template>
  <headerWithSideDrawer currentTab="Contact"></headerWithSideDrawer>
  <div v-if="userType !== 'admin'"
    class="text-lg font-medium text-center text-gray-500 border-b border-gray-200 pt-[54px] lg:pt-[64px] w-full fixed z-10 bg-gray-50 shadow tester">
    <section class="chat-box">
      <div class="chat-box-list-container" ref="chatbox">
        <ul class="chat-box-list">
          <li class="message" v-for="(message, idx) in messages" :key="idx" :class="message.author">
            <p>
              <span v-html="message.text"></span>
            </p>
          </li>
          <li class="start-inputs" v-if="!optionSelected && !selectedSection">
            <button v-for="(option, index) in greetingOptions" :key="index" v-on:click="selectGreetingOption(option)">
              {{ option }}
            </button>
          </li>
          <li class="faq-options" v-if="!selectedSection && optionSelected">
            <button v-for="(section, index) in sections" :key="index" v-on:click="selectSection(section)">
              {{ section }}
            </button>
          </li>
          <li class="message server" v-if="showActions" style="display: inline-flex;
   justify-content: space-evenly">
            <button v-for="(action, index) in actions" :key="index" v-on:click="performAction(action)"
              @click="performAction(index)" style="background-color: rgb(2, 43, 133)">
              {{ action }}
            </button>
          </li>
        </ul>
      </div>
     
        <div class="chat-inputs" v-bind:class="{ 'hidden': !optionSelected || (selectedSection && selectedSection !== 'Give us Feedback') }">
        <input type="text" v-model="message" @keyup.enter="sendMessage"
          :placeholder="selectedSection === 'Give us Feedback' ? 'Type your feedback here...' : 'Type your message here...'"
          :class="{ 'highlight': selectedSection === 'Give us Feedback' }" />
        <button @click="sendFeedbackOrMessage()">Send</button>
      </div>
    </section>
  </div>

  <div v-if="userType === 'admin'">
    <div
      class=" relative text-lg font-medium text-center text-gray-500 border-b border-gray-200 pt-[54px] lg:pt-[64px] w-full fixed z-10 bg-gray-50 shadow mb-4">
      <ul class="flex -mb-px items-center">
        <li class="mr-1.5 w-full">
          <button id="feedbackTab" @click="showFeedback()"
            class="inline-block p-4 pb-2 ml-1 rounded-t-lg border-b-2 border-transparent">Feedback</button>
        </li>
        <li class="mr-1.5 w-full">
          <button id="reportTab" @click="showReport"
            class="inline-block p-4 pb-2 mr-1 rounded-t-lg border-b-2 border-transparent">Report</button>
        </li>
      </ul>
    </div>

    <div></div>
    <feedbackTab v-if="tab === 'feedbackTab'" :backdrop="noFeedbackShow"></feedbackTab>
    <reportTab v-if="tab === 'reportTab'" :backdrop="noReportShow"></reportTab>
  </div>
</template>


<script>
import headerWithSideDrawer from "./headerWithSideDrawer.vue";
import axios from "axios";
import { properties } from "./axiosInvoc.js";
import { user } from "@/components/postProblem/stores/userData.js";
import feedbackTab from "@/components/feedbackTab.vue";
import reportTab from "@/components/reportTab.vue";

export default {
  name: "ContactUs",
  components: { headerWithSideDrawer, feedbackTab, reportTab },

  data() {
    return {
      email: '',
      userType: '',
      firstName: '',
      lastName: '',
      profileImage: '',
      message: '',
      messages: [
        {
          text: 'Welcome to FixMyCity App!!',
          author: 'server'
        }
      ],
      actions: ["Back to menu", "End this conversation"
      ],
      showActions: false,
      greetingOptions: ['Hello', 'Hi', "Let's Chat"],
      optionSelected: false,

      sections: ['FAQs about FixMyCity', 'Give us Feedback', 'Register Complaint'],
      selectedSection: null,
      faqButtons: [],

      faq: {
        'What is FixMyCity app?': 'FixMyCity is a mobile application that enables citizens to report issues related to their city\'s infrastructure such as potholes, broken streetlights, and damaged sidewalks.',
        'How can I use FixMyCity app?': 'You can visit the FixMyCity app from browser and create an account. Once you are signed in, you can report issues by taking a picture of the problem, selecting the appropriate category, and providing additional information if needed.',
        'How does FixMyCity app help cities to fix the reported issues?': 'FixMyCity app helps cities to streamline the process of reporting and fixing issues by providing a centralized platform for citizens to report problems. This enables cities to prioritize and address issues more efficiently, ultimately resulting in a safer and more functional city for its residents.',
        'What are the key features of FixMyCity app?': 'The key features of the FixMyCity app include the ability to report and track issues, view nearby issues on a map, and receive real-time updates on issue resolution.',
        'What kind of issues can be reported through FixMyCity app?': 'You can report a wide variety of issues such as potholes, broken streetlights, damaged sidewalks, graffiti, illegal dumping, and more.',
        'Can I track the status of my reported issue in the FixMyCity app?': 'Yes, you can track the status of your reported issue in the app and receive updates on its progress.',
        'How quickly will my issue be resolved after I report it?': ' The time it takes to resolve an issue can vary depending on the severity and complexity of the problem, but the city\'s goal is to address all reported issues as quickly as possible.',
        'Is the FixMyCity app free to use?': 'Yes, the FixMyCity app is free to download and use.',

      },
      showOptions: true,
      tab: '',
      noFeedbackShow: false,
      noReportShow: false,
    }
  },
  created() {
    if (user.email.length > 0) {
      this.email = user.email;
      this.userType = user.userType;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.profileImage = user.profileImage;
    } else {
      this.email = localStorage.getItem("email");
      this.userType = localStorage.getItem("userType");
      this.firstName = localStorage.getItem("firstName");
      this.lastName = localStorage.getItem("lastName");
      this.profileImage = localStorage.getItem("profileImage");
    }
    if (!this.email) {
      this.$router.push({ name: "loginPage" });
    }
  },
  async mounted() {
    if (this.userType === "admin") {
      this.showFeedback();
    }
  },

  updated() {
    if (this.userType !== 'admin') {
      this.$nextTick(() => {
        this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
      })
      this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
    }
  },

  methods: {
    async sendFeedback(text) {
      await axios.post(properties.server + "/feedback/create",
        {
          "feedbackID": "",
          "email": this.email,
          "firstName": this.firstName,
          "lastName": this.lastName,
          "profileImage": this.profileImage,
          "feedback": text,
          "day": 0,
          "month": 0,
          "year": 0,
          "hour": 0,
          "minute": 0,
          "second": 0,
          "time": "",
          "date": "",
        }).then(
          (res) => {
            if (res.status === 200) {
              console.log("Feedback submitted successfully")
            }
          }
        )
    },

    async sendReport(text) {
      await axios.post(properties.server + "/report/create",
        {
          "reportID": "",
          "email": this.email,
          "firstName": this.firstName,
          "lastName": this.lastName,
          "profileImage": this.profileImage,
          "report": text,
          "day": 0,
          "month": 0,
          "year": 0,
          "hour": 0,
          "minute": 0,
          "second": 0,
          "time": "",
          "date": "",
        }).then(
          (res) => {
            if (res.status === 200) {
              console.log("Report submitted successfully")
            }
          }
        )
    },

    sendFeedbackOrMessage() {
      // Get the input field and the message or feedback
      const inputField = document.querySelector('.chat-inputs input[type="text"]');
      const text = inputField.value.trim();

      // Check if the input field contains a message or feedback
      if (text !== '') {
        // If feedback section is selected, send feedback message and thank the user
        if (this.selectedSection === 'Give us Feedback') {
          // Push user input to client author
          const inputMessage = { text, author: 'client' };
          this.messages.push(inputMessage);
          this.sendFeedback(text);

          // Send message from server author thanking the user for their feedback
          const outputMessage = { text: 'Thank you for your feedback!', author: 'server' };
          this.messages.push(outputMessage);

          // Clear input field and selection
          this.message = '';
          this.selectedSection = null;


          // Remove highlight from input field
          const inputBox = document.querySelector('.chat-inputs input[type="text"]');
          inputBox.classList.remove('highlight');

          // Add "Go back to the menu" and "End the conversation" buttons
          this.messages.push({ text: 'What would you like to do next?', author: 'server' });
          this.showActions = true;
          this.selectedSection = true;
          this.optionSelected = false;
        }
        else if (this.selectedSection === 'Register Complaint') {
          // Push user input to client author
          const inputMessage = { text, author: 'client' };
          this.messages.push(inputMessage);
          this.sendReport(text);

          // Send message from server author thanking the user for their feedback
          const outputMessage = { text: 'Thank you for reporting!', author: 'server' };
          this.messages.push(outputMessage);

          // Clear input field and selection
          this.message = '';
          this.selectedSection = null;


          // Remove highlight from input field
          const inputBox = document.querySelector('.chat-inputs input[type="text"]');
          inputBox.classList.remove('highlight');

          // Add "Go back to the menu" and "End the conversation" buttons
          this.messages.push({ text: 'What would you like to do next?', author: 'server' });
          this.showActions = true;
          this.selectedSection = true;
          this.optionSelected = false;
        }
        else {
          // If feedback section is not selected, send regular message
          this.sendMessage();
        }
      }
    },

    sendMessage() {
      if (this.message) {
        if (this.faq.hasOwnProperty.call(this.message)) {
          // User selected a predefined greeting option
          const response = this.faq[this.message];
          this.messages.push({ text: response, author: 'server' });
          this.message = '';
          this.displayGreetingOptions();
        } else {
          // User entered a message
          this.messages.push({ text: this.message, author: 'client' });
          const response = this.faq[this.message] || 'I am sorry, I do not understand your question.';
          this.messages.push({ text: response, author: 'server' });
          this.message = '';
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
          })
          this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
        }
      }
    },
    selectGreetingOption(option) {
      this.messages.push({ text: option, author: 'client' });
      this.optionSelected = true;
      const greetingResponse = `Hello ${localStorage.getItem("firstName")}. How can I assist you?`;
      this.messages.push({ text: greetingResponse, author: 'server' });
    },

    selectSection(section) {
      this.messages.push({ text: section, author: 'client' });
      this.selectedSection = section;
      if (section === 'FAQs about FixMyCity') {
        const faqQuestions = Object.keys(this.faq);

        const faqAnswer = faqQuestions.map(q => `
            <button class="faq-button" data-question="${q}" style="
              height: auto;
              font-size:13px;
              margin-bottom: 20px;
              background-color: rgb(2, 43, 133);
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              text-transform: capitalize;
              width: 100%;
              text-align: center;
              margin-bottom: 3px;
            ">${q}</button>
          `).join('<br>');

        this.messages.push({ text: faqAnswer, author: 'server' });

        // Add event listener to the document object to handle FAQ button clicks
        document.addEventListener('click', (event) => {
          const button = event.target.closest('.faq-button');
          if (button) {
            const question = button.dataset.question;
            const message = { text: question, author: 'client' };
            this.messages.push(message);
            const answer = { text: this.faq[question], author: 'server' };
            this.messages.push(answer);
            this.showActions = true;
          }
        });
      }

      if (section === 'Give us Feedback') {
        const instruction = 'We would greatly appreciate your feedback, as it is valuable and welcomed! Type your feedback below:'
        this.messages.push({ text: instruction, author: 'server' });
      }

      if (this.selectedSection === 'Register Complaint') {
        const message = 'Please email your complaint to admin@fixmycity.com';
        this.messages.push({ text: message, author: 'server' });
      }

    },
    performAction(index) {
      if (index === 1) {
        const message = 'Thank you, Have a good day!';
        this.messages.push({ text: message, author: 'server' });
        this.selectedSection = true
      }
      else {
        this.optionSelected = true
        this.selectedSection = false
      }
      this.showActions = false;
    },

    resetTabs() {
      var feedbackTab = document.getElementById("feedbackTab");
      if (feedbackTab.classList.contains("text-indigo-600")) {
        feedbackTab.classList.remove("text-indigo-600");
        feedbackTab.classList.remove("border-indigo-600");
      }
      feedbackTab.classList.add("border-transparent");

      var reportTab = document.getElementById("reportTab");
      reportTab.classList.remove("text-indigo-600");
      reportTab.classList.remove("border-indigo-600");
      reportTab.classList.add("border-transparent");
    },

    showFeedback() {
      this.resetTabs();
      var feedbackTab = document.getElementById("feedbackTab");
      feedbackTab.classList.add("text-indigo-600");
      feedbackTab.classList.remove("border-transparent");
      feedbackTab.classList.add("border-indigo-600");

      this.tab = "feedbackTab";
    },

    showReport() {
      this.resetTabs();
      var reportTab = document.getElementById("reportTab");
      reportTab.classList.add("text-indigo-600");
      reportTab.classList.remove("border-transparent");
      reportTab.classList.add("border-indigo-600");

      this.tab = "reportTab";
    },

  }


}

</script>

<style scoped lang="scss"> .chat-box,
 .chat-box-list {
   display: flex;
   flex-direction: column;
   list-style-type: none;
 }

 .chat-box-list-container {
   overflow: scroll;
   margin-bottom: 1px;
   max-width: 100%;
   max-height: 70vh;
   min-height: 70vh;
   overflow-x: hidden;
   background-color: rgb(209 213 219);
 }

 .chat-box-list {
   padding-left: 10px;
   padding-right: 10px;

   span {
     padding: 8px;
     color: white;
     border-radius: 4px;
   }

   .server {
     margin-top: 10px;
     margin-bottom: 10px;

     span {
       text-align: left;
       background: rgb(79 70 229);
     }

     p {
       float: left;
       display: flex;
       text-align: left;
       max-width: 70vw;
     }

     button {
       padding: 8px;
       color: white;
       border-radius: 4px;
       background: rgb(79 70 229);
       text-align: center;
       max-width: 70vw;
     }
   }

   .client {
     margin-top: 10px;
     margin-bottom: 10px;

     span {
       text-align: left;
       background: rgb(129 140 248);
     }

     p {
       float: right;
       display: flex;
       text-align: right;
       max-width: 70vw;
     }
   }
 }

 .chat-box {
   margin: 10px;
   border: 1px solid #999;
   width: auto;
   min-height: 80vh;
   border-radius: 4px;
   margin-left: 10px;
   margin-right: 10px;
   align-items: space-between;
   justify-content: space-between;
   padding: 10px;
 }

 .chat-box-list-container::-webkit-scrollbar {
   display: none;
   /* Safari and Chrome */
 }

 .chat-inputs {
   display: flex;

   input {
     line-height: 3;
     width: 100%;
     border: 1px solid #999;
     border-left: none;
     border-bottom: none;
     border-right: none;
     border-bottom-left-radius: 4px;
     padding-left: 15px;
   }

   button {
     width: 145px;
     color: white;
     background: rgb(79 70 229);
     border-color: #999;
     border-bottom: none;
     border-right: none;
     border-bottom-right-radius: 3px;
   }

 }

 .start-inputs {
   display: flex;
   flex-direction: row-reverse;
   column-gap: 10px;


   input {
     line-height: 3;
     width: 100%;
     border: 1px solid #999;
     border-left: none;
     border-bottom: none;
     border-right: none;
     border-bottom-left-radius: 4px;
     padding-left: 15px;
     margin-right: auto;
   }

   button {
     min-width: 70px;
     height: auto;
     color: white;
     background: rgb(129 140 248);
     border-color: #999;
     border-bottom: none;
     border-right: none;
     border-bottom-right-radius: 3px;
     padding: 8px;
     width: fit-content;
   }

 }

 /* add this */
 .faq-options {
   margin-bottom: 8px;
 }

 .faq-options button {
   height: 30px;
   margin-bottom: 20px;
   background-color: rgb(2, 43, 133);
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   text-transform: capitalize;
   display: block;
   width: 70%;
   text-align: center;
   margin-bottom: 2px
 }

 .highlight {
   border: 2px blue;
   box-shadow: 0 0 5px blue;
 }

 .hidden {
  display: none;
}
</style>