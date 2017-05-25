


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
                baseURL: p.ServiceRootPath + 'Exam/',
                method: "",

                SucessMsg: p.SucessMsg
            },

           
            ShowMyResult: function (userName, examID,examType) {
                debugger;
                var param = JSON2.stringify({
                    userName: userName,
                    examID: examID,
                    examType: examType
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetMyResult",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        var resulttext = '';
                        resulttext += '<div class="form-group">';
                        if (data.examType == "Mock Test" || data.examType == "Objective Exam") {
                            resulttext += '<div><label style="color:black;">UserName: ' + data.userName + '</label></div>';
                            resulttext += '<div><label style="color:black;">Exam: ' + data.examName + '</label></div>';
                            resulttext += '<div><label style="color:black;">Programme: ' + data.programme + '</label></div>';
                            resulttext += '<div><label style="color:black;">Year: ' + data.year + '</label></div>';
                            resulttext += '<div><label style="color:black;">Score: ' + data.score + '</label></div>';
                            resulttext += '<div><label style="color:black;">Exam Type: ' + data.examType + '</label></div>';
                            document.getElementById("resultdata").innerHTML = resulttext;
                        }
                        else {
                            resulttext += '<div><label style="color:black;">UserName: ' + data.userName + '</label></div>';
                            resulttext += '<div><label style="color:black;">Exam: ' + data.subjectiveExamName + '</label></div>';
                            resulttext += '<div><label style="color:black;">Programme: ' + data.programme + '</label></div>';
                            resulttext += '<div><label style="color:black;">Year: ' + data.year + '</label></div>';
                            resulttext += '<div><label style="color:black;">Score: ' + data.score + '</label></div>';
                            resulttext += '<div><label style="color:black;">Exam Type: ' + data.examType + '</label></div>';
                            document.getElementById("resultdata").innerHTML = resulttext;
                        }
                    },
                    error: function () {
                        document.getElementById("resultdata").innerHTML = '<div><label style="color:black">No Result Found</label></div>';

                    }


                });
            },
            init: function () {
                debugger;
              
               
                $("#btnShowResult").on('click', function () {
                    debugger;
                    var userName = $("#txtUserName").val();
                    var examID = $("#txtexamcode").val();
                    var examType = $("#examtype").val();
                    if (userName == "" || examID == "" || examType=="0") {
                        if (userName == "") {
                            $("#validusername").text("* Required !!");
                        }
                        else if (examType == "0") {
                            $("#validexamtype").text("* Required !!");
                        }
                        else {
                            $("#validexamcode").text("* Required !!");
                        }
                    }
                    else {
                        feedbackTab.ShowMyResult(userName, examID,examType);
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





