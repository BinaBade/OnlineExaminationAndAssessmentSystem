


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
            
            GetExamList: function (year,programme) {
                debugger;
                var param = JSON2.stringify({
                    year: year,
                    programme: programme
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetSubjectiveExamGiven",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    debugger;

                    var examsname = "";
                    $.each(data, function (i, item) {
                        examsname += "<div class='row-fluid'><a href='#'><label class='anchorexam' style='cursor:pointer' id='" + item.subjectiveExamID + "'>" + (i + 1) + ". " + item.subjectiveExamName + "</label></a></div>";
                    });

                    document.getElementById("examlist").innerHTML = examsname;

                    $('.anchorexam').on('click', function () {
                        debugger;
                        var examID = $(this).prop('id');
                        $("#examlistdiv").hide();
                        $("#spanexamid").text(examID);
                        $("#studentlistdiv").show();
                        
                        feedbackTab.DisplaySubjStudents(examID);
                    });
                        }
                });
            },
            DisplaySubjStudents:function(examID){
                var param = JSON2.stringify({
                    subjectiveExamID: examID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetUsersFromSubjectiveExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var student = "";
                        $.each(data, function (i, item) {
                            student += "<div class='row-fluid'><a href='#'><label class='anchorstudent' style='cursor:pointer' id='" + item.userID + "'>" + (i + 1) + ". " + item.userName + "</label></a></div>";
                        });

                        document.getElementById("studentlist").innerHTML = student;

                        $('.anchorstudent').on('click', function () {
                            debugger;
                            var userID = $(this).prop('id');
                            var examID=$("#spanexamid").text();
                            $("#studentlistdiv").hide();
                            $("#gobackdiv").show();
                            feedbackTab.GetQuestionAnswers(userID,examID);
                        });
                    }


                });
            },
            GetQuestionAnswers: function (userID,examID) {
                debugger;
                var param = JSON2.stringify({
                    userID: userID,
                    subjectiveExamID:examID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetSubQuestionAnswers",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        if (data==null) {
                            alert("already checked!!");

                        }
                        else {
                            var myhtml = '';
                            var num;
                            myhtml += '<div id="alldivs" class="form-group">';
                            var end = parseInt(data.length);

                            $.each(data, function (i, item) {
                                debugger;
                                if (i == 0) {
                                    $("#spanuserid").text(item.userID);
                                }
                                num = item.subjectiveQue_ID;
                                myhtml += '<div id="QuestionDiv' + parseInt(i + 1) + '">'
                                myhtml += '<div class="row-fluid"><b><span id="' + item.subjectiveQue_ID + '">' + parseInt(i + 1) + '. ' + item.subjectiveQue + '</span></b></div>';
                                myhtml += '<div class="space"></div>';
                                myhtml += '<div class="form-group">Answer:<label id="' + num + '" name="subans">' + item.subjectiveAns + '</label></div>';
                                myhtml += '<div class="form-group">Marks:<input type="text" id="txtmarks" class="span2"></input></div>';

                                if (i == 0) {
                                    myhtml += '<button type="button" class="btnnext btn-block span3" style="padding-right:200px;" id="' + parseInt(i + 1) + '">Next</button>';
                                }

                                else if (i == (end - 1)) {
                                    myhtml += '<button type="button" class="btnprevious btn-block span3" style="padding-right:200px;" id="' + parseInt(i + 1) + '">Previous</button>';
                                    myhtml += '<button type="button" class="btnsubmit btn-block span3" style="padding-right:200px;background-color:green" id="btnSubmit">Submit</button>';
                                }
                                else {
                                    myhtml += '<button type="button" class="btnprevious btn-block span3" style="padding-right:200px;" id="' + parseInt(i + 1) + '">Previous</button>';
                                    myhtml += '<button type="button" class="btnnext btn-block span3" style="padding-left:200px;" id="' + parseInt(i + 1) + '">Next</button>';
                                }
                                myhtml += '</div>';

                            });
                            myhtml += '</div>';
                            debugger;
                            document.getElementById("subanswerdiv").innerHTML = myhtml;
                            $(document).ready(function () {
                                debugger;
                                for (i = 2; i <= end; i++) {
                                    $("#QuestionDiv" + i).hide();
                                }

                            });
                            $("#btnSubmit").on("click", function () {
                                debugger;
                                var checkedinarray = $("#subanswerdiv").find("span").map(function () {
                                    return $(this).attr("id");
                                }).get();
                                var subquestions = checkedinarray.toString();
                                var checkedquestions = $("#subanswerdiv").find("input:text").map(function () {
                                    if ($(this).val() == "") {
                                        return "0";
                                    }
                                    else {
                                        return $(this).val();
                                    }
                                }).get();
                                var marksString = checkedquestions.toString();
                                var examID = $("#spanexamid").text();
                                var userID = $("#spanuserid").text();
                                var r = confirm("Do you want to submit your marks?");
                                if (r == true) {
                                    feedbackTab.SubmitMarks(userID, examID, marksString, subquestions);
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
                        

                    },
                    error: function () {
                       
                    }


                });
            },
            SubmitMarks: function (userID, examID, marksString, subquestions) {
                debugger;
                var param = JSON2.stringify({
                    subjectiveExamID: examID,
                    userID:userID,
                    marksCollection: marksString,
                    subQuestionCollection: subquestions
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "AddSubjectiveMarks",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                    },
                    error: function () {
                        window.location.reload();
                    }


                });
            },
            init: function () {
                debugger;
                $("#answerdiv").hide();
                $("#gobackdiv").hide();
                $("#btngetsubexams").on('click', function () {
                    var year = $("#StudentYear").val();
                    var programme = $("#Programme").val();
                    $("#examlistdiv").show();

                    feedbackTab.GetExamList(year,programme);

                });
                $("#btngoback").on('click', function () {
                    debugger;
                    $("#studentlistdiv").hide();
                    $("#examlistdiv").show();
                    $("#subanswerdiv").hide();
                    $("#gobackdiv").hide();

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





