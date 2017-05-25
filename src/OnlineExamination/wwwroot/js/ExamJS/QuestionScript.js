


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
                        options += '<option value="0">Choose Subject</option>';
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
            EditQuestionByID:function(questionID)
            {
                debugger;
                var param = JSON2.stringify({
                    objectiveQue_ID: questionID
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetQuestionDetailsWithAnswers",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        $(document).ready(function () {
                            $("#editquestionmodel").show("modal");
                            $.each(data, function (i, item) {
                                debugger;
                                if (i==0) {
                                    document.getElementById("txtQuestion").value = item.objectiveQue;
                                    document.getElementById("txtqueID").value = item.objectiveQue_ID;
                                    document.getElementById("Answer1").value = item.objectiveAns;
                                    document.getElementById("AnswerID1").value = item.objectiveAns_ID;
                                    document.getElementById("StudentYear").value = item.year;
                                    document.getElementById("Programme").value = item.programme;

                                }
                                if (i == 1) {
                                    document.getElementById("Answer2").value = item.objectiveAns;
                                    document.getElementById("AnswerID2").value = item.objectiveAns_ID;

                                }
                                if (i == 2) {
                                    document.getElementById("Answer3").value = item.objectiveAns;
                                    document.getElementById("AnswerID3").value = item.objectiveAns_ID;

                                }
                                if (i == 3) {
                                    document.getElementById("Answer4").value = item.objectiveAns;
                                    document.getElementById("AnswerID4").value = item.objectiveAns_ID;

                                }
                                if (item.status == 1) {
                                    var radio = "Status" + (i + 1);
                                    $("#"+radio).attr('checked', 'checked');
                                }
                            });
                            
                        })

                    }

                });
            },
            GetAllQuestion: function () {
                debugger
                $.ajax({
                    type: "GET",
                    url: feedbackTab.config.baseURL + "GetQuestionsWithSubjectYearProgramme",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        $("#tblQuestionsList").dataTable({
                            data: data,
                            columns: [
                                { 'data': 'objectiveQue_ID' },
                                {
                                    'data': 'objectiveQue',
                                    'render': function (objectiveQue) {
                                        return objectiveQue.substring(0, 20);
                                    }
                                    
                                },
                                { 'data': 'subject_Name' },
                                { 'data': 'year' },
                                { 'data': 'programme' },

                                {
                                    'render': function () {
                                        return '<button type="button" id="btnEdit" data-target="#editquestionmodel" data-toggle="modal" class="btnEdit btn btn-success">Edit</button><button type="button" id="btnDelete" class="btnDelete btn btn-success">Delete</button>'
                                    }
                                }
                            ]
                        });
                        //$('#tblquestions').find('tr').click(function () {
                        //    debugger;

                        //    var currentRow = $(this).closest("tr");
                        //    var questionID = currentRow.find("td:eq(1)").text();

                        //    if (questionID > 0) {
                        //        currentRow.hide();
                        //        feedbackTab.AddQuestionsInExam(questionID);
                        //    }



                        //});

                        $("#tblQuestionsList").on('click', '.btnEdit', function () {  //show modal and get user id of the current row
                            debugger;
                            var currentRow = $(this).closest("tr");
                            var questionID = currentRow.find("td:eq(0)").text();
                            feedbackTab.EditQuestionByID(questionID);



                        });
                      
                    }

                        });


                       
            },
            UpdateQuestion: function (objectiveQue_ID, SubjectID, Question, Answer1, Answer2, Answer3, Answer4, Status1, Status2, Status3, Status4, objectiveAns_ID1, objectiveAns_ID2, objectiveAns_ID3, objectiveAns_ID4) {
                debugger
                var param = JSON2.stringify({
                    objectiveQue_ID: objectiveQue_ID,
                    subjectID: SubjectID,
                    objectiveQue: Question,
                    answer1: Answer1,
                    answer2: Answer2,
                    answer3: Answer3,
                    answer4: Answer4,
                    status1: Status1,
                    status2: Status2,
                    status3: Status3,
                    status4: Status4,
                    objectiveAns_ID1: objectiveAns_ID1,
                    objectiveAns_ID2: objectiveAns_ID2,
                    objectiveAns_ID3: objectiveAns_ID3,
                    objectiveAns_ID4: objectiveAns_ID4
                });
                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "UpdateObjQuestionandAnswer",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function () {


                    },
                    error: function () {
                        alert("Changes will appear after page refresh");
                        $('#editquestionmodel').modal('toggle');
                    }
                });

            },
            init: function () {
                debugger;
                feedbackTab.GetAllQuestion();

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
                
                $("#btnUpdate").on("click", function () {
                    debugger;
                    var questionID = $("#txtqueID").val();
                    var SubjectID = $("#SubjectID").val();
                    var Question = $("#txtQuestion").val();
                    var Answer1 = $("#Answer1").val();
                    var Answer2 = $("#Answer2").val();
                    var Answer3 = $("#Answer3").val();
                    var Answer4 = $("#Answer4").val();
                    var objectiveAns_ID1 = $("#AnswerID1").val();
                    var objectiveAns_ID2 = $("#AnswerID2").val();
                    var objectiveAns_ID3 = $("#AnswerID3").val();
                    var objectiveAns_ID4 = $("#AnswerID4").val();

                    if (SubjectID=="0" || SubjectID==null) {
                        alert("choose subject");

                    }
                    else
                    {
                        if (Answer1 == "" || Answer2 == "" || Answer3 == "" || Answer4 == "") {
                            alert("Required Answers !!");
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


                                feedbackTab.UpdateQuestion(questionID, SubjectID, Question, Answer1, Answer2, Answer3,
                                    Answer4, Status1, Status2, Status3, Status4, objectiveAns_ID1, objectiveAns_ID2, objectiveAns_ID3, objectiveAns_ID4);

                            }
                            else {

                                $("#spanerror").text("Select Correct Answer !!");


                            }


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





