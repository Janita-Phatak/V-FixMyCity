const user = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    userType: "",
    city: "",
    postcode: "",
    contactNo: "",
    profileImage: "",
    assignedPostcode: [],

    userSignUp(email, firstName, lastName, password, userType) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.userType = userType;
    },

    storeUserInfo(email, firstName, lastName, userType, city, postcode, contactNo, profileImage, assignedPostcode) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userType = userType;
        this.city = city;
        this.postcode = postcode;
        this.contactNo = contactNo;
        this.profileImage = profileImage;
        this.assignedPostcode = assignedPostcode;
        // console.log("E-Mail : " + this.email + "\nUser Name : " + this.firstName);
    },

    clear(){
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        // this.password = ""
        this.userType = "";
        this.city = "";
        this.postcode = "";
        this.contactNo = "";
        this.profileImage = "";
        this.assignedPostcode = "";
    }
}
export { user }