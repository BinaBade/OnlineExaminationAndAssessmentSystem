


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
            DisplaySingleQuestionAnswers: function (examID) {
                var param = JSON2.stringify({
                    examID: examID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "DisplayObjectiveExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        if (data!=null) {
                            feedbackTab.getsinglequestion(data);
                        }
                        else {
                                 alert("This Exam Is Already Taken By You");
                        }

                    },
                  
                });
            },
            getsinglequestion: function (dataitem) {
                myhtml = '';
                var n = 0;
                var j = 0;
                var examtime=0;
                
                myhtml += '<div id="alldivs">';
                myhtml += 'Time Remaining<label style="color:mediumvioletred" id="lblCtime"></label>';
                var end = parseInt(dataitem.length);
                $.each(dataitem, function (i, item) {
                   
                    var qsn = i / 4 + 1;
                    examtime = parseInt(item.examDuration);
                    num = parseInt(qsn);
                    if (n != item.objectiveQue_ID) {
                        myhtml += '</div>';

                        if (i == 0) {

                            myhtml += '<div id="QuestionDiv' + num + '" class="thisis' + num + '">'
                        }
                        else {
                            myhtml += '<div id="QuestionDiv' + num + '">'
                        }
                        myhtml += '<div class="row-fluid"><b>' + num + '. ' + item.objectiveQue + '</b></div>';
                    }
                    myhtml += '<div id="AnswerDivID" class="AnswerDivs"><label class="ansdiv" name="AnsName' + num + '" id="AnsClass' + num + '"><input type="radio" id="radioanswer' + num + '" name="'+item.objectiveQue_ID+'" value="' + item.objectiveAns_ID + '" >' + item.objectiveAns + '</label></div>';
                    myhtml += '<div class="space"></div>';
                    n = item.objectiveQue_ID;

                    if (i == ((num * 4) - 1)) {
                        if (i == 3) {
                            if (end == 4) {
                                myhtml += '<button type="button" class="btnsubmit btn-block span3" style="padding-right:200px;background-color:green" id="btnSubmit">Submit</button>';
                            }
                            else {
                                myhtml += '<button type="button" class="btnnext btn-block span3" style="padding-left:200px;" id="' + num + '">Next</button>';
                            }
                            
                        }
                        else if (i == (end - 1)) {
                            myhtml += '<button type="button" class="btnprevious btn-block span3" style="padding-right:200px;" id="' + num + '">Previous</button>';
                            myhtml += '<button type="button" class="btnsubmit btn-block span3" style="padding-right:200px;background-color:green" id="btnSubmit">Submit</button>';
                        }
                        else {
                            myhtml += '<button type="button" class="btnprevious btn-block span3" style="padding-right:200px;" id="' + num + '">Previous</button>';
                            myhtml += '<button type="button" class="btnnext btn-block span3" style="padding-left:200px;" id="' + num + '">Next</button>';
                        }

                    }

                });
                myhtml += '</div>';
                var aid;
                $(document).on('mouseenter', '.ansdiv', function (event) {
                    var th = $(this).attr("id");
                    th = th.substr(8);
                    aid = parseInt(th);


                }).on('mouseleave', '.ansdiv', function () {
                });
                document.getElementById("answerdiv").innerHTML = myhtml;
                var myVar = setInterval(function () { myTimer() }, 1000);
                var d = new Date();
                debugger;
                var hours;
                var minutes;
                if (examtime>60) {
                    hours = parseInt(examtime / 60);
                    minutes =(examtime % 60);
                }
                else {
                    hours = 0;
                    minutes = examtime;
                }
                
                d.setHours(hours, minutes-1,60, 00);
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
                    


                    if (h==0 && m == 0 && s == 0)
                    {
                        alert("Your Time is Up!!");
                        var checkedinarray = $("#answerdiv").find("input:radio:checked").map(function () {
                            return $(this).val();
                        }).get();
                        var socialmediastring = checkedinarray.toString();
                        var checkedquestions = $("#answerdiv").find("input:radio:checked").map(function () {
                        return $(this).attr("name");
                        }).get();
                        var userquestions = checkedquestions.toString();
                        var examID = $("#spanexamid").text();
                        feedbackTab.SubmitAnswers(examID, socialmediastring,userquestions);
                       
                    }
                    if (s < 10 || m < 10) {
                        if (s<10) {
                            document.getElementById("lblCtime").innerHTML = "0" + h + ":" + m + ":0" + s;
                        }
                        else if (m<10) {
                            document.getElementById("lblCtime").innerHTML = "0" + h + ":0" + m + ":" + s;
                        }
                        else if (m<10 && s<10) {
                            document.getElementById("lblCtime").innerHTML = "0" + h + ":0" + m + ":0" + s;

                        }
                        
                    }
                    else {
                        document.getElementById("lblCtime").innerHTML = "0"+h + ":" + m + ":" + s;
                    }
                    

                    d.setHours(h,m,s,00);
                    //setInterval(myTimer, 1000);
                };
                $(document).ready(function () {
                    for (i = 2; i < 19; i++) {
                        $("#QuestionDiv" + i).hide();
                    }

                });

                $("#btnSubmit").on("click", function () {
                    debugger;
                    var checkedinarray = $("#answerdiv").find("input:radio:checked").map(function () {
                        return $(this).val();
                    }).get();
                    var useranswers = checkedinarray.toString();
                    var checkedquestions = $("#answerdiv").find("input:radio:checked").map(function () {
                        return $(this).attr("name");
                    }).get();
                    var userquestions = checkedquestions.toString();
                    var examID = $("#spanexamid").text();
                    var r = confirm("Do you want to submit your answers?");
                    if (r == true) {
                        feedbackTab.SubmitAnswers(examID, useranswers,userquestions);
                    } else {
                        return null;
                    }
                    
                });
                $(".ansdiv").on("click", function () {
                    debugger;
                    $('label[name=AnsName' + aid + ']').css("background", "cornflowerblue");
                    $(this).css("background", "yellowgreen");


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
            },
            GetExamList: function () {
                debugger;
                var webMethod = "http://localhost:49613/Exam/GetAllExams";
                $.getJSON(webMethod, function (data) {
                    debugger;

                    var examsname = "";
                    $.each(data, function (i, item) {
                        examsname += "<div class='row-fluid'><a href='#'><label class='anchorexam' style='cursor:pointer' id='" + item.examID + "'>" + (i + 1) + ". " + item.examName + "</label></a></div>";
                    });

                    document.getElementById("ObjExamListdiv").innerHTML = examsname;

                    $('.anchorexam').on('click', function () {
                        debugger;
                        var examID = $(this).prop('id');
                        $("#answerdiv").show();
                        $("#ExamDivList").hide();
                        $("#spanexamid").text(examID);
                        feedbackTab.DisplaySingleQuestionAnswers(examID);
                    });

                });
            },
            GetMyScore:function(examID){
                var param = JSON2.stringify({
                    examID: examID,
                    
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetMyExamScore",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        $("#spanscore").text("Your Score: "+data.score);
                    }
                });
            },
            SubmitAnswers: function (examID, useranswers, userquestions) {
                debugger;
                var param = JSON2.stringify({
                    examID: examID,
                    answerCollection: useranswers,
                    questionCollection: userquestions
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "UserExamWithAnswerID",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {
                        $("#answerdiv").hide();
                        $("#scorediv").show();

                    }


                });
            },
            init: function () {
                debugger;
                 $("#answerdiv").hide();
                    $("#scorediv").hide();
                    feedbackTab.GetExamList();
                $("#btngoback").on('click', function () {
                    $("#answerdiv").hide();
                    $("#scorediv").hide();
                    $("#ExamDivList").show();
                });

                $("#btnshowscore").on('click', function () {
                    debugger;
                    var examID = $("#spanexamid").text();
                    feedbackTab.GetMyScore(examID);
                });
                var getone = [];
                var n = 0;

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





