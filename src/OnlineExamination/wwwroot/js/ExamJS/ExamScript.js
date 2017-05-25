


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
                        if (data.length == 0) {
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
            GetAllQuestionBySubjectID: function (subjectID) {
                debugger

                var param = JSON2.stringify({
                    subjectID: subjectID
                });


                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetAllQuestionBySubjectID",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var myhtml = '';
                        myhtml += '<thead class="thead-default">';
                        myhtml += '<tr>';
                        myhtml += ' <th>S.N</th>';
                        myhtml += ' <th hidden>QID</th>';
                        myhtml += '<th>Questions</th>';
                        myhtml += '<th>Add</th>';
                        myhtml += ' </tr>';
                        myhtml += '</thead>';
                        myhtml += '<tbody>';
                        $.each(data, function (i, item) {
                            debugger;


                            myhtml += '<tr>';
                            myhtml += '<td>' + (i + 1) + '</td>';

                            myhtml += '<td hidden>' + item.objectiveQue_ID + '</td>';

                            myhtml += '<td>' + item.objectiveQue + '</td>';

                            myhtml += '<td> <button type="button" id="btnAddQue" class="btnAdd btn btn-group-sm btn-success">';
                            myhtml += ' Add</button>' + '</td>' + '</tr>';



                        });
                        myhtml += '</tbody>';


                        document.getElementById("tblquestions").innerHTML = myhtml;


                        $('#tblquestions').find('tr').click(function () {
                            debugger;

                            var currentRow = $(this).closest("tr");
                            var questionID = currentRow.find("td:eq(1)").text();

                            if (questionID > 0) {
                                currentRow.hide();
                                feedbackTab.AddQuestionsInExam(questionID);
                            }



                        });




                    }
                });


            },
            GetSelectedQuestions: function (examID) {
                debugger;
                var param = JSON2.stringify({
                    examID: examID
                });


                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "GetSelectedQuestionByID",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;

                        var myhtml = '';
                        myhtml += '<thead class="thead-default">';
                        myhtml += '<tr class="abcd">';
                        myhtml += ' <th>S.N</th>';
                        myhtml += ' <th hidden>QID</th>';
                        myhtml += '<th>Questions</th>';
                        myhtml += '<th>Remove</th>';
                        myhtml += ' </tr>';
                        myhtml += '</thead>';
                        myhtml += '<tbody>';
                        $.each(data, function (i, item) {
                            debugger;


                            myhtml += '<tr>';
                            myhtml += '<td>' + (i + 1) + '</td>';

                            myhtml += '<td hidden class="getvalue">' + item.objectiveQue_ID + '</td>';

                            myhtml += '<td>' + item.objectiveQue + '</td>';

                            myhtml += '<td> <button type="button" id="btnDeleteQue" class="btnDelete btn btn-group-sm btn-success">';
                            myhtml += ' Delete</button>' + '</td>' + '</tr>';



                        });
                        myhtml += '</tbody>';


                        document.getElementById("tblquestionscheck").innerHTML = myhtml;

                        $('.btnDelete').on('click', function () {
                            debugger;

                            var currentRow = $(this).closest("tr");
                            var questionID = currentRow.find("td:eq(1)").text();
                            var examID = $("#examID").val();
                            if (questionID > 0) {
                                currentRow.hide();
                                feedbackTab.DeleteSubjectiveQue(examID, questionID);
                            }



                        });
                    }
                });
            },
            DeleteSubjectiveQue: function (examID, questionID) {
                var param = JSON2.stringify({
                    subjectiveExamID: examID,
                    subjectiveQue_ID: questionID
                });


                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "DeleteObjectiveQuestionFromExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                    }
                });
            },
            AddExamName: function (examName, examtime, isActive, year, programme, scheduleExam, examType) {
                debugger
                var param = JSON2.stringify({
                    year: year,
                    examName: examName,
                    isActive: isActive,
                    examDuration: examtime,
                    programme: programme,
                    scheduleExam: scheduleExam,
                    examType: examType
                });


                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "AddExamName",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        document.getElementById("examID").value = data.examID;
                        //$("#questionsdiv").show();
                        //$("#examnamediv").hide();



                    }
                });
            },
            AddQuestionsInExam: function (questionID) {
                var examID = $("#examID").val();
                var param = JSON2.stringify({
                    objectiveQue_ID: questionID,
                    examID: examID
                });


                $.ajax({
                    type: "POST",
                    url: feedbackTab.config.baseURL + "AddQuestionsInExam",
                    data: param,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        debugger;
                        document.getElementById("examID").value = data.examID;

                    }
                });
            },
            init: function () {
                var examnames;
                $(document).ready(function () {
                    $('#examdateedit').datepicker({
                    });
                    $("#examID").hide();
                    $("#questionsdiv").hide();
                    //feedbackTab.GetAllSubjects();
                    //feedbackTab.GetAllQuestionBySubjectID(1);
                });
                $("#txtexamtime").keydown(function (e) {
                    // Allow: backspace, delete, tab, escape, enter and .
                    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                        // Allow: Ctrl+A, Command+A
                        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: home, end, left, right, down, up
                        (e.keyCode >= 35 && e.keyCode <= 40)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
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
                $("#txtexam").keyup(function () {
                    $("#validexamname").text("");
                });
                $("#txtexamtime").keyup(function () {
                    $("#validexamtime").text("");
                });

                $("#btnAddExamName").on("click", function () {
                    debugger;
                    var year = $("#StudentYear").val();
                    var programme = $("#Programme").val();
                    var examName = $("#txtexam").val();
                    var examtime = $("#txtexamtime").val();
                    var scheduleExam = $("#examdateedit").val();
                    var examType = $("#ExamType").val();
                    $("#txtexamNameDisplay").text(examName);
                    $("#spanexamname").text(examName);
                    if ($("#chkactive").prop('checked') == true) {
                        var isActive = 1;
                    }
                    else {
                        var isActive = 0;
                    }
                    if (examName == "" || examtime == "" || year == 0) {
                        if (examName == "") {
                            $("#validexamname").text("* Required !");
                        }
                        if (examtime == "") {
                            $("#validexamtime").text("* Required !");
                        }
                        if (year == 0) {
                            $("#validexamyear").text("* Required !");
                        }
                        else {

                        }
                    }
                    else {
                        $("#examnamediv").hide();
                        $("#questionsdiv").show();
                        feedbackTab.AddExamName(examName, examtime, isActive, year, programme, scheduleExam, examType);
                    }
                });

                $("#txtexam").on('keyup', function () {
                    debugger;
                    var examName = $("#txtexam").val();
                    document.getElementById("txtexamNameDisplay").text = examName;
                });
                $("#SubjectID").change(function () {
                    debugger;
                    var subjectID = $("#SubjectID").val();
                    if (subjectID == '0') {

                        return;

                    }
                    else {
                        feedbackTab.GetAllQuestionBySubjectID(subjectID);
                    }



                });
                $("#btnReviewQuestions").on("click", function () {
                    debugger;
                    var examID = $("#examID").val();
                    feedbackTab.GetSelectedQuestions(examID);
                });
                $("#btnCreateExam").on('click', function () {
                    alert("Exam Created");
                    window.location.reload();
                });

            }







        };

        feedbackTab.init();

    };
    $.fn.feedback = function (p) {
        $.feedbackTab(p);
    };

})(jQuery);





