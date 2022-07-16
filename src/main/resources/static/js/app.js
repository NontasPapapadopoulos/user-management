$(document).ready( function() {
        loadUsers();



    }
)


$(document).ready(function() {
    $("#myModal").modal();
});






function loadUsers() {


    $.ajax({
        type: "GET",
        url: "/users",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result != null) {

                console.log(result);
                let tbody = document.querySelector('tbody');
                $('tbody').empty();

                for (let i = 0; i < result.length; i++) {
                    let firstName = result[i].firstName;
                    let lastName = result[i].lastName;
                    let role = result[i].role;
                    let email = result[i].email;
                    let address = result[i].address;
                    let city = result[i].city;
                    let userId = result[i].userId;

                    let newRow = document.createElement('tr');


                    let firstNameTd = document.createElement('td');
                    firstNameTd.innerText = firstName;
                    let lastNameTd = document.createElement('td');
                    lastNameTd.innerText = lastName;
                    let roleTd = document.createElement('td');
                    roleTd.innerText = role;
                    let emailTd = document.createElement('td');
                    emailTd.innerText = email;
                    let addressTd = document.createElement('td');
                    addressTd.innerText = address;
                    let cityTd = document.createElement('td');
                    cityTd.innerText = city;

                    let buttonsTd = document.createElement('td');
                    buttonsTd.classList = "buttons";

                    let editButton = document.createElement('button')
                    editButton.type = "button";
                    editButton.classList = "btn btn-warning edit";
                    editButton.innerText = "Edit";
                    editButton.setAttribute("userId", userId);
                    editButton.setAttribute("data-toggle","modal");
                    editButton.setAttribute("data-target","#exampleModal");

                    let deleteButton = document.createElement('button')
                    deleteButton.type = "button";
                    deleteButton.classList = "btn btn-danger delete";
                    deleteButton.innerText = "Delete";
                    deleteButton.setAttribute("userId", userId);

                    buttonsTd.appendChild(editButton);
                    buttonsTd.appendChild(deleteButton);


                    newRow.appendChild(firstNameTd);
                    newRow.appendChild(lastNameTd);
                    newRow.appendChild(emailTd);
                    newRow.appendChild(addressTd);
                    newRow.appendChild(cityTd);
                    newRow.appendChild(roleTd);
                    newRow.appendChild(buttonsTd);


                    tbody.appendChild(newRow);
                }

            //    DELETE USER
                document.querySelectorAll('.delete').forEach(function (button){
                    button.addEventListener('click', function () {

                         let userId = button.getAttribute("userId");

                        $.ajax({
                            type: "DELETE",
                            url: "/deleteUser?userId=" + userId ,

                            success: function (result) {
                                loadUsers();

                            }
                        });

                     });
                });


            // UPDATE USER

                document.querySelectorAll('.edit').forEach(function (button) {
                    button.addEventListener('click', function () {
                        let userId = button.getAttribute("userId");

                        // get user details by id for placeholder
                        $.ajax({
                            type: "GET",
                            url: "/getUserDetails?userId=" + userId ,
                            contentType: "application/json; charset=utf-8",

                            success: function (result) {
                                console.log(result);
                                var existingFirstName = result.firstName;
                                let existingLastName = result.lastName;
                                let existingRole = result.role;
                                let existingEmail = result.email;
                                let existingAddress = result.address;
                                let existingCity = result.city;
                                let userId = result.userId;


                                document.querySelector('#updateEmail').value= existingEmail;
                                document.querySelector('#updateFirstName').value = existingFirstName;
                                document.querySelector('#updateLastName').value = existingLastName;
                                document.querySelector('#updateInputAddress2').value = existingAddress;
                                document.querySelector('#updateInputCity').value = existingCity;



                            }
                        });





                        // PREPARE FORM DATA



                        document.querySelector('.update-user').addEventListener('click', function () {

                            var formData = {
                                firstName: $("#updateFirstName").val(),
                                lastName: $("#updateLastName").val(),
                                email : $("#updateEmail").val(),
                                address : $("#updateInputAddress2").val(),
                                city : $("#updateInputCity").val(),
                                password: $("#updatePassword").val(),
                                role: $('input[name="updateGridRadios"]:checked').val(),
                                userId: userId
                            }



                            $.ajax({
                                type: "PUT",
                                url: "/updateUser" ,
                                contentType: "application/json; charset=utf-8",
                                data : JSON.stringify(formData),
                                dataType : 'json',
                                success: function (result) {
                                    loadUsers();


                                }
                            });
                        })
                    });
                });


            } else {
                console.log('fail');
            }
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }

    });
}




// Create new user
$(document).ready(
    function() {

        // SUBMIT FORM
        $('.add-user-form').submit(function(event) {
            // Prevent the form from submitting via the browser.

            event.preventDefault();
            ajaxPost();
        });

        function ajaxPost() {

            // PREPARE FORM DATA
            var formData = {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                email : $("#email").val(),
                address : $("#inputAddress2").val(),
                city : $("#inputCity").val(),
                password: $("#inputPassword4").val(),
                role: $('input[name="gridRadios"]:checked').val()
            }

            // console.log(formData);

            // DO POST
            $.ajax({
                type : "POST",
                contentType : "application/json",
                url : "addUser",
                data : JSON.stringify(formData),
                dataType : 'json',
                success : function(result, status) {

                    //console.log(status);
                    if (status == "success") {
                        loadUsers();
                    }

                    // console.log(result);
                },
                error : function(e) {
                    alert("Error!")
                    console.log("ERROR: ", e);
                }
            });

        }

    })

