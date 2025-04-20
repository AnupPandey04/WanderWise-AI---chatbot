//form submittion handler
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const isNotEmpty=checkInput();
    if(!isNotEmpty){
        Swal.fire({
            title: "Oops!",
            text: "Please fill all the fields.",
            icon: "warning"
        });
        return;
    }
    else{
      emailjs.sendForm('service_df8v0sz', 'template_78dgqtp', this)
      .then((response)=> {
          if(response.status===200){
            Swal.fire({
              title: "Success!",
              text: "Message sent successfully!",
              icon: "success"
            });
        document.getElementById('contact-form').reset(); // Clear form fields
      }
    })
    .catch((error) => {
        console.error("EmailJS error:", error);
        Swal.fire({
          title: "Oops!",
          text: "Failed to send the message. Please try again.",
          icon: "error"
        });
      });
    }
  });


function checkInput(){
  const items=document.querySelectorAll(".item");
  let allValid=true;

  for(const item of items){
      if(item.value===""){
        item.classList.add("error");
        item.parentElement.classList.add("error");
        allValid=false;
      }
      
      item.addEventListener("keyup",()=>{
        if(item.value!==""){
          item.classList.remove("error");
          item.parentElement.classList.remove("error");
        }
        else{
          item.classList.add("error");
          item.parentElement.classList.add("error");
        }
    });
  }
  return allValid;
}