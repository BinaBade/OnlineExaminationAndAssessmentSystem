


(function ($) {
    $.feedbackTab = function (p) {
        p = $.extend
        ({
            ServiceRootPath: '',
            SucessMsg: '',

        }, p);
        var feedbackTab = {
            config: {
                isPostBack: false,
                async: false,
                cache: false,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: { data: '' },
                dataType: 'json',
                baseURL: p.ServiceRootPath + 'User/',
                method: "",

                SucessMsg: p.SucessMsg
            },

            GetAllUsers: function () {
                debugger;
                var webMethod = "http://localhost:49613/User/GetAllUsers";
                $.getJSON(webMethod, function (data) {
                    debugger;
                    $("#tblUserList").dataTable({
                        data: data,
                        columns: [
                            { 'data': 'userID' },
                            { 'data': 'userName' },
                            { 'data': 'fullName' },
                            { 'data': 'gender' },
                            { 'data': 'email' },
                            { 'data': 'year' },
                            { 'data': 'programme' },
                            { 'data': 'roles' },
                            {
                                'render': function () {
                                    return '<button type="button" id="btnEdit" data-target="#EditUSer" data-toggle="modal" class="btnEdit btn btn-success">Edit</button><button type="button" id="btnDelete" class="btnDelete btn btn-success">Delete</button>'
                                }
                            }
                        ]
                    });
                 
                       
                       


                   

                    $("#tblUserList").on('click', '.btnEdit', function () {  //show modal and get user id of the current row

                        debugger;
                        var currentRow = $(this).closest("tr");
                        var userID = currentRow.find("td:eq(0)").text();
                        feedbackTab.FindUserByUserID(userID);

              

                    });

                    $("#tblUserList").on('click', '.btnDelete', function () {  //show modal and get user id of the current row

                        debugger;
                        var currentRow = $(this).closest("tr");
                        var userID = currentRow.find("td:eq(0)").text();
                        if (confirm("Are you Sure to Delete the User?")) {
                            feedbackTab.DeleteUser(userID);
                        }
                        else {
                            return;
                        }



                    });
                });
            },
            FindUserByUserID: function (userID) {
                var param = JSON2.stringify({
                    userID:userID
                            });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "FindUserByUserID",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        $(document).ready(function () {
                            $("#EditUSer").show("modal");
                            document.getElementById("txtusernameedit").value = data.userName;
                            document.getElementById("txtemailedit").value = data.email;
                            document.getElementById("txtpasswordedit").value = data.password;
                            document.getElementById("selecteduserrole").value = data.userRoleID;
                            document.getElementById("hiddenuserid").value = data.userID;
                            document.getElementById("txtfullnameedit").value = data.fullName;

                            if (true) {

                            }
                        })
                       
                                  }

                });
            },
            
            //for Role List
            GetUserRoles: function () {
                debugger;
                var webMethod = "http://localhost:49613/User/GetAllRoles";
                $.getJSON(webMethod, function (data) {
                    debugger;
                    
                    var options = "";
                   

                    $.each(data, function (i, item) {
                        debugger;
                        options += '<option value="' + item.userRoleID + '">' + item.roles + '</option>';
                    });
                    
                    document.getElementById("selecteduserrole").innerHTML = options;
                    document.getElementById("dropdownroles").innerHTML = options;
                });
            },

            AddUser: function (pw, cpw, userName, email, gender, userRoleID, year, programme,fullname) {
                debugger
                var param = JSON2.stringify({
                    password: pw,
                    confirmPassword: cpw,
                    userName: userName,
                    email: email,
                    gender: gender,
                    userRoleID:userRoleID,
                    year: year,
                    programme:programme,
                    fullName:fullname
                });
                $.ajax({
                    type:"POST",
                    url: feedbackTab.config.baseURL + "AddUser",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function (data) {

                        if (data == null) {
                            alert("User Registration Successful");
                            window.location.reload();
                        }
                        else {
                            alert("UserName Already Added");

                        }
                        
                    }
                });
                
            },
            
            UpdateUser: function (pw, userName, email, gender, userRoleID, userID, year, programme,fullName) {
                debugger
                var param = JSON2.stringify({
                    password: pw,
                    userName: userName,
                    email: email,
                    gender: gender,
                    userRoleID:userRoleID,
                    userID:userID,
                    year: year,
                    programme:programme,
                    fullName: fullName
                });
                $.ajax({
                    type: "PUT",
                    url: feedbackTab.config.baseURL + "UpdateUser",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function () {
                        alert("User Updated");
                        window.location.reload();

                    }
                });
            },

            DeleteUser: function (userID) {
                debugger
                var param = JSON2.stringify({
                    userID:userID
                });
                $.ajax({
                    type: "DELETE",
                    url: feedbackTab.config.baseURL + "DeleteUser",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function () {
                        alert("User Deleted");
                        window.location.reload();

                    }
                });
            },

            init: function () {
                $(document).ready(function () {

                    feedbackTab.GetAllUsers();
                    feedbackTab.GetUserRoles();
                    $('#hiddenuserid').hide();
                });
                
                $("#btnUpdateUser").on('click', function () {
                    var pw = $("#txtpasswordedit").val();
                    var userName = $("#txtusernameedit").val();
                    var email = $("#txtemailedit").val();
                    var gender = $('input[name="Genderedit"]:checked', '#radiodivedit').val();
                    var userRoleID = $("#selecteduserrole").val();
                    var userID = $("#hiddenuserid").val();
                    var year = $("#StudentYearedit").val();
                    var programme = $("#ProgrammeEdit").val();
                    var fullName = $("#txtfullnameedit").val();

                    
                    

                    
                    feedbackTab.UpdateUser(pw, userName, email, gender, userRoleID, userID,year,programme,fullName);
                });
                $("#btnSave").on('click', function () {
                    debugger;
                    var pw = $("#txtpassword").val();
                    var cpw = $("#txtconfirmpassword").val();
                    var userName = $("#txtusername").val();
                    var email = $("#txtemail").val();
                    var gender = $('input[name="Gender"]:checked', '#radiodiv').val();
                    var userRoleID = $("#dropdownroles").val();
                    var year = $("#StudentYear").val();
                    var programme = $("#Programme").val();
                    var fullName = $("#txtfullname").val();
                    
                    if (pw != cpw) {
                        $("#spanerror").text("Password Mismatch!!");
                    }
                    else {
                       if (fullName == "" || pw == "" || cpw == "" || userName == "" || email == "" || gender == "" || year == "0" || programme == "0") {
                            alert("Complete All The Fields");
                        }
                        else {

                            feedbackTab.AddUser(pw, cpw, userName, email, gender, userRoleID, year, programme, fullName);
                        }
                    }
                });



            }







        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





