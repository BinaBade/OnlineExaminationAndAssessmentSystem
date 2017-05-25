


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
            DisplaySubjectiveQuestions: function (examID) {
                var param = JSON2.stringify({
                    subjectiveExamID: examID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "DisplaySubjectiveExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        if (data != null) {
                            var n = 0;
                var j = 0;
                var examtime = 0;
                var myhtml = '';
                myhtml += '<div id="alldivs">';
                myhtml += 'Time Remaining<label style="color:mediumvioletred" id="lblCtime"></label>';
                var end = parseInt(data.length);
                $.each(data, function (i, item) {
                    debugger;
                    if (i==end-1) {
                        examtime = parseInt(item.subjectiveExamDuration);
                    }
                    num = item.subjectiveQue_ID;
                    myhtml += '<div id="QuestionDiv' + parseInt(i+1) + '">'
                    myhtml += '<div class="row-fluid"><b><span id="'+item.subjectiveQue_ID+'">' + parseInt(i + 1) + '. ' + item.subjectiveQue + '</span></b></div>';
                    myhtml += '<div class="space"></div>';
                    myhtml += '<div class="form-group"><label for="usr">Your Answer:</label><textarea class="form-control" rows="7" id="'+num+'" name="subans"></textarea></div>';
                    if (i==0) {
                        myhtml += '<button type="button" class="btnnext btn-block span3" style="padding-right:200px;" id="' + parseInt(i + 1) + '">Next</button>';
                    } 
                  
                    else if (i == (end - 1)) {
                        myhtml += '<button type="button" class="btnprevious btn-block span3" style="padding-right:200px;" id="' + parseInt(i + 1) + '">Previous</button>';
                        myhtml += '<button type="button" class="btnsubmit btn-block span3" style="padding-right:200px;background-color:green" id="btnSubmit">Submit</button>';
                    }
                    else {
                            myhtml += '<button type="button" class="btnprevious btn-block span3" style="padding-right:200px;" id="' + parseInt(i+1) + '">Previous</button>';
                            myhtml += '<button type="button" class="btnnext btn-block span3" style="padding-left:200px;" id="' + parseInt(i + 1) + '">Next</button>';
                        }
                    myhtml += '</div>';

                });
                myhtml += '</div>';

                document.getElementById("answerdiv").innerHTML = myhtml;
                var myVar = setInterval(function () { myTimer() }, 1000);
                var d = new Date();
                debugger;
                var hours;
                var minutes;
                if (examtime > 60) {
                    hours = parseInt(examtime / 60);
                    minutes = (examtime % 60);
                }
                else {
                    hours = 0;
                    minutes = examtime;
                }
                d.setHours(hours, minutes - 1, 60, 00);
                function myTimer() {
                    

                    if (d.getSeconds() == 0 || (d.getMinutes() == 0 && d.getSeconds() == 0)) {


                        if (d.getSeconds() == 0) {
                            var h = d.getHours();
                            var m = d.getMinutes() - 1;
                            var s = 59;
                        }

                        if (d.getMinutes() == 0 && d.getSeconds() == 0) {
                            var h = d.getHours() - 1;
                            var m = 59;
                            var s = 59;
                        }
                    }
                    else {
                        var h = d.getHours();
                        var m = d.getMinutes();
                        var s = d.getSeconds() - 1;
                    }



                    if (h == 0 && m == 0 && s == 0) {
                        alert("Your Time is Up!!");
                        var checkedinarray = $("#answerdiv").find("span").map(function () {
                            return $(this).attr("id");
                        }).get();
                        var subquestions = checkedinarray.toString();
                        var checkedquestions = $("#answerdiv").find("textarea").map(function () {
                            if ($(this).val() == "") {
                                return "N/A";
                            }
                            else {
                                return $(this).val();
                            }
                        }).get();
                        var subanswers = checkedquestions.toString();
                        var examID = $("#spanexamid").text();
                       
                        feedbackTab.SubmitAnswers(examID, subanswers, subquestions);
                    }
                    if (s < 10 || m < 10) {
                        if (s < 10) {
                            document.getElementById("lblCtime").innerHTML = "0" + h + ":" + m + ":0" + s;
                        }
                        else if (m < 10) {
                            document.getElementById("lblCtime").innerHTML = "0" + h + ":0" + m + ":" + s;
                        }
                        else if (m < 10 && s < 10) {
                            document.getElementById("lblCtime").innerHTML = "0" + h + ":0" + m + ":0" + s;

                        }

                    }
                    else {
                        document.getElementById("lblCtime").innerHTML = "0" + h + ":" + m + ":" + s;
                    }


                    d.setHours(h, m, s, 00);
                    //setInterval(myTimer, 1000);
                };
                $(document).ready(function () {
                    debugger;
                    for (i = 2; i <= end; i++) {
                        $("#QuestionDiv" + i).hide();
                    }

                });
                $("#btnSubmit").on("click", function () {
                    debugger;
                    var checkedinarray = $("#answerdiv").find("span").map(function () {
                        return $(this).attr("id");
                    }).get();
                    var subquestions = checkedinarray.toString();
                    var checkedquestions = $("#answerdiv").find("textarea").map(function () {
                        if ($(this).val()=="") {
                            return "N/A";
                        }
                        else {
                            return $(this).val();
                        }
                    }).get();
                    var useranswers = checkedquestions.toString();
                    var examID = $("#spanexamid").text();
                    var r = confirm("Do you want to submit your answers?");
                    if (r == true) {
                        feedbackTab.SubmitAnswers(examID, useranswers, subquestions);
                    } else {
                        return null;
                    }

                });
                $(".btnnext").on("click", function () {
                    debugger;
                    var nextid = parseInt($(this).attr("id"));
                    $("#QuestionDiv" + nextid).hide();
                    nextid = nextid + 1;
                    $("#QuestionDiv" + nextid).show();

                });

                $(".btnprevious").on("click", function () {
                    debugger;
                    var nextid = parseInt($(this).attr('id'));
                    $("#QuestionDiv" + nextid).hide();
                    nextid = nextid - 1;
                    $("#QuestionDiv" + nextid).show();

                });
                        }
                        else {
                            alert("This Exam Is Already Taken By You");
                            window.location.reload();
                        }

                    },

                });
            },
            GetExamList: function () {
                debugger;
                var webMethod = "http://localhost:49613/Exam/GetAllSubjectiveExamsUser";
                $.getJSON(webMethod, function (data) {
                    debugger;

                    var examsname = "";
                    $.each(data, function (i, item) {
                        examsname += "<div class='row-fluid'><a href='#'><label class='anchorexam' style='cursor:pointer' id='" + item.subjectiveExamID + "'>" + (i + 1) + ". " + item.subjectiveExamName + "</label></a></div>";
                    });

                    document.getElementById("SubExamlistDiv").innerHTML = examsname;

                    $('.anchorexam').on('click', function () {
                        debugger;
                        var examID = $(this).prop('id');
                        $("#answerdiv").show();
                        $("#ExamDivList").hide();
                        $("#spanexamid").text(examID);
                        $("#gobackdiv").show();

                        feedbackTab.DisplaySubjectiveQuestions(examID);
                    });

                });
            },
           
            SubmitAnswers: function (examID, useranswers, userquestions) {
                debugger;
                var param = JSON2.stringify({
                    subjectiveExamID: examID,
                    subAnswerCollection: useranswers,
                    subQuestionCollection: userquestions
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "SubjectiveExamWithAnswer",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {
                        debugger;
                        document.getElementById("answerdiv").innerHTML = "<div></div>";
                        document.getElementById("lblCtime").innerHTML = "";
                        $("#answerdiv").hide();
                        $("#scorediv").show();
                        window.location.replace("http://localhost:49613/User/UserHome");
                    }


                });
            },
            init: function () {
                debugger;
                $("#answerdiv").hide();
                $("#gobackdiv").hide();
                feedbackTab.GetExamList();
                $("#btngoback").on('click', function () {
                    $("#answerdiv").hide();
                    $("#ExamDivList").show();
                });


                $(document).ready(function () {
                    debugger;

                });


            }







        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





