


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

            
            RegisterUser: function (pw, userName, email, gender, fullName, year, programme) {
                debugger
                var param = JSON2.stringify({
                    password: pw,
                    userName: userName,
                    email: email,
                    gender: gender,
                    fullName: fullName,
                    year: year,
                    programme:programme
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "UserRegistration",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function (data) {
                        debugger;
                        if (data==null) {
                            alert("User Registration Successful");
                            location.replace("http://localhost:49613/User/Login");
                        }
                        else {
                            alert("UserName Already Added");

                        }
                    }
                   

                });
            },



            init: function () {

                
                $("#btnSave").on('click', function () {
                    debugger;
                    var fullName = $("#txtfullname").val();
                    var pw = $("#txtpassword").val();
                    var cpw = $("#txtconfirmpassword").val();
                    var userName = $("#txtusername").val();
                    var email = $("#txtemail").val();
                    var gender = $('input[name="Gender"]:checked', '#radiodiv').val();
                    var year = $("#Year").val();
                    var programme = $("#Programme").val();
                    if (pw!=cpw) {
                        $("#spanerror").text("Password Mismatch!!");
                    }
                    else {
                        $("#spanerror").text("");
                        if (fullName==""||pw==""||cpw==""||userName==""||email==""||gender==""||year=="0"||programme=="0") {
                            alert("Complete All The Fields");
                        }
                        else {

                                feedbackTab.RegisterUser(pw, userName, email, gender, fullName, year, programme);
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





