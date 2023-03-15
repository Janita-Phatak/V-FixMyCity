const data = {
    city: "",
    area: "",
    postcode: "",
    additionalDetails: "",
    street_address: "",
    address: "",
    lat: "",
    long: "",
    imageURL: "",
    tempImage: "",
    imageName: "",
    type: "",
    description: "",
    locationTab: false,
    imageTab: false,
    detailsTab: false,
    submitTab: false,
    email: "",
    firstName: "",
    lastName: "",
    userType: "",
    userCity: "",
    userPostcode: "",
    contactNo: "",
    profileImage: "",

    setLocationDetails(address, street_address, area, city, postcode, additionalDetails, lat, long) {
        this.address = address;
        this.street_address = street_address;
        this.area = area;
        this.city = city;
        this.postcode = postcode;
        this.additionalDetails = additionalDetails;
        this.lat = lat;
        this.long = long;
        // console.log(this.lat);
        this.locationTab = true;
    },

    setImageDetails(imageURL, tempImage, imageName) {
        this.imageURL = imageURL;
        this.tempImage = tempImage;
        this.imageName = imageName;
        // console.log(this.imageName);
        // console.log(this.imageURL +"\n temp : "+ this.tempImage);
        this.imageTab = true;
    },

    setDetails(type, description) {
        this.type = type,
            this.description = description
        // console.log(this.type+"\n"+description);
        this.detailsTab = true;
    },

    clearDetails(){
        this.city= "";
        this.area= "";
        this.postcode= "";
        this.additionalDetails= "";
        this.street_address= "";
        this.address= "";
        this.lat= "";
        this.long= "";
        this.imageURL= "";
        this.tempImage= "";
        this.imageName= "";
        this.type= "";
        this.description= "";
        this.locationTab= false;
        this.imageTab= false;
        this.detailsTab= false;
        this.submitTab= false;
        this.email= "";
        this.firstName= "";
        this.lastName= "";
        this.userType= "";
        this.userCity= "";
        this.userPostcode= "";
        this.contactNo = "",
        this.profileImage= "";
    }

}
export { data }