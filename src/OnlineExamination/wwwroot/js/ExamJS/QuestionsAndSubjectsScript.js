


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

            GetAllSubjectsByYear: function (year, programme) {
                debugger;
                var param = JSON2.stringify({
                    year: year,
                    programme: programme
                });


                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetSubjectByYear",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        var options = "";
                        if (data.length==0) {
                            document.getElementById("SubjectID").innerHTML = '<option value="0">No Subject.....</option>';
                        }
                        else {
                            $.each(data, function (i, item) {
                            debugger;
                            options += "<option value=" + item.subjectID + ">" + item.subject_Name + "</option>";
                            document.getElementById("SubjectID").innerHTML = options;


                        });
                        }
                        
                    }
                });
            },
            AddQuestion: function (SubjectID, Question, Answer1, Answer2, Answer3, Answer4, Status1, Status2, Status3, Status4) {
                debugger
                var param = JSON2.stringify({
                    subjectID: SubjectID,
                    objectiveQue: Question,
                    answer1: Answer1,
                    answer2: Answer2,
                    answer3: Answer3,
                    answer4: Answer4,
                    status1: Status1,
                    status2: Status2,
                    status3: Status3,
                    status4: Status4

                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "ObjQuestionandAnswerAdd",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {


                    },
                    error: function () {
                        debugger;
                        alert("Question Added");
                        $("#txtQuestion").val("");
                        $("#Answer1").val("");
                        $("#Answer2").val("");
                        $("#Answer3").val("");
                        $("#Answer4").val("");
                        $("#spanerror").text("");
                        $('#Status1').prop('checked', false);
                        $('#Status2').prop('checked', false);
                        $('#Status3').prop('checked', false);
                        $('#Status4').prop('checked', false);
                    }
                });

            },
            AddSubQuestion: function (subjectID, subjectiveQue) {
                debugger;
                var param = JSON2.stringify({
                    subjectID: subjectID,
                    subjectiveQue: subjectiveQue,
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "AddSubjectiveQuestion",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {


                    },
                    error: function () {
                        debugger;
                        alert("Question Added");
                        $("#txtSubectiveQuestion").val("");
                    }
                });

            },
            init: function () {
                $("#StudentYear").change(function () {
                    debugger;
                    var year = $("#StudentYear").val();
                    var programme = $("#Programme").val();
                    if (year == "0" || programme == "0") {
                        return null;
                    }
                    else {
                        feedbackTab.GetAllSubjectsByYear(year, programme);

                    }
                });
                $("#Programme").change(function () {
                    debugger;
                    var year = $("#StudentYear").val();
                    var programme = $("#Programme").val();
                    if (year == "0" || programme == "0") {
                        return null;
                    }
                    else {
                        feedbackTab.GetAllSubjectsByYear(year, programme);

                    }
                });
                $("#btnAddQuestion").on("click", function () {
                    debugger;
                    var SubjectID = $("#SubjectID").val();
                    var Question = $("#txtQuestion").val();
                    var Answer1 = $("#Answer1").val();
                    var Answer2 = $("#Answer2").val();
                    var Answer3 = $("#Answer3").val();
                    var Answer4 = $("#Answer4").val();

                    if (Answer1 == "" || Answer2 == "" || Answer3 == "" || Answer4 == "" || Question == "" || SubjectID == "0"||SubjectID==null) {
                        if (Question=="") {
                            $("#spanerror").text("Write Question!!");

                        }
                        else if (SubjectID == "0"||SubjectID==null) {
                            $("#spanerror").text("Choose Subject");
                        }
                        else {
                            $("#spanerror").text("Required Answers !!");

                        }
                    }
                    else {
                        if ($('#Status1').is(':checked') || $('#Status2').is(':checked') || $('#Status3').is(':checked') || $('#Status4').is(':checked')) {
                            if ($('#Status1').is(':checked')) {
                                var Status1 = 1;
                            }
                            else {
                                var Status1 = 0;


                            }
                            if ($('#Status2').is(':checked')) {
                                var Status2 = 1;

                            }
                            else {
                                var Status2 = 0;


                            }
                            if ($('#Status3').is(':checked')) {
                                var Status3 = 1;

                            }
                            else {
                                var Status3 = 0;


                            }
                            if ($('#Status4').is(':checked')) {
                                var Status4 = 1;

                            }
                            else {
                                var Status4 = 0;


                            }
                                feedbackTab.AddQuestion(SubjectID, Question, Answer1, Answer2, Answer3,
                                  Answer4, Status1, Status2, Status3, Status4);
                        }
                        else {

                            $("#spanerror").text("Select Correct Answer !!");


                        }


                    }






                });
                $("#btnAddSubjectiveQuestion").on("click", function () {
                    var subjectID = $("#SubjectID").val();
                    var subjectiveQue = $("#txtSubectiveQuestion").val();
                    if (subjectID=="0"||subjectiveQue=="") {
                        alert("complete the fields");
                    }
                    else {
                        feedbackTab.AddSubQuestion(subjectID, subjectiveQue);

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





