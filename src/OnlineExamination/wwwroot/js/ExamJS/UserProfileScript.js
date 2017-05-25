


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

                    document.getElementById("dropdownroles").innerHTML = options;
                });
            },
            FindUserByUserID: function (userid) {
                debugger;
                var param = JSON2.stringify({
                    userID:userid
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "FindUserForProfile",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        $(document).ready(function () {
                            $("#edituserprofile").show("modal");
                            document.getElementById("txtusernameedit").value = data.userName;
                            document.getElementById("txtfullname").value = data.fullName;
                            document.getElementById("txtemail").value = data.email;
                            document.getElementById("StudentYear").value = data.year;
                            document.getElementById("Programme").value = data.programme;
                            document.getElementById("txtpasswordedit").value = data.password;
                            if (data.gender=='Male') {
                                $("#radiomale").prop('checked', true);

                            }
                            else {
                                $("#radiofemale").prop('checked', true);

                            }
                        })

                    }

                });
            },
            ShowUserDetails: function () {
                var param = JSON2.stringify({
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "FindUserByUserIDForProfile",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        
                        $("#userfullname").text(data.fullName);
                        $("#userid").text(data.userID);
                        $("#username").text("Username: "+data.userName);
                        $("#useremail").text("Email: "+data.email);
                        $("#usergender").text("Gender: "+data.gender);
                        $("#useryear").text("Year: "+data.year);
                        $("#userprogram").text("Programme: "+data.programme);

                    }

                });
            },
            GetPreviousExams: function () {
                debugger;
                var webMethod = "http://localhost:49613/User/GetPreviousExams";
                $.getJSON(webMethod, function (data) {
                    debugger;
                    var mydata = "";
                    mydata += '<thead>';
                    mydata += '<tr>';
                    mydata += '<th>S.N.</th>';
                    mydata += '<th>Exam</th>';
                    mydata += '<th>Year</th>';
                    mydata += '<th>Programme</th>';
                    mydata += '<th>Date</th>';
                    mydata += '<th>Score</th>';
                    mydata += '<th>Remarks</th>';
                    mydata += '</tr>';
                    mydata += '</thead>';
                    mydata += '<tbody>';

                    $.each(data, function (i, item) {
                        debugger;
                        var remark = "";
                        if (((item.score/item.totalQuestions)*100)>40) {
                            remark = "Pass";
                        }
                        else {
                            remark = "Fail";
                        }
                        mydata += '<tr>';
                        mydata += '<td>' + (i + 1) + '</td>';
                        mydata += '<td>' + item.examName + '</td>';
                        mydata += '<td>' + item.year + '</td>';
                        mydata += '<td>' + item.programme + '</td>';

                        mydata += '<td>' + item.examDate + '</td>';
                        mydata += '<td>' + item.score + "/" + item.totalQuestions + '</td>';
                        mydata += '<td>' +remark+ '</td>';
                        mydata += '</tr>';
                    });
                    mydata += '</tbody>';
                    document.getElementById("tblpreviousexams").innerHTML = mydata  //append data from databse to table

                   
                });
            },
            UpdateUser: function (pw, userName, email, gender,year,programme,fullName) {
                debugger
                var param = JSON2.stringify({
                    password: pw,
                    userName: userName,
                    email: email,
                    gender: gender,
                    year: year,
                    programme:programme,
                    fullName:fullName
                });
                $.ajax({
                    type: "PUT",
                    url: feedbackTab.config.baseURL + "UpdateUserProfile",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function () {
                        alert("User Updated");
                        window.location.reload();
                    },
                    error: function () {
                        alert("User Updated");
                        window.location.reload();

                    }
                });
            },

            

            init: function () {
               
                feedbackTab.ShowUserDetails();
                feedbackTab.GetPreviousExams();
                feedbackTab.GetUserRoles();
                $("#btnUpdateUser").on('click', function () {
                    debugger;
                    var fullName = $("#txtfullname").val();
                    var pw = $("#txtpasswordedit").val();
                    var userName = $("#txtusernameedit").val();
                    var email = $("#txtemail").val();
                    var gender = $('input[name="Genderedit"]:checked', '#radiodiv').val();
                    var year = $("#StudentYear").val();
                    var programme = $("#Programme").val();
                    var cpw = $("#txtconfirmpassword").val();
                    if (pw!=cpw) {
                        alert("Password Mismatch");
                    }
                    else {
                        if (pw==""||userName==""||email==""||gender==""||year=="0"||programme=="0") {
                        alert("Complete the fields !");
                    }
                    else {
                        feedbackTab.UpdateUser(pw, userName, email, gender,year,programme,fullName);
                    }
                    }
                    
                });
                $("#btneditprofile").on('click', function () {
                    var userid = $("#userid").text();
                    feedbackTab.FindUserByUserID(userid);
                });



            }







        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





